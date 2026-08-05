<template>
  <div class="relative w-full min-h-screen bg-gray-50 overflow-x-hidden font-inter max-w-[100dvw]">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 right-0 h-[420px] w-[420px] rounded-full bg-blue-100/40 blur-[120px]"></div>
      <div class="absolute bottom-0 left-0 h-[380px] w-[380px] rounded-full bg-orange-100/40 blur-[120px]"></div>
      <svg width="100%" height="100%" viewBox="0 0 100 100" class="absolute inset-0 opacity-10" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="#09033b" stroke-width="1" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>
    </div>

    <div class="relative z-10 w-full">
      <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden">
        <!-- Hero Section -->
        <div class="relative py-16 sm:py-24 md:py-28 w-full">
          <div class="text-center w-full">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-[#09033b] text-xs font-bold uppercase tracking-[0.2em] shadow-sm mx-auto mb-6">
              Academic Excellence
            </div>

            <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#09033b] mb-6">
              Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7F50] to-[#ff9f7c]">Curriculum</span>
            </h1>

            <div class="mx-auto mb-8 h-1 w-24 rounded-full bg-[#09033b]/10"></div>

            <p class="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed font-light max-w-3xl mx-auto mb-8">
              Where world-class curriculum meets Christian values in an individualized learning environment.
            </p>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="py-10 sm:py-12 md:py-16 px-2 sm:px-0">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <div class="rounded-[2rem] border border-gray-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div class="text-3xl sm:text-4xl font-semibold text-[#09033b] mb-2">3</div>
              <div class="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">Curriculum Standards</div>
            </div>
            <div class="rounded-[2rem] border border-gray-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div class="text-3xl sm:text-4xl font-semibold text-[#09033b] mb-2">15+</div>
              <div class="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">Core Subjects</div>
            </div>
            <div class="rounded-[2rem] border border-gray-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div class="text-3xl sm:text-4xl font-semibold text-[#09033b] mb-2">80%</div>
              <div class="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">Mastery Required</div>
            </div>
            <div class="rounded-[2rem] border border-gray-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div class="text-3xl sm:text-4xl font-semibold text-[#09033b] mb-2">1:1</div>
              <div class="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">Learning Approach</div>
            </div>
          </div>
        </div>

        <!-- Sticky Navigation -->
        <div class="sticky top-0 bg-gray-50 shadow-sm z-40 py-3 sm:py-4 border-b border-gray-100 px-2 sm:px-0">
          <div class="flex flex-wrap justify-center gap-2 bg-white rounded-full p-1 shadow-sm border border-gray-200 w-full max-w-4xl mx-auto">
            <button 
              @click="activeSection = 'overview'"
              :class="[
                'rounded-full px-5 py-3 text-sm font-medium transition duration-300',
                activeSection === 'overview' ? 'bg-[#09033b] text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100 hover:text-[#09033b]'
              ]"
            >
              Program Overview
            </button>
            <button 
              @click="activeSection = 'early'"
              :class="[
                'rounded-full px-5 py-3 text-sm font-medium transition duration-300',
                activeSection === 'early' ? 'bg-[#09033b] text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100 hover:text-[#09033b]'
              ]"
            >
              Early Years
            </button>
            <button 
              @click="activeSection = 'primary'"
              :class="[
                'rounded-full px-5 py-3 text-sm font-medium transition duration-300',
                activeSection === 'primary' ? 'bg-[#09033b] text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100 hover:text-[#09033b]'
              ]"
            >
              Primary School
            </button>
            <button 
              @click="activeSection = 'approach'"
              :class="[
                'rounded-full px-5 py-3 text-sm font-medium transition duration-300',
                activeSection === 'approach' ? 'bg-[#09033b] text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100 hover:text-[#09033b]'
              ]"
            >
              Our Approach
            </button>
          </div>
        </div>

        <!-- Content Sections -->
        <div class="py-10 sm:py-12 md:py-16 px-2 sm:px-0">
          <!-- Overview Section -->
          <div v-show="activeSection === 'overview'" class="animate-fade-in space-y-8 sm:space-y-12">
            <div class="space-y-4 sm:space-y-6">
              <h2 class="text-2xl sm:text-3xl font-light text-[#09033b] tracking-tight">
                Integrated <span class="font-medium">Curriculum</span> Framework
              </h2>
              
              <div class="w-16 h-px bg-[#09033b] mb-4 sm:mb-6"></div>
              
              <p class="text-gray-600 leading-relaxed text-base sm:text-lg max-w-4xl">
                Our curriculum harmoniously blends the Nigerian National Curriculum with Accelerated Christian Education (A.C.E.), 
                creating a robust educational experience that meets national standards while fostering individualized learning 
                and character development.
              </p>
            </div>

            <!-- Curriculum Comparison -->
            <div class="space-y-8">
              <h3 class="text-xl sm:text-2xl font-light text-[#09033b] tracking-tight">
                Curriculum <span class="font-medium">Components</span>
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <div class="rounded-[2rem] border border-gray-100 bg-white p-6 sm:p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl group">
                  <div class="flex items-center mb-4 sm:mb-6 gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#09033b] text-white text-lg sm:text-xl">
                      🇺🇸
                    </div>
                    <h4 class="text-lg sm:text-xl font-semibold text-[#09033b]">A.C.E. Curriculum</h4>
                  </div>
                  <ul class="space-y-2 sm:space-y-3 md:space-y-4 text-gray-600 text-sm sm:text-base">
                    <li class="flex items-start"><span class="text-[#09033b] mr-2 mt-1">•</span> Self-paced individualized learning</li>
                    <li class="flex items-start"><span class="text-[#09033b] mr-2 mt-1">•</span> Biblical worldview integration</li>
                    <li class="flex items-start"><span class="text-[#09033b] mr-2 mt-1">•</span> Mastery-based progression</li>
                    <li class="flex items-start"><span class="text-[#09033b] mr-2 mt-1">•</span> Character development focus</li>
                  </ul>
                  <div class="absolute -top-2 -right-2 w-8 sm:w-10 h-8 sm:h-10 border border-gray-200 opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
                
                <div class="rounded-[2rem] border border-gray-100 bg-white p-6 sm:p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl group">
                  <div class="flex items-center mb-4 sm:mb-6 gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#09033b] text-white text-lg sm:text-xl">
                      🇳🇬
                    </div>
                    <h4 class="text-lg sm:text-xl font-semibold text-[#09033b]">Nigerian Curriculum</h4>
                  </div>
                  <ul class="space-y-2 sm:space-y-3 md:space-y-4 text-gray-600 text-sm sm:text-base">
                    <li class="flex items-start"><span class="text-[#09033b] mr-2 mt-1">•</span> National standards alignment</li>
                    <li class="flex items-start"><span class="text-[#09033b] mr-2 mt-1">•</span> Cultural relevance and identity</li>
                    <li class="flex items-start"><span class="text-[#09033b] mr-2 mt-1">•</span> Civic education and values</li>
                    <li class="flex items-start"><span class="text-[#09033b] mr-2 mt-1">•</span> Secondary school preparation</li>
                  </ul>
                  <div class="absolute -bottom-2 -left-2 w-6 sm:w-8 h-6 sm:h-8 bg-[#09033b] opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Early Childhood Section -->
          <div v-show="activeSection === 'early'" class="animate-fade-in space-y-8 sm:space-y-12">
            <div class="space-y-4 sm:space-y-6">
              <h2 class="text-2xl sm:text-3xl font-light text-[#09033b] tracking-tight">
                Early <span class="font-medium">Childhood</span> Program
              </h2>
              
              <div class="w-16 h-px bg-[#09033b] mb-4 sm:mb-6"></div>
              
              <p class="text-gray-600 leading-relaxed text-base sm:text-lg max-w-4xl">
                Our early years program nurtures young learners through play-based and structured experiences, building strong 
                foundations for academic success and character development.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div 
                v-for="(stage, index) in earlyChildhoodStages" 
                :key="index"
                class="relative rounded-[2rem] bg-white p-4 sm:p-6 md:p-8 border border-gray-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl group"
              >
                <div class="flex items-center mb-4 sm:mb-6">
                  <div class="w-10 sm:w-12 h-10 sm:h-12 bg-[#09033b] flex items-center justify-center text-white mr-3 sm:mr-4 rounded-2xl">
                    <span class="text-lg sm:text-xl">{{ stage.icon }}</span>
                  </div>
                  <h3 class="text-lg sm:text-xl font-semibold text-[#09033b]">{{ stage.title }}</h3>
                </div>
                <ul class="space-y-2 sm:space-y-3 md:space-y-4 text-gray-600">
                  <li v-for="(item, i) in stage.features" :key="i" class="flex items-start text-gray-600 text-sm sm:text-base">
                    <span class="text-[#09033b] mr-2 mt-1">•</span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Primary Education Section -->
          <div v-show="activeSection === 'primary'" class="animate-fade-in space-y-8 sm:space-y-12">
            <div class="space-y-4 sm:space-y-6">
              <h2 class="text-2xl sm:text-3xl font-light text-[#09033b] tracking-tight">
                Primary <span class="font-medium">Education</span>
              </h2>
              
              <div class="w-16 h-px bg-[#09033b] mb-4 sm:mb-6"></div>
              
              <p class="text-gray-600 leading-relaxed text-base sm:text-lg max-w-4xl">
                Our primary program combines the best of A.C.E. and Nigerian curricula to provide a comprehensive education 
                that prepares students for secondary school and beyond.
              </p>
            </div>

            <div class="space-y-8">
              <h3 class="text-xl sm:text-2xl font-light text-[#09033b] tracking-tight">
                Core <span class="font-medium">Subjects</span>
              </h3>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div 
                  v-for="(subject, index) in primarySubjects" 
                  :key="index" 
                  class="rounded-[2rem] bg-white p-4 sm:p-6 border border-gray-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div class="flex items-center mb-3 sm:mb-4">
                    <div class="w-10 sm:w-11 h-10 sm:h-11 bg-[#09033b] flex items-center justify-center text-white mr-3 sm:mr-4 rounded-2xl">
                      <span class="text-sm sm:text-lg">{{ subject.icon }}</span>
                    </div>
                    <span class="font-semibold text-[#09033b] text-sm sm:text-base">{{ subject.name }}</span>
                  </div>
                  <p class="text-sm text-gray-600">{{ subject.description }}</p>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div class="rounded-[2rem] bg-white p-4 sm:p-6 md:p-8 border border-gray-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <h3 class="text-lg sm:text-xl font-semibold text-[#09033b] mb-4 sm:mb-6">Lower Primary (Grades 1-3)</h3>
                <ul class="space-y-2 sm:space-y-3 md:space-y-4 text-gray-600 text-sm sm:text-base">
                  <li class="flex items-start"><span class="text-[#09033b] mr-2 mt-1">•</span> Foundational literacy and numeracy</li>
                  <li class="flex items-start"><span class="text-[#09033b] mr-2 mt-1">•</span> Introduction to scientific concepts</li>
                  <li class="flex items-start"><span class="text-[#09033b] mr-2 mt-1">•</span> Nigerian cultural studies</li>
                  <li class="flex items-start"><span class="text-[#09033b] mr-2 mt-1">•</span> Character foundations</li>
                </ul>
              </div>
              
              <div class="rounded-[2rem] bg-white p-4 sm:p-6 md:p-8 border border-gray-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <h3 class="text-lg sm:text-xl font-semibold text-[#09033b] mb-4 sm:mb-6">Upper Primary (Grades 4-6)</h3>
                <ul class="space-y-2 sm:space-y-3 md:space-y-4 text-gray-600 text-sm sm:text-base">
                  <li class="flex items-start"><span class="text-[#09033b] mr-2 mt-1">•</span> Advanced language and math</li>
                  <li class="flex items-start"><span class="text-[#09033b] mr-2 mt-1">•</span> In-depth science studies</li>
                  <li class="flex items-start"><span class="text-[#09033b] mr-2 mt-1">•</span> Nigerian and African history</li>
                  <li class="flex items-start"><span class="text-[#09033b] mr-2 mt-1">•</span> Digital literacy</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Our Approach Section -->
          <div v-show="activeSection === 'approach'" class="animate-fade-in space-y-8 sm:space-y-12">
            <div class="space-y-4 sm:space-y-6">
              <h2 class="text-2xl sm:text-3xl font-light text-[#09033b] tracking-tight">
                Our <span class="font-medium">Educational</span> Approach
              </h2>
              
              <div class="w-16 h-px bg-[#09033b] mb-4 sm:mb-6"></div>
              
              <p class="text-gray-600 leading-relaxed text-base sm:text-lg max-w-4xl">
                We employ research-based teaching methods that honor each child's unique learning style while maintaining 
                rigorous academic standards and biblical values.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div 
                v-for="(approach, index) in approaches" 
                :key="index" 
                class="rounded-[2rem] border border-gray-100 bg-white p-6 sm:p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl group"
              >
                <div class="flex items-center mb-4 sm:mb-6">
                  <div class="w-8 sm:w-10 h-8 sm:h-10 bg-[#09033b] flex items-center justify-center text-white mr-3 sm:mr-4">
                    <span class="text-lg sm:text-xl">{{ approach.icon }}</span>
                  </div>
                  <h3 class="text-lg sm:text-xl font-medium text-[#09033b]">{{ approach.title }}</h3>
                </div>
                <p class="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">{{ approach.description }}</p>
                <ul class="space-y-2 sm:space-y-3">
                  <li v-for="(feature, i) in approach.features" :key="i" class="flex items-start text-gray-600 text-xs sm:text-sm">
                    <span class="text-[#09033b] mr-2 mt-1">•</span>
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Outcomes Section -->
        <div class="py-10 sm:py-12 md:py-16 bg-[#09033b] text-white px-4 sm:px-0">
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-2xl sm:text-3xl font-light tracking-tight mb-4 sm:mb-6">
              Graduate <span class="font-medium">Outcomes</span>
            </h2>
            
            <div class="w-16 h-px bg-white mx-auto mb-6 sm:mb-8"></div>
            
            <p class="text-lg sm:text-xl leading-relaxed font-light max-w-3xl mx-auto mb-8 sm:mb-12 px-2 sm:px-0">
              Students completing our program demonstrate academic excellence, strong character, 
              and readiness for secondary education.
            </p>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0">
              <div v-for="(outcome, index) in outcomes" :key="index" class="rounded-[2rem] bg-[#0b0a31] bg-opacity-90 p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div class="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <span class="text-xl sm:text-2xl">{{ outcome.icon }}</span>
                </div>
                <h4 class="font-semibold mb-2 text-base sm:text-lg text-white">{{ outcome.title }}</h4>
                <p class="text-sm text-white/80">{{ outcome.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ Section -->
        <div class="py-10 sm:py-12 md:py-16 px-2 sm:px-0">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl sm:text-3xl font-light text-[#09033b] tracking-tight mb-4 sm:mb-6">
              Frequently <span class="font-medium">Asked Questions</span>
            </h2>
            
            <div class="w-16 h-px bg-[#09033b] mb-6 sm:mb-8"></div>
            
            <div class="space-y-4 sm:space-y-5">
              <div 
                v-for="(faq, index) in faqs" 
                :key="index" 
                class="rounded-[2rem] border border-gray-100 bg-white p-5 sm:p-6 shadow-sm"
              >
                <button 
                  @click="toggleFaq(index)"
                  class="w-full text-left flex items-center justify-between py-3 sm:py-4 focus:outline-none"
                >
                  <span class="font-medium text-[#09033b] text-base sm:text-lg">{{ faq.question }}</span>
                  <span class="text-[#09033b] text-xl sm:text-2xl">{{ faq.open ? '−' : '+' }}</span>
                </button>
                <div v-show="faq.open" class="pb-3 sm:pb-4">
                  <p class="text-gray-600 text-sm sm:text-base">{{ faq.answer }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: "CurriculumComponent",
  setup() {
    const activeSection = ref('overview')
    
    const earlyChildhoodStages = reactive([
      {
        icon: '🎪',
        title: 'Play Group',
        features: [
          'Activity-based learning through guided play',
          'Introduction to basic concepts through hands-on experiences',
          'Development of social skills and emotional intelligence',
          'Early exposure to numbers, letters, colors, and shapes'
        ]
      },
      {
        icon: '🌸',
        title: 'Nursery 1',
        features: [
          'Structured phonics program building reading readiness',
          'Introduction to number concepts and early mathematics',
          'Themed units exploring God\'s world',
          'Creative development through art, music, and movement'
        ]
      },
      {
        icon: '🌻',
        title: 'Nursery 2',
        features: [
          'Advanced phonics instruction leading to early reading',
          'Beginning writing skills and sentence formation',
          'Number recognition and basic addition concepts',
          'Bible stories emphasizing character development'
        ]
      },
      {
        icon: '📚',
        title: 'Reading Readiness',
        features: [
          'Phonics-based pre-reading instruction',
          'Fine motor skills development for writing',
          'Listening comprehension and verbal expression',
          'Biblical principles and character development'
        ]
      }
    ])

    const primarySubjects = reactive([
      { icon: '🔢', name: 'Mathematics', description: 'From basic arithmetic to advanced mathematical concepts' },
      { icon: '📝', name: 'English', description: 'Comprehensive language arts and literature studies' },
      { icon: '🔬', name: 'Science', description: 'Scientific concepts taught from a biblical perspective' },
      { icon: '🌍', name: 'Social Studies', description: 'History and geography with Christian worldview' },
      { icon: '📖', name: 'Word Building', description: 'Vocabulary development and spelling skills' },
      { icon: '✝️', name: 'Bible', description: 'Scripture memorization and biblical principles' },
      { icon: '🇳🇬', name: 'Nigerian Studies', description: 'Cultural heritage and national values' },
      { icon: '🇫🇷', name: 'French', description: 'Introduction to French language' },
      { icon: '💻', name: 'Computer Studies', description: 'Digital literacy and technology skills' }
    ])

    const approaches = reactive([
      {
        icon: '👤',
        title: 'Individualized Learning',
        description: 'Students progress at their own pace through the curriculum.',
        features: [
          'Personalized learning plans',
          'Self-paced progression',
          'Mastery before advancement',
          'Confidence through achievement'
        ]
      },
      {
        icon: '❤️',
        title: 'Character Development',
        description: 'Biblical values integrated throughout all subjects.',
        features: [
          'Weekly character traits',
          'Pathway to Wisdom',
          'Leadership opportunities',
          'Mentorship program'
        ]
      },
      {
        icon: '📊',
        title: 'Assessment',
        description: 'Multiple methods to evaluate student progress.',
        features: [
          'Regular PACE tests',
          'Continuous evaluation',
          'Standardized testing',
          'Portfolio assessments'
        ]
      },
      {
        icon: '🏫',
        title: 'Learning Environment',
        description: 'Spaces designed to support diverse learning needs.',
        features: [
          'Individual work stations',
          'Collaborative areas',
          'Engaging extra-curricular activities',
          'Technology resources'
        ]
      }
    ])

    const outcomes = reactive([
      { icon: '🎓', title: 'Academic Excellence', description: 'Prepared for secondary education success' },
      { icon: '✅', title: 'Mastery Learning', description: 'Thorough understanding of core concepts' },
      { icon: '🇳🇬', title: 'National Standards', description: 'Meeting all Nigerian requirements' },
      { icon: '✝️', title: 'Biblical Foundation', description: 'Strong Christian worldview' },
      { icon: '🧠', title: 'Critical Thinking', description: 'Ability to learn independently' },
      { icon: '🌍', title: 'Global Perspective', description: 'Balanced local and international outlook' }
    ])

    const faqs = reactive([
      {
        question: 'How does the dual curriculum work?',
        answer: 'Students follow the A.C.E. individualized learning model while also covering Nigerian curriculum subjects, ensuring both international and national standards are met.',
        open: false
      },
      {
        question: 'What is the student-teacher ratio?',
        answer: 'We maintain small class sizes with ratios typically not exceeding 15:1 for optimal learning outcomes.',
        open: false
      },
      {
        question: 'How is progress assessed?',
        answer: 'We use multiple methods including PACE tests, Nigerian curriculum evaluations, continuous assessment, and standardized testing.',
        open: false
      },
      {
        question: 'Is the curriculum suitable for studying abroad?',
        answer: 'Yes, the A.C.E. component provides international recognition while the Nigerian curriculum ensures local compliance.',
        open: false
      }
    ])

    const toggleFaq = (index) => {
      faqs[index].open = !faqs[index].open
    }

    return {
      activeSection,
      earlyChildhoodStages,
      primarySubjects,
      approaches,
      outcomes,
      faqs,
      toggleFaq
    }
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
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

* {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>