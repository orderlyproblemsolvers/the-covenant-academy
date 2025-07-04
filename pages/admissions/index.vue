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
        </div>

        <!-- Grade Selection - Mobile -->
        <div class="md:hidden mb-8">
          <select
            v-model="selectedGrade"
            class="text-black w-full p-3 bg-white shadow-md rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
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

        <!-- Grade Selection - Desktop -->
        <div class="hidden md:flex justify-center mb-8 md:mb-12">
          <div
            class="bg-white p-1 sm:p-2 shadow-lg rounded-lg flex flex-wrap justify-center"
          >
            <button
              v-for="grade in gradeOptions"
              :key="grade.key"
              @click="selectedGrade = grade.key"
              :class="[
                'px-3 sm:px-4 md:px-6 py-2 md:py-3 font-medium transition-all m-1 rounded',
                selectedGrade === grade.key
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50',
              ]"
              :aria-label="`Select ${grade.label} grade`"
            >
              {{ grade.label }}
            </button>
          </div>
        </div>

        <!-- Tuition Cards -->
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          <div
            class="bg-white shadow-md md:shadow-lg p-6 md:p-8 card-hover rounded-xl"
          >
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
            class="bg-white shadow-md md:shadow-lg p-6 md:p-8 card-hover border-2 border-orange-200 rounded-xl"
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

          <div
            class="bg-white shadow-md md:shadow-lg p-6 md:p-8 card-hover rounded-xl"
          >
            <div class="text-center">
              <div class="text-4xl text-green-600 mb-4 mx-auto">💰</div>
              <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                Additional Fees
              </h3>
              <div class="space-y-2 sm:space-y-3 text-left mt-6">
                <div class="flex justify-between py-2 border-b">
                  <span class="text-gray-600">Registration</span>
                  <span class="font-medium">₦3,000</span>
                </div>
                <div class="flex justify-between py-2 border-b">
                  <span class="text-gray-600">PACEs</span>
                  <span class="font-medium"
                    >₦{{
                      tuitionData[selectedGrade].books.toLocaleString()
                    }}</span
                  >
                </div>
                <div class="flex justify-between py-2 border-b">
                  <span class="text-gray-600">Books & Materials</span>
                  <span class="font-medium">₦5,000</span>
                </div>
                <div class="flex justify-between py-2">
                  <span class="text-gray-600">Activity Fee</span>
                  <span class="font-medium">₦2,500</span>
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
            class="bg-gradient-to-br from-blue-50 to-purple-50 p-5 md:p-6 card-hover border border-blue-100 rounded-xl"
          >
            <div class="text-center">
              <div
                class="bg-white w-14 h-14 flex items-center justify-center mx-auto mb-4 shadow-md rounded-lg"
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
            class="bg-gradient-to-r from-green-50 to-blue-50 p-6 md:p-8 max-w-4xl mx-auto border border-green-200 rounded-xl"
          >
            <h3
              class="mb-4 text-xl sm:text-2xl md:text-3xl font-light text-[#09033b] tracking-tight"
            >
              Needs-based Financial Aid
            </h3>
            <p class="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
              We offer comprehensive financial assistance programs for families
              who demonstrate financial need. Our aid can cover up to 80% of
              tuition costs based on family circumstances. If none of the
              categories listed above is applicable to you and are still in need
              of financial aid/discounts, kindly call the number below.
            </p>
            <a
              href="tel:+2348036233157"
              class="inline-block bg-gradient-to-r from-orange-500 to-orange-600 font-medium px-5 py-2 md:px-6 md:py-2.5 text-white rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-orange-500/30 hover:-translate-y-0.5 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Call +2348036233157
            </a>
          </div>
        </div>
      </div>
    </section>

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
                class="bg-white shadow-md md:shadow-lg p-6 md:p-8 card-hover rounded-xl"
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
            <div
              class="bg-blue-50 p-5 md:p-6 border border-blue-200 rounded-xl"
            >
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

            <div
              class="bg-purple-50 p-5 md:p-6 border border-purple-200 rounded-xl"
            >
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
            class="text-center bg-white bg-opacity-10 rounded-xl p-5 md:p-6 backdrop-blur-sm"
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

    <!-- Contact & Visit -->
    <!-- Contact & Visit -->
