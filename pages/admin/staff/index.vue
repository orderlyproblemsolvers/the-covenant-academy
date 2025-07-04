<template>
  <div class="relative w-full min-h-screen bg-gray-50 p-4 overflow-hidden font-inter">
    <!-- Subtle Background Pattern -->
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

    <!-- Main Container -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen py-8">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 class="text-3xl font-light text-[#09033b] tracking-tight">Staff Management</h1>
          <p class="text-gray-600 mt-2">Manage all staff members</p>
        </div>
        <div class="flex flex-wrap gap-3 w-full sm:w-auto">
          <button
            @click="openModal"
            class="group inline-flex items-center justify-center px-5 py-3 bg-[#09033b] text-white text-base font-medium hover:bg-[#0a0440] transition-colors duration-300 w-full sm:w-auto"
          >
            <UIcon name="i-heroicons-plus" class="mr-2 w-4 h-4" />
            Add Staff
          </button>
          <button
            @click="logout"
            class="inline-flex items-center justify-center px-5 py-3 text-[#09033b] text-base font-medium border border-gray-200 hover:border-[#09033b] hover:bg-gray-50 transition-all duration-300 w-full sm:w-auto"
          >
            Logout
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center my-12">
        <div class="flex flex-col items-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#09033b]"></div>
          <p class="mt-4 text-gray-600">Loading staff data...</p>
        </div>
      </div>

      <!-- Error Alert -->
      <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex justify-between items-center">
        <span>{{ errorMessage }}</span>
        <button @click="errorMessage = ''" class="text-red-700 hover:text-red-900 font-bold text-xl">&times;</button>
      </div>

      <!-- Staff Table -->
      <div v-if="!isLoading" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="staff in staffList" :key="staff.id" class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img 
                        :src="getStaffImageUrl(staff)"
                        class="h-10 w-10 rounded-full object-cover border border-gray-200"
                        alt="Staff profile image"
                        width="40"
                        height="40"
                      >
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ staff.name }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{{ staff.position }}</td>
                <td class="px-4 py-4 whitespace-nowrap">
                  <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full" 
                        :class="getTeamBadgeClass(staff.team)">
                    {{ formatTeamName(staff.team) }}
                  </span>
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <button @click="editStaff(staff)" class="text-blue-600 hover:text-blue-900 mr-4 transition-colors duration-200">Edit</button>
                  <button @click="confirmDelete(staff.id)" class="text-red-600 hover:text-red-900 transition-colors duration-200">Delete</button>
                </td>
              </tr>
              <tr v-if="!staffList.length">
                <td colspan="4" class="px-6 py-8 text-center text-gray-500">
                  <div class="flex flex-col items-center justify-center py-8">
                    <UIcon name="i-heroicons-user-group" class="w-12 h-12 text-gray-300 mb-4" />
                    <p class="text-gray-500">No staff members found</p>
                    <button @click="openModal" class="mt-4 text-[#09033b] font-medium hover:underline">
                      Add your first staff member
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Add/Edit Modal -->
      <Modal :show="showModal" @close="closeModal">
        <div class="p-6 bg-white rounded-xl max-w-2xl mx-auto">
          <h2 class="text-2xl font-light text-[#09033b] mb-6 pb-2 border-b border-gray-100">{{ editMode ? 'Edit' : 'Add' }} Staff</h2>
          
          <!-- Form Error Message -->
          <div v-if="formErrorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm">
            {{ formErrorMessage }}
          </div>
          
          <form @submit.prevent="submitForm">
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input v-model="form.name" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#09033b] focus:ring-[#09033b] transition-colors duration-200">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <input v-model="form.position" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#09033b] focus:ring-[#09033b] transition-colors duration-200">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Team</label>
                <select v-model="form.team" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#09033b] focus:ring-[#09033b] transition-colors duration-200">
                  <option v-for="team in teams" :value="team.value" :key="team.value">{{ team.label }}</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                <input type="file" @change="handleFileUpload" accept="image/*" class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[#09033b] file:text-white hover:file:bg-[#0a0440] transition-colors duration-200">
                <p class="mt-2 text-xs text-gray-500">Maximum size: 2MB. Supported formats: JPG, PNG, WebP</p>
                
                <div v-if="imageProcessing" class="mt-4 text-sm text-[#09033b] flex items-center">
                  <div class="mr-2 h-4 w-4 rounded-full border-2 border-[#09033b] border-t-transparent animate-spin"></div>
                  Processing image...
                </div>
                
                <div class="mt-4 flex justify-center">
                  <img :src="getEditImagePreview()" class="h-24 w-24 rounded-full object-cover border-2 border-gray-200" alt="Profile preview" width="96" height="96">
                </div>
              </div>

              <div class="flex justify-end space-x-3 pt-6 border-t border-gray-100">
                <button type="button" @click="closeModal" class="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 px-5 rounded transition-colors duration-200">Cancel</button>
                <button type="submit" :disabled="isSubmitting" class="group inline-flex items-center justify-center bg-[#09033b] hover:bg-[#0a0440] text-white font-medium py-2.5 px-5 rounded transition-colors duration-200">
                  <div v-if="isSubmitting" class="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  {{ isSubmitting ? 'Saving...' : (editMode ? 'Update Staff' : 'Create Staff') }}
                  <UIcon v-if="!isSubmitting" name="i-heroicons-arrow-right" class="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <!-- Delete Confirmation Modal -->
      <Modal :show="showDeleteModal" @close="showDeleteModal = false">
        <div class="p-6 bg-white rounded-xl max-w-md mx-auto">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
              <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-red-600" />
            </div>
            <h2 class="text-xl font-medium text-gray-900">Confirm Deletion</h2>
          </div>
          
          <p class="mb-6 text-gray-600">Are you sure you want to delete this staff member? This action cannot be undone.</p>
          
          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button @click="showDeleteModal = false" class="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 px-5 rounded transition-colors duration-200">Cancel</button>
            <button 
              @click="deleteStaff" 
              :disabled="isDeleting"
              class="group inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-5 rounded transition-colors duration-200"
            >
              <div v-if="isDeleting" class="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
              {{ isDeleting ? 'Deleting...' : 'Delete Permanently' }}
              <UIcon v-if="!isDeleting" name="i-heroicons-trash" class="ml-2 w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue'
import { useSupabaseClient } from '#imports'
import { useRouter } from 'vue-router'

const supabase = useSupabaseClient()
const router = useRouter()

const staffList = ref([])
const showModal = ref(false)
const showDeleteModal = ref(false)
const editMode = ref(false)
const currentStaffId = ref(null)
const staffToDeleteId = ref(null)
const selectedFile = ref(null)
const webpBlob = ref(null)
const isLoading = ref(false)
const isSubmitting = ref(false)
const isDeleting = ref(false)
const imageProcessing = ref(false)
const filePreviewUrl = ref(null)
const editImagePreviewUrl = ref(null)
const errorMessage = ref('')
const formErrorMessage = ref('')

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
  auth: true
})

