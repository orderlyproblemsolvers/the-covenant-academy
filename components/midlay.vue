<template>
  <section class="relative w-full py-20 bg-[#09033b] overflow-hidden font-inter selection:bg-[#FF7F50] selection:text-white">
    
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4f46e5]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF7F50]/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      
      <svg class="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="white" stroke-width="1" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
          Connect with <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">TCAD</span>
        </h2>
        <p class="text-lg text-blue-100/80 leading-relaxed font-light">
          Whether you are looking to join our community online, visit our campus, or understand our fee structure, we are here to help.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        
        <div class="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
          <div class="absolute bottom-0 left-0 w-full h-1 bg-[#FF7F50] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          
          <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
            <UIcon name="i-heroicons-device-phone-mobile" class="w-6 h-6 text-blue-300" />
          </div>

          <h3 class="text-xl font-semibold text-white mb-3">Digital Community</h3>
          <p class="text-sm text-gray-400 mb-8">Follow our daily activities, student highlights, and announcements on social media.</p>

          <div class="space-y-3">
            <NuxtLink 
              to="https://web.facebook.com/COVACADEMY" 
              target="_blank"
              class="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-white/5 hover:bg-[#1877F2] hover:text-white text-gray-300 transition-all duration-300 group/btn"
            >
              <span class="flex items-center gap-3 text-sm font-medium">
                <UIcon name="i-simple-icons-facebook" class="w-4 h-4" />
                Facebook
              </span>
              <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
            </NuxtLink>

            <NuxtLink 
              to="https://www.instagram.com/thecovenantacademyabuja204" 
              target="_blank"
              class="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-white/5 hover:bg-gradient-to-r hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:text-white text-gray-300 transition-all duration-300 group/btn"
            >
              <span class="flex items-center gap-3 text-sm font-medium">
                <UIcon name="i-simple-icons-instagram" class="w-4 h-4" />
                Instagram
              </span>
              <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
            </NuxtLink>
          </div>
        </div>

        <div class="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
          <div class="absolute bottom-0 left-0 w-full h-1 bg-[#FF7F50] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

          <div class="w-12 h-12 bg-[#FF7F50]/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FF7F50]/30 transition-colors">
            <UIcon name="i-heroicons-map-pin" class="w-6 h-6 text-[#FF7F50]" />
          </div>

          <h3 class="text-xl font-semibold text-white mb-3">Book a Tour</h3>
          <p class="text-sm text-gray-400 mb-8">Experience our facilities firsthand. Schedule a guided tour with our admissions team.</p>

          <NuxtLink 
            to="/admissions/visit" 
            class="inline-flex items-center text-[#FF7F50] font-medium text-sm group-hover:text-white transition-colors"
          >
            Schedule your visit
            <UIcon name="i-heroicons-arrow-long-right" class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>

        <div class="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
          <div class="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

          <div class="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/30 transition-colors">
            <UIcon name="i-heroicons-banknotes" class="w-6 h-6 text-emerald-400" />
          </div>

          <h3 class="text-xl font-semibold text-white mb-3">Tuition & Fees</h3>
          <p class="text-sm text-gray-400 mb-8">Transparent pricing for world-class education. View our current fee structure and payment plans.</p>

          <NuxtLink 
            to="/admissions/tuition" 
            class="inline-flex items-center text-emerald-400 font-medium text-sm group-hover:text-white transition-colors"
          >
            View fee structure
            <UIcon name="i-heroicons-arrow-long-right" class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
// Assuming you are using Nuxt UI for icons
// If not, replace <UIcon> with standard SVGs or your preferred icon library
</script>