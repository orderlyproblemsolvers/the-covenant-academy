<template>
  <div class="min-h-screen bg-[#FDFDFD] font-inter">
    
    <div v-if="!user" class="min-h-screen flex items-center justify-center p-4">
      <div class="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
        <div class="w-16 h-16 bg-[#09033b]/5 rounded-full flex items-center justify-center mx-auto mb-6 text-[#09033b]">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
        </div>
        <h2 class="text-2xl font-bold text-[#09033b] mb-2">Admin Access</h2>
        <p class="text-sm text-gray-500 mb-8">Please sign in to view download records.</p>
        
        <button 
          @click="signIn" 
          class="w-full py-3 bg-[#09033b] text-white font-bold rounded-xl hover:bg-[#FF7F50] transition-colors"
        >
          Sign In with Email
        </button>
      </div>
    </div>

    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div class="inline-flex items-center gap-3 mb-2">
            <span class="w-8 h-px bg-[#FF7F50]"></span>
            <span class="text-xs font-bold text-[#FF7F50] uppercase tracking-widest">Internal Tool</span>
          </div>
          <h1 class="text-3xl md:text-4xl font-light text-[#09033b]">
            Resource <span class="font-bold">Downloads</span>
          </h1>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Total Downloads</p>
          <p class="text-4xl font-bold text-[#09033b]">{{ totalDownloads }}</p>
        </div>
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Unique Emails</p>
          <p class="text-4xl font-bold text-[#FF7F50]">{{ uniqueEmails }}</p>
        </div>
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Data Export</p>
            <p class="text-sm text-gray-600">Download as CSV</p>
          </div>
          <button @click="exportToCSV" class="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-[#09033b] hover:bg-[#09033b] hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          </button>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 mb-6">
        <div class="relative flex-1">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search by name or email..." 
            class="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF7F50] transition-colors"
          >
        </div>
        <button @click="fetchDownloads" :disabled="loading" class="px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-600 font-bold hover:bg-gray-50 disabled:opacity-50">
          Refresh
        </button>
      </div>

      <div class="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-100">
                <th class="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                <th class="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Name</th>
                <th class="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Email</th>
                <th class="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Resource</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="loading" class="animate-pulse">
                <td colspan="4" class="py-8 text-center text-gray-400">Loading records...</td>
              </tr>
              <tr v-else-if="filteredDownloads.length === 0">
                <td colspan="4" class="py-12 text-center text-gray-400">No records found.</td>
              </tr>
              <tr v-for="log in filteredDownloads" :key="log.id" class="hover:bg-[#09033b]/[0.02] transition-colors">
                <td class="py-4 px-6 text-sm text-gray-500 font-mono">
                  {{ formatDate(log.created_at) }}
                </td>
                <td class="py-4 px-6 text-sm font-bold text-[#09033b]">
                  {{ log.name }}
                </td>
                <td class="py-4 px-6 text-sm text-gray-600">
                  {{ log.email }}
                </td>
                <td class="py-4 px-6">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FF7F50]/10 text-[#FF7F50]">
                    {{ log.resource_name }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
definePageMeta({
    layout: 'admin'
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()

// State
const downloads = ref([])
const loading = ref(true)
const searchQuery = ref('')

// Computed Stats
const totalDownloads = computed(() => downloads.value.length)
const uniqueEmails = computed(() => new Set(downloads.value.map(d => d.email)).size)

const filteredDownloads = computed(() => {
  if (!searchQuery.value) return downloads.value
  const query = searchQuery.value.toLowerCase()
  return downloads.value.filter(log => 
    log.name.toLowerCase().includes(query) || 
    log.email.toLowerCase().includes(query)
  )
})

// Actions
const signIn = async () => {
  // Simple redirect to Supabase hosted login or your custom login page
  // Adjust this based on your auth implementation
  router.push('/admin/login')
}

const fetchDownloads = async () => {
  if (!user.value) return
  
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('resource_downloads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    downloads.value = data
  } catch (err) {
    console.error('Error fetching downloads:', err)
    // alert('Could not fetch data. Ensure you are logged in as admin.')
  } finally {
    loading.value = false
  }
}

const exportToCSV = () => {
  const headers = ['Date', 'Name', 'Email', 'Resource']
  const rows = filteredDownloads.value.map(d => [
    formatDate(d.created_at),
    d.name,
    d.email,
    d.resource_name
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `downloads_export_${new Date().toISOString().split('T')[0]}.csv`
  link.click()
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Watch for user state change to auto-fetch
watchEffect(() => {
  if (user.value) fetchDownloads()
})

onMounted(() => {
  if (user.value) fetchDownloads()
})
</script>