<section class="py-12 md:py-20 bg-gray-50 ">
  <div class="container mx-auto px-4 sm:px-6">
    <div class="max-w-6xl mx-auto">
      <h2
        class="mb-4 text-2xl sm:text-3xl md:text-4xl font-light text-[#09033b] tracking-tight text-center"
      >
        Connect With Us
      </h2>

      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12"
      >
        <!-- Map Display Section -->
        <div class="bg-white shadow-md md:shadow-lg p-6 md:p-8 rounded-xl z-0">
          <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
            Visit Our Location
          </h3>
          <p class="text-gray-600 mb-4 text-sm md:text-base">
            8A Kayes St, off Nouakchott Street, Wuse Zone 1, Abuja
          </p>
          <ClientOnly>
            <MapDisplay />
          </ClientOnly>
          <div class="mt-4 text-center">
            <a
              href="https://maps.google.com?q=8A+Kayes+St,+off+Nouakchott+Street,+Wuse+Zone+1,+Abuja"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block bg-blue-600 font-medium px-5 py-2 md:px-6 md:py-2.5 text-white rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-blue-500/30 hover:-translate-y-0.5 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Get Directions
            </a>
          </div>
        </div>

        <div class="space-y-6 md:space-y-8">
          <div
            class="bg-white shadow-md md:shadow-lg p-6 md:p-8 rounded-xl"
          >
            <h3
              class="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6"
            >
              Contact Information
            </h3>

            <div class="space-y-3 md:space-y-4">
              <div class="flex items-start">
                <span class="text-blue-600 text-xl mr-3 mt-1">📍</span>
                <div>
                  <div
                    class="font-semibold text-gray-800 text-sm md:text-base"
                  >
                    Address
                  </div>
                  <div class="text-gray-600 text-sm md:text-base">
                    8A Kayes St, off Nouakchott Street, Wuse Zone 1, Abuja
                  </div>
                </div>
              </div>

              <div class="flex items-start">
                <span class="text-blue-600 text-xl mr-3 mt-1">📞</span>
                <div>
                  <div
                    class="font-semibold text-gray-800 text-sm md:text-base"
                  >
                    Phone
                  </div>
                  <div class="text-gray-600 text-sm md:text-base">
                    +234 (0)8036233157
                  </div>
                </div>
              </div>

              <div class="flex items-start">
                <span class="text-blue-600 text-xl mr-3 mt-1">📧</span>
                <div>
                  <div
                    class="font-semibold text-gray-800 text-sm md:text-base"
                  >
                    Email
                  </div>
                  <div class="text-gray-600 text-sm md:text-base">
                    tcadinfo@gmail.com
                  </div>
                </div>
              </div>

              <div class="flex items-start">
                <span class="text-blue-600 text-xl mr-3 mt-1">🕒</span>
                <div>
                  <div
                    class="font-semibold text-gray-800 text-sm md:text-base"
                  >
                    Office Hours
                  </div>
                  <div class="text-gray-600 text-sm md:text-base">
                    Mon-Fri: 8:00 AM - 4:00 PM
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="bg-gradient-to-br from-green-400 to-blue-500 text-white p-6 md:p-8 rounded-xl"
          >
            <h3 class="text-lg md:text-xl font-bold mb-3 md:mb-4">
              Ready to Apply?
            </h3>
            <p class="mb-4 md:mb-6 opacity-90 text-sm md:text-base">
              Start your child's journey with us today. Our online
              application is quick and easy to complete.
            </p>
            <button
              class="bg-white text-blue-600 px-5 py-2.5 md:px-6 md:py-3 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  </div>
</template>

