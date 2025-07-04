export const useBlog = () => {
    const supabase = useSupabaseClient()
    
    // Convert image to WebP
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
  
    // Upload image to Supabase Storage
    const uploadImage = async (file) => {
      try {
        const webpFile = await convertToWebP(file)
        const fileName = `${Date.now()}-${webpFile.name}`
        
        const { data, error } = await supabase.storage
          .from('blog-images')
          .upload(fileName, webpFile)
  
        if (error) throw error
  
        const { data: { publicUrl } } = supabase.storage
          .from('blog-images')
          .getPublicUrl(fileName)
  
        return publicUrl
      } catch (error) {
        console.error('Error uploading image:', error)
        throw error
      }
    }
  
    // Create blog post
    const createBlogPost = async (postData) => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .insert([postData])
          .select()
  
        if (error) throw error
        return data[0]
      } catch (error) {
        console.error('Error creating blog post:', error)
        throw error
      }
    }
  
    // Get all blog posts
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
  
    // Get recent blog posts
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
  
    // Get single blog post
    const getBlogPost = async (id) => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single()
  
        if (error) throw error
        return data
      } catch (error) {
        console.error('Error fetching blog post:', error)
        throw error
      }
    }
  
    // Update blog post
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
  
    // Delete blog post
    const deleteBlogPost = async (id) => {
      try {
        const { error } = await supabase
          .from('blog_posts')
          .delete()
          .eq('id', id)
  
        if (error) throw error
        return true
      } catch (error) {
        console.error('Error deleting blog post:', error)
        throw error
      }
    }
  
    return {
      convertToWebP,
      uploadImage,
      createBlogPost,
      getAllBlogPosts,
      getRecentBlogPosts,
      getBlogPost,
      updateBlogPost,
      deleteBlogPost
    }
  }