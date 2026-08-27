<template>
  <div class="layout">
    <AppHeader />
    <main class="relative bg-white min-h-[100dvh] pt-[70px] md:pt-0">
      <slot />
    </main>
    <AppFooter />
    <EnrollmentPrompt />
  </div>
</template>

<script setup>
//jsonld for an organisation
useJsonld({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Covenant Academy",
  url: "https://thecovenantacademy.org/",
  logo: "https://thecovenantacademy.org/tcad-nbg.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+234-803-6233-157",
    contactType: "Customer Service"
  }
})

</script>

<style>
.layout {
  display: grid;
  grid-template-rows: max-content 1fr max-content;
}
</style>
