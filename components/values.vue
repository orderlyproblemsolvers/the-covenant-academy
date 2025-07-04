<template>
  <section class="relative py-24 px-6 lg:px-8 bg-gray-50 overflow-x-hidden font-inter">
    <!-- Subtle Background Pattern -->
    <div class="absolute inset-0 opacity-3">
      <svg width="60" height="60" viewBox="0 0 60 60" class="absolute top-0 left-0 w-full h-full">
        <defs>
          <pattern id="belief-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1" fill="#09033b"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#belief-grid)"/>
      </svg>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <div class="inline-flex items-center space-x-3 mb-8">
          <div class="w-2 h-2 bg-[#09033b] rounded-full"></div>
          <span class="text-sm font-medium text-gray-600 tracking-wide uppercase">
            Our Foundation
          </span>
        </div>
        
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-[#09033b] tracking-tight mb-8">
          Our 
          <span class="font-medium">Belief</span>
        </h2>
        
        <!-- Subtle Accent Line -->
        <div class="w-16 h-px bg-[#09033b] mx-auto mb-8"></div>
        
        <p class="text-xl md:text-2xl text-gray-600 leading-relaxed font-light max-w-2xl mx-auto">
          We at The Covenant Academy believe that:
        </p>
      </div>
      
      <!-- Belief Cards Grid -->
      <div class="grid gap-8 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <!-- Bible -->
        <div class="group relative bg-white p-8 border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
          <div class="flex items-start space-x-6 mb-6">
            <div class="flex-shrink-0 w-12 h-12 bg-gray-50 group-hover:bg-[#09033b] flex items-center justify-center transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#09033b] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-medium text-[#09033b] mb-3">The Bible</h3>
              <p class="text-gray-600 leading-relaxed">Is the foundation for all things.</p>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        </div>
        
        <!-- Maths -->
        <div class="group relative bg-white p-8 border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
          <div class="flex items-start space-x-6 mb-6">
            <div class="flex-shrink-0 w-12 h-12 bg-gray-50 group-hover:bg-[#09033b] flex items-center justify-center transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#09033b] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-medium text-[#09033b] mb-3">Maths</h3>
              <p class="text-gray-600 leading-relaxed">Is computing God's wonderful works.</p>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        </div>
        
        <!-- Music -->
        <div class="group relative bg-white p-8 border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
          <div class="flex items-start space-x-6 mb-6">
            <div class="flex-shrink-0 w-12 h-12 bg-gray-50 group-hover:bg-[#09033b] flex items-center justify-center transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#09033b] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-medium text-[#09033b] mb-3">Music</h3>
              <p class="text-gray-600 leading-relaxed">Is the melody of God.</p>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        </div>
        
        <!-- English -->
        <div class="group relative bg-white p-8 border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
          <div class="flex items-start space-x-6 mb-6">
            <div class="flex-shrink-0 w-12 h-12 bg-gray-50 group-hover:bg-[#09033b] flex items-center justify-center transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#09033b] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-medium text-[#09033b] mb-3">English</h3>
              <p class="text-gray-600 leading-relaxed">Is instructional units for learning.</p>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        </div>
        
        <!-- Sounds and Arts -->
        <div class="group relative bg-white p-8 border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
          <div class="flex items-start space-x-6 mb-6">
            <div class="flex-shrink-0 w-12 h-12 bg-gray-50 group-hover:bg-[#09033b] flex items-center justify-center transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#09033b] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-medium text-[#09033b] mb-3">Sounds and Arts</h3>
              <p class="text-gray-600 leading-relaxed">Are the beauty of God's creation.</p>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        </div>
        
        <!-- Reading -->
        <div class="group relative bg-white p-8 border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
          <div class="flex items-start space-x-6 mb-6">
            <div class="flex-shrink-0 w-12 h-12 bg-gray-50 group-hover:bg-[#09033b] flex items-center justify-center transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#09033b] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-medium text-[#09033b] mb-3">Reading</h3>
              <p class="text-gray-600 leading-relaxed">Is the foundation for learning.</p>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        </div>
      </div>

      <!-- Science - Featured Card -->
      <div class="mt-16">
        <div class="group relative bg-white p-12 border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 max-w-4xl mx-auto">
          <div class="flex items-start space-x-8">
            <div class="flex-shrink-0 w-16 h-16 bg-gray-50 group-hover:bg-[#09033b] flex items-center justify-center transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#09033b] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div class="text-center flex-1">
              <h3 class="text-2xl font-medium text-[#09033b] mb-4">Science</h3>
              <p class="text-xl text-gray-600 leading-relaxed font-light">Is the study of God's creation.</p>
            </div>
          </div>
          
          <!-- Minimal Geometric Accents -->
          <div class="absolute -top-2 -right-2 w-12 h-12 border border-gray-200 opacity-30"></div>
          <div class="absolute -bottom-2 -left-2 w-8 h-8 bg-[#09033b] opacity-5"></div>
          <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        </div>
      </div>
    </div>

    <!-- Side Accent -->
    <div class="absolute right-8 top-1/2 transform -translate-y-1/2 rotate-90 hidden xl:block">
      <span class="text-xs font-medium text-gray-400 tracking-widest uppercase">Foundation • Faith • Excellence</span>
    </div>
  </section>
</template>

<script setup>
// Component logic can be added here if needed
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

* {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, opacity, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced focus states */
.group:focus-within {
  outline: 2px solid #09033b;
  outline-offset: 2px;
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
  
  .border-gray-100,
  .border-gray-200 {
    border-color: #000;
  }
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .text-4xl { font-size: 2rem; }
  .text-5xl { font-size: 2.5rem; }
  .text-6xl { font-size: 3rem; }
}

*{
  transition: all ease .5s;
}
</style>