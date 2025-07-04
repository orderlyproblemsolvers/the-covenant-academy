<template>    
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div class="p-6">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup>
  defineProps({
    show: Boolean
  })
  
  const emit = defineEmits(['close'])
  
  // Close modal on ESC
  const handleEscape = (e) => {
    if (e.key === 'Escape') emit('close')
  }
  
  onMounted(() => window.addEventListener('keydown', handleEscape))
  onBeforeUnmount(() => window.removeEventListener('keydown', handleEscape))
  </script>
  
  <style scoped>
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.3s;
  }
  
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }
  </style>