<template>
  <div class="min-h-screen bg-[#FDFDFD] font-inter selection:bg-[#09033b] selection:text-white">
    
    <section class="relative py-20 bg-gray-50 border-b border-gray-100 overflow-hidden">
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%"><pattern id="grid-enroll" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="#09033b" stroke-width="1" fill="none"/></pattern><rect width="100%" height="100%" fill="url(#grid-enroll)" /></svg>
      </div>
      
      <div class="container mx-auto px-4 relative z-10 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-[#09033b] text-xs font-bold tracking-wide uppercase mb-6 shadow-sm">
          <span class="w-2 h-2 rounded-full bg-[#FF7F50] animate-pulse"></span>
          Admissions open
        </div>
        <h1 class="text-4xl md:text-6xl font-bold text-[#09033b] tracking-tight mb-6">
          Enroll Your <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#09033b] to-[#4f46e5]">Child</span>
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Our streamlined enrollment process is designed to ensure a smooth transition for your family into The Covenant Academy.
        </p>
        <NuxtLink to="/admissions/tuition" class="group inline-flex items-center gap-2 px-6 py-3 bg-[#09033b] text-white rounded-xl hover:bg-[#0c0552] transition-all shadow-lg shadow-[#09033b]/20">
          View Tuition & Fees
          <UIcon name="i-heroicons-banknotes" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </section>

    <section class="py-24 container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div class="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 z-0"></div>

          <div v-for="(step, index) in enrollmentSteps" :key="index" class="relative z-10 group">
            <div class="flex flex-col items-center md:items-start">
              <div class="w-24 h-24 rounded-3xl bg-white border-4 border-gray-50 flex items-center justify-center text-3xl font-bold text-[#09033b] shadow-xl group-hover:bg-[#FF7F50] group-hover:text-white transition-all duration-500 mb-6">
                0{{ step.step }}
              </div>
              
              <div class="text-center md:text-left">
                <h2 class="text-xl font-bold text-[#09033b] mb-3 group-hover:text-[#FF7F50] transition-colors">{{ step.title }}</h2>
                <p class="text-sm text-gray-500 leading-relaxed mb-6">{{ step.description }}</p>
                
                <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span v-for="detail in step.details" :key="detail" class="px-3 py-1 bg-gray-100 text-[11px] font-bold text-gray-600 rounded-lg uppercase tracking-wider">
                    {{ detail }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-white border-t border-gray-100">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-[#09033b] text-center mb-16">Required Documents</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="p-8 rounded-[2rem] bg-gray-50 border border-gray-100 relative overflow-hidden">
              <div class="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/5 rounded-full"></div>
              <h3 class="text-xl font-bold text-[#09033b] mb-6 flex items-center gap-3">
                <UIcon name="i-heroicons-user-plus" class="text-blue-500" />
                New Students
              </h3>
              <ul class="space-y-4">
                <li v-for="doc in newStudentDocs" :key="doc" class="flex items-start gap-3 text-sm text-gray-600">
                  <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500 shrink-0" />
                  {{ doc }}
                </li>
              </ul>
            </div>

            <div class="p-8 rounded-[2rem] bg-gray-50 border border-gray-100 relative overflow-hidden">
              <div class="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/5 rounded-full"></div>
              <h3 class="text-xl font-bold text-[#09033b] mb-6 flex items-center gap-3">
                <UIcon name="i-heroicons-academic-cap" class="text-purple-500" />
                Transfer Students
              </h3>
              <ul class="space-y-4">
                <li v-for="doc in transferStudentDocs" :key="doc" class="flex items-start gap-3 text-sm text-gray-600">
                  <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500 shrink-0" />
                  {{ doc }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-[#09033b] text-white overflow-hidden relative">
      <div class="absolute top-0 right-0 w-96 h-96 bg-[#FF7F50]/10 rounded-full blur-3xl"></div>
      
      <div class="container mx-auto px-4 relative z-10">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">Calendar Milestones</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div v-for="(date, index) in importantDates" :key="index" class="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 text-center hover:bg-white/10 transition-all group">
            <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{{ date.icon }}</div>
            <h3 class="text-lg font-bold mb-2">{{ date.title }}</h3>
            <div class="text-2xl font-black text-[#FF7F50] mb-3 tracking-tight">{{ date.date }}</div>
            <p class="text-sm text-blue-100/60 font-light leading-relaxed">{{ date.description }}</p>
          </div>
        </div>

        <div class="mt-20 text-center">
          <p class="text-blue-200/60 text-sm mb-6 italic">Need further clarification on the process?</p>
          <a href="tel:+2348036233157" class="inline-flex items-center gap-2 px-8 py-4 bg-[#FF7F50] text-white rounded-2xl font-bold hover:bg-[#e06b40] transition-all shadow-xl shadow-[#FF7F50]/20">
            <UIcon name="i-heroicons-phone" />
            Contact Admissions Office
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const enrollmentSteps = [
  {
    step: 1,
    title: "Apply Online",
    description: "Submit your comprehensive application form through our secure portal along with the non-refundable fee.",
    details: ["Prospectus Review", "Form Submission", "Fee Payment"],
  },
  {
    step: 2,
    title: "Campus Visit",
    description: "Experience our facilities firsthand and witness our individualized learning environment in action.",
    details: ["Guided Tour", "Staff Meetup", "Q&A Session"],
  },
  {
    step: 3,
    title: "Assessment",
    description: "An academic diagnostic test and family orientation to ensure our values align for your child's success.",
    details: ["Diagnostic Test", "Family Interview", "Orientation"],
  },
  {
    step: 4,
    title: "Acceptance",
    description: "Finalize the enrollment contract and medical documentation to secure your child's place.",
    details: ["Contract Signed", "Medical Forms", "Final Registration"],
  },
];

const newStudentDocs = [
  "Completed application form",
  "Birth certificate (Certified Copy)",
  "Current immunization records",
  "Two passport-sized photographs",
  "Valid Government ID of Parent/Guardian",
];

const transferStudentDocs = [
  "All new student requirements",
  "Official transcripts (Last 2 Years)",
  "Transfer certificate from previous school",
  "Letter of recommendation (Optional)",
];

const importantDates = [
  {
    title: "Application Window",
    date: "Active Now",
    description: "Current session applications are being processed daily.",
    icon: "📅",
  },
  {
    title: "Summer Break",
    date: "July 25",
    description: "Conclusion of the 2024/2025 academic session.",
    icon: "⏰",
  },
  {
    title: "Resumption",
    date: "Sept 09",
    description: "Welcome back! Start of the new academic journey.",
    icon: "🏫",
  },
];
</script>