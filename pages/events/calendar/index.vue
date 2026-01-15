<template>
  <div class="min-h-screen bg-gray-50 font-inter relative overflow-hidden print:bg-white print:overflow-visible">
    
    <div class="absolute inset-0 pointer-events-none print:hidden">
      <svg class="absolute top-0 left-0 w-full h-[500px] opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="calendar-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M0 32V0H32" fill="none" stroke="#09033b" stroke-width="1"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#calendar-grid)" />
      </svg>
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      <div class="absolute top-20 left-0 w-[300px] h-[300px] bg-orange-100/60 rounded-full blur-[80px] -translate-x-1/2"></div>
    </div>

    <div class="relative z-10 container mx-auto py-12 px-4 sm:px-6 lg:px-8 print:p-0 print:max-w-none">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 print:mb-4">
        
        <div class="text-center md:text-left">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-[#09033b] text-xs font-bold tracking-wide uppercase mb-4 shadow-sm print:hidden">
            <span class="w-2 h-2 rounded-full bg-[#FF7F50] animate-pulse"></span>
            Academic Session 2025/2026
          </div>
          
          <h1 class="text-4xl md:text-5xl font-bold text-[#09033b] tracking-tight">
            School <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#09033b] to-[#4f46e5] print:text-[#09033b]">Calendar</span>
          </h1>
          <p class="mt-2 text-gray-600 max-w-lg print:text-sm">
            Keep track of examinations, holidays, excursions, and special events.
          </p>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-3 print:hidden">
          <button 
            @click="handlePrint"
            class="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#09033b] transition-colors shadow-sm"
          >
            <UIcon name="i-heroicons-printer" class="w-4 h-4 mr-2" />
            Print / PDF
          </button>
          <button 
            @click="handleSync"
            class="inline-flex items-center px-4 py-2 bg-[#09033b] border border-transparent rounded-xl text-sm font-medium text-white hover:bg-[#0c0552] transition-colors shadow-lg shadow-[#09033b]/20"
          >
            <UIcon name="i-heroicons-calendar-days" class="w-4 h-4 mr-2" />
            Sync Full Session
          </button>
        </div>
      </div>



      <div class="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden relative print:shadow-none print:border-none print:rounded-none">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#09033b] via-[#4f46e5] to-[#FF7F50] print:hidden"></div>
        
        <div class="p-2 sm:p-6 md:p-8 print:p-0">
          <CalendarGrid ref="calendarRef" />
        </div>
      </div>

      <p class="text-center text-xs text-gray-400 mt-8 print:mt-4 print:text-black">
        * Dates and events are subject to change by school management. Last updated: Jan 2026.
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'default'
})

const calendarRef = ref(null)

// Function to trigger browser print dialog (Users can "Save as PDF" from there)
const handlePrint = () => {
  window.print()
}

// Function to download a full session .ics file
const handleSync = () => {
  // In a real app, this would hit an API endpoint like /api/calendar/subscribe
  // Here we generate a basic ICS file for the session
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//The Covenant Academy//School Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:TCAD School Calendar
X-WR-TIMEZONE:Africa/Lagos
BEGIN:VEVENT
DTSTART:20250908T070000Z
DTEND:20250908T140000Z
SUMMARY:Resumption - First Term
DESCRIPTION:Start of the 2025/2026 Academic Session
END:VEVENT
END:VCALENDAR`

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.setAttribute('download', 'TCAD_Academic_Session_2025_26.ics')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style>
@media print {
  /* Hide typical navbar/footer classes if they exist in layout */
  header, footer, nav {
    display: none !important;
  }
  
  body {
    background-color: white !important;
    color: black !important;
  }

  /* Ensure calendar grid fits on page */
  .container {
    max-width: 100% !important;
    width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
}
</style>