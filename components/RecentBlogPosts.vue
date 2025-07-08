<template>
    <div class="relative w-full bg-[#09033b] p-4 overflow-hidden font-inter">
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
  
      <div class="bg-[09033b] relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <!-- Header -->
        <div class="text-center mb-16 space-y-4">
          <!-- Minimal Badge -->
          <div class="inline-flex items-center space-x-3 justify-center">
            <div class="w-2 h-2 bg-white rounded-full"></div>
            <span class="text-sm font-medium text-gray-200 tracking-wide uppercase">
              Latest Updates
            </span>
          </div>
          
          <h2 class="text-4xl md:text-5xl font-light text-white tracking-tight">
            <span class="block">Resources</span>
          </h2>
          
          <!-- Subtle Accent Line -->
          <div class="w-16 h-px bg-orange-500 mx-auto"></div>
          
          <p class="text-lg text-gray-200 max-w-2xl mx-auto">
            Stay updated with our latest news and insights
          </p>
        </div>
  
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-16 space-y-4">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#09033b]"></div>
          <p class="text-gray-200">Loading posts...</p>
        </div>
  
        <!-- Error State -->
        <div v-else-if="error" class="text-center py-16 space-y-6">
          <p class="text-gray-200">{{ error }}</p>
          <button 
            @click="fetchPosts"
            class="group inline-flex items-center justify-center px-8 py-4 bg-[#09033b] text-white text-base font-medium hover:bg-[#0a0440] transition-colors duration-300"
          >
            Try Again
            <svg class="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
  
        <!-- Empty State -->
        <div v-else-if="posts.length === 0" class="text-center py-16">
          <p class="text-gray-200">No blog posts available yet.</p>
        </div>
  
        <!-- Content -->
        <div v-else>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            <BlogCard 
              v-for="post in posts" 
              :key="post.id" 
              :post="post" 
            />
          </div>
  
          <div class="text-center">
            <NuxtLink 
              to="/resources"
              class="group inline-flex items-center justify-center px-8 py-4 text-white text-base font-medium border border-gray-200 hover:border-[#09033b] hover:text-[#09033b] hover:bg-gray-50 transition-all duration-300"
            >
              View All Posts
              <svg class="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
  
      <!-- Side Branding -->
      <div class="absolute left-8 top-1/2 transform -translate-y-1/2 -rotate-90 hidden xl:block">
        <span class="text-xs font-medium text-gray-400 tracking-widest uppercase">Insights • Knowledge • Updates</span>
      </div>
    </div>
  </template>
  
  <script setup>
  const { getRecentBlogPosts } = useBlog()
  
  const posts = ref([])
  const loading = ref(true)
  const error = ref(null)
  
  const fetchPosts = async () => {
    try {
      loading.value = true
      error.value = null
      posts.value = await getRecentBlogPosts(3)
    } catch (err) {
      console.error('Error fetching recent posts:', err)
      error.value = 'Failed to load blog posts. Please try again.'
    } finally {
      loading.value = false
    }
  }
  
  onMounted(() => {
    fetchPosts()
  })
  </script>