<template>
  <div class="overflow-x-hidden">
    <NuxtLoadingIndicator color="#0b0354" :height="4" />

      <NuxtLayout >
        <NuxtPage />
      </NuxtLayout>
  </div>
</template>

<script setup>
const route = useRoute()

const routeSeo = {
  '/admissions': ['Admissions | The Covenant Academy', 'Learn how to apply to The Covenant Academy, prepare required documents, and plan your child\'s enrollment in Abuja.'],
  '/team': ['Our Team | The Covenant Academy', 'Meet the teachers, leaders, and staff who serve students and families at The Covenant Academy.'],
  '/about/history': ['Our History | The Covenant Academy', 'Discover the history, milestones, and Christian foundation of The Covenant Academy in Abuja.'],
  '/about/vision': ['Our Vision | The Covenant Academy', 'Learn about The Covenant Academy\'s vision for Christ-centred education, character, and academic excellence.'],
  '/academics': ['Academics | The Covenant Academy', 'Explore academics at The Covenant Academy, including our curriculum, A.C.E. programme, and extra-curricular activities.'],
  '/academics/curriculum': ['Curriculum | The Covenant Academy', 'Explore The Covenant Academy curriculum, combining A.C.E. learning with Nigerian academic requirements.'],
  '/academics/extra-curricular': ['Extra-Curricular Activities | The Covenant Academy', 'Discover clubs, excursions, and activities that help Covenant Academy students grow beyond the classroom.'],
  '/academics/pathway-to-wisdom': ['Pathway to Wisdom | The Covenant Academy', 'Explore Pathway to Wisdom, a discipleship resource that develops biblical understanding and character.'],
  '/events': ['Events | The Covenant Academy', 'View upcoming events, school dates, news, and newsletters from The Covenant Academy community.'],
  '/events/newsletter': ['Newsletters | The Covenant Academy', 'Read The Covenant Academy newsletters for school updates, achievements, and academic highlights.'],
  '/events/deepwater-news': ['Deepwater News | The Covenant Academy', 'Watch Deepwater News videos and follow learning updates from The Covenant Academy.'],
  '/events/calendar': ['School Calendar | The Covenant Academy', 'View important dates, term milestones, and events on The Covenant Academy school calendar.'],
  '/admissions/tuition': ['Tuition and Fees | The Covenant Academy', 'Review tuition plans, fees, discounts, and financial support for The Covenant Academy students.'],
  '/admissions/visit': ['Visit The Covenant Academy', 'Plan a visit to The Covenant Academy in Wuse, Abuja, and find our address and contact details.'],
}

useHead(() => {
  const [title, description] = routeSeo[route.path] || []
  if (!title) return {}

  return {
    title,
    meta: [{ name: 'description', content: description }],
    link: [{ rel: 'canonical', href: `https://thecovenantacademy.org${route.path === '/' ? '/' : route.path}` }]
  }
})
</script>
