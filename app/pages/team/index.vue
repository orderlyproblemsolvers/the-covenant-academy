<template>
  <div class="relative w-full min-h-screen bg-[#FDFDFD] py-20 px-4 sm:px-6 lg:px-8 font-inter overflow-hidden">
    
    <div class="absolute inset-0 pointer-events-none opacity-[0.03]">
      <svg width="100%" height="100%">
        <pattern id="team-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="#09033b" stroke-width="1" fill="none"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#team-pattern)" />
      </svg>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto">
      <header class="max-w-3xl mb-24">
        <div class="inline-flex items-center gap-3 mb-6">
          <span class="w-8 h-px bg-[#FF7F50]"></span>
          <span class="text-xs font-bold text-[#FF7F50] uppercase tracking-widest">Leadership & Faculty</span>
        </div>
        
        <h1 class="text-5xl md:text-7xl font-light text-[#09033b] leading-[1.1] tracking-tighter mb-8">
          The <span class="font-bold italic">Heart</span> of <br/>
          Our Academy
        </h1>
        
        <p class="text-lg text-gray-500 leading-relaxed font-light border-l-2 border-gray-100 pl-8">
          Meet our dedicated team of God-fearing professionals committed to raising 
          the next generation of leaders through faith and excellence.
        </p>
      </header>

      <div v-if="isLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div v-for="i in 8" :key="i" class="animate-pulse">
          <div class="aspect-[3/4] bg-gray-100 rounded-2xl mb-4"></div>
          <div class="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-gray-100 rounded w-1/2"></div>
        </div>
      </div>

      <div v-else class="space-y-32">
        <section v-for="(members, sectionName) in filteredSections" :key="sectionName">
          <div class="flex items-center gap-4 mb-12">
            <h2 class="text-xs font-black uppercase tracking-[0.3em] text-[#09033b]">
              {{ sectionName.replace('-', ' ') }}
            </h2>
            <div class="flex-1 h-px bg-gray-100"></div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-10">
            <div 
              v-for="staff in members" 
              :key="staff.id"
              class="group relative"
            >
              <div class="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-gray-50 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-[#09033b]/10 group-hover:-translate-y-2">
                <NuxtImg
                  :src="staff.pictureUrl || '/images/default-avatar.webp'"
                  :alt="staff.name"
                  class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                  format="webp"
                  placeholder
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#09033b]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div class="mt-6 text-center md:text-left px-2">
                <h3 class="text-lg font-bold text-[#09033b] leading-tight mb-1">
                  {{ staff.name }}
                </h3>
                <p class="text-xs font-medium text-[#FF7F50] uppercase tracking-wider">
                  {{ staff.position }}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <div class="fixed right-0 top-1/2 -translate-y-1/2 translate-x-12 rotate-90 hidden 2xl:block">
      <span class="text-[10px] font-black uppercase tracking-[0.5em] text-gray-200">
        Faith • Academic Excellence • Character
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const supabase = useSupabaseClient()
const allStaff = ref([])
const isLoading = ref(true)

// Priority logic for sorting top-tier roles
const positionPriority = {
  'Chairman Board of Trustees': 1,
  'Executive Director': 2,
  'Director': 3,
  'Principal': 4
}

const filteredSections = computed(() => {
  const sections = {
    'management': [],
    'office': [],
    'teacher': [],
    'non-academic': [],
    'volunteer': []
  }
  
  allStaff.value.forEach(staff => {
    const team = staff.team?.toLowerCase() || ''
    if (sections[team]) sections[team].push(staff)
  })

  // Filter out empty sections
  return Object.fromEntries(
    Object.entries(sections).filter(([_, members]) => members.length > 0)
  )
})

const fetchStaff = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('staff')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    // Parallel processing of signed URLs for speed
    if (data) {
      await Promise.all(data.map(async (staff) => {
        if (staff.profile_image) {
          const { data: urlData } = await supabase.storage
            .from('staff-images')
            .createSignedUrl(staff.profile_image, 86400)
          
          staff.pictureUrl = urlData?.signedUrl || null
        }
      }))
      
      // Sort within sections by priority then name
      data.sort((a, b) => {
        const pA = positionPriority[a.position] || 999
        const pB = positionPriority[b.position] || 999
        return pA !== pB ? pA - pB : a.name.localeCompare(b.name)
      })
    }

    allStaff.value = data || []
  } catch (err) {
    console.error('Fetch error:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchStaff)
</script>

<style scoped>
/* Smooth typography scaling */
@media (max-width: 640px) {
  h1 { font-size: 2.75rem; }
}

/* Hide scrollbar for Chrome, Safari and Opera */
::-webkit-scrollbar {
  display: none;
}

/* Optimized image rendering */
img {
  will-change: transform;
  backface-visibility: hidden;
}
</style>