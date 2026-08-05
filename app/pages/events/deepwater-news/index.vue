<template>
  <div class="relative w-full min-h-screen bg-[#FDFDFD] font-inter overflow-hidden">
    
    <div class="absolute inset-0 pointer-events-none opacity-[0.03]">
      <svg width="100%" height="100%">
        <pattern id="video-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="#09033b" stroke-width="1" fill="none"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#video-pattern)" />
      </svg>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      
      <header class="max-w-3xl mb-16 md:mb-24 text-center md:text-left mx-auto md:mx-0">
        <div class="inline-flex items-center gap-3 mb-6">
          <span class="w-8 h-px bg-[#FF7F50]"></span>
          <span class="text-xs font-bold text-[#FF7F50] uppercase tracking-widest">Deepwater News</span>
        </div>
        
        <h1 class="text-4xl md:text-7xl font-light text-[#09033b] leading-tight md:leading-[1.1] tracking-tighter mb-8">
          Learning <br class="hidden md:block"/>
          <span class="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-[#09033b] to-[#4f46e5]">Through Sight</span>
        </h1>
        
        <div class="relative mt-10 group max-w-md mx-auto md:mx-0">
          <div class="absolute inset-0 bg-[#09033b] opacity-5 blur-xl group-focus-within:opacity-10 transition-opacity rounded-full"></div>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search our video library..." 
            class="relative w-full px-6 py-4 bg-white border border-gray-100 shadow-sm rounded-2xl focus:ring-2 focus:ring-[#09033b] focus:border-transparent outline-none transition-all placeholder:text-gray-300 font-light text-black"
          />
          <UIcon name="i-heroicons-magnifying-glass" class="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </header>

      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 6" :key="i" class="animate-pulse space-y-4">
          <div class="aspect-video bg-gray-100 rounded-3xl"></div>
          <div class="h-4 bg-gray-100 rounded w-3/4"></div>
          <div class="h-3 bg-gray-100 rounded w-1/2"></div>
        </div>
      </div>

      <div v-else-if="filteredVideos.length === 0" class="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
        <UIcon name="i-heroicons-video-camera-slash" class="w-16 h-16 text-gray-200 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-[#09033b]">No videos found</h3>
        <p class="text-gray-400">Try adjusting your search filters.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        <article
          v-for="video in filteredVideos"
          :key="video.id"
          class="group relative bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-[#09033b]/10 transition-all duration-500 hover:-translate-y-2"
        >
          <div class="aspect-video relative overflow-hidden bg-black">
            <div class="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 backdrop-blur-[2px] transition-all duration-500 pointer-events-none">
              <div class="w-16 h-16 bg-[#FF7F50] rounded-full flex items-center justify-center text-white shadow-xl shadow-orange-500/40">
                <UIcon name="i-heroicons-play-solid" class="w-8 h-8" />
              </div>
            </div>
            
            <iframe
              class="w-full h-full relative z-0"
              :src="`https://www.youtube-nocookie.com/embed/${getYoutubeId(video.video_url)}?rel=0&modestbranding=1`"
              frameborder="0"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          
          <div class="p-8">
            <div class="flex items-center gap-2 mb-4">
              <span class="text-[10px] font-black uppercase tracking-widest text-[#FF7F50]">Academic Resource</span>
              <span class="h-px flex-1 bg-gray-50"></span>
            </div>

            <h3 class="text-xl font-bold text-[#09033b] leading-tight mb-4 group-hover:text-[#4f46e5] transition-colors">
              {{ video.title }}
            </h3>
            
            <p v-if="video.description" class="text-sm text-gray-500 font-light mb-8 line-clamp-2 leading-relaxed">
              {{ video.description }}
            </p>
            
            <div class="flex justify-between items-center pt-6 border-t border-gray-50">
              <div class="flex items-center gap-2 text-gray-400">
                <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
                <span class="text-[10px] font-bold uppercase tracking-tighter">
                  {{ formatDate(video.created_at) }}
                </span>
              </div>
              
              <a
                :href="video.video_url"
                target="_blank"
                class="flex items-center gap-2 text-[#09033b] hover:text-[#FF7F50] transition-colors"
              >
                <span class="text-xs font-black uppercase tracking-widest">YouTube</span>
                <UIcon name="i-heroicons-arrow-up-right" class="w-4 h-4" />
              </a>
            </div>
          </div>
        </article>
      </div>
      
      <nav v-if="!loading && totalPages > 1" class="flex justify-center mt-24">
        <div class="inline-flex items-center gap-2 p-2 bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
          <button 
            @click="page > 1 && (page--)"
            :disabled="page === 1"
            class="p-3 text-[#09033b] hover:bg-gray-50 disabled:opacity-30 rounded-2xl transition-all"
          >
            <UIcon name="i-heroicons-chevron-left" class="w-5 h-5" />
          </button>
          
          <div class="flex gap-1">
            <button 
              v-for="p in totalPages" 
              :key="p" 
              @click="page = p"
              class="w-11 h-11 flex items-center justify-center text-sm font-bold rounded-2xl transition-all"
              :class="p === page 
                ? 'bg-[#09033b] text-white shadow-lg shadow-[#09033b]/20' 
                : 'text-gray-400 hover:text-[#09033b] hover:bg-gray-50'"
            >
              {{ p }}
            </button>
          </div>
          
          <button 
            @click="page < totalPages && (page++)"
            :disabled="page === totalPages"
            class="p-3 text-[#09033b] hover:bg-gray-50 disabled:opacity-30 rounded-2xl transition-all"
          >
            <UIcon name="i-heroicons-chevron-right" class="w-5 h-5" />
          </button>
        </div>
      </nav>
    </div>

    <div class="fixed left-8 top-1/2 -translate-y-1/2 -rotate-90 hidden 2xl:block opacity-20 pointer-events-none">
      <span class="text-[10px] font-black uppercase tracking-[0.5em] text-[#09033b]">
        Learning Center • Virtual Library • Multimedia
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const supabase = useSupabaseClient()

