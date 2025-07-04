<template>
  <div class="layout">
    <HeaderComp />
    <main class="relative bg-white min-h-[100dvh] pt-[70px] md:pt-0">
      <slot />
    </main>
    <FooterComp />
  </div>
</template>

<script setup></script>

<style>
.layout {
  display: grid;
  grid-template-rows: max-content 1fr max-content;
}
</style>
