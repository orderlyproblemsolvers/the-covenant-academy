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
            @click="currentDate = new Date()" 
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

      <!-- Hide Empty Days Toggle (Mobile Only) -->
      <div class="sm:hidden mb-4 flex items-center justify-end">
        <label class="inline-flex items-center cursor-pointer">
          <span class="mr-3 text-sm font-medium text-[#09033b]">Hide empty days</span>
          <div class="relative">
            <input 
              type="checkbox" 
              class="sr-only peer" 
              v-model="hideEmptyDays"
            >
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#09033b]"></div>
          </div>
        </label>
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
                v-for="(date, index) in currentMonthDays"
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

        <!-- Mobile Calendar - Vertical List -->
        <div class="sm:hidden space-y-4">
          <!-- Month Navigation -->
          <div class="flex items-center justify-between bg-white p-3 rounded-lg shadow-xs border border-gray-100">
            <button 
              @click="prevMonth" 
              class="p-2 text-[#09033b] hover:bg-gray-50 rounded-full transition-colors duration-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <h3 class="text-lg font-medium text-[#09033b]">{{ currentMonth }}</h3>
            <button 
              @click="nextMonth" 
              class="p-2 text-[#09033b] hover:bg-gray-50 rounded-full transition-colors duration-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>

          <!-- Days List -->
          <div class="space-y-2">
            <div
              v-for="(date, index) in filteredCurrentMonthDays"
              :key="index"
              class="bg-white rounded-lg border border-gray-100 shadow-xs overflow-hidden"
              :class="{
                'ring-1 ring-[#09033b]/50': date.isToday
              }"
            >
              <!-- Day Header -->
              <div 
                class="p-3 border-b border-gray-100 flex items-center justify-between"
                :class="{
                  'bg-[#09033b]/5': date.isToday,
                  'text-gray-400': !date.isCurrentMonth
                }"
              >
                <div class="flex items-center">
                  <span 
                    class="text-sm font-medium mr-2"
                    :class="{
                      'font-semibold text-[#09033b]': date.isToday,
                      'text-[#09033b]': date.isCurrentMonth && !date.isToday,
                    }"
                  >
                    {{ date.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) }}
                  </span>
                  <span 
                    v-if="date.isToday" 
                    class="text-xs px-2 py-1 bg-[#09033b] text-white rounded-full"
                  >
                    Today
                  </span>
                </div>
                <span 
                  v-if="getEventsForDate(date.date).length > 0"
                  class="text-xs text-gray-500"
                >
                  {{ getEventsForDate(date.date).length }} event{{ getEventsForDate(date.date).length > 1 ? 's' : '' }}
                </span>
              </div>
              
              <!-- Events List -->
              <div class="divide-y divide-gray-100">
                <div
                  v-for="event in getEventsForDate(date.date)"
                  :key="event.id"
                  class="p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  @click="$emit('event-click', event)"
                >
                  <div class="flex items-start">
                    <div 
                      class="w-10 h-10 flex-shrink-0 rounded-full bg-[#09033b]/10 flex items-center justify-center mr-3 mt-0.5"
                      :class="{
                        'bg-[#09033b]/20': isAllDayEvent(event)
                      }"
                    >
                      <span 
                        class="text-xs font-medium text-[#09033b]"
                        :class="{
                          'text-[10px]': isAllDayEvent(event)
                        }"
                      >
                        {{ isAllDayEvent(event) ? 'All day' : formatEventTime(event.start_date) }}
                      </span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="font-medium text-[#09033b] truncate">{{ event.title }}</div>
                      <div v-if="event.description" class="text-xs text-gray-500 mt-1 truncate-2-lines">
                        {{ event.description }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- No Events -->
                <div 
                  v-if="getEventsForDate(date.date).length === 0 && !hideEmptyDays"
                  class="p-4 text-center text-sm text-gray-400"
                >
                  No events
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const emit = defineEmits(['event-click'])
const supabase = useSupabaseClient()

const events = ref([])
const loading = ref(true)
const error = ref(null)
const currentDate = ref(new Date())
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const hideEmptyDays = ref(true)

const currentMonth = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })
})

const currentMonthDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  const days = []
  const startDay = firstDay.getDay()
  const endDate = lastDay.getDate()
  
  // Previous month days
  for (let i = startDay - 1; i >= 0; i--) {
    const date = new Date(year, month, -i)
    days.push(createCalendarDay(date, false))
  }

  // Current month days
  for (let day = 1; day <= endDate; day++) {
    const date = new Date(year, month, day)
    days.push(createCalendarDay(date, true))
  }

  // Next month days
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i)
    days.push(createCalendarDay(date, false))
  }

  return days
})

const filteredCurrentMonthDays = computed(() => {
  if (!hideEmptyDays.value) return currentMonthDays.value
  return currentMonthDays.value.filter(date => {
    return getEventsForDate(date.date).length > 0 || date.isToday
  })
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
    const eventDate = new Date(event.start_date)
    return (
      eventDate.getFullYear() === date.getFullYear() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getDate() === date.getDate()
    )
  }).sort((a, b) => {
    // Sort by time, all-day events first
    if (isAllDayEvent(a)) return -1
    if (isAllDayEvent(b)) return 1
    return new Date(a.start_date) - new Date(b.start_date)
  })
}

function isAllDayEvent(event) {
  const date = new Date(event.start_date)
  return date.getHours() === 0 && date.getMinutes() === 0
}

function formatEventTime(dateString) {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  }).replace(/\s/g, '')
}

function prevMonth() {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  )
}

function nextMonth() {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
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

/* Truncate 2 lines */
.truncate-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Small shadow */
.shadow-xs {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
</style>