useHead({
  title: 'Staff Management - Admin Dashboard',
  meta: [
    {
      name: 'description',
      content: 'Manage staff members at The Covenant Academy administration dashboard'
    },
    {
      property: 'og:title',
      content: 'Staff Management - Admin Dashboard'
    },
    {
      property: 'og:description',
      content: 'Administration interface for managing staff members at The Covenant Academy'
    },
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})

const teams = [
  { value: 'management', label: 'Management' },
  { value: 'office', label: 'Office' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'non-academic', label: 'Non-Academic' }
]

const form = reactive({
  name: '',
  position: '',
  team: 'management',
  profile_image: null
})

// Watch selectedFile to generate a preview URL and clean up old ones.
watch(selectedFile, (newFile, oldFile) => {
  if (oldFile && filePreviewUrl.value) {
    URL.revokeObjectURL(filePreviewUrl.value)
    filePreviewUrl.value = null
  }
  
  if (newFile) {
    convertToWebP(newFile)
  } else {
    webpBlob.value = null
  }
})

onUnmounted(() => {
  if (filePreviewUrl.value) {
    URL.revokeObjectURL(filePreviewUrl.value)
  }
})

// Convert image to WebP format
const convertToWebP = async (file) => {
  imageProcessing.value = true
  formErrorMessage.value = ''
  
  try {
    if (!file.type.match('image.*')) {
      throw new Error('Please select a valid image file')
    }
    
    // Create an image object from the file
    const img = new Image()
    img.src = URL.createObjectURL(file)
    
    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = () => reject(new Error('Failed to load image'))
    })
    
    // Create a canvas and draw the image
    const canvas = document.createElement('canvas')
    const maxDimension = 800
    let width = img.width
    let height = img.height
    
    if (width > height) {
      if (width > maxDimension) {
        height *= maxDimension / width
        width = maxDimension
      }
    } else {
      if (height > maxDimension) {
        width *= maxDimension / height
        height = maxDimension
      }
    }
    
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, width, height)
    
    // Convert to WebP
    const webpDataUrl = await new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          resolve(null)
          return
        }
        resolve(URL.createObjectURL(blob))
        webpBlob.value = blob
      }, 'image/webp', 0.85) // 0.85 is the quality (1 is highest)
    })
    
    if (!webpDataUrl) throw new Error('Image conversion failed')
    
    // Update preview URL
    if (filePreviewUrl.value) {
      URL.revokeObjectURL(filePreviewUrl.value)
    }
    filePreviewUrl.value = webpDataUrl
    
    // Release original image object URL
    URL.revokeObjectURL(img.src)
  } catch (error) {
    console.error('Error converting image:', error)
    formErrorMessage.value = error.message || 'Failed to process image. Please try a different file.'
    selectedFile.value = null
  } finally {
    imageProcessing.value = false
  }
}

