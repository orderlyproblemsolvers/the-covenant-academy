<template>
    <div>
        <h1 class="text-black">Admin Dashboard</h1>
    </div>

  </template>
  
  <script setup>
  

    definePageMeta({
      title: 'Admin Dashboard',
      description: 'Admin Dashboard',
      layout: 'admin',
      middleware: 'admin'
    });
  </script>