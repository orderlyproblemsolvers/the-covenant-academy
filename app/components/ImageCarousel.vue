<template>
  <div 
    ref="carouselRef"
    class="relative w-full h-[85vh] lg:h-screen overflow-hidden font-inter bg-[#09033b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7F50] focus-visible:ring-inset"
    role="region"
    aria-roledescription="carousel"
    aria-label="Featured highlights"
    tabindex="0"
    @focusin="pause"
    @focusout="resume"
    @keydown="onKeydown"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <!-- Visually hidden live region announcing slide changes -->
    <div class="sr-only" aria-live="polite" aria-atomic="true">
      Slide {{ currentSlide + 1 }} of {{ carouselItems.length }}{{ carouselItems[currentSlide].title ? `: ${carouselItems[currentSlide].title}` : '' }}
    </div>

    <div class="absolute inset-0 w-full h-full">
      <div 
        v-for="(item, index) in carouselItems" 
        :key="`bg-${index}`" 
        class="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
        :class="currentSlide === index ? 'opacity-100 z-10 will-change-opacity' : 'opacity-0 z-0'"
        :aria-hidden="currentSlide !== index"
      >
        <div 
          class="relative w-full h-full transform transition-transform ease-out motion-reduce:transition-none motion-reduce:transform-none"
          :class="currentSlide === index ? 'scale-110 will-change-transform motion-reduce:scale-100' : 'scale-100'"
          style="transition-duration: 8000ms"
        >
          <NuxtImg
            :src="item.image"
            :alt="item.title || 'Carousel Slide'"
            class="w-full h-full object-cover"
            :preload="index === 0"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>
      </div>
    </div>

    <div class="relative z-20 h-full w-full pointer-events-none">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        
        <transition name="slide-fade" mode="out-in">
          
          <div 
            v-if="carouselItems[currentSlide].title" 
            :key="`content-${currentSlide}`"
            class="w-full max-w-2xl pointer-events-auto"
          >
            <div class="p-8 md:p-10 rounded-3xl bg-white/20 md:backdrop-blur-md lg:backdrop-blur-md border border-white/10 shadow-2xl">

              <h1 class="text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-6 tracking-tight animate-fade-in-up delay-100 drop-shadow-lg motion-reduce:animate-none motion-reduce:opacity-100">
                {{ carouselItems[currentSlide].title }}
              </h1>

              <p v-if="carouselItems[currentSlide].description" class="text-lg md:text-xl text-gray-200 leading-relaxed mb-8 animate-fade-in-up delay-200 font-light border-l-4 border-[#FF7F50] pl-6 motion-reduce:animate-none motion-reduce:opacity-100">
                {{ carouselItems[currentSlide].description }}
              </p>

              <div class="flex flex-wrap gap-4 animate-fade-in-up delay-300 motion-reduce:animate-none motion-reduce:opacity-100">
                <NuxtLink 
                  v-if="carouselItems[currentSlide].primaryButtonText"
                  :to="carouselItems[currentSlide].primaryButtonLink"
                  class="group relative px-8 py-3.5 bg-[#FF7F50] text-white font-semibold rounded-xl overflow-hidden shadow-lg shadow-[#FF7F50]/20 transition-all hover:bg-[#ff6b3d] hover:-translate-y-1"
                >
                  <span class="relative flex items-center gap-2">
                    {{ carouselItems[currentSlide].primaryButtonText }}
                    <UIcon name="i-heroicons-arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </NuxtLink>

                <NuxtLink 
                  v-if="carouselItems[currentSlide].secondaryButtonText"
                  :to="carouselItems[currentSlide].secondaryButtonLink"
                  class="px-8 py-3.5 bg-white/10 border border-white/20 text-white font-medium rounded-xl hover:bg-white hover:text-[#09033b] transition-all hover:-translate-y-1"
                >
                  {{ carouselItems[currentSlide].secondaryButtonText }}
                </NuxtLink>
              </div>
              
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="absolute bottom-8 left-0 w-full z-30 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div class="max-w-7xl mx-auto flex items-end justify-between pointer-events-auto">
        
        <div class="flex gap-3">
          <button 
            v-for="(item, index) in carouselItems" 
            :key="index"
            @click="goToSlide(index)"
            class="group relative h-1.5 rounded-full transition-all duration-500 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7F50] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            :class="currentSlide === index ? 'w-12 bg-white/30' : 'w-3 bg-white/30 hover:bg-white/50'"
            :aria-label="`Go to slide ${index + 1} of ${carouselItems.length}${item.title ? ': ' + item.title : ''}`"
            :aria-current="currentSlide === index ? 'true' : undefined"
          >
            <div 
              v-if="currentSlide === index"
              class="absolute top-0 left-0 h-full bg-[#FF7F50] progress-bar-fill motion-reduce:hidden"
              :class="{ 'progress-bar-paused': isPaused }"
              @animationend="handleProgressEnd"
            ></div>
            <div
              v-if="currentSlide === index"
              class="hidden motion-reduce:block absolute inset-0 bg-[#FF7F50]"
            ></div>
          </button>
        </div>

        <div class="flex gap-3">
          <button 
            @click="prevSlide"
            aria-label="Previous slide"
            class="w-12 h-12 rounded-full border border-white/10 bg-black/30 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#FF7F50] hover:border-[#FF7F50] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7F50] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <UIcon name="i-heroicons-chevron-left" class="w-6 h-6" aria-hidden="true" />
          </button>
          <button 
            @click="nextSlide"
            aria-label="Next slide"
            class="w-12 h-12 rounded-full border border-white/10 bg-black/30 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#FF7F50] hover:border-[#FF7F50] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7F50] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <UIcon name="i-heroicons-chevron-right" class="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const SLIDE_DURATION_MS = 8000;

