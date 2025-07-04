<template>
    <div class="bg-[#09033b] max-w-6xl mx-auto rounded-lg border border-[#FF7F50]/20 shadow-lg p-6 md:p-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-2xl md:text-3xl font-bold text-white">VIDEO MANAGER</h1>
        <div class="h-1 w-16 bg-[#FF7F50] rounded-full mx-auto mt-2"></div>
      </div>
      
      <!-- Add New Video Form -->
      <div class="mb-8 bg-indigo-950/30 p-4 rounded-lg border border-indigo-900/30">
        <h2 class="text-xl font-semibold text-white mb-4">{{ editingVideo ? 'Edit Video' : 'Add New Video' }}</h2>
        
        <form @submit.prevent="saveVideo" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input 
              v-model="videoForm.title" 
              type="text" 
              class="w-full p-2 bg-indigo-900/50 text-white rounded border border-indigo-800 focus:outline-none focus:ring-2 focus:ring-[#FF7F50]"
              required
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">YouTube URL</label>
            <input 
              v-model="videoForm.video_url" 
              type="url" 
              class="w-full p-2 bg-indigo-900/50 text-white rounded border border-indigo-800 focus:outline-none focus:ring-2 focus:ring-[#FF7F50]"
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Description (Optional)</label>
            <textarea 
              v-model="videoForm.description" 
              class="w-full p-2 bg-indigo-900/50 text-white rounded border border-indigo-800 focus:outline-none focus:ring-2 focus:ring-[#FF7F50] h-24"
            ></textarea>
          </div>
          
          <div class="flex justify-end space-x-3">
            <button 
              v-if="editingVideo" 
              type="button" 
              @click="cancelEdit" 
              class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 bg-[#FF7F50] hover:bg-[#FF7F50]/80 text-white rounded transition-colors"
            >
              {{ editingVideo ? 'Update Video' : 'Add Video' }}
            </button>
          </div>
        </form>
      </div>
      
      <!-- Videos List -->
      <div class="space-y-4">
        <h2 class="text-xl font-semibold text-white mb-4">Manage Videos</h2>
        
        <div v-if="loading" class="text-center text-gray-300">Loading videos...</div>
        <div v-else-if="videos.length === 0" class="text-center text-gray-300">No videos found. Add your first video above!</div>
        
        <div v-for="video in videos" :key="video.id" class="bg-indigo-950/30 p-4 rounded-lg border border-indigo-900/30 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div class="mb-4 md:mb-0">
            <h3 class="text-white font-medium">{{ video.title }}</h3>
            <a :href="video.video_url" target="_blank" rel="noopener noreferrer" class="text-sm text-[#FF7F50] hover:underline">{{ video.video_url }}</a>
            <p v-if="video.description" class="text-sm text-gray-400 mt-1 line-clamp-1">{{ video.description }}</p>
          </div>
          
          <div class="flex space-x-2 w-full md:w-auto justify-end">
            <button 
              @click="editVideo(video)" 
              class="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm transition-colors"
            >
              Edit
            </button>
            <button 
              @click="deleteVideo(video.id)" 
              class="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-sm transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '#imports';
  const supabase = useSupabaseClient()
  
  const videos = ref([])
  const loading = ref(true)
  const editingVideo = ref(null)
  
  // Video form state
  const videoForm = ref({
    title: '',
    video_url: '',
    description: ''
  })
  
  // Reset form
  const resetForm = () => {
    videoForm.value = {
      title: '',
      video_url: '',
      description: ''
    }
    editingVideo.value = null
  }
  
  // Fetch videos from Supabase
  const fetchVideos = async () => {
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      videos.value = data
    } catch (error) {
      console.error('Error fetching videos:', error)
    } finally {
      loading.value = false
    }
  }
  
  // Save or update video
  const saveVideo = async () => {
    try {
      if (editingVideo.value) {
        // Update existing video
        const { error } = await supabase
          .from('videos')
          .update({
            title: videoForm.value.title,
            video_url: videoForm.value.video_url,
            description: videoForm.value.description,
            updated_at: new Date()
          })
          .eq('id', editingVideo.value.id)
        
        if (error) throw error
      } else {
        // Insert new video
        const { error } = await supabase
          .from('videos')
          .insert({
            title: videoForm.value.title,
            video_url: videoForm.value.video_url,
            description: videoForm.value.description
          })
        
        if (error) throw error
      }
      
      // Reset form and refetch videos
      resetForm()
      await fetchVideos()
    } catch (error) {
      console.error('Error saving video:', error)
      alert('An error occurred while saving the video')
    }
  }
  
  // Edit a video
  const editVideo = (video) => {
    editingVideo.value = video
    videoForm.value = {
      title: video.title,
      video_url: video.video_url,
      description: video.description || ''
    }
  }
  
  // Cancel editing
  const cancelEdit = () => {
    resetForm()
  }
  
  // Delete a video
  const deleteVideo = async (id) => {
    if (!confirm('Are you sure you want to delete this video?')) return
    
    try {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      // Refetch videos
      await fetchVideos()
    } catch (error) {
      console.error('Error deleting video:', error)
      alert('An error occurred while deleting the video')
    }
  }
  
  // Fetch videos on component mount
  onMounted(() => {
    fetchVideos()
  })

  definePageMeta({
    layout: 'admin'
  })
  </script>