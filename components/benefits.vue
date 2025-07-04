<template>
  <div class="relative w-full min-h-screen bg-gray-50 p-4 overflow-hidden font-inter">
    <!-- Subtle Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <svg width="60" height="60" viewBox="0 0 60 60" class="absolute top-0 left-0 w-full h-full">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1" fill="#09033b"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>
    </div>

    <!-- Main Container -->
    <div class="bg-gray-50 relative z-10 max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex items-center">
      <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full">
        
        <!-- Content Side -->
        <div class="space-y-12">
          <!-- Minimal Badge -->
          <div class="inline-flex items-center space-x-3">
            <div class="w-2 h-2 bg-[#09033b] rounded-full"></div>
            <span class="text-sm font-medium text-gray-600 tracking-wide uppercase">
              Excellence in Education
            </span>
          </div>

          <!-- Main Headline -->
          <div class="space-y-8">
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-light leading-[0.9] text-[#09033b] tracking-tight">
              Shaping
              <span class="font-medium block">Tomorrow's</span>
              <span class="font-normal block text-gray-400">Leaders</span>
            </h1>
            
            <!-- Subtle Accent Line -->
            <div class="w-16 h-px bg-[#09033b]"></div>
          </div>

          <!-- Value Proposition -->
          <div class="space-y-6 max-w-lg">
            <p class="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
              Where world-class education meets Christian values in an individualized learning environment.
            </p>
            
            <p class="text-base text-gray-500 leading-relaxed">
              The Covenant Academy blends Nigerian, American, and British educational standards to equip today's child with 21st-century skills.
            </p>
          </div>

          <!-- Updated Stats Section -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8">
            <!-- ACE Curriculum -->
            <div class="text-center group">
              <div class="flex justify-center mb-3">
                <div class="w-12 h-12 bg-[#09033b] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
              </div>
              <div class="text-lg font-medium text-[#09033b] mb-2">ACE Curriculum</div>
              <div class="text-sm text-gray-500 leading-relaxed">Accelerated Christian Education</div>
            </div>

            <!-- Christ-centered Environment -->
            <div class="text-center group">
              <div class="flex justify-center mb-3">
                <div class="w-12 h-12 bg-[#09033b] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="text-lg font-medium text-[#09033b] mb-2">Christ-Centered</div>
              <div class="text-sm text-gray-500 leading-relaxed">Faith-Based Environment</div>
            </div>

            <!-- Individualized Learning -->
            <div class="text-center group">
              <div class="flex justify-center mb-3">
                <div class="w-12 h-12 bg-[#09033b] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
              </div>
              <div class="text-lg font-medium text-[#09033b] mb-2">Individualized</div>
              <div class="text-sm text-gray-500 leading-relaxed">Personalized Learning</div>
            </div>
          </div>

          <!-- Clean CTAs -->
          <div class="flex flex-col sm:flex-row gap-4 pt-8">
            <NuxtLink 
              to="/admissions"
              class="group inline-flex items-center justify-center px-8 py-4 bg-[#09033b] text-white text-base font-medium hover:bg-[#0a0440] transition-colors duration-300"
            >
              Begin Your Journey
              <svg class="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>
            
            <NuxtLink 
              to="/academics/curriculum"
              class="inline-flex items-center justify-center px-8 py-4 text-[#09033b] text-base font-medium border border-gray-200 hover:border-[#09033b] hover:bg-gray-50 transition-all duration-300"
            >
              Explore Programs
            </NuxtLink>
          </div>
        </div>

        <!-- Image Side -->
        <div class="relative lg:ml-auto">
          <div class="relative group">
            <!-- Main Image -->
            <div class="aspect-[4/5] max-w-md mx-auto lg:mx-0 lg:ml-auto overflow-hidden transition-all ">
              <img 
                class="w-full h-full object-cover  transition-all duration-700 group-hover:scale-105" 
                src="/images/history.jpg" 
                alt="Students at The Covenant Academy"
                loading="lazy"
              />
            </div>
            
            <!-- Minimal Overlay Info -->a
            <div class="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-8 h-8 bg-[#09033b] flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-[#09033b] text-lg">God-Centered Excellence</h3>
                  <p class="text-sm text-gray-600">Christian Character Foundation</p>
                </div>
              </div>
              <p class="text-sm text-gray-700 leading-relaxed">
                "Equipping today's child with tomorrow's skills through faith-based education."
              </p>
            </div>

            <!-- Minimal Geometric Accent -->
            <div class="absolute -top-4 -right-4 w-24 h-24 border border-gray-200 opacity-50"></div>
            <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-[#09033b] opacity-10"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Minimal Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-3 opacity-60">
      <span class="text-xs text-gray-500 font-medium tracking-wide">Scroll</span>
      <div class="w-px h-12 bg-gradient-to-b from-[#09033b] to-transparent"></div>
    </div>

    <!-- Side Branding -->
    <div class="absolute left-8 top-1/2 transform -translate-y-1/2 -rotate-90 hidden xl:block">
      <span class="text-xs font-medium text-gray-400 tracking-widest uppercase">Excellence • Faith • Character</span>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'The Covenant Academy - Shaping Tomorrow\'s Leaders',
  meta: [
    {
      name: 'description',
      content: 'Excellence in education where world-class curriculum meets Christian values. The Covenant Academy blends Nigerian, American, and British standards in an individualized learning environment.'
    },
    {
      property: 'og:title',
      content: 'The Covenant Academy - Shaping Tomorrow\'s Leaders'
    },
    {
      property: 'og:description',
      content: 'Where world-class education meets Christian values in an individualized learning environment.'
    },
    {
      name: 'theme-color',
      content: '#09033b'
    }
  ]
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

* {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced focus states */
a:focus,
button:focus {
  outline: 2px solid #09033b;
  outline-offset: 2px;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom selection color */
::selection {
  background-color: #09033b;
  color: white;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .text-gray-400,
  .text-gray-500,
  .text-gray-600 {
    color: #000;
  }
  
  .border-gray-200 {
    border-color: #000;
  }
}

/* Print styles */
@media print {
  .absolute {
    position: static !important;
  }
  
  .bg-gradient-to-b {
    background: #09033b !important;
  }
}

/* Mobile menu toggle (if needed) */
@media (max-width: 768px) {
  .text-5xl { font-size: 2.5rem; }
  .text-6xl { font-size: 3rem; }
  .text-7xl { font-size: 3.5rem; }
}

/* Hover effects */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

.group:hover .group-hover\:translate-y-0 {
  transform: translateY(0);
}

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #f8f9fa;
}

::-webkit-scrollbar-thumb {
  background: #09033b;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #0a0440;
}
</style>