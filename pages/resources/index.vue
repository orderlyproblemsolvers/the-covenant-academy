<template>
  <div class="relative w-full min-h-screen bg-gray-50 font-inter overflow-hidden">
    
    <div class="absolute inset-0 pointer-events-none">
      <svg class="absolute top-0 left-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="grid-resources" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="#09033b" stroke-width="1" fill="none"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid-resources)" />
      </svg>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-[#09033b] text-xs font-bold tracking-wide uppercase mb-6 shadow-sm">
            <span class="w-2 h-2 rounded-full bg-[#FF7F50] animate-pulse"></span>
            Knowledge Hub
          </div>
          
          <h1 class="text-4xl md:text-5xl font-bold text-[#09033b] tracking-tight mb-4">
            School <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#09033b] to-[#4f46e5]">Resources</span>
          </h1>
          <p class="text-lg text-gray-600">
            Explore our latest articles, educational insights, and community updates.
          </p>
        </div>

        <div v-if="!loading && posts.length > 0" class="hidden md:block text-right">
          <span class="text-3xl font-bold text-[#09033b]">{{ posts.length }}</span>
          <p class="text-sm text-gray-500 uppercase tracking-wide">Total Articles</p>
        </div>
      </div>

      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="n in 6" :key="n" class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm animate-pulse">
          <div class="aspect-[16/9] bg-gray-200 rounded-xl mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div class="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      <div v-else-if="error" class="text-center py-20 bg-white rounded-3xl border border-red-100 shadow-sm">
        <div class="w-16 h-16 mx-auto bg-red-50 rounded-full flex items-center justify-center mb-4">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-8 h-8 text-red-500" />
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-2">Unable to load resources</h3>
        <p class="text-gray-500 mb-6">{{ error }}</p>
        <button 
          @click="fetchPosts"
          class="px-6 py-2 bg-[#09033b] text-white rounded-lg hover:bg-[#0c0552] transition-colors"
        >
          Try Again
        </button>
      </div>

      <div v-else>
        
        <div v-if="posts.length === 0" class="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
          <div class="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <UIcon name="i-heroicons-newspaper" class="w-10 h-10 text-gray-400" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">News & Resources Coming Soon</h3>
          <p class="text-gray-500 max-w-sm mx-auto">We haven't published any articles yet. Please check back later for updates and educational insights.</p>
        </div>

        <div v-else id="posts-grid" class="scroll-mt-24">
          <TransitionGroup 
            name="fade-grid" 
            tag="div" 
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            <BlogCard 
              v-for="post in paginatedPosts" 
              :key="post.id" 
              :post="post" 
              class="h-full"
            />
          </TransitionGroup>

          <div v-if="totalPages > 1" class="flex flex-col items-center justify-center space-y-4">
            
            <div class="inline-flex items-center bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-1.5">
              <button 
                @click="prevPage" 
                :disabled="currentPage === 1"
                class="w-10 h-10 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-50 hover:text-[#09033b] disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              >
                <UIcon name="i-heroicons-chevron-left" class="w-5 h-5" />
              </button>

              <div class="flex items-center px-2 gap-1">
                <button 
                  v-for="page in displayedPages" 
                  :key="page"
                  @click="goToPage(page)"
                  class="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all"
                  :class="currentPage === page 
                    ? 'bg-[#09033b] text-white shadow-md shadow-[#09033b]/20' 
                    : 'text-gray-600 hover:bg-gray-50'"
                >
                  {{ page }}
                </button>
              </div>

              <button 
                @click="nextPage" 
                :disabled="currentPage === totalPages"
                class="w-10 h-10 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-50 hover:text-[#09033b] disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              >
                <UIcon name="i-heroicons-chevron-right" class="w-5 h-5" />
              </button>
            </div>

            <p class="text-xs text-gray-400">
              Showing page {{ currentPage }} of {{ totalPages }}
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const { getAllBlogPosts } = useBlog()

useHead({
  title: 'Resources - The Covenant Academy',
  meta: [
    { name: 'description', content: 'Latest articles and updates from The Covenant Academy' },
    { name: 'theme-color', content: '#09033b' }
  ]
})

// State
const posts = ref([])
const loading = ref(true)
const error = ref(null)

// Pagination State
const currentPage = ref(1)
const itemsPerPage = 6 

// Computed Pagination
const totalPages = computed(() => Math.ceil(posts.value.length / itemsPerPage))

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return posts.value.slice(start, end)
})

// Smart Pagination
const displayedPages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const maxVisible = 5
  
  if (total <= maxVisible) return total
  
  let start = Math.max(1, current - 2)
  let end = Math.min(total, start + maxVisible - 1)
  
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

// Navigation Methods
const scrollToTop = () => {
  if (process.client) {
    const grid = document.getElementById('posts-grid')
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    scrollToTop()
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    scrollToTop()
  }
}

const goToPage = (page) => {
  currentPage.value = page
  scrollToTop()
}

// Fetch Logic
const fetchPosts = async () => {
  try {
    loading.value = true
    error.value = null
    posts.value = await getAllBlogPosts()
    currentPage.value = 1
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
.fade-grid-enter-active,
.fade-grid-leave-active {
  transition: all 0.4s ease;
}
.fade-grid-enter-from,
.fade-grid-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-grid-leave-active {
  position: absolute;
  opacity: 0;
}
</style>