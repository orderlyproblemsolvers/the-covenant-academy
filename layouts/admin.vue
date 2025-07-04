<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Mobile sidebar overlay -->
    <div 
      v-if="isMobileMenuOpen"
      class="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity lg:hidden"
      @click="closeMobileMenu"
    ></div>

    <!-- Sidebar -->
    <div 
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Sidebar header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-700">
        <h1 class="text-xl font-bold text-white">Admin Dashboard</h1>
        <button
          @click="closeMobileMenu"
          class="lg:hidden text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-md p-1"
          aria-label="Close sidebar"
          type="button"
        >
          <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
        </button>
      </div>

      <!-- Navigation -->
      <nav class="mt-4 flex-1 px-2 space-y-1" role="navigation" aria-label="Main navigation">
        <NuxtLink
          v-for="link in links"
          :key="link.name"
          :to="link.path"
          class="group flex items-center px-3 py-3 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
          active-class="bg-gray-900 text-white"
          @click="closeMobileMenu"
        >
          <UIcon :name="link.icon" class="mr-3 flex-shrink-0 w-5 h-5" />
          <span class="truncate">{{ link.name }}</span>
        </NuxtLink>

        <!-- Logout button -->
        <button
          @click="handleLogout"
          :disabled="isLoggingOut"
          class="group flex items-center w-full px-3 py-3 text-sm font-medium text-red-400 rounded-md hover:bg-red-900 hover:bg-opacity-25 hover:text-red-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Sign out of admin dashboard"
          type="button"
        >
          <UIcon 
            :name="isLoggingOut ? 'i-heroicons-arrow-path' : 'i-heroicons-arrow-right-on-rectangle'" 
            :class="[
              'mr-3 flex-shrink-0 w-5 h-5',
              isLoggingOut ? 'animate-spin' : ''
            ]" 
          />
          <span>{{ isLoggingOut ? 'Signing out...' : 'Sign out' }}</span>
        </button>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden lg:ml-0">
      <!-- Mobile header -->
      <header class="bg-white shadow-sm border-b border-gray-200 lg:hidden">
        <div class="flex items-center justify-between px-4 py-3">
          <button
            @click="openMobileMenu"
            class="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-md p-1"
            aria-label="Open sidebar"
            type="button"
          >
            <UIcon name="i-heroicons-bars-3" class="w-6 h-6" />
          </button>
          <h1 class="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
          <div class="w-8"></div> <!-- Spacer for centering -->
        </div>
      </header>

      <!-- Main content area -->
      <main class="flex-1 overflow-auto bg-gray-50" role="main">
        <div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <!-- Error message display -->
          <div 
            v-if="errorMessage" 
            class="mb-4 p-4 bg-red-50 border border-red-200 rounded-md"
            role="alert"
            aria-live="polite"
          >
            <div class="flex items-center">
              <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5 text-red-400 mr-2" />
              <p class="text-sm text-red-700">{{ errorMessage }}</p>
            </div>
          </div>

          <!-- Page content slot -->
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'
import { useRouter } from '#app'

// SEO Meta
useHead({
  title: 'Admin Dashboard',
  meta: [
    { name: 'description', content: 'Admin dashboard for managing staff, resources, and applications' },
    { name: 'robots', content: 'noindex, nofollow' }, // Prevent search engine indexing of admin pages
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
})

// Composables
const supabase = useSupabaseClient()
const router = useRouter()

// Reactive state
const isMobileMenuOpen = ref(false)
const isLoggingOut = ref(false)
const errorMessage = ref('')

// Navigation links with proper Heroicons
const links = [
  { name: "Dashboard", path: "/admin", icon: "i-heroicons-home" },
  { name: "Staff", path: "/admin/staff", icon: "i-heroicons-users" },
  {
    name: "FeeSlip Generator",
    path: "/admin/feeslip",
    icon: "i-heroicons-document-text",
  },
  { name: "Calendar", path: "/admin/calendar", icon: "i-heroicons-calendar-days" },
  {
    name: "Deepwater News",
    path: "/admin/deepwater-news",
    icon: "i-heroicons-newspaper",
  },
  {
    name: "Resources",
    path: "/admin/resources",
    icon: "i-heroicons-folder-open",
  },
  {
    name: "Job Applications",
    path: "/admin/jobs",
    icon: "i-heroicons-briefcase",
  },
]

// Mobile menu functions
const openMobileMenu = () => {
  isMobileMenuOpen.value = true
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Logout function
const handleLogout = async () => {
  if (isLoggingOut.value) return
  
  try {
    isLoggingOut.value = true
    errorMessage.value = ''
    
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      throw error
    }
    
    // Clear any cached data or state here if needed
    // await clearUserData()
    
    // Redirect to login or home page
    await router.push('/')
    
  } catch (error) {
    console.error('Error logging out:', error)
    errorMessage.value = error.message || 'Failed to logout. Please try again.'
  } finally {
    isLoggingOut.value = false
  }
}

// Close mobile menu when route changes
watch(() => router.currentRoute.value.path, () => {
  closeMobileMenu()
})

// Close mobile menu on escape key
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && isMobileMenuOpen.value) {
      closeMobileMenu()
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})

// Auto-clear error messages after 5 seconds
watch(errorMessage, (newMessage) => {
  if (newMessage) {
    setTimeout(() => {
      if (errorMessage.value === newMessage) {
        errorMessage.value = ''
      }
    }, 5000)
  }
})
</script>

<style scoped>
/* Ensure proper scrolling on mobile */
@media (max-width: 1023px) {
  body {
    overflow: hidden;
  }
}

/* Custom scrollbar for webkit browsers */
.overflow-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>