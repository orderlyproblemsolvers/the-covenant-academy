<template>
  <div class="relative w-full min-h-screen bg-gray-50 p-4 overflow-hidden font-inter">
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
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-light text-[#09033b] tracking-tight">Manage Calendar Events</h1>
        <p class="mt-2 text-gray-600">Schedule and organize school activities</p>
      </div>

      <!-- Alerts -->
      <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex justify-between items-center">
        <div class="flex items-center">
          <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5 mr-2" />
          <span>{{ error }}</span>
        </div>
        <button @click="error = ''" class="text-red-700 hover:text-red-900 font-bold text-xl">&times;</button>
      </div>

      <div v-if="successMessage" class="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex justify-between items-center">
        <div class="flex items-center">
          <UIcon name="i-heroicons-check-circle" class="w-5 h-5 mr-2" />
          <span>{{ successMessage }}</span>
        </div>
        <button @click="successMessage = ''" class="text-green-700 hover:text-green-900 font-bold text-xl">&times;</button>
      </div>

      <!-- Event Form -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 class="text-xl font-light text-[#09033b] mb-6 pb-2 border-b border-gray-100">
          {{ editing ? 'Update Event' : 'Create New Event' }}
        </h2>
        
        <form @submit.prevent="saveEvent">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
              <input
                v-model="form.title"
                required
                class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#09033b] focus:border-[#09033b] transition-colors"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                v-model="form.description"
                class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#09033b] focus:border-[#09033b] transition-colors"
                rows="2"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
              <input
                type="datetime-local"
                v-model="form.start_date"
                required
                class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#09033b] focus:border-[#09033b] transition-colors"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="datetime-local"
                v-model="form.end_date"
                class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#09033b] focus:border-[#09033b] transition-colors"
              >
            </div>

            <div class="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                v-model="form.all_day"
                id="allDay"
                class="h-5 w-5 text-[#09033b] rounded border-gray-300 focus:ring-[#09033b]"
              >
              <label for="allDay" class="text-sm text-gray-700">All-day event</label>
            </div>
          </div>

          <div class="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="submit"
              :disabled="formLoading"
              class="group inline-flex items-center justify-center px-6 py-3 bg-[#09033b] text-white text-base font-medium hover:bg-[#0a0440] transition-colors duration-300"
            >
              <div v-if="formLoading" class="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
              {{ formLoading ? 'Saving...' : (editing ? 'Update Event' : 'Create Event') }}
            </button>
            
            <button
              type="button"
              @click="resetForm"
              class="inline-flex items-center justify-center px-6 py-3 text-[#09033b] text-base font-medium border border-gray-200 hover:border-[#09033b] hover:bg-gray-50 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="flex flex-col items-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#09033b]"></div>
          <p class="mt-4 text-gray-600">Loading events...</p>
        </div>
      </div>

      <!-- Events List -->
      <div v-else class="space-y-4">
        <div
          v-for="event in events"
          :key="event.id"
          class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-[#ff7f50]"
        >
          <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div class="flex-1">
              <h3 class="text-lg font-medium text-[#09033b]">{{ event.title }}</h3>
              <div class="flex items-center gap-2 mt-2">
                <UIcon name="i-heroicons-calendar" class="w-4 h-4 text-[#ff7f50]" />
                <p class="text-sm text-gray-600">
                  {{ formatDateTime(event.start_date) }}
                  <span v-if="event.end_date">- {{ formatDateTime(event.end_date) }}</span>
                </p>
                <span v-if="event.all_day" class="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">All Day</span>
              </div>
              <p v-if="event.description" class="text-sm text-gray-500 mt-2">
                {{ event.description }}
              </p>
            </div>
            
            <div class="flex gap-2">
              <button
                @click="editEvent(event)"
                class="px-4 py-2 text-sm bg-gray-50 text-[#09033b] rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
              >
                Edit
              </button>
              <button
                @click="deleteEvent(event.id)"
                class="px-4 py-2 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors border border-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!events.length" class="text-center p-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <div class="flex justify-center mb-6">
            <UIcon name="i-heroicons-calendar" class="w-16 h-16 text-gray-300" />
          </div>
          <h3 class="text-xl font-light text-[#09033b] mb-3">No events scheduled yet</h3>
          <p class="text-gray-600 mb-8">Create your first event to get started</p>
          <button
            @click="resetForm"
            class="group inline-flex items-center justify-center px-6 py-3 bg-[#09033b] text-white text-base font-medium hover:bg-[#0a0440] transition-colors duration-300"
          >
            Create New Event
            <UIcon name="i-heroicons-plus" class="ml-2 w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'

// Add definePageMeta for admin layout
definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
  auth: true
});

