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
          <h1 class="text-2xl sm:text-3xl font-bold text-[#09033b] tracking-tight">School Calendar</h1>
          <p class="mt-1 text-sm sm:text-base text-gray-500">Manage and schedule academic events</p>
        </div>
        <button 
          @click="openCreateModal"
          class="w-full md:w-auto inline-flex items-center justify-center px-5 py-2.5 bg-[#09033b] text-white rounded-lg shadow-md hover:bg-[#0c0552] transition-all active:scale-95"
        >
          <UIcon name="i-heroicons-plus" class="w-5 h-5 mr-2" />
          New Event
        </button>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8 flex flex-col md:flex-row gap-4">
        <div class="flex bg-gray-100 rounded-lg p-1 w-full md:w-auto">
          <button 
            v-for="tab in ['Upcoming', 'Past', 'All']" 
            :key="tab"
            @click="activeTab = tab"
            class="flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-md transition-all"
            :class="activeTab === tab ? 'bg-white text-[#09033b] shadow-sm' : 'text-gray-500 hover:text-gray-700'"
          >
            {{ tab }}
          </button>
        </div>

        <div class="relative w-full md:max-w-xs md:ml-auto">
          <UIcon name="i-heroicons-magnifying-glass" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search events..." 
            class="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent focus:bg-white border focus:border-[#09033b] rounded-lg text-sm transition-colors"
          >
        </div>
      </div>

      <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-[90vw] sm:max-w-sm pointer-events-none">
        <TransitionGroup 
          enter-active-class="transform ease-out duration-300 transition"
          enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="error" key="error" class="pointer-events-auto bg-white border-l-4 border-red-500 shadow-xl rounded-r-lg p-4 flex items-start">
            <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5 text-red-500 mr-3 mt-0.5 shrink-0" />
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-medium text-red-800">Error</h3>
              <p class="text-sm text-red-600 mt-1 break-words">{{ error }}</p>
            </div>
            <button @click="error = ''" class="ml-3 text-gray-400 hover:text-gray-500">&times;</button>
          </div>

          <div v-if="successMessage" key="success" class="pointer-events-auto bg-white border-l-4 border-green-500 shadow-xl rounded-r-lg p-4 flex items-start">
            <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-medium text-green-800">Success</h3>
              <p class="text-sm text-green-600 mt-1 break-words">{{ successMessage }}</p>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div v-for="n in 6" :key="n" class="h-40 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>

      <div v-else-if="filteredEvents.length === 0" class="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
        <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
          <UIcon name="i-heroicons-calendar" class="w-6 h-6 text-gray-400" />
        </div>
        <p class="text-gray-500 text-sm">No events found matching your criteria.</p>
      </div>

      <div v-else class="space-y-8">
        <div v-for="(group, monthKey) in groupedEvents" :key="monthKey">
          <div class="sticky top-0 z-20 bg-gray-50/95 backdrop-blur py-2 mb-4 flex items-center">
            <span class="bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-bold text-[#09033b] uppercase tracking-wider shadow-sm mr-4">
              {{ monthKey }}
            </span>
            <div class="h-px bg-gray-200 flex-1"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            <div 
              v-for="event in group" 
              :key="event.id"
              class="group relative bg-white rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col sm:flex-row gap-4 overflow-hidden"
            >
              <div class="absolute left-0 top-0 bottom-0 w-1 bg-[#ff7f50]"></div>

              <div class="flex sm:flex-col items-center justify-center sm:justify-start gap-2 sm:gap-0 sm:w-16 shrink-0">
                <div class="w-full h-12 sm:h-16 bg-[#09033b]/5 rounded-lg flex flex-col items-center justify-center text-[#09033b]">
                  <span class="text-[10px] font-bold uppercase">{{ getMonthShort(event.start_date) }}</span>
                  <span class="text-xl font-bold leading-none">{{ getDay(event.start_date) }}</span>
                </div>
              </div>

              <div class="flex-1 min-w-0 flex flex-col">
                <div class="flex justify-between items-start gap-2">
                  <h3 class="text-base sm:text-lg font-semibold text-gray-900 leading-tight">{{ event.title }}</h3>
                  
                  <div class="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200">
                    <button 
                      @click="editEvent(event)" 
                      class="p-2 text-gray-500 hover:text-[#09033b] hover:bg-blue-50 rounded-lg active:bg-blue-100 transition-colors"
                      title="Edit"
                    >
                      <UIcon name="i-heroicons-pencil-square" class="w-5 h-5" />
                    </button>
                    <button 
                      @click="confirmDelete(event)" 
                      class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg active:bg-red-100 transition-colors"
                      title="Delete"
                    >
                      <UIcon name="i-heroicons-trash" class="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs sm:text-sm text-gray-500">
                  <div class="flex items-center">
                    <UIcon name="i-heroicons-clock" class="w-4 h-4 mr-1 text-[#ff7f50]" />
                    <span v-if="event.all_day">All Day</span>
                    <span v-else>{{ formatTime(event.start_date) }} - {{ formatTime(event.end_date) }}</span>
                  </div>
                </div>

                <p v-if="event.description" class="mt-2 text-xs sm:text-sm text-gray-600 line-clamp-2">
                  {{ event.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div 
      v-if="isModalOpen" 
      class="fixed inset-0 z-50 overflow-hidden" 
      role="dialog" 
      aria-modal="true"
    >
      <div 
        class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        @click="closeModal"
      ></div>

      <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
        <div 
          class="pointer-events-auto w-screen max-w-md transform transition-transform duration-300 ease-in-out h-full flex flex-col bg-white shadow-2xl"
          :class="isModalOpen ? 'translate-x-0' : 'translate-x-full'"
        >
          <div class="flex items-center justify-between px-4 sm:px-6 py-4 bg-[#09033b] text-white shrink-0">
            <div>
              <h2 class="text-lg font-medium">{{ editingId ? 'Edit Event' : 'New Event' }}</h2>
              <p class="text-xs text-indigo-200 mt-0.5">Enter event details below</p>
            </div>
            <button 
              @click="closeModal" 
              class="rounded-full p-2 hover:bg-white/10 transition-colors -mr-2"
            >
              <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
            </button>
          </div>

          <div class="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
            <form id="event-form" @submit.prevent="saveEvent">
              
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-1">Event Title *</label>
                <input 
                  v-model="form.title" 
                  required 
                  type="text"
                  class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#09033b] focus:ring-[#09033b] sm:text-sm py-2.5 px-3 border"
                  placeholder="e.g. Science Fair"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-900 mb-1">Description</label>
                <textarea 
                  v-model="form.description" 
                  rows="4" 
                  class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#09033b] focus:ring-[#09033b] sm:text-sm py-2.5 px-3 border"
                  placeholder="Details about the event..."
                ></textarea>
              </div>

              <div class="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span class="text-sm font-medium text-gray-900">All Day Event?</span>
                  <button 
                    type="button"
                    @click="form.all_day = !form.all_day"
                    :class="form.all_day ? 'bg-[#09033b]' : 'bg-gray-200'"
                    class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                  >
                    <span 
                      :class="form.all_day ? 'translate-x-5' : 'translate-x-0'"
                      class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    ></span>
                  </button>
                </div>

                <div class="space-y-4">
                  <div>
                    <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Start Date *</label>
                    <input 
                      v-model="form.start_date" 
                      required 
                      type="datetime-local" 
                      class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#09033b] focus:ring-[#09033b] sm:text-sm border p-2.5 bg-white"
                    >
                  </div>
                  
                  <div v-if="!form.all_day" class="transition-all duration-300 ease-in-out">
                    <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">End Date</label>
                    <input 
                      v-model="form.end_date" 
                      type="datetime-local" 
                      class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#09033b] focus:ring-[#09033b] sm:text-sm border p-2.5 bg-white"
                    >
                  </div>
                </div>
              </div>

            </form>
          </div>

          <div class="shrink-0 border-t border-gray-200 px-4 sm:px-6 py-4 bg-gray-50 flex justify-end gap-3 safe-area-bottom">
            <button 
              type="button" 
              @click="closeModal"
              class="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 active:bg-gray-100 w-full sm:w-auto"
            >
              Cancel
            </button>
            <button 
              @click="saveEvent"
              :disabled="formLoading"
              class="rounded-lg border border-transparent bg-[#09033b] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#0c0552] focus:outline-none active:scale-95 transition-transform disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto flex justify-center items-center"
            >
              <UIcon v-if="formLoading" name="i-heroicons-arrow-path" class="w-4 h-4 animate-spin mr-2" />
              {{ editingId ? 'Update Event' : 'Create Event' }}
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
  auth: true
});

