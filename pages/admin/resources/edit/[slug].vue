<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="loading" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#09033b]"></div>
        <p class="mt-4 text-gray-600">Loading resource...</p>
      </div>
    </div>

    <div v-else-if="error" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <div class="text-red-600 mb-4">
          <UIcon name="i-heroicons-exclamation-triangle" class="mx-auto h-12 w-12 mb-4" />
          <p class="text-lg font-medium">{{ error }}</p>
        </div>
        <NuxtLink 
          to="/admin/resources"
          class="px-6 py-3 bg-[#09033b] text-white rounded-md hover:bg-opacity-90 transition-colors"
        >
          Back to Resources
        </NuxtLink>
      </div>
    </div>

    <div v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <div class="flex items-center mb-4">
          <button 
            @click="router.push('/admin/resources')"
            class="flex items-center text-[#09033b] hover:underline font-medium"
          >
            <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 mr-1" />
            Back to List
          </button>
        </div>
        <h1 class="text-3xl font-bold text-gray-900">Edit Resource</h1>
        <p class="mt-2 text-gray-600">Update content for: <span class="font-semibold">{{ post?.title }}</span></p>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="h-1.5 w-full bg-[#09033b]"></div>
        <div class="p-6">
          <BlogEditor 
            :initial-data="post"
            @submit="handleSubmit"
            @cancel="handleCancel"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
}) 

const route = useRoute()
const router = useRouter()
const { getBlogPostBySlug } = useBlog()

const post = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchPost = async () => {
  try {
    loading.value = true
    error.value = null
    // We now use the slug from the URL parameters
    post.value = await getBlogPostBySlug(route.params.slug)
  } catch (err) {
    console.error('Error fetching post:', err)
    error.value = 'Resource not found or failed to load.'
  } finally {
    loading.value = false
  }
}

const handleSubmit = (updatedPost) => {
  // Use the slug for the redirect instead of ID
  const target = updatedPost?.slug || route.params.slug
  router.push(`/admin/resources/${target}`)
}

const handleCancel = () => {
  if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
    router.push('/admin/resources')
  }
}

// SEO
useHead({
  title: `Edit ${post.value?.title || 'Resource'} - Admin Dashboard`,
})

onMounted(() => {
  fetchPost()
})
</script>