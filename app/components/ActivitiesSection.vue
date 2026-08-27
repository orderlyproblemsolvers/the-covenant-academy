<template>
  <div class="relative w-full h-[220px] sm:h-[280px] md:h-[380px] overflow-hidden font-inter">
    <!-- Background Image via NuxtImg -->
    <NuxtImg
      src="/images/IMG-20250130-WA0006.jpg"
      alt="Extra-curricular activities at The Covenant Academy"
      class="absolute inset-0 w-full h-full object-cover"
      fit="cover"
      loading="eager"
      sizes="100vw sm:100vw md:100vw"
    />
    <div class="absolute inset-0 bg-black/50"></div>

    <!-- Content Container -->
    <div class="relative z-10 h-full flex items-center">
      <div class="container mx-auto px-4 md:px-8">
        <div class="max-w-3xl">
          <!-- Heading -->
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-3 md:mb-4">
            Discover Our Extra-Curricular Activities
          </h2>

          <!-- Description -->
          <p class="text-sm sm:text-base md:text-lg text-gray-200 mb-4 md:mb-6 max-w-2xl">
            The Covenant Academy has after-school clubs as well as excursions, that are specially designed to produce well-rounded students.
          </p>

          <!-- CTA Button -->
          <Button to="/academics/extra-curricular" icon="heroicons:trophy" styles="alternate" content="Discover"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional script needed
</script>