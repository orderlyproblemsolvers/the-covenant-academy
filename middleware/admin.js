export default defineNuxtRouteMiddleware(async (to) => {
  const supabase = useSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Skip middleware on login page
  if (to.path === '/admin/login') return
  if (to.path === '/') return

  // Redirect to login if no user
  if (!user) return navigateTo('/admin/login')

  // Verify admin role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    await supabase.auth.signOut()
    return navigateTo('/admin/login')
  }
})