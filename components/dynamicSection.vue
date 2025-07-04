<template>
  <div class="bg-white font-inter ">
    <!-- Important Dates Section -->
    <div class="py-4 sm:py-6 md:py-8 w-full bg-gray-50 flex items-center justify-center px-3 sm:px-4 md:px-6">
      <div class="w-full lg:w-11/12 xl:w-4/5 border-2 border-black flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center p-3 md:p-4 gap-3 sm:gap-2 ">
        <!-- Header Text -->
        <div class="text-black w-full sm:w-auto">
          <p class="font-semibold text-base md:text-lg">Upcoming Events at The Covenant Academy</p>
          <p class="text-xs sm:text-sm">Join us for our exciting school activities this month</p>
        </div>
        
        <!-- Events List - Mobile: Stack, Desktop: Row -->
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <div v-if="isLoading" class="text-black text-center w-full">
            Loading upcoming events...
          </div>
          <div v-else-if="upcomingEvents.length === 0" class="text-black text-center w-full">
            No upcoming events
          </div>
          <div v-else v-for="(event, index) in upcomingEvents" :key="index" 
               class="text-black text-base flex items-center gap-2 sm:gap-3">
            <div class="flex flex-col font-semibold border-gray-600 border-r-2 pr-2 min-w-12 text-center sm:text-left">
              <p>{{ formatDay(event.start_date) }}</p>
              <p>{{ formatMonth(event.start_date) }}</p>
            </div>
            <p class="text-lg md:text-xl lg:text-2xl">{{ event.title }}</p>
          </div>
        </div>
        
        <!-- Calendar Button -->
        <NuxtLink
          class="p-2 sm:p-3 md:p-4 font-semibold text-white bg-[#120575] text-xs sm:text-sm transition-all flex items-center gap-2 border  hover:bg-[#09033b] self-end sm:self-auto"
          to="/events/calendar"
        > 
          CALENDAR
          <UIcon name="i-mdi-calendar" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'

const supabase = useSupabaseClient()
const upcomingEvents = ref([])
const isLoading = ref(true)

// Format date components for display
const formatDay = (dateString) => {
  const date = new Date(dateString)
  const day = date.getDate()
  
  // Add suffix to day
  const suffix = ['th', 'st', 'nd', 'rd']
  const relevantDigits = (day > 3 && day < 21) || day % 10 > 3 ? 0 : day % 10
  return day + (suffix[relevantDigits] || suffix[0])
}

const formatMonth = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('default', { month: 'short' })
}

// Fetch upcoming events when component mounts
onMounted(async () => {
  try {
    isLoading.value = true
    
    // Get current date at midnight
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Fetch events that haven't happened yet
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('start_date', today.toISOString())
      .order('start_date', { ascending: true })
      .limit(2)
    
    if (error) throw error
    
    // Store the upcoming events
    upcomingEvents.value = data || []
  } catch (err) {
    console.error('Error fetching upcoming events:', err)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped></style>