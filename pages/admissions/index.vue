<template>
  <div class="min-h-screen bg-gray-50 font-inter">
    <!-- Enrollment Process -->
    <section id="enrollment" class="py-12 md:py-20 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="text-center mb-12 md:mb-16">
          <h2
            class="mb-4 text-2xl sm:text-3xl md:text-4xl font-light text-[#09033b] tracking-tight"
          >
            How to Enroll Your Child
          </h2>
          <p class="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Our streamlined enrollment process makes it easy to secure your
            child's place at Excellence Academy.
          </p>
          <NuxtLink
            to="/admissions/tuition"
            class="inline-flex items-center justify-center px-6 py-3 bg-[#09033b] text-white text-base font-medium hover:bg-[#0a0440] transition-colors duration-300"
          >
            View Tuition & Fees
            <svg
              class="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </NuxtLink>
        </div>

        <div class="max-w-4xl mx-auto">
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-12"
          >
            <div
              v-for="(step, index) in enrollmentSteps"
              :key="index"
              class="relative"
            >
              <div
                class="bg-white shadow-md md:shadow-lg p-6 md:p-8 card-hover"
              >
                <div class="flex items-start">
                  <div
                    class="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-md md:text-lg mr-3 md:mr-4 flex-shrink-0"
                  >
                    {{ step.step }}
                  </div>
                  <div>
                    <h3 class="text-lg md:text-xl font-bold text-gray-800 mb-3">
                      {{ step.title }}
                    </h3>
                    <p class="text-gray-600 mb-4 text-sm md:text-base">
                      {{ step.description }}
                    </p>
                    <ul class="space-y-2">
                      <li
                        v-for="(detail, i) in step.details"
                        :key="i"
                        class="flex items-center text-xs md:text-sm text-gray-600"
                      >
                        <span class="text-green-500 mr-2">✓</span>
                        {{ detail }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                v-if="index < enrollmentSteps.length - 1"
                class="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2"
              >
                <div class="text-2xl text-blue-300">→</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Required Documents -->
    <section class="py-12 md:py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="max-w-4xl mx-auto">
          <h2
            class="text-center mb-10 md:mb-12 text-2xl sm:text-3xl md:text-4xl font-light text-[#09033b] tracking-tight"
          >
            Required Documents
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div class="bg-blue-50 p-5 md:p-6 border border-blue-200">
              <h3
                class="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4 flex items-center"
              >
                <span class="text-blue-600 mr-3 text-xl">📄</span>
                New Students
              </h3>
              <ul class="space-y-2 md:space-y-3">
                <li
                  v-for="(doc, i) in newStudentDocs"
                  :key="i"
                  class="flex items-start text-sm md:text-base"
                >
                  <span class="text-green-500 mt-1 mr-2">✓</span>
                  <span class="text-gray-700">{{ doc }}</span>
                </li>
              </ul>
            </div>

            <div class="bg-purple-50 p-5 md:p-6 border border-purple-200">
              <h3
                class="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4 flex items-center"
              >
                <span class="text-purple-600 mr-3 text-xl">🎓</span>
                Transfer Students
              </h3>
              <ul class="space-y-2 md:space-y-3">
                <li
                  v-for="(doc, i) in transferStudentDocs"
                  :key="i"
                  class="flex items-start text-sm md:text-base"
                >
                  <span class="text-green-500 mt-1 mr-2">✓</span>
                  <span class="text-gray-700">{{ doc }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Important Dates -->
    <section
      class="py-12 md:py-20 bg-gradient-to-br from-[#09033b] via-[#231a6f] to-[#09036b] text-white"
    >
      <div class="container mx-auto px-4 sm:px-6">
        <h2
          class="text-center mb-10 md:mb-12 text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight"
        >
          Important Dates
        </h2>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto"
        >
          <div
            v-for="(date, index) in importantDates"
            :key="index"
            class="text-center bg-white bg-opacity-10 p-5 md:p-6 backdrop-blur-sm"
          >
            <div class="text-3xl mb-3 md:mb-4">{{ date.icon }}</div>
            <h3 class="text-lg md:text-xl font-bold mb-2">{{ date.title }}</h3>
            <div class="text-xl md:text-2xl font-bold mb-2">
              {{ date.date }}
            </div>
            <p class="text-blue-100 text-sm md:text-base">
              {{ date.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const enrollmentSteps = [
  {
    step: 1,
    title: "Submit Application",
    description:
      "Complete our comprehensive online application form with all required documents.",
    details: [
      "Online application form",
      "Required documents upload",
      "Application fee payment",
    ],
  },
  {
    step: 2,
    title: "Schedule School Visit",
    description:
      "Tour our facilities and meet with our dedicated admissions team.",
    details: ["School tour", "Meet teachers & staff", "Q&A session"],
  },
  {
    step: 3,
    title: "Student Assessment",
    description:
      "Academic evaluation and family interview to ensure the best fit.",
    details: ["Diagnostic test", "Parent Orientation", "Student interaction"],
  },
  {
    step: 4,
    title: "Complete Enrollment",
    description:
      "Finalize enrollment with paperwork and registration fee payment.",
    details: ["Enrollment contract", "Medical forms", "Payment of fees"],
  },
];

const newStudentDocs = [
  "Completed application form",
  "Birth certificate (certified copy)",
  "Immunization records",
  "Two passport photographs",
  "Parent/Guardian ID copies",
];

const transferStudentDocs = [
  "All new student requirements",
  "Official transcripts from previous school",
  "Transfer certificate",
  "Disciplinary records (if applicable)",
];

const importantDates = [
  {
    title: "Application Opens",
    date: "Active!",
    description: "New academic year applications begin",
    icon: "📅",
  },
  {
    title: "School Closes",
    date: "July 25",
    description: "End of 2024/2025 academic year",
    icon: "⏰",
  },
  {
    title: "School Begins",
    date: "September 9",
    description: "First day of new academic year",
    icon: "🏫",
  },
];
</script>

<style scoped>
.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
