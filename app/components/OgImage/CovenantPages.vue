<script setup lang="ts">
// components/OgImage/CovenantBlog.vue
defineProps({
  title: {
    type: String,
    required: true,
    default: '12 Precious Reasons to Choose The Covenant Academy'
  },
  subtitle: {
    type: String,
    default: 'Discover excellence in education'
  }
})
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center p-16" style="background: linear-gradient(to bottom right, #0e0459, #131C6F, #183182);">
    <img 
      src="/tcad-nbg.png" 
      alt="The Covenant Academy" 
      class="mb-10"
      style="height: 192px; object-fit: contain;"
    />

    <div class="flex flex-col items-center justify-center px-8">
      <h1 class="text-white text-center mb-6 font-bold" style="font-size: 72px; line-height: 1.2; font-family: serif;">
        {{ title }}
      </h1>
      
      <p class="text-center px-12" style="font-size: 32px; color: #dbeafe; font-weight: 500;">
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>