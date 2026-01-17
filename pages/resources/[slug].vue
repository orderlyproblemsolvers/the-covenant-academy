<template>
  <div class="min-h-screen bg-gray-50 font-inter py-12 px-4 sm:px-6 lg:px-8">
    
    <div class="max-w-3xl mx-auto">
      
      <nav class="mb-8">
        <NuxtLink 
          to="/resources"
          class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#09033b] transition-colors"
        >
          <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" />
          Back to Resources
        </NuxtLink>
      </nav>

      <div v-if="loading" class="animate-pulse space-y-6">
        <div class="h-8 bg-gray-200 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/4"></div>
        <div class="h-64 bg-gray-200 rounded-2xl"></div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>

      <div v-else-if="error" class="text-center py-12 bg-white rounded-2xl border border-red-100">
        <UIcon name="i-heroicons-exclamation-circle" class="w-10 h-10 text-red-500 mx-auto mb-3" />
        <h2 class="text-gray-900 font-medium">Article not found</h2>
        <p class="text-gray-500 text-sm mb-4">It may have been removed or renamed.</p>
        <NuxtLink to="/resources" class="text-[#09033b] underline text-sm">Return Home</NuxtLink>
      </div>

      <article v-else class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        <header class="px-4 pt-8 pb-6 md:px-10 md:pt-10">
          <div class="flex items-center gap-3 text-sm mb-4">
            <span class="font-bold text-[#FF7F50] uppercase tracking-wider text-xs">Blog</span>
            <span class="text-gray-300">•</span>
            <span class="text-gray-500">{{ formatDate(post.created_at) }}</span>
          </div>

          <h1 class="text-3xl md:text-4xl font-bold text-[#09033b] leading-tight mb-6">
            {{ post.title }}
          </h1>

          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-gray-100">
            
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#09033b]/10 text-[#09033b] flex items-center justify-center font-bold text-sm">
                {{ getInitials(post.author) }}
              </div>
              <div>
                <p class="text-sm font-bold text-gray-900">{{ post.author }}</p>
                <p class="text-xs text-gray-500">The Covenant Academy</p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-xs font-medium text-gray-400 mr-1 hidden sm:block">Share:</span>
              
              <button @click="share('whatsapp')" class="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors" aria-label="Share on WhatsApp">
                <UIcon name="i-simple-icons-whatsapp" class="w-4 h-4" />
              </button>
              
              <button @click="share('twitter')" class="p-2 rounded-full bg-gray-50 text-gray-700 hover:bg-black hover:text-white transition-colors" aria-label="Share on X">
                <UIcon name="i-simple-icons-x" class="w-4 h-4" />
              </button>

              <button @click="share('facebook')" class="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors" aria-label="Share on Facebook">
                <UIcon name="i-simple-icons-facebook" class="w-4 h-4" />
              </button>

              <button @click="share('linkedin')" class="p-2 rounded-full bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors" aria-label="Share on LinkedIn">
                <UIcon name="i-simple-icons-linkedin" class="w-4 h-4" />
              </button>
              
              <button @click="copyLink" class="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-200 transition-colors relative" aria-label="Copy Link">
                <UIcon name="i-heroicons-link" class="w-4 h-4" />
                <span v-if="copied" class="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded">Copied!</span>
              </button>
            </div>

          </div>
        </header>

        <div v-if="post.image_url" class="w-full aspect-[21/9] md:aspect-[16/7] relative bg-gray-100">
          <img 
            :src="post.image_url" 
            :alt="post.title"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="px-6 py-8 md:px-10 md:py-12">
          <div 
            class="prose prose-lg prose-blue max-w-none text-gray-700 prose-headings:text-[#09033b] prose-a:text-[#09033b] prose-img:rounded-xl"
            v-html="post.content"
          ></div>
        </div>

      </article>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const route = useRoute()
// Changed: Import the slug-based fetcher
const { getBlogPostBySlug } = useBlog()

// 1. Data Fetching (SSR Compatible)
// Changed: Key is now based on slug, and we pass route.params.slug
const { data: post, pending: loading, error } = await useAsyncData(
  `blog-post-${route.params.slug}`, 
  () => getBlogPostBySlug(route.params.slug)
)

// 2. SEO
if (post.value) {
  useSeoMeta({
    title: () => `${post.value.title} - The Covenant Academy`,
    description: () => post.value.content?.replace(/<[^>]*>/g, '').substring(0, 160) || '',
    author: () => post.value.author,
    // Add Open Graph for better social sharing
    ogTitle: () => post.value.title,
    ogDescription: () => post.value.content?.replace(/<[^>]*>/g, '').substring(0, 160) || '',
    ogImage: () => post.value.image_url,
  })
}

// 3. Social Sharing Logic
const copied = ref(false)
const currentUrl = ref('')

onMounted(() => {
  currentUrl.value = window.location.href
})

const share = (platform) => {
  const url = encodeURIComponent(currentUrl.value)
  const text = encodeURIComponent(post.value?.title || 'Check this out')
  let shareLink = ''

  switch (platform) {
    case 'whatsapp':
      shareLink = `https://wa.me/?text=${text}%20${url}`
      break
    case 'twitter':
      shareLink = `https://twitter.com/intent/tweet?url=${url}&text=${text}`
      break
    case 'facebook':
      shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`
      break
    case 'linkedin':
      shareLink = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`
      break
  }

  window.open(shareLink, '_blank', 'width=600,height=400')
}

const copyLink = () => {
  navigator.clipboard.writeText(currentUrl.value)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}

// Helpers
const getInitials = (name) => {
  if (!name) return 'TC'
  return name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
/* Clean up prose typography */
:deep(.prose h2) {
  margin-top: 2em;
  font-weight: 700;
}
:deep(.prose p) {
  line-height: 1.8;
  margin-bottom: 1.5em;
}
:deep(.prose a) {
  font-weight: 500;
  text-decoration-color: #FF7F50;
  text-decoration-thickness: 2px;
}
:deep(.prose blockquote) {
  border-left-color: #FF7F50;
  font-style: italic;
  background: #fff;
  padding-left: 1rem;
}
</style>