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
      <div class="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <!-- Header Section -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center space-x-3 mb-6">
            <div class="w-2 h-2 bg-[#09033b] rounded-full"></div>
            <span class="text-sm font-medium text-gray-600 tracking-wide uppercase">
              Join Our Team
            </span>
          </div>
          
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-light leading-[0.9] text-[#09033b] tracking-tight mb-6">
            Career
            <span class="font-medium block">Application</span>
          </h1>
          
          <div class="w-16 h-px bg-[#09033b] mx-auto mb-8"></div>
          
          <p class="text-xl text-gray-600 leading-relaxed font-light max-w-2xl mx-auto">
            Join The Covenant Academy family and help shape tomorrow's leaders through excellence in Christian education.
          </p>
        </div>
  
        <!-- Application Form -->
        <div class="bg-white/90 backdrop-blur-sm border border-gray-100 p-8 lg:p-12 transition-all duration-300 hover:shadow-xl">
          <form @submit.prevent="submitApplication" class="space-y-8">
            <!-- Personal Information Section -->
            <div class="space-y-6">
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-8 h-8 bg-[#09033b] flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h2 class="text-xl font-medium text-[#09033b]">Personal Information</h2>
              </div>
  
              <!-- Name -->
              <div class="group">
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span class="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-[#09033b] focus:ring-1 focus:ring-[#09033b] transition-all duration-300 placeholder-gray-400"
                  placeholder="Enter your full name"
                />
              </div>
  
              <!-- Email & Phone Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="group">
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-[#09033b] focus:ring-1 focus:ring-[#09033b] transition-all duration-300 placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                </div>
  
                <div class="group">
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    required
                    class="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-[#09033b] focus:ring-1 focus:ring-[#09033b] transition-all duration-300 placeholder-gray-400"
                    placeholder="+234 xxx xxx xxxx"
                  />
                </div>
              </div>
            </div>
  
            <!-- Position Information Section -->
            <div class="space-y-6 pt-8 border-t border-gray-100">
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-8 h-8 bg-[#09033b] flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
                  </svg>
                </div>
                <h2 class="text-xl font-medium text-[#09033b]">Position Details</h2>
              </div>
  
              <!-- Position -->
              <div class="group">
                <label for="position" class="block text-sm font-medium text-gray-700 mb-2">
                  Desired Position <span class="text-red-500">*</span>
                </label>
                <select
                  id="position"
                  v-model="form.position"
                  required
                  class="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-[#09033b] focus:ring-1 focus:ring-[#09033b] transition-all duration-300 bg-white text-black"
                >
                  <option value="">Select a position</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Assistant Teacher">Assistant Teacher</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Deputy Principal">Deputy Principal</option>
                  <option value="Bursar">Bursar</option>
                  <option value="IT Support">IT Support</option>
                  <option value="Facility Manager">Facility Manager</option>
                  <option value="Security">Security</option>
                  <option value="Janitor">Janitor</option>
                  <option value="Other">Other</option>
                </select>
              </div>
  
              <!-- Details -->
              <div class="group">
                <label for="details" class="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter / Additional Details
                </label>
                <textarea
                  id="details"
                  v-model="form.details"
                  rows="6"
                  placeholder="Tell us about your experience, qualifications, and why you're passionate about joining The Covenant Academy family..."
                  class="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-[#09033b] focus:ring-1 focus:ring-[#09033b] transition-all duration-300 placeholder-gray-400 resize-none"
                ></textarea>
              </div>
            </div>
  
            <!-- Document Upload Section -->
            <div class="space-y-6 pt-8 border-t border-gray-100">
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-8 h-8 bg-[#09033b] flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h2 class="text-xl font-medium text-[#09033b]">Supporting Documents</h2>
              </div>
  
              <!-- CV Upload -->
              <div class="group">
                <label for="cv" class="block text-sm font-medium text-gray-700 mb-2">
                  CV/Resume <span class="text-red-500">*</span>
                </label>
                
                <div class="relative">
                  <input
                    id="cv"
                    ref="fileInput"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    @change="handleFileChange"
                    class="hidden"
                  />
                  
                  <!-- Custom File Upload Button -->
                  <button
                    type="button"
                    @click="$refs.fileInput.click()"
                    class="w-full px-4 py-6 border-2 border-dashed border-gray-200 hover:border-[#09033b] focus:outline-none focus:border-[#09033b] transition-all duration-300 group"
                    :class="selectedFile ? 'border-[#09033b] bg-[#09033b]/5' : 'hover:bg-gray-50'"
                  >
                    <div class="flex flex-col items-center space-y-3">
                      <div class="w-12 h-12 bg-gray-100 group-hover:bg-[#09033b] flex items-center justify-center transition-colors duration-300" :class="selectedFile ? 'bg-[#09033b]' : ''">
                        <svg class="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" :class="selectedFile ? 'text-white' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6l.12.003A5 5 0 0121 11a4.5 4.5 0 01-1.826 3.627c-.104.067-.209.134-.316.198"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14l4-4m0 0l4 4m-4-4v12"></path>
                        </svg>
                      </div>
                      
                      <div class="text-center">
                        <p class="text-sm font-medium text-gray-700" :class="selectedFile ? 'text-[#09033b]' : ''">
                          {{ selectedFile ? selectedFile.name : 'Click to upload your CV/Resume' }}
                        </p>
                        <p class="text-xs text-gray-500 mt-1">
                          {{ selectedFile ? `File size: ${formatFileSize(selectedFile.size)}` : 'PDF, DOC, or DOCX files only (Max 10MB)' }}
                        </p>
                      </div>
                      
                      <!-- File Selected Indicator -->
                      <div v-if="selectedFile" class="flex items-center space-x-2 text-[#09033b]">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span class="text-sm font-medium">File selected</span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
  
            <!-- Submit Button -->
            <div class="pt-8">
              <button
                type="submit"
                :disabled="loading"
                class="group w-full bg-[#09033b] text-white py-4 px-8 font-medium hover:bg-[#0a0440] focus:outline-none focus:ring-2 focus:ring-[#09033b] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <span>{{ loading ? 'Submitting Application...' : 'Submit Application' }}</span>
                <svg v-if="!loading" class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
                <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>
            </div>
          </form>
  
          <!-- Success/Error Messages -->
          <div v-if="message" class="mt-8 p-6 transition-all duration-300" :class="messageType === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'">
            <div class="flex items-center space-x-3">
              <div class="flex-shrink-0">
                <svg v-if="messageType === 'success'" class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <svg v-else class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <p class="font-medium" :class="messageType === 'success' ? 'text-green-800' : 'text-red-800'">
                {{ message }}
              </p>
            </div>
          </div>
        </div>
  
        <!-- Contact Information -->
        <div class="text-center mt-12 text-gray-600">
          <p class="mb-2">Questions about the application process?</p>
          <p class="text-sm">
            Contact us at 
            <a href="mailto:tcadinfo@gmail.com" class="text-[#09033b] hover:underline font-medium">tcadinfo@gmail.com</a>
            or call 
            <a href="tel:+2348036233157" class="text-[#09033b] hover:underline font-medium">+234 803 623 3157</a>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // SEO and Meta Configuration
  useHead({
    title: 'Career Opportunities - Join The Covenant Academy Team',
    meta: [
      {
        name: 'description',
        content: 'Join The Covenant Academy family as an educator or staff member. Apply for teaching positions, administrative roles, and support staff opportunities in our Christ-centered learning environment.'
      },
      {
        name: 'keywords',
        content: 'Covenant Academy jobs, teaching positions Nigeria, Christian school careers, education jobs, school administrator positions, teaching vacancies'
      },
      {
        property: 'og:title',
        content: 'Career Opportunities - Join The Covenant Academy Team'
      },
      {
        property: 'og:description',
        content: 'Apply to join our dedicated team of educators and staff committed to shaping tomorrow\'s leaders through excellence in Christian education.'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: 'Career Opportunities - The Covenant Academy'
      },
      {
        name: 'twitter:description',
        content: 'Join our team of dedicated educators committed to Christian excellence in education.'
      },
      {
        name: 'robots',
        content: 'index, follow'
      },
      {
        name: 'theme-color',
        content: '#09033b'
      }
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://thecovenantacademy.edu.ng/careers/apply'
      }
    ]
  })
  
  // Structured Data for SEO
//   useJsonld({
//     '@context': 'https://schema.org',
//     '@type': 'WebPage',
//     name: 'Career Application - The Covenant Academy',
//     description: 'Apply for teaching and staff positions at The Covenant Academy',
//     // url: 'https://thecovenantacademy.edu.ng/careers/apply',
//     isPartOf: {
//       '@type': 'WebSite',
//       name: 'The Covenant Academy',
//     //   url: 'https://thecovenantacademy.edu.ng'
//     },
//     about: {
//       '@type': 'EducationalOrganization',
//       name: 'The Covenant Academy',
//       description: 'Christ-centered educational institution committed to academic excellence'
//     }
//   })
  
  const supabase = useSupabaseClient()
  
  // Form state
  const form = ref({
    name: '',
    email: '',
    phone: '',
    position: '',
    details: ''
  })
  
  const selectedFile = ref(null)
  const loading = ref(false)
  const message = ref('')
  const messageType = ref('')
  
  // File handling
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        message.value = 'File size must be less than 10MB. Please select a smaller file.'
        messageType.value = 'error'
        event.target.value = ''
        selectedFile.value = null
        setTimeout(() => {
          message.value = ''
        }, 5000)
        return
      }
      
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(file.type)) {
        message.value = 'Please select a PDF, DOC, or DOCX file.'
        messageType.value = 'error'
        event.target.value = ''
        selectedFile.value = null
        setTimeout(() => {
          message.value = ''
        }, 5000)
        return
      }
      
      selectedFile.value = file
      if (message.value && messageType.value === 'error') {
        message.value = ''
      }
    }
  }
  
  // Format file size for display
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
  
  // Form submission
  const submitApplication = async () => {
    if (!selectedFile.value) {
      message.value = 'Please select a CV/Resume file to upload.'
      messageType.value = 'error'
      setTimeout(() => {
        message.value = ''
      }, 5000)
      return
    }
  
    loading.value = true
    message.value = ''
  
    try {
      // Upload CV file
      const fileName = `${Date.now()}_${selectedFile.value.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('cvs')
        .upload(fileName, selectedFile.value)
  
      if (uploadError) throw uploadError
  
      // Get public URL for the uploaded file
      const { data: urlData } = supabase.storage
        .from('cvs')
        .getPublicUrl(fileName)
  
      // Insert application data
      const { error: insertError } = await supabase
        .from('job_applications')
        .insert({
          name: form.value.name,
          email: form.value.email,
          phone: form.value.phone,
          position: form.value.position,
          details: form.value.details,
          cv_url: urlData.publicUrl,
          cv_filename: selectedFile.value.name,
          application_date: new Date().toISOString(),
          status: 'pending'
        })
  
      if (insertError) throw insertError
  
      message.value = 'Thank you! Your application has been submitted successfully. We will review your application and contact you soon.'
      messageType.value = 'success'
      
      // Reset form
      form.value = {
        name: '',
        email: '',
        phone: '',
        position: '',
        details: ''
      }
      selectedFile.value = null
      if (process.client) {
        document.getElementById('cv').value = ''
      }
  
      // Scroll to success message
      setTimeout(() => {
        document.querySelector('[data-success-message]')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
  
    } catch (error) {
      console.error('Error submitting application:', error)
      message.value = 'We encountered an error while submitting your application. Please try again or contact us directly.'
      messageType.value = 'error'
    } finally {
      loading.value = false
      
      // Auto-hide message after 10 seconds
      setTimeout(() => {
        message.value = ''
      }, 10000)
    }
  }
  
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
  
  * {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }
  
  /* Smooth transitions */
  * {
    transition-property: color, background-color, border-color, transform, opacity, box-shadow;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* Enhanced focus states */
  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: 2px solid #09033b;
    outline-offset: 2px;
  }
  
  /* Form field hover effects */
  .group:hover input,
  .group:hover select,
  .group:hover textarea {
    border-color: #09033b;
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
    .absolute {
      position: static !important;
    }
    
    .bg-gradient-to-b {
      background: #09033b !important;
    }
    
    button {
      display: none !important;
    }
  }
  
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .text-4xl { font-size: 2rem; }
    .text-5xl { font-size: 2.5rem; }
    .text-6xl { font-size: 3rem; }
    
    .px-8 { padding-left: 1rem; padding-right: 1rem; }
    .lg\:px-12 { padding-left: 1.5rem; padding-right: 1.5rem; }
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 4px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f8f9fa;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #09033b;
    border-radius: 2px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #0a0440;
  }
  
  /* Loading animation */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  /* Form validation styles */
  input:invalid:not(:focus):not(:placeholder-shown),
  select:invalid:not(:focus),
  textarea:invalid:not(:focus):not(:placeholder-shown) {
    border-color: #ef4444;
  }
  
  input:valid:not(:focus):not(:placeholder-shown),
  select:valid:not(:focus),
  textarea:valid:not(:focus):not(:placeholder-shown) {
    border-color: #10b981;
  }
  
  /* File upload animation */
  .group:hover .w-12 {
    transform: scale(1.05);
  }
  
  /* Smooth page transitions */
  .page-enter-active,
  .page-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
  }
  </style>