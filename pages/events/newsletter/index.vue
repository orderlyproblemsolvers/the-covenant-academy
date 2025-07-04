<!-- pages/newsletters/index.vue (Newsletter List Page) -->
<template>
    <div class="newsletter-list-page min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl mx-auto">
        <header class="mb-12 text-center">
          <h1 class="text-4xl font-extrabold text-gray-900 mb-4">
            The Covenant Academy Newsletters
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed about our latest updates, achievements, and academic highlights.
          </p>
        </header>
  
        <!-- Search and Filter Section -->
        <div class="mb-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div class="relative w-full sm:w-96">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search newsletters..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
            <svg class="absolute right-3 top-3 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
  
          <select 
            v-model="selectedYear" 
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Years</option>
            <option 
              v-for="year in availableYears" 
              :key="year" 
              :value="year"
            >
              {{ year }}
            </option>
          </select>
        </div>
  
        <!-- Newsletters Grid -->
        <transition-group 
          name="newsletter-list"
          tag="div"
          class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div 
            v-for="newsletter in filteredNewsletters" 
            :key="newsletter.id"
            class="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
          >
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-800 mb-2">
                {{ newsletter.title }}
              </h3>
              <p class="text-gray-600 mb-4 line-clamp-3">
                {{ newsletter.preview }}
              </p>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">
                  {{ formatDate(newsletter.date) }}
                </span>
                <NuxtLink 
                  :to="`/events/newsletter/${newsletter.id}`"
                  class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Read More
                </NuxtLink>
              </div>
            </div>
          </div>
        </transition-group>
  
        <!-- No Results State -->
        <div 
          v-if="filteredNewsletters.length === 0" 
          class="text-center py-16 bg-white rounded-lg shadow-md"
        >
          <svg class="mx-auto h-20 w-20 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
          </svg>
          <p class="mt-4 text-xl text-gray-600">
            No newsletters found matching your search or filters.
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // Mock Newsletter Data - Replace with API call
  const mockNewsletters = [
    {
      id: 1,
      title: 'Spring 2024 Academic Achievements',
      preview: 'Celebrating outstanding student accomplishments and academic excellence...',
      fullContent: `Dear Covenant Academy Community,
  
  We are thrilled to share our Spring 2024 newsletter highlighting the remarkable achievements of our students and faculty. This semester has been filled with incredible growth, innovative learning, and outstanding performances.
  
  Key Highlights:
  - Academic Excellence Awards
  - Research Symposium Success
  - Community Engagement Initiatives
  - Upcoming Summer Programs
  
  We continue to inspire and nurture the next generation of leaders.
  
  Warm regards,
  The Covenant Academy Administration`,
      date: new Date('2024-03-15'),
      year: 2024
    },
    {
      id: 2,
      title: 'Winter Academic Innovations',
      preview: 'Exploring cutting-edge educational technologies and interdisciplinary learning...',
      fullContent: `Winter Newsletter 2024
  
  Dear Students and Parents,
  
  This winter, The Covenant Academy has been at the forefront of educational innovation. Our commitment to providing transformative learning experiences continues to set us apart.
  
  Highlights Include:
  - STEM Innovation Lab Launch
  - Interdisciplinary Curriculum Developments
  - Global Learning Partnerships
  - Student Leadership Programs
  
  Together, we are shaping the future of education.
  
  Best wishes,
  Academic Leadership Team`,
      date: new Date('2024-01-10'),
      year: 2024
    }
  ]
  
  // Reactive State
  const newsletters = ref(mockNewsletters)
  const searchQuery = ref('')
  const selectedYear = ref('')
  
  // Computed Properties
  const availableYears = computed(() => {
    return [...new Set(mockNewsletters.map(n => n.year))]
  })
  
  const filteredNewsletters = computed(() => {
    return newsletters.value.filter(newsletter => {
      const matchesSearch = newsletter.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        newsletter.preview.toLowerCase().includes(searchQuery.value.toLowerCase())
      
      const matchesYear = !selectedYear.value || newsletter.year === parseInt(selectedYear.value)
      
      return matchesSearch && matchesYear
    })
  })
  
  // Methods
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }
  </script>
  
  <style scoped>
  .newsletter-list-enter-active,
  .newsletter-list-leave-active {
    transition: all 0.5s ease;
  }
  .newsletter-list-enter-from,
  .newsletter-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  </style>