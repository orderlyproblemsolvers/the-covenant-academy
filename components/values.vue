<template>
  <section class="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden font-inter selection:bg-[#09033b] selection:text-white">
    
    <div class="absolute inset-0 pointer-events-none">
      <svg class="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="dot-pattern-beliefs" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#09033b"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#dot-pattern-beliefs)" />
      </svg>
      
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-100/50 rounded-full blur-[100px] opacity-60"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto">
      
      <div class="text-center max-w-3xl mx-auto mb-20">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-[#09033b] text-xs font-bold tracking-wide uppercase mb-6 shadow-sm">
          <span class="w-2 h-2 rounded-full bg-[#09033b]"></span>
          Core Values
        </div>
        
        <h2 class="text-4xl md:text-5xl font-bold text-[#09033b] tracking-tight mb-6">
          Our Foundation of <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#09033b] to-[#4f46e5]">Belief</span>
        </h2>
        
        <p class="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
          At The Covenant Academy, every subject is a window into understanding God's world and His truth.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        
        <div class="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-[#09033b] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
          
          <div class="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#09033b] group-hover:rotate-6 transition-all duration-300">
            <svg class="w-7 h-7 text-[#09033b] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          
          <h3 class="text-xl font-bold text-[#09033b] mb-2">The Bible</h3>
          <p class="text-gray-500 font-medium">Is the foundation for all things.</p>
        </div>

        <div class="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-[#09033b] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

          <div class="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#09033b] group-hover:rotate-6 transition-all duration-300">
            <svg class="w-7 h-7 text-[#09033b] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h3 class="text-xl font-bold text-[#09033b] mb-2">Mathematics</h3>
          <p class="text-gray-500 font-medium">Is computing God's wonderful works.</p>
        </div>

        <div class="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-[#09033b] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

          <div class="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#09033b] group-hover:rotate-6 transition-all duration-300">
            <svg class="w-7 h-7 text-[#09033b] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          
          <h3 class="text-xl font-bold text-[#09033b] mb-2">Music</h3>
          <p class="text-gray-500 font-medium">Is the melody of God.</p>
        </div>

        <div class="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-[#09033b] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

          <div class="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#09033b] group-hover:rotate-6 transition-all duration-300">
            <svg class="w-7 h-7 text-[#09033b] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </div>
          
          <h3 class="text-xl font-bold text-[#09033b] mb-2">English</h3>
          <p class="text-gray-500 font-medium">Is instructional units for learning.</p>
        </div>

        <div class="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-[#09033b] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

          <div class="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#09033b] group-hover:rotate-6 transition-all duration-300">
            <svg class="w-7 h-7 text-[#09033b] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h3 class="text-xl font-bold text-[#09033b] mb-2">Sounds & Arts</h3>
          <p class="text-gray-500 font-medium">Are the beauty of God's creation.</p>
        </div>

        <div class="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-[#09033b] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

          <div class="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#09033b] group-hover:rotate-6 transition-all duration-300">
            <svg class="w-7 h-7 text-[#09033b] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          
          <h3 class="text-xl font-bold text-[#09033b] mb-2">Reading</h3>
          <p class="text-gray-500 font-medium">Is the foundation for learning.</p>
        </div>

        <div class="md:col-span-2 lg:col-span-3 group relative bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
          <div class="absolute top-0 left-0 w-1 h-full bg-[#FF7F50] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
          
          <div class="flex-shrink-0 w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-[#09033b] group-hover:rotate-6 transition-all duration-300">
            <svg class="w-10 h-10 text-[#09033b] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          
          <div class="flex-1">
            <h3 class="text-2xl font-bold text-[#09033b] mb-2">Science</h3>
            <p class="text-lg text-gray-500 font-light leading-relaxed">
              Is the detailed study of God's creation. Through science, we observe the complexity and order of the universe, reinforcing our understanding of a purposeful Creator.
            </p>
          </div>
          
          <div class="hidden md:block opacity-10">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="#09033b" stroke-width="2" stroke-dasharray="8 8" />
              <circle cx="50" cy="50" r="25" stroke="#09033b" stroke-width="2" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
// Component logic
</script>