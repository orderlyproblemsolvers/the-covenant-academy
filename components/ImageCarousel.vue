<template>
  <div 
    class="relative w-full h-[85vh] lg:h-screen overflow-hidden font-inter bg-[#09033b]"
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
  >
    <div class="absolute inset-0 w-full h-full">
      <div 
        v-for="(item, index) in carouselItems" 
        :key="`bg-${index}`" 
        class="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
        :class="currentSlide === index ? 'opacity-100 z-10 will-change-opacity' : 'opacity-0 z-0'"
      >
        <div 
          class="relative w-full h-full transform transition-transform duration-[8000ms] ease-out"
          :class="currentSlide === index ? 'scale-110 will-change-transform' : 'scale-100'"
        >
          <NuxtImg
            :src="item.image"
            :alt="item.title || 'Carousel Slide'"
            class="w-full h-full object-cover"
            :loading="index === 0 ? 'eager' : 'lazy'"
            format="webp"
            placeholder
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
              
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7F50]/20 border border-[#FF7F50]/30 text-[#FF7F50] text-xs font-bold tracking-wide uppercase mb-6 animate-fade-in-up">
                <span class="w-2 h-2 rounded-full bg-[#FF7F50] animate-pulse"></span>
                The Covenant Academy
              </div>

              <h1 class="text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-6 tracking-tight animate-fade-in-up delay-100 drop-shadow-lg">
                {{ carouselItems[currentSlide].title }}
              </h1>

              <p v-if="carouselItems[currentSlide].description" class="text-lg md:text-xl text-gray-200 leading-relaxed mb-8 animate-fade-in-up delay-200 font-light border-l-4 border-[#FF7F50] pl-6">
                {{ carouselItems[currentSlide].description }}
              </p>

              <div class="flex flex-wrap gap-4 animate-fade-in-up delay-300">
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
            class="group relative h-1.5 rounded-full transition-all duration-500 overflow-hidden"
            :class="currentSlide === index ? 'w-12 bg-white/20' : 'w-3 bg-white/20 hover:bg-white/40'"
            aria-label="Go to slide"
          >
            <div 
              v-if="currentSlide === index"
              class="absolute top-0 left-0 h-full bg-[#FF7F50] progress-bar-fill"
              :class="{ 'progress-bar-paused': isPaused }"
              @animationend="nextSlide"
            ></div>
          </button>
        </div>

        <div class="flex gap-3">
          <button 
            @click="prevSlide"
            class="w-12 h-12 rounded-full border border-white/10 bg-black/30 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#FF7F50] hover:border-[#FF7F50] transition-colors"
          >
            <UIcon name="i-heroicons-chevron-left" class="w-6 h-6" />
          </button>
          <button 
            @click="nextSlide"
            class="w-12 h-12 rounded-full border border-white/10 bg-black/30 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#FF7F50] hover:border-[#FF7F50] transition-colors"
          >
            <UIcon name="i-heroicons-chevron-right" class="w-6 h-6" />
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

const carouselItems = [
  {
    image: "/assets/images/tcad-web/DSC_1809.jpg",
    title: "Welcome to The Covenant Academy",
    description: "Where faith meets academic excellence. Join our community of learners dedicated to spiritual and intellectual growth.",
    primaryButtonText: "Enroll a Child",
    primaryButtonLink: "/admissions",
    secondaryButtonText: "Visit Campus",
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
    primaryButtonText: "Student Application",
    primaryButtonLink: "/admissions",
    secondaryButtonText: "Job Openings",
    secondaryButtonLink: "/jobs"
  },
  { image: "/images/welcome.jpg" },
  { image: "/images/yellowheart.jpg" }
];

const currentSlide = ref(0);
const isPaused = ref(false);

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselItems.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + carouselItems.length) % carouselItems.length;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};
</script>

<style scoped>
/* Progress Bar Animations */
@keyframes progress-fill {
  0% { width: 0%; }
  100% { width: 100%; }
}

.progress-bar-fill {
  /* 8s duration matches your original SLIDE_DURATION */
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
</style>