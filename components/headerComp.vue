<template>
  <div class="font-inter overflow-x-hidden">
    <header
      :class="[
        'border-b transition-all duration-300 fixed top-0 left-0 right-0 z-50',
        isScrolled ? 'bg-[#09033b] shadow-md' : 'bg-white dark:bg-white'
      ]"
      role="banner"
    >
      <div class="w-full h-10 bg-gradient-to-r from-[#09033b] via-[#120575] to-[#09033b] flex gap-4 justify-end items-center px-4 lg:px-12">
        <a 
          href="mailto:tcadinfo@gmail.com" 
          class="text-white text-xs flex items-center hover:text-orange-200 transition-colors"
          aria-label="Email The Covenant Academy"
        >
          <UIcon name="i-heroicons-envelope-solid" class="h-4 w-4 mr-1" aria-hidden="true" />
          tcadinfo@gmail.com
        </a>
        <span class="text-white/50" aria-hidden="true">|</span>
        <a 
          href="tel:+2348036233157" 
          class="text-white text-xs flex items-center hover:text-orange-200 transition-colors"
          aria-label="Call The Covenant Academy"
        >
          <UIcon name="i-heroicons-phone-solid" class="h-4 w-4 mr-1" aria-hidden="true" />
          +2348036233157
        </a>
      </div>
      
      <div class="container mx-auto px-2">
        <nav class="py-4" aria-label="Main navigation">
          <div class="flex items-center justify-between">
            <NuxtLink 
              to="/" 
              class="flex items-center lg:ml-12 group" 
              @click="closeMobileMenu"
              aria-label="The Covenant Academy home page"
            >
              <div class="relative">
                <img 
                  src="/assets/images/tcad-nbg.png" 
                  alt="The Covenant Academy logo" 
                  class="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
                  width="48"
                  height="48"
                  loading="eager" 
                >
                <div class="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" aria-hidden="true"></div>
              </div>
              <span
                :class="[
                  'ml-2 text-2xl font-bold font-garamond transition-colors duration-300',
                  isScrolled ? 'text-white' : 'text-[#09033b]'
                ]"
              >The Covenant Academy</span>
            </NuxtLink>
            
            <div class="hidden lg:flex items-center space-x-6 lg:mr-12">
              
              <div v-for="menu in menus" :key="menu.title" class="relative group">
                <span
                  :class="[
                    'px-3 py-2 font-medium cursor-pointer flex items-center transition-all duration-300 relative hover:text-orange-500',
                    isScrolled ? 'text-white' : 'text-[#120575]',
                    'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 group-hover:after:w-full after:bg-orange-500 after:transition-all after:duration-300'
                  ]"
                  aria-haspopup="true"
                >
                  {{ menu.title }}
                  <UIcon name="i-heroicons-chevron-down" class="ml-1 w-4 h-4 transition-transform duration-300 group-hover:rotate-180" aria-hidden="true" />
                </span>
                
                <div 
                  class="absolute left-0 mt-1 w-56 bg-white shadow-lg transition-all duration-300 transform origin-top scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100 py-1 z-10"
                  role="menu"
                >
                  <NuxtLink
                    v-for="item in menu.items"
                    :key="item.label"
                    :to="item.to"
                    :class="item.disabled ? 'block px-4 py-2 text-gray-400 cursor-not-allowed' : 'block px-4 py-2 text-[#120575] hover:bg-gray-50 hover:text-orange-500 transition-colors duration-300'"
                    role="menuitem"
                  >
                    {{ item.label }}
                  </NuxtLink>
                </div>
              </div>
              
              <NuxtLink
                to="/admissions"
                class="bg-gradient-to-r from-orange-500 to-orange-600 font-medium px-6 py-2 text-white transition-all duration-300 hover:shadow-md hover:shadow-orange-500/30 hover:-translate-y-0.5 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                aria-label="Apply to The Covenant Academy"
              >
                Apply
              </NuxtLink>
            </div>
            
            <button 
              @click="toggleMobileMenu" 
              class="lg:hidden focus:outline-none p-2 rounded-md"
              :class="isScrolled ? 'text-white hover:bg-[#120575]/50' : 'text-[#120575] hover:bg-gray-200/50'"
              :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
              :aria-expanded="isMobileMenuOpen ? 'true' : 'false'"
            >
              <UIcon v-if="!isMobileMenuOpen" name="i-heroicons-bars-3" class="h-6 w-6" aria-hidden="true" />
              <UIcon v-else name="i-heroicons-x-mark" class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <transition
            enter-active-class="transition-all duration-300 ease-in-out"
            leave-active-class="transition-all duration-300 ease-in-out"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-screen opacity-100"
            leave-from-class="max-h-screen opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div 
              v-show="isMobileMenuOpen"
              class="lg:hidden overflow-hidden"
              role="navigation"
              aria-label="Mobile menu"
            >
              <div :class="[
                'flex flex-col space-y-1 py-2 rounded-lg shadow-lg',
                isScrolled ? 'bg-[#0a0347]' : 'bg-white'
              ]">
                <NuxtLink 
                  to="/" 
                  :class="[
                    'px-4 py-3 font-medium transition-colors duration-300',
                    isScrolled ? 'text-white hover:bg-[#120575]' : 'text-[#060223] hover:bg-gray-100 hover:text-orange-500'
                  ]"
                  @click="closeMobileMenu"
                  aria-current="page"
                >Home</NuxtLink>
                
                <div v-for="menu in menus" :key="menu.title">
                  <button 
                    :class="[
                      'px-4 py-3 font-medium flex justify-between items-center cursor-pointer transition-colors duration-300 w-full text-left',
                      isScrolled ? 'text-white hover:bg-[#120575]' : 'text-[#060223] hover:bg-gray-100 hover:text-orange-500'
                    ]"
                    @click="() => toggleMobileSubmenu(menu.title)"
                    :aria-expanded="openMobileSubmenu === menu.title ? 'true' : 'false'"
                  >
                    <span>{{ menu.title }}</span>
                    <UIcon 
                      name="i-heroicons-chevron-down" 
                      class="w-5 h-5 transition-transform duration-300" 
                      :class="openMobileSubmenu === menu.title ? 'rotate-180' : ''"
                      aria-hidden="true"
                    />
                  </button>
                  
                  <transition
                    enter-active-class="transition-all duration-300 ease-in-out"
                    leave-active-class="transition-all duration-300 ease-in-out"
                    enter-from-class="max-h-0 opacity-0"
                    enter-to-class="max-h-96 opacity-100"
                    leave-from-class="max-h-96 opacity-100"
                    leave-to-class="max-h-0 opacity-0"
                  >
                    <div 
                      v-show="openMobileSubmenu === menu.title"
                      class="pl-6 overflow-hidden"
                      :class="isScrolled ? 'bg-[#120575]/50' : 'bg-gray-50'"
                      role="menu"
                    >
                      <NuxtLink 
                        v-for="item in menu.items" 
                        :key="item.label" 
                        :to="item.to" 
                        :class="[
                          'block px-4 py-2 transition-colors duration-300',
                          isScrolled ? 'text-white/90 hover:text-white hover:bg-[#09033b]/60' : 'text-[#060223] hover:bg-gray-100 hover:text-orange-500'
                        ]"
                        @click="closeMobileMenu"
                        role="menuitem"
                      >
                        {{ item.label }}
                      </NuxtLink>
                    </div>
                  </transition>
                </div>
                
                <NuxtLink 
                  to="/admissions" 
                  class="mx-4 mt-4 block text-center px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md hover:shadow-md transition-all duration-300 font-medium"
                  @click="closeMobileMenu"
                  aria-label="Apply to The Covenant Academy"
                >Apply</NuxtLink>
              </div>
            </div>
          </transition>
        </nav>
      </div>
    </header>
    
    <div class="h-[90px] md:h-[100px]"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);
