<template>
  <div class="min-h-screen bg-gray-50 font-inter">
    <!-- Tuition & Fees Section -->
    <section id="tuition" class="py-12 md:py-20 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="text-center mb-12 md:mb-16">
          <h2
            class="mb-4 text-2xl sm:text-3xl md:text-4xl font-light text-[#09033b] tracking-tight"
          >
            Tuition & Fees
          </h2>
          <p class="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Transparent pricing for quality education. Choose the grade level to
            see detailed fee structure.
          </p>
          <NuxtLink
            to="/admissions"
            class="inline-flex items-center justify-center px-6 py-3 text-[#09033b] text-base font-medium border border-gray-300 hover:border-[#09033b] hover:bg-gray-50 transition-all duration-300"
          >
            Enrollment Process
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

        <!-- Grade Selection -->
        <div class="md:hidden mb-8">
          <select
            v-model="selectedGrade"
            class="text-black w-full p-3 bg-white shadow-md border border-gray-200 focus:ring-2 focus:ring-blue-500"
          >
            <option
              v-for="grade in gradeOptions"
              :key="grade.key"
              :value="grade.key"
            >
              {{ grade.label }}
            </option>
          </select>
        </div>

        <div class="hidden md:flex justify-center mb-8 md:mb-12">
          <div
            class="bg-white p-1 sm:p-2 shadow-lg flex flex-wrap justify-center"
          >
            <button
              v-for="grade in gradeOptions"
              :key="grade.key"
              @click="selectedGrade = grade.key"
              :class="[
                'px-3 sm:px-4 md:px-6 py-2 md:py-3 font-medium transition-all m-1 ',
                selectedGrade === grade.key
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50',
              ]"
            >
              {{ grade.label }}
            </button>
          </div>
        </div>

        <!-- Tuition Cards -->
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          <div class="bg-white shadow-md md:shadow-lg p-6 md:p-8 card-hover">
            <div class="text-center">
              <div class="text-4xl text-blue-600 mb-4 mx-auto">📅</div>
              <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                Termly Tuition
              </h3>
              <div class="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
                ₦{{ tuitionData[selectedGrade].termly.toLocaleString() }}
              </div>
              <p class="text-gray-600 text-sm md:text-base">
                Full term payment
              </p>
            </div>
          </div>

          <div
            class="bg-white shadow-md md:shadow-lg p-6 md:p-8 card-hover border-2 border-orange-200"
          >
            <div class="text-center">
              <div class="text-4xl text-orange-500 mb-4 mx-auto">✓</div>
              <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                Monthly Plan
              </h3>
              <div class="text-3xl md:text-4xl font-bold text-orange-500 mb-4">
                Installment Payments
              </div>
              <p class="text-gray-600 text-sm md:text-base">
                Per Term (3 payments)
              </p>
            </div>
          </div>

          <div class="bg-white shadow-md md:shadow-lg p-6 md:p-8 card-hover">
            <div class="text-center">
              <div class="text-4xl text-green-600 mb-4 mx-auto">💰</div>
              <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                Additional Fees
              </h3>
              <div class="space-y-2 sm:space-y-3 text-left mt-6">
                <div class="flex justify-between py-2 border-b">
                  <span class="text-gray-600">Registration</span>
                </div>
                <div class="flex justify-between py-2 border-b">
                  <span class="text-gray-600">PACEs</span>
                </div>
                <div class="flex justify-between py-2 border-b">
                  <span class="text-gray-600">Uniforms</span>
                </div>
                <div class="flex justify-between py-2 border-b">
                  <span class="text-gray-600">Books & Materials</span>
                </div>
                <div class="flex justify-between py-2">
                  <span class="text-gray-600">Activity Fee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Discounts & Financial Aid -->
    <section class="py-12 md:py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="text-center mb-12 md:mb-16">
          <h2
            class="mb-4 text-2xl sm:text-3xl md:text-4xl font-light text-[#09033b] tracking-tight"
          >
            Discounts & Financial Aid
          </h2>
          <p class="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            TCAD is a subsidised school and most of the facilities is funded by
            the owner of the school, The Covenant Assembly Mission, and her
            partners. The school fees cover most of the salaries and other
            academic needs. The bus run is subsidised too.
            <strong>The normal discount applies only to tuition. </strong>
          </p>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          <div
            v-for="(discount, index) in discounts"
            :key="index"
            class="bg-gradient-to-br from-blue-50 to-purple-50 p-5 md:p-6 card-hover border border-blue-100"
          >
            <div class="text-center">
              <div
                class="bg-white w-14 h-14 flex items-center justify-center mx-auto mb-4 shadow-md"
              >
                <div
                  class="text-2xl text-blue-600"
                  v-html="discount.icon"
                ></div>
              </div>
              <h3 class="text-lg md:text-xl font-bold text-gray-800 mb-3">
                {{ discount.title }}
              </h3>
              <p class="text-gray-600 text-sm md:text-base mb-4">
                {{ discount.description }}
              </p>
              <div class="text-xl md:text-2xl font-bold text-orange-500">
                {{ discount.savings }}
              </div>
            </div>
          </div>
        </div>

        <div class="mt-10 md:mt-12 text-center">
          <div
            class="bg-gradient-to-r from-green-50 to-blue-50 p-6 md:p-8 max-w-4xl mx-auto border border-green-200"
          >
            <h3
              class="mb-4 text-xl sm:text-2xl md:text-3xl font-light text-[#09033b] tracking-tight"
            >
              Needs-based Financial Aid
            </h3>
            <p class="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
              We offer comprehensive financial assistance programs for families
              who demonstrate financial need. Our aid can cover up to 80% of
              tuition costs based on family circumstances.
            </p>
            <a
              href="tel:+2348036233157"
              class="inline-block bg-gradient-to-r from-orange-500 to-orange-600 font-medium px-5 py-2 md:px-6 md:py-2.5 text-white transition-all duration-300 hover:shadow-md hover:shadow-orange-500/30 hover:-translate-y-0.5"
            >
              Call +2348036233157
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
  daycare: { termly: 129015, monthly: 43005, books: 150 },
  playgroup: { termly: 139015, monthly: 46338, books: 200 },
  nursery: { termly: 150995, monthly: 50332, books: 250 },
  readiness: { termly: 155330, monthly: 51777, books: 300 },
  grade1to3: { termly: 191600, monthly: 63887, books: 350 },
  grade4to6: { termly: 197640, monthly: 65880, books: 400 },
};

const discounts = [
  {
    title: "Teachers & Staff",
    description: "Discount for staff of TCAD",
    icon: "👩‍🏫",
    savings: "80% Off",
  },
  {
    title: "Pastors",
    description: "Discount for Pastors of Churches",
    icon: "🙏",
    savings: "50% Off",
  },
  {
    title: "Church Leaders",
    description: "For Church leaders",
    icon: "👨‍💼",
    savings: "30% Off",
  },
  {
    title: "Church Workers",
    description: "For parents/guardian actively serving",
    icon: "👨‍💻",
    savings: "20% Off",
  },
  {
    title: "Single Parents",
    description: "For single parents",
    icon: "👩‍👦",
    savings: "20% Off",
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
