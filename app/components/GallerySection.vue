<template>
  <section class="relative w-full py-12 md:py-20 bg-[#09033b] overflow-hidden font-inter selection:bg-[#FF7F50] selection:text-white">
    
    <div class="absolute inset-0 opacity-[0.15] pointer-events-none">
      <svg width="100%" height="100%">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>

    <div class="relative z-10 text-center mb-10 md:mb-16 px-4">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-200 text-xs font-bold tracking-wide uppercase mb-4 md:mb-6 backdrop-blur-sm">
        <span class="w-2 h-2 rounded-full bg-[#FF7F50] animate-pulse"></span>
        Campus Life
      </div>
      <h2 class="text-3xl md:text-6xl font-bold text-white tracking-tight mb-3 md:mb-4">
        Discover Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7F50] to-[#ff9f7c]">World</span>
      </h2>
      <p class="text-base md:text-lg text-gray-300 max-w-2xl mx-auto font-light">
        A glimpse into the daily moments, big celebrations, and learning adventures at TCAD.
      </p>
    </div>

    <div class="relative w-full -rotate-2 scale-110 md:scale-110 py-6 md:py-10 space-y-4 md:space-y-8">
      
      <div class="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#09033b] to-transparent z-20 pointer-events-none"></div>
      <div class="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#09033b] to-transparent z-20 pointer-events-none"></div>

      <div class="flex overflow-hidden group/track">
        <div class="flex gap-3 md:gap-6 animate-scroll-left group-hover/track:[animation-play-state:paused] py-2">
          <div 
            v-for="(image, index) in duplicatedImages" 
            :key="`row1-${index}`"
            @click="openModal(image)"
            class="relative flex-shrink-0 w-[180px] h-[120px] sm:w-[300px] sm:h-[200px] md:w-[400px] md:h-[260px] rounded-xl md:rounded-2xl overflow-hidden cursor-pointer group/card transition-transform duration-500 hover:scale-105 hover:z-10 hover:shadow-2xl hover:shadow-[#FF7F50]/20 border border-white/10"
          >
            <NuxtImg 
              :src="image.src" 
              :alt="image.alt"
              class="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
              loading="lazy"
              sizes="180px md:400px" 
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end p-3 md:p-6">
              <span class="text-white font-medium text-xs md:text-lg transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">{{ image.title }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex overflow-hidden group/track">
        <div class="flex gap-3 md:gap-6 animate-scroll-right group-hover/track:[animation-play-state:paused] py-2">
          <div 
            v-for="(image, index) in duplicatedImagesReverse" 
            :key="`row2-${index}`"
            @click="openModal(image)"
            class="relative flex-shrink-0 w-[180px] h-[120px] sm:w-[300px] sm:h-[200px] md:w-[400px] md:h-[260px] rounded-xl md:rounded-2xl overflow-hidden cursor-pointer group/card transition-transform duration-500 hover:scale-105 hover:z-10 hover:shadow-2xl hover:shadow-[#FF7F50]/20 border border-white/10"
          >
            <NuxtImg 
              :src="image.src" 
              :alt="image.alt"
              class="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
              loading="lazy"
              sizes="180px md:400px" 
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end p-3 md:p-6">
              <span class="text-white font-medium text-xs md:text-lg transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">{{ image.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition 
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="showModal" 
          class="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
          @keydown.esc="closeModal"
          tabindex="0"
        >
          <div class="absolute inset-0 bg-black/95 backdrop-blur-xl" @click="closeModal"></div>
          
          <div class="relative w-full max-w-6xl h-full max-h-[90vh] flex flex-col md:flex-row bg-gray-900 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <button 
              @click="closeModal" 
              class="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
            >
              <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
            </button>

            <div class="relative flex-1 bg-black flex items-center justify-center overflow-hidden group">
              <NuxtImg 
                :src="activeImage?.src" 
                :alt="activeImage?.alt"
                class="max-w-full max-h-full object-contain" 
              />
              <button @click.stop="prevImage" class="absolute left-4 p-3 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 hidden md:block">
                <UIcon name="i-heroicons-chevron-left" class="w-6 h-6" />
              </button>
              <button @click.stop="nextImage" class="absolute right-4 p-3 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 hidden md:block">
                <UIcon name="i-heroicons-chevron-right" class="w-6 h-6" />
              </button>
            </div>

            <div class="w-full md:w-[350px] bg-gray-900 p-6 md:p-8 flex flex-col justify-between border-l border-white/5">
              <div>
                <span class="text-[#FF7F50] text-sm font-bold uppercase tracking-wider mb-2 block">Gallery</span>
                <h3 class="text-xl md:text-2xl font-bold text-white mb-4 leading-tight">{{ activeImage?.title }}</h3>
                <p class="text-sm md:text-base text-gray-400 leading-relaxed">{{ activeImage?.description }}</p>
              </div>

              <div class="flex gap-4 mt-8 md:hidden">
                <button @click.stop="prevImage" class="flex-1 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 font-medium text-sm">Previous</button>
                <button @click.stop="nextImage" class="flex-1 py-3 bg-[#FF7F50] text-white rounded-xl hover:bg-[#ff9f7c] font-medium text-sm">Next</button>
              </div>

              <div class="hidden md:flex items-center gap-4 pt-8 border-t border-white/5">
                 <div class="text-white font-mono">
                    <span class="text-xl">{{ String(currentImageIndex + 1).padStart(2, '0') }}</span>
                    <span class="text-gray-600 mx-2">/</span>
                    <span class="text-gray-500 text-sm">{{ String(galleryImages.length).padStart(2, '0') }}</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const galleryImages = [
  { id: 1, src: '/images/policenkids2.jpg', alt: 'Police visit', title: 'Community Outreach', description: 'Our students visiting the Nigerian Police Force to learn about civic duties and safety.' },
  { id: 2, src: '/images/kidsndad.jpg', alt: 'Chairman visit', title: 'Leadership Mentoring', description: 'A special session with the Chairman Board of Trustees, inspiring our future leaders.' },
  { id: 3, src: '/images/learning4.jpg', alt: 'Classroom', title: 'Focused Learning', description: 'Individualised learning sessions where students engage deeply with their PACEs.' },
  { id: 4, src: '/images/roboticsfun.jpg', alt: 'Robotics', title: 'Innovation Lab', description: 'Exploring the future of technology through hands-on robotics and coding exercises.' },
  { id: 5, src: '/images/naijaday.jpg', alt: 'Cultural Day', title: 'Nigerian Heritage', description: 'Celebrating the rich diversity of our nation through attire, dance, and music.' },
  { id: 6, src: '/images/arts.jpg', alt: 'Museum', title: 'Art & History', description: 'An educational excursion to the Arts and Technology Museum.' },
  { id: 7, src: '/images/assembly.jpg', alt: 'Assembly', title: 'Morning Assembly', description: 'Starting the day with prayer, national anthem, and community announcements.' },
  { id: 8, src: '/images/mooshhoodstadia.jpg', alt: 'Stadium', title: 'Sports Excellence', description: 'Visiting the Moshood Abiola Stadium to inspire physical fitness and sportsmanship.' },
  { id: 9, src: '/images/graduation.jpg', alt: 'Graduation', title: 'Class of 2025', description: 'Celebrating the academic milestones and bright futures of our graduates.' },
  { id: 10, src: '/images/vr.jpg', alt: 'VR', title: 'Virtual Reality', description: 'Immersive learning experiences using state-of-the-art VR technology.' },
]

const duplicatedImages = computed(() => [...galleryImages, ...galleryImages])
const duplicatedImagesReverse = computed(() => [...galleryImages.slice().reverse(), ...galleryImages.slice().reverse()])

const showModal = ref(false)
const activeImage = ref<any>(null)
const currentImageIndex = ref(0)

const openModal = (image: any) => {
  activeImage.value = image
  currentImageIndex.value = galleryImages.findIndex(img => img.id === image.id)
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  showModal.value = false
  document.body.style.overflow = ''
}

const nextImage = () => {
  let nextIndex = currentImageIndex.value + 1
  if (nextIndex >= galleryImages.length) nextIndex = 0
  currentImageIndex.value = nextIndex
  activeImage.value = galleryImages[nextIndex]
}

const prevImage = () => {
  let prevIndex = currentImageIndex.value - 1
  if (prevIndex < 0) prevIndex = galleryImages.length - 1
  currentImageIndex.value = prevIndex
  activeImage.value = galleryImages[prevIndex]
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!showModal.value) return
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<style scoped>
@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes scroll-right {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

.animate-scroll-left {
  animation: scroll-left 40s linear infinite;
}

.animate-scroll-right {
  animation: scroll-right 45s linear infinite;
}

/* Slower on mobile so detail is viewable */
@media (max-width: 768px) {
  .animate-scroll-left { animation-duration: 30s; }
  .animate-scroll-right { animation-duration: 35s; }
}
</style>