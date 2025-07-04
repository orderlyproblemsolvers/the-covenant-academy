<template>
    <div class="blog-editor">
      <form @submit.prevent="submitPost" class="space-y-6">
        <!-- Title Input -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter blog post title"
          />
        </div>
  
        <!-- Author Input -->
        <div>
          <label for="author" class="block text-sm font-medium text-gray-700 mb-2">
            Author *
          </label>
          <input
            id="author"
            v-model="form.author"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter author name"
          />
        </div>
  
        <!-- Image Upload -->
        <div>
          <label for="image" class="block text-sm font-medium text-gray-700 mb-2">
            Featured Image
          </label>
          <input
            id="image"
            ref="imageInput"
            type="file"
            accept="image/*"
            @change="handleImageChange"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div v-if="imagePreview" class="mt-4">
            <img :src="imagePreview" alt="Preview" class="max-w-xs h-48 object-cover rounded-md" />
          </div>
        </div>
  
        <!-- Content Editor -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Content *
          </label>
          <div ref="editorContainer" class="min-h-[300px] border border-gray-300 rounded-md"></div>
        </div>
  
        <!-- Submit Button -->
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="$emit('cancel')"
            class="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {{ loading ? 'Publishing...' : 'Publish Post' }}
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import Quill from 'quill'
  
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
  
  const submitPost = async () => {
    try {
      loading.value = true
      
      // Get content from Quill editor
      const content = quill.root.innerHTML
      
      if (!form.title.trim() || !form.author.trim() || !content.trim()) {
        throw new Error('Please fill in all required fields')
      }
  
      let imageUrl = form.image_url
  
      // Upload new image if selected
      if (selectedImage.value) {
        imageUrl = await uploadImage(selectedImage.value)
      }
  
      const postData = {
        title: form.title.trim(),
        author: form.author.trim(),
        content: content,
        image_url: imageUrl
      }
  
      let result
      if (props.initialData.id) {
        // Update existing post
        result = await updateBlogPost(props.initialData.id, postData)
      } else {
        // Create new post
        result = await createBlogPost(postData)
      }
  
      emit('submit', result)
      
      // Reset form if creating new post
      if (!props.initialData.id) {
        form.title = ''
        form.author = ''
        form.image_url = ''
        imagePreview.value = ''
        selectedImage.value = null
        quill.setContents([])
        if (imageInput.value) {
          imageInput.value.value = ''
        }
      }
  
    } catch (error) {
      console.error('Error submitting post:', error)
      alert('Error: ' + error.message)
    } finally {
      loading.value = false
    }
  }
  
  onMounted(() => {
    // Initialize Quill editor
    quill = new Quill(editorContainer.value, {
      theme: 'snow',
      placeholder: 'Write your blog post content here...',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ['clean'],
          ['link', 'image']
        ]
      }
    })
  
    // Set initial content if editing
    if (props.initialData.content) {
      quill.root.innerHTML = props.initialData.content
    }
  })
  </script>