<template>
  <div 
    class="w-full sm:w-[80dvw] md:w-[70dvw] lg:w-[50dvw] min-h-[300px] sm:min-h-[250px] md:min-h-[20dvw] 
    flex flex-col gap-3 bg-white dark:bg-white text-center items-center justify-center 
    rounded-lg shadow-lg p-4 sm:p-6"
  >
    <!-- Header -->
    <div class="text-center w-full">
      <h1 class="text-2xl sm:text-3xl font-bold text-orange-500 font-garamond text-center w-full">
        {{ currentContent.title }}
      </h1>
    </div>
    
    <!-- Body -->
    <div class="flex-grow w-full  overflow-auto text-gray-800 text-center flex items-center justify-center py-4">
      <p class="text-center text-sm sm:text-base ">{{ currentContent.description }}</p>
    </div>
    
    <!-- Footer -->
    <div class="w-full text-center">
      <div class="flex flex-wrap justify-center items-center gap-2">
        <button 
          v-for="content in contentListWithId" 
          :key="content.id"
          :class="[
            'px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition-colors duration-200',
            currentPageId === content.id
              ? 'bg-none text-orange-500 underline font-semibold' 
              : 'bg-none text-[#120575] hover:text-orange-500'
          ]"
          @click="currentPageId = content.id"
        >
          {{ content.pageNumber }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Use ID-based approach instead of index
const currentPageId = ref(1)

// Expanded content list with IDs and page numbers
const contentListWithId = [
  { 
    id: 1,
    pageNumber: 1,
    title: 'ACE Curriculum ', 
    description: 'Welcome to our comprehensive guide. This first page introduces the core concepts and sets the stage for the detailed exploration that follows. Each subsequent page will dive deeper into specific aspects of our topic.' 
  },
  { 
    id: 2,
    pageNumber: 2,
    title: 'Highly Subsidized Fees', 
    description: 'Delving into the fundamental principles that underpin our subject. Here we break down the basic building blocks and provide a solid foundation for understanding the more complex ideas to come.' 
  },
  { 
    id: 3,
    pageNumber: 3,
    title: 'Individualized Learning', 
    description: 'Exploring advanced techniques and methodologies. This page takes a deep dive into sophisticated approaches that build upon the foundational knowledge introduced in previous pages.' 
  },
  { 
    id: 4,
    pageNumber: 4,
    title: 'Early Reading Skills', 
    description: 'Examining real-world applications and practical implementations. Learn how the concepts discussed in earlier pages are applied in various contexts and scenarios.' 
  },
  { 
    id: 5,
    pageNumber: 5,
    title: 'Christian Values', 
    description: 'A collection of detailed case studies that illustrate the practical implications of our subject. These examples provide concrete insights into how theory translates into practice.' 
  },
  { 
    id: 6,
    pageNumber: 6,
    title: 'International Education', 
    description: 'Addressing common challenges and exploring innovative solutions. This page provides critical insights into overcoming obstacles and navigating complex scenarios.' 
  },
  { 
    id: 7,
    pageNumber: 7,
    title: 'Goal Setting, Meditation, Mastery', 
    description: 'Looking ahead and exploring potential future developments. Understand the emerging trends and potential innovations that may shape the future of our subject.' 
  },
  { 
    id: 8,
    pageNumber: 8,
    title: 'Home Schooling', 
    description: 'A comprehensive comparative analysis that examines different approaches, methodologies, and perspectives. Gain a nuanced understanding of the various dimensions of our topic.' 
  },
  { 
    id: 9,
    pageNumber: 9,
    title: 'Scholarships', 
    description: 'A technical exploration that goes beyond surface-level understanding. Dive deep into the intricate details and technical nuances of our subject.' 
  },
  { 
    id: 10,
    pageNumber: 10,
    title: 'Service to God', 
    description: 'Exploring the intersections with other disciplines and fields of study. Understand how our subject connects with and influences broader areas of knowledge.' 
  },
  { 
    id: 11,
    pageNumber: 11,
    title: 'No Learning Gaps', 
    description: 'A critical examination that challenges existing paradigms and offers new perspectives. This page encourages critical thinking and provides thought-provoking insights.' 
  },
  { 
    id: 12,
    pageNumber: 12,
    title: 'Well-Trained Teachers ', 
    description: 'Synthesizing the key learnings from all previous pages. A comprehensive conclusion that ties together the various threads and provides a holistic understanding.' 
  }
]

// Computed property to get current content based on page ID
const currentContent = computed(() => {
  return contentListWithId.find(content => content.id === currentPageId.value)
})
</script>