<template>
  <div class="relative w-full bg-white rounded-3xl overflow-hidden font-inter border border-gray-100 shadow-xl">
    
    <div class="p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
      
      <div class="flex items-center gap-4">
        <h2 class="text-3xl font-bold text-[#09033b] tracking-tight min-w-[200px]">
          {{ currentMonth }}
        </h2>
        <div class="hidden md:flex gap-1">
          <button @click="prevMonth" class="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
            <UIcon name="i-heroicons-chevron-left" class="w-5 h-5" />
          </button>
          <button @click="nextMonth" class="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
            <UIcon name="i-heroicons-chevron-right" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <div class="flex items-center gap-3 w-full md:w-auto">
        <button 
          @click="currentDate = new Date()"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
        >
          Today
        </button>
        
        <div class="flex md:hidden gap-1 ml-auto">
           <button @click="prevMonth" class="p-2 hover:bg-gray-100 rounded-full text-gray-600 border border-gray-200">
            <UIcon name="i-heroicons-chevron-left" class="w-5 h-5" />
          </button>
          <button @click="nextMonth" class="p-2 hover:bg-gray-100 rounded-full text-gray-600 border border-gray-200">
            <UIcon name="i-heroicons-chevron-right" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="error" class="p-4 bg-red-50 border-b border-red-100 flex items-center justify-between">
      <span class="text-sm text-red-600">{{ error }}</span>
      <button @click="fetchEvents" class="text-xs font-bold text-red-700 hover:underline">Retry</button>
    </div>

    <div v-if="loading" class="h-96 flex flex-col items-center justify-center">
      <div class="w-8 h-8 border-2 border-[#09033b] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p class="text-gray-400 text-sm">Syncing schedule...</p>
    </div>

    <div v-else>
      <div class="hidden md:block">
        <div class="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50">
          <div v-for="day in weekDays" :key="day" class="py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {{ day }}
          </div>
        </div>

        <div class="grid grid-cols-7 auto-rows-fr bg-gray-100 gap-px border-b border-gray-100">
          <div 
            v-for="(date, index) in currentMonthDays" 
            :key="index"
            class="min-h-[140px] bg-white p-2 transition-colors hover:bg-gray-50/50 relative group"
            :class="{ 'bg-gray-50/30': !date.isCurrentMonth }"
          >
            <div class="flex justify-between items-start mb-2">
              <span 
                class="text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full"
                :class="{
                  'bg-[#09033b] text-white': date.isToday,
                  'text-gray-900': date.isCurrentMonth && !date.isToday,
                  'text-gray-300': !date.isCurrentMonth
                }"
              >
                {{ date.day }}
              </span>
            </div>

            <div class="space-y-1.5">
              <button
                v-for="event in getEventsForDate(date.date)"
                :key="event.id"
                @click="openEventModal(event)"
                class="w-full text-left px-2 py-1.5 rounded-md text-xs font-medium truncate transition-all duration-200 border-l-[3px] shadow-sm hover:shadow-md hover:-translate-y-0.5"
                :class="isAllDayEvent(event) 
                  ? 'bg-blue-50 text-blue-700 border-blue-500' 
                  : 'bg-white border-[#FF7F50] text-gray-700 ring-1 ring-gray-100'"
              >
                {{ event.title }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="md:hidden divide-y divide-gray-100">
        <template v-for="(date, index) in filteredCurrentMonthDays" :key="index">
          <div class="p-4 bg-white">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-lg font-bold text-[#09033b]">{{ date.day }}</span>
              <span class="text-sm text-gray-500 uppercase">{{ date.date.toLocaleDateString('en-US', { weekday: 'short' }) }}</span>
              <span v-if="date.isToday" class="ml-auto text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Today</span>
            </div>

            <div class="space-y-3">
              <div 
                v-for="event in getEventsForDate(date.date)" 
                :key="event.id"
                @click="openEventModal(event)"
                class="flex items-start p-3 bg-gray-50 rounded-xl active:bg-gray-100 transition-colors"
              >
                <div class="w-1 h-10 rounded-full bg-[#FF7F50] mr-3 flex-shrink-0"></div>
                <div>
                  <h4 class="text-sm font-semibold text-gray-900">{{ event.title }}</h4>
                  <p class="text-xs text-gray-500 mt-1 line-clamp-1">{{ event.description }}</p>
                  <p class="text-xs font-medium text-gray-400 mt-2">
                    {{ isAllDayEvent(event) ? 'All Day' : formatEventTime(event.start_date) }}
                  </p>
                </div>
              </div>
              <div v-if="getEventsForDate(date.date).length === 0" class="text-sm text-gray-400 italic">No events</div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <Teleport to="body">
      <Transition 
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div v-if="showModal && selectedEvent" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" @click="closeModal"></div>
          
          <div class="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div class="bg-[#09033b] p-6 text-white relative overflow-hidden">
               <div class="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
               <button @click="closeModal" class="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1 transition-colors">
                 <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
               </button>
               
               <div class="text-[#FF7F50] text-xs font-bold uppercase tracking-wider mb-2">Event Details</div>
               <h3 class="text-xl font-bold leading-tight">{{ selectedEvent.title }}</h3>
            </div>

            <div class="p-6 overflow-y-auto">
              <div class="flex items-start gap-3 mb-6">
                <div class="bg-gray-100 p-2 rounded-lg text-gray-500">
                  <UIcon name="i-heroicons-clock" class="w-5 h-5" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    {{ new Date(selectedEvent.start_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ isAllDayEvent(selectedEvent) ? 'All Day Event' : formatEventTime(selectedEvent.start_date) }}
                  </p>
                </div>
              </div>

              <div v-if="selectedEvent.description" class="mb-8">
                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</h4>
                <p class="text-sm text-gray-600 leading-relaxed">{{ selectedEvent.description }}</p>
              </div>

              <div class="space-y-3">
                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 text-center">Add to Calendar</h4>
                
                <a 
                  :href="googleCalendarUrl" 
                  target="_blank"
                  class="flex items-center justify-center w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm group"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" alt="Google">
                  Google Calendar
                </a>

                <button 
                  @click="downloadICS"
                  class="flex items-center justify-center w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm group"
                >
                  <UIcon name="i-heroicons-calendar" class="w-5 h-5 mr-3 text-blue-600 group-hover:scale-110 transition-transform" />
                  Apple / Outlook (.ICS)
                </button>
              </div>
            </div>

          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const supabase = useSupabaseClient()

// State
const events = ref([])
const loading = ref(true)
const error = ref(null)
const currentDate = ref(new Date())
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const showModal = ref(false)
const selectedEvent = ref(null)

// Computed
const currentMonth = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const currentMonthDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  const days = []
  const startDay = firstDay.getDay()
  const endDate = lastDay.getDate()
  
  // Previous month padding
  for (let i = startDay - 1; i >= 0; i--) {
    const date = new Date(year, month, -i)
    days.push(createCalendarDay(date, false))
  }

  // Current month
  for (let day = 1; day <= endDate; day++) {
    const date = new Date(year, month, day)
    days.push(createCalendarDay(date, true))
  }

  // Next month padding
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i)
    days.push(createCalendarDay(date, false))
  }

  return days
})

