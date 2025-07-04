<template>
  <div class="relative w-full bg-gray-50 p-6 lg:p-8 overflow-hidden font-inter">
    <!-- Subtle Background Pattern -->
    <div class="absolute inset-0 opacity-3">
      <svg width="60" height="60" viewBox="0 0 60 60" class="absolute top-0 left-0 w-full h-full">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1" fill="#09033b"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto">
      <!-- Error State -->
      <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg">
        <div class="flex items-center justify-between">
          <p class="text-sm text-red-700 font-medium">{{ error }}</p>
          <button 
            @click="fetchEvents" 
            class="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>

      <!-- Header -->
      <div class="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-2">
          <h2 class="text-3xl md:text-4xl font-light text-[#09033b] tracking-tight">{{ currentMonth }}</h2>
          <div class="w-12 h-px bg-[#09033b]"></div>
        </div>
        
        <div class="flex items-center gap-3">
          <button 
            @click="() => currentDate = new Date()" 
            class="px-4 py-2 text-sm font-medium text-[#09033b] bg-white border border-gray-200 hover:border-[#09033b] hover:bg-gray-50 rounded transition-all duration-300"
          >
            Today
          </button>
          <div class="flex items-center gap-1">
            <button 
              @click="prevMonth" 
              class="p-2 text-[#09033b] hover:bg-gray-50 rounded-full transition-colors duration-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button 
              @click="nextMonth" 
              class="p-2 text-[#09033b] hover:bg-gray-50 rounded-full transition-colors duration-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-16">
        <div class="inline-flex items-center space-x-3">
          <div class="w-6 h-6 border-2 border-[#09033b] border-t-transparent rounded-full animate-spin"></div>
          <span class="text-base font-light text-gray-600">Loading calendar...</span>
        </div>
      </div>

      <!-- Calendar Content -->
      <div v-else class="space-y-6">
        <!-- Desktop Calendar -->
        <div class="hidden sm:block">
          <div class="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm">
            <!-- Week Header -->
            <div class="grid grid-cols-7 bg-[#09033b]">
              <div 
                v-for="day in weekDays" 
                :key="day"
                class="p-4 text-center text-sm font-medium text-white tracking-wide"
              >
                {{ day }}
              </div>
            </div>

            <!-- Calendar Grid -->
            <div class="grid grid-cols-7">
              <div
                v-for="(date, index) in calendarDays"
                :key="index"
                class="min-h-32 p-3 border-b border-r border-gray-100 last:border-r-0 transition-all duration-200 hover:bg-gray-50 group"
                :class="{
                  'bg-gray-50/50 text-gray-400': !date.isCurrentMonth,
                  'bg-[#09033b]/5 ring-1 ring-[#09033b]/20': date.isToday && date.isCurrentMonth,
                }"
              >
                <div class="flex items-center justify-between mb-2">
                  <span 
                    class="text-sm font-medium transition-colors duration-200" 
                    :class="{ 
                      'font-semibold text-[#09033b]': date.isToday,
                      'text-[#09033b]': date.isCurrentMonth && !date.isToday,
                      'text-gray-400': !date.isCurrentMonth
                    }"
                  >
                    {{ date.day }}
                  </span>
                  <div 
                    v-if="date.isToday" 
                    class="w-2 h-2 bg-[#09033b] rounded-full"
                  ></div>
                </div>
                
                <!-- Events -->
                <div class="space-y-1 max-h-20 overflow-y-auto calendar-scrollbar">
                  <div
                    v-for="event in getEventsForDate(date.date)"
                    :key="event.id"
                    class="text-xs p-2 bg-[#09033b]/10 hover:bg-[#09033b]/20 text-[#09033b] rounded cursor-pointer truncate transition-all duration-200 border-l-2 border-[#09033b]"
                    @click="$emit('event-click', event)"
                  >
                    {{ event.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Calendar -->
        <div class="sm:hidden">
          <div class="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm">
            <!-- Mobile Week Header -->
            <div class="grid grid-cols-7 bg-[#09033b]">
              <div 
                v-for="day in weekDays" 
                :key="day"
                class="p-3 text-center text-xs font-medium text-white"
              >
                {{ day.charAt(0) }}
              </div>
            </div>

            <!-- Mobile Calendar Grid -->
            <div class="grid grid-cols-7">
              <div
                v-for="(date, index) in calendarDays"
                :key="index"
                class="h-16 p-2 border-b border-r border-gray-100 last:border-r-0 transition-all duration-200"
                :class="{
                  'bg-gray-50/50 text-gray-400': !date.isCurrentMonth,
                  'bg-[#09033b]/5 ring-1 ring-[#09033b]/20': date.isToday && date.isCurrentMonth,
                }"
              >
                <div class="flex items-start justify-between h-full">
                  <span 
                    class="text-xs font-medium" 
                    :class="{ 
                      'font-semibold text-[#09033b]': date.isToday,
                      'text-[#09033b]': date.isCurrentMonth && !date.isToday,
                      'text-gray-400': !date.isCurrentMonth
                    }"
                  >
                    {{ date.day }}
                  </span>
                  
                  <!-- Event Indicator -->
                  <div 
                    v-if="getEventsForDate(date.date).length > 0"
                    class="w-5 h-5 bg-[#09033b] text-white text-xs rounded-full flex items-center justify-center cursor-pointer"
                    @click="showMobileEvents(date)"
                  >
                    {{ getEventsForDate(date.date).length }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Events Modal -->
        <div v-if="selectedDate" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-lg w-full max-w-sm max-h-[80vh] overflow-hidden shadow-xl">
            <div class="p-4 bg-[#09033b] text-white flex items-center justify-between">
              <h3 class="font-medium">
                {{ selectedDate.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) }}
              </h3>
              <button 
                @click="selectedDate = null" 
                class="p-1 hover:bg-white/20 rounded transition-colors duration-200"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div class="p-4 overflow-y-auto max-h-[60vh]">
              <div v-if="getEventsForDate(selectedDate.date).length === 0" class="text-center py-8">
                <p class="text-gray-500 font-light">No events for this day</p>
              </div>
              
              <div class="space-y-2">
                <div
                  v-for="event in getEventsForDate(selectedDate.date)"
                  :key="event.id"
                  class="p-3 bg-[#09033b]/5 hover:bg-[#09033b]/10 border-l-2 border-[#09033b] rounded cursor-pointer transition-colors duration-200"
                  @click="$emit('event-click', event)"
                >
                  <div class="font-medium text-[#09033b] mb-1">{{ event.title }}</div>
                  <div v-if="event.description" class="text-sm text-gray-600 mb-2">
                    {{ event.description }}
                  </div>
                  <div class="text-xs text-gray-500 font-medium">
                    {{ formatEventTime(event.start_date) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  emits: ['event-click'],
  
  setup() {
    const supabase = useSupabaseClient()
    const events = ref([])
    const loading = ref(true)
    const error = ref(null)
    const currentDate = ref(new Date())
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const selectedDate = ref(null)

    const currentMonth = computed(() => {
      return currentDate.value.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      })
    })

    const calendarDays = computed(() => {
      const year = currentDate.value.getFullYear()
      const month = currentDate.value.getMonth()
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      
      const days = []
      const startDay = firstDay.getDay()
      const endDate = lastDay.getDate()
      
      for (let i = startDay - 1; i >= 0; i--) {
        const date = new Date(year, month, -i)
        days.push(createCalendarDay(date, false))
      }

      for (let day = 1; day <= endDate; day++) {
        const date = new Date(year, month, day)
        days.push(createCalendarDay(date, true))
      }

      const remainingDays = 42 - days.length
      for (let i = 1; i <= remainingDays; i++) {
        const date = new Date(year, month + 1, i)
        days.push(createCalendarDay(date, false))
      }

      return days
    })

    function createCalendarDay(date, isCurrentMonth) {
      const today = new Date()
      return {
        date: date,
        day: date.getDate(),
        isCurrentMonth,
        isToday: date.toDateString() === today.toDateString()
      }
    }

    function getEventsForDate(date) {
      return events.value.filter(event => {
        const eventDate = new Date(event.start_date).toDateString()
        return eventDate === date.toDateString()
      })
    }

    function formatEventTime(dateString) {
      const date = new Date(dateString)
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    }

    function showMobileEvents(date) {
      selectedDate.value = date
    }

    function prevMonth() {
      currentDate.value = new Date(
        currentDate.value.getFullYear(),
        currentDate.value.getMonth() - 1
      )
    }

    function nextMonth() {
      currentDate.value = new Date(
        currentDate.value.getFullYear(),
        currentDate.value.getMonth() + 1
      )
    }

    async function fetchEvents() {
      try {
        loading.value = true
        error.value = null
        
        const { data, error: sbError } = await supabase
          .from('events')
          .select('*')
          .order('start_date', { ascending: true })

        if (sbError) throw sbError
        events.value = data || []
      } catch (err) {
        error.value = 'Failed to load events. Please try again later.'
        console.error('Calendar error:', err)
      } finally {
        loading.value = false
      }
    }

    onMounted(fetchEvents)

    return {
      error,
      loading,
      weekDays,
      currentMonth,
      calendarDays,
      prevMonth,
      nextMonth,
      getEventsForDate,
      currentDate,
      selectedDate,
      showMobileEvents,
      formatEventTime,
      fetchEvents
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

* {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Custom scrollbar */
.calendar-scrollbar::-webkit-scrollbar {
  width: 2px;
}

.calendar-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.calendar-scrollbar::-webkit-scrollbar-thumb {
  background-color: #09033b;
  border-radius: 1px;
}

.calendar-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #0a0440;
}

/* Firefox scrollbar */
.calendar-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #09033b transparent;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom selection color */
::selection {
  background-color: #09033b;
  color: white;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>