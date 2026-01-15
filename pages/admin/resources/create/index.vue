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

    <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      
      <nav class="flex items-center text-sm font-medium text-gray-500 mb-6">
        <NuxtLink 
          to="/admin/resources" 
          class="hover:text-[#09033b] transition-colors flex items-center"
        >
          <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 mr-1" />
          Resources
        </NuxtLink>
        <span class="mx-3 text-gray-300">/</span>
        <span class="text-[#09033b] font-semibold">New Entry</span>
      </nav>

      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold text-[#09033b] tracking-tight">Create Resource</h1>
          <p class="mt-1 text-gray-500">Draft a new article, announcement, or educational guide.</p>
        </div>
        
        <div class="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-50 text-[#09033b] rounded-lg border border-indigo-100 text-sm font-medium">
          <span class="w-2 h-2 rounded-full bg-[#FF7F50] animate-pulse"></span>
          Draft Mode
        </div>
      </div>

      <Transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showSuccess" class="fixed top-6 right-6 z-50 bg-white border-l-4 border-green-500 shadow-xl rounded-r-lg p-4 flex items-center gap-3">
          <div class="p-1 bg-green-100 rounded-full text-green-600">
            <UIcon name="i-heroicons-check" class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-sm font-medium text-green-900">Published Successfully</h3>
            <p class="text-xs text-green-600 mt-0.5">Redirecting to resource view...</p>
          </div>
        </div>
      </Transition>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="h-1 w-full bg-gradient-to-r from-[#09033b] via-[#4f46e5] to-[#FF7F50]"></div>
        
        <div class="p-6 sm:p-8">
          <BlogEditor 
            @submit="handleSubmit" 
            @cancel="handleCancel"
            class="space-y-6"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
  auth: true
})

useHead({
  title: 'Create Resource - Admin Dashboard',
})

const router = useRouter()
const showSuccess = ref(false)

const handleSubmit = async (post) => {
  // Show visual feedback
  showSuccess.value = true
  
  // Wait a moment for the toast to be seen before redirecting
  setTimeout(() => {
    // Assuming the API response (post) contains the new ID
    const targetId = post?.id || ''
    router.push(targetId ? `/admin/resources/${targetId}` : '/admin/resources')
  }, 1500)
}

const handleCancel = () => {
  // We use the browser confirm for safety, but styling the trigger differently
  if (confirm('Discard unsaved changes? This action cannot be undone.')) {
    router.push('/admin/resources')
  }
}
</script>

<style scoped>
/* Optional: If BlogEditor relies on inherited styles */
:deep(.prose) {
  max-width: none;
}
</style>