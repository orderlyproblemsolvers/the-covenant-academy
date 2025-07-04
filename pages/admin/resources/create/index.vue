<template>
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center mb-4">
            <NuxtLink 
              to="#"
              @click.prevent="router.back()"
              class="flex items-center text-blue-600 hover:text-blue-800 mr-4"
            >
              <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Back to Blog
            </NuxtLink>
          </div>
          <h1 class="text-3xl font-bold text-gray-900">Create New</h1>
          <p class="mt-2 text-gray-600">Share your thoughts and ideas with the school community</p>
        </div>
  
        <!-- Blog Editor -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <BlogEditor 
            @submit="handleSubmit"
            @cancel="handleCancel"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>

  definePageMeta({
    layout: 'admin'
  })
  // SEO
  useHead({
    title: 'Create Resource - School Website',
    meta: [
      { name: 'description', content: 'Create and publish a new resource.' }
    ]
  })
  
  const router = useRouter()
  
  const handleSubmit = (post) => {
    // Show success message
    alert('created successfully!')
    
    // Redirect to the new post or blog list
    router.push(`/admin/resources/${post.id}`)
  }
  
  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      router.push('/admin/resources')
    }
  }
  </script>