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
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen py-8">
      <!-- Header -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 p-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 class="text-3xl font-light text-[#09033b] tracking-tight">Resources</h1>
            <p class="mt-2 text-gray-600">Explore our latest articles and updates</p>
          </div>
          <NuxtLink 
            to="/admin/resources/create"
            class="group inline-flex items-center justify-center px-6 py-3 bg-[#09033b] text-white text-base font-medium hover:bg-[#0a0440] transition-colors duration-300"
          >
            Create New
            <UIcon name="i-heroicons-plus" class="ml-2 w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          </NuxtLink>
        </div>
      </div>

      <!-- Content -->
      <div>
        <div v-if="loading" class="flex justify-center py-12">
          <div class="flex flex-col items-center">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#09033b]"></div>
            <p class="mt-4 text-gray-600">Loading resources...</p>
          </div>
        </div>

        <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-6 py-8 rounded-xl text-center">
          <div class="flex justify-center mb-4">
            <UIcon name="i-heroicons-exclamation-circle" class="w-16 h-16 text-red-500" />
          </div>
          <p class="text-lg font-medium mb-6">{{ error }}</p>
          <button 
            @click="fetchPosts"
            class="group inline-flex items-center justify-center px-6 py-3 bg-[#09033b] text-white text-base font-medium hover:bg-[#0a0440] transition-colors duration-300"
          >
            Try Again
            <UIcon name="i-heroicons-arrow-path" class="ml-2 w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>

        <div v-else-if="posts.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div class="flex justify-center mb-6">
            <UIcon name="i-heroicons-document-text" class="w-16 h-16 text-gray-300" />
          </div>
          <h3 class="text-xl font-light text-[#09033b] mb-3">No resources yet</h3>
          <p class="text-gray-600 mb-8 max-w-md mx-auto">
            Get started by creating your first blog post to share with the community.
          </p>
          <NuxtLink 
            to="/admin/resources/create"
            class="group inline-flex items-center justify-center px-6 py-3 bg-[#09033b] text-white text-base font-medium hover:bg-[#0a0440] transition-colors duration-300"
          >
            Create First Post
            <UIcon name="i-heroicons-arrow-right" class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </NuxtLink>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BlogAdminCard 
            v-for="post in posts" 
            :key="post.id" 
            :post="post" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getAllBlogPosts } = useBlog()

// Enhanced SEO
useHead({
  title: 'Resources - Admin Dashboard',
  meta: [
    {
      name: 'description',
      content: 'Manage educational resources and blog posts for The Covenant Academy'
    },
    {
      property: 'og:title',
      content: 'Resources Management - Admin Dashboard'
    },
    {
      property: 'og:description',
      content: 'Administration interface for managing educational resources at The Covenant Academy'
    },
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
  auth: true
})

const posts = ref([])
const loading = ref(true)
const error = ref(null)

const fetchPosts = async () => {
  try {
    loading.value = true
    error.value = null
    posts.value = await getAllBlogPosts()
  } catch (err) {
    console.error('Error fetching posts:', err)
    error.value = 'Failed to load resources. Please try again.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPosts()
})
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
</style>