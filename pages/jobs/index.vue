<template>
  <div class="relative w-full min-h-screen bg-[#F8F9FC] font-inter text-gray-800 selection:bg-[#09033b] selection:text-white">
    
    <div class="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
      <svg width="100%" height="100%">
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#09033b"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        
        <div class="lg:col-span-5 lg:sticky lg:top-12 space-y-10">
          
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#09033b] text-xs font-bold tracking-wide uppercase mb-6">
              <span class="w-2 h-2 rounded-full bg-[#FF7F50]"></span>
              We are hiring
            </div>
            <h1 class="text-4xl md:text-5xl font-bold text-[#09033b] leading-tight tracking-tight">
              Shape the Future with <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#09033b] to-[#4f46e5]">Covenant Academy</span>
            </h1>
            <p class="mt-6 text-lg text-gray-600 leading-relaxed">
              Join a community dedicated to excellence in Christian education. We are looking for passionate individuals ready to make a lasting impact on the next generation.
            </p>
          </div>

          <div class="space-y-4">
            <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider">Why join us?</h3>
            <ul class="space-y-3">
              <li v-for="(benefit, index) in benefits" :key="index" class="flex items-start">
                <div class="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                  <UIcon name="i-heroicons-check" class="w-4 h-4 text-green-600" />
                </div>
                <span class="ml-3 text-gray-600">{{ benefit }}</span>
              </li>
            </ul>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-[#09033b]">
                <UIcon name="i-heroicons-chat-bubble-left-right" class="w-6 h-6" />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Have questions?</p>
                <a href="mailto:careers@covenant.edu" class="text-sm text-gray-500 hover:text-[#FF7F50] transition-colors">careers@covenant.edu</a>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-7">
          <div class="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            <div class="bg-[#09033b] px-8 py-6">
              <h2 class="text-xl font-semibold text-white">Application Form</h2>
              <p class="text-blue-200 text-sm mt-1">Please fill out all required fields carefully.</p>
            </div>

            <form @submit.prevent="submitApplication" class="p-8 space-y-8">
              
              <div class="space-y-6">
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">Personal Details</h3>
                
                <div class="space-y-5">
                  <div class="relative group">
                    <input 
                      type="text" 
                      id="name" 
                      v-model="form.name" 
                      required
                      class="peer w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#09033b]/20 focus:border-[#09033b] focus:bg-white transition-all pt-6"
                      placeholder=" "
                    />
                    <label for="name" class="absolute left-4 top-2 text-xs text-gray-500 font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#09033b]">
                      Full Name <span class="text-red-500">*</span>
                    </label>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div class="relative group">
                      <input 
                        type="email" 
                        id="email" 
                        v-model="form.email" 
                        required
                        class="peer w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#09033b]/20 focus:border-[#09033b] focus:bg-white transition-all pt-6"
                        placeholder=" "
                      />
                      <label for="email" class="absolute left-4 top-2 text-xs text-gray-500 font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#09033b]">
                        Email Address <span class="text-red-500">*</span>
                      </label>
                    </div>

                    <div class="relative group">
                      <input 
                        type="tel" 
                        id="phone" 
                        v-model="form.phone" 
                        required
                        class="peer w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#09033b]/20 focus:border-[#09033b] focus:bg-white transition-all pt-6"
                        placeholder=" "
                      />
                      <label for="phone" class="absolute left-4 top-2 text-xs text-gray-500 font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#09033b]">
                        Phone Number <span class="text-red-500">*</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-y-6">
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">Position</h3>
                
                <div class="grid grid-cols-1 gap-5">
                  <div class="relative">
                    <select 
                      v-model="form.position" 
                      required
                      class="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#09033b]/20 focus:border-[#09033b] focus:bg-white transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled selected>Select a position...</option>
                      <option v-for="pos in positions" :key="pos" :value="pos">{{ pos }}</option>
                    </select>
                    <UIcon name="i-heroicons-chevron-down" class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>

                  <div class="relative">
                    <textarea 
                      v-model="form.details" 
                      rows="4"
                      class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#09033b]/20 focus:border-[#09033b] focus:bg-white transition-all placeholder-gray-400 resize-none"
                      placeholder="Cover Letter: Tell us briefly about your experience and why you want to join us..."
                    ></textarea>
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">CV / Resume</h3>
                
                <div 
                  class="relative border-2 border-dashed rounded-2xl transition-all duration-300 ease-in-out text-center"
                  :class="[
                    dragActive 
                      ? 'border-[#09033b] bg-blue-50/50 scale-[1.01]' 
                      : 'border-gray-200 hover:border-[#09033b]/50 hover:bg-gray-50'
                  ]"
                  @dragenter.prevent="dragActive = true"
                  @dragleave.prevent="dragActive = false"
                  @dragover.prevent
                  @drop.prevent="handleDrop"
                >
                  <input 
                    type="file" 
                    id="cv-upload" 
                    ref="fileInput"
                    class="hidden" 
                    accept=".pdf,.doc,.docx"
                    @change="handleFileChange"
                  />
                  
                  <div class="p-8 sm:p-10 cursor-pointer" @click="$refs.fileInput.click()">
                    <div v-if="selectedFile" class="flex flex-col items-center animate-fade-in">
                      <div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-3">
                        <UIcon name="i-heroicons-document-check" class="w-8 h-8 text-green-600" />
                      </div>
                      <p class="text-sm font-semibold text-gray-900">{{ selectedFile.name }}</p>
                      <p class="text-xs text-gray-500 mt-1">{{ formatFileSize(selectedFile.size) }}</p>
                      <button 
                        @click.stop="clearFile"
                        class="mt-3 text-xs text-red-500 hover:text-red-700 font-medium hover:underline"
                      >
                        Remove file
                      </button>
                    </div>

                    <div v-else class="flex flex-col items-center">
                      <div class="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <UIcon name="i-heroicons-cloud-arrow-up" class="w-8 h-8 text-[#09033b]" />
                      </div>
                      <p class="text-base font-medium text-gray-900">
                        <span class="text-[#09033b] underline decoration-[#FF7F50] decoration-2 underline-offset-2">Click to upload</span> or drag and drop
                      </p>
                      <p class="text-xs text-gray-400 mt-2">PDF, DOC, DOCX up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="pt-4">
                <div v-if="message" class="mb-4 p-4 rounded-xl flex items-start gap-3" :class="messageType === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'">
                  <UIcon :name="messageType === 'success' ? 'i-heroicons-check-circle' : 'i-heroicons-exclamation-circle'" class="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p class="text-sm">{{ message }}</p>
                </div>

                <button 
                  type="submit" 
                  :disabled="loading"
                  class="w-full relative group overflow-hidden bg-[#09033b] text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-indigo-900/20 hover:shadow-indigo-900/40 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span class="relative z-10 flex items-center justify-center gap-2">
                    <span v-if="loading">Submitting Application...</span>
                    <span v-else>Submit Application</span>
                    <UIcon v-if="!loading" name="i-heroicons-arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <UIcon v-else name="i-heroicons-arrow-path" class="w-5 h-5 animate-spin" />
                  </span>
                  <div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

useHead({
  title: 'Careers - The Covenant Academy',
})

const supabase = useSupabaseClient()

// Constants
const benefits = [
  'Faith-centered work environment',
  'Professional development opportunities',
  'Competitive salary packages',
  'Health & Wellness support',
  'Modern teaching facilities'
]

const positions = [
  'Teacher', 'Assistant Teacher', 'Administrator', 
  'Deputy Principal', 'Bursar', 'IT Support', 
  'Facility Manager', 'Security', 'Janitor', 'Other'
]

// State
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

// File Handling
const handleFileChange = (e) => validateAndSetFile(e.target.files[0])
const handleDrop = (e) => {
  dragActive.value = false
  validateAndSetFile(e.dataTransfer.files[0])
}

const validateAndSetFile = (file) => {
  if (!file) return

  // Size Check (10MB)
  if (file.size > 10 * 1024 * 1024) {
    showFeedback('File is too large (Max 10MB)', 'error')
    return
  }

  // Type Check
  const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  if (!allowed.includes(file.type)) {
    showFeedback('Only PDF, DOC, or DOCX files allowed', 'error')
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
  if (type === 'error') setTimeout(() => message.value = '', 5000)
}

// Submission
const submitApplication = async () => {
  if (!selectedFile.value) {
    showFeedback('Please upload your CV/Resume', 'error')
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
    
    // Reset
    Object.keys(form).forEach(k => form[k] = '')
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
</style>