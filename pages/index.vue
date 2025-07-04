<template>
    <div class="max-w-[100dvw] overflow-x-hidden min-h-[100dvh] bg-gray-50">
  
      <!-- Skip to main content for accessibility -->
      <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50">
        Skip to main content
      </a>
  
      <!-- Main content wrapper -->
      <main id="main-content" role="main" aria-label="Main content">
        <!-- Hero Section with Image Carousel -->
        <section aria-label="Welcome to The Covenant Academy">
          <image-carousel />
        </section>
  
        <!-- Benefits Section -->
        <section aria-label="Why Choose The Covenant Academy">
          <Benefits />
        </section>
  
        <!-- Articles Section -->
        <section aria-label="Deepwater News">
          <ArticlesComp />
        </section>
  
        <!-- Values Section -->
        <section aria-label="Our Core Values">
          <Values />
        </section>
  
        <!-- Mid-section -->
        <section aria-label="Additional Information">
          <midlay />
        </section>
  
        <!-- Gallery Section -->
        <section aria-label="Campus Gallery">
          <Gallery />
        </section>
  
        <!-- Dynamic Section -->
        <section aria-label="Featured Content">
          <DynamicSection />
        </section>
  
        <!-- Recent Blog Posts -->
        <section aria-label="Recent Blog Posts">
          <RecentBlogPosts />
        </section>
  
        <!-- Our Team Section -->
        <section aria-label="Meet Our Team">
          <OurTeam />
        </section>
  
        <!-- School Life Section -->
        <section aria-label="School Life and Activities">
          <SchoolLife />
        </section>
      </main>
  
  
    </div>
  </template>
  
  <script setup>
  // Import Nuxt/Vue composables for SEO
  import { useHead, useSeoMeta } from '#app'
  
  // Set up dynamic SEO meta tags
  useHead({
    title: 'The Covenant Academy - Excellence in Christian Education | Private School',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { name: 'description', content: 'The Covenant Academy provides exceptional Christian education with small class sizes, experienced teachers, and a nurturing environment. Enroll your child in our top-rated private school today.' },
      { name: 'keywords', content: 'Christian school, private school, The Covenant Academy, elementary education, middle school, high school, faith-based education, academic excellence' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'The Covenant Academy' },
      { property: 'og:title', content: 'The Covenant Academy - Excellence in Christian Education' },
      { property: 'og:description', content: 'Discover exceptional Christian education at The Covenant Academy. Small classes, experienced teachers, and a nurturing faith-based environment.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://www.thecovenantacademy.edu' },
      { property: 'og:image', content: 'https://www.thecovenantacademy.edu/images/school-hero.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'The Covenant Academy - Excellence in Christian Education' },
      { name: 'twitter:description', content: 'Discover exceptional Christian education at The Covenant Academy. Small classes, experienced teachers, and a nurturing faith-based environment.' },
      { name: 'twitter:image', content: 'https://www.thecovenantacademy.edu/images/school-hero.jpg' }
    ],
    link: [
      { rel: 'canonical', href: 'https://www.thecovenantacademy.edu' }
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "The Covenant Academy",
          "description": "Christian private school providing exceptional education in a nurturing faith-based environment",
          "url": "https://www.thecovenantacademy.edu",
          "logo": "https://www.thecovenantacademy.edu/images/logo.png",
          "telephone": "+234-803-623-3157",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "8a Kayes street, wuse zone 1",
            "addressLocality": "Abuja",
            "addressRegion": "F.C.T",
            "postalCode": "00000",
            "addressCountry": "NGA"
          },
          "sameAs": [
            "https://www.facebook.com/COVACADEMY",
            "https://www.instagram.com/thecovenantacademyabuja204",
          ]
        })
      }
    ]
  })
  
  // Performance optimization
  onMounted(() => {
    // Lazy load images that are not immediately visible
    const observerOptions = {
      rootMargin: '50px 0px',
      threshold: 0.1
    }
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute('data-src')
            imageObserver.unobserve(img)
          }
        }
      })
    }, observerOptions)
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img)
    })
  })
  </script>
  
  <style scoped>
  /* Critical CSS for above-the-fold content */
  .hero-section {
    min-height: 60vh;
  }
  
  /* Improve Core Web Vitals */
  img {
    max-width: 100%;
    height: auto;
  }
  
  /* Accessibility improvements */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  
  .focus\:not-sr-only:focus {
    position: static;
    width: auto;
    height: auto;
    padding: 0.5rem 1rem;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }
  
  /* Performance optimizations */
  * {
    box-sizing: border-box;
  }
  
  /* Prevent layout shift */
  .image-placeholder {
    background-color: #f3f4f6;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>