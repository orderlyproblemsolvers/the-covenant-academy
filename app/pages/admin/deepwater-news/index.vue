<template>
  <div class="relative w-full min-h-screen bg-gray-50 font-inter text-gray-800">
    <div class="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
      <svg width="100%" height="100%">
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#09033b"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-[#09033b] tracking-tight">Video Library</h1>
          <p class="mt-1 text-sm sm:text-base text-gray-500">Manage educational content and recordings</p>
        </div>
        <button 
          @click="openCreateModal"
          class="w-full md:w-auto inline-flex items-center justify-center px-5 py-2.5 bg-[#09033b] text-white rounded-lg shadow-md hover:bg-[#0c0552] transition-all active:scale-95 group"
        >
          <UIcon name="i-heroicons-plus" class="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
          Add Video
        </button>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-8 max-w-md ml-auto">
        <div class="relative">
          <UIcon name="i-heroicons-magnifying-glass" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search videos by title..." 
            class="w-full pl-10 pr-4 py-2 bg-transparent border-none focus:ring-0 text-sm"
          >
        </div>
      </div>

      <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-[90vw] sm:max-w-sm pointer-events-none">
        <TransitionGroup enter-active-class="transform ease-out duration-300" enter-from-class="translate-y-2 opacity-0" enter-to-class="translate-y-0 opacity-100">
          <div v-if="error" key="error" class="pointer-events-auto bg-white border-l-4 border-red-500 shadow-xl rounded-r-lg p-4 flex items-start">
            <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5 text-red-500 mr-3 mt-0.5" />
            <p class="text-sm text-red-600">{{ error }}</p>
            <button @click="error = ''" class="ml-auto text-gray-400">&times;</button>
          </div>
          <div v-if="successMessage" key="success" class="pointer-events-auto bg-white border-l-4 border-green-500 shadow-xl rounded-r-lg p-4 flex items-start">
            <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500 mr-3 mt-0.5" />
            <p class="text-sm text-green-600">{{ successMessage }}</p>
          </div>
        </TransitionGroup>
      </div>

      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 6" :key="n" class="bg-white rounded-xl shadow-sm p-4 h-72 animate-pulse">
          <div class="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      <div v-else-if="filteredVideos.length === 0" class="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
        <div class="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
          <UIcon name="i-heroicons-video-camera" class="w-8 h-8 text-[#09033b]" />
        </div>
        <h3 class="text-lg font-medium text-gray-900">No videos found</h3>
        <p class="text-gray-500 text-sm mt-1">Get started by adding a new YouTube video.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="video in filteredVideos" 
          :key="video.id"
          class="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
        >
          <div class="relative aspect-video bg-gray-900 group-hover:opacity-95 transition-opacity">
            <img 
              :src="getThumbnail(video.video_url)" 
              alt="Video thumbnail"
              class="w-full h-full object-cover"
              loading="lazy"
            >
            <a 
              :href="video.video_url" 
              target="_blank" 
              class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors"
            >
              <div class="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform">
                <UIcon name="i-heroicons-play" class="w-6 h-6 text-[#FF7F50] ml-1" />
              </div>
            </a>
          </div>

          <div class="p-5 flex-1 flex flex-col">
            <h3 class="font-bold text-[#09033b] text-lg leading-snug line-clamp-2 mb-2" :title="video.title">
              {{ video.title }}
            </h3>
            <p class="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
              {{ video.description || 'No description provided.' }}
            </p>

            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
              <span class="text-xs text-gray-400">YouTube</span>
              
              <div class="flex gap-2">
                <button 
                  @click="editVideo(video)"
                  class="p-2 text-gray-500 hover:text-[#09033b] hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <UIcon name="i-heroicons-pencil-square" class="w-5 h-5" />
                </button>
                <button 
                  @click="confirmDelete(video)"
                  class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <UIcon name="i-heroicons-trash" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="closeModal"></div>

      <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
        <div class="pointer-events-auto w-screen max-w-md transform transition-transform duration-300 ease-in-out h-full flex flex-col bg-white shadow-2xl" :class="isModalOpen ? 'translate-x-0' : 'translate-x-full'">
          
          <div class="bg-[#09033b] px-4 sm:px-6 py-6 text-white shrink-0 flex justify-between items-start">
            <div>
              <h2 class="text-lg font-medium">{{ editingVideo ? 'Edit Video' : 'Add New Video' }}</h2>
              <p class="text-xs text-indigo-200 mt-1">Enter YouTube details below</p>
            </div>
            <button @click="closeModal" class="text-white/70 hover:text-white">
              <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
            </button>
          </div>

          <div class="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
            <form @submit.prevent="saveVideo" class="space-y-6">
              
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-1">Video Title *</label>
                <input 
                  v-model="form.title" 
                  type="text" 
                  required
                  class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#09033b] focus:ring-[#09033b] sm:text-sm py-2.5 px-3 border"
                  placeholder="e.g. Introduction to Physics"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-900 mb-1">YouTube URL *</label>
                <input 
                  v-model="form.video_url" 
                  type="url" 
                  required
                  @input="previewThumbnail"
                  class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#09033b] focus:ring-[#09033b] sm:text-sm py-2.5 px-3 border"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              <div v-if="thumbnailPreview" class="rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                <p class="text-xs text-gray-500 p-2 border-b border-gray-200 bg-gray-100">Thumbnail Preview</p>
                <div class="relative aspect-video">
                  <img :src="thumbnailPreview" class="w-full h-full object-cover">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-900 mb-1">Description</label>
                <textarea 
                  v-model="form.description" 
                  rows="4"
                  class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#09033b] focus:ring-[#09033b] sm:text-sm py-2.5 px-3 border"
                  placeholder="Brief summary of the video content..."
                ></textarea>
              </div>

            </form>
          </div>

          <div class="shrink-0 border-t border-gray-200 px-4 sm:px-6 py-4 bg-gray-50 flex justify-end gap-3 safe-area-bottom">
            <button 
              type="button" 
              @click="closeModal"
              class="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 active:bg-gray-100 w-full sm:w-auto"
            >
              Cancel
            </button>
            <button 
              @click="saveVideo" 
              class="rounded-lg border border-transparent bg-[#09033b] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#0c0552] focus:outline-none active:scale-95 transition-transform w-full sm:w-auto flex justify-center items-center"
            >
              {{ editingVideo ? 'Update Video' : 'Add Video' }}
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'

