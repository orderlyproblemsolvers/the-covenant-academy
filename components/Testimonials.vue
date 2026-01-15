<template>
  <section class="relative bg-gray-50 py-20 font-inter overflow-hidden">
    
    <div class="absolute inset-0 pointer-events-none opacity-[0.03]">
      <svg width="100%" height="100%">
        <pattern id="quote-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <text x="0" y="30" font-size="20" fill="#09033b">"</text>
        </pattern>
        <rect width="100%" height="100%" fill="url(#quote-pattern)" />
      </svg>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-[#09033b] text-xs font-bold tracking-wide uppercase mb-6 shadow-sm">
          <span class="w-2 h-2 rounded-full bg-[#09033b]"></span>
          Testimonials
        </div>
        <h2 class="text-3xl md:text-5xl font-bold text-[#09033b] tracking-tight mb-4">
          Voices of the <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#09033b] to-[#4f46e5]">TCA Family</span>
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Real stories of transformation, faith, and excellence from our parents and students.
        </p>
      </div>

      <div class="relative group/carousel">
        
        <button 
          @click="scroll('left')"
          class="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 items-center justify-center text-[#09033b] hover:bg-[#09033b] hover:text-white transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>

        <button 
          @click="scroll('right')"
          class="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 items-center justify-center text-[#09033b] hover:bg-[#09033b] hover:text-white transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </button>

        <div class="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div class="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

        <div 
          ref="scrollContainer"
          class="flex gap-6 overflow-x-auto pb-8 pt-4 px-4 sm:px-8 snap-x snap-mandatory hide-scrollbar scroll-smooth"
        >
          <div
            v-for="(testimony, index) in testimonies"
            :key="index"
            class="snap-start relative flex-shrink-0 w-[300px] md:w-[380px] bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div class="absolute top-6 right-6 text-gray-100">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" /></svg>
            </div>

            <div>
              <span class="inline-block px-3 py-1 mb-6 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wide">
                Testimony
              </span>
              
              <p class="text-gray-600 leading-relaxed relative z-10 text-base">
                "{{ truncateText(testimony, 140) }}"
              </p>
            </div>

            <div class="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-[#09033b] text-white flex items-center justify-center font-bold text-sm">
                  TC
                </div>
                <div>
                  <p class="text-sm font-bold text-gray-900">TCA Family</p>
                  <p class="text-xs text-gray-500">Parent / Student</p>
                </div>
              </div>
              
              <button 
                @click="openModal(testimony)"
                class="text-sm font-medium text-[#09033b] hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                Read Story
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <Teleport to="body">
      <Transition 
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:scale-95"
      >
        <div 
          v-if="showModal" 
          class="fixed inset-0 z-[99] flex items-center justify-center p-4 sm:p-6"
        >
          <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="closeModal"></div>

          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
            
            <div class="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-[#09033b] text-white flex items-center justify-center font-bold text-xs">TC</div>
                <span class="text-sm font-semibold text-gray-900">Testimony Detail</span>
              </div>
              <button @click="closeModal" class="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <div class="p-8 overflow-y-auto">
              <h3 class="text-lg md:text-xl font-bold text-[#09033b] mb-6">
                Celebrating the doings of God in the lives of our Treasures @TCA/TCAD
              </h3>
              <div class="prose prose-blue prose-sm md:prose-base max-w-none text-gray-600">
                <p class="whitespace-pre-line leading-relaxed">{{ selectedTestimony }}</p>
              </div>
            </div>

            <div class="px-6 py-4 border-t border-gray-100 bg-gray-50/50 text-right">
              <button 
                @click="closeModal"
                class="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
            
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'

const scrollContainer = ref(null)

const scroll = (direction) => {
  if (!scrollContainer.value) return
  const scrollAmount = 400
  if (direction === 'left') {
    scrollContainer.value.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
  } else {
    scrollContainer.value.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }
}

const showModal = ref(false)
const selectedTestimony = ref("")

function truncateText(text, length) {
  return text.length > length ? text.substring(0, length) + "..." : text
}

function openModal(testimony) {
  selectedTestimony.value = testimony
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

watch(showModal, (newVal) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = newVal ? 'hidden' : ''
  }
})

const testimonies = [
  `Mrs O came to share her testimony some years ago. Her whole family attended TCA/TCAD. They first started as fee payers but when her husband lost his job, the school approached them because they noticed that they had stopped bringing their children to school. We checked their story and offered them 100% scholarship. Even when they had to move away from the school, because of economic reasons, we gave them free busing until her husband was able to start bringing their children to school...`,
  
  `A parent came to testify some years ago that she and her family travelled to the UK for the 1st time. She stayed in with her family and her son was given pounds for the 1st time by his Uncle. She was surprised when he walked up to her and said that he was not going to spend it but rather she should take him to see their pastor when they get back to Nigeria. She asked him why and he said, "They taught me in school about firstfruits and I want to present my first fruits to the Lord".`,
  
  `A parent came to testify about his son's sense of purpose and intentionality through life. I was used to complaining about giving but my son had to talk to me about it. He said he learnt from school never to complain about giving because God loves a cheerful giver. Since then, I have become appreciative of the virtues and lessons he has learnt in TCAD.`,
  
  `A couple shared with us on how God's mandate was made manifest in their daughter's life. They prayed the child into being and trusted God that the child will live according to what He has ordained for her. Recently, the daughter was ordained a pastor and she is moving from glory to glory. She will continue to tow the path of grace and righteousness.`,
  
  `A couple shared with us on how their son stood out while serving his Dad on mission trip and a mother used him as example. He became the epitome of service to God and man. He also served Mummy Hokett in Pasadena. What a great testimony! They believe the TCA/TCAD contributed to his excellence and selflessness in service.`,
  
  `A couple testified about how their daughter was offered an opportunity to move from Nigeria abroad by a relative, but the young girl believed in aligning herself to God's will and purpose. Her parents believe that the training in TCA/TCAD contributed to their daughter's point of view. Their daughter teaches her peers about purpose too. Today she is where God wants her to be. Glory be to God.`,
  
  `A couple shared with us on how their son's fervent commitment brought his friends to the knowledge of God. They made us understand that he was the only one who attended church service in his Christian school in the US and that motivated his classmates to tow the same path. The testimony consist of thanksgiving to God for his wonderous work in the young man's life.`
]
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>