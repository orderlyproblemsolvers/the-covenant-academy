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
            to="/resources"
            class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Blog
          </NuxtLink>
        </div>
      </div>
  
      <article v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Navigation -->
        <div class="mb-8">
          <NuxtLink 
            to="#"
            @click.prevent="router.back()"
            class="flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back 
          </NuxtLink>
        </div>
  
        <!-- Article Content -->
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
          <!-- Featured Image -->
          <div v-if="post.image_url" class="h-64 md:h-96 overflow-hidden">
            <img 
              :src="post.image_url" 
              :alt="post.title"
              class="w-full h-full object-cover"
            />
          </div>
  
          <!-- Article Header -->
          <div class="p-6 md:p-8">
            <header class="mb-8">
              <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {{ post.title }}
              </h1>
              <div class="flex items-center text-gray-600 mb-4">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <span class="font-medium">{{ post.author }}</span>
                </div>
                <span class="mx-3">•</span>
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span>{{ formatDate(post.created_at) }}</span>
                </div>
                <span v-if="post.updated_at !== post.created_at" class="mx-3">•</span>
                <span v-if="post.updated_at !== post.created_at" class="text-sm">
                  Updated {{ formatDate(post.updated_at) }}
                </span>
              </div>
            </header>
  
            <!-- Article Content -->
            <div 
              class="prose prose-lg max-w-none"
              v-html="post.content"
            ></div>
  
            <!-- Article Actions -->
            <div class="mt-12 pt-8 border-t border-gray-200">
              <div class="flex justify-between items-center">
                <div class="text-sm text-gray-500">
                  Published {{ formatDate(post.created_at) }}
                </div>
                <div class="flex space-x-4">
                  <button 
                    @click="editPost"
                    class="flex items-center px-4 py-2 text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit
                  </button>
                  <button 
                    @click="deletePost"
                    class="flex items-center px-4 py-2 text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
  layout: 'admin'
})

  const route = useRoute()
  const router = useRouter()
  const { getBlogPost, deleteBlogPost } = useBlog()
  
  const post = ref(null)
  const loading = ref(true)
  const error = ref(null)
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  const fetchPost = async () => {
    try {
      loading.value = true
      error.value = null
      post.value = await getBlogPost(route.params.id)
    } catch (err) {
      console.error('Error fetching resource:', err)
      error.value = 'Resource not found or failed to load.'
    } finally {
      loading.value = false
    }
  }
  
  const editPost = () => {
    router.push(`/admin/resources/edit/${route.params.id}`)
  }
  
  const deletePost = async () => {
    if (confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      try {
        await deleteBlogPost(route.params.id)
        alert('Blog post deleted successfully!')
        router.push('/admin/resources')
      } catch (err) {
        console.error('Error deleting resource:', err)
        alert('Failed to delete resource. Please try again.')
      }
    }
  }
  
  // SEO
  watch(post, (newPost) => {
    if (newPost) {
      useHead({
        title: `${newPost.title} - School Resources`,
        meta: [
          { name: 'description', content: newPost.content.replace(/<[^>]*>/g, '').substring(0, 160) },
          { property: 'og:title', content: newPost.title },
          { property: 'og:description', content: newPost.content.replace(/<[^>]*>/g, '').substring(0, 160) },
          { property: 'og:image', content: newPost.image_url || '' },
          { property: 'article:author', content: newPost.author },
          { property: 'article:published_time', content: newPost.created_at }
        ]
      })
    }
  })
  
  onMounted(() => {
    fetchPost()
  })
  </script>
  
  <style scoped>
  .prose {
    color: #374151;
    line-height: 1.75;
  }
  
  .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
    color: #111827;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  .prose h1 { font-size: 2.25rem; }
  .prose h2 { font-size: 1.875rem; }
  .prose h3 { font-size: 1.5rem; }
  
  .prose p {
    margin-bottom: 1.25rem;
  }
  
  .prose img {
    border-radius: 0.5rem;
    margin: 2rem 0;
  }
  
  .prose blockquote {
    font-style: italic;
    border-left: 4px solid #e5e7eb;
    padding-left: 1rem;
    margin: 1.5rem 0;
    color: #6b7280;
  }
  
  .prose ul, .prose ol {
    margin: 1.25rem 0;
    padding-left: 1.625rem;
  }
  
  .prose li {
    margin: 0.5rem 0;
  }
  </style>