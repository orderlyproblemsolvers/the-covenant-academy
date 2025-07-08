<template>
  <div class="bg-[#09033b] font-inter overflow-x-hidden">
    <!-- Main Container -->
    <div class="mx-auto max-w-7xl px-4 py-12">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h2 class="text-4xl md:text-5xl font-light text-white tracking-tight mb-3">
          Connect With TCAD
        </h2>
        <p class="text-white text-lg max-w-2xl mx-auto">
          Discover our community, plan your visit, and explore affordable education opportunities
        </p>
      </div>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Social Media Card -->
        <div class="group relative overflow-hidden bg-white border-2 border-slate-200 hover:border-indigo-400 transition-all duration-300 hover:shadow-xl">
          <!-- Geometric Background -->
          <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <div class="absolute inset-0" 
                 style="background: linear-gradient(45deg, #4f46e5 25%, transparent 25%), 
                        linear-gradient(-45deg, #4f46e5 25%, transparent 25%), 
                        linear-gradient(45deg, transparent 75%, #4f46e5 75%), 
                        linear-gradient(-45deg, transparent 75%, #4f46e5 75%);
                        background-size: 20px 20px;">
            </div>
          </div>
          
          <!-- Content -->
          <div class="relative p-8">
            <div class="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 mb-6 mx-auto">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </div>
            
            <h3 class="text-xl font-bold text-slate-800 mb-4 text-center">
              Follow Our Journey
            </h3>
            
            <div class="space-y-3">
              <NuxtLink 
                to="https://web.facebook.com/COVACADEMY/?_rdc=1&_rdr#"
                class="flex items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors duration-200 group/link"
              >
                <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span class="font-medium">Facebook</span>
                <svg class="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </NuxtLink>
              
              <NuxtLink 
                to="https://www.instagram.com/thecovenantacademyabuja204"
                class="flex items-center justify-center p-3 bg-pink-50 hover:bg-pink-100 text-pink-700 transition-colors duration-200 group/link"
              >
                <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.988-5.367 11.988-11.988C24.005 5.367 18.638.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.926 3.708 13.775 3.708 12.478s.49-2.448 1.418-3.323C6.001 8.28 7.152 7.79 8.449 7.79s2.448.49 3.323 1.365c.875.875 1.365 2.026 1.365 3.323s-.49 2.448-1.365 3.323c-.875.875-2.026 1.365-3.323 1.365zm7.718-1.185c-.266.266-.622.399-.978.399s-.712-.133-.978-.399l-2.448-2.448c-.266-.266-.399-.622-.399-.978s.133-.712.399-.978l2.448-2.448c.266-.266.622-.399.978-.399s.712.133.978.399c.266.266.399.622.399.978s-.133.712-.399.978l-1.47 1.47 1.47 1.47c.266.266.399.622.399.978s-.133.712-.399.978z"/>
                </svg>
                <span class="font-medium">Instagram</span>
                <svg class="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Visit Card -->
        <div class="group relative overflow-hidden bg-white border-2 border-slate-200 hover:border-orange-400 transition-all duration-300 hover:shadow-xl">
          <!-- Geometric Background -->
          <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <div class="absolute inset-0" 
                 style="background: linear-gradient(90deg, #f97316 50%, transparent 50%), 
                        linear-gradient(0deg, #f97316 50%, transparent 50%);
                        background-size: 30px 30px;">
            </div>
          </div>
          
          <!-- Content -->
          <div class="relative p-8">
            <div class="flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 mb-6 mx-auto">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            
            <h3 class="text-xl font-bold text-slate-800 mb-4 text-center">
              Experience Our Campus
            </h3>
            
            <p class="text-slate-600 text-center mb-6 text-sm">
              Schedule a personalized tour and see why TCAD is the right choice for your family
            </p>
            
            <div class="text-center">
              <NuxtLink
                to="/admissions/visit"
                class="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                Schedule Visit
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Tuition Card -->
        <div class="group relative overflow-hidden bg-white border-2 border-slate-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-xl">
          <!-- Geometric Background -->
          <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <div class="absolute inset-0" 
                 style="background: repeating-linear-gradient(45deg, #10b981, #10b981 10px, transparent 10px, transparent 20px),
                        repeating-linear-gradient(-45deg, #10b981, #10b981 10px, transparent 10px, transparent 20px);
                        background-size: 28px 28px;">
            </div>
          </div>
          
          <!-- Content -->
          <div class="relative p-8">
            <div class="flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 mb-6 mx-auto">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
              </svg>
            </div>
            
            <h3 class="text-xl font-bold text-slate-800 mb-4 text-center">
              Quality Education
            </h3>
            
            <p class="text-slate-600 text-center mb-6 text-sm">
              Discover our competitive tuition rates and flexible payment options
            </p>
            
            <div class="text-center">
              <NuxtLink
                to="/admissions/tuition"
                class="inline-flex items-center px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                View Details
              </NuxtLink>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic can be added here if needed
</script>