<template>
  <div class="h-full flex flex-col space-y-8">
    
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-light text-[#09033b]">
          Welcome back, <span class="font-bold">Admin</span>
        </h1>
        <p class="mt-1 text-sm text-gray-500">
          Here's what's happening at The Covenant Academy today.
        </p>
      </div>
      <div class="text-right hidden sm:block">
        <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Current Date</p>
        <p class="text-lg font-bold text-[#09033b]">{{ currentDate }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group overflow-hidden">
        <div class="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <UIcon name="i-heroicons-users" class="w-16 h-16 text-[#09033b]" />
        </div>
        <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Staff</p>
        <h3 class="text-3xl font-bold text-[#09033b]">{{ stats.staff }}</h3>
        <NuxtLink to="/admin/staff" class="text-xs text-[#FF7F50] font-bold mt-4 inline-flex items-center hover:underline">
          Manage Team <UIcon name="i-heroicons-arrow-right" class="w-3 h-3 ml-1" />
        </NuxtLink>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group overflow-hidden">
        <div class="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <UIcon name="i-heroicons-light-bulb" class="w-16 h-16 text-[#FF7F50]" />
        </div>
        <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Resource Downloads</p>
        <h3 class="text-3xl font-bold text-[#09033b]">{{ stats.downloads }}</h3>
        <NuxtLink to="/admin/pathway-to-wisdom" class="text-xs text-[#FF7F50] font-bold mt-4 inline-flex items-center hover:underline">
          View Leads <UIcon name="i-heroicons-arrow-right" class="w-3 h-3 ml-1" />
        </NuxtLink>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group overflow-hidden">
        <div class="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <UIcon name="i-heroicons-briefcase" class="w-16 h-16 text-blue-500" />
        </div>
        <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Pending Applications</p>
        <h3 class="text-3xl font-bold text-[#09033b]">{{ stats.jobs }}</h3>
        <NuxtLink to="/admin/jobs" class="text-xs text-[#FF7F50] font-bold mt-4 inline-flex items-center hover:underline">
          Review Inbox <UIcon name="i-heroicons-arrow-right" class="w-3 h-3 ml-1" />
        </NuxtLink>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group overflow-hidden">
        <div class="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <UIcon name="i-heroicons-newspaper" class="w-16 h-16 text-green-500" />
        </div>
        <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Published News</p>
        <h3 class="text-3xl font-bold text-[#09033b]">{{ stats.news }}</h3>
        <NuxtLink to="/admin/resources" class="text-xs text-[#FF7F50] font-bold mt-4 inline-flex items-center hover:underline">
          Edit Content <UIcon name="i-heroicons-arrow-right" class="w-3 h-3 ml-1" />
        </NuxtLink>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-8 h-full">
      
      <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div class="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 class="text-lg font-bold text-[#09033b]">Recent Download Activity</h3>
          <NuxtLink to="/admin/pathway-to-wisdom" class="text-xs font-bold text-gray-400 hover:text-[#FF7F50]">View All</NuxtLink>
        </div>
        
        <div class="flex-1 overflow-auto">
          <table class="w-full text-left">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-xs font-bold text-gray-400 uppercase">User</th>
                <th class="px-6 py-3 text-xs font-bold text-gray-400 uppercase">Resource</th>
                <th class="px-6 py-3 text-xs font-bold text-gray-400 uppercase text-right">Time</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="loading" class="animate-pulse">
                <td colspan="3" class="px-6 py-8 text-center text-sm text-gray-500">Loading activity...</td>
              </tr>
              <tr v-else-if="recentActivity.length === 0">
                <td colspan="3" class="px-6 py-8 text-center text-sm text-gray-500">No recent activity found.</td>
              </tr>
              <tr v-for="item in recentActivity" :key="item.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4">
                  <p class="text-sm font-bold text-[#09033b]">{{ item.name }}</p>
                  <p class="text-xs text-gray-400">{{ item.email }}</p>
                </td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700">
                    {{ item.resource_name.replace('Pathway To Wisdom - ', '') }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right text-xs text-gray-400 font-mono">
                  {{ timeAgo(item.created_at) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="space-y-6">
        
        <div class="bg-[#09033b] rounded-2xl shadow-lg p-6 text-white">
          <h3 class="text-lg font-bold mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <NuxtLink to="/admin/feeslip" class="flex items-center p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors group cursor-pointer">
              <div class="w-8 h-8 rounded-lg bg-[#FF7F50] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                <UIcon name="i-heroicons-document-text" class="w-5 h-5 text-white" />
              </div>
              <div>
                <p class="text-sm font-bold">Generate Fee Slip</p>
                <p class="text-xs text-white/60">Create PDF for students</p>
              </div>
            </NuxtLink>

            <NuxtLink to="/admin/calendar" class="flex items-center p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors group cursor-pointer">
              <div class="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                <UIcon name="i-heroicons-calendar-days" class="w-5 h-5 text-white" />
              </div>
              <div>
                <p class="text-sm font-bold">Update Calendar</p>
                <p class="text-xs text-white/60">Add school events</p>
              </div>
            </NuxtLink>

            <NuxtLink to="/admin/staff" class="flex items-center p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors group cursor-pointer">
              <div class="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                <UIcon name="i-heroicons-user-plus" class="w-5 h-5 text-white" />
              </div>
              <div>
                <p class="text-sm font-bold">Add Staff Member</p>
                <p class="text-xs text-white/60">Update faculty list</p>
              </div>
            </NuxtLink>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">System Status</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Database</span>
              <span class="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <span class="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                Connected
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Storage</span>
              <span class="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                 <span class="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                Operational
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useSupabaseClient } from '#imports'

definePageMeta({
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
  layout: 'admin',
  middleware: 'admin'
});

const supabase = useSupabaseClient()
const loading = ref(true)

// Stats State
const stats = reactive({
  staff: 0,
  downloads: 0,
  jobs: 0,
  news: 0 
})

const recentActivity = ref([])

// Current Date Formatter
const currentDate = new Date().toLocaleDateString('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})

// Time Ago Formatter
const timeAgo = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now - date) / 1000)
  
  if (seconds < 60) return 'Just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return Math.floor(hours / 24) + 'd ago'
}

const fetchData = async () => {
  loading.value = true
  
  try {
    // 1. Fetch Staff Count
    const { count: staffCount } = await supabase
      .from('staff')
      .select('*', { count: 'exact', head: true })
    
    // 2. Fetch Downloads Count
    const { count: dlCount } = await supabase
      .from('resource_downloads')
      .select('*', { count: 'exact', head: true })

    // 3. Fetch Recent Downloads (Activity Feed)
    const { data: recentDl } = await supabase
      .from('resource_downloads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    // 4. Fetch Job Applications Count (Updated)
    const { count: jobsCount } = await supabase
      .from('job_applications')
      .select('*', { count: 'exact', head: true })

    // 5. Fetch News/Publications Count (Updated)
    // NOTE: Assuming table name is 'news' or 'news_articles'. Update if different.
    const { count: newsCount } = await supabase
      .from('blog_posts') 
      .select('*', { count: 'exact', head: true })

    // Update State
    if (staffCount !== null) stats.staff = staffCount
    if (dlCount !== null) stats.downloads = dlCount
    if (jobsCount !== null) stats.jobs = jobsCount
    if (newsCount !== null) stats.news = newsCount
    if (recentDl) recentActivity.value = recentDl

  } catch (error) {
    console.error('Dashboard Fetch Error:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>