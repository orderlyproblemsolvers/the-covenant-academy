<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#09033b] to-[#120863]">
      <div class="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md border border-opacity-10 border-white">
        <div class="mb-8 text-center">
          <h1 class="text-3xl font-extrabold text-[#09033b] mb-2">Admin Portal</h1>
          <div class="h-1 w-16 bg-[#ff7f50] mx-auto rounded-full"></div>
        </div>
  
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="relative">
            <label for="email" class="text-sm font-medium text-gray-600 ml-1">Email</label>
            <div class="mt-1 relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </span>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder="admin@example.com"
                class="pl-10 block w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff7f50] focus:border-transparent bg-gray-50 text-black"
              />
            </div>
          </div>
  
          <div class="relative text-black">
            <label for="password" class="text-sm font-medium text-gray-600 ml-1">Password</label>
            <div class="mt-1 relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
              </span>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                placeholder="••••••••"
                class="pl-10 block w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff7f50] focus:border-transparent bg-gray-50"
              />
            </div>
          </div>
  
          <div class="pt-2">
            <button
              type="submit"
              :disabled="loading"
              class="w-full py-3 px-4 bg-gradient-to-r from-[#ff7f50] to-[#ff9f7f] text-white font-bold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying
              </span>
              <span v-else>Sign In</span>
            </button>
          </div>
  
          <div v-if="error" class="bg-red-50 text-red-600 p-3 rounded-lg text-center text-sm font-medium">
            {{ error }}
          </div>
        </form>
  
        <div class="mt-8 pt-4 border-t border-gray-100 text-center">
          <p class="text-xs text-gray-500">
            Secure Admin Portal • {{ new Date().getFullYear() }}
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>

  import { ref } from 'vue'
  import { useSupabaseClient } from '#imports'
  import { useRouter } from 'vue-router'
  
  const supabase = useSupabaseClient()
  const router = useRouter()
  
  const email = ref('')
  const password = ref('')
  const error = ref('')
  const loading = ref(false)

  definePageMeta({
    layout: 'login'
  })
  
  const handleLogin = async () => {
    error.value = ''
    loading.value = true
  
    try {
      // Authenticate
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
      })
  
      if (authError) throw authError
  
      // Verify admin role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', data.user.id)
        .single()
  
      if (!profile || profile.role !== 'admin') {
        await supabase.auth.signOut()
        throw new Error('Invalid permissions')
      }
  
      // Redirect to dashboard
      router.push('/admin')
    } catch (err) {
      error.value = 'Invalid credentials'
      password.value = ''
    } finally {
      loading.value = false
    }
  }
  </script>