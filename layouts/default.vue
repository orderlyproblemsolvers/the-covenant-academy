<template>
  <div class="layout">
    <HeaderComp />
    <main class="relative bg-white min-h-[100dvh] pt-[70px] md:pt-0">
      <slot />
    </main>
    <FooterComp />
  </div>
</template>

<script setup>
//jsonld for an organisation
useJsonld({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Covenant Academy",
  url: "https://www.thecovenantacademy.org",
  logo: "https://www.thecovenantacademy.org/tcad-nbg.png",
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
