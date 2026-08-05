<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="loading" class="max-w-4xl mx-auto px-4 py-12">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#09033b]"></div>
        <p class="mt-4 text-gray-600">Loading resource...</p>
      </div>
    </div>

    <div v-else-if="error" class="max-w-4xl mx-auto px-4 py-12">
      <div class="text-center bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <UIcon name="i-heroicons-exclamation-triangle" class="mx-auto h-12 w-12 text-red-500 mb-4" />
        <p class="text-lg font-medium text-gray-900 mb-6">{{ error }}</p>
        <NuxtLink 
          to="/admin/resources"
          class="px-6 py-3 bg-[#09033b] text-white rounded-lg hover:bg-[#0c0552] transition-colors"
        >
          Back to Resources
        </NuxtLink>
      </div>
    </div>

    <article v-else class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <nav class="flex items-center text-sm font-medium text-gray-500 mb-8">
        <NuxtLink to="/admin/resources" class="hover:text-[#09033b] transition-colors flex items-center">
          <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 mr-1" />
          Resources
        </NuxtLink>
        <span class="mx-3 text-gray-300">/</span>
        <span class="text-[#09033b] truncate max-w-[200px]">{{ post.title }}</span>
      </nav>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div v-if="post.image_url" class="relative h-64 md:h-[400px] overflow-hidden">
          <img 
            :src="post.image_url" 
            :alt="post.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        <div class="p-6 md:p-10">
          <header class="mb-10">
            <h1 class="text-3xl md:text-5xl font-extrabold text-[#09033b] tracking-tight mb-6 leading-tight">
              {{ post.title }}
            </h1>
            
            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 border-b border-gray-100 pb-8">
              <div class="flex items-center bg-gray-50 px-3 py-1.5 rounded-full">
                <UIcon name="i-heroicons-user" class="w-4 h-4 mr-2 text-[#FF7F50]" />
                <span class="font-semibold text-gray-700">{{ post.author }}</span>
              </div>
              <div class="flex items-center">
                <UIcon name="i-heroicons-calendar" class="w-4 h-4 mr-2" />
                <span>{{ formatDate(post.created_at) }}</span>
              </div>
              <div v-if="post.updated_at !== post.created_at" class="flex items-center text-indigo-600">
                <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-2" />
                <span>Updated {{ formatDate(post.updated_at) }}</span>
              </div>
            </div>
          </header>

          <div 
            class="prose prose-indigo prose-lg max-w-none prose-headings:text-[#09033b] prose-a:text-[#FF7F50]"
            v-html="post.content"
          ></div>

          <div class="mt-12 pt-10 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p class="text-sm text-gray-400">ID: {{ post.id }} • Slug: {{ post.slug }}</p>
            
            <div class="flex items-center gap-3">
              <button 
                @click="editPost"
                class="flex items-center px-5 py-2.5 text-[#09033b] bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-all font-semibold"
              >
                <UIcon name="i-heroicons-pencil-square" class="w-5 h-5 mr-2" />
                Edit Resource
              </button>
              <button 
                @click="handleDelete"
                class="flex items-center px-5 py-2.5 text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-all font-semibold"
              >
                <UIcon name="i-heroicons-trash" class="w-5 h-5 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const route = useRoute()
const router = useRouter()
const { getBlogPostBySlug, deleteBlogPost } = useBlog()

const post = ref(null)
const loading = ref(true)
const error = ref(null)

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const fetchPost = async () => {
  try {
    loading.value = true
    // Fetching by slug from the URL parameter [slug]
    post.value = await getBlogPostBySlug(route.params.slug)
  } catch (err) {
    console.error('Error:', err)
    error.value = 'We couldn’t find the resource you’re looking for.'
  } finally {
    loading.value = false
  }
}

const editPost = () => {
  // Use the slug for the edit route
  router.push(`/admin/resources/edit/${post.value.slug}`)
}

const handleDelete = async () => {
  if (confirm('Permanently delete this resource? This cannot be undone.')) {
    try {
      // Keep using ID for deletion logic as it is the database primary key
      await deleteBlogPost(post.value.id)
      router.push('/admin/resources')
    } catch (err) {
      alert('Delete failed. Please try again.')
    }
  }
}

// Dynamic SEO
watch(post, (newPost) => {
  if (newPost) {
    useHead({
      title: `${newPost.title} | Admin Dashboard`,
      meta: [
        { name: 'description', content: newPost.title }
      ]
    })
  }
}, { immediate: true })

onMounted(fetchPost)
</script>

<style scoped>
/* Scoped overrides to ensure the rich text content looks professional */
:deep(.prose) {
  --tw-prose-headings: #09033b;
  --tw-prose-links: #FF7F50;
  --tw-prose-bullets: #09033b;
}

:deep(.prose img) {
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
</style>