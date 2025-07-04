<template>
  <div class="relative w-full h-[50vh] md:h-[70vh] lg:h-[calc(100vh-80px)] overflow-hidden font-inter">
    <!-- Tailwind Carousel -->
    <div class="relative w-full h-full">
      <!-- Carousel Items -->
      <div v-for="(item, index) in carouselItems" :key="index" 
           class="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
           :class="{ 'opacity-100': currentSlide === index, 'opacity-0': currentSlide !== index }">
        <NuxtImg
          :src="item.image"
          :alt="item.title"
          class="w-full h-full object-cover"
          loading="lazy"
          format="webp"
          quality="80"
          :placeholder="[10, 10, 75]"
          sizes="sm:100vw md:100vw lg:100vw"
        />
      </div>
      
      <!-- Dark Overlay - Keeping this for better text readability -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30 pointer-events-none"></div>
      
      <!-- Navigation Arrows - Hidden on mobile, visible on hover for larger screens -->
      <button @click="prevSlide" class="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 rounded-full p-2 z-10 transition-all duration-300 items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button @click="nextSlide" class="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 rounded-full p-2 z-10 transition-all duration-300 items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <!-- Indicators - Made more touch-friendly -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        <button 
          v-for="(item, index) in carouselItems" 
          :key="index"
          @click="currentSlide = index"
          class="w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 focus:outline-none"
          :class="currentSlide === index ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'">
        </button>
      </div>
    </div>

    <!-- Overlay Text - Made responsive -->
    <div class="text-white absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4 sm:px-6 md:px-8">
      <div class="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl animate-fade-in">
        <transition name="fade" mode="out-in">
          <div :key="currentSlide">
            <h1 v-if="carouselItems[currentSlide].title" class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">{{ carouselItems[currentSlide].title }}</h1>
            <p v-if="carouselItems[currentSlide].description" class="text-base sm:text-lg md:text-xl max-w-prose mx-auto opacity-90">{{ carouselItems[currentSlide].description }}</p>
          </div>
        </transition>
        <!-- Conditional Buttons Section -->
        <div v-if="carouselItems[currentSlide].primaryButtonText || carouselItems[currentSlide].secondaryButtonText" 
             class="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center mt-4 md:mt-8">
          <NuxtLink v-if="carouselItems[currentSlide].primaryButtonText && carouselItems[currentSlide].primaryButtonLink" 
                    :to="carouselItems[currentSlide].primaryButtonLink" 
                    class="w-full sm:w-auto text-center px-6 py-2 md:px-8 md:py-3 bg-orange-500 text-white hover:bg-orange-600 font-medium transition-colors duration-300">
            {{ carouselItems[currentSlide].primaryButtonText }}
          </NuxtLink>
          <NuxtLink v-if="carouselItems[currentSlide].secondaryButtonText && carouselItems[currentSlide].secondaryButtonLink" 
                    :to="carouselItems[currentSlide].secondaryButtonLink" 
                    class="w-full sm:w-auto text-center px-6 py-2 md:px-8 md:py-3 bg-white text-[#09033b] hover:bg-gray-100 font-medium transition-colors duration-300">
            {{ carouselItems[currentSlide].secondaryButtonText }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

useHead({
  title: 'The Covenant Academy - Image Carousel',
  meta: [
    { name: 'description', content: 'Explore our image carousel showcasing the heart of The Covenant Academy.' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }
  ],
  preloadLinks: [
    { rel: 'preload', href: '/images/welcome.jpg', as: 'image' },
    { rel: 'preload', href: '/assets/images/tcad-web/DSC_1809.jpg', as: 'image' },
    { rel: 'preload', href: '/assets/images/IMG-20250130-WA0006.jpg', as: 'image' },
    { rel: 'preload', href: '/assets/images/tcad-web/DSC_1327.jpg', as: 'image' }
  ]
});

// Define the carousel items with images and corresponding text
const carouselItems = [
  {
    image: "/assets/images/tcad-web/DSC_1809.jpg",
    title: "Welcome to The Covenant Academy",
    description: "Where faith meets academic excellence. Join our community of learners dedicated to spiritual and intellectual growth.",
    primaryButtonText: "Enroll a Child",
    primaryButtonLink: "/admissions",
    secondaryButtonText: "Visit Us",
    secondaryButtonLink: "/admissions/visit"
  },
  {
    image: "/assets/images/IMG-20250130-WA0006.jpg",
    title: "Nurturing Future Leaders",
    description: "Our comprehensive programs develop character, creativity, and critical thinking skills in a supportive Christian environment.",
    primaryButtonText: "Explore Curriculum",
    primaryButtonLink: "/academics/curriculum",
    secondaryButtonText: "Meet Our Team",
    secondaryButtonLink: "/team"
  },
  {
    image: "/assets/images/tcad-web/DSC_1327.jpg",
    title: "Join Our Community",
    description: "Experience the difference of education centered on Christian values with a commitment to academic excellence.",
    primaryButtonText: "Apply Student",
    primaryButtonLink: "/admissions",
    secondaryButtonText: "Apply Staff",
    secondaryButtonLink: "/jobs"
  },
  {
    image: "/images/welcome.jpg",
    // No title, description, or buttons for this slide
  },
  {
    image: "/images/yellowheart.jpg",
    // No title, description, or buttons for this slide
  },
];

const currentSlide = ref(0);
let intervalId = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselItems.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + carouselItems.length) % carouselItems.length;
};

// Add touch swipe support
let touchStartX = 0;
let touchEndX = 0;

const handleTouchStart = (e) => {
  touchStartX = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
};

const handleSwipe = () => {
  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;
  
  if (touchStartX - touchEndX > minSwipeDistance) {
    // Swiped left
    nextSlide();
  } else if (touchEndX - touchStartX > minSwipeDistance) {
    // Swiped right
    prevSlide();
  }
};

// Start autoplay and setup touch events
onMounted(() => {
  intervalId = setInterval(() => {
    nextSlide();
  }, 5000);
  
  const carousel = document.querySelector('.relative.w-full.h-full');
  if (carousel) {
    carousel.addEventListener('touchstart', handleTouchStart, false);
    carousel.addEventListener('touchend', handleTouchEnd, false);
  }
});

// Clean up interval and event listeners on component destroy
onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId);
  
  const carousel = document.querySelector('.relative.w-full.h-full');
  if (carousel) {
    carousel.removeEventListener('touchstart', handleTouchStart);
    carousel.removeEventListener('touchend', handleTouchEnd);
  }
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>