<!-- pages/newsletters/[id].vue (Individual Newsletter Page) -->
<template>
    <div class="newsletter-detail-page min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div class="p-8">
          <NuxtLink 
            to="/events/newsletter" 
            class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
            Back to Newsletters
          </NuxtLink>
  
          <article>
            <header class="mb-8">
              <h1 class="text-3xl font-bold text-gray-900 mb-4">
                {{ newsletter?.title }}
              </h1>
              <div class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
                <span>Published on {{ formatDate(newsletter?.date) }}</span>
              </div>
            </header>
  
            <div class="prose prose-lg text-gray-700 leading-relaxed">
              <p class="mb-6 italic text-gray-600">
                {{ newsletter?.preview }}
              </p>
  
              <div class="whitespace-pre-line">
                {{ newsletter?.fullContent }}
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const route = useRoute()
  const newsletterId = parseInt(route.params.id)
  
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
  
  // Find the specific newsletter
  const newsletter = computed(() => {
    return mockNewsletters.find(n => n.id === newsletterId)
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