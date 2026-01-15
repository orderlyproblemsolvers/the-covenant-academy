<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
    
    <div class="lg:col-span-2 space-y-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 group focus-within:ring-2 focus-within:ring-[#09033b]/10 transition-shadow">
        <input
          v-model="form.title"
          type="text"
          required
          class="w-full text-3xl sm:text-4xl font-bold text-gray-900 placeholder-gray-300 border-none focus:ring-0 p-0 bg-transparent"
          placeholder="Enter post title..."
        />
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[500px]">
        <div ref="editorContainer" class="flex-1 text-lg font-inter text-gray-800"></div>
      </div>
    </div>

    <div class="space-y-6">
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-6">
        <div class="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
          <span class="text-sm font-medium text-gray-500">Status</span>
          <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
            {{ props.initialData.id ? 'Editing' : 'Draft' }}
          </span>
        </div>
        
        <div class="space-y-3">
          <button
            @click="submitPost"
            :disabled="loading"
            class="w-full flex items-center justify-center px-4 py-3 bg-[#09033b] hover:bg-[#0c0552] text-white font-medium rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <UIcon v-if="loading" name="i-heroicons-arrow-path" class="animate-spin mr-2 w-5 h-5" />
            {{ loading ? 'Publishing...' : (props.initialData.id ? 'Update Resource' : 'Publish Resource') }}
          </button>
          
          <button
            @click="$emit('cancel')"
            class="w-full px-4 py-2.5 bg-white border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Discard Changes
          </button>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Post Details</h3>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Author</label>
          <div class="relative">
            <UIcon name="i-heroicons-user" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              v-model="form.author"
              type="text"
              required
              class="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-[#09033b] focus:border-[#09033b]"
              placeholder="e.g. Principal Smith"
            />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Featured Image</h3>
        
        <div 
          class="relative group cursor-pointer"
          @click="triggerFileInput"
        >
          <input
            ref="imageInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleImageChange"
          />

          <div v-if="imagePreview" class="relative rounded-lg overflow-hidden aspect-video border border-gray-200">
            <img :src="imagePreview" alt="Preview" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span class="text-white text-sm font-medium flex items-center">
                <UIcon name="i-heroicons-photo" class="w-4 h-4 mr-2" />
                Change Image
              </span>
            </div>
          </div>

          <div v-else class="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center text-center hover:border-[#FF7F50] hover:bg-orange-50/30 transition-colors">
            <UIcon name="i-heroicons-photo" class="w-8 h-8 text-gray-300 mb-2 group-hover:text-[#FF7F50]" />
            <p class="text-sm text-gray-600 font-medium">Click to upload</p>
            <p class="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import Quill from 'quill'
// Ensure Quill CSS is imported in your nuxt.config or global CSS, 
// otherwise import it here: import 'quill/dist/quill.snow.css'

const emit = defineEmits(['submit', 'cancel'])
const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  }
})

const { uploadImage, createBlogPost, updateBlogPost } = useBlog()

const form = reactive({
  title: props.initialData.title || '',
  author: props.initialData.author || '',
  content: props.initialData.content || '',
  image_url: props.initialData.image_url || ''
})

const loading = ref(false)
const imagePreview = ref(props.initialData.image_url || '')
const selectedImage = ref(null)
const editorContainer = ref(null)
const imageInput = ref(null)
let quill = null

// --- Image Handling ---
const triggerFileInput = () => {
  imageInput.value.click()
}

const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedImage.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// --- Submit Logic ---
const submitPost = async () => {
  try {
    loading.value = true
    
    // Get content from Quill editor
    const content = quill.root.innerHTML
    
    // Basic Validation
    if (!form.title.trim()) {
      alert('Please enter a title') // Replace with toast in real app
      loading.value = false
      return
    }
    if (quill.getText().trim().length === 0 && !selectedImage.value) {
       if(!confirm("You are publishing an empty post. Continue?")) {
         loading.value = false
         return
       }
    }

    let imageUrl = form.image_url

    // Upload new image if selected
    if (selectedImage.value) {
      // Assuming uploadImage returns the public URL string
      imageUrl = await uploadImage(selectedImage.value)
    }

    const postData = {
      title: form.title.trim(),
      author: form.author.trim(),
      content: content,
      image_url: imageUrl,
      // Add published date automatically if new
      ...(props.initialData.id ? {} : { created_at: new Date() }) 
    }

    let result
    if (props.initialData.id) {
      result = await updateBlogPost(props.initialData.id, postData)
    } else {
      result = await createBlogPost(postData)
    }

    emit('submit', result)
    
  } catch (error) {
    console.error('Error submitting post:', error)
    alert('Error: ' + (error.message || 'Unknown error occurred'))
  } finally {
    loading.value = false
  }
}

// --- Editor Init ---
onMounted(() => {
  const toolbarOptions = [
    [{ 'header': [2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'color': [] }, { 'background': [] }],
    ['link', 'clean']
  ]

  quill = new Quill(editorContainer.value, {
    theme: 'snow',
    placeholder: 'Start writing your story...',
    modules: {
      toolbar: toolbarOptions
    }
  })

  if (props.initialData.content) {
    quill.root.innerHTML = props.initialData.content
  }
})
</script>

<style>
/* Global Override for Quill within this component scope 
  Using un-scoped style block to target Quill classes generated at runtime 
*/

.ql-toolbar.ql-snow {
  border: none !important;
  border-bottom: 1px solid #f3f4f6 !important;
  background-color: #ffffff;
  padding: 12px 16px !important;
  border-radius: 12px 12px 0 0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.ql-container.ql-snow {
  border: none !important;
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  line-height: 1.75;
  border-bottom-left-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
}

.ql-editor {
  min-height: 400px;
  padding: 24px 32px !important;
}

.ql-editor.ql-blank::before {
  font-style: normal;
  color: #9ca3af;
}
</style>