definePageMeta({ layout: 'admin' })
const supabase = useSupabaseClient()

// State
const videos = ref([])
const loading = ref(true)
const isModalOpen = ref(false)
const editingVideo = ref(null)
const error = ref('')
const successMessage = ref('')
const searchQuery = ref('')
const thumbnailPreview = ref('')

const form = reactive({
  title: '',
  video_url: '',
  description: ''
})

// Computed
const filteredVideos = computed(() => {
  if (!searchQuery.value) return videos.value
  const query = searchQuery.value.toLowerCase()
  return videos.value.filter(v => 
    v.title.toLowerCase().includes(query) || 
    (v.description && v.description.toLowerCase().includes(query))
  )
})

// Extract YouTube ID for Thumbnail
const getYouTubeId = (url) => {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}

const getThumbnail = (url) => {
  const id = getYouTubeId(url)
  return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : '' // mqdefault is standard 16:9
}

const previewThumbnail = () => {
  thumbnailPreview.value = getThumbnail(form.video_url)
}

// CRUD Actions
const fetchVideos = async () => {
  loading.value = true
  try {
    const { data, error: err } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false })
    if (err) throw err
    videos.value = data || []
  } catch (err) {
    console.error('Fetch error:', err)
  } finally {
    loading.value = false
  }
}

const openCreateModal = () => {
  resetForm()
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  setTimeout(resetForm, 300)
}

const resetForm = () => {
  form.title = ''
  form.video_url = ''
  form.description = ''
  thumbnailPreview.value = ''
  editingVideo.value = null
}

const editVideo = (video) => {
  editingVideo.value = video
  form.title = video.title
  form.video_url = video.video_url
  form.description = video.description || ''
  previewThumbnail()
  isModalOpen.value = true
}

const saveVideo = async () => {
  if (!form.title.trim() || !form.video_url.trim()) {
    error.value = 'Title and URL are required'
    return
  }

  try {
    const payload = {
      title: form.title,
      video_url: form.video_url,
      description: form.description,
      updated_at: new Date()
    }

    let resultError
    if (editingVideo.value) {
      const { error } = await supabase.from('videos').update(payload).eq('id', editingVideo.value.id)
      resultError = error
    } else {
      const { error } = await supabase.from('videos').insert(payload)
      resultError = error
    }

    if (resultError) throw resultError

    successMessage.value = editingVideo.value ? 'Video updated successfully' : 'Video added successfully'
    setTimeout(() => successMessage.value = '', 3000)
    closeModal()
    await fetchVideos()
  } catch (err) {
    error.value = 'Failed to save video'
    setTimeout(() => error.value = '', 3000)
  }
}

const confirmDelete = async (video) => {
  if (!confirm('Are you sure you want to remove this video?')) return

  try {
    const { error: err } = await supabase.from('videos').delete().eq('id', video.id)
    if (err) throw err
    successMessage.value = 'Video deleted successfully'
    setTimeout(() => successMessage.value = '', 3000)
    await fetchVideos()
  } catch (err) {
    error.value = 'Failed to delete video'
    setTimeout(() => error.value = '', 3000)
  }
}

onMounted(fetchVideos)
</script>

<style scoped>
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom, 1rem);
}
</style>