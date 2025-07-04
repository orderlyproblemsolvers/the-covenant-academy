<template>
  <div class="relative w-full bg-gray-50 p-6 lg:p-8 overflow-hidden font-inter">
    <!-- Subtle Background Pattern -->
    <div class="absolute inset-0 opacity-3">
      <svg width="60" height="60" viewBox="0 0 60 60" class="absolute top-0 left-0 w-full h-full">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1" fill="#09033b"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto">
      <div class="bg-gray-50 border border-gray-100 rounded-lg overflow-hidden shadow-sm">
        
        <!-- Header Section -->
        <div class="p-8 bg-[#09033b] text-white relative overflow-hidden">
          <!-- Geometric accent -->
          <div class="absolute top-0 right-0 w-24 h-24 border border-white/10 transform rotate-45 translate-x-12 -translate-y-12"></div>
          
          <div class="relative z-10 space-y-4">
            <div class="inline-flex items-center space-x-3 mb-2">
              <div class="w-2 h-2 bg-white rounded-full"></div>
              <span class="text-sm font-medium text-white/80 tracking-wide uppercase">
                Visit Us
              </span>
            </div>
            
            <h1 class="text-3xl md:text-4xl font-light leading-tight tracking-tight">
              Visit The Covenant
              <span class="font-medium block">Academy</span>
            </h1>
            
            <div class="w-16 h-px bg-white/40"></div>
            
            <div class="flex items-start space-x-3 pt-2">
              <div class="mt-1 text-white/60">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
              </div>
              <p class="text-base font-light text-white/90 leading-relaxed">
                No. 8A Kayes Street, Wuse Zone 1, Abuja
              </p>
            </div>
          </div>
        </div>
        
        <!-- Map Section -->
        <div class="p-8 bg-gray-50/50">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div class="space-y-2">
              <h2 class="text-xl md:text-2xl font-light text-[#09033b] tracking-tight">Our Location</h2>
              <div class="w-12 h-px bg-[#09033b]"></div>
            </div>
            
            <a 
              href="https://maps.google.com/?q=Covenant+Academy+8A+Kayes+Street+Wuse+Zone+1+Abuja" 
              target="_blank" 
              class="inline-flex items-center px-6 py-3 bg-[#09033b] text-white text-sm font-medium hover:bg-[#0a0440] transition-all duration-300 group"
            >
              Get Directions
              <svg class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          
          <div class="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <ClientOnly>
              <MapDisplay />
            </ClientOnly>
          </div>
        </div>

        <!-- Information Cards Section -->
        <div class="p-8 bg-white">
          <div class="grid md:grid-cols-3 gap-6 mb-8">
            <div class="group">
              <div class="p-6 bg-gray-50/50 hover:bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all duration-300">
                <div class="flex items-center space-x-3 mb-3">
                  <div class="w-8 h-8 bg-[#09033b] flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div class="text-[#09033b] font-medium">School Hours</div>
                </div>
                <p class="text-sm text-gray-600 font-light leading-relaxed">Mon-Fri: 8:00 AM - 4:00 PM</p>
              </div>
            </div>

            <div class="group">
              <div class="p-6 bg-gray-50/50 hover:bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all duration-300">
                <div class="flex items-center space-x-3 mb-3">
                  <div class="w-8 h-8 bg-[#09033b] flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div class="text-[#09033b] font-medium">Contact Us</div>
                </div>
                <p class="text-sm text-gray-600 font-light leading-relaxed">+234 803 623 3157</p>
              </div>
            </div>

            <div class="group">
              <div class="p-6 bg-gray-50/50 hover:bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all duration-300">
                <div class="flex items-center space-x-3 mb-3">
                  <div class="w-8 h-8 bg-[#09033b] flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div class="text-[#09033b] font-medium">Email</div>
                </div>
                <p class="text-sm text-gray-600 font-light leading-relaxed">tcadinfo@gmail.com</p>
              </div>
            </div>
          </div>

          <!-- Call to Action -->
          <div class="text-center pt-4 border-t border-gray-100">
            <div class="space-y-4">
              <div class="space-y-2">
                <p class="text-base text-gray-600 font-light">Ready to explore our campus?</p>
                <div class="w-12 h-px bg-[#09033b] mx-auto"></div>
              </div>
              
              <button class="inline-flex items-center px-8 py-4 bg-[#09033b] text-white text-base font-medium hover:bg-[#0a0440] transition-all duration-300 group">
                Schedule a Visit
                <svg class="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MapDisplay from "~/components/MapDisplay.vue";
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

* {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Target the Leaflet map container */
:deep(.leaflet-container),
:deep(.leaflet-pane),
:deep(.leaflet-top),
:deep(.leaflet-bottom) {
  z-index: 10 !important;
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
</style>