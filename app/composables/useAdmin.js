export function useAdmin() {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const isAdmin = ref(false)
  const loading = ref(true)
  
  // Function to check admin status
  const checkAdminStatus = async () => {
    loading.value = true
    
    if (!user.value) {
      isAdmin.value = false
      loading.value = false
      return false
    }
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.value.id)
        .single()
      
      if (error) throw error
      
      isAdmin.value = data?.role === 'admin'
      return isAdmin.value
    } catch (error) {
      console.error('Error checking admin status:', error)
      isAdmin.value = false
      return false
    } finally {
      loading.value = false
    }
  }
  
  // Admin data operations
  const getUsers = async () => {
    if (!await checkAdminStatus()) {
      throw new Error('Unauthorized: Admin access required')
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
  
  const updateUserRole = async (userId, role) => {
    if (!await checkAdminStatus()) {
      throw new Error('Unauthorized: Admin access required')
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', userId)
    
    if (error) throw error
    return data
  }
  
  // Run admin check on component mount
  onMounted(() => {
    checkAdminStatus()
  })
  
  // Watch for user changes
  watch(user, () => {
    checkAdminStatus()
  })
  
  return {
    isAdmin,
    loading,
    checkAdminStatus,
    getUsers,
    updateUserRole
  }
}