// Function to get a signed URL for a staff image.
const getStaffImageUrl = (staff) => {
  if (staff?.signed_url) return staff.signed_url
  return '/assets/images/default-avatar.webp'
}

// For the edit modal, return the new file preview if available,
// or the signed URL that was fetched when editing.
const getEditImagePreview = () => {
  if (selectedFile.value && filePreviewUrl.value) {
    return filePreviewUrl.value
  }
  if (editImagePreviewUrl.value) {
    return editImagePreviewUrl.value
  }
  return '/assets/images/default-avatar.webp'
}

// Fetch staff and generate signed URLs for each image
const fetchStaff = async () => {
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    const { data, error } = await supabase
      .from('staff')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    if (data && data.length) {
      // For each staff with a profile image, create a signed URL (expires in 60 seconds)
      await Promise.all(data.map(async (staff) => {
        if (staff.profile_image) {
          const { data: urlData, error: urlError } = await supabase.storage
            .from('staff-images')
            .createSignedUrl(staff.profile_image, 60)
          staff.signed_url = (!urlError && urlData) ? urlData.signedUrl : null
        } else {
          staff.signed_url = null
        }
      }))
    }

    staffList.value = data || []
  } catch (error) {
    console.error('Error fetching staff:', error)
    errorMessage.value = 'Failed to load staff data. Please try refreshing the page.'
  } finally {
    isLoading.value = false
  }
}

// Handle image file upload (with size validation)
const handleFileUpload = (event) => {
  const file = event.target.files?.[0]
  formErrorMessage.value = ''
  
  if (!file) return

  if (file.size > 2 * 1024 * 1024) {
    formErrorMessage.value = 'Image size must be less than 2MB'
    event.target.value = ''
    return
  }
  
  if (!file.type.match('image.*')) {
    formErrorMessage.value = 'Please select a valid image file (JPG, PNG, etc.)'
    event.target.value = ''
    return
  }
  
  selectedFile.value = file
}