<script setup>
// Meta tags for SEO
useHead({
  title: "Admissions - Excellence Academy",
  meta: [
    {
      name: "description",
      content:
        "Join Excellence Academy - Learn about our tuition, enrollment process, and financial aid options. Schedule a campus tour today!",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
});

// Reactive data
const selectedGrade = ref("daycare");

const tourForm = ref({
  parentName: "",
  phone: "",
  email: "",
  grade: "",
  preferredDate: "",
});

// Computed properties and data
const gradeOptions = [
  { key: "daycare", label: "Day Care" },
  { key: "playgroup", label: "Play Group" },
  { key: "nursery", label: "Nursery" },
  { key: "readiness", label: "Reading Readiness" },
  { key: "grade1to3", label: "Grade 1-3" },
  { key: "grade4to6", label: "Grade 4-6" },
];

const tuitionData = {
  daycare: {
    termly: 129015,
    monthly: 43005,
    registration: 3000,
    books: 150,
  },
  playgroup: {
    termly: 139015,
    monthly: 46338,
    registration: 3000,
    books: 200,
  },
  nursery: {
    termly: 150995,
    monthly: 50332,
    registration: 3000,
    books: 250,
  },
  readiness: {
    termly: 155330,
    monthly: 51777,
    registration: 3000,
    books: 300,
  },
  grade1to3: {
    termly: 191600,
    monthly: 63887,
    registration: 3000,
    books: 350,
  },
  grade4to6: {
    termly: 197640,
    monthly: 65880,
    registration: 3000,
    books: 400,
  },
};

const discounts = [
  {
    title: "Teachers & Staff",
    description: "Discount for staff of TCAD",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-blue-600" aria-hidden="true">
  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
  <circle cx="9" cy="7" r="4"></circle>
  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
</svg>`,
    savings: "80% Off",
  },
  {
    title: "Pastors",
    description: "Discount for Pastors of Churches",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-blue-600" aria-hidden="true">
  <path d="M18 22H6a2 2 0 0 1-2-2V10l-4-4l10-4l10 4v10a2 2 0 0 1-2 2Z"></path>
  <path d="M8 22V14l4-2v10"></path>
  <path d="M12 22V14"></path>
  <path d="M10 8h4"></path>
</svg>`,
    savings: "50% Off",
  },
  {
    title: "Church Leaders",
    description: "For Church leaders",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-blue-600" aria-hidden="true">
  <circle cx="12" cy="8" r="5"></circle>
  <path d="M20 21a8 8 0 1 0-16 0"></path>
  <path d="M12 13l3 3m-3-3l-3 3"></path>
</svg>`,
    savings: "30% Off",
  },
  {
    title: "Church Workers",
    description: "For parents/guardian actively serving",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-blue-600" aria-hidden="true">
  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
  <circle cx="9" cy="7" r="4"></circle>
  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  <circle cx="18" cy="18" r="2"></circle>
</svg>`,
    savings: "20% Off",
  },
  {
    title: "Single Parents",
    description: "For single parents",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-blue-600" aria-hidden="true">
  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
  <circle cx="8.5" cy="7" r="4"></circle>
  <line x1="20" y1="8" x2="20" y2="14"></line>
  <line x1="23" y1="11" x2="17" y2="11"></line>
</svg>`,
    savings: "20% Off",
  },
];

const enrollmentSteps = [
  {
    step: 1,
    title: "Submit Application",
    description:
      "Complete our comprehensive online application form with all required documents.",
    details: [
      "Online application form",
      "Required documents upload",
      "Application fee payment (non-refundable)",
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
  "Previous school transcripts",
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
    date: "January 15",
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

const allGrades = [
  "Day Care",
  "Play Group",
  "Nursery",
  "Reading Readiness",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
];

// Methods
const submitTourRequest = () => {
  // Form validation
  if (
    !tourForm.value.parentName ||
    !tourForm.value.phone ||
    !tourForm.value.email ||
    !tourForm.value.grade ||
    !tourForm.value.preferredDate
  ) {
    alert("Please fill in all required fields");
    return;
  }

  // In a real app, you would send this to a backend
  console.log("Tour request submitted:", tourForm.value);

  alert("Thank you! We will contact you soon to schedule your campus tour.");

  // Reset form
  tourForm.value = {
    parentName: "",
    phone: "",
    email: "",
    grade: "",
    preferredDate: "",
  };
};
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

@media (max-width: 768px) {
  .card-hover:hover {
    transform: none;
    box-shadow: none;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}
</style>
