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
    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
      <!-- Header Section -->
      <div class="text-center mb-16 pt-12">
        <div class="inline-flex items-center space-x-3 mb-8">
          <div class="w-2 h-2 bg-[#09033b] rounded-full"></div>
          <span class="text-sm font-medium text-gray-600 tracking-wide uppercase">
            Meet Our Team
          </span>
        </div>
        
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-light leading-[0.9] text-[#09033b] tracking-tight mb-8">
          Our
          <span class="font-medium">Team</span>
        </h1>
        
        <!-- Subtle Accent Line -->
        <div class="w-16 h-px bg-[#09033b] mx-auto mb-6"></div>
        
        <p class="text-gray-500 font-light text-lg max-w-2xl mx-auto">
          Meet our dedicated team of God-fearing professionals
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center p-16">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-[#09033b] border-r-transparent"></div>
        <p class="mt-6 text-gray-600 font-light">Loading team members...</p>
      </div>

      <!-- Team Sections -->
      <div v-else class="space-y-20">
        <!-- Management Team Section -->
        <div v-if="teamSections.management.length > 0" class="section">
          <div class="mb-12">
            <h2 class="text-2xl md:text-3xl font-light text-[#09033b] mb-4">
              Management <span class="font-medium">Team</span>
            </h2>
            <div class="w-12 h-px bg-[#09033b]"></div>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div 
              v-for="staff in teamSections.management" 
              :key="staff.id" 
              class="group bg-white border border-gray-100 hover:border-[#09033b] transition-all duration-500 hover:shadow-lg"
            >
              <div class="aspect-square bg-gray-100 overflow-hidden">
                <img
                  :src="staff.pictureUrl || '/assets/images/default-avatar.webp'"
                  :alt="`${staff.name}'s profile`"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  @error="handleImageError"
                  loading="lazy"
                />
              </div>
              
              <div class="p-6">
                <h3 class="text-[#09033b] text-lg font-light mb-2 group-hover:text-gray-600 transition-colors duration-300">
                  {{ staff.name }}
                </h3>
                <p class="text-gray-500 text-sm font-light">
                  {{ staff.position }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Office Team Section -->
        <div v-if="teamSections.office.length > 0" class="section">
          <div class="mb-12">
            <h2 class="text-2xl md:text-3xl font-light text-[#09033b] mb-4">
              Office <span class="font-medium">Team</span>
            </h2>
            <div class="w-12 h-px bg-[#09033b]"></div>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div 
              v-for="staff in teamSections.office" 
              :key="staff.id" 
              class="group bg-white border border-gray-100 hover:border-[#09033b] transition-all duration-500 hover:shadow-lg"
            >
              <div class="aspect-square bg-gray-100 overflow-hidden">
                <img
                  :src="staff.pictureUrl || '/assets/images/default-avatar.webp'"
                  :alt="`${staff.name}'s profile`"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  @error="handleImageError"
                  loading="lazy"
                />
              </div>
              
              <div class="p-6">
                <h3 class="text-[#09033b] text-lg font-light mb-2 group-hover:text-gray-600 transition-colors duration-300">
                  {{ staff.name }}
                </h3>
                <p class="text-gray-500 text-sm font-light">
                  {{ staff.position }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Teachers Section -->
        <div v-if="teamSections.teacher.length > 0" class="section">
          <div class="mb-12">
            <h2 class="text-2xl md:text-3xl font-light text-[#09033b] mb-4">
              <span class="font-medium">Teachers</span>
            </h2>
            <div class="w-12 h-px bg-[#09033b]"></div>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div 
              v-for="staff in teamSections.teacher" 
              :key="staff.id" 
              class="group bg-white border border-gray-100 hover:border-[#09033b] transition-all duration-500 hover:shadow-lg"
            >
              <div class="aspect-square bg-gray-100 overflow-hidden">
                <img
                  :src="staff.pictureUrl || '/assets/images/default-avatar.webp'"
                  :alt="`${staff.name}'s profile`"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  @error="handleImageError"
                  loading="lazy"
                />
              </div>
              
              <div class="p-6">
                <h3 class="text-[#09033b] text-lg font-light mb-2 group-hover:text-gray-600 transition-colors duration-300">
                  {{ staff.name }}
                </h3>
                <p class="text-gray-500 text-sm font-light">
                  {{ staff.position }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Non-Academic Staff Section -->
        <div v-if="teamSections['non-academic'].length > 0" class="section">
          <div class="mb-12">
            <h2 class="text-2xl md:text-3xl font-light text-[#09033b] mb-4">
              Non-Academic <span class="font-medium">Staff</span>
            </h2>
            <div class="w-12 h-px bg-[#09033b]"></div>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div 
              v-for="staff in teamSections['non-academic']" 
              :key="staff.id" 
              class="group bg-white border border-gray-100 hover:border-[#09033b] transition-all duration-500 hover:shadow-lg"
            >
              <div class="aspect-square bg-gray-100 overflow-hidden">
                <img
                  :src="staff.pictureUrl || '/assets/images/default-avatar.webp'"
                  :alt="`${staff.name}'s profile`"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  @error="handleImageError"
                  loading="lazy"
                />
              </div>
              
              <div class="p-6">
                <h3 class="text-[#09033b] text-lg font-light mb-2 group-hover:text-gray-600 transition-colors duration-300">
                  {{ staff.name }}
                </h3>
                <p class="text-gray-500 text-sm font-light">
                  {{ staff.position }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Volunteers Section -->
        <div v-if="teamSections.volunteer.length > 0" class="section">
          <div class="mb-12">
            <h2 class="text-2xl md:text-3xl font-light text-[#09033b] mb-4">
              <span class="font-medium">Volunteers</span>
            </h2>
            <div class="w-12 h-px bg-[#09033b]"></div>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div 
              v-for="staff in teamSections.volunteer" 
              :key="staff.id" 
              class="group bg-white border border-gray-100 hover:border-orange-500 transition-all duration-500 hover:shadow-lg"
            >
              <div class="aspect-square bg-gray-100 overflow-hidden">
                <img
                  :src="staff.pictureUrl || '/assets/images/default-avatar.webp'"
                  :alt="`${staff.name}'s profile`"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  @error="handleImageError"
                  loading="lazy"
                />
              </div>
              
              <div class="p-6">
                <h3 class="text-[#09033b] text-lg font-light mb-2 group-hover:text-gray-600 transition-colors duration-300">
                  {{ staff.name }}
                </h3>
                <p class="text-gray-500 text-sm font-light">
                  {{ staff.position }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Side Branding -->
    <div class="absolute left-8 top-1/2 transform -translate-y-1/2 -rotate-90 hidden xl:block">
      <span class="text-xs font-medium text-gray-400 tracking-widest uppercase">Excellence • Faith • Character</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
// import { useSupabaseClient } from '#imports'

const supabase = useSupabaseClient()
const allStaff = ref([])
const isLoading = ref(true)

// Define position priorities for sorting
const positionPriority = {
  'Chairman Board of Trustees': 1,
  'Executive Director': 2
}

// Sort function for staff positions
const sortByPosition = (a, b) => {
  const priorityA = positionPriority[a.position] || 999
  const priorityB = positionPriority[b.position] || 999
  return priorityA - priorityB
}

// Organize staff into team sections
const teamSections = computed(() => {
  const sections = {
    'management': [],
    'office': [],
    'teacher': [],
    'non-academic': [],
    'volunteer': []
  }
  
  // Group staff by team
  allStaff.value.forEach(staff => {
    const team = staff.team?.toLowerCase() || ''
    if (sections[team] !== undefined) {
      sections[team].push(staff)
    }
  })
  
  // Sort each section by position priority
  Object.keys(sections).forEach(key => {
    sections[key].sort(sortByPosition)
  })
  
  return sections
})

const fetchAllStaff = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('staff')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    if (data && data.length) {
      // Process profile images
      await Promise.all(data.map(async (staff) => {
        if (staff.profile_image) {
          const { data: urlData, error: urlError } = await supabase.storage
            .from('staff-images')
            .createSignedUrl(staff.profile_image, 60)
          staff.pictureUrl = (!urlError && urlData) ? urlData.signedUrl : null
        } else {
          staff.pictureUrl = null
        }
      }))
    }

    allStaff.value = data || []
  } catch (error) {
    console.error('Error fetching staff:', error)
    // Use a toast notification instead of alert for better UX
    if (window.$nuxt?.$toast) {
      window.$nuxt.$toast.error('Failed to load staff. Please refresh the page.')
    } else {
      console.error('Failed to load staff list.')
    }
  } finally {
    isLoading.value = false
  }
}

const handleImageError = (event) => {
  event.target.src = '/assets/images/default-avatar.webp'
}

onMounted(() => {
  fetchAllStaff()
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
input:focus {
  outline: 2px solid #09033b;
  outline-offset: 2px;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
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
  
  .border-gray-200,
  .border-gray-100 {
    border-color: #000;
  }
}

/* Print styles */
@media print {
  .absolute {
    position: static !important;
  }
}

/* Mobile typography adjustments */
@media (max-width: 768px) {
  .text-4xl { font-size: 2rem; }
  .text-5xl { font-size: 2.5rem; }
  .text-6xl { font-size: 3rem; }
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
</style>