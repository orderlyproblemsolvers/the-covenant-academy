<template>
  <div class="bg-[#09033b] w-full max-w-4xl mx-auto rounded-lg border border-[#FF7F50]/20 text-white p-6 shadow-lg">
    <!-- Header Section -->
    <div class="text-center mb-6">
      <h3 class="text-xl md:text-2xl font-bold">#Explore TCAD on Social Media</h3>
      <div class="h-1 w-16 bg-gradient-to-r from-[#FF7F50] to-[#FF7F50]/70 rounded-full mx-auto mt-2"></div>
      <p class="mt-3 text-sm md:text-base flex items-center justify-center gap-2">
        <UIcon name="i-heroicons-at-symbol" class="text-[#FF7F50]" />
        <span>The Covenant Academy Abuja</span>
      </p>
    </div>
    
    <!-- Social Links -->
    <div class="flex flex-wrap justify-center gap-3 mb-8">
      <NuxtLink 
        class="px-4 py-2 bg-[#FF7F50] hover:bg-[#FF7F50]/90 text-white rounded-md text-xs md:text-sm flex items-center gap-2 transition-colors duration-300" 
        to="#"
      >
        <UIcon name="i-heroicons-facebook-brand"/>
        FACEBOOK
      </NuxtLink>
      <NuxtLink 
        class="px-4 py-2 bg-[#FF7F50] hover:bg-[#FF7F50]/90 text-white rounded-md text-xs md:text-sm flex items-center gap-2 transition-colors duration-300" 
        to="#"
      >
        <UIcon name="i-heroicons-brand-instagram"/>
        INSTAGRAM
      </NuxtLink>
    </div>
    
    <!-- Image Gallery -->
    <div class="w-full">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        <!-- Main large image -->
        <div class="col-span-2 row-span-2 rounded-md overflow-hidden h-64 md:h-auto">
          <img 
            :src="'/assets/images/IMG-20250130-WA0006.jpg'" 
            alt="Featured image" 
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <!-- Smaller gallery images -->
        <div class="rounded-md overflow-hidden h-32 md:h-40">
          <img 
            :src="'/assets/images/Hitube_jQxd8UA605_2025_03_04_01_25_25.jpg'" 
            alt="Gallery image 1" 
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div class="rounded-md overflow-hidden h-32 md:h-40">
          <img 
            :src="'/assets/images/tower.jpg'" 
            alt="Gallery image 2" 
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div class="rounded-md overflow-hidden h-32 md:h-40">
          <img 
            :src="'/assets/images/IMG-20250130-WA0006.jpg'" 
            alt="Gallery image 3" 
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div class="rounded-md overflow-hidden h-32 md:h-40">
          <img 
            :src="'/assets/images/tower.jpg'" 
            alt="Gallery image 4" 
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic can be added here
</script>