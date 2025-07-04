<template>
  <div class="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-16 px-4 sm:px-6 font-inter">
    <div class="max-w-4xl mx-auto">
      <!-- Header with Semantic H1 -->
      <header class="text-center mb-16">
        <div class="inline-flex items-center mb-4">
          <div class="w-3 h-3 bg-[#09033b] rounded-full mr-2"></div>
          <span class="text-sm font-medium text-gray-600 tracking-widest uppercase">
            Our Legacy
          </span>
        </div>
        <h1 class="text-4xl md:text-5xl font-light text-[#09033b] mb-6">
          The Covenant Academy: 20+ Years of Educational Excellence
        </h1>
        <div class="w-24 h-0.5 bg-[#09033b] mx-auto"></div>
      </header>

      <!-- History Content with Semantic Article -->
      <article class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
        <!-- Introduction -->
        <section class="p-8 md:p-12 border-b border-gray-100">
          <div class="flex items-start">
            <div class="text-6xl font-serif text-[#09033b]/10 pr-4 leading-none">“</div>
            <p class="text-lg text-gray-700 leading-relaxed">
              Founded in 2003 through divine inspiration, The Covenant Academy began as a vision to create an institution that nurtures both academic excellence and spiritual values. From humble beginnings with a handful of faithful families, we've grown into a thriving educational community guided by God's providence at every step of our journey.
            </p>
          </div>
        </section>

        <!-- Founding Era -->
        <section class="p-8 md:p-12 border-b border-gray-100">
          <h2 class="text-2xl font-semibold text-[#09033b] mb-4 flex items-center">
            <span class="bg-[#09033b] text-white text-sm font-medium px-3 py-1 rounded mr-3">2003-2006</span>
            The Foundation Years
          </h2>
          <div class="pl-1 space-y-4">
            <p class="text-gray-700">
              The Covenant Academy opened its doors in 2004 with just the founding families - Dad, Mum, the Uke's and the Alalades. Their unwavering faith established our core values. In 2005, we welcomed our first students to modest facilities in Nouakchott, pioneering an educational approach that balanced academic rigor with spiritual development.
            </p>
            <p class="text-gray-700">
              By 2006, our growing student body required dedicated educators. Our first staff members brought unique gifts to nurture young minds, establishing our tradition of personalized attention that continues today. These foundational years cemented our commitment to faith-based education in a nurturing environment.
            </p>
          </div>
        </section>

        <!-- Building Traditions -->
        <section class="p-8 md:p-12 border-b border-gray-100">
          <h2 class="text-2xl font-semibold text-[#09033b] mb-4 flex items-center">
            <span class="bg-[#09033b] text-white text-sm font-medium px-3 py-1 rounded mr-3">2007-2012</span>
            Establishing Traditions
          </h2>
          <div class="pl-1 space-y-4">
            <p class="text-gray-700">
              2007 marked our first Interhouse Sports Competition, fostering school spirit and healthy competition - a tradition that remains a calendar highlight. The 2008 formation of our Board of Trustees provided governance to steward our growing institution. We celebrated a significant milestone in 2009 with our inaugural graduation ceremony.
            </p>
            <p class="text-gray-700">
              Continued growth led to our 2010 relocation to 8a Kayes Street, expanding facilities for our community. The 2011 establishment of the Parent-Teacher Committee strengthened our home-school partnership, while 2012 saw our graduation ceremonies evolve into cherished formal traditions celebrating student achievements.
            </p>
          </div>
        </section>

        <!-- Community Growth -->
        <section class="p-8 md:p-12 border-b border-gray-100">
          <h2 class="text-2xl font-semibold text-[#09033b] mb-4 flex items-center">
            <span class="bg-[#09033b] text-white text-sm font-medium px-3 py-1 rounded mr-3">2013-2019</span>
            Community Expansion
          </h2>
          <div class="pl-1 space-y-4">
            <p class="text-gray-700">
              The 2013-2015 period brought key developments: honoring foundational parents, celebrating our founder's consecration, and welcoming administrators who shaped our character. The introduction of 'Upin' enhanced our curriculum, while educational excursions broadened student horizons beyond classroom walls.
            </p>
            <p class="text-gray-700">
              Our 2017 scholarship program made quality education accessible, followed by establishing our chapel in 2018 to strengthen spiritual development. Transportation services expanded in 2019 with dedicated school buses, supported by community members who generously provided interim transportation solutions.
            </p>
          </div>
        </section>

        <!-- Modern Era -->
        <section class="p-8 md:p-12">
          <h2 class="text-2xl font-semibold text-[#09033b] mb-4 flex items-center">
            <span class="bg-[#09033b] text-white text-sm font-medium px-3 py-1 rounded mr-3">2020-Present</span>
            Innovation & Impact
          </h2>
          <div class="pl-1 space-y-4">
            <p class="text-gray-700">
              Recent years feature exciting developments: extracurricular clubs (2020), Nigerian Day cultural celebrations (2021), and full adoption of the ACE curriculum (2022) following international research. We've celebrated alumni impacting diverse fields globally and witnessed God's protection through a 2024 legal victory.
            </p>
            <p class="text-gray-700">
              In 2025, we experienced miraculous provision with two years' rent provided at once, enabling enhanced focus on our mission. As we move forward, The Covenant Academy remains committed to nurturing minds, building Christian character, and empowering generations to make a positive difference in their world.
            </p>
          </div>
        </section>

        <!-- Closing Banner -->
        <div class="bg-gradient-to-r from-[#09033b] to-blue-900 p-8 md:p-12">
          <div class="max-w-2xl mx-auto text-center">
            <p class="text-xl font-light tracking-wide text-white/90 mb-4">
              "Shaping Future Leaders Through Faith and Knowledge"
            </p>
            <p class="text-white/70 text-lg font-medium">The Covenant Academy: The School of Tomorrow</p>
          </div>
        </div>
      </article>

      <!-- School Crest with Lazy Loading -->
      <div class="mt-12 flex justify-center">
        <div class="bg-white p-4 rounded-full shadow-lg">
          <img 
            src="/assets/images/tcad-nbg.png" 
            alt="The Covenant Academy Crest" 
            width="80"
            height="80"
            loading="lazy"
            class="w-16 h-16 object-contain"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// JSON-LD structured data as a script element
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "The Covenant Academy",
        "description": "Christian school providing academic excellence with spiritual values since 2003",
        "foundingDate": "2003",
        "location": "8a Kayes Street, Wuse Zone 1, Abuja, Nigeria",
        "image": "/assets/images/tcad-nbg.png",
        "founder": {
          "@type": "Person",
          "name": "Founder's Name" // Replace with actual name
        },
        "url": "https://yourschoolwebsite.com",
        "sameAs": [
          "https://facebook.com/COVACADEMY",
          "https://instagram.com/thecovenantacademyabuja204"
        ]
      })
    }
  ],

  // Standard head configuration
  title: 'Our History - The Covenant Academy',
  meta: [
    { 
      name: 'description', 
      content: 'Explore the 20+ year journey of The Covenant Academy - from divine calling in 2003 to becoming a beacon of Christian education excellence.' 
    },
    {
      property: 'og:title',
      content: 'History of The Covenant Academy | Established 2003'
    },
    {
      property: 'og:description',
      content: 'Discover how The Covenant Academy grew from humble beginnings to become The School of Tomorrow through faith, innovation, and community partnership.'
    },
    {
      property: 'og:image',
      content: 'https://thecovenantacademy.org/assets/images/tcad-nbg.png'
    },
    {
      name: 'keywords',
      content: 'covenant academy history, Christian school Nigeria, education timeline, faith-based education, school founding,A.C.E, A.C.E schools, Schools in Abuja, Nigerian A.C.E schools, best education'
    },
    {
      name: 'robots',
      content: 'index, follow'
    }
  ],
  link: [
    { rel: 'canonical', href: 'https://thecovenantacademy.org/history' }
  ]
})

// Performance optimization for fonts
const fontLink = {
  rel: 'preload',
  href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  as: 'style',
  onload: "this.onload=null;this.rel='stylesheet'"
}
useHead({
  link: [fontLink]
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.font-inter {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  font-display: swap;
}

/* Performance Optimizations */
* {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Reduced Motion Preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}

/* Print Styles */
@media print {
  .bg-gradient-to-br, .bg-gradient-to-r {
    background: white !important;
  }
  .shadow-xl, .rounded-2xl {
    box-shadow: none;
    border-radius: 0;
  }
  .py-16 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
  .hidden-print {
    display: none !important;
  }
}

/* Accessibility Focus States */
:focus-visible {
  outline: 2px solid #09033b;
  outline-offset: 2px;
}

/* Backdrop filter fallback */
@supports not (backdrop-filter: blur(4px)) {
  .backdrop-blur-sm {
    background-color: rgba(255, 255, 255, 0.95);
  }
}
</style>