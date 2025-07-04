<template>
  <section class="relative w-full min-h-screen bg-gray-50 py-16 md:py-24 overflow-hidden font-inter">
    <!-- Subtle Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <svg width="60" height="60" viewBox="0 0 60 60" class="absolute top-0 left-0 w-full h-full">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1" fill="#09033b"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
      <!-- Hero Section -->
      <div class="text-center mb-20 md:mb-28 space-y-8">
        <!-- Minimal Badge -->
        <div class="inline-flex items-center space-x-3 mb-8">
          <div class="w-2 h-2 bg-[#09033b] rounded-full"></div>
          <span class="text-sm font-medium text-gray-600 tracking-wide uppercase">
            Beyond the Classroom
          </span>
        </div>

        <!-- Main Headline -->
        <div class="space-y-6">
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-light leading-[0.9] text-[#09033b] tracking-tight">
            Discover
            <span class="font-medium block">Our Activities</span>
          </h1>
          
          <!-- Subtle Accent Line -->
          <div class="w-16 h-px bg-[#09033b] mx-auto"></div>
        </div>

        <!-- Filter Navigation -->
        <div class="flex justify-center flex-wrap gap-3 pt-8">
          <button 
            v-for="category in categories" 
            :key="category" 
            @click="setActiveCategory(category)"
            :class="[
              'px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 border',
              activeCategory === category 
                ? 'bg-[#09033b] text-white border-[#09033b]' 
                : 'bg-transparent border-gray-200 text-[#09033b] hover:border-[#09033b] hover:bg-gray-50'
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Activities Grid -->
      <transition-group name="activity-transition" tag="div" class="space-y-16 md:space-y-24">
        <div 
          v-for="(activity, index) in filteredActivities" 
          :key="activity.id" 
          class="group"
        >
          <!-- Mobile Card Layout (Stacked) -->
          <div class="block md:hidden">
            <div class="bg-white overflow-hidden transition-all duration-500 hover:shadow-xl">
              <div class="aspect-[4/3] overflow-hidden bg-gray-100">
                <img 
                  :src="activity.image || '/public/assets/images/IMG-20250130-WA0006.jpg'" 
                  :alt="activity.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div class="p-8 space-y-6">
                <div class="flex items-center justify-between">
                  <div class="inline-flex items-center space-x-2">
                    <div class="w-1 h-1 bg-[#09033b] rounded-full"></div>
                    <span class="text-xs font-medium text-gray-600 tracking-wide uppercase">{{ activity.category }}</span>
                  </div>
                  <button 
                    class="text-xs font-medium text-[#09033b] hover:text-gray-600 transition-colors duration-300"
                    @click="openDetails(activity)"
                  >
                    View Details →
                  </button>
                </div>
                <div class="space-y-4">
                  <h3 class="text-2xl font-light text-[#09033b]">{{ activity.title }}</h3>
                  <p class="text-gray-600 leading-relaxed">{{ activity.description.substring(0, 150) }}...</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Desktop Alternating Layout -->
          <div class="hidden md:block">
            <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center" :class="{ 'lg:grid-flow-col-reverse': index % 2 !== 0 }">
              
              <!-- Content Side -->
              <div class="space-y-8" :class="{ 'lg:order-2': index % 2 !== 0 }">
                <!-- Category Badge -->
                <div class="inline-flex items-center space-x-2">
                  <div class="w-1 h-1 bg-[#09033b] rounded-full"></div>
                  <span class="text-xs font-medium text-gray-600 tracking-wide uppercase">{{ activity.category }}</span>
                </div>

                <!-- Title -->
                <h3 class="text-3xl md:text-4xl font-light text-[#09033b] leading-tight">{{ activity.title }}</h3>
                
                <!-- Description -->
                <p class="text-lg text-gray-600 leading-relaxed max-w-lg">{{ activity.description }}</p>

                <!-- CTA Button -->
                <button 
                  class="group inline-flex items-center px-6 py-3 bg-[#09033b] text-white text-sm font-medium hover:bg-[#0a0440] transition-colors duration-300"
                  @click="openDetails(activity)"
                >
                  Learn More
                  <svg class="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>

              <!-- Image Side -->
              <div class="relative" :class="{ 'lg:order-1': index % 2 !== 0 }">
                <div class="relative group">
                  <div class="aspect-[4/5] max-w-md mx-auto overflow-hidden">
                    <img 
                      :src="activity.image || '/public/assets/images/IMG-20250130-WA0006.jpg'" 
                      :alt="activity.title"
                      class="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                  </div>
                  
                  <!-- Minimal Geometric Accent -->
                  <div class="absolute -top-4 -right-4 w-24 h-24 border border-gray-200 opacity-50"></div>
                  <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-[#09033b] opacity-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- Activity Detail Modal -->
    <div v-if="selectedActivity" class="fixed inset-0 bg-[#09033b]/90 backdrop-blur-sm flex items-center justify-center z-50 p-6" @click="closeDetails">
      <div class="bg-white max-w-5xl w-full max-h-[90vh] overflow-auto grid lg:grid-cols-2 relative" @click.stop>
        <button class="absolute top-6 right-6 w-10 h-10 bg-white border border-gray-200 flex items-center justify-center text-xl shadow-sm z-10 text-[#09033b] hover:bg-gray-50 transition-colors duration-300" @click="closeDetails">×</button>
        
        <!-- Modal Image -->
        <div class="h-64 lg:h-auto overflow-hidden bg-gray-100">
          <img 
            :src="selectedActivity.image || '/public/assets/images/IMG-20250130-WA0006.jpg'" 
            :alt="selectedActivity.title"
            class="w-full h-full object-cover"
          />
        </div>
        
        <!-- Modal Content -->
        <div class="p-8 lg:p-12 space-y-8">
          <!-- Category Badge -->
          <div class="inline-flex items-center space-x-2">
            <div class="w-1 h-1 bg-[#09033b] rounded-full"></div>
            <span class="text-xs font-medium text-gray-600 tracking-wide uppercase">{{ selectedActivity.category }}</span>
          </div>

          <!-- Title -->
          <h2 class="text-3xl md:text-4xl font-light text-[#09033b] leading-tight">{{ selectedActivity.title }}</h2>
          
          <!-- Description -->
          <p class="text-gray-600 leading-relaxed">{{ selectedActivity.description }}</p>
          <!-- Accent Line -->
          <div class="w-12 h-px bg-[#09033b]"></div>

          <!-- CTA Button -->
          <button class="inline-flex items-center px-6 py-3 bg-[#09033b] text-white text-sm font-medium hover:bg-[#0a0440] transition-colors duration-300">
            Join This Activity
            <svg class="ml-3 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// State
const activeCategory = ref('All');
const selectedActivity = ref(null);

// Categories
const categories = ['All', 'Sports', 'Arts', 'Academic', 'Community','Culture','Science'];

// Activities data
const activities = ref([
  {
    id: 1,
    title: 'Arts Club',
    description: 'Brings together students who love visual arts—drawing, painting, crafts—encouraging them to explore their creativity, appreciate aesthetic beauty, and develop artistic confidence.',
    category: 'Arts',
    image: '/images/artsclub.jpg'
  },
  {
    id: 2,
    title: 'Jets Club',
    description: 'A hands‑on club where students apply science and technology in practical projects—building, experimenting, and exploring STEM. It aims to nurture future engineers and scientists.',
    category: 'Science',
    image: '/images/jets2.jpg'
  },
  {
    id: 3,
    title: 'Press Club',
    description: 'Develops journalism skills through writing, editing, and reporting school news. Members build interpersonal and communication strengths while learning about media and storytelling.',
    category: 
    'Academic',
    image: '/images/pressclub.jpg'
  },
  {
    id: 4,
    title: 'Music',
    description: 'Offers musical training via classes and ensemble participation, fostering musical talent, discipline, creativity, and team performance.',
    category: 'Arts',
    image: '/images/music.jpg'
  },
  {
    id: 5,
    title: 'Servants Club',
    description: 'Also known as the Servant Leaders club, it focuses on Christ‑centered leadership and community service, guiding students to lead with humility, kindness, and a heart for serving others.',
    category: 'Community',
    image: '/images/servants3.jpg'
  },
  {
    id: 6,
    title: 'Robotics',
    description: 'Encourages coding, robotics, and engineering—introducing students to technologies like algorithms & web programming from a young age. A space to innovate, solve problems, and build intelligent machines.',
    category: 'Science',
    image: '/images/robots.jpg'
  },
  {
    id: 7,
    title: 'Naija Day',
    description: 'A celebration of Nigerian culture and pride! Expect traditional dress, food, music, dance, and festive displays—giving students a fun and educational look at Nigeria’s heritage.',
    category: 'Culture',
    image: '/images/naijaday.jpg'
  },
  {
    id: 8,
    title: 'Inter-House Sports',
    description: 'A vibrant, competitive sports event where houses compete in track & field and various team sports. It builds school spirit, teamwork, and athleticism in a festive atmosphere',
    category: 'Sports',
    image: '/images/interhouse.jpg'
  },
  {
    id: 9,
    title: 'Excursions',
    description: 'The Covenant Academy enriches classroom learning through educational field trips and excursions within Abuja. These outings are carefully integrated into the academic calendar, allowing students to respond to real-world environments and cultural experiences.',
    category: 'Community',
    image: '/images/policetrip.jpg'
  },
]);

// Computed property for filtered activities
const filteredActivities = computed(() => {
  if (activeCategory.value === 'All') {
    return activities.value;
  }
  return activities.value.filter(activity => activity.category === activeCategory.value);
});

// Methods
const setActiveCategory = (category) => {
  activeCategory.value = category;
};

const openDetails = (activity) => {
  selectedActivity.value = activity;
  document.body.style.overflow = 'hidden';
};

const closeDetails = () => {
  selectedActivity.value = null;
  document.body.style.overflow = 'auto';
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

* {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Activity transitions */
.activity-transition-enter-active,
.activity-transition-leave-active {
  transition: all 0.6s ease;
}

.activity-transition-enter-from,
.activity-transition-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Enhanced focus states */
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

/* Mobile responsive text sizes */
@media (max-width: 768px) {
  .text-4xl { font-size: 2.25rem; }
  .text-6xl { font-size: 3rem; }
  .text-7xl { font-size: 3.5rem; }
}
</style>