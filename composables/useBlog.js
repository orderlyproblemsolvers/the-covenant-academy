export const useBlog = () => {
  const supabase = useSupabaseClient()

  // --- Utility: Slug Generation ---
  const generateSlug = (title) => {
    return title
      .normalize("NFD") // Safely separates accented characters (e.g., 'é' becomes 'e' + accent)
      .replace(/[\u0300-\u036f]/g, "") // Removes the isolated accents
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // Remove all non-alphanumeric characters except spaces and hyphens
      .replace(/[\s_-]+/g, '-')      // Replace spaces/underscores with hyphens
      .replace(/^-+|-+$/g, '')       // Trim hyphens from start/end
  }

  const ensureUniqueSlug = async (title) => {
    const baseSlug = generateSlug(title)
    
    const { data } = await supabase
      .from('blog_posts')
      .select('slug')
      .ilike('slug', `${baseSlug}%`)

    if (!data || data.length === 0) return baseSlug

    const suffix = Math.random().toString(36).substring(2, 6)
    return `${baseSlug}-${suffix}`
  }

  // --- Utility: Image Handling ---
  const convertToWebP = async (file) => {
    // Guard: Prevent server-side execution of DOM APIs
    if (import.meta.server) {
      throw new Error('Image conversion can only be performed in the browser.')
    }

    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(new File([blob], file.name.split('.')[0] + '.webp', { type: 'image/webp' }))
          } else {
            reject(new Error('Failed to convert image'))
          }
        }, 'image/webp', 0.8)
      }
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = URL.createObjectURL(file)
    })
  }

  const uploadImage = async (file) => {
    try {
      const webpFile = await convertToWebP(file)
      const fileName = `${Date.now()}-${webpFile.name}`
      const { error } = await supabase.storage.from('blog-images').upload(fileName, webpFile)
      if (error) throw error
      
      const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(fileName)
      return publicUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  }

  // --- CRUD Operations ---

  const createBlogPost = async (postData) => {
    try {
      const slug = await ensureUniqueSlug(postData.title)
      
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([{ ...postData, slug }])
        .select()

      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Error creating blog post:', error)
      throw error
    }
  }

  const getAllBlogPosts = async () => {
    try {
      // OPTIMIZATION: Explicitly excluded 'content' to save bandwidth.
      // If you have a 'summary' or 'excerpt' column in your DB, add it to this list.
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, image_url, author, created_at, updated_at') 
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      throw error
    }
  }

  const getBlogPostBySlug = async (slug) => {
    try {
      // We NEED the full content here, so select('*') is perfectly fine
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching blog post:', error)
      throw error
    }
  }

  const updateBlogPost = async (id, postData) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({ ...postData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()

      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Error updating blog post:', error)
      throw error
    }
  }

  const getRecentBlogPosts = async (limit = 3) => {
    try {
      // OPTIMIZATION: Exclude 'content' to keep the homepage/sidebar lightning fast
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, image_url, author, created_at')
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching recent blog posts:', error)
      throw error
    }
  }

  const deleteBlogPost = async (id) => {
    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id)
      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting blog post:', error)
      throw error
    }
  }

  return {
    uploadImage,
    createBlogPost,
    getAllBlogPosts,
    getBlogPostBySlug,
    updateBlogPost,
    deleteBlogPost,
    generateSlug,
    getRecentBlogPosts
  }
}