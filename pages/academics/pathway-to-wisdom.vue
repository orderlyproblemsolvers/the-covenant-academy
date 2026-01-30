<template>
  <div class="relative w-full min-h-screen bg-[#FDFDFD] py-20 px-4 sm:px-6 lg:px-8 font-inter overflow-hidden">
    
    <div class="absolute inset-0 pointer-events-none opacity-[0.03]">
      <svg width="100%" height="100%">
        <pattern id="wisdom-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="#09033b" stroke-width="1" fill="none"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#wisdom-pattern)" />
      </svg>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto">
      
      <header class="max-w-3xl mb-16">
        <div class="inline-flex items-center gap-3 mb-6">
          <span class="w-8 h-px bg-[#FF7F50]"></span>
          <span class="text-xs font-bold text-[#FF7F50] uppercase tracking-widest">Discipleship Resources</span>
        </div>
        
        <h1 class="text-5xl md:text-7xl font-light text-[#09033b] leading-[1.1] tracking-tighter mb-8">
          Pathway To <br/>
          <span class="font-bold italic">Wisdom</span>
        </h1>
        
        <p class="text-lg text-gray-500 leading-relaxed font-light border-l-2 border-gray-100 pl-8">
          A dedicated discipleship manual designed to ground children in the fundamentals of the Christian faith.
          Level 1 covers Salvation, Identity in Christ, and building daily spiritual habits.
        </p>
      </header>

      <div class="grid lg:grid-cols-12 gap-12 lg:gap-24">
        
        <div class="lg:col-span-7 space-y-12">
          
          <section>
            <h3 class="text-2xl font-bold text-[#09033b] mb-6">Inside Level One</h3>
            <div class="grid sm:grid-cols-2 gap-6">
              <div v-for="(benefit, i) in benefits" :key="i" class="flex gap-4">
                <div class="w-2 h-2 mt-2.5 rounded-full bg-[#FF7F50] flex-shrink-0"></div>
                <div>
                  <h4 class="font-bold text-[#09033b]">{{ benefit.title }}</h4>
                  <p class="text-sm text-gray-500 leading-relaxed mt-1">{{ benefit.desc }}</p>
                </div>
              </div>
            </div>
          </section>

          <section class="bg-gray-50 rounded-[2rem] p-8 md:p-10 border border-gray-100">
            <h3 class="text-xl font-bold text-[#09033b] mb-6 flex items-center gap-3">
              <span class="flex items-center justify-center w-8 h-8 rounded-full bg-[#09033b] text-white text-sm">i</span>
              Instructions for Parents
            </h3>
            <ul class="space-y-4">
              <li v-for="(step, i) in instructions" :key="i" class="flex gap-4 text-gray-600">
                <span class="font-bold text-[#FF7F50] font-mono">0{{ i + 1 }}.</span>
                <span class="text-sm md:text-base">{{ step }}</span>
              </li>
            </ul>
          </section>

          <section class="relative py-8">
            <span class="absolute top-0 left-0 text-6xl text-[#FF7F50]/20 font-serif leading-none">“</span>
            <blockquote class="relative z-10 pl-8 border-l-4 border-[#FF7F50]">
              <p class="text-2xl font-serif text-[#09033b] italic leading-relaxed mb-4">
                Train up a child in the way he should grow: and when he is old, he will not depart from it.
              </p>
              <cite class="text-xs font-bold text-[#FF7F50] uppercase tracking-widest not-italic">
                — Proverbs 22:6
              </cite>
            </blockquote>
          </section>

          <section class="pt-8 border-t border-gray-100">
            <div class="flex gap-4 items-start">
              <div class="flex-shrink-0 mt-1">
                 <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              </div>
              <div class="text-xs leading-relaxed text-gray-400 text-justify">
                <p class="mb-2">
                  <strong class="text-gray-600">COPYRIGHT NOTICE:</strong> These materials are the intellectual property of 
                  <span class="text-[#09033b] font-bold">The Covenant Academy</span>. 
                  You are granted permission to download, print, share, and use these resources for teaching, home discipleship, and church use completely free of charge.
                </p>
                <p>
                  <strong class="text-red-500/80">STRICTLY NOT FOR SALE:</strong> 
                  We believe the Word of God should be free. Therefore, these materials 
                  <span class="underline decoration-red-200 decoration-2">must not be sold, resold, or repackaged for profit</span> under any circumstances. 
                  Any attempt to commercialize this content constitutes a violation of our terms and copyright, and may trigger legal action.
                </p>
              </div>
            </div>
          </section>

        </div>

        <div class="lg:col-span-5 space-y-8">
          
          <div class="group relative bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:shadow-[#09033b]/10 transition-all duration-500 border border-gray-100 hover:-translate-y-1">
            <div class="absolute top-8 right-8 text-[#09033b]/10">
              <svg class="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            </div>
            
            <span class="inline-block px-3 py-1 bg-[#09033b]/5 text-[#09033b] text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
              Available Now
            </span>
            
            <h3 class="text-3xl font-bold text-[#09033b] mb-2">Level One</h3>
            <p class="text-gray-500 text-sm mb-4 pr-12">
              Foundations of Salvation & Identity.
            </p>
            <p class="text-xs text-[#FF7F50] font-bold mb-8 uppercase tracking-wider">
              Contains 2 PDF Files
            </p>

            <button 
              @click="openDownloadModal(1)"
              class="w-full py-4 bg-[#09033b] text-white font-bold rounded-xl hover:bg-[#FF7F50] transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <span>Download Material</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            </button>
          </div>

          <div class="relative bg-gray-50 rounded-[2rem] p-8 border border-dashed border-gray-200 opacity-75 grayscale-[0.5]">
            <span class="inline-block px-3 py-1 bg-gray-200 text-gray-500 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
              Coming Soon
            </span>
            <h3 class="text-3xl font-bold text-gray-400 mb-2">Level Two</h3>
            <p class="text-gray-400 text-sm mb-8">
              Advanced topics on Christian Service, Leadership, and Doctrine.
            </p>
            <button disabled class="w-full py-4 bg-gray-200 text-gray-400 font-bold rounded-xl cursor-not-allowed">
              Available soon
            </button>
          </div>

        </div>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-[#09033b]/90 backdrop-blur-sm" @click="closeModal"></div>
        
        <div class="relative w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl overflow-hidden">
          
          <button @click="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-[#FF7F50] z-20">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>

          <div v-if="!downloadStarted">
            <div class="text-center mb-8">
              <h3 class="text-xl font-bold text-[#09033b] mb-2">Start Your Download</h3>
              <p class="text-sm text-gray-500">Enter your details to receive the Pathway to Wisdom Level {{ selectedLevel }} material.</p>
            </div>

            <form @submit.prevent="handleDownloadSubmit" class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Full Name</label>
                <input 
                  v-model="form.name"
                  required
                  type="text" 
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7F50]/20 focus:border-[#FF7F50] transition-all text-black"
                  placeholder="Enter your name"
                >
              </div>
              
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
                <input 
                  v-model="form.email"
                  required
                  type="email" 
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7F50]/20 focus:border-[#FF7F50] transition-all text-black"
                  placeholder="Enter your email"
                >
              </div>

              <button 
                type="submit" 
                :disabled="isSubmitting"
                class="w-full py-4 bg-[#09033b] text-white font-bold rounded-xl hover:bg-[#FF7F50] transition-all duration-300 disabled:opacity-70 disabled:cursor-wait mt-4 flex justify-center items-center gap-2"
              >
                <span v-if="isSubmitting" class="flex items-center gap-2">
                   <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                   Processing...
                </span>
                <span v-else>Get Material Now</span>
              </button>
            </form>
          </div>

          <div v-else class="text-center py-4">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </div>
            
            <h3 class="text-xl font-bold text-[#09033b] mb-2">You're all set!</h3>
            <p class="text-sm text-gray-500 mb-6">
              Your download for <strong>Part 1</strong> should have started automatically. <br/>
              Level 1 is split into two files. Please ensure you download both below.
            </p>

            <div class="space-y-3">
              <a 
                :href="files.part1" 
                download
                class="block w-full py-3 bg-gray-100 hover:bg-gray-200 text-[#09033b] font-bold rounded-xl transition-colors flex items-center justify-between px-6"
              >
                <span>Download Part 1</span>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              </a>
              
              <a 
                :href="files.part2" 
                download
                class="block w-full py-3 bg-gray-100 hover:bg-gray-200 text-[#09033b] font-bold rounded-xl transition-colors flex items-center justify-between px-6"
              >
                <span>Download Part 2</span>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const supabase = useSupabaseClient()

// State
const showModal = ref(false)
const isSubmitting = ref(false)
const downloadStarted = ref(false)
const selectedLevel = ref(1)

defineOgImageComponent("CovenantPages", {
  title: "Pathway to Wisdom",
  subtitle: "'Train up a child in the way he should grow: and when he is old, he will not depart from it.' - Prov 22:6",
});

// Specific File Paths
const files = {
  part1: '/docs/pathway to wisdom part 1.pdf',
  part2: '/docs/pathway to wisdom part 2.pdf'
}

const form = reactive({
  name: '',
  email: ''
})

// Content Data
const benefits = [
  { title: 'Understanding Salvation', desc: 'A clear explanation of sin, redemption, and the "Sinner\'s Prayer".' },
  { title: 'Identity in Christ', desc: 'Teaching children their 5 privileges as new members of God\'s family.' },
  { title: 'Interactive Learning', desc: 'Fill-in-the-blanks, puzzles, and coloring activities to drive lessons home.' },
  { title: 'Spiritual Habits', desc: 'Practical guides on how to pray, study the Bible, and navigate friendships.' }
]

const instructions = [
  'Download both Part 1 and Part 2 PDF files.',
  'Print in color and bind them together for the best experience.',
  'Schedule a regular time to sit and guide the child through the lessons.',
  'Encourage the child to fill in the answers themselves.'
]

// Actions
const openDownloadModal = (level) => {
  selectedLevel.value = level
  showModal.value = true
  downloadStarted.value = false // Reset state
}

const closeModal = () => {
  showModal.value = false
  // Optional: clear form only if successful
  if(downloadStarted.value) {
    form.name = ''
    form.email = ''
  }
}

const triggerDownload = (url) => {
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', '') // Force download
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const handleDownloadSubmit = async () => {
  isSubmitting.value = true
  
  try {
    // 1. Save Lead to Supabase
    const { error } = await supabase
      .from('resource_downloads')
      .insert({
        name: form.name,
        email: form.email,
        resource_name: `Pathway To Wisdom - Level ${selectedLevel.value}`
      })

    if (error) throw error

    // 2. Success State
    downloadStarted.value = true
    
    // 3. Attempt Auto-Download of Part 1 (Browser might block Part 2 if we try both instantly)
    setTimeout(() => {
      triggerDownload(files.part1)
    }, 500)

  } catch (err) {
    console.error('Submission error:', err)
    alert('Sorry, we couldn\'t process your request. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}


</script>