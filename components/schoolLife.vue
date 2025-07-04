<template>
  <div class="relative w-full h-[220px] sm:h-[280px] md:h-[380px] overflow-hidden font-inter">
    <!-- Background Image with Simple Overlay -->
    <div 
      class="absolute inset-0 bg-cover bg-center"
      :style="{ backgroundImage: `url('/assets/images/IMG-20250130-WA0006.jpg')` }"
    >
      <div class="absolute inset-0 bg-black/50"></div>
    </div>
    
    <!-- Content Container -->
    <div class="relative z-10 h-full flex items-center">
      <div class="container mx-auto px-4 md:px-8">
        <div class="max-w-3xl">
          <!-- Heading -->
          <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-3 md:mb-4">
            Discover Our Extra-Curricular Activities
          </h1>
          
          <!-- Description -->
          <p class="text-sm sm:text-base md:text-lg text-gray-200 mb-4 md:mb-6 max-w-2xl">
            The Covenant Academy has after-school clubs as well as excursions, that are specially designed to produce well-rounded students.
          </p>
          
          <!-- CTA Button -->
          <NuxtLink 
            to="/academics/extra-curricular" 
            class="inline-flex items-center gap-2 bg-[#FF7F50] hover:bg-[#FF7F50]/90 text-white px-5 py-2 md:py-3  font-medium"
          >
            Learn More
            <svg
              class=" w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional script needed
</script>