const filteredCurrentMonthDays = computed(() => {
  // Simple filter for mobile list view: show all days in month
  return currentMonthDays.value.filter(d => d.isCurrentMonth)
})

const googleCalendarUrl = computed(() => {
  if (!selectedEvent.value) return '#'
  
  const event = selectedEvent.value
  const title = encodeURIComponent(event.title)
  const details = encodeURIComponent(event.description || '')
  
  // Format dates for Google (YYYYMMDDTHHmmSSZ)
  const start = new Date(event.start_date).toISOString().replace(/-|:|\.\d\d\d/g, "")
  // Default end time to +1 hour if not specified (basic logic)
  let end = start 
  // You would ideally have an end_date field. If not, add 1 hour:
  const endDateObj = new Date(new Date(event.start_date).getTime() + 60*60*1000)
  end = endDateObj.toISOString().replace(/-|:|\.\d\d\d/g, "")

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${start}/${end}`
})

// Methods
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
  }).sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
}

function isAllDayEvent(event) {
  const date = new Date(event.start_date)
  return date.getHours() === 0 && date.getMinutes() === 0
}

function formatEventTime(dateString) {
  return new Date(dateString).toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  }).replace(/\s/g, '')
}

function prevMonth() {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

function nextMonth() {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

function openEventModal(event) {
  selectedEvent.value = event
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedEvent.value = null
}

function downloadICS() {
  if (!selectedEvent.value) return

  const event = selectedEvent.value
  // Basic ICS formatting
  const formatDate = (date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "")
  const start = formatDate(new Date(event.start_date))
  const end = formatDate(new Date(new Date(event.start_date).getTime() + 60*60*1000)) // +1 hour default

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${window.location.href}
DTSTART:${start}
DTEND:${end}
SUMMARY:${event.title}
DESCRIPTION:${event.description || ''}
END:VEVENT
END:VCALENDAR`

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}.ics`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
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
    error.value = 'Failed to load events.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchEvents)
</script>