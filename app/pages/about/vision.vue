<template>
  <div class="relative w-full bg-[#FDFDFD] font-inter selection:bg-[#09033b] selection:text-white">
    
    <div class="absolute inset-0 pointer-events-none opacity-[0.03]">
      <svg width="100%" height="100%">
        <pattern id="premium-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="#09033b" stroke-width="1" fill="none"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#premium-grid)" />
      </svg>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      
      <section class="mb-32">
        <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div class="lg:w-3/5 space-y-8">
            <div class="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white border border-gray-100 text-[#09033b] text-xs font-bold tracking-widest uppercase shadow-sm">
              <span class="w-2 h-2 rounded-full bg-[#FF7F50] animate-pulse"></span>
              The School of Tomorrow
            </div>

            <h1 class="text-4xl md:text-7xl font-bold text-[#09033b] leading-[1.1] tracking-tighter">
              Equipping <br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#09033b] to-[#4f46e5]">Tomorrow's</span> <br/>
              Generation
            </h1>

            <div class="h-1 w-20 bg-[#FF7F50] rounded-full"></div>

            <div class="space-y-6 max-w-2xl">
              <p class="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                Our vision is to provide the most excellent standard of education that will equip today's child with 21st century skills in a God-centered and individualized learning environment.
              </p>
              <p class="text-base text-gray-500 leading-relaxed">
                TCA utilizes a world-based curriculum with a strong emphasis on Christian Character, blending Nigerian, American, and British benchmarks.
              </p>
            </div>
          </div>

          <div class="lg:w-2/5 relative">
            <div class="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group">
              <img 
                src="/images/dad.png" 
                alt="Our Vision" 
                class="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#09033b]/40 to-transparent"></div>
            </div>
            <div class="absolute -top-6 -right-6 w-32 h-32 bg-blue-50 rounded-full blur-3xl -z-10"></div>
            <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-[#FF7F50]/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </section>

      <section class="mb-32">
        <div class="text-center mb-16">
          <h2 class="text-xs font-black uppercase tracking-[0.4em] text-gray-400 mb-4">Our Approach</h2>
          <p class="text-3xl md:text-5xl font-bold text-[#09033b]">Excellence in Every Detail</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(card, index) in cards"
            :key="index"
            class="group p-10 bg-white border border-gray-100 rounded-[2.5rem] hover:border-[#09033b] hover:shadow-2xl hover:shadow-[#09033b]/10 transition-all duration-500"
          >
            <div class="w-14 h-14 rounded-2xl bg-gray-50 text-[#09033b] flex items-center justify-center mb-8 group-hover:bg-[#09033b] group-hover:text-white transition-all duration-500">
              <component :is="getIconComponent(card.icon)" class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold text-[#09033b] mb-4">{{ card.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed font-light">{{ card.text }}</p>
          </div>
        </div>
      </section>

      <section class="mb-32 py-20 bg-[#09033b] rounded-[4rem] text-white relative overflow-hidden">
        <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div class="container mx-auto px-10">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-bold mb-4">The Way of TCA</h2>
            <div class="w-16 h-1 bg-[#FF7F50] mx-auto rounded-full"></div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="(value, index) in tcaValues" 
              :key="index"
              class="flex items-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group"
            >
              <span class="text-3xl font-black text-white/20 group-hover:text-[#FF7F50] transition-colors">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
              <p class="text-lg font-light text-blue-50 group-hover:translate-x-1 transition-transform">
                {{ value }}
              </p>
            </div>
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

      <section class="mb-20">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-6xl font-bold text-[#09033b] mb-6">60 Character Traits</h2>
          <p class="text-gray-500 max-w-xl mx-auto font-light leading-relaxed">
            Building strong moral foundations through A.C.E comprehensive character education.
          </p>
        </div>
        
        <div class="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
          <span
            v-for="trait in traits"
            :key="trait"
            class="px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-bold text-[#09033b] hover:bg-[#09033b] hover:text-white hover:scale-110 transition-all duration-300 cursor-default shadow-sm"
          >
            {{ trait }}
          </span>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Logic remains identical to your data structure
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
  "Wisdom", "Deference", "Honor", "Love", "Faithfulness", "Cautiousness", "Courage", 
  "Trustworthiness", "Friendliness"
]);

const cards = [
  { icon: 'academic', title: 'Academic Excellence', text: 'Our world-based curriculum blends Nigerian, American, and British benchmarks to meet international standards.' },
  { icon: 'values', title: 'Christian Character', text: 'Integrity, compassion, and moral leadership nurtured through daily character development.' },
  { icon: 'global', title: 'Global Perspective', text: 'Preparing students to thrive in an interconnected world with local and international exposure.' },
  { icon: 'heart', title: 'Individualized Learning', text: "Nurturing unique talents with personalized attention to help every student reach potential." },
  { icon: 'eye', title: '21st Century Skills', text: "Equipping students with critical thinking, creativity, collaboration, and technological literacy." },
  { icon: 'book', title: 'Holistic Development', text: 'Fostering spiritual, physical, emotional, and social growth for lifelong success.' }
];

const tcaValues = [
  "To seek the exceptional", "To serve with humility", "To live with tolerance", 
  "To care with compassion", "To work in unity", "To lead with joyfulness",
  "To walk in the fear of the Lord"
];

// Icons map to standard library or simplified SVGs
const getIconComponent = (icon) => {
  const icons = {
    'eye': 'i-heroicons-eye',
    'book': 'i-heroicons-book-open',
    'heart': 'i-heroicons-heart',
    'academic': 'i-heroicons-academic-cap',
    'values': 'i-heroicons-shield-check',
    'global': 'i-heroicons-globe-alt'
  };
  return icons[icon] || 'i-heroicons-star';
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* Custom selection */
::selection {
  background: #09033b;
  color: white;
}
</style>