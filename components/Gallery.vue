<template>
  <section class="p-2 sm:p-2 lg:p-4 bg-gray-50  font-inter mx-auto  overflow-hidden">
    <!-- SEO-friendly structured heading -->
    <header class="text-center mb-8 sm:mb-10 lg:mb-12">
      <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#09033b] tracking-tight mb-4">
        <span class="block">Discover Our World</span>
        <span class="block text-base sm:text-lg md:text-xl font-medium text-slate-600 mt-2">A Glimpse into School Life</span>
      </h1>
      <p class="sr-only">Interactive photo gallery showcasing school activities, events, and student life experiences</p>
    </header>

    <!-- Infinite Scroll Container with better mobile spacing -->
    <div class="space-y-4 sm:space-y-6 bg-gray-50" role="region" aria-label="Photo gallery with infinite scrolling">
      <!-- Top Row - Scrolls Left to Right -->
      <div class="overflow-hidden" aria-label="First row of photos scrolling right">
        <div 
          ref="scrollRowRight"
          class="flex animate-scroll-right"
          role="group"
          aria-label="Scrolling photo row"
        >
          <div
            v-for="(image, index) in duplicatedImagesRight"
            :key="`top-${image.id}-${index}`"
            class="flex-shrink-0 w-64 sm:w-72 lg:w-80 mx-2 sm:mx-3 relative overflow-hidden shadow-lg sm:shadow-xl transition transform hover:scale-105 hover:shadow-2xl duration-500 ease-in-out cursor-pointer group"
            @click="openModal(index % galleryImages.length)"
            @keydown.enter="openModal(index % galleryImages.length)"
            @keydown.space="openModal(index % galleryImages.length)"
            tabindex="0"
            role="button"
            :aria-label="`View ${image.title} in full screen`"
          >
            <NuxtImg
              :src="image.src"
              :alt="image.alt"
              class="w-full h-48 sm:h-56 lg:h-64 object-cover"
              loading="lazy"
              :width="320"
              :height="256"
              format="webp"
              quality="80"
              sizes="sm:288px lg:320px"
            />
            <!-- Hover/Focus Overlay -->
            <div class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center p-3 sm:p-4 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
              <p class="text-white text-lg sm:text-xl font-semibold text-center leading-tight">{{ image.title }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Middle Row - Scrolls Right to Left -->
      <div class="overflow-hidden" aria-label="Second row of photos scrolling left">
        <div 
          ref="scrollRowLeft"
          class="flex animate-scroll-left"
          role="group"
          aria-label="Scrolling photo row"
        >
          <div
            v-for="(image, index) in duplicatedImagesLeft.slice().reverse()"
            :key="`middle-${image.id}-${index}`"
            class="flex-shrink-0 w-64 sm:w-72 lg:w-80 mx-2 sm:mx-3 relative overflow-hidden  shadow-lg sm:shadow-xl transition transform hover:scale-105 hover:shadow-2xl duration-500 ease-in-out cursor-pointer group"
            @click="openModal(index % galleryImages.length)"
            @keydown.enter="openModal(index % galleryImages.length)"
            @keydown.space="openModal(index % galleryImages.length)"
            tabindex="0"
            role="button"
            :aria-label="`View ${image.title} in full screen`"
          >
            <NuxtImg
              :src="image.src"
              :alt="image.alt"
              class="w-full h-48 sm:h-56 lg:h-64 object-cover"
              loading="lazy"
              :width="320"
              :height="256"
              format="webp"
              quality="80"
              sizes="sm:288px lg:320px"
            />
            <!-- Hover/Focus Overlay -->
            <div class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center p-3 sm:p-4 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
              <p class="text-white text-lg sm:text-xl font-semibold text-center leading-tight">{{ image.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Overlay with improved mobile experience -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showModal"
          class="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50 p-2 sm:p-4"
          @click.self="closeModal"
          @keydown.esc="closeModal"
          tabindex="0"
          role="dialog"
          aria-modal="true"
          :aria-label="`Image: ${galleryImages[currentImageIndex]?.title}`"
        >
          <Transition name="slide-up">
            <div v-if="showModal" class="relative bg-white rounded-lg sm:rounded-xl shadow-2xl max-w-5xl w-full flex flex-col lg:flex-row overflow-hidden transform transition-all duration-500 ease-out max-h-[95vh] sm:max-h-[90vh]">
              <!-- Close Button -->
              <button
                @click="closeModal"
                class="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                aria-label="Close modal"
              >
                <Icon name="heroicons:x-mark" class="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <!-- Image Container -->
              <div class="flex-shrink-0 w-full lg:w-3/5 relative">
                <NuxtImg
                  :src="galleryImages[currentImageIndex]?.src"
                  :alt="galleryImages[currentImageIndex]?.alt"
                  class="w-full h-auto max-h-[40vh] sm:max-h-[50vh] lg:max-h-[80vh] object-contain rounded-t-lg sm:rounded-t-xl lg:rounded-tr-none lg:rounded-bl-xl"
                  :width="800"
                  :height="600"
                  format="webp"
                  quality="90"
                  sizes="sm:640px lg:800px"
                />
                <!-- Navigation Buttons for large screens -->
                <button
                  v-if="galleryImages.length > 1"
                  @click.stop="prevImage"
                  class="hidden lg:block absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white bg-gray-800 rounded-full p-2 sm:p-3 hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  aria-label="Previous image"
                >
                  <Icon name="heroicons:chevron-left" class="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                <button
                  v-if="galleryImages.length > 1"
                  @click.stop="nextImage"
                  class="hidden lg:block absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white bg-gray-800 rounded-full p-2 sm:p-3 hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  aria-label="Next image"
                >
                  <Icon name="heroicons:chevron-right" class="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>

              <!-- Image Info and Mobile Navigation -->
              <div class="p-4 sm:p-6 lg:w-2/5 flex flex-col justify-between overflow-y-auto">
                <div>
                  <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">{{ galleryImages[currentImageIndex]?.title }}</h2>
                  <p class="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">{{ galleryImages[currentImageIndex]?.description }}</p>
                  <div class="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
                    {{ currentImageIndex + 1 }} of {{ galleryImages.length }}
                  </div>
                </div>

                <!-- Mobile Navigation Buttons -->
                <div v-if="galleryImages.length > 1" class="flex justify-between gap-3 mt-4 sm:mt-6 lg:hidden">
                  <button
                    @click.stop="prevImage"
                    class="flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                  >
                    <Icon name="heroicons:chevron-left" class="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                    Prev
                  </button>
                  <button
                    @click.stop="nextImage"
                    class="flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                  >
                    Next
                    <Icon name="heroicons:chevron-right" class="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
interface GalleryImage {
  id: number
  src: string
  alt: string
  title: string
  description: string
}
const galleryImages = ref<GalleryImage[]>([
  { 
    id: 1, 
    src: '/images/policenkids2.jpg', 
    alt: 'Students visit the Nigerian police force', 
    title: 'Excursion to the Nigerian police', 
    description: 'Students visit the Nigerian police force.' 
  },
  { 
    id: 2, 
    src: '/images/kidsndad.jpg', 
    alt: 'Chairman and students', 
    title: 'Chairman Board of Trustees with our students', 
    description: 'Chairman Board of Trustees with our students.' 
  },
  { 
    id: 3, 
    src: '/images/learning4.jpg', 
    alt: 'Individualised learning classroom', 
    title: 'Engaging Classroom', 
    description: 'Individualised learning session where students work with PACEs' 
  },
  { 
    id: 4, 
    src: '/images/roboticsfun.jpg', 
    alt: 'Children enjoying robotics activities during recess time', 
    title: 'STEM Learning Fun', 
    description: 'Students exploring robotics and technology, fostering innovation and problem-solving skills.' 
  },
  { 
    id: 5, 
    src: '/images/naijaday.jpg', 
    alt: 'Students celebrating Nigerian culture', 
    title: 'Cultural Celebration', 
    description: 'Students celebrating Nigerian heritage and culture, promoting diversity and national pride.' 
  },
  { 
    id: 6, 
    src: '/images/arts.jpg', 
    alt: 'Students visit arts and tech museum', 
    title: 'Arts & Creativity', 
    description: 'Students visit arts and technology museum' 
  },
  { 
    id: 7, 
    src: '/images/assembly.jpg', 
    alt: 'Students gathered for morning school assembly', 
    title: 'Morning Assembly', 
    description: 'Daily gathering for announcements, inspirational talks, and fostering community spirit.' 
  },
  { 
    id: 8, 
    src: '/images/mooshhoodstadia.jpg', 
    alt: 'Students visit the Moshood Abiola stadium in Abuja', 
    title: 'Excursion to National Stadium', 
    description: 'Spectacular musical and theatrical performances by our talented students and faculty.' 
  },
  { 
    id: 9, 
    src: '/images/graduation.jpg', 
    alt: 'Happy graduates celebrating graduation day ceremony', 
    title: 'Graduation Day Joy', 
    description: 'A memorable day celebrating the achievements and bright futures of our graduating class.' 
  },
  { 
    id: 10, 
    src: '/images/vr.jpg', 
    alt: 'Students using virtual reality technology at arts and technology museum', 
    title: 'VR Learning Experience', 
    description: 'Students using virtual reality technology at arts and technology museum.' 
  },
])

const showModal = ref(false)
const currentImageIndex = ref(0)
const scrollRowRight = ref<HTMLElement>()
const scrollRowLeft = ref<HTMLElement>()

// Create duplicated arrays for seamless infinite scroll
const duplicatedImagesRight = computed(() => {
  const original = galleryImages.value
  return [...original, ...original]
})

const duplicatedImagesLeft = computed(() => {
  const original = galleryImages.value
  return [...original, ...original]
})

// Modal functions
const openModal = (index: number) => {
  currentImageIndex.value = index
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  showModal.value = false
  document.body.style.overflow = ''
}

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % galleryImages.value.length
}

const prevImage = () => {
  currentImageIndex.value = currentImageIndex.value === 0 
    ? galleryImages.value.length - 1 
    : currentImageIndex.value - 1
}

// Keyboard navigation
const handleKeyDown = (event: KeyboardEvent) => {
  if (!showModal.value) return
  
  switch (event.key) {
    case 'ArrowRight':
      event.preventDefault()
      nextImage()
      break
    case 'ArrowLeft':
      event.preventDefault()
      prevImage()
      break
    case 'Escape':
      event.preventDefault()
      closeModal()
      break
  }
}

// Touch gestures for mobile
const touchStartX = ref(0)
const touchEndX = ref(0)

const handleTouchStart = (event: TouchEvent) => {
  touchStartX.value = event.changedTouches[0].screenX
}

const handleTouchEnd = (event: TouchEvent) => {
  touchEndX.value = event.changedTouches[0].screenX
  handleSwipeGesture()
}

const handleSwipeGesture = () => {
  if (!showModal.value) return
  
  const swipeThreshold = 50
  const swipeDistance = touchStartX.value - touchEndX.value
  
  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0) {
      nextImage() // Swipe left - next image
    } else {
      prevImage() // Swipe right - previous image
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('touchstart', handleTouchStart, { passive: true })
  window.addEventListener('touchend', handleTouchEnd, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchend', handleTouchEnd)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Transition styles */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.4s ease-out;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

/* Responsive infinite scroll animations */
@keyframes scroll-right {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes scroll-left {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
}

.animate-scroll-right {
  animation: scroll-right 60s linear infinite;
  width: fit-content;
}

.animate-scroll-left {
  animation: scroll-left 55s linear infinite;
  width: fit-content;
}

/* Slower animations on mobile for better performance */
@media (max-width: 640px) {
  .animate-scroll-right {
    animation-duration: 80s;
  }
  
  .animate-scroll-left {
    animation-duration: 75s;
  }
}

/* Pause animations on hover/focus for better UX */
.animate-scroll-right:hover,
.animate-scroll-left:hover,
.animate-scroll-right:focus-within,
.animate-scroll-left:focus-within {
  animation-play-state: paused;
}

/* Performance optimizations */
.animate-scroll-right,
.animate-scroll-left {
  will-change: transform;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .animate-scroll-right,
  .animate-scroll-left {
    animation-duration: 200s;
  }
  
  .transition,
  .duration-300,
  .duration-500 {
    transition-duration: 0.01ms !important;
  }
}

/* Smooth scrolling */
* {
  scroll-behavior: smooth;
}

/* Optimize image rendering */
img {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

/* Focus styles for accessibility */
[tabindex]:focus {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>