useHead({ title: 'Calendar - Admin' })

const supabase = useSupabaseClient()

// State
const events = ref([])
const loading = ref(true)
const formLoading = ref(false)
const error = ref(null)
const successMessage = ref(null)
const isModalOpen = ref(false)
const editingId = ref(null)
const activeTab = ref('Upcoming')
const searchQuery = ref('')

const form = reactive({
  title: '',
  description: '',
  start_date: '',
  end_date: '',
  all_day: false
})

// --- Computed ---

const filteredEvents = computed(() => {
  const now = new Date()
  let result = events.value

  // Search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(e => 
      e.title.toLowerCase().includes(query) || 
      (e.description && e.description.toLowerCase().includes(query))
    )
  }

  // Tabs
  if (activeTab.value === 'Upcoming') {
    result = result.filter(e => new Date(e.start_date) >= now)
  } else if (activeTab.value === 'Past') {
    result = result.filter(e => new Date(e.start_date) < now)
  }
  
  return result
})

const groupedEvents = computed(() => {
  const groups = {}
  filteredEvents.value.forEach(event => {
    const date = new Date(event.start_date)
    const key = date.toLocaleString('en-US', { month: 'long', year: 'numeric' })
    if (!groups[key]) groups[key] = []
    groups[key].push(event)
  })
  return groups
})