const carouselItems = [
  {
    image: "/images/tcad-web/anthempose.jpg",
    title: "Welcome to The Covenant Academy",
    description: "Where faith meets academic excellence. Join our community of learners dedicated to spiritual and intellectual growth.",
    primaryButtonText: "Enroll a Child",
    primaryButtonLink: "/admissions",
    secondaryButtonText: "Visit Campus",
    secondaryButtonLink: "/admissions/visit"
  },
  {
    image: "/images/IMG-20250130-WA0006.jpg",
    title: "Nurturing Future Leaders",
    description: "Our comprehensive programs develop character, creativity, and critical thinking skills in a supportive Christian environment.",
    primaryButtonText: "Explore Curriculum",
    primaryButtonLink: "/academics/curriculum",
    secondaryButtonText: "Meet Our Team",
    secondaryButtonLink: "/team"
  },
  {
    image: "/images/tcad-web/collage.jpg",
    title: "Join Our Community",
    description: "Experience the difference of education centered on Christian values with a commitment to academic excellence.",
    primaryButtonText: "Student Application",
    primaryButtonLink: "/admissions",
    secondaryButtonText: "Job Openings",
    secondaryButtonLink: "/jobs"
  },
  {
    image: "/images/welcome.jpg",
    title: "Partner With Us",
    description: "Discover ways to support The Covenant Academy through prayer, volunteering, and financial partnership.",
    primaryButtonText: "Learn More",
    primaryButtonLink: "/partners"
  },
  { image: "/images/yellowheart.jpg" }
];

const currentSlide = ref(0);
const isPaused = ref(false);
const carouselRef = ref(null);

let autoplayTimer = null;
let touchStartX = 0;
let touchEndX = 0;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselItems.length;
  restartAutoplay();
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + carouselItems.length) % carouselItems.length;
  restartAutoplay();
};

const goToSlide = (index) => {
  currentSlide.value = index;
  restartAutoplay();
};

// JS-driven autoplay (decoupled from CSS animationend so it still works
// under prefers-reduced-motion, where the progress bar animation never fires)
const startAutoplay = () => {
  clearTimeout(autoplayTimer);
  if (isPaused.value) return;
  autoplayTimer = setTimeout(() => {
    currentSlide.value = (currentSlide.value + 1) % carouselItems.length;
    startAutoplay();
  }, SLIDE_DURATION_MS);
};

const restartAutoplay = () => {
  clearTimeout(autoplayTimer);
  startAutoplay();
};

// Kept as a no-op-safe handler in case the CSS animation does fire
// (motion allowed); avoids double-advancing since startAutoplay already owns timing
const handleProgressEnd = () => {};

const pause = () => {
  isPaused.value = true;
  clearTimeout(autoplayTimer);
};

const resume = () => {
  isPaused.value = false;
  startAutoplay();
};

const onKeydown = (e) => {
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    prevSlide();
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    nextSlide();
  }
};

const onTouchStart = (e) => {
  touchStartX = e.changedTouches[0].screenX;
  pause();
};

const onTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const delta = touchEndX - touchStartX;
  const SWIPE_THRESHOLD = 50;

  if (delta > SWIPE_THRESHOLD) {
    prevSlide();
  } else if (delta < -SWIPE_THRESHOLD) {
    nextSlide();
  }

  resume();
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  clearTimeout(autoplayTimer);
});
</script>

<style scoped>
/* Progress Bar Animations */
@keyframes progress-fill {
  0% { width: 0%; }
  100% { width: 100%; }
}

.progress-bar-fill {
  animation: progress-fill 8s linear forwards; 
}

.progress-bar-paused {
  animation-play-state: paused;
}

/* Text Animations */
.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Transitions for Text Card */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Respect prefers-reduced-motion for anything Tailwind's motion-reduce
   utilities don't cover (scoped custom animations/transitions above) */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up {
    animation: none;
    opacity: 1;
    transform: none;
  }
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: none;
  }
}
</style>