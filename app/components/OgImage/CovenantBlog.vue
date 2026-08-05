<script setup lang="ts">
// components/OgImage/CovenantBlog.vue
defineProps({
  title: {
    type: String,
    required: true,
    default: '12 Precious Reasons to Choose The Covenant Academy'
  }
})
</script>

<template>
  <div style="display: flex; flex-direction: column; justify-content: space-between; width: 100%; height: 100%; padding: 64px; background: linear-gradient(to bottom right, #0e0459, #131C6F, #183182);">
    <div style="display: flex; flex-direction: column;">
      <img 
        src="/tcad-nbg.png" 
        alt="The Covenant Academy"
        style="height: 120px; width: 120px; object-fit: contain; margin-bottom: 40px;"
      />

      <h1 style="font-size: 64px; line-height: 1.2; font-family: serif; color: #ffffff; font-weight: bold; text-align: left;">
        {{ title }}
      </h1>
    </div>
    
    <p style="font-size: 20px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; color: #ffffff;">
      Read full article at thecovenantacademy.org
    </p>
  </div>
</template>