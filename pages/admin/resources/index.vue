<template>
  <div class="relative w-full min-h-screen bg-gray-50 font-inter text-gray-800">
    <div class="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
      <svg width="100%" height="100%">
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#09033b"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-2xl sm:text-3xl font-bold text-[#09033b] tracking-tight">Resources</h1>
            <span v-if="posts.length" class="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
              {{ posts.length }}
            </span>
          </div>
          <p class="mt-1 text-sm sm:text-base text-gray-500">Manage blog posts and educational articles</p>
        </div>
        
        <NuxtLink 
          to="/admin/resources/create"
          class="group inline-flex items-center justify-center px-5 py-2.5 bg-[#09033b] text-white rounded-lg shadow-md hover:bg-[#0c0552] transition-all active:scale-95"
        >
          <UIcon name="i-heroicons-pencil-square" class="w-5 h-5 mr-2" />
          Create New
        </NuxtLink>
      </div>

      <div class="sticky top-4 z-20 bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-gray-100 p-3 mb-8 flex flex-col sm:flex-row gap-3 items-center justify-between">
        
        <div class="relative w-full sm:max-w-xs">
          <UIcon name="i-heroicons-magnifying-glass" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search resources..." 
            class="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent focus:bg-white border focus:border-[#09033b] rounded-lg text-sm transition-colors"
          >
        </div>

        <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
          <select 
            v-model="sortBy"
            class="text-sm bg-gray-50 border-transparent rounded-lg py-2 pl-3 pr-8 focus:ring-[#09033b] focus:border-[#09033b] cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="az">A-Z</option>
          </select>

          <div class="h-6 w-px bg-gray-200 mx-1"></div>

          <div class="flex bg-gray-100 p-1 rounded-lg">
            <button 
              @click="viewMode = 'grid'"
              class="p-1.5 rounded transition-all"
              :class="viewMode === 'grid' ? 'bg-white text-[#09033b] shadow-sm' : 'text-gray-400 hover:text-gray-600'"
              title="Grid View"
            >
              <UIcon name="i-heroicons-squares-2x2" class="w-5 h-5" />
            </button>
            <button 
              @click="viewMode = 'list'"
              class="p-1.5 rounded transition-all"
              :class="viewMode === 'list' ? 'bg-white text-[#09033b] shadow-sm' : 'text-gray-400 hover:text-gray-600'"
              title="List View"
            >
              <UIcon name="i-heroicons-list-bullet" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div v-if="loading" :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'">
        <div v-for="n in 6" :key="n" class="bg-white rounded-xl border border-gray-100 p-4 shadow-sm animate-pulse">
          <div :class="viewMode === 'grid' ? 'flex-col' : 'flex-row gap-4'" class="flex h-full">
            <div :class="viewMode === 'grid' ? 'w-full h-48 mb-4' : 'w-32 h-24 shrink-0'" class="bg-gray-200 rounded-lg"></div>
            <div class="flex-1 space-y-3 py-1">
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2"></div>
              <div class="h-8 bg-gray-200 rounded w-24 mt-4"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="error" class="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-red-100 rounded-full">
            <UIcon name="i-heroicons-exclamation-circle" class="w-8 h-8 text-red-600" />
          </div>
          <div>
            <h3 class="text-lg font-medium text-red-900">Unable to load resources</h3>
            <p class="text-red-700 mt-1">{{ error }}</p>
          </div>
          <button 
            @click="fetchPosts"
            class="ml-auto px-4 py-2 bg-white text-red-700 font-medium rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>

      <div v-else-if="filteredPosts.length === 0" class="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
        <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <UIcon name="i-heroicons-document-text" class="w-8 h-8 text-gray-300" />
        </div>
        <h3 class="text-lg font-medium text-gray-900">No resources found</h3>
        <p class="text-gray-500 text-sm mt-1 mb-6">
          {{ searchQuery ? `No results for "${searchQuery}"` : 'Get started by creating your first post.' }}
        </p>
        <NuxtLink 
          v-if="!searchQuery"
          to="/admin/resources/create"
          class="text-[#09033b] font-medium hover:underline flex items-center"
        >
          Create now <UIcon name="i-heroicons-arrow-right" class="ml-1 w-4 h-4" />
        </NuxtLink>
        <button 
          v-else
          @click="searchQuery = ''"
          class="text-[#09033b] font-medium hover:underline"
        >
          Clear search
        </button>
      </div>

      <div v-else>
        <TransitionGroup 
          name="list" 
          tag="div" 
          :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'"
        >
          <div v-for="post in filteredPosts" :key="post.id" class="transition-all duration-300">
            <BlogAdminCard :post="post" :view-mode="viewMode" />
          </div>
        </TransitionGroup>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const { getAllBlogPosts } = useBlog()

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
  auth: true
})

useHead({
  title: 'Resources - Admin Dashboard',
})

// State
const posts = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const viewMode = ref('grid') // 'grid' | 'list'
const sortBy = ref('newest') // 'newest' | 'oldest' | 'az'

// Fetch
const fetchPosts = async () => {
  try {
    loading.value = true
    error.value = null
    posts.value = await getAllBlogPosts()
  } catch (err) {
    console.error('Error fetching posts:', err)
    error.value = 'Failed to load resources. Please try again.'
  } finally {
    loading.value = false
  }
}

// Computed Filtering & Sorting
const filteredPosts = computed(() => {
  let result = [...posts.value]

  // 1. Search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(post => 
      post.title?.toLowerCase().includes(query) || 
      post.summary?.toLowerCase().includes(query)
    )
  }

  // 2. Sort
  result.sort((a, b) => {
    if (sortBy.value === 'newest') {
      return new Date(b.created_at || b.date) - new Date(a.created_at || a.date)
    } else if (sortBy.value === 'oldest') {
      return new Date(a.created_at || a.date) - new Date(b.created_at || b.date)
    } else if (sortBy.value === 'az') {
      return a.title.localeCompare(b.title)
    }
    return 0
  })

  return result
})

onMounted(() => {
  fetchPosts()
})
</script>

<style scoped>
/* List Transitions */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.list-leave-active {
  position: absolute;
}
</style>