const openMobileSubmenu = ref(null);
let ticking = false;

const menus = [
  {
    title: 'About',
    items: [
      { label: 'Partner With Us', to: '/partners' },
      { label: 'Our History', to: '/about/history' },
      { label: 'Vision & Mission', to: '/about/vision' }
    ]
  },
  {
    title: 'Academics',
    items: [
      { label: 'What is ACE?', to: '/academics/ace' },
      { label: 'Our Curriculum', to: '/academics/curriculum' },
      { label: 'Extra-Curricular', to: '/academics/extra-curricular' },
      { label: 'Pathway to Wisdom', to: '/academics/pathway-to-wisdom' },
    ]
  },
  {
    title: 'Admission',
    items: [
      { label: 'How to enroll', to: '/admissions' },
      { label: 'Tuition & Fees', to: '/admissions/tuition' },
      { label: 'Visit', to: '/admissions/visit' },
    ]
  },
  {
    title: 'Our Team',
    items: [
      { label: 'Our Team', to: '/team' },
      { label: 'Join our team', to: '/jobs'}
    ]
  },
  {
    title: 'Events',
    items: [
      { label: 'Calendar', to: '/events/calendar' },
      { label: 'Deepwater News', to: '/events/deepwater-news' },
      { label: 'Resources', to: '/resources' }
    ]
  }
];

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (!isMobileMenuOpen.value) {
    openMobileSubmenu.value = null;
  }
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
  openMobileSubmenu.value = null;
}

function toggleMobileSubmenu(title) {
  openMobileSubmenu.value = openMobileSubmenu.value === title ? null : title;
}

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      isScrolled.value = window.scrollY > 50;
      ticking = false;
    });
    ticking = true;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); 
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>