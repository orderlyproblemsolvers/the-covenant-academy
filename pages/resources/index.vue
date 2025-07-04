<template>
    <div class="relative w-full min-h-screen bg-white p-4 overflow-hidden font-inter">
      <!-- Subtle Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <svg width="60" height="60" viewBox="0 0 60 60" class="absolute top-0 left-0 w-full h-full">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="#09033b"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>
  
      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <!-- Minimal Header -->
        <div class="mb-12 space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-[#09033b] rounded-full"></div>
            <span class="text-sm font-medium text-gray-600 tracking-wide uppercase">
              Latest Updates
            </span>
          </div>
          <h1 class="text-3xl md:text-4xl font-light text-[#09033b] tracking-tight">
            Blog Posts
          </h1>
          <div class="w-16 h-px bg-[#09033b]"></div>
        </div>
  
        <!-- Loading State -->
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="i in 3" :key="i" class="bg-white/80 backdrop-blur-sm p-6 animate-pulse">
            <div class="h-48 bg-gray-100 mb-4"></div>
            <div class="h-6 bg-gray-100 mb-2 w-3/4"></div>
            <div class="h-4 bg-gray-100 mb-2 w-1/2"></div>
            <div class="h-4 bg-gray-100 w-5/6"></div>
          </div>
        </div>
  
        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12 space-y-6">
          <div class="w-16 h-16 mx-auto bg-[#09033b]/10 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-[#09033b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <p class="text-lg text-gray-600">{{ error }}</p>
          <button 
            @click="fetchPosts"
            class="inline-flex items-center px-6 py-3 text-sm font-medium text-[#09033b] border border-[#09033b] hover:bg-[#09033b]/5 transition-colors"
          >
            Try Again
          </button>
        </div>
  
        <!-- Empty State -->
        <div v-else-if="posts.length === 0" class="text-center py-12 space-y-6">
          <svg class="mx-auto h-12 w-12 text-[#09033b]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p class="text-gray-600">No blog posts available yet.</p>
          <NuxtLink 
            to="/resources/create"
            class="inline-flex items-center px-6 py-3 text-sm font-medium text-[#09033b] border border-[#09033b] hover:bg-[#09033b]/5 transition-colors"
          >
            Create First Post
          </NuxtLink>
        </div>
  
        <!-- Blog Posts Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BlogCard 
            v-for="post in posts" 
            :key="post.id" 
            :post="post" 
          />
        </div>
  
        <!-- Side Branding - Less prominent -->
        <div class="absolute left-4 top-1/2 transform -translate-y-1/2 -rotate-90 hidden xl:block">
          <span class="text-xs font-medium text-gray-300 tracking-widest uppercase">Insights • Knowledge</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const { getAllBlogPosts } = useBlog()
  
  // SEO
  useHead({
    title: 'Resources - The Covenant Academy',
    meta: [
      { name: 'description', content: 'Latest articles and updates from The Covenant Academy' },
      { property: 'og:title', content: 'Resources - The Covenant Academy' },
      { property: 'og:description', content: 'Explore our latest articles and updates' },
      { name: 'theme-color', content: '#09033b' }
    ]
  })
  
  const posts = ref([])
  const loading = ref(true)
  const error = ref(null)
  
  const fetchPosts = async () => {
    try {
      loading.value = true
      error.value = null
      posts.value = await getAllBlogPosts()
    } catch (err) {
      console.error('Error fetching posts:', err)
      error.value = 'Failed to load posts. Please try again.'
    } finally {
      loading.value = false
    }
  }
  
  onMounted(() => {
    fetchPosts()
  })
  </script>
  
  <style scoped>
  * {
    transition-property: color, background-color, border-color, transform, opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  </style>