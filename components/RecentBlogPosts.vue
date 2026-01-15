<template>
  <section class="relative w-full py-24 bg-[#09033b] overflow-hidden font-inter selection:bg-[#FF7F50] selection:text-white">
    
    <div class="absolute inset-0 pointer-events-none">
      <svg class="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="grid-pattern-resources" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="white" stroke-width="1" fill="none"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid-pattern-resources)" />
      </svg>
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF7F50]/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-200 text-xs font-bold tracking-wide uppercase mb-6 backdrop-blur-sm">
            <span class="w-2 h-2 rounded-full bg-[#FF7F50] animate-pulse"></span>
            Insights & News
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Latest <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7F50] to-[#ff9f7c]">Resources</span>
          </h2>
          <p class="mt-4 text-lg text-gray-400 font-light">
            Stay informed with the latest updates, educational articles, and announcements from our academy.
          </p>
        </div>
        <div class="hidden md:block">
          <NuxtLink 
            to="/resources" 
            class="group inline-flex items-center px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all duration-300"
          >
            View All Posts
            <UIcon name="i-heroicons-arrow-right" class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>
      </div>

      <div class="relative min-h-[400px]">
        
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="n in 3" :key="n" class="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            <div class="aspect-[16/10] bg-white/5 animate-pulse"></div>
            <div class="p-6 space-y-4">
              <div class="h-4 bg-white/5 rounded w-1/4 animate-pulse"></div>
              <div class="h-6 bg-white/5 rounded w-3/4 animate-pulse"></div>
              <div class="h-4 bg-white/5 rounded w-full animate-pulse"></div>
              <div class="h-4 bg-white/5 rounded w-2/3 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div v-else-if="error" class="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-white/10 text-center">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-[#FF7F50] mb-4" />
          <h3 class="text-white text-lg font-medium">Unable to load resources</h3>
          <p class="text-gray-400 mt-2 mb-6">{{ error }}</p>
          <button @click="fetchPosts" class="px-6 py-2 bg-white text-[#09033b] font-medium rounded-lg hover:bg-gray-100 transition-colors">
            Try Again
          </button>
        </div>

        <div v-else-if="posts.length === 0" class="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-white/10 text-center">
          <UIcon name="i-heroicons-document-text" class="w-12 h-12 text-gray-500 mb-4" />
          <p class="text-gray-400">No blog posts available at the moment.</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article 
            v-for="post in posts" 
            :key="post.id" 
            class="group flex flex-col bg-white/5 hover:bg-white/[0.07] border border-white/10 hover:border-[#FF7F50]/30 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#FF7F50]/10"
          >
            <NuxtLink :to="`/resources/${post.slug || post.id}`" class="relative aspect-[16/10] overflow-hidden">
              <div class="absolute inset-0 bg-gray-800 animate-pulse" v-if="!imageLoaded[post.id]"></div>
              <NuxtImg
                :src="post.image_url || '/images/placeholder-blog.jpg'"
                :alt="post.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                @load="imageLoaded[post.id] = true"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#09033b]/90 via-transparent to-transparent opacity-60"></div>
              
              <div class="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-xs font-bold text-[#09033b] uppercase tracking-wide">
                {{ formatDate(post.created_at) }}
              </div>
            </NuxtLink>

            <div class="flex-1 p-6 flex flex-col">
              <div class="flex items-center gap-3 text-xs font-medium text-[#FF7F50] mb-3 uppercase tracking-wider">
                <span>{{ post.category || 'Update' }}</span>
                <span class="w-1 h-1 rounded-full bg-white/20"></span>
                <span class="text-gray-400">{{ post.read_time || '3 min read' }}</span>
              </div>

              <NuxtLink :to="`/resources/${post.slug || post.id}`">
                <h3 class="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-[#FF7F50] transition-colors">
                  {{ post.title }}
                </h3>
              </NuxtLink>

              <p class="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                {{ createExcerpt(post.content || post.summary) }}
              </p>

              <NuxtLink 
                :to="`/resources/${post.slug || post.id}`"
                class="inline-flex items-center text-sm font-medium text-white group-hover:text-[#FF7F50] transition-colors mt-auto"
              >
                Read Article
                <UIcon name="i-heroicons-arrow-long-right" class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </NuxtLink>
            </div>
          </article>
        </div>

        <div class="mt-12 text-center md:hidden">
           <NuxtLink 
            to="/resources" 
            class="inline-flex items-center px-6 py-3 rounded-xl bg-white text-[#09033b] font-bold transition-all active:scale-95"
          >
            View All Posts
          </NuxtLink>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'

const { getRecentBlogPosts } = useBlog()

const posts = ref([])
const loading = ref(true)
const error = ref(null)
const imageLoaded = reactive({})

// Format Date
const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Function to Strip HTML and Truncate
const createExcerpt = (html, length = 120) => {
  if (!html) return ''
  
  // 1. Remove HTML tags using Regex
  const plainText = html.replace(/<[^>]+>/g, '')
  
  // 2. Decode HTML entities (basic) if needed, or leave as string
  // (Browser treats plain strings safely in {{ }})
  
  // 3. Truncate
  if (plainText.length <= length) return plainText
  return plainText.substring(0, length).trim() + '...'
}

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