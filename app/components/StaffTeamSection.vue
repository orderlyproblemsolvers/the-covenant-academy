<template>
    <div>
      <h2 class="text-xl font-semibold mb-4">{{ team.name }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StaffCard 
          v-for="member in staffMembers"
          :key="member.id"
          :staff="member"
          @edit="editStaff(member.id)"
          @delete="confirmDelete(member.id)"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    team: {
      type: Object,
      required: true
    }
  });
  
  const { data: staffMembers } = await useAsyncData(
    `staff-${props.team.id}`,
    async () => await getStaffByTeam(props.team.id)
  );
  </script>