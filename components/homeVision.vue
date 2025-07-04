<template>
  <div class="flex items-center justify-center min-h-[60vh] bg-white p-6">
    <div class="flex flex-col lg:flex-row w-full gap-5 lg:gap-10 max-w-5xl">
      <!-- Image - Only visible on large screens -->
      <div class="hidden lg:block lg:w-1/2 bg-gray-300 lg:h-144">
        <img
          src="/public/assets/images/Board.jpg"
          class="w-full h-full object-cover"
          alt="Board Members"
        />
      </div>

      <!-- Content Section -->
      <div class="w-full lg:w-1/2 flex flex-col gap-5">
        <div class="flex flex-col">
          <h1 class="font-inter text-2xl lg:text-3xl font-extrabold text-[#120575]">
            MESSAGE FROM THE BOARD
          </h1>
          <hr class="w-full lg:w-[80%] mb-3 lg:mb-5 border-gray-700" />
        </div>
        
        <!-- On small and medium screens, text wraps around image using the float pattern -->
        <div class="relative">
          <!-- Only visible on small and medium screens -->
          <div class="float-left mr-4 mb-4 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:hidden">
            <img
              src="/public/assets/images/Board.jpg"
              class="w-full h-full object-cover"
              alt="Board Members"
            />
          </div>
          
          <p class="text-base text-gray-800">
            Many Schools exist but there are few schools, where the proprietors
            are willing to put their own children. This is because many schools
            are established primarily for profit generation.
            <br /><br />
            <span class="text-orange-500 font-semibold">The Covenant Academy</span> differs from this trend. <span class="text-orange-500 font-semibold">The Covenant Academy's</span> 
            vision is to provide at an affordable cost, the most excellent
            standard of education that focuses on the individual needs of each
            child in an environment that is <span class="text-orange-500 font-semibold">God-centered</span>, using every tool
            available in order to equip our children for a flourishing future in a
            real world that will touch the lives of real people in a real way.
            <br /><br />
            <span class="text-orange-500 font-semibold">Education</span> is Life and the negative trends of education in the world are alarming. This has resulted in <span class="text-orange-500 font-semibold">The Covenant Academy's</span> to make a difference. The decision to make a significant change in the present and future lifestyle of our children is a major one, but a vital and necessary one.
            <br /><br />
            Our <span class="text-orange-500 font-semibold">Children</span> are our <span class="text-orange-500 font-semibold">future</span>, the only physical inheritance that matters to God. We invite you to join us to make a difference in our childrens future and by extension, our own future.
          </p>
        </div>
        
        <NuxtLink class="p-3 lg:p-4 font-semibold w-max bg-[#120575] rounded-3xl text-sm transition-all flex items-center gap-2 hover:bg-orange-500 text-white mt-2" to="#">
          SUPPORT US
          <UIcon name="i-mdi-gift"/>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
/* Clear float after paragraphs to prevent layout issues */
.relative:after {
  content: "";
  display: table;
  clear: both;
}
</style>