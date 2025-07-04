<template>
  <footer class="bg-[#09033b] text-white font-inter">
    <div class="mx-auto w-full max-w-screen-xl p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- School Logo and Info -->
        <div class="flex flex-col space-y-4">
          <NuxtLink to="/" class="flex items-center w-max" aria-label="The Covenant Academy Home">
            <img 
              src="/assets/images/tcad-nbg.png" 
              class="h-12 mr-3" 
              alt="The Covenant Academy Logo"
              width="48"
              height="48"
              loading="lazy"
            />
            <span class="self-center text-xl font-semibold leading-tight font-garamond">
              The Covenant<br>Academy
            </span>
          </NuxtLink>
          <p class="text-gray-300 text-sm mt-2">
            .......The School of Tomorrow
          </p>
        </div>

        <!-- Contact Information -->
        <div>
          <h2 class="text-[#FF7F50] font-semibold text-lg mb-4">Contact Us</h2>
          <ul class="space-y-3 text-gray-300 text-sm">
            <li class="flex items-start gap-2">
              <UIcon name="i-heroicons-phone" class="flex-shrink-0 mt-1" aria-hidden="true" />
              <span>+2348036233157</span>
            </li>
            <li class="flex items-start gap-2">
              <UIcon name="i-heroicons-envelope" class="flex-shrink-0 mt-1" aria-hidden="true" />
              <span>tcadinfo@gmail.com</span>
            </li>
            <li class="flex items-start gap-2">
              <UIcon name="i-heroicons-map-pin" class="flex-shrink-0 mt-1" aria-hidden="true" />
              <span>8A Kayes St, off Nouakchott Street, Wuse Zone 1, Abuja</span>
            </li>
          </ul>
        </div>

        <!-- Quick Links -->
        <div>
          <h2 class="text-[#FF7F50] font-semibold text-lg mb-4">Quick Links</h2>
          <ul class="space-y-2 text-gray-300 text-sm">
            <li>
              <NuxtLink to="/" class="hover:text-[#FF7F50] transition-colors" aria-label="Home">Home</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/academics/curriculum" class="hover:text-[#FF7F50] transition-colors" aria-label="Our Curriculum">Our Curriculum</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/admissions" class="hover:text-[#FF7F50] transition-colors" aria-label="Tuition Information">Tuition</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/team" class="hover:text-[#FF7F50] transition-colors" aria-label="Our Team">Our Team</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/admissions/visit" class="hover:text-[#FF7F50] transition-colors" aria-label="Schedule a Visit">Visit</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter Signup -->
        <div>
          <h2 class="text-[#FF7F50] font-semibold text-lg mb-4">Join Our Newsletter</h2>
          <p class="text-gray-300 text-sm mb-3">
            Stay updated with school events, announcements and activities
          </p>
          <form @submit.prevent="subscribeToNewsletter" class="space-y-3">
            <div>
              <label for="newsletter-email" class="sr-only">Email address</label>
              <input 
                id="newsletter-email"
                type="email" 
                v-model="email" 
                placeholder="Your email address" 
                required
                class="w-full px-3 py-2 bg-indigo-900/50 border border-indigo-800 focus:outline-none focus:ring-1 focus:ring-[#FF7F50] text-sm"
                aria-label="Enter your email for newsletter subscription"
              />
            </div>
            <button 
              type="submit" 
              class="bg-gradient-to-r from-orange-500 to-orange-600 text-sm px-4 py-2 text-white transition-all duration-300 hover:shadow-md hover:shadow-orange-500/30 hover:-translate-y-0.5 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 w-full"
              aria-label="Subscribe to newsletter"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <!-- Social Media -->
      <div class="flex flex-wrap gap-4 justify-center mt-8 mb-6">
        <a 
          href="https://web.facebook.com/COVACADEMY" 
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-300 hover:text-[#FF7F50] transition-colors"
          aria-label="Visit our Facebook page"
        >
          <UIcon name="i-mdi-facebook" class="w-6 h-6" />
        </a>
        <a 
          href="https://www.instagram.com/thecovenantacademyabuja204" 
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-300 hover:text-[#FF7F50] transition-colors"
          aria-label="Visit our Instagram profile"
        >
          <UIcon name="i-mdi-instagram" class="w-6 h-6" />
        </a>
        <a 
          href="mailto:tcadinfo@gmail.com" 
          class="text-gray-300 hover:text-[#FF7F50] transition-colors"
          aria-label="Send us an email"
        >
          <UIcon name="i-heroicons-envelope" class="w-6 h-6" />
        </a>
      </div>

      <hr class="border-gray-700 my-6" />
      
      <!-- Copyright -->
      <div class="text-center text-gray-400 text-sm">
        © {{ currentYear }} <span class="text-[#FF7F50]">The Covenant Academy™</span>. All Rights Reserved.
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const currentYear = ref(new Date().getFullYear());

const subscribeToNewsletter = () => {
  // Implementation would go here
  console.log(`Subscribed with: ${email.value}`);
  alert(`Thank you for subscribing with: ${email.value}`);
  email.value = '';
};
</script>