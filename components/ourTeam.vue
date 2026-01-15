<template>
  <section class="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden font-inter selection:bg-[#09033b] selection:text-white">
    
    <div class="absolute inset-0 pointer-events-none">
      <svg class="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="team-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#09033b"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#team-grid)" />
      </svg>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto">
      
      <div class="text-center max-w-3xl mx-auto mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-[#09033b] text-xs font-bold tracking-wide uppercase mb-6 shadow-sm">
          <span class="w-2 h-2 rounded-full bg-[#FF7F50]"></span>
          Leadership & Staff
        </div>
        
        <h2 class="text-4xl md:text-5xl font-bold text-[#09033b] tracking-tight mb-4">
          Meet the <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#09033b] to-[#4f46e5]">Team</span>
        </h2>
        
        <p class="text-lg text-gray-600 leading-relaxed">
          Dedicated professionals committed to raising God-fearing leaders through excellence in education.
        </p>
      </div>

      <div v-if="isLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
        <div v-for="n in 4" :key="n" class="animate-pulse">
          <div class="bg-gray-200 rounded-2xl aspect-[3/4] mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      <div v-else-if="errorMessage" class="max-w-md mx-auto text-center py-12 bg-red-50 rounded-2xl border border-red-100">
        <UIcon name="i-heroicons-exclamation-circle" class="w-10 h-10 text-red-500 mx-auto mb-3" />
        <h3 class="text-red-800 font-medium mb-1">Unable to load team</h3>
        <p class="text-red-600 text-sm mb-4">{{ errorMessage }}</p>
        <button 
          @click="retryFetch"
          class="inline-flex items-center px-4 py-2 bg-white border border-red-200 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50 transition-colors"
        >
          <UIcon name="i-heroicons-arrow-path" class="mr-2 h-4 w-4" />
          Retry
        </button>
      </div>

      <div v-else-if="staffs.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
        <div 
          v-for="staff in displayedStaff" 
          :key="staff.id"
          class="group relative"
        >
          <div class="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:shadow-[#09033b]/10 group-hover:-translate-y-1">
            <NuxtImg
              :src="staff.pictureUrl || '/assets/images/default-avatar.webp'"
              :alt="staff.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              @error="handleImageError"
              loading="lazy"
              placeholder
            />
            
            <div class="absolute inset-0 bg-gradient-to-t from-[#09033b]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div class="mt-4 text-center">
            <h3 class="text-lg font-bold text-[#09033b] leading-tight group-hover:text-[#4f46e5] transition-colors">
              {{ staff.name }}
            </h3>
            <p class="text-xs sm:text-sm font-medium text-[#FF7F50] uppercase tracking-wide mt-1">
              {{ staff.position }}
            </p>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20 bg-white rounded-3xl border border-gray-100 border-dashed">
        <UIcon name="i-heroicons-user-group" class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">No team members found currently.</p>
      </div>

      <div class="flex flex-col items-center justify-center space-y-8 pt-8 border-t border-gray-100">
        <Button 
          styles="primary" 
          to="/team" 
          content="View All Staff" 
          icon="heroicons:user-group" 
        />
        
        <div class="flex items-center gap-2 text-sm text-gray-500 bg-white px-5 py-2 rounded-full border border-gray-200 shadow-sm">
          <span>Interested in joining us?</span>
          <NuxtLink to="/jobs" class="font-semibold text-[#09033b] hover:text-[#FF7F50] transition-colors inline-flex items-center">
            Submit Application
            <UIcon name="i-heroicons-arrow-right" class="ml-1 w-3 h-3" />
          </NuxtLink>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";

// Props
const props = defineProps({
  limit: {
    type: Number,
    default: 8,
  },
  showPositions: {
    type: Array,
    default: () => [],
  },
});

const supabase = useSupabaseClient();
const staffs = ref([]);
const isLoading = ref(true);
const errorMessage = ref("");
const fetchController = ref(null);

const POSITION_PRIORITY = {
  "Chairman Board of Trustees": 1,
  "Executive Director": 2,
  Director: 3,
  Principal: 4,
  Administrator: 5,
};

// Computed property for filtering and limiting
const displayedStaff = computed(() => {
  let filtered = [...staffs.value];
  if (props.showPositions.length > 0) {
    filtered = filtered.filter((staff) =>
      props.showPositions.includes(staff.position)
    );
  }
  return filtered.slice(0, props.limit);
});

const fetchStaffs = async () => {
  if (fetchController.value) fetchController.value.abort();
  fetchController.value = new AbortController();
  
  isLoading.value = true;
  errorMessage.value = "";

  try {
    const { data, error } = await supabase
      .from("staff")
      .select("id, name, position, team, profile_image, created_at")
      .in("team", ["management", "office"])
      .order("created_at", { ascending: false })
      .abortSignal(fetchController.value.signal);

    if (error) throw error;

    if (data && data.length) {
      // Process images logic (kept from original)
      const staffWithImages = data.filter((staff) => staff.profile_image);
      const imagePromises = [];
      const batchSize = 5;

      for (let i = 0; i < staffWithImages.length; i += batchSize) {
        const batch = staffWithImages.slice(i, i + batchSize);
        const batchPromises = batch.map(async (staff) => {
          try {
            const { data: urlData } = await supabase.storage
              .from("staff-images")
              .createSignedUrl(staff.profile_image, 3600);
            return {
              staffId: staff.id,
              pictureUrl: urlData ? urlData.signedUrl : null,
            };
          } catch (err) {
            return { staffId: staff.id, pictureUrl: null };
          }
        });
        imagePromises.push(...batchPromises);
      }

      const imageResults = await Promise.allSettled(imagePromises);
      const urlMap = {};
      imageResults.forEach((result) => {
        if (result.status === "fulfilled" && result.value) {
          urlMap[result.value.staffId] = result.value.pictureUrl;
        }
      });

      data.forEach((staff) => {
        staff.pictureUrl = urlMap[staff.id] || null;
      });

      // Sort
      data.sort((a, b) => {
        const priorityA = POSITION_PRIORITY[a.position] || 999;
        const priorityB = POSITION_PRIORITY[b.position] || 999;
        if (priorityA === priorityB) return a.name.localeCompare(b.name);
        return priorityA - priorityB;
      });
    }

    staffs.value = data || [];
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error("Error:", error);
      errorMessage.value = "Failed to load team members.";
    }
  } finally {
    if (fetchController.value?.signal?.aborted !== true) {
      isLoading.value = false;
    }
  }
};

const handleImageError = (event) => {
  event.target.src = "/assets/images/default-avatar.webp";
};

const retryFetch = () => fetchStaffs();

defineExpose({ refreshData: fetchStaffs });

onMounted(() => fetchStaffs());
onUnmounted(() => {
  if (fetchController.value) fetchController.value.abort();
});
</script>