// Enhanced SEO
useHead({
  title: 'Calendar Management - Admin Dashboard',
  meta: [
    {
      name: 'description',
      content: 'Manage school calendar events at The Covenant Academy'
    },
    {
      property: 'og:title',
      content: 'Calendar Management - Admin Dashboard'
    },
    {
      property: 'og:description',
      content: 'Administration interface for managing school calendar events'
    },
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})

const supabase = useSupabaseClient()
const events = ref([])
const loading = ref(true)
const formLoading = ref(false)
const error = ref(null)
const successMessage = ref(null)
const editing = ref(false)

const form = reactive({
  id: null,
  title: '',
  description: '',
  start_date: '',
  end_date: '',
  all_day: false
})

function formatDateTime(dateString) {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

async function saveEvent() {
  if (!form.title.trim() || !form.start_date) {
    error.value = 'Please fill in all required fields'
    return
  }

  try {
    formLoading.value = true
    error.value = null

    const eventData = {
      title: form.title.trim(),
      description: form.description.trim(),
      start_date: new Date(form.start_date).toISOString(),
      end_date: form.end_date ? new Date(form.end_date).toISOString() : null,
      all_day: form.all_day
    }

    // Add id for updates
    if (editing.value) {
      eventData.id = form.id
    }

    const { error: sbError } = editing.value
      ? await supabase.from('events').update(eventData).eq('id', form.id)
      : await supabase.from('events').insert(eventData)

    if (sbError) {
      console.error('Supabase error details:', sbError)
      throw sbError
    }

    successMessage.value = editing.value
      ? 'Event updated successfully'
      : 'Event created successfully'
    setTimeout(() => successMessage.value = null, 3000)
    
    resetForm()
    await fetchEvents()
  } catch (err) {
    error.value = `Failed to save event: ${err.message || 'Unknown error'}`
    console.error('Save error:', err)
  } finally {
    formLoading.value = false
  }
}

async function deleteEvent(id) {
  if (!confirm('Are you sure you want to delete this event?')) return

  try {
    const { error: sbError } = await supabase
      .from('events')
      .delete()
      .eq('id', id)

    if (sbError) {
      console.error('Delete error details:', sbError)
      throw sbError
    }
    
    successMessage.value = 'Event deleted successfully'
    setTimeout(() => successMessage.value = null, 3000)
    
    await fetchEvents()
  } catch (err) {
    error.value = `Failed to delete event: ${err.message || 'Unknown error'}`
    console.error('Delete error:', err)
  }
}

function editEvent(event) {
  editing.value = true
  Object.assign(form, {
    id: event.id,
    title: event.title,
    description: event.description || '',
    start_date: formatDateForInput(event.start_date),
    end_date: event.end_date ? formatDateForInput(event.end_date) : '',
    all_day: event.all_day
  })
  
  // Scroll to form for better UX
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function formatDateForInput(dateString) {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  return date.toISOString().slice(0, 16) // Format: YYYY-MM-DDTHH:MM
}

function resetForm() {
  editing.value = false
  Object.assign(form, {
    id: null,
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    all_day: false
  })
}

async function fetchEvents() {
  try {
    loading.value = true
    error.value = null
    
    const { data, error: sbError } = await supabase
      .from('events')
      .select('*')
      .order('start_date', { ascending: true })

    if (sbError) {
      console.error('Fetch error details:', sbError)
      throw sbError
    }
    
    events.value = data || []
  } catch (err) {
    error.value = `Failed to load events: ${err.message || 'Unknown error'}`
    console.error('Fetch error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchEvents)
</script>

<style scoped>
/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
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

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f8f9fa;
}

::-webkit-scrollbar-thumb {
  background: #09033b;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #0a0440;
}

/* Form focus states */
input:focus, textarea:focus, select:focus {
  outline: 2px solid #09033b;
  outline-offset: 2px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .md\:flex-row {
    flex-direction: column;
  }
  
  .md\:items-start {
    align-items: stretch;
  }
}
</style>