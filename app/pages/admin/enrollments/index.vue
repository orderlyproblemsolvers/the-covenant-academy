<template>
  <div class="space-y-8">
    <header class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-[#FF7F50]">Admissions inbox</p>
        <h1 class="mt-2 text-3xl font-light text-[#09033b]">Enrollment <span class="font-bold">Applications</span></h1>
        <p class="mt-1 text-sm text-gray-500">Review families interested in the 2026/27 academic session.</p>
      </div>
      <button type="button" class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#09033b] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0c0552] focus:outline-none focus:ring-2 focus:ring-[#09033b] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60" :disabled="loading" @click="fetchApplications">
        <UIcon name="i-heroicons-arrow-path" class="h-4 w-4" :class="loading ? 'animate-spin' : ''" aria-hidden="true" />
        Refresh
      </button>
    </header>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <p class="text-xs font-bold uppercase tracking-widest text-gray-400">Total applications</p>
        <p class="mt-2 text-3xl font-bold text-[#09033b]">{{ applications.length }}</p>
      </div>
      <div class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <p class="text-xs font-bold uppercase tracking-widest text-gray-400">Children requested</p>
        <p class="mt-2 text-3xl font-bold text-[#09033b]">{{ childrenCount }}</p>
      </div>
      <div class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <p class="text-xs font-bold uppercase tracking-widest text-gray-400">Financial aid requests</p>
        <p class="mt-2 text-3xl font-bold text-[#09033b]">{{ aidRequests }}</p>
      </div>
    </div>

    <div v-if="errorMessage" class="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
      {{ errorMessage }}
    </div>

    <section class="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm" aria-labelledby="applications-heading">
      <div class="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
        <h2 id="applications-heading" class="text-lg font-bold text-[#09033b]">Recent submissions</h2>
        <span class="text-xs text-gray-400">{{ applications.length }} records</span>
      </div>

      <div v-if="loading" class="space-y-3 p-5" aria-busy="true" aria-label="Loading enrollment applications">
        <div v-for="row in 4" :key="row" class="h-16 animate-pulse rounded-xl bg-gray-100"></div>
      </div>
      <div v-else-if="!applications.length" class="px-6 py-16 text-center">
        <UIcon name="i-heroicons-academic-cap" class="mx-auto h-10 w-10 text-gray-300" aria-hidden="true" />
        <h3 class="mt-4 font-semibold text-gray-900">No enrollment applications yet</h3>
        <p class="mt-1 text-sm text-gray-500">New submissions from the public enrollment form will appear here.</p>
      </div>
      <div v-else class="divide-y divide-gray-100">
        <article v-for="application in applications" :key="application.id" class="p-5 sm:p-6">
          <button type="button" class="flex w-full items-start justify-between gap-4 text-left focus:outline-none focus:ring-2 focus:ring-[#09033b] focus:ring-offset-2" :aria-expanded="expandedId === application.id" @click="toggleApplication(application.id)">
            <div class="min-w-0">
              <h3 class="truncate font-bold text-[#09033b]">{{ application.parent_name || 'Unnamed parent' }}</h3>
              <p class="mt-1 text-sm text-gray-500">{{ application.phone_number || 'No phone number' }} <span class="mx-1 text-gray-300">•</span> {{ application.number_of_children || 0 }} {{ application.number_of_children === 1 ? 'child' : 'children' }}</p>
            </div>
            <div class="flex shrink-0 items-center gap-3">
              <time class="hidden text-xs text-gray-400 sm:block" :datetime="application.created_at">{{ formatDate(application.created_at) }}</time>
              <UIcon name="i-heroicons-chevron-down" class="h-5 w-5 text-gray-400 transition-transform" :class="expandedId === application.id ? 'rotate-180' : ''" aria-hidden="true" />
            </div>
          </button>

          <div v-if="expandedId === application.id" class="mt-5 rounded-xl bg-gray-50 p-4 sm:p-5">
            <div class="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <div><p class="detail-label">Submitted</p><p class="detail-value">{{ formatDate(application.created_at) }}</p></div>
              <div><p class="detail-label">Session</p><p class="detail-value">{{ application.academic_session || '2026/27' }}</p></div>
              <div><p class="detail-label">Financial aid</p><p class="detail-value">{{ application.requires_financial_aid ? 'Requested' : 'Not requested' }}</p></div>
              <div><p class="detail-label">Discount code</p><p class="detail-value">{{ application.discount_code || 'None' }}</p></div>
            </div>
            <div class="mt-5 border-t border-gray-200 pt-4">
              <h4 class="text-xs font-bold uppercase tracking-widest text-gray-400">Children</h4>
              <div class="mt-3 grid gap-3 sm:grid-cols-2">
                <div v-for="(child, index) in normalizedChildren(application.children)" :key="`${application.id}-${index}`" class="rounded-lg border border-gray-200 bg-white p-3">
                  <p class="font-semibold text-[#09033b]">{{ child.full_name || 'Unnamed child' }}</p>
                  <p class="mt-1 text-xs text-gray-500">{{ child.grade || 'Class not provided' }} <span class="mx-1 text-gray-300">•</span> DOB: {{ child.date_of_birth || 'Not provided' }}</p>
                </div>
              </div>
            </div>
            <div class="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-gray-200 pt-4 text-xs text-gray-400">
              <span>Source: {{ application.source_page || 'Unknown page' }}</span>
              <span>Consent: {{ application.consent_given ? 'Given' : 'Not given' }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useSupabaseClient } from '#imports'

definePageMeta({
  title: 'Enrollment Applications',
  description: 'Review enrollment applications',
  layout: 'admin',
  middleware: 'admin'
})

useSeoMeta({ title: 'Enrollment Applications | Admin' })

const supabase = useSupabaseClient()
const applications = ref([])
const loading = ref(true)
const errorMessage = ref('')
const expandedId = ref(null)

const childrenCount = computed(() => applications.value.reduce((total, application) => total + (Number(application.number_of_children) || 0), 0))
const aidRequests = computed(() => applications.value.filter((application) => application.requires_financial_aid).length)

const normalizedChildren = (children) => Array.isArray(children) ? children : []

const formatDate = (value) => {
  if (!value) return 'Unknown date'
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

const fetchApplications = async () => {
  loading.value = true
  errorMessage.value = ''
  const { data, error } = await supabase
    .from('enrollment_leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Unable to load enrollment applications:', error)
    errorMessage.value = 'Enrollment applications could not be loaded. Please try again.'
    applications.value = []
  } else {
    applications.value = data || []
  }
  loading.value = false
}

const toggleApplication = (id) => {
  expandedId.value = expandedId.value === id ? null : id
}

onMounted(fetchApplications)
</script>

<style scoped>
.detail-label {
  color: #9ca3af;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.detail-value {
  margin-top: 0.25rem;
  color: #111827;
  font-weight: 600;
}
</style>