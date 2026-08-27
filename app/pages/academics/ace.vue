<template>
  <div class="relative w-full min-h-screen bg-gray-50 overflow-hidden font-inter">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 right-0 h-[420px] w-[420px] rounded-full bg-blue-100/40 blur-[120px]"></div>
      <div class="absolute bottom-0 left-0 h-[380px] w-[380px] rounded-full bg-orange-100/40 blur-[120px]"></div>
      <svg class="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="#09033b" stroke-width="1" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>
    </div>

    <!-- Hero Section -->
    <section class="relative z-10 py-24 md:py-32">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <!-- Main Title -->
<div class="text-center mb-20 md:mb-24 relative">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-[#09033b] text-xs font-bold uppercase tracking-[0.2em] shadow-sm mx-auto mb-6 md:mb-8">
              <span class="w-2 h-2 rounded-full bg-[#09033b]"></span>
              Educational Excellence
            </div>

            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#09033b] mb-6 md:mb-8">
              What is
              <span class="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF7F50] to-[#ff9f7c]">A.C.E.?</span>
            </h1>

            <div class="mx-auto mb-8 h-1 w-24 rounded-full bg-[#09033b]/10"></div>

            <p class="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
              Accelerated Christian Education — a comprehensive learning system combining biblical principles with academic excellence.
          </p>
        </div>

        <!-- Minimal Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-24 md:mb-32">
          <div v-for="(stat, index) in stats" :key="index" 
               class="group rounded-[2rem] border border-gray-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div class="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#09033b] mb-3 md:mb-4 transition-all duration-500">
              {{ animatedStats[index] }}{{ stat.suffix }}
            </div>
            <div class="text-xs md:text-sm text-gray-600 uppercase tracking-wide font-medium">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation Tabs -->
    <section class="relative z-10 border-t border-gray-200 bg-gray-50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex justify-center py-6 md:py-8">
          <div class="flex flex-wrap justify-center gap-2 rounded-full bg-white p-1 shadow-sm border border-gray-200 w-full max-w-4xl">
            <button v-for="(tab, index) in tabs" :key="index"
                    @click="activeTab = index"
                    :class="[
                      'rounded-full px-5 py-3 text-sm font-medium transition duration-300 flex items-center gap-2',
                      activeTab === index 
                        ? 'bg-[#09033b] text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-[#09033b]'
                    ]">
              <span class="text-xs md:text-sm">{{ tab.icon }}</span>
              {{ tab.title }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Sections -->
    <section class="relative z-10 py-12 md:py-16 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        
        <!-- Overview Tab -->
        <div v-show="activeTab === 0" class="space-y-16 md:space-y-24">
          <!-- Video Section -->
          <div class="max-w-5xl mx-auto">
            <div class="text-center mb-8 md:mb-12">
              <h2 class="text-2xl md:text-3xl font-light text-[#09033b] mb-3 md:mb-4">Discover A.C.E. Education</h2>
              <div class="w-16 h-0.5 bg-[#09033b]/80 mx-auto"></div>
            </div>
            <div class="aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube-nocookie.com/embed/7haJwOoOa2g?si=_gEg-BXl6lctG4f6"
                title="What is A.C.E?"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                class="w-full h-full">
              </iframe>
            </div>
          </div>

          <!-- Core Description -->
          <div class="grid lg:grid-cols-2 gap-12 md:gap-16 items-start">
            <div class="space-y-6 md:space-y-8">
              <div>
                <h3 class="text-xl md:text-2xl font-light text-[#09033b] mb-4 md:mb-6">Founded in Excellence</h3>
                <div class="w-12 h-0.5 bg-[#09033b]/80 mb-4 md:mb-6"></div>
                <p class="text-gray-700 leading-relaxed text-base md:text-lg">
                  A.C.E. (Accelerated Christian Education) is a comprehensive Christian educational curriculum and learning system that combines biblical principles with academic excellence. Founded in 1970, A.C.E. provides a Bible-based, individualized learning program used by thousands of schools worldwide.
                </p>
              </div>
            </div>

            <div class="space-y-6 md:space-y-8">
              <div v-for="feature in coreFeatures" :key="feature.title"
                   class="border-l-2 border-gray-200 pl-4 md:pl-6 group hover:border-[#09033b] transition-colors duration-300">
                <div class="flex items-start space-x-3 md:space-x-4">
                  <div class="w-8 h-8 bg-[#09033b] text-white flex items-center justify-center text-xs font-medium mt-1 rounded-sm group-hover:bg-[#1a0d6b] transition-colors duration-300">
                    {{ feature.icon }}
                  </div>
                  <div>
                    <h4 class="font-medium text-[#09033b] text-base md:text-lg mb-1 md:mb-2">{{ feature.title }}</h4>
                    <p class="text-gray-600 text-sm md:text-base leading-relaxed">{{ feature.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- PACEs Tab -->
        <div v-show="activeTab === 1" class="space-y-12 md:space-y-24">
          <!-- PACE Workflow -->
          <div class="bg-[#09033b] text-white py-12 md:py-16 px-6 md:px-8 -mx-6 lg:-mx-8">
            <div class="max-w-5xl mx-auto">
              <div class="text-center mb-12 md:mb-16">
                <h3 class="text-2xl md:text-3xl font-light mb-3 md:mb-4">Understanding PACEs Workflow</h3>
                <div class="w-16 h-0.5 bg-white/80 mx-auto"></div>
              </div>
              <div class="grid sm:grid-cols-3 gap-8 md:gap-12">
                <div v-for="(step, index) in paceSteps" :key="index"
                     class="text-center p-4 md:p-6 rounded-lg hover:bg-[#1a0d6b] transition-colors duration-300">
                  <div class="w-10 h-10 md:w-12 md:h-12 border border-white/30 flex items-center justify-center mx-auto mb-4 md:mb-6 text-base md:text-lg font-light rounded-full">
                    {{ index + 1 }}
                  </div>
                  <div class="text-xl md:text-2xl mb-3 md:mb-4">{{ step.icon }}</div>
                  <h4 class="font-medium text-base md:text-lg mb-2 md:mb-3">{{ step.title }}</h4>
                  <p class="text-white/80 text-sm md:text-base leading-relaxed">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- PACE Features -->
          <div class="space-y-12 md:space-y-16">
            <div class="text-center">
              <h3 class="text-2xl md:text-3xl font-light text-[#09033b] mb-3 md:mb-4">PACE Features & Benefits</h3>
              <div class="w-16 h-0.5 bg-[#09033b]/80 mx-auto"></div>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div v-for="benefit in paceBenefits" :key="benefit.title"
                   class="rounded-[2rem] border border-gray-100 bg-white p-6 group hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div class="flex items-center mb-3 md:mb-4 gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#09033b] text-sm font-semibold text-white transition duration-300 group-hover:bg-[#1a0d6b]">
                    {{ benefit.icon }}
                  </div>
                  <h4 class="font-semibold text-[#09033b] text-base md:text-lg">{{ benefit.title }}</h4>
                </div>
                <p class="text-gray-600 text-sm md:text-base leading-relaxed">{{ benefit.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Implementation Tab -->
        <div v-show="activeTab === 2" class="space-y-12 md:space-y-24">
          <!-- Implementation Cards -->
          <div class="grid sm:grid-cols-2 gap-8 md:gap-12">
            <div v-for="implementation in implementations" :key="implementation.title"
                 class="space-y-4 md:space-y-6 p-4 md:p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300">
              <div class="flex items-center space-x-3 md:space-x-4">
                <div class="w-10 h-10 md:w-12 md:h-12 bg-[#09033b] text-white flex items-center justify-center text-base md:text-lg rounded-sm">
                  {{ implementation.icon }}
                </div>
                <h3 class="text-xl md:text-2xl font-light text-[#09033b]">{{ implementation.title }}</h3>
              </div>
              <div class="w-16 h-0.5 bg-gray-300"></div>
              <p class="text-gray-700 leading-relaxed text-base md:text-lg">{{ implementation.description }}</p>
            </div>
          </div>

          <!-- Nigerian Integration -->
          <div class="bg-blue-50 dark:bg-blue-50 py-12 md:py-16 px-6 md:px-8 -mx-6 lg:-mx-8">
            <div class="max-w-5xl mx-auto">
              <div class="text-center mb-8 md:mb-12">
                <h3 class="text-2xl md:text-3xl font-light text-[#09033b] mb-3 md:mb-4">Nigerian Curriculum Integration</h3>
                <div class="w-16 h-0.5 bg-[#09033b]/80 mx-auto mb-4 md:mb-6"></div>
                <p class="text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
                  The Covenant Academy uniquely blends A.C.E. with the Nigerian Educational Curriculum, offering students the best of both worlds.
                </p>
              </div>
              <div class="grid sm:grid-cols-3 gap-4 md:gap-6">
                <div v-for="benefit in nigerianBenefits" :key="benefit"
                     class="flex items-center space-x-2 md:space-x-3 p-3 md:p-4 bg-white border border-gray-200 rounded-lg hover:border-[#09033b] transition-colors duration-300">
                  <div class="w-2 h-2 bg-[#09033b] rounded-full flex-shrink-0"></div>
                  <span class="text-sm md:text-base font-medium text-gray-700">{{ benefit }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Comparison Tab -->
        <div v-show="activeTab === 3" class="space-y-12 md:space-y-16">
          <div class="text-center">
            <h3 class="text-2xl md:text-3xl font-light text-[#09033b] mb-3 md:mb-4">A.C.E. vs Traditional Education</h3>
            <div class="w-16 h-0.5 bg-[#09033b]/80 mx-auto"></div>
          </div>
          
          <div class="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
            <table class="w-full divide-y divide-gray-200">
              <thead>
                <tr class="bg-[#09033b] text-white">
                  <th class="p-4 md:p-6 text-left font-medium text-sm md:text-base">Feature</th>
                  <th class="p-4 md:p-6 text-center font-medium text-sm md:text-base">A.C.E. System</th>
                  <th class="p-4 md:p-6 text-center font-medium text-sm md:text-base">Traditional System</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="(comparison, index) in comparisons" :key="index"
                    :class="index % 2 === 0 ? 'bg-blue-50, dark:bg-blue-50' : 'bg-white, dark:bg-white'">
                  <td class="p-4 md:p-6 font-medium text-[#09033b] text-sm md:text-base">{{ comparison.feature }}</td>
                  <td class="p-4 md:p-6 text-center">
                    <span class="inline-block px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm font-medium bg-green-50 text-green-800 border border-green-100 rounded-md">
                      {{ comparison.ace }}
                    </span>
                  </td>
                  <td class="p-4 md:p-6 text-center">
                    <span class="inline-block px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm font-medium bg-amber-50 text-amber-800 border border-amber-100 rounded-md">
                      {{ comparison.traditional }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- FAQ Tab -->
        <div v-show="activeTab === 4" class="space-y-12">
  <div>
    <h3 class="text-3xl font-light text-[#09033b] tracking-tight mb-6">
      Frequently <span class="font-medium">Asked Questions</span>
    </h3>
    
    <div class="w-16 h-px bg-[#09033b] mb-8"></div>
  </div>
  
  <div class="max-w-4xl mx-auto">
    <div class="space-y-4">
      <div 
        v-for="(faq, index) in faqs" 
        :key="index" 
        class="border-b border-gray-100 pb-4"
      >
        <button 
          @click="toggleFaq(index)"
          class="w-full text-left flex items-center justify-between py-4 focus:outline-none"
        >
          <span class="font-medium text-[#09033b] text-lg">{{ faq.question }}</span>
          <span class="text-[#09033b] text-2xl">{{ openFaqs.includes(index) ? '−' : '+' }}</span>
        </button>
        <div 
          v-show="openFaqs.includes(index)" 
          class="pb-4 text-gray-600"
        >
          {{ faq.answer }}
        </div>
      </div>
    </div>
  </div>
</div>

      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 md:py-32 bg-gradient-to-r from-[#09033b] via-[#1a0f4a] to-orange-500 text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-5">
        <svg width="60" height="60" viewBox="0 0 60 60" class="absolute top-0 left-0 w-full h-full">
          <defs>
            <pattern id="grid-white" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="white"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-white)"/>
        </svg>
      </div>
      
      <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-light mb-6 md:mb-8 leading-tight">
            Ready to Transform Your Child's Education?
          </h2>
          <div class="w-24 h-0.5 bg-white/80 mx-auto mb-8 md:mb-12"></div>
          <p class="text-lg md:text-xl mb-8 md:mb-12 opacity-90 font-light leading-relaxed">
            Join thousands of families worldwide who have chosen A.C.E. for academic excellence and character development.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <NuxtLink 
              to="/admissions/visit"
              class="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-white text-[#09033b] font-medium  hover:bg-gray-100 transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#09033b]">
              Schedule a School Visit
              <svg class="ml-2 md:ml-3 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>
            
            <NuxtLink 
              to="/admissions"
              class="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 border border-white/30 text-white font-medium  hover:bg-white hover:text-[#09033b] transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#09033b]">
              View Admission Requirements
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'

// Reactive data
const activeTab = ref(0)
const openFaqs = ref([])
const animatedStats = reactive([0, 0, 0, 0])

// Tab configuration
const tabs = [
  { title: 'Overview', icon: '○' },
  { title: 'PACEs System', icon: '◇' },
  { title: 'Implementation', icon: '△' },
  { title: 'Comparison', icon: '□' },
  { title: 'FAQ', icon: '?' }
]

// Statistics data
const stats = [
  { value: 50, suffix: '+', label: 'Years of Excellence' },
  { value: 6000, suffix: '+', label: 'Schools Worldwide' },
  { value: 98, suffix: '%', label: 'Student Success Rate' },
  { value: 144, suffix: '', label: 'PACEs Available' }
]

// Core features
const coreFeatures = [
  {
    title: 'Individualized Learning',
    description: 'Each student works at their own pace through self-instructional workbooks called PACEs, allowing them to master concepts before moving forward.',
    icon: '01'
  },
  {
    title: 'Character Development',
    description: 'The curriculum integrates biblical character traits throughout all subjects, helping students develop integrity and godly values.',
    icon: '02'
  },
  {
    title: 'Academic Excellence',
    description: 'Comprehensive coverage of core subjects meeting and exceeding international educational standards.',
    icon: '03'
  },
  {
    title: 'Biblical Worldview',
    description: 'All subjects are taught from a Christian perspective, integrating faith with all areas of knowledge.',
    icon: '04'
  }
]

// PACE workflow steps
const paceSteps = [
  {
    title: 'Goal Setting',
    description: 'Students set daily academic goals and learn time management skills',
    icon: '◯'
  },
  {
    title: 'Self-Learning',
    description: 'Work through self-instructional PACEs at individual pace',
    icon: '◇'
  },
  {
    title: 'Mastery Testing',
    description: 'Achieve 80% or higher before advancing to next level',
    icon: '△'
  }
]

// PACE benefits
const paceBenefits = [
  {
    title: 'Self-Contained Units',
    description: 'Each PACE covers specific concepts within a subject area',
    icon: '01'
  },
  {
    title: 'Sequential Learning',
    description: 'PACEs build upon previously mastered concepts',
    icon: '02'
  },
  {
    title: 'Structured Format',
    description: 'Consistent format with scripture, vocabulary, and exercises',
    icon: '03'
  },
  {
    title: 'Goal-Oriented',
    description: 'Students learn time management and planning skills',
    icon: '04'
  },
  {
    title: 'Mastery-Based',
    description: 'Must score 80% or higher to advance',
    icon: '05'
  },
  {
    title: 'Character Focus',
    description: 'Each PACE includes character trait development',
    icon: '06'
  }
]

// Implementation features
const implementations = [
  {
    title: 'Goal Setting & Planning',
    description: 'Students learn to set and achieve daily academic goals, developing crucial planning and time management skills for lifelong success.',
    icon: '◯'
  },
  {
    title: 'Self-Discipline Development',
    description: 'The program encourages students to take ownership of their learning journey, fostering independence and personal responsibility.',
    icon: '◇'
  },
  {
    title: 'Mastery-Based Learning',
    description: 'Students must demonstrate 80% or higher mastery before advancing to new material, ensuring solid foundational knowledge.',
    icon: '△'
  },
  {
    title: 'Individualized Attention',
    description: 'Our trained supervisors and monitors provide one-on-one assistance when needed, ensuring no student falls behind.',
    icon: '□'
  }
]

// Nigerian integration benefits
const nigerianBenefits = [
  'Full preparation for Nigerian examinations',
  'Cultural relevance and contextual learning',
  'Best of international and national standards'
]

// Comparison data
const comparisons = [
  {
    feature: 'Learning Pace',
    ace: 'Individual Pace',
    traditional: 'Group Pace'
  },
  {
    feature: 'Character Development',
    ace: 'Integrated Daily',
    traditional: 'Separate Subject'
  },
  {
    feature: 'Assessment Method',
    ace: 'Mastery-Based (80%)',
    traditional: 'Grade-Based'
  },
  {
    feature: 'Student Responsibility',
    ace: 'High Self-Direction',
    traditional: 'Teacher-Directed'
  },
  {
    feature: 'Biblical Integration',
    ace: 'All Subjects',
    traditional: 'Religious Studies Only'
  },
  {
    feature: 'Progress Tracking',
    ace: 'Individual Goals',
    traditional: 'Class Average'
  }
]

// FAQ data
const faqs = [
  {
    question: 'How does A.C.E. prepare students for Nigerian examinations?',
    answer: 'The Covenant Academy integrates the Nigerian curriculum with A.C.E., ensuring students are fully prepared for Common Entrance and other Nigerian examinations while benefiting from the individualized A.C.E. approach.'
  },
  {
    question: 'What age groups can use the A.C.E. curriculum?',
    answer: 'A.C.E. serves students from kindergarten through secondary school (ages 4-18). The individualized approach means students can start at any level appropriate to their abilities.'
  },
  {
    question: 'How much supervision do students need with A.C.E.?',
    answer: 'While A.C.E. promotes independent learning, trained supervisors and monitors provide guidance, answer questions, and ensure students stay on track with their goals.'
  },
  {
    question: 'What subjects are covered in the A.C.E. curriculum?',
    answer: 'A.C.E. covers all core subjects including Mathematics, English, Science, Social Studies, Bible Studies, and electives. Each subject integrates biblical principles and character development.'
  },
  {
    question: 'How do A.C.E. graduates perform in universities?',
    answer: 'A.C.E. graduates consistently demonstrate strong self-discipline, time management, and independent learning skills that serve them well in higher education and careers.'
  },
  {
    question: 'Can students transfer between A.C.E. and traditional schools?',
    answer: 'Yes, A.C.E. students can transfer to traditional schools. Our academic standards meet or exceed conventional requirements, and we provide proper documentation for transfers.'
  },
  {
    question: 'What makes A.C.E. different from other Christian curricula?',
    answer: 'A.C.E. uniquely combines individualized pacing, mastery-based learning, character development, and biblical integration in a systematic, proven approach used worldwide for over 50 years.'
  }
]

// Methods
const toggleFaq = (index) => {
  if (openFaqs.value.includes(index)) {
    openFaqs.value = openFaqs.value.filter(i => i !== index)
  } else {
    openFaqs.value.push(index)
  }
}

const animateStats = () => {
  stats.forEach((stat, index) => {
    let current = 0
    const increment = stat.value / 50
    const timer = setInterval(() => {
      current += increment
      if (current >= stat.value) {
        animatedStats[index] = stat.value
        clearInterval(timer)
      } else {
        animatedStats[index] = Math.floor(current)
      }
    }, 30)
  })
}
// Lifecycle
onMounted(() => {
  animateStats()
})

// SEO Meta
useHead({
  title: 'What is A.C.E? - Accelerated Christian Education at The Covenant Academy',
  meta: [
    {
      name: 'description',
      content: 'Discover A.C.E., a Christian learning system combining biblical principles, academic excellence, PACEs, and character development.'
    },
    {
      name: 'keywords',
      content: 'A.C.E., Accelerated Christian Education, PACEs, Christian curriculum, individualized learning, biblical education, character development, Nigerian curriculum integration'
    },
    {
      property: 'og:title',
      content: 'What is A.C.E? - Accelerated Christian Education'
    },
    {
      property: 'og:description',
      content: 'Comprehensive guide to A.C.E. education system - individualized learning, biblical integration, and academic excellence for students worldwide.'
    },
    {
      property: 'og:type',
      content: 'article'
    }
  ]
})
</script>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #09033b, #4338ca);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #4338ca, #09033b);
}

/* Aspect ratio utilities for older browsers */
.aspect-video {
  aspect-ratio: 16 / 9;
}

@supports not (aspect-ratio: 16 / 9) {
  .aspect-video {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
  }
  
  .aspect-video > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

/* Enhanced hover effects */
.transform-hover:hover {
  transform: translateY(-2px) scale(1.02);
}

/* Glassmorphism effect enhancement */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }
  
  .print-break {
    page-break-before: always;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .bg-white\/80 {
    background-color: white !important;
  }
  
  .text-gray-600 {
    color: #000 !important;
  }
  
  .text-gray-700 {
    color: #000 !important;
  }
  
  .border-gray-200 {
    border-color: #000 !important;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Focus styles for accessibility */
button:focus,
a:focus,
[tabindex="0"]:focus {
  outline: 2px solid #09033b;
  outline-offset: 2px;
}

/* Loading states */
.loading {
  opacity: 0.7;
  pointer-events: none;
  position: relative;
}

.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid #09033b;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .bg-white {
    background-color: #ffffff !important;
  }
  
  .bg-gray-50 {
    background-color: #2d2d2d !important;
  }
  
  .text-gray-600, .text-gray-700 {
    color: #09033b !important;
  }
  
  .border-gray-200 {
    border-color: #444 !important;
  }
  

  
}

/* Animation delays for staggered effects */
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }

/* Enhanced table styles for comparison */
table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
}

table th:first-child {
  border-top-left-radius: 8px;
}

table th:last-child {
  border-top-right-radius: 8px;
}

/* Testimonial card styles */
.testimonial-slide {
  min-height: 300px;
}

.testimonial-indicator {
  transition: width 0.3s ease, background-color 0.3s ease;
}

/* Enhance the quote appearance */
.testimonial-content {
  position: relative;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .testimonial-content {
    padding: 1.5rem;
  }
  
  .testimonial-quote {
    font-size: 1rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  
  .pace-steps {
    grid-template-columns: 1fr;
  }
}

/* Button hover effects */
.btn-hover {
  transition: all 0.3s ease;
}

.btn-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Card hover effects */
.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Section transitions */
.section-transition {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

/* Tab content transitions */
.tab-content {
  animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>