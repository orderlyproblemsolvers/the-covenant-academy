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
              Join a community dedicated to excellence in Christian education. Review our open positions below and apply to make a lasting impact.
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

            <div v-else class="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar" role="list">
              <article 
                v-for="job in openJobs" 
                :key="job.id" 
                class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#09033b]/20 transition-all overflow-hidden" 
                role="listitem"
              >
                <button 
                  @click="toggleJob(job.id)"
                  class="w-full p-5 flex justify-between items-center text-left focus:outline-none focus:bg-gray-50 transition-colors group"
                  :aria-expanded="expandedJobId === job.id"
                >
                  <h3 class="font-bold text-lg transition-colors" :class="expandedJobId === job.id ? 'text-[#4f46e5]' : 'text-[#09033b] group-hover:text-[#4f46e5]'">
                    {{ job.title }}
                  </h3>
                  <UIcon 
                    :name="expandedJobId === job.id ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" 
                    class="w-5 h-5 text-gray-400 transition-transform" 
                    aria-hidden="true" 
                  />
                </button>

                <div v-show="expandedJobId === job.id" class="px-5 pb-5 border-t border-gray-50 pt-4 animate-fade-in">
                  <p v-if="job.description" class="text-sm text-gray-600 mb-4">{{ job.description }}</p>
                  
                  <h4 class="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">Requirements:</h4>
                  <ul class="space-y-1.5 mb-6" aria-label="Job requirements">
                    <li v-for="(req, index) in job.requirements.split('\n')" :key="index" class="text-sm text-gray-600 flex items-start leading-relaxed">
                      <span class="mr-2 text-[#FF7F50] flex-shrink-0 mt-0.5" aria-hidden="true">•</span> 
                      <span>{{ req.replace(/^- /, '') }}</span>
                    </li>
                  </ul>

                  <button 
                    @click="selectJob(job.title)" 
                    class="inline-flex items-center gap-2 text-sm font-bold text-[#4f46e5] hover:text-[#09033b] transition-colors group"
                  >
                    Apply for this role 
                    <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
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
          <div id="application-form" class="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden scroll-mt-24">
            <header class="bg-[#09033b] px-8 py-6">
              <h2 id="form-heading" class="text-xl font-semibold text-white">Application Form</h2>
              <p class="text-blue-200 text-sm mt-1">Please fill out all required fields carefully.</p>
            </header>

            <form @submit.prevent="submitApplication" class="p-8 space-y-8" novalidate>
              
              <fieldset class="space-y-6">
                <legend class="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 w-full pb-2">Personal Details</legend>
                
                <div class="space-y-6">
                  <div class="relative group">
                    <input 
                      type="text" 
                      id="name" 
                      v-model="form.name" 
                      @blur="validateField('name')"
                      required
                      aria-required="true"
                      :aria-invalid="!!errors.name"
                      class="peer w-full px-4 py-3.5 bg-gray-50 border rounded-xl outline-none transition-all pt-6"
                      :class="errors.name ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-gray-200 focus:border-[#09033b] focus:ring-2 focus:ring-[#09033b]/20 focus:bg-white'"
                      placeholder=" "
                    />
                    <label for="name" class="absolute left-4 top-2 text-xs font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs" :class="errors.name ? 'text-red-500' : 'text-gray-500 peer-focus:text-[#09033b]'">
                      Full Name <span class="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <p v-if="errors.name" class="absolute -bottom-5 left-1 text-xs text-red-500 animate-fade-in">{{ errors.name }}</p>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-5">
                    <div class="relative group">
                      <input 
                        type="email" 
                        id="email" 
                        v-model="form.email" 
                        @blur="validateField('email')"
                        required
                        aria-required="true"
                        :aria-invalid="!!errors.email"
                        class="peer w-full px-4 py-3.5 bg-gray-50 border rounded-xl outline-none transition-all pt-6"
                        :class="errors.email ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-gray-200 focus:border-[#09033b] focus:ring-2 focus:ring-[#09033b]/20 focus:bg-white'"
                        placeholder=" "
                      />
                      <label for="email" class="absolute left-4 top-2 text-xs font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs" :class="errors.email ? 'text-red-500' : 'text-gray-500 peer-focus:text-[#09033b]'">
                        Email Address <span class="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <p v-if="errors.email" class="absolute -bottom-5 left-1 text-xs text-red-500 animate-fade-in">{{ errors.email }}</p>
                    </div>

                    <div class="relative group">
                      <input 
                        type="tel" 
                        id="phone" 
                        v-model="form.phone" 
                        @blur="validateField('phone')"
                        required
                        aria-required="true"
                        :aria-invalid="!!errors.phone"
                        class="peer w-full px-4 py-3.5 bg-gray-50 border rounded-xl outline-none transition-all pt-6"
                        :class="errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-gray-200 focus:border-[#09033b] focus:ring-2 focus:ring-[#09033b]/20 focus:bg-white'"
                        placeholder=" "
                      />
                      <label for="phone" class="absolute left-4 top-2 text-xs font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs" :class="errors.phone ? 'text-red-500' : 'text-gray-500 peer-focus:text-[#09033b]'">
                        Phone Number <span class="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <p v-if="errors.phone" class="absolute -bottom-5 left-1 text-xs text-red-500 animate-fade-in">{{ errors.phone }}</p>
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset class="space-y-6 pt-2">
                <legend class="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 w-full pb-2">Position</legend>
                
                <div class="grid grid-cols-1 gap-6">
                  <div class="relative">
                    <label for="position" class="sr-only">Select Position</label>
                    <select 
                      id="position"
                      v-model="form.position" 
                      @blur="validateField('position')"
                      @change="validateField('position')"
                      required
                      aria-required="true"
                      :aria-invalid="!!errors.position"
                      :disabled="openJobs.length === 0"
                      class="w-full px-4 py-3.5 bg-gray-50 border rounded-xl outline-none transition-all appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                      :class="errors.position ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-gray-200 focus:border-[#09033b] focus:ring-2 focus:ring-[#09033b]/20 focus:bg-white'"
                    >
                      <option value="" disabled selected>
                        {{ fetchingJobs ? 'Loading positions...' : (openJobs.length === 0 ? 'No positions available' : 'Select a position...') }}
                      </option>
                      <option v-for="job in openJobs" :key="job.id" :value="job.title">{{ job.title }}</option>
                    </select>
                    <UIcon name="i-heroicons-chevron-down" class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" :class="errors.position ? 'text-red-400' : 'text-gray-400'" aria-hidden="true" />
                    <p v-if="errors.position" class="absolute -bottom-5 left-1 text-xs text-red-500 animate-fade-in">{{ errors.position }}</p>
                  </div>

                  <div class="relative">
                    <label for="details" class="sr-only">Cover Letter Details</label>
                    <textarea 
                      id="details"
                      v-model="form.details" 
                      rows="6"
                      class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#09033b]/20 focus:border-[#09033b] focus:bg-white transition-all placeholder-gray-500 resize-none"
                      placeholder="Cover Letter: Tell us briefly about your experience and why you want to join us..."
                    ></textarea>
                    <p class="text-xs text-gray-500 mt-2 text-right">Optional but recommended (Max 300 words).</p>
                  </div>
                </div>
              </fieldset>

              <fieldset class="space-y-4">
                <legend class="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 w-full pb-2">CV / Resume <span class="text-red-500 normal-case">*</span></legend>
                
                <div 
                  class="relative border-2 border-dashed rounded-2xl transition-all duration-300 ease-in-out text-center group"
                  :class="[
                    dragActive && !loading ? 'border-[#09033b] bg-blue-50/50 scale-[1.01]' : 'border-gray-200',
                    !loading ? 'hover:border-[#09033b]/50 hover:bg-gray-50 focus-within:border-[#09033b] focus-within:ring-2 focus-within:ring-[#09033b]/20 cursor-pointer' : 'opacity-50 pointer-events-none cursor-not-allowed',
                    errors.file ? 'border-red-300 bg-red-50/30' : ''
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
                    :disabled="loading"
                    @change="handleFileChange"
                  />
                  
                  <label for="cv-upload" class="block p-8 sm:p-10 w-full h-full" :class="loading ? 'cursor-not-allowed' : 'cursor-pointer'">
                    <div v-if="selectedFile" class="flex flex-col items-center animate-fade-in">
                      <div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-3">
                        <UIcon name="i-heroicons-document-check" class="w-8 h-8 text-green-600" aria-hidden="true" />
                      </div>
                      <p class="text-sm font-semibold text-gray-900">{{ selectedFile.name }}</p>
                      <p class="text-xs text-gray-500 mt-1">{{ formatFileSize(selectedFile.size) }}</p>
                      <button 
                        v-if="!loading"
                        type="button"
                        @click.prevent="clearFile"
                        class="mt-3 text-xs text-red-500 hover:text-red-700 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded-sm px-1"
                        aria-label="Remove uploaded file"
                      >
                        Remove file
                      </button>
                    </div>

                    <div v-else class="flex flex-col items-center">
                      <div class="w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-transform" :class="errors.file ? 'bg-red-50' : 'bg-indigo-50 group-hover:scale-110'">
                        <UIcon name="i-heroicons-cloud-arrow-up" class="w-8 h-8" :class="errors.file ? 'text-red-400' : 'text-[#09033b]'" aria-hidden="true" />
                      </div>
                      <p class="text-base font-medium text-gray-900">
                        <span class="underline decoration-2 underline-offset-2" :class="errors.file ? 'text-red-500 decoration-red-300' : 'text-[#09033b] decoration-[#FF7F50]'">Click to upload</span> or drag and drop
                      </p>
                      <p class="text-xs text-gray-500 mt-2">PDF, DOC, DOCX up to 10MB</p>
                    </div>
                  </label>
                </div>
                <p v-if="errors.file" class="text-xs text-red-500 animate-fade-in text-center">{{ errors.file }}</p>
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
                    <span v-if="loading">{{ loadingText }}</span>
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
  default: () => []
})

