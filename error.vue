<!-- error.vue -->
<template>
    <div class="error-container">
      <h1>{{ error.statusCode }}</h1>
      <h2>{{ error.statusMessage || 'Page not found' }}</h2>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <button @click="handleError">Go back home to</button>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    error: Object
  })
  
  const handleError = () => {
    // Clear the error and navigate to the home page
    clearError({ redirect: '/' })
  }
  </script>
  
  <style scoped>
  .error-container {
    text-align: center;
    padding: 50px;
    font-family: sans-serif;
    height: 80dvh;
  }
  
  h1 {
    font-size: 80px;
    margin-bottom: 0;
  }
  
  button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
  }
  </style>