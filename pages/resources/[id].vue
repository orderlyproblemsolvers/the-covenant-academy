<template>
  <div class="relative w-full min-h-screen bg-white p-4 overflow-hidden font-inter">
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

    <div class="relative z-10 max-w-3xl mx-auto px-2 lg:px-6 py-12">
      <div v-if="loading" class="text-center py-12 space-y-6">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#09033b]"></div>
        <p class="text-gray-600">Loading blog post...</p>
      </div>

      <div v-else-if="error" class="text-center py-12 space-y-6">
        <div class="w-12 h-12 mx-auto bg-[#09033b]/10 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6 text-[#09033b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p class="text-lg text-gray-600">Blog post not found or failed to load.</p>
        <NuxtLink 
          to="/blog"
          class="inline-flex items-center px-6 py-3 text-sm font-medium text-[#09033b] border border-[#09033b] hover:bg-[#09033b]/5 transition-colors"
        >
          Back to Blog
        </NuxtLink>
      </div>

      <article v-else class="relative">
        <div class="mb-8">
          <NuxtLink 
            to="#"
            @click.prevent="router.back()"
            class="inline-flex items-center text-[#09033b] hover:text-[#0a0440] transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back
          </NuxtLink>
        </div>

        <div v-if="post.image_url" class="relative mb-8 h-48 md:h-64 overflow-hidden">
          <img 
            :src="post.image_url" 
            :alt="post.title"
            class="w-full h-full object-cover"
          />
        </div>

        <header class="mb-12">
          <div class="inline-flex items-center space-x-3 mb-4">
            <div class="w-2 h-2 bg-[#09033b] rounded-full"></div>
            <span class="text-xs font-medium text-gray-600 tracking-wide uppercase">
              Blog Post
            </span>
          </div>

          <h1 class="text-3xl md:text-4xl font-light text-[#09033b] tracking-tight mb-6">
            {{ post.title }}
          </h1>

          <div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
            <div class="flex items-center">
              <svg class="w-4 h-4 text-[#09033b] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span>{{ post.author }}</span>
            </div>
            <div class="flex items-center">
              <svg class="w-4 h-4 text-[#09033b] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>{{ formatDate(post.created_at) }}</span>
            </div>
            <div v-if="post.updated_at !== post.created_at" class="flex items-center">
              <span class="text-xs">
                Updated {{ formatDate(post.updated_at) }}
              </span>
            </div>
          </div>

          <div class="w-16 h-px bg-[#09033b] mt-6"></div>
        </header>

        <div 
          class="prose prose-lg max-w-none "
          v-html="post.content"
        ></div>
      </article>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const { getBlogPost } = useBlog()

// 1. Server-Side Data Fetching
const { data: post, pending: loading, error } = await useAsyncData(
  `blog-post-${route.params.id}`, 
  () => getBlogPost(route.params.id)
)

// 2. OG Image Configuration (Unconditional & Reactive)
defineOgImageComponent('CovenantBlog', {
  title: () => post.value?.title ?? 'The Covenant Academy Blog',
})

// 3. Standard SEO Meta (Conditional)
// These still need to be conditional because they rely on specific content formatting
if (post.value) {
  useSeoMeta({
    title: () => `${post.value.title} - The Covenant Academy`,
    description: () => post.value.content.replace(/<[^>]*>/g, '').substring(0, 160),
    author: () => post.value.author,
    articlePublishedTime: () => post.value.created_at,
    articleModifiedTime: () => post.value.updated_at
  })
}

// Helper: Date Formatter
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
:deep(.prose) {
  color: #33373d;
  line-height: 1.5;
}

:deep(.prose h1) {
  font-size: 2rem;
  font-weight: 350;
  color: #0b0354;
  margin: 2rem 0 1rem;
  text-decoration: wavy underline 0.5px;
}

:deep(.prose h2) {
  font-size: 1.75rem;
  font-weight: 350;
  color: #0b0354;
    text-decoration: wavy underline 0.5px; 
}

:deep(.prose p) {
  margin-bottom: 0.8rem;
  font-weight: 350;
}

:deep(.prose blockquote) {
  font-style: italic;
  border-left: 2px solid #e5e7eb;
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: #6b7280;
}

:deep(.prose ul),
:deep(.prose ol) {
  margin: 1.25rem 0;
  padding-left: 1.5rem;
}

:deep(.prose li) {
  margin: 0.5rem 0;
  font-weight: 350;
}

:deep(.prose a) {
  color: #09033b;
  text-decoration: underline;
  text-underline-offset: 2px;
}

:deep(.prose img) {
  border-radius: 0.5rem;
  margin: 1.5rem 0;
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
}
</style>