<template>
  <article class="group bg-white overflow-hidden border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
    <NuxtLink :to="`/resources/${post.slug}`" class="block relative h-48 overflow-hidden bg-gray-100">
      <NuxtImg 
        v-if="post.image_url"
        :src="post.image_url" 
        :alt="post.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        sizes="sm:100vw md:50vw lg:300px"
        format="webp"
        width="400"
        height="240"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-gray-50">
        <UIcon name="i-heroicons-photo" class="w-10 h-10 text-gray-300" />
      </div>
    </NuxtLink>

    <div class="p-5 flex flex-col h-[calc(100%-12rem)]">
      <h3 class="text-lg font-bold text-[#09033b] line-clamp-2 leading-tight mb-2">
        <NuxtLink :to="`/resources/${post.slug}`" class="hover:text-[#FF7F50] transition-colors">
          {{ post.title }}
        </NuxtLink>
      </h3>

      <div class="flex items-center text-xs text-gray-500 mb-3 space-x-2">
        <span class="font-medium text-gray-700">{{ post.author }}</span>
        <span class="text-gray-300">•</span>
        <time :datetime="post.created_at">{{ formattedDate }}</time>
      </div>

      <p class="text-gray-600 text-sm line-clamp-2 leading-relaxed mb-4 flex-1">
        {{ excerpt }}
      </p>

      <div class="mt-auto pt-3 border-t border-gray-50">
        <NuxtLink 
          :to="`/resources/${post.slug}`"
          class="inline-flex items-center text-[#09033b] hover:text-[#FF7F50] font-semibold text-xs transition-colors uppercase tracking-wide"
          aria-label="Read full article"
        >
          Read article
          <UIcon name="i-heroicons-arrow-right" class="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const formattedDate = computed(() => {
  if (!props.post.created_at) return ''
  return new Date(props.post.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
})

const excerpt = computed(() => {
  if (!props.post.content) return ''
  // Strip HTML and limit characters
  const textContent = props.post.content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ')
  return textContent.length > 100 ? textContent.substring(0, 100) + '...' : textContent
})
</script>

<style scoped>
/* Optional: Nuxt UI usually handles this, but keeping it for safety */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>