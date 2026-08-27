<template>
    <main class="min-h-screen bg-gray-50 px-6 py-24 text-center">
        <h1 class="text-4xl font-bold text-[#09033b]">Events at The Covenant Academy</h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg text-gray-600">Keep up with school events, academic dates, Deepwater News, and newsletters from our community.</p>
        <nav class="mt-10 flex flex-wrap justify-center gap-4" aria-label="Event sections">
            <NuxtLink to="/events/calendar" class="font-semibold text-[#09033b] underline">School calendar</NuxtLink>
            <NuxtLink to="/events/deepwater-news" class="font-semibold text-[#09033b] underline">Deepwater News</NuxtLink>
            <NuxtLink to="/events/newsletter" class="font-semibold text-[#09033b] underline">Newsletters</NuxtLink>
        </nav>
    </main>
  
</template>

<script setup>
useSeoMeta({
    title: 'Events | The Covenant Academy',
    description: 'View upcoming events, school dates, news, and newsletters from The Covenant Academy community.'
})
</script>

<style>

</style>