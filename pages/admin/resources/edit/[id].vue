<template>
    <div class="min-h-screen bg-gray-50">
      <div v-if="loading" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p class="mt-4 text-gray-600">Loading resource...</p>
        </div>
      </div>
  
      <div v-else-if="error" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <div class="text-red-600 mb-4">
            <svg class="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="text-lg font-medium">{{ error }}</p>
          </div>
          <NuxtLink 
            to="/blog"
            class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Blog
          </NuxtLink>
        </div>
      </div>
  
      <div v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center mb-4">
            <NuxtLink 
              to="#"
              @click.prevent="router.back()"
              class="flex items-center text-blue-600 hover:text-blue-800 mr-4"
            >
              <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Back
            </NuxtLink>
          </div>
          <h1 class="text-3xl font-bold text-gray-900">Edit resource</h1>
          <p class="mt-2 text-gray-600">Update resources</p>
        </div>
  
        <!-- Blog Editor -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <BlogEditor 
            :initial-data="post"
            @submit="handleSubmit"
            @cancel="handleCancel"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
  layout: 'admin'
}) 

  const route = useRoute()
  const router = useRouter()
  const { getBlogPost } = useBlog()
  
  const post = ref(null)
  const loading = ref(true)
  const error = ref(null)
  
  const fetchPost = async () => {
    try {
      loading.value = true
      error.value = null
      post.value = await getBlogPost(route.params.id)
    } catch (err) {
      console.error('Error fetching post:', err)
      error.value = 'Blog post not found or failed to load.'
    } finally {
      loading.value = false
    }
  }
  
  const handleSubmit = (updatedPost) => {
    alert('Blog post updated successfully!')
    router.push(`/admin/resources/${updatedPost.id}`)
  }
  
  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      router.push(`/admin/resources/${route.params.id}`)
    }
  }
  
  // SEO
  useHead({
    title: 'Edit Resource - School Website',
    meta: [
      { name: 'description', content: 'Edit and update your resources.' }
    ]
  })
  
  onMounted(() => {
    fetchPost()
  })
  </script>