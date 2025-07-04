<template>
    <div class="min-h-screen bg-gray-50 font-inter">
      <div class="container mx-auto py-8 px-4">
        <h1 class="text-4xl md:text-5xl font-light text-[#09033b] tracking-tight mb-8 text-center">TCAD Calendar</h1>
        <CalendarGrid />
      </div>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    layout: 'default' // Use your public layout
  })
  </script>