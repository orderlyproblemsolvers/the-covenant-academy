<template>
  <div class="min-h-screen bg-gray-50">
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-2 lg:px-8 py-8">
        <div class="flex items-center justify-between">
          <div class="space-y-2">
            <div class="inline-flex items-center space-x-3">
              <div class="w-2 h-2 bg-[#09033b] rounded-full"></div>
              <span class="text-sm font-medium text-gray-600 tracking-wide uppercase">
                Human Resources Management
              </span>
            </div>
            <h1 class="text-3xl md:text-4xl font-light text-[#09033b] tracking-tight">
              Recruitment Dashboard
            </h1>
            <div class="w-16 h-px bg-[#09033b]"></div>
          </div>
          
          <div v-show="activeTab === 'applications'" class="hidden sm:flex items-center space-x-8 animate-fade-in">
            <div class="text-center">
              <div class="text-2xl font-light text-[#09033b]">{{ applications.length }}</div>
              <div class="text-xs text-gray-500 font-medium tracking-wide uppercase">Total Applications</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-light text-[#09033b]">{{ todayCount }}</div>
              <div class="text-xs text-gray-500 font-medium tracking-wide uppercase">Today</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex space-x-8 -mb-px">
          <button 
            @click="activeTab = 'applications'" 
            :class="[
              activeTab === 'applications' ? 'border-[#09033b] text-[#09033b]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200'
            ]"
          >
            Job Applications
          </button>
          <button 
            @click="activeTab = 'jobs'" 
            :class="[
              activeTab === 'jobs' ? 'border-[#09033b] text-[#09033b]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200'
            ]"
          >
            Manage Openings
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-8">
      
      <div v-show="activeTab === 'applications'" class="animate-fade-in">
        <div v-if="loadingApps" class="flex flex-col items-center justify-center py-16">
          <div class="w-8 h-8 bg-[#09033b] animate-pulse mb-4"></div>
          <div class="text-gray-600 font-light">Loading applications...</div>
        </div>

        <div v-else-if="applications.length > 0" class="bg-white shadow-sm border border-gray-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="application in applications" :key="application.id" class="hover:bg-gray-50 transition-colors duration-200">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-[#09033b] flex items-center justify-center mr-4">
                        <span class="text-white text-sm font-medium">{{ getInitials(application.name) }}</span>
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-900">{{ application.name }}</div>
                        <div class="text-sm text-gray-500">ID: {{ application.id.substring(0, 8) }}...</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="space-y-1">
                      <div class="text-sm text-gray-900">{{ application.email }}</div>
                      <div class="text-sm text-gray-500">{{ application.phone }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="inline-flex px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800">
                      {{ application.position }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <div class="space-y-1">
                      <div class="text-sm text-gray-900">{{ formatDate(application.created_at) }}</div>
                      <div class="text-xs text-gray-500">{{ getTimeAgo(application.created_at) }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <button @click="downloadCV(application)" class="group inline-flex items-center text-sm font-medium text-[#09033b] hover:text-[#0a0440] transition-colors duration-200">
                      <svg class="mr-2 w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      Download CV
                    </button>
                  </td>
                  <td class="px-6 py-4">
                    <button @click="viewDetails(application)" class="inline-flex items-center px-4 py-2 text-sm font-medium text-[#09033b] border border-gray-200 hover:border-[#09033b] hover:bg-gray-50 transition-all duration-300">
                      View Details
                      <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-else class="text-center py-16">
          <div class="w-16 h-16 bg-gray-100 mx-auto mb-4 flex items-center justify-center">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
          <p class="text-gray-500 font-light">Job applications will appear here when candidates apply.</p>
        </div>
      </div>

      <div v-show="activeTab === 'jobs'" class="space-y-8 animate-fade-in">
        
        <div class="bg-white p-6 shadow-sm border border-gray-200">
          <h2 class="text-xl font-light text-[#09033b] mb-6">Create New Job Opening</h2>
          <form @submit.prevent="createJob" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">Job Title</label>
                <input v-model="newJob.title" required class="w-full px-4 py-3 bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-[#09033b]/20 focus:border-[#09033b] focus:bg-white transition-all" placeholder="e.g. Senior Mathematics Teacher" />
              </div>
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">Short Description</label>
                <input v-model="newJob.description" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-[#09033b]/20 focus:border-[#09033b] focus:bg-white transition-all" placeholder="Brief overview of the role..." />
              </div>
            </div>
            
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700">Requirements (One per line)</label>
              <textarea v-model="newJob.requirements" required rows="4" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-[#09033b]/20 focus:border-[#09033b] focus:bg-white transition-all resize-none" placeholder="- Bachelor's Degree in Education&#10;- Minimum 3 years of teaching experience&#10;- Strong communication skills"></textarea>
            </div>
            
            <div class="flex items-center justify-between pt-2">
              <div class="flex items-center">
                <input type="checkbox" v-model="newJob.is_open" id="is_open" class="h-4 w-4 text-[#09033b] border-gray-300 rounded focus:ring-[#09033b]" />
                <label for="is_open" class="ml-2 block text-sm text-gray-900">Publish immediately (Set as Open)</label>
              </div>
              <button type="submit" :disabled="isCreatingJob" class="inline-flex items-center px-6 py-3 bg-[#09033b] text-white font-medium hover:bg-[#0a0440] transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed">
                <svg v-if="isCreatingJob" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isCreatingJob ? 'Creating...' : 'Create Opening' }}
              </button>
            </div>
          </form>
        </div>

        <div v-if="loadingJobs" class="flex flex-col items-center justify-center py-10">
          <div class="w-6 h-6 bg-[#09033b] animate-pulse mb-4"></div>
          <div class="text-sm text-gray-600 font-light">Loading jobs...</div>
        </div>

        <div v-else-if="jobs.length > 0" class="bg-white shadow-sm border border-gray-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role Title</th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Created</th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="job in jobs" :key="job.id" class="hover:bg-gray-50 transition-colors duration-200">
                  <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">{{ job.title }}</div>
                    <div class="text-xs text-gray-500 truncate max-w-xs">{{ job.description }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(job.created_at) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'inline-flex px-3 py-1 text-xs font-medium', 
                      job.is_open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]">
                      {{ job.is_open ? 'Accepting Applications' : 'Closed' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      @click="toggleJobStatus(job)" 
                      class="text-[#09033b] hover:text-[#0a0440] transition-colors border border-transparent hover:border-[#09033b] px-3 py-1"
                    >
                      {{ job.is_open ? 'Close Job' : 'Re-open Job' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div v-else class="text-center py-10 border border-gray-200 bg-white">
          <p class="text-gray-500 font-light">No job openings created yet.</p>
        </div>
      </div>

      <Teleport to="body">
        <div v-if="showModal" class="fixed inset-0 bg-gray-600/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div class="bg-white shadow-2xl border border-gray-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div class="p-8">
              <div class="flex items-center justify-between mb-8">
                <div>
                  <h3 class="text-2xl font-light text-[#09033b] mb-2">Application Details</h3>
                  <div class="w-12 h-px bg-[#09033b]"></div>
                </div>
                <button @click="closeModal" class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors duration-200">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div v-if="selectedApplication" class="space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <div class="space-y-4">
                    <div>
                      <label class="text-sm font-medium text-gray-500 uppercase tracking-wide">Full Name</label>
                      <p class="mt-1 text-lg text-gray-900">{{ selectedApplication.name }}</p>
                    </div>
                    <div>
                      <label class="text-sm font-medium text-gray-500 uppercase tracking-wide">Email Address</label>
                      <p class="mt-1 text-gray-900">{{ selectedApplication.email }}</p>
                    </div>
                    <div>
                      <label class="text-sm font-medium text-gray-500 uppercase tracking-wide">Phone Number</label>
                      <p class="mt-1 text-gray-900">{{ selectedApplication.phone }}</p>
                    </div>
                  </div>
                  
                  <div class="space-y-4">
                    <div>
                      <label class="text-sm font-medium text-gray-500 uppercase tracking-wide">Position Applied</label>
                      <p class="mt-1 text-lg text-gray-900">{{ selectedApplication.position }}</p>
                    </div>
                    <div>
                      <label class="text-sm font-medium text-gray-500 uppercase tracking-wide">Application Date</label>
                      <p class="mt-1 text-gray-900">{{ formatDate(selectedApplication.created_at) }}</p>
                    </div>
                    <div>
                      <label class="text-sm font-medium text-gray-500 uppercase tracking-wide">Application ID</label>
                      <p class="mt-1 text-sm text-gray-600 font-mono">{{ selectedApplication.id }}</p>
                    </div>
                  </div>
                </div>

                <div v-if="selectedApplication.details" class="border-t border-gray-200 pt-6">
                  <label class="text-sm font-medium text-gray-500 uppercase tracking-wide">Additional Information</label>
                  <p class="mt-2 text-gray-700 leading-relaxed">{{ selectedApplication.details }}</p>
                </div>

                <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button @click="downloadCV(selectedApplication)" class="inline-flex items-center px-6 py-3 bg-[#09033b] text-white font-medium hover:bg-[#0a0440] transition-colors duration-300">
                    <svg class="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Download CV
                  </button>
                  <button @click="closeModal" class="inline-flex items-center px-6 py-3 text-[#09033b] font-medium border border-gray-200 hover:border-[#09033b] hover:bg-gray-50 transition-all duration-300">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

// Set layout
definePageMeta({
  layout: 'admin'
})

// SEO & Meta
useHead({
  title: 'Recruitment Dashboard',
  meta: [
    { name: 'description', content: 'Manage job applications and openings for The Covenant Academy.' },
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
})

// Supabase client
const supabase = useSupabaseClient()

// --- State: Global Tabs ---
const activeTab = ref('applications') // 'applications' or 'jobs'

// --- State: Applications ---
const applications = ref([])
const loadingApps = ref(true)
const showModal = ref(false)
const selectedApplication = ref(null)

// --- State: Job Openings ---
const jobs = ref([])
const loadingJobs = ref(true)
const isCreatingJob = ref(false)
const newJob = reactive({
  title: '',
  description: '',
  requirements: '',
  is_open: true
})

// --- Computed Properties ---
const todayCount = computed(() => {
  const today = new Date().toDateString()
  return applications.value.filter(app => 
    new Date(app.created_at).toDateString() === today
  ).length
})

// --- Methods: Applications ---
const fetchApplications = async () => {
  try {
    loadingApps.value = true
    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    applications.value = data || []
  } catch (error) {
    console.error('Error fetching applications:', error)
  } finally {
    loadingApps.value = false
  }
}

const downloadCV = async (application) => {
  try {
    if (!application.cv_url) {
      alert('No CV available for this application.')
      return
    }

    const { data, error } = await supabase.storage
      .from('cvs')
      .download(application.cv_url.split('/').pop())

    if (error) throw error

    const url = URL.createObjectURL(data)
    const link = document.createElement('a')
    link.href = url
    link.download = application.cv_filename || `${application.name}_CV.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error downloading CV:', error)
    alert('Error downloading CV. Please try again.')
  }
}

const viewDetails = (application) => {
  selectedApplication.value = application
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedApplication.value = null
}

// --- Methods: Job Openings ---
const fetchJobs = async () => {
  try {
    loadingJobs.value = true
    const { data, error } = await supabase
      .from('job_openings')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    jobs.value = data || []
  } catch (error) {
    console.error('Error fetching jobs:', error)
  } finally {
    loadingJobs.value = false
  }
}

const createJob = async () => {
  if (!newJob.title || !newJob.requirements) return
  
  isCreatingJob.value = true
  try {
    const { error } = await supabase.from('job_openings').insert([{ ...newJob }])
    if (error) throw error
    
    // Reset form
    newJob.title = ''
    newJob.description = ''
    newJob.requirements = ''
    newJob.is_open = true
    
    // Refresh list
    await fetchJobs()
    
    // Optional: show a toast notification here
  } catch (error) {
    console.error('Error creating job:', error)
    alert('Error creating job: ' + error.message)
  } finally {
    isCreatingJob.value = false
  }
}

const toggleJobStatus = async (job) => {
  const newStatus = !job.is_open
  
  // Optimistic UI update
  const previousStatus = job.is_open
  job.is_open = newStatus
  
  try {
    const { error } = await supabase
      .from('job_openings')
      .update({ is_open: newStatus })
      .eq('id', job.id)
    
    if (error) throw error
  } catch (error) {
    console.error('Error toggling job status:', error)
    // Revert on error
    job.is_open = previousStatus
    alert('Failed to update job status. Please try again.')
  }
}

// --- Utility Methods ---
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getTimeAgo = (dateString) => {
  const now = new Date()
  const date = new Date(dateString)
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours}h ago`
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}d ago`
  
  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) return `${diffInWeeks}w ago`
  
  return formatDate(dateString)
}

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

// --- Lifecycle ---
onMounted(() => {
  fetchApplications()
  fetchJobs()
})

onUnmounted(() => {
  if (showModal.value) closeModal()
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
button:focus,
a:focus,
input:focus,
textarea:focus {
  outline: 2px solid #09033b;
  outline-offset: 2px;
}

/* Custom selection color */
::selection {
  background-color: #09033b;
  color: white;
}

/* Animations */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
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
  
  .border-gray-200 {
    border-color: #000;
  }
}

/* Print styles */
@media print {
  .fixed {
    position: static !important;
  }
  
  button {
    display: none !important;
  }
}
</style>