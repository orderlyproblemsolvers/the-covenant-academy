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

    <!-- Main Container -->
    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
      <!-- Header Section -->
      <div class="text-center mb-16 pt-12">
        <div class="inline-flex items-center space-x-3 mb-8">
          <div class="w-2 h-2 bg-[#09033b] rounded-full"></div>
          <span class="text-sm font-medium text-gray-600 tracking-wide uppercase">
            Educational Resources
          </span>
        </div>
        
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-light leading-[0.9] text-[#09033b] tracking-tight mb-8">
          All
          <span class="font-medium">Videos</span>
        </h1>
        
        <!-- Subtle Accent Line -->
        <div class="w-16 h-px bg-[#09033b] mx-auto"></div>
      </div>
      
      <!-- Search Section -->
      <div class="mb-12">
        <div class="relative max-w-md mx-auto">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search videos..." 
            class="w-full p-4 pl-12 bg-gray-50 text-[#09033b] rounded-none border-0 border-b-2 border-gray-200 focus:outline-none focus:border-[#09033b] focus:bg-white transition-all duration-300 font-light"
          />
        </div>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="text-center p-16">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-[#09033b] border-r-transparent"></div>
        <p class="mt-6 text-gray-600 font-light">Loading videos...</p>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="filteredVideos.length === 0" class="text-center p-16">
        <div class="max-w-md mx-auto">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <p class="text-[#09033b] text-xl font-light mb-2">No videos found</p>
          <p class="text-gray-500 font-light">{{ searchQuery ? 'Try a different search term.' : 'Check back later for new content.' }}</p>
        </div>
      </div>
      
      <!-- Video Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div
          v-for="video in filteredVideos"
          :key="video.id"
          class="group bg-white border border-gray-100 hover:border-[#09033b] transition-all duration-500 hover:shadow-lg"
        >
          <!-- Video Container -->
          <div class="aspect-w-16 aspect-h-9 bg-gray-100 overflow-hidden">
            <iframe
              class="w-full h-full"
              :src="`https://www.youtube-nocookie.com/embed/${getYoutubeId(video.video_url)}`"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          
          <!-- Content -->
          <div class="p-6">
            <h3 class="text-[#09033b] text-xl font-light mb-4 group-hover:text-gray-600 transition-colors duration-300 line-clamp-2">
              {{ video.title }}
            </h3>
            
            <p v-if="video.description" class="text-gray-500 text-sm font-light mb-6 line-clamp-3 leading-relaxed">
              {{ video.description }}
            </p>
            
            <div class="flex justify-between items-center pt-4 border-t border-gray-100">
              <span class="text-xs text-gray-400 font-medium tracking-wide uppercase">
                {{ formatDate(video.created_at) }}
              </span>
              
              <a
                :href="video.video_url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center space-x-2 text-[#09033b] hover:text-gray-600 text-sm font-medium transition-colors duration-300"
              >
                <span>Watch</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Pagination -->
      <div v-if="!loading && totalPages > 1" class="flex justify-center pb-16">
        <div class="flex items-center space-x-2">
          <button 
            @click="page > 1 && (page--)"
            :disabled="page === 1"
            class="px-6 py-3 text-[#09033b] font-medium border border-gray-200 hover:border-[#09033b] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
          >
            Previous
          </button>
          
          <div class="flex space-x-1">
            <div 
              v-for="p in totalPages" 
              :key="p" 
              class="px-4 py-3 cursor-pointer font-medium transition-all duration-300"
              :class="p === page 
                ? 'bg-[#09033b] text-white' 
                : 'text-[#09033b] hover:bg-gray-50'"
              @click="page = p"
            >
              {{ p }}
            </div>
          </div>
          
          <button 
            @click="page < totalPages && (page++)"
            :disabled="page === totalPages"
            class="px-6 py-3 text-[#09033b] font-medium border border-gray-200 hover:border-[#09033b] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Side Branding -->
    <div class="absolute left-8 top-1/2 transform -translate-y-1/2 -rotate-90 hidden xl:block">
      <span class="text-xs font-medium text-gray-400 tracking-widest uppercase">Excellence • Faith • Character</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useSupabaseClient } from '#imports';
const supabase = useSupabaseClient()

const videos = ref([])
const loading = ref(true)
const searchQuery = ref('')
const page = ref(1)
const perPage = 9
const totalCount = ref(0)

// Computed properties
const totalPages = computed(() => Math.ceil(totalCount.value / perPage))

const filteredVideos = computed(() => {
  if (!searchQuery.value) return videos.value
  
  const query = searchQuery.value.toLowerCase()
  return videos.value.filter(video => 
    video.title.toLowerCase().includes(query) || 
    (video.description && video.description.toLowerCase().includes(query))
  )
})

// Extract YouTube video ID from URL
const getYoutubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

// Fetch videos from Supabase with pagination
const fetchVideos = async () => {
  loading.value = true
  try {
    // Get total count
    const { count, error: countError } = await supabase
      .from('videos')
      .select('*', { count: 'exact', head: true })
    
    if (countError) throw countError
    totalCount.value = count || 0
    
    // Get paginated data
    const from = (page.value - 1) * perPage
    const to = from + perPage - 1
    
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, to)
    
    if (error) throw error
    videos.value = data
  } catch (error) {
    console.error('Error fetching videos:', error)
  } finally {
    loading.value = false
  }
}

// Watch for page changes
watch(page, () => {
  fetchVideos()
})

// Fetch videos on component mount
onMounted(() => {
  fetchVideos()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

* {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced focus states */
a:focus,
button:focus,
input:focus {
  outline: 2px solid #09033b;
  outline-offset: 2px;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom selection color */
::selection {
  background-color: #09033b;
  color: white;
}

/* Fix for aspect ratio on iframes */
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
}

.aspect-w-16 iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Line clamp utilities */
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .text-gray-400,
  .text-gray-500,
  .text-gray-600 {
    color: #000;
  }
  
  .border-gray-200,
  .border-gray-100 {
    border-color: #000;
  }
}

/* Print styles */
@media print {
  .absolute {
    position: static !important;
  }
  
  .bg-gradient-to-b {
    background: #09033b !important;
  }
}

/* Mobile typography adjustments */
@media (max-width: 768px) {
  .text-4xl { font-size: 2rem; }
  .text-5xl { font-size: 2.5rem; }
  .text-6xl { font-size: 3rem; }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #f8f9fa;
}

::-webkit-scrollbar-thumb {
  background: #09033b;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #0a0440;
}
</style>