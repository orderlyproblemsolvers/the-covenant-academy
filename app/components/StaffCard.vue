<template>
    <div class="bg-white rounded-lg shadow p-4 flex items-center space-x-4 hover:shadow-md transition-shadow duration-200">
      <!-- Avatar with fallback -->
      <div class="relative">
        <img 
          v-if="staff.avatar"
          :src="avatarUrl"
          class="w-12 h-12 rounded-full object-cover border-2"
          :class="avatarBorderColor"
          @error="handleImageError"
          :alt="`${staff.name}'s profile photo`"
        >
        <div 
          v-else
          class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
          :class="avatarFallbackClass"
        >
          {{ staff.name.charAt(0) }}
        </div>
      </div>
  
      <!-- Staff Info -->
      <div class="flex-1 min-w-0">
        <h3 class="font-medium text-gray-900 truncate">{{ staff.name }}</h3>
        <p class="text-sm text-gray-600 truncate">{{ staff.position }}</p>
        <span class="inline-block mt-1 px-2 py-0.5 text-xs rounded-full" 
              :class="teamBadgeColor">
          {{ teamLabel }}
        </span>
      </div>
  
      <!-- Action Buttons -->
      <div class="flex space-x-2">
        <button 
          @click.stop="$emit('edit')"
          class="p-1 text-blue-600 hover:text-blue-800 transition-colors"
          aria-label="Edit staff member"
        >
          <UIcon name="i-heroicons-pencil-square" class="h-5 w-5" />
        </button>
        <button 
          @click.stop="$emit('delete')"
          class="p-1 text-red-600 hover:text-red-800 transition-colors"
          aria-label="Delete staff member"
        >
          <UIcon name="i-heroicons-trash" class="h-5 w-5" />
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { pb } from '~/services/pocketbase';
  
  const props = defineProps({
    staff: {
      type: Object,
      required: true,
      validator: (staff) => {
        return ['id', 'name', 'position', 'team'].every(key => key in staff);
      }
    }
  });
  
  const emit = defineEmits(['edit', 'delete']);
  
  // Computed properties
  const avatarUrl = computed(() => {
    return props.staff.avatar 
      ? pb.getFileUrl(props.staff, props.staff.avatar, { thumb: '100x100' })
      : null;
  });
  
  const teamLabel = computed(() => {
    const teams = {
      'management': 'Management',
      'office': 'Office',
      'teachers': 'Teacher',
      'non-academic': 'Non-Academic'
    };
    return teams[props.staff.team] || 'Staff';
  });
  
  const teamBadgeColor = computed(() => {
    const colors = {
      'management': 'bg-purple-100 text-purple-800',
      'office': 'bg-blue-100 text-blue-800',
      'teachers': 'bg-green-100 text-green-800',
      'non-academic': 'bg-yellow-100 text-yellow-800'
    };
    return colors[props.staff.team] || 'bg-gray-100 text-gray-800';
  });
  
  const avatarBorderColor = computed(() => {
    const colors = {
      'management': 'border-purple-200',
      'office': 'border-blue-200',
      'teachers': 'border-green-200',
      'non-academic': 'border-yellow-200'
    };
    return colors[props.staff.team] || 'border-gray-200';
  });
  
  const avatarFallbackClass = computed(() => {
    const colors = {
      'management': 'bg-purple-500',
      'office': 'bg-blue-500',
      'teachers': 'bg-green-500',
      'non-academic': 'bg-yellow-500'
    };
    return colors[props.staff.team] || 'bg-gray-500';
  });
  
  // Methods
  const handleImageError = (event) => {
    event.target.style.display = 'none';
    // The fallback div will automatically show since staff.avatar is truthy but failed to load
  };
  </script>