// --- Helpers ---

function getMonthShort(dateStr) { return new Date(dateStr).toLocaleString('en-US', { month: 'short' }) }
function getDay(dateStr) { return new Date(dateStr).getDate() }
function formatTime(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}
function formatDateForInput(date) {
  if (!date) return ''
  const d = new Date(date)
  const pad = (n) => n < 10 ? '0' + n : n
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

// --- Actions ---

function openCreateModal() {
  resetForm()
  editingId.value = null
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  setTimeout(() => resetForm(), 300)
}

function editEvent(event) {
  editingId.value = event.id
  Object.assign(form, {
    title: event.title,
    description: event.description || '',
    start_date: formatDateForInput(event.start_date),
    end_date: event.end_date ? formatDateForInput(event.end_date) : '',
    all_day: event.all_day
  })
  isModalOpen.value = true
}

function resetForm() {
  Object.assign(form, { title: '', description: '', start_date: '', end_date: '', all_day: false })
}

async function saveEvent() {
  if (!form.title.trim() || !form.start_date) return

  try {
    formLoading.value = true
    error.value = null

    const payload = {
      title: form.title.trim(),
      description: form.description?.trim(),
      start_date: new Date(form.start_date).toISOString(),
      end_date: form.end_date ? new Date(form.end_date).toISOString() : null,
      all_day: form.all_day
    }

    const { error: sbError } = editingId.value
      ? await supabase.from('events').update(payload).eq('id', editingId.value)
      : await supabase.from('events').insert(payload)

    if (sbError) throw sbError

    successMessage.value = editingId.value ? 'Event updated' : 'Event created'
    setTimeout(() => successMessage.value = null, 3000)
    closeModal()
    await fetchEvents()

  } catch (err) {
    error.value = err.message
  } finally {
    formLoading.value = false
  }
}

async function confirmDelete(event) {
  if(!confirm('Delete this event?')) return;
  
  try {
    const { error: sbError } = await supabase.from('events').delete().eq('id', event.id)
    if (sbError) throw sbError
    successMessage.value = 'Event deleted'
    setTimeout(() => successMessage.value = null, 3000)
    await fetchEvents()
  } catch (err) {
    error.value = err.message
  }
}

async function fetchEvents() {
  try {
    loading.value = true
    const { data, error: sbError } = await supabase.from('events').select('*').order('start_date', { ascending: true })
    if (sbError) throw sbError
    events.value = data || []
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchEvents)
</script>

<style scoped>
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom, 1rem);
}
</style>