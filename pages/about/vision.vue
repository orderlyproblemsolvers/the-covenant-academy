<template>
  <div class="relative w-full bg-gray-50 font-inter">
    <!-- Subtle Background Pattern -->
    <div class="absolute inset-0 opacity-3">
      <svg width="60" height="60" viewBox="0 0 60 60" class="absolute top-0 left-0 w-full h-full">
        <defs>
          <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1" fill="#09033b"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)"/>
      </svg>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
      
      <!-- Vision Section -->
      <section class="mb-32 group">
        <div class="relative">
          <!-- Minimal geometric accent -->
          <div class="absolute -top-4 -left-4 w-16 h-16 border border-gray-100 opacity-60"></div>
          
          <div class="relative bg-gray-50 border border-gray-100 hover:border-[#09033b]/20 transition-all duration-500 overflow-hidden">
            <!-- Subtle top accent line -->
            <div class="h-1 bg-gradient-to-r from-[#09033b] to-[#09033b]/20"></div>
            
            <div class="p-8 lg:p-12">
              <div class="flex flex-col lg:flex-row gap-16 items-center">
                <div class="lg:w-2/3 space-y-8">
                  <!-- Badge -->
                  <div class="inline-flex items-center space-x-3 mb-6">
                    <div class="w-2 h-2 bg-[#09033b] rounded-full"></div>
                    <span class="text-sm font-medium text-gray-600 tracking-wide uppercase">
                      Our Vision
                    </span>
                  </div>

                  <h2 class="text-5xl md:text-6xl font-light leading-[0.9] text-[#09033b] tracking-tight mb-8">
                    Equipping
                    <span class="font-medium block">Tomorrow's</span>
                    <span class="font-normal block text-gray-400">Generation</span>
                  </h2>
                  
                  <!-- Subtle accent line -->
                  <div class="w-20 h-px bg-[#09033b] mb-8"></div>
                  
                  <div class="space-y-6 max-w-2xl">
                    <p class="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                      Our vision is to provide the most excellent standard of education that will equip today's child with 21st century skills in a God centered and individualized learning environment.
                    </p>
                    
                    <p class="text-base text-gray-500 leading-relaxed">
                      The Covenant Academy (TCA) utilizes a world-based curriculum with a strong emphasis on Christian Character. The curriculum is a blend of Nigerian American and British bench marks. It provides your child with the opportunity to have both an international education and exposures as well as a full grounding Nigerian curriculum.
                    </p>
                  </div>
                </div>
                
                <div class="lg:w-1/3 relative group">
                  <div class="relative overflow-hidden">
                    <!-- Geometric accent -->
                    <div class="absolute -top-2 -right-2 w-20 h-20 border border-gray-200 opacity-40 z-10"></div>
                    
                    <div class="relative bg-[#09033b] p-1">
                      <img 
                        src="/assets/images/dad.png" 
                        alt="Parents and child" 
                        class="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    
                    <!-- Bottom accent -->
                    <div class="absolute -bottom-2 -left-2 w-12 h-12 bg-[#09033b] opacity-10"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Cards Section -->
      <section class="mb-32">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center space-x-3 mb-6">
            <div class="w-2 h-2 bg-[#09033b] rounded-full"></div>
            <span class="text-sm font-medium text-gray-600 tracking-wide uppercase">
              Our Approach
            </span>
          </div>
          <h2 class="text-4xl md:text-5xl font-light text-[#09033b] mb-4">Excellence in Every Detail</h2>
          <div class="w-16 h-px bg-[#09033b] mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(card, index) in cards"
            :key="index"
            class="group relative bg-white border border-gray-100 hover:border-[#09033b]/20 hover:shadow-lg transition-all duration-500 overflow-hidden"
          >
            <!-- Hover accent -->
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#09033b] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div class="p-8 h-full flex flex-col">
              <div class="flex items-start mb-6">
                <div class="p-3 bg-gray-50 group-hover:bg-[#09033b]/5 transition-colors duration-300 mr-4">
                  <svg class="w-6 h-6 text-[#09033b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <component :is="getIconComponent(card.icon)" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-xl font-medium text-[#09033b] mb-2 group-hover:text-[#0a0440] transition-colors">
                    {{ card.title }}
                  </h3>
                  <div class="w-8 h-px bg-gray-200 group-hover:bg-[#09033b] transition-colors duration-300"></div>
                </div>
              </div>
              
              <p class="text-gray-600 leading-relaxed flex-grow font-light">{{ card.text }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Values Section -->
      <section class="mb-32">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center space-x-3 mb-6">
            <div class="w-2 h-2 bg-[#09033b] rounded-full"></div>
            <span class="text-sm font-medium text-gray-600 tracking-wide uppercase">
              Our Foundation
            </span>
          </div>
          <h2 class="text-4xl md:text-5xl font-light text-[#09033b] mb-4">
            The Way of
            <span class="font-medium">TCA</span>
          </h2>
          <div class="w-16 h-px bg-[#09033b] mx-auto"></div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(value, index) in tcaValues" 
            :key="index"
            class="group relative bg-white border border-gray-100 hover:border-[#09033b]/20 hover:shadow-lg transition-all duration-500 overflow-hidden"
          >
            <!-- Hover accent -->
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#09033b] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div class="p-8 h-full">
              <div class="flex items-start space-x-6">
                <!-- Elegant number styling -->
                <div class="flex-shrink-0">
                  <span class="text-3xl font-light text-[#09033b] opacity-40 group-hover:opacity-60 transition-opacity">
                    {{ String(index + 1).padStart(2, '0') }}
                  </span>
                  <div class="w-8 h-px bg-[#09033b] opacity-20 group-hover:opacity-40 transition-opacity mt-2"></div>
                </div>
                
                <div class="flex-1">
                  <p class="text-gray-700 leading-relaxed font-light">{{ value }}</p>
                </div>
              </div>
            </div>

            <!-- Subtle geometric accent -->
            <div class="absolute bottom-4 right-4 w-8 h-8 border border-gray-100 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
          </div>
        </div>
      </section>

      <!-- Video Section -->
      <section class="mb-32">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center space-x-3 mb-6">
            <div class="w-2 h-2 bg-[#09033b] rounded-full"></div>
            <span class="text-sm font-medium text-gray-600 tracking-wide uppercase">
              Discover TCA
            </span>
          </div>
          <h2 class="text-4xl md:text-5xl font-light text-[#09033b] mb-4">
            Abuja's Best
            <span class="font-medium">Kept Secret</span>
          </h2>
          <div class="w-16 h-px bg-[#09033b] mx-auto"></div>
        </div>

        <div class="relative group max-w-4xl mx-auto">
          <!-- Geometric accents -->
          <div class="absolute -top-4 -left-4 w-16 h-16 border border-gray-100 opacity-40"></div>
          <div class="absolute -bottom-4 -right-4 w-12 h-12 bg-[#09033b] opacity-10"></div>
          
          <div class="relative bg-white border border-gray-100 group-hover:border-[#09033b]/20 transition-all duration-500 overflow-hidden">
            <!-- Accent line -->
            <div class="h-1 bg-gradient-to-r from-[#09033b] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div class="p-2">
              <div class="aspect-w-16 aspect-h-9 rounded overflow-hidden">
                <iframe
                  class="w-full h-[400px] md:h-[500px]"
                  src="https://www.youtube-nocookie.com/embed/s-byicEprNU?si=W3_JrSSloIwYfUUs"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Traits Section -->
      <section class="mb-20">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center space-x-3 mb-6">
            <div class="w-2 h-2 bg-[#09033b] rounded-full"></div>
            <span class="text-sm font-medium text-gray-600 tracking-wide uppercase">
              Character Development
            </span>
          </div>
          <h2 class="text-4xl md:text-5xl font-light text-[#09033b] mb-4">
            60 Character Traits
            <span class="font-medium block">of A.C.E</span>
          </h2>
          <div class="w-16 h-px bg-[#09033b] mx-auto mb-8"></div>
          <p class="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Building strong moral foundations through comprehensive character education that shapes hearts and minds.
          </p>
        </div>
        
        <div class="flex flex-wrap justify-center gap-3 max-w-6xl mx-auto">
          <span
            v-for="trait in traits"
            :key="trait"
            class="group relative py-3 px-6 bg-white text-gray-700 text-sm font-medium border border-gray-100 hover:border-[#09033b]/20 hover:bg-[#09033b]/5 hover:text-[#09033b] transition-all duration-300 cursor-default"
          >
            {{ trait }}
            <!-- Subtle hover accent -->
            <div class="absolute bottom-0 left-0 w-full h-px bg-[#09033b] opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </span>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Custom SVG icon components
const IconEye = {
  template: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />`
};

const IconBook = {
  template: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />`
};

const IconHeart = {
  template: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />`
};

const IconAcademic = {
  template: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l9-5-9-5-9 5 9 5z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />`
};

const IconValues = {
  template: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />`
};

const IconGlobal = {
  template: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`
};

const traits = ref([
  "Attentiveness", "Availability", "Boldness", "Compassion", "Contentment", 
  "Creativity", "Decisiveness", "Dependability", "Determination", "Diligence",
  "Discernment", "Discretion", "Endurance", "Enthusiasm", "Faith", 
  "Flexibility", "Forgiveness", "Generosity", "Gentleness", "Gratefulness",
  "Honesty", "Hospitality", "Humility", "Initiative", "Joyfulness", 
  "Justice", "Loyalty", "Meekness", "Obedience", "Orderliness",
  "Patience", "Persuasiveness", "Punctuality", "Resourcefulness", "Responsibility",
  "Reverence", "Security", "Self-Control", "Sensitivity", "Sincerity",
  "Thoroughness", "Thriftiness", "Tolerance", "Truthfulness", "Virtue",
  "Wisdom", "Deference", "Endurance", "Availability", "Honor",
  "Love", "Faithfulness", "Cautiousness", "Courage", "Compassion",
  "Trustworthiness", "Friendliness", "Generosity"
]);

const cards = [
  {
    icon: 'academic',
    title: 'Academic Excellence',
    text: 'Our world-based curriculum blends Nigerian, American, and British benchmarks to provide a comprehensive education that meets international standards while maintaining strong local foundations.'
  },
  {
    icon: 'values',
    title: 'Christian Character',
    text: 'We place strong emphasis on Christian values and character development, nurturing students who demonstrate integrity, compassion, and moral leadership in all aspects of life.'
  },
  {
    icon: 'global',
    title: 'Global Perspective',
    text: 'Students benefit from both international education and exposures while maintaining a full grounding in Nigerian curriculum, preparing them to thrive in an interconnected world.'
  },
  {
    icon: 'heart',
    title: 'Individualized Learning',
    text: "We recognize and nurture each child's unique talents and learning style, providing personalized attention that helps every student reach their full potential."
  },
  {
    icon: 'eye',
    title: '21st Century Skills',
    text: "Our innovative approach equips students with critical thinking, creativity, collaboration, and technological literacy needed to succeed in today's rapidly changing world."
  },
  {
    icon: 'book',
    title: 'Holistic Development',
    text: 'Beyond academics, we foster spiritual, physical, emotional, and social growth, developing well-rounded individuals prepared for lifelong success.'
  }
];

const tcaValues = [
  "To seek the exceptional",
  "To serve with humility",
  "To live with tolerance", 
  "To care with compassion",
  "To work in unity",
  "To lead with joyfulness",
  "To walk in the fear of the Lord"
];

const getIconComponent = (icon) => {
  const icons = {
    'eye': IconEye,
    'book': IconBook,
    'heart': IconHeart,
    'academic': IconAcademic,
    'values': IconValues,
    'global': IconGlobal
  };
  return icons[icon] || null;
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, opacity, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom selection color */
::selection {
  background-color: #09033b;
  color: white;
}

/* Enhanced focus states */
*:focus {
  outline: 2px solid #09033b;
  outline-offset: 2px;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .text-gray-400,
  .text-gray-500,
  .text-gray-600,
  .text-gray-700 {
    color: #000;
  }
  
  .border-gray-100,
  .border-gray-200 {
    border-color: #000;
  }
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .text-4xl { font-size: 2.25rem; }
  .text-5xl { font-size: 2.5rem; }
  .text-6xl { font-size: 3rem; }
}
</style>