// --- State ---
const videos = ref([])
const loading = ref(true)
const searchQuery = ref('')
const page = ref(1)
const perPage = 9
const totalCount = ref(0)

// --- Logic ---

/**
 * Filter logic: Handles the real-time search filtering.
 * It filters the current set of videos based on title or description.
 */
const filteredVideos = computed(() => {
  if (!searchQuery.value) return videos.value
  
  const query = searchQuery.value.toLowerCase()
  return videos.value.filter(video => 
    video.title.toLowerCase().includes(query) || 
    (video.description && video.description.toLowerCase().includes(query))
  )
})

/**
 * Calculate total pages based on the total count from Supabase
 */
const totalPages = computed(() => Math.ceil(totalCount.value / perPage))

/**
 * Cleanly extracts the 11-character YouTube ID from various URL formats
 */
const getYoutubeId = (url) => {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}

/**
 * Formats the timestamp into a professional editorial date
 */
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

/**
 * Core Data Fetching:
 * 1. Fetches total count for pagination.
 * 2. Fetches specific range for the current page.
 */
const fetchVideos = async () => {
  loading.value = true
  try {
    // 1. Get total count for the pagination bar
    const { count, error: countError } = await supabase
      .from('videos')
      .select('*', { count: 'exact', head: true })
    
    if (countError) throw countError
    totalCount.value = count || 0
    
    // 2. Get paginated data
    const from = (page.value - 1) * perPage
    const to = from + perPage - 1
    
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, to)
    
    if (error) throw error
    videos.value = data || []
  } catch (error) {
    console.error('Error fetching videos:', error)
  } finally {
    loading.value = false
  }
}

// --- Watchers & Lifecycle ---

// Re-fetch data whenever the user changes the page number
watch(page, () => {
  fetchVideos()
  // Scroll to top of results for better UX
  if (process.client) window.scrollTo({ top: 0, behavior: 'smooth' })
})

onMounted(() => {
  fetchVideos()
})
</script>

<style scoped>
/* Performance: Avoid layouts shifts */
.aspect-video {
  aspect-ratio: 16 / 9;
}

/* Hide scrollbar for clean search input on some browsers */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* Custom selection */
::selection {
  background: #09033b;
  color: white;
}

/* Image optimization */
iframe {
  will-change: transform;
}
</style>