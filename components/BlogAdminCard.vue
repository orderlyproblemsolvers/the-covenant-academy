<template>
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div v-if="post.image_url" class="h-48 overflow-hidden">
        <img 
          :src="post.image_url" 
          :alt="post.title"
          class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div class="p-6">
        <h3 class="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {{ post.title }}
        </h3>
        <div class="flex items-center text-sm text-gray-600 mb-3">
          <span>By {{ post.author }}</span>
          <span class="mx-2">•</span>
          <span>{{ formatDate(post.created_at) }}</span>
        </div>
        <div 
          class="text-gray-700 mb-4 line-clamp-3" 
          v-html="getExcerpt(post.content)"
        ></div>
        <NuxtLink 
          :to="`/admin/resources/${post.id}`"
          class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          Read More
          <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    post: {
      type: Object,
      required: true
    }
  })
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  const getExcerpt = (content) => {
    // Remove HTML tags and get first 150 characters
    const textContent = content.replace(/<[^>]*>/g, '')
    return textContent.length > 150 ? textContent.substring(0, 150) + '...' : textContent
  }
  </script>
  
  <style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>