// --- UX State ---
const expandedJobId = ref(null)

const toggleJob = (id) => {
  expandedJobId.value = expandedJobId.value === id ? null : id
}

const selectJob = (title) => {
  form.position = title
  errors.position = '' // Clear error if selected
  // Scroll to form smoothly
  const formElement = document.getElementById('application-form')
  if (formElement) {
    formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// --- Client-Side Form State ---
const form = reactive({
  name: '',
  email: '',
  phone: '',
  position: '',
  details: ''
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  position: '',
  file: ''
})

const selectedFile = ref(null)
const loading = ref(false)
const loadingText = ref('Submitting...')
const dragActive = ref(false)
const message = ref('')
const messageType = ref('')

// --- Validation Logic ---
const validateField = (field) => {
  if (field === 'name') {
    errors.name = form.name.trim() ? '' : 'Full name is required'
  }
  if (field === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.email.trim()) errors.email = 'Email is required'
    else if (!emailRegex.test(form.email)) errors.email = 'Please enter a valid email'
    else errors.email = ''
  }
  if (field === 'phone') {
    errors.phone = form.phone.trim() ? '' : 'Phone number is required'
  }
  if (field === 'position') {
    errors.position = form.position ? '' : 'Please select a position'
  }
}

const validateAll = () => {
  validateField('name')
  validateField('email')
  validateField('phone')
  validateField('position')
  errors.file = selectedFile.value ? '' : 'Please upload your CV/Resume'
  
  return !errors.name && !errors.email && !errors.phone && !errors.position && !errors.file
}

// --- File Handling ---
const handleFileChange = (e) => validateAndSetFile(e.target.files[0])
const handleDrop = (e) => {
  if (loading.value) return
  dragActive.value = false
  validateAndSetFile(e.dataTransfer.files[0])
}

const validateAndSetFile = (file) => {
  if (!file) return

  // Size Check (10MB)
  if (file.size > 10 * 1024 * 1024) {
    errors.file = 'File is too large (Max 10MB).'
    return
  }

  // Type Check
  const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  if (!allowed.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
    errors.file = 'Only PDF, DOC, or DOCX files allowed.'
    return
  }

  selectedFile.value = file
  errors.file = ''
  message.value = '' 
}

const clearFile = () => {
  selectedFile.value = null
  const input = document.getElementById('cv-upload')
  if (input) input.value = ''
  errors.file = ''
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
  if (!validateAll()) {
    showFeedback('Please correct the errors in the form before submitting.', 'error')
    return
  }

  try {
    loading.value = true
    message.value = ''
    
    // Step 1: Uploading File
    loadingText.value = 'Uploading CV...'
    const fileName = `${Date.now()}_${selectedFile.value.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('cvs')
      .upload(fileName, selectedFile.value)

    if (uploadError) throw new Error('CV Upload failed: ' + uploadError.message)

    const { data: urlData } = supabase.storage.from('cvs').getPublicUrl(fileName)

    // Step 2: Saving Application Data
    loadingText.value = 'Saving Application...'
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
    
    // Clear validations
    Object.keys(errors).forEach(key => errors[key] = '')

  } catch (err) {
    console.error(err)
    showFeedback(err.message || 'Something went wrong. Please try again.', 'error')
  } finally {
    loading.value = false
    loadingText.value = 'Submit Application'
  }
}
</script>

<style scoped>
/* Fade In Animation */
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

/* Smooth scroll-margin for when clicking 'Apply' scrolls to form */
html {
  scroll-behavior: smooth;
}
</style>