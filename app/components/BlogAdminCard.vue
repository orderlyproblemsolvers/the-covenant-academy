<template>
  <div 
    class="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-[#09033b]/20"
    :class="viewMode === 'list' ? 'flex flex-row h-48' : 'flex flex-col h-full'"
  >
    <div 
      class="relative overflow-hidden bg-gray-100"
      :class="viewMode === 'list' ? 'w-48 shrink-0' : 'h-48 w-full'"
    >
      <NuxtLink :to="`/admin/resources/${post.slug}`" class="block w-full h-full">
        <img 
          v-if="post.image_url"
          :src="post.image_url" 
          :alt="post.title"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div v-else class="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
          <UIcon name="i-heroicons-photo" class="w-10 h-10" />
        </div>
      </NuxtLink>
      
      <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
        <NuxtLink 
          :to="`/admin/resources/${post.slug}`"
          class="p-2 bg-white rounded-full text-gray-700 hover:text-[#09033b] hover:scale-110 transition-all shadow-sm"
          title="View Details"
        >
          <UIcon name="i-heroicons-eye" class="w-5 h-5" />
        </NuxtLink>
        <NuxtLink 
          :to="`/admin/resources/edit/${post.slug}`"
          class="p-2 bg-white rounded-full text-gray-700 hover:text-[#FF7F50] hover:scale-110 transition-all shadow-sm"
          title="Edit Post"
        >
          <UIcon name="i-heroicons-pencil-square" class="w-5 h-5" />
        </NuxtLink>
      </div>
    </div>

    <div class="flex-1 p-5 flex flex-col">
      <div class="mb-2">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
            Article
          </span>
          <span class="text-xs text-gray-400 flex items-center">
            <UIcon name="i-heroicons-calendar" class="w-3 h-3 mr-1" />
            {{ formatDate(post.created_at) }}
          </span>
        </div>

        <h3 class="font-bold text-gray-900 group-hover:text-[#09033b] transition-colors leading-tight" 
            :class="viewMode === 'list' ? 'text-lg line-clamp-1' : 'text-lg line-clamp-2'">
          <NuxtLink :to="`/admin/resources/${post.slug}`">
            {{ post.title }}
          </NuxtLink>
        </h3>
      </div>

      <p class="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed" 
         :class="{'hidden': viewMode === 'list' && post.title.length > 50}">
        {{ getExcerpt(post.content) }}
      </p>

      <div class="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
        <div class="flex items-center text-xs text-gray-500 font-medium">
          <div class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2 text-[#09033b] font-bold">
            {{ getInitials(post.author) }}
          </div>
          {{ post.author }}
        </div>

        <NuxtLink 
          :to="`/admin/resources/${post.slug}`"
          class="text-xs font-bold text-[#09033b] hover:text-[#FF7F50] transition-colors flex items-center"
        >
          Manage
          <UIcon name="i-heroicons-arrow-right" class="w-3 h-3 ml-1" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  },
  viewMode: {
    type: String,
    default: 'grid' // 'grid' | 'list'
  }
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  })
}

const getExcerpt = (content) => {
  if (!content) return ''
  // Strip HTML tags
  const text = content.replace(/<[^>]*>/g, '')
  return text.length > 120 ? text.substring(0, 120) + '...' : text
}

const getInitials = (name) => {
  if (!name) return 'A'
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
}
</script>