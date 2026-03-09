<template>
  <main class="min-h-screen bg-gray-50 font-inter py-12 px-2 sm:px-2 lg:px-2">
    
    <div class="max-w-3xl mx-auto">
      
      <nav class="mb-8" aria-label="Breadcrumb">
        <NuxtLink 
          to="/resources"
          class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#09033b] focus:outline-none focus:ring-2 focus:ring-[#09033b] focus:ring-offset-2 rounded-sm transition-colors"
        >
          <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" aria-hidden="true" />
          Back to Resources
        </NuxtLink>
      </nav>

      <div v-if="loading" class="animate-pulse space-y-6" aria-busy="true" aria-label="Loading article">
        <div class="h-8 bg-gray-200 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/4"></div>
        <div class="h-64 bg-gray-200 rounded-2xl"></div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>

      <div v-else-if="error || !post" class="text-center py-12 bg-white rounded-2xl border border-red-100" role="alert">
        <UIcon name="i-heroicons-exclamation-circle" class="w-10 h-10 text-red-500 mx-auto mb-3" aria-hidden="true" />
        <h1 class="text-xl text-gray-900 font-medium mb-2">Article not found</h1>
        <p class="text-gray-500 text-sm mb-4">It may have been removed or renamed.</p>
        <NuxtLink to="/resources" class="text-[#09033b] underline text-sm focus:outline-none focus:ring-2 focus:ring-[#09033b] rounded-sm">Return Home</NuxtLink>
      </div>

      <div v-else>
        <article class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <header class="px-4 pt-8 pb-6 md:px-10 md:pt-10">
            <div class="flex items-center gap-3 text-sm mb-4">
              <span class="font-bold text-[#FF7F50] uppercase tracking-wider text-xs">Blog</span>
              <span class="text-gray-300" aria-hidden="true">•</span>
              <time :datetime="post.created_at" class="text-gray-500">{{ formatDate(post.created_at) }}</time>
            </div>

            <h1 class="text-3xl md:text-4xl font-bold text-[#09033b] leading-tight mb-6">
              {{ post.title }}
            </h1>

            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-gray-100">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-[#09033b]/10 text-[#09033b] flex items-center justify-center font-bold text-sm" aria-hidden="true">
                  {{ getInitials(post.author) }}
                </div>
                <div>
                  <p class="text-sm font-bold text-gray-900">{{ post.author }}</p>
                  <p class="text-xs text-gray-500">The Covenant Academy</p>
                </div>
              </div>

              <div class="flex items-center gap-2" aria-label="Share this article">
                <span class="text-xs font-medium text-gray-400 mr-1 hidden sm:block">Share:</span>
                
                <button @click="share('whatsapp')" class="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors" aria-label="Share on WhatsApp" title="Share on WhatsApp">
                  <UIcon name="i-simple-icons-whatsapp" class="w-4 h-4" aria-hidden="true" />
                </button>
                
                <button @click="share('twitter')" class="p-2 rounded-full bg-gray-50 text-gray-700 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors" aria-label="Share on X (Twitter)" title="Share on X">
                  <UIcon name="i-simple-icons-x" class="w-4 h-4" aria-hidden="true" />
                </button>

                <button @click="share('facebook')" class="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors" aria-label="Share on Facebook" title="Share on Facebook">
                  <UIcon name="i-simple-icons-facebook" class="w-4 h-4" aria-hidden="true" />
                </button>

                <button @click="share('linkedin')" class="p-2 rounded-full bg-sky-50 text-sky-700 hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-700 transition-colors" aria-label="Share on LinkedIn" title="Share on LinkedIn">
                  <UIcon name="i-simple-icons-linkedin" class="w-4 h-4" aria-hidden="true" />
                </button>
                
                <button @click="copyLink" class="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-colors relative" aria-label="Copy Link" title="Copy Link">
                  <UIcon name="i-heroicons-link" class="w-4 h-4" aria-hidden="true" />
                  <span v-if="copied" class="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded" role="status">Copied!</span>
                </button>
              </div>
            </div>
          </header>

          <div v-if="post.image_url" class="w-full aspect-[21/9] md:aspect-[16/7] relative bg-gray-100">
            <img 
              :src="post.image_url" 
              :alt="`Cover image for ${post.title}`"
              fetchpriority="high"
              decoding="async"
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

    <div v-if="!loading && !error && post" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <section v-if="recentPosts && recentPosts.length > 0" class="border-t border-gray-200 pt-16 pb-8" aria-labelledby="read-also-heading">
        <div class="flex items-center justify-between mb-8">
          <h2 id="read-also-heading" class="text-2xl md:text-3xl font-bold text-[#09033b]">Read Also</h2>
          <NuxtLink to="/resources" class="text-sm font-semibold text-[#FF7F50] hover:text-[#e06c42] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF7F50] rounded-sm">
            View all resources <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BlogCard 
            v-for="recentPost in recentPosts" 
            :key="recentPost.id" 
            :post="recentPost" 
            class="h-full" 
          />
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'

const route = useRoute()
const { getBlogPostBySlug, getRecentBlogPosts } = useBlog() 

// 1. Data Fetching (Main Post - SSR)
const { data: post, pending: loading, error } = await useAsyncData(
  `blog-post-${route.params.slug}`, 
  () => getBlogPostBySlug(route.params.slug)
)

// 2. Data Fetching (Recent Posts - SSR)
// Fetch 4 posts to ensure we have 3 even after filtering out the current post
const { data: recentPosts } = await useAsyncData(
  `recent-posts-for-${route.params.slug}`,
  async () => {
    const fetchedPosts = await getRecentBlogPosts(4)
    if (!fetchedPosts) return []
    // Filter out the current article, then take the first 3
    return fetchedPosts
      .filter(p => p.slug !== route.params.slug)
      .slice(0, 3)
  },
  {
    default: () => [] // Prevent null reference errors before data loads
  }
)

// 3. Consistent URL Handling
const reqUrl = useRequestURL()
const currentUrl = computed(() => reqUrl.href)

// 4. SEO & JSON-LD Structured Data
if (post.value) {
  const cleanDescription = computed(() => {
    return post.value.content?.replace(/<[^>]*>/g, '').substring(0, 160) + '...' || ''
  })

  useSeoMeta({
    title: () => `${post.value.title} - The Covenant Academy`,
    description: cleanDescription,
    author: () => post.value.author,
    ogTitle: () => post.value.title,
    ogDescription: cleanDescription,
    ogImage: () => post.value.image_url,
    ogType: 'article',
    twitterCard: 'summary_large_image',
  })

  useHead(() => ({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": currentUrl.value
          },
          "headline": post.value.title,
          "image": post.value.image_url ? [post.value.image_url] : [],
          "datePublished": post.value.created_at,
          "dateModified": post.value.updated_at || post.value.created_at,
          "author": {
            "@type": "Person",
            "name": post.value.author || "The Covenant Academy"
          },
          "publisher": {
            "@type": "Organization",
            "name": "The Covenant Academy",
            "logo": {
              "@type": "ImageObject",
              "url": `/img/tcad-nbg.png` 
            }
          },
          "description": cleanDescription.value
        })
      }
    ]
  }))
}

// 5. Social Sharing Logic
const copied = ref(false)

const share = (platform) => {
  if (!post.value) return

  const url = encodeURIComponent(currentUrl.value)
  const text = encodeURIComponent(post.value.title || 'Check this out')
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

  window.open(shareLink, '_blank', 'width=600,height=400,noopener,noreferrer')
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(currentUrl.value)
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
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