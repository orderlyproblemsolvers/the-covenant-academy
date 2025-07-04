<template>
    <div class="z-2" id="map" style="height: 500px; width: 100%; border-radius: 12px;"></div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import L from 'leaflet'
  
  const lat = 9.051668
  const lng = 7.466210
  
  onMounted(() => {
    const map = L.map('map').setView([lat, lng], 13)
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)
  
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup('No 8A Kayes St, Wuse Zone 1, Abuja')
      .openPopup()
  })
  </script>
  