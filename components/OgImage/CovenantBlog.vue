<script setup lang="ts">
// components/OgImage/CovenantBlog.vue
defineProps({
  title: {
    type: String,
    required: true,
    default: '12 Precious Reasons to Choose The Covenant Academy' // Fallback
  }
})
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center bg-white p-16">
    <img 
      src="/tcad-nbg.png" 
      alt="The Covenant Academy" 
      class="h-48 mb-10 object-contain" 
    />

    <h1 class="text-7xl font-bold text-[#0a1045] text-center leading-tight font-serif px-8">
      {{ title }}
    </h1>
    
    <p class="absolute bottom-10 text-2xl text-gray-500 font-medium uppercase tracking-widest">
      thecovenantacademy.org
    </p>
  </div>
</template>