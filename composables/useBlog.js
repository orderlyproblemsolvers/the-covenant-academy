export const useBlog = () => {
  const supabase = useSupabaseClient()

  // --- Utility: Slug Generation ---
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')     // Remove special characters
      .replace(/[\s_-]+/g, '-')      // Replace spaces/underscores with hyphens
      .replace(/^-+|-+$/g, '')       // Trim hyphens from start/end
  }

  const ensureUniqueSlug = async (title) => {
    const baseSlug = generateSlug(title)
    
    // Check if slug exists
    const { data } = await supabase
      .from('blog_posts')
      .select('slug')
      .ilike('slug', `${baseSlug}%`)

    if (!data || data.length === 0) return baseSlug

    // If exists, append a short random string (e.g., "my-post-4f2a")
    const suffix = Math.random().toString(36).substring(2, 6)
    return `${baseSlug}-${suffix}`
  }

  // --- Utility: Image Handling ---
  const convertToWebP = async (file) => {
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
      // Automatically generate a unique slug on creation
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
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
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
      // Note: Usually, we DON'T update the slug once published to avoid breaking SEO links.
      // If you specifically want to update the slug when the title changes, 
      // you would call ensureUniqueSlug here too.
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

  //get recent blog posts 3
    const getRecentBlogPosts = async (limit = 3) => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
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
    getBlogPostBySlug, // Changed from getBlogPost (ID) to Slug
    updateBlogPost,
    deleteBlogPost,
    generateSlug,
    getRecentBlogPosts
  }
}