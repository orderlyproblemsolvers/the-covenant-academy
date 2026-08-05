<template>
  <div class="w-full bg-gray-50 font-inter border-y border-gray-200 relative overflow-hidden">
    
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none">
      <svg width="100%" height="100%">
        <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#09033b"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      </svg>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-12">
        
        <div class="flex-shrink-0 max-w-xs">
          <div class="flex items-center gap-3 mb-2">
            <span class="relative flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7F50] opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF7F50]"></span>
            </span>
            <h3 class="text-[#FF7F50] font-bold uppercase tracking-wider text-xs">Save the dates</h3>
          </div>
          <h2 class="text-[#09033b] text-2xl font-bold leading-tight">Upcoming Events</h2>
          <p class="text-gray-500 text-sm mt-1">Don't miss out on school activities.</p>
        </div>

        <div class="flex-grow w-full lg:w-auto">
          
          <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="n in 2" :key="n" class="bg-white rounded-xl p-3 border border-gray-100 flex items-center gap-4 animate-pulse shadow-sm">
              <div class="w-14 h-14 bg-gray-200 rounded-lg"></div>
              <div class="flex-1 space-y-2">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>

          <div v-else-if="upcomingEvents.length === 0" class="bg-white rounded-xl p-4 text-center border border-gray-200 border-dashed">
            <p class="text-gray-500 text-sm">No upcoming events scheduled at the moment.</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              v-for="(event, index) in upcomingEvents" 
              :key="index"
              class="group flex items-center gap-4 bg-white hover:bg-white hover:shadow-md hover:shadow-gray-200/50 border border-gray-200 hover:border-[#09033b]/30 transition-all duration-300 rounded-xl p-3 pr-5 cursor-default"
            >
              <div class="flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 bg-[#09033b] text-white rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-300">
                <span class="text-[10px] font-bold uppercase tracking-wider leading-none mt-1 opacity-80">{{ formatMonth(event.start_date) }}</span>
                <span class="text-xl font-bold leading-none">{{ formatDayNumber(event.start_date) }}</span>
              </div>

              <div class="min-w-0">
                <h4 class="text-gray-900 font-semibold text-lg truncate group-hover:text-[#09033b] transition-colors">
                  {{ event.title }}
                </h4>
                <div class="flex items-center gap-2 mt-0.5">
                  <UIcon name="i-heroicons-clock" class="w-3.5 h-3.5 text-[#FF7F50]" />
                  <p class="text-gray-500 text-xs font-medium">
                    {{ formatDateFull(event.start_date) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-shrink-0 w-full lg:w-auto">
          <NuxtLink 
            to="/events/calendar"
            class="group flex items-center justify-center gap-2 w-full lg:w-auto px-6 py-3.5 bg-[#09033b] text-white font-medium rounded-lg shadow-lg shadow-[#09033b]/10 hover:bg-[#0c0552] hover:shadow-xl transition-all active:scale-95"
          >
            <span>View Calendar</span>
            <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const supabase = useSupabaseClient()
const upcomingEvents = ref([])
const isLoading = ref(true)

// Helpers
const formatMonth = (dateString) => new Date(dateString).toLocaleString('default', { month: 'short' })
const formatDayNumber = (dateString) => new Date(dateString).getDate()

const formatDateFull = (dateString) => {
  const options = { weekday: 'long', hour: 'numeric', minute: '2-digit', hour12: true }
  const d = new Date(dateString)
  // If midnight, assume all day / no specific time needed
  if (d.getHours() === 0 && d.getMinutes() === 0) {
    return d.toLocaleDateString('en-US', { weekday: 'long' })
  }
  return d.toLocaleString('en-US', options)
}

onMounted(async () => {
  try {
    isLoading.value = true
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('start_date', today.toISOString())
      .order('start_date', { ascending: true })
      .limit(2)
    
    if (error) throw error
    upcomingEvents.value = data || []
  } catch (err) {
    console.error('Error fetching events:', err)
  } finally {
    isLoading.value = false
  }
})
</script>