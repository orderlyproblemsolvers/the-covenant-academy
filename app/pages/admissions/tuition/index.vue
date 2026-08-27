<template>
  <div class="min-h-screen bg-[#FDFDFD] font-inter selection:bg-[#09033b] selection:text-white">
    
    <section class="relative py-20 bg-gray-50 border-b border-gray-100 overflow-hidden">
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%"><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="#09033b" stroke-width="1" fill="none"/></pattern><rect width="100%" height="100%" fill="url(#grid)" /></svg>
      </div>
      
      <div class="container mx-auto px-4 relative z-10 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-[#09033b] text-xs font-bold tracking-wide uppercase mb-6 shadow-sm">
          <span class="w-2 h-2 rounded-full bg-[#FF7F50]"></span>
          Investment in Future
        </div>
        <h1 class="text-4xl md:text-6xl font-bold text-[#09033b] tracking-tight mb-6">
          Tuition & <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#09033b] to-[#4f46e5]">Fees</span>
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Transparent pricing for world-class Christian education. Explore our flexible payment plans and subsidized rates.
        </p>
        <NuxtLink to="/admissions" class="group inline-flex items-center gap-2 px-6 py-3 bg-[#09033b] text-white rounded-xl hover:bg-[#0c0552] transition-all shadow-lg shadow-[#09033b]/20">
          Enrollment Process
          <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>
    </section>

    <section class="py-16 container mx-auto px-4">
      
      <div class="max-w-4xl mx-auto mb-12">
        <div class="md:hidden">
          <select v-model="selectedGrade" class="w-full p-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#09033b] outline-none">
            <option v-for="grade in gradeOptions" :key="grade.key" :value="grade.key">{{ grade.label }}</option>
          </select>
        </div>
        <div class="hidden md:flex p-1.5 bg-gray-100 rounded-2xl flex-wrap justify-center gap-1">
          <button 
            v-for="grade in gradeOptions" 
            :key="grade.key"
            @click="selectedGrade = grade.key"
            :class="[
              'px-6 py-2.5 text-sm font-semibold rounded-xl transition-all',
              selectedGrade === grade.key ? 'bg-white text-[#09033b] shadow-sm' : 'text-gray-500 hover:text-[#09033b] hover:bg-white/50'
            ]"
          >
            {{ grade.label }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
        
        <div class="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
          <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
            <UIcon name="i-heroicons-calendar-days" class="w-6 h-6" />
          </div>
          <h2 class="text-xl font-bold text-[#09033b] mb-2">Termly Tuition</h2>
          <p class="text-sm text-gray-500 mb-6">Standard full term payment.</p>
          <div class="text-4xl font-bold text-gray-900 mb-6">
            ₦{{ tuitionData[selectedGrade].termly.toLocaleString() }}
            <span class="text-sm text-gray-400 font-normal">/term</span>
          </div>
          <ul class="space-y-3 text-sm text-gray-600">
            <li class="flex items-center gap-2"><UIcon name="i-heroicons-check-circle" class="text-green-500" /> Academic Tuition</li>
            <li class="flex items-center gap-2"><UIcon name="i-heroicons-check-circle" class="text-green-500" /> Facilities Access</li>
          </ul>
        </div>

        <div class="bg-white rounded-[2rem] p-8 border-2 border-[#FF7F50] shadow-xl relative scale-105 z-10">
          <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF7F50] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
            Recommended
          </div>
          <div class="w-12 h-12 bg-orange-50 text-[#FF7F50] rounded-2xl flex items-center justify-center mb-6">
            <UIcon name="i-heroicons-credit-card" class="w-6 h-6" />
          </div>
          <h2 class="text-xl font-bold text-[#09033b] mb-2">Monthly Plan</h2>
          <p class="text-sm text-gray-500 mb-6">Flexible installments for families.</p>
          <div class="text-4xl font-bold text-gray-900 mb-6">
            ₦{{ tuitionData[selectedGrade].monthly.toLocaleString() }}
            <span class="text-sm text-gray-400 font-normal">/mo</span>
          </div>
          <p class="text-xs text-gray-400 mb-6">* Payable in 3 installments per term</p>
        </div>

        <div class="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
          <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
            <UIcon name="i-heroicons-banknotes" class="w-6 h-6" />
          </div>
          <h2 class="text-xl font-bold text-[#09033b] mb-4">Ancillary Fees</h2>
          <div class="space-y-4">
            <div v-for="fee in ['Registration', 'PACEs', 'Uniforms', 'Books & Materials']" :key="fee" class="flex justify-between items-center py-2 border-b border-gray-50">
              <span class="text-sm text-gray-600">{{ fee }}</span>
              <UIcon name="i-heroicons-plus-circle" class="text-gray-300 w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-[#09033b] text-white relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div class="container mx-auto px-4 relative z-10 text-center">
        <h2 class="text-3xl md:text-5xl font-bold mb-6">Subsidies & <span class="text-[#FF7F50]">Support</span></h2>
        <p class="max-w-3xl mx-auto text-blue-100/80 mb-16 leading-relaxed">
          The Covenant Academy is deeply subsidized by <strong>The Covenant Assembly Mission</strong>. 
          Our fees are structured only to sustain academic operations, while infrastructure and major projects remain mission-funded.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div v-for="(discount, index) in discounts" :key="index" class="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group">
            <div class="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{{ discount.icon }}</div>
            <h4 class="font-bold mb-1">{{ discount.title }}</h4>
            <p class="text-[10px] text-blue-200 uppercase tracking-widest font-bold text-[#FF7F50]">{{ discount.savings }}</p>
          </div>
        </div>

        <div class="mt-20 max-w-4xl mx-auto p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-white to-gray-50 text-[#09033b] shadow-2xl relative overflow-hidden">
          <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <h3 class="text-2xl md:text-3xl font-bold mb-4">Financial Aid Programs</h3>
          <p class="text-gray-600 mb-8 max-w-2xl mx-auto">
            We provide needs-based assistance covering up to 80% of tuition for families demonstrating genuine financial circumstances.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+2348036233157" class="flex items-center gap-2 px-8 py-4 bg-[#FF7F50] text-white rounded-2xl font-bold hover:bg-[#e06b40] transition-all">
              <UIcon name="i-heroicons-phone" />
              Speak with a Consultant
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const selectedGrade = ref("daycare");

const gradeOptions = [
  { key: "daycare", label: "Day Care" },
  { key: "playgroup", label: "Play Group" },
  { key: "nursery", label: "Nursery" },
  { key: "readiness", label: "Reading Readiness" },
  { key: "grade1to3", label: "Grade 1-3" },
  { key: "grade4to6", label: "Grade 4-6" },
];

const tuitionData = {
  daycare: { termly: 129015, monthly: 43005 },
  playgroup: { termly: 139015, monthly: 46338 },
  nursery: { termly: 150995, monthly: 50332 },
  readiness: { termly: 155330, monthly: 51777 },
  grade1to3: { termly: 191600, monthly: 63887 },
  grade4to6: { termly: 197640, monthly: 65880 },
};

const discounts = [
  { title: "Teachers & Staff", icon: "👩‍🏫", savings: "80% Off" },
  { title: "Pastors", icon: "🙏", savings: "50% Off" },
  { title: "Church Leaders", icon: "👨‍💼", savings: "30% Off" },
  { title: "Church Workers", icon: "👨‍💻", savings: "20% Off" },
  { title: "Single Parents", icon: "👩‍👦", savings: "20% Off" },
];
</script>