<template>
  <div class="relative w-full min-h-screen bg-gray-50 flex items-center overflow-hidden font-inter selection:bg-[#FF7F50] selection:text-white py-12">
    
    <div class="absolute inset-0 pointer-events-none">
      <svg class="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="#09033b" stroke-width="1" fill="none"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
      <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/60 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-100/60 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
    </div>

    <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        <div class="space-y-8 lg:space-y-10">
          
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-[#09033b] text-xs font-bold tracking-wide uppercase shadow-sm">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7F50] opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-[#FF7F50]"></span>
            </span>
            Excellence in Education
          </div>

          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#09033b] leading-[1.1] tracking-tight">
            Shaping Tomorrow's 
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7F50] to-[#ff9f7c]">Leaders</span>
          </h1>

          <div class="space-y-6 max-w-xl">
            <p class="text-xl text-gray-700 leading-relaxed font-light">
              Where world-class education meets Christian values in an individualized learning environment.
            </p>
            <p class="text-sm text-gray-500 leading-relaxed border-l-2 border-[#FF7F50] pl-4">
              Blending Nigerian, American, and British educational standards to equip today's child with 21st-century skills.
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <div class="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-100 shadow-sm text-sm font-medium text-gray-700">
              <UIcon name="i-heroicons-academic-cap" class="w-5 h-5 text-[#09033b]" />
              ACE Curriculum
            </div>
            <div class="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-100 shadow-sm text-sm font-medium text-gray-700">
              <UIcon name="i-heroicons-heart" class="w-5 h-5 text-[#FF7F50]" />
              Christ-Centered
            </div>
            <div class="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-100 shadow-sm text-sm font-medium text-gray-700">
              <UIcon name="i-heroicons-user-group" class="w-5 h-5 text-blue-500" />
              Individualized Learning
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-4 pt-4">
            <NuxtLink 
              to="/admissions" 
              class="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-[#09033b] rounded-xl hover:bg-[#0c0552] hover:shadow-lg hover:shadow-[#09033b]/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#09033b]"
            >
              Begin Your Journey
              <UIcon name="i-heroicons-arrow-right" class="ml-2 -mr-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
            
            <NuxtLink 
              to="/academics/curriculum" 
              class="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-gray-700 transition-all duration-200 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-[#09033b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
            >
              Explore Programs
            </NuxtLink>
          </div>
        </div>

        <div class="relative lg:h-[600px] flex items-center justify-center lg:justify-end">
          
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-gray-200/50 rounded-full animate-[spin_60s_linear_infinite]"></div>

          <div class="relative w-full max-w-md lg:max-w-full">
            <div class="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#09033b]/10 transition-transform duration-700 ease-out">
              <NuxtImg 
                src="/images/history.jpg" 
                alt="Students at The Covenant Academy" 
                class="w-full h-auto object-cover aspect-[4/5]"
                loading="eager"
              />
              <div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#09033b]/60 to-transparent"></div>
            </div>

            <div class="absolute -bottom-6 -left-6 sm:bottom-8 sm:-left-12 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 max-w-[260px] animate-fade-in-up">
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-[#09033b] text-white flex items-center justify-center">
                  <UIcon name="i-heroicons-sparkles" class="w-6 h-6" />
                </div>
                <div>
                  <h3 class="font-bold text-[#09033b] text-sm">Faith & Excellence</h3>
                  <p class="text-xs text-gray-500 mt-1 leading-relaxed">
                    Building character foundation for life-long success.
                  </p>
                </div>
              </div>
            </div>

            <div class="absolute -top-6 -right-6 w-24 h-24 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
          </div>
        </div>

      </div>
    </div>

    <div class="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left hidden xl:block">
      <div class="flex items-center gap-4">
        <span class="w-8 h-px bg-gray-300"></span>
        <span class="text-xs font-bold text-gray-300 tracking-[0.2em] uppercase">Est. 2003</span>
      </div>
    </div>

  </div>
</template>

<script setup>
// Assuming Nuxt UI or Heroicons are available
useHead({
  title: 'The Covenant Academy - Shaping Tomorrow\'s Leaders',
})
</script>

<style scoped>
@keyframes spin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>