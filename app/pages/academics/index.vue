<template>
   <main class="min-h-screen bg-gray-50 px-6 py-24 text-center">
      <h1 class="text-4xl font-bold text-[#09033b]">Academics at The Covenant Academy</h1>
      <p class="mx-auto mt-6 max-w-2xl text-lg text-gray-600">Explore our curriculum, Accelerated Christian Education programme, and activities that help students grow in wisdom and character.</p>
      <nav class="mt-10 flex flex-wrap justify-center gap-4" aria-label="Academic sections">
         <NuxtLink to="/academics/curriculum" class="font-semibold text-[#09033b] underline">Curriculum</NuxtLink>
         <NuxtLink to="/academics/ace" class="font-semibold text-[#09033b] underline">A.C.E. programme</NuxtLink>
         <NuxtLink to="/academics/extra-curricular" class="font-semibold text-[#09033b] underline">Extra-curricular activities</NuxtLink>
      </nav>
   </main>
</template>

<script setup>
useSeoMeta({
   title: 'Academics | The Covenant Academy',
   description: 'Explore academics at The Covenant Academy, including our curriculum, A.C.E. programme, and extra-curricular activities.'
})
</script>

<style>

</style>