// Form submission for create/update staff
const submitForm = async () => {
  if (isSubmitting.value) return
  formErrorMessage.value = ''
  
  // Validate form fields
  if (!form.name.trim()) {
    formErrorMessage.value = 'Name is required'
    return
  }
  
  if (!form.position.trim()) {
    formErrorMessage.value = 'Position is required'
    return
  }
  
  if (imageProcessing.value) {
    formErrorMessage.value = 'Please wait for image processing to complete'
    return
  }
  
  isSubmitting.value = true

  try {
    const staffData = { 
      name: form.name.trim(),
      position: form.position.trim(),
      team: form.team
    }
    
    // Handle image upload if a new file is selected and converted to WebP
    if (webpBlob.value) {
      const fileName = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.webp`
      
      const { error: uploadError } = await supabase.storage
        .from('staff-images')
        .upload(fileName, webpBlob.value, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) throw uploadError
      staffData.profile_image = fileName
    }

    // Update or create record
    if (editMode.value) {
      const { error } = await supabase
        .from('staff')
        .update(staffData)
        .eq('id', currentStaffId.value)
        
      if (error) throw error
    } else {
      const { error } = await supabase
        .from('staff')
        .insert(staffData)
        
      if (error) throw error
    }

    await fetchStaff()
    closeModal()
  } catch (error) {
    console.error('Error saving staff:', error)
    formErrorMessage.value = error.message || 'Failed to save staff data. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

// Edit staff: load data into form and generate a signed URL for the image.
const editStaff = async (staff) => {
  formErrorMessage.value = ''
  editMode.value = true
  currentStaffId.value = staff.id
  form.name = staff.name
  form.position = staff.position
  form.team = staff.team
  form.profile_image = staff.profile_image
  selectedFile.value = null
  webpBlob.value = null

  if (form.profile_image) {
    try {
      const { data, error } = await supabase.storage
        .from('staff-images')
        .createSignedUrl(form.profile_image, 60)
        
      if (error) throw error
      editImagePreviewUrl.value = data ? data.signedUrl : null
    } catch (error) {
      console.error('Error loading image preview:', error)
      formErrorMessage.value = 'Unable to load image preview'
      editImagePreviewUrl.value = null
    }
  } else {
    editImagePreviewUrl.value = null
  }
  
  showModal.value = true
}

// Confirm delete - show modal first
const confirmDelete = (id) => {
  staffToDeleteId.value = id
  showDeleteModal.value = true
}

// Delete staff and remove associated image if exists
const deleteStaff = async () => {
  if (!staffToDeleteId.value) return
  isDeleting.value = true
  
  try {
    // Get image reference for deletion
    const { data: staffData, error: fetchError } = await supabase
      .from('staff')
      .select('profile_image')
      .eq('id', staffToDeleteId.value)
      .single()
      
    if (fetchError) throw fetchError

    // Delete record
    const { error: deleteError } = await supabase
      .from('staff')
      .delete()
      .eq('id', staffToDeleteId.value)
      
    if (deleteError) throw deleteError

    // Delete image if available
    if (staffData?.profile_image) {
      await supabase.storage
        .from('staff-images')
        .remove([staffData.profile_image])
    }

    await fetchStaff()
    showDeleteModal.value = false
    staffToDeleteId.value = null
  } catch (error) {
    console.error('Delete error:', error)
    errorMessage.value = 'Failed to delete staff member. Please try again.'
  } finally {
    isDeleting.value = false
    showDeleteModal.value = false
  }
}

// Modal handling: open, close and reset form
const openModal = () => {
  showModal.value = true
  editMode.value = false
  formErrorMessage.value = ''
  resetForm()
}

const closeModal = () => {
  showModal.value = false
  formErrorMessage.value = ''
  resetForm()
}

const resetForm = () => {
  form.name = ''
  form.position = ''
  form.team = 'management'
  form.profile_image = null
  selectedFile.value = null
  webpBlob.value = null
  currentStaffId.value = null
  editImagePreviewUrl.value = null
}

// Logout function for Supabase auth, then redirect to home
const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    router.push('/')
  } catch (error) {
    console.error('Error logging out:', error)
    errorMessage.value = 'Failed to logout. Please try again.'
  }
}

// Team display helpers
const getTeamBadgeClass = (team) => ({
  'management': 'bg-purple-100 text-purple-800',
  'office': 'bg-blue-100 text-blue-800',
  'teacher': 'bg-green-100 text-green-800',
  'volunteer': 'bg-yellow-100 text-yellow-800',
  'non-academic': 'bg-red-100 text-red-800'
}[team] || 'bg-gray-100 text-gray-800')

const formatTeamName = (team) => 
  teams.find(t => t.value === team)?.label || team

// Initial load
onMounted(fetchStaff)
</script>

<style scoped>
/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Custom selection color */
::selection {
  background-color: #09033b;
  color: white;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f8f9fa;
}

::-webkit-scrollbar-thumb {
  background: #09033b;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #0a0440;
}

/* Table responsive adjustments */
@media (max-width: 640px) {
  table {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  th, td {
    min-width: 120px;
  }
}
</style>