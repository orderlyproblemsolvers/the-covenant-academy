<template>
  <div class="bg-white  flex flex-col gap-1  ">
    <div
      class="welcome flex h-max flex-col items-center gap-4 p-2  md:p-6 lg:p-6"
    >
      <div class="flex flex-col items-center">
       <h1
          class="font-inter text-xl sm:text-2xl md:text-3xl font-extrabold text-[#120575] text-center"
        >
          WELCOME TO THE SCHOOL OF TOMORROW
        </h1>
        <hr class="w-16 md:w-20 mb-3 md:mb-5 border-gray-700" />
      </div>
      <p
        class="w-full sm:w-[80dvw] md:w-[70dvw] lg:w-[50dvw] text-wrap text-center text-base sm:text-lg text-gray-800"
      >
        The vision of TCA is to provide at an affordable cost, the most
        excellent standard of education that focuses on the individual needs of
        each child in an environment that is God-centered, using every tool
        available in order to equip our children for a flourishing future in a
        real world that will touch the lives of real people in a real way.
      </p>
      <div class="flex flex-row sm:flex-row gap-4">
        <NuxtLink
          class="p-3 md:p-4 font-semibold bg-[#120575] text-xs md:text-sm rounded-3xl  flex justify-center items-center transition-all hover:bg-orange-500"
          to="#"
        >
          ACADEMICS
          <UIcon name="i-mdi-school" class="ml-1" />
        </NuxtLink>
        <NuxtLink
          class="p-3 md:p-4 font-semibold flex justify-center items-center md:text-sm bg-[#120575] rounded-3xl text-xs transition-all hover:bg-orange-500"
          to="#"
        >
          ADMISSIONS
          <UIcon name="i-mdi-pen" class="ml-1" />
        </NuxtLink>
        <NuxtLink
          class="p-3 md:p-4 font-semibold flex justify-center items-center md:text-sm bg-orange-500 rounded-3xl text-xs transition-all hover:bg-[#120575]"
          to="#"
        >
          OUR HISTORY
          <UIcon name="i-mdi-history" class="ml-1" />
        </NuxtLink>
      </div>
    </div>
    <div class="12reasons flex flex-col items-center  w-full max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div class="flex flex-col items-center mb-8 ">
        <h1
          class="font-inter text-2xl md:text-3xl font-extrabold text-[#120575] text-center"
        >
          12 REASONS TO JOIN TCA
        </h1>
        <hr class="w-16 md:w-20 mt-3 mb-5 border-gray-700" />
      </div>
      <twelveReasons
        class="w-full grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6"
      />
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>