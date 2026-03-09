<template>
  <main class="relative w-full min-h-screen bg-[#F8F9FC] font-inter text-gray-800 selection:bg-[#09033b] selection:text-white">
    
    <div class="fixed inset-0 pointer-events-none opacity-[0.03] z-0" aria-hidden="true">
      <svg width="100%" height="100%">
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#09033b"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        
        <section class="lg:col-span-5 lg:sticky lg:top-12 space-y-10" aria-labelledby="careers-heading">
          
          <header>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#09033b] text-xs font-bold tracking-wide uppercase mb-6">
              <span class="w-2 h-2 rounded-full bg-[#FF7F50]" aria-hidden="true"></span>
              We are hiring
            </div>
            <h1 id="careers-heading" class="text-4xl md:text-5xl font-bold text-[#09033b] leading-tight tracking-tight">
              Shape the Future with <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#09033b] to-[#4f46e5]">Covenant Academy</span>
            </h1>
            <p class="mt-6 text-lg text-gray-600 leading-relaxed">
              Join a community dedicated to excellence in Christian education. Review our open positions below and apply to make a lasting impact on the next generation.
            </p>
          </header>

          <div class="space-y-6" aria-live="polite">
            <h2 class="text-sm font-bold text-gray-900 uppercase tracking-wider">Current Openings</h2>
            
            <div v-if="fetchingJobs" class="space-y-4" aria-busy="true" aria-label="Loading open positions">
              <div v-for="i in 2" :key="i" class="animate-pulse p-5 bg-white rounded-2xl border border-gray-100 shadow-sm" aria-hidden="true">
                <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div class="h-4 bg-gray-100 rounded w-full mb-2"></div>
                <div class="h-4 bg-gray-100 rounded w-3/4"></div>
              </div>
            </div>
            
            <div v-else-if="openJobs.length === 0" class="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
              <UIcon name="i-heroicons-briefcase" class="w-8 h-8 text-gray-300 mx-auto mb-2" aria-hidden="true" />
              <p class="text-gray-500 italic text-sm">There are currently no open positions. Please check back later.</p>
            </div>

            <div v-else class="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar" role="list">
              <article v-for="job in openJobs" :key="job.id" class="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow" role="listitem">
                <h3 class="font-bold text-[#09033b] text-lg">{{ job.title }}</h3>
                <p v-if="job.description" class="text-sm text-gray-600 mt-1 mb-4">{{ job.description }}</p>
                
                <h4 class="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">Requirements:</h4>
                <ul class="space-y-1.5" aria-label="Job requirements">
                  <li v-for="(req, index) in job.requirements.split('\n')" :key="index" class="text-sm text-gray-600 flex items-start leading-relaxed">
                    <span class="mr-2 text-[#FF7F50] flex-shrink-0 mt-0.5" aria-hidden="true">•</span> 
                    <span>{{ req.replace(/^- /, '') }}</span>
                  </li>
                </ul>
              </article>
            </div>
          </div>

          <address class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 not-italic">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-[#09033b]" aria-hidden="true">
                <UIcon name="i-heroicons-chat-bubble-left-right" class="w-6 h-6" />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Have questions?</p>
                <a href="mailto:tcadinfo@gmail.com" class="text-sm text-gray-500 hover:text-[#FF7F50] transition-colors focus:outline-none focus:ring-2 focus:ring-[#09033b] focus:ring-offset-2 rounded-sm">
                  tcadinfo@gmail.com
                </a>
              </div>
            </div>
          </address>
        </section>

        <section class="lg:col-span-7" aria-labelledby="form-heading">
          <div class="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            <header class="bg-[#09033b] px-8 py-6">
              <h2 id="form-heading" class="text-xl font-semibold text-white">Application Form</h2>
              <p class="text-blue-200 text-sm mt-1">Please fill out all required fields carefully.</p>
            </header>

            <form @submit.prevent="submitApplication" class="p-8 space-y-8" novalidate>
              
              <fieldset class="space-y-6">
                <legend class="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 w-full pb-2">Personal Details</legend>
                
                <div class="space-y-5">
                  <div class="relative group">
                    <input 
                      type="text" 
                      id="name" 
                      v-model="form.name" 
                      required
                      aria-required="true"
                      class="peer w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#09033b]/20 focus:border-[#09033b] focus:bg-white transition-all pt-6"
                      placeholder=" "
                    />
                    <label for="name" class="absolute left-4 top-2 text-xs text-gray-500 font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#09033b]">
                      Full Name <span class="text-red-500" aria-hidden="true">*</span>
                    </label>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div class="relative group">
                      <input 
                        type="email" 
                        id="email" 
                        v-model="form.email" 
                        required
                        aria-required="true"
                        class="peer w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#09033b]/20 focus:border-[#09033b] focus:bg-white transition-all pt-6"
                        placeholder=" "
                      />
                      <label for="email" class="absolute left-4 top-2 text-xs text-gray-500 font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#09033b]">
                        Email Address <span class="text-red-500" aria-hidden="true">*</span>
                      </label>
                    </div>

                    <div class="relative group">
                      <input 
                        type="tel" 
                        id="phone" 
                        v-model="form.phone" 
                        required
                        aria-required="true"
                        class="peer w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#09033b]/20 focus:border-[#09033b] focus:bg-white transition-all pt-6"
                        placeholder=" "
                      />
                      <label for="phone" class="absolute left-4 top-2 text-xs text-gray-500 font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#09033b]">
                        Phone Number <span class="text-red-500" aria-hidden="true">*</span>
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset class="space-y-6">
                <legend class="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 w-full pb-2">Position</legend>
                
                <div class="grid grid-cols-1 gap-5">
                  <div class="relative">
                    <label for="position" class="sr-only">Select Position</label>
                    <select 
                      id="position"
                      v-model="form.position" 
                      required
                      aria-required="true"
                      :disabled="openJobs.length === 0"
                      class="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#09033b]/20 focus:border-[#09033b] focus:bg-white transition-all appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <option value="" disabled selected>
                        {{ fetchingJobs ? 'Loading positions...' : (openJobs.length === 0 ? 'No positions available' : 'Select a position...') }}
                      </option>
                      <option v-for="job in openJobs" :key="job.id" :value="job.title">{{ job.title }}</option>
                    </select>
                    <UIcon name="i-heroicons-chevron-down" class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" aria-hidden="true" />
                  </div>

                  <div class="relative">
                    <label for="details" class="sr-only">Cover Letter Details</label>
                    <textarea 
                      id="details"
                      v-model="form.details" 
                      rows="4"
                      class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#09033b]/20 focus:border-[#09033b] focus:bg-white transition-all placeholder-gray-400 resize-none"
                      placeholder="Cover Letter: Tell us briefly about your experience and why you want to join us..."
                    ></textarea>
                  </div>
                </div>
              </fieldset>

              <fieldset class="space-y-4">
                <legend class="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 w-full pb-2">CV / Resume</legend>
                
                <div 
                  class="relative border-2 border-dashed rounded-2xl transition-all duration-300 ease-in-out text-center group"
                  :class="[
                    dragActive 
                      ? 'border-[#09033b] bg-blue-50/50 scale-[1.01]' 
                      : 'border-gray-200 hover:border-[#09033b]/50 hover:bg-gray-50 focus-within:border-[#09033b] focus-within:ring-2 focus-within:ring-[#09033b]/20'
                  ]"
                  @dragenter.prevent="dragActive = true"
                  @dragleave.prevent="dragActive = false"
                  @dragover.prevent
                  @drop.prevent="handleDrop"
                >
                  <input 
                    type="file" 
                    id="cv-upload" 
                    class="sr-only" 
                    accept=".pdf,.doc,.docx"
                    @change="handleFileChange"
                  />
                  
                  <label for="cv-upload" class="block p-8 sm:p-10 cursor-pointer w-full h-full">
                    <div v-if="selectedFile" class="flex flex-col items-center animate-fade-in">
                      <div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-3">
                        <UIcon name="i-heroicons-document-check" class="w-8 h-8 text-green-600" aria-hidden="true" />
                      </div>
                      <p class="text-sm font-semibold text-gray-900">{{ selectedFile.name }}</p>
                      <p class="text-xs text-gray-500 mt-1">{{ formatFileSize(selectedFile.size) }}</p>
                      <button 
                        type="button"
                        @click.prevent="clearFile"
                        class="mt-3 text-xs text-red-500 hover:text-red-700 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded-sm px-1"
                        aria-label="Remove uploaded file"
                      >
                        Remove file
                      </button>
                    </div>

                    <div v-else class="flex flex-col items-center">
                      <div class="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <UIcon name="i-heroicons-cloud-arrow-up" class="w-8 h-8 text-[#09033b]" aria-hidden="true" />
                      </div>
                      <p class="text-base font-medium text-gray-900">
                        <span class="text-[#09033b] underline decoration-[#FF7F50] decoration-2 underline-offset-2">Click to upload</span> or drag and drop
                      </p>
                      <p class="text-xs text-gray-400 mt-2">PDF, DOC, DOCX up to 10MB</p>
                    </div>
                  </label>
                </div>
              </fieldset>

              <div class="pt-4">
                <div aria-live="polite" class="min-h-[60px]">
                  <div v-if="message" class="mb-4 p-4 rounded-xl flex items-start gap-3 animate-fade-in" :class="messageType === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'" role="alert">
                    <UIcon :name="messageType === 'success' ? 'i-heroicons-check-circle' : 'i-heroicons-exclamation-circle'" class="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <p class="text-sm">{{ message }}</p>
                  </div>
                </div>

                <button 
                  type="submit" 
                  :disabled="loading || openJobs.length === 0"
                  :aria-busy="loading"
                  class="w-full relative group overflow-hidden bg-[#09033b] text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-indigo-900/20 hover:shadow-indigo-900/40 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-[#09033b]/30"
                >
                  <span class="relative z-10 flex items-center justify-center gap-2">
                    <span v-if="loading">Submitting Application...</span>
                    <span v-else>Submit Application</span>
                    <UIcon v-if="!loading" name="i-heroicons-arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    <UIcon v-else name="i-heroicons-arrow-path" class="w-5 h-5 animate-spin" aria-hidden="true" />
                  </span>
                  <div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </div>

            </form>
          </div>
        </section>

      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue'

const supabase = useSupabaseClient()

// --- SEO & Meta Tags ---
useSeoMeta({
  title: 'Careers | The Covenant Academy',
  description: 'Join a community dedicated to excellence in Christian education. Review our open positions and apply to shape the future.',
  ogTitle: 'Careers | The Covenant Academy',
  ogDescription: 'Join a community dedicated to excellence in Christian education. Review our open positions and apply to shape the future.',
  twitterCard: 'summary_large_image',
})

// --- Server-Side Data Fetching (SSR) ---
// useAsyncData runs on the server side first, meaning the jobs list is included in the initial HTML for SEO
const { data: openJobs, pending: fetchingJobs } = await useAsyncData('openJobs', async () => {
  const { data, error } = await supabase
    .from('job_openings')
    .select('*')
    .eq('is_open', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching jobs:', error)
    return []
  }
  return data || []
}, {
  default: () => [] // Prevents null reference before data loads
})

// --- Client-Side Form State ---
const form = reactive({
  name: '',
  email: '',
  phone: '',
  position: '',
  details: ''
})

const selectedFile = ref(null)
const loading = ref(false)
const dragActive = ref(false)
const message = ref('')
const messageType = ref('') // 'success' | 'error'

// --- File Handling ---
const handleFileChange = (e) => validateAndSetFile(e.target.files[0])
const handleDrop = (e) => {
  dragActive.value = false
  validateAndSetFile(e.dataTransfer.files[0])
}

const validateAndSetFile = (file) => {
  if (!file) return

  // Size Check (10MB)
  if (file.size > 10 * 1024 * 1024) {
    showFeedback('File is too large (Max 10MB).', 'error')
    return
  }

  // Type Check
  const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  if (!allowed.includes(file.type)) {
    showFeedback('Only PDF, DOC, or DOCX files allowed.', 'error')
    return
  }

  selectedFile.value = file
  message.value = '' // Clear errors
}

const clearFile = () => {
  selectedFile.value = null
  const input = document.getElementById('cv-upload')
  if (input) input.value = ''
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const showFeedback = (msg, type) => {
  message.value = msg
  messageType.value = type
  if (type === 'error') setTimeout(() => message.value = '', 6000)
}

// --- Form Submission ---
const submitApplication = async () => {
  // Basic accessibility validation
  if (!form.name || !form.email || !form.phone || !form.position) {
     showFeedback('Please fill out all required fields.', 'error')
     return
  }

  if (!selectedFile.value) {
    showFeedback('Please upload your CV/Resume.', 'error')
    return
  }

  try {
    loading.value = true
    message.value = ''

    // 1. Upload CV
    const fileName = `${Date.now()}_${selectedFile.value.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('cvs')
      .upload(fileName, selectedFile.value)

    if (uploadError) throw new Error('CV Upload failed: ' + uploadError.message)

    // 2. Get URL
    const { data: urlData } = supabase.storage.from('cvs').getPublicUrl(fileName)

    // 3. Save Data
    const { error: dbError } = await supabase.from('job_applications').insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      position: form.position,
      details: form.details,
      cv_url: urlData.publicUrl,
      cv_filename: selectedFile.value.name,
      status: 'pending'
    })

    if (dbError) throw new Error('Database error: ' + dbError.message)

    // Success
    showFeedback('Application submitted successfully! We will contact you soon.', 'success')
    
    // Reset form
    form.name = ''
    form.email = ''
    form.phone = ''
    form.position = ''
    form.details = ''
    clearFile()

  } catch (err) {
    console.error(err)
    showFeedback(err.message || 'Something went wrong. Please try again.', 'error')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Fade In Animation for file selection */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

/* Custom Scrollbar for job list */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 20px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
}
</style>