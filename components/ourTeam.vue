<template>
  <section class="bg-gray-50 py-12 md:py-16 px-4 sm:px-6 lg:px-8 font-inter overflow-x-hidden">
    <div class="max-w-7xl mx-auto text-center">
      <div class="text-center mb-10 md:mb-12">
        <h2
          class="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-[#09033b] tracking-tight mb-8"
        >
          Our
          <span class="font-medium">Team</span>
        </h2>

        <!-- Subtle Accent Line -->
        <div class="w-16 h-px bg-[#09033b] mx-auto mb-8"></div>
        <p
          class="mt-4 md:mt-6 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto"
        >
          Meet our dedicated team of God-fearing professionals
        </p>
      </div>

      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="py-12 flex flex-col items-center justify-center"
      >
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#09033b]"
        ></div>
        <p class="text-gray-600">Loading team members...</p>
      </div>

      <!-- Error Message -->
      <div
        v-else-if="errorMessage"
        class="bg-red-100 border-l-4 border-red-500 p-4 mb-6 text-left mx-auto max-w-lg"
      >
        <div class="flex">
          <div class="ml-3">
            <p class="text-red-700 text-sm">{{ errorMessage }}</p>
            <button
              @click="retryFetch"
              class="mt-2 text-sm text-red-700 font-medium hover:text-red-900 flex items-center"
            >
              <UIcon name="i-heroicons-arrow-path" class="mr-1 h-4 w-4" />
              Retry Loading
            </button>
          </div>
        </div>
      </div>

      <!-- Team grid with consistent image sizes -->
      <div
        v-else-if="staffs.length > 0"
        class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 md:mb-12"
      >
        <div
          v-for="staff in staffs"
          :key="staff.id"
          class="flex flex-col items-center"
        >
          <!-- Fixed size square container for all images -->
          <div
            class="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] overflow-hidden mb-3 sm:mb-4 rounded-lg shadow-md bg-white"
          >
            <NuxtImg
              :src="staff.pictureUrl || '/assets/images/default-avatar.webp'"
              :alt="`${staff.name}'s profile`"
              class="w-full h-full object-cover"
              @error="handleImageError"
              loading="lazy"
              format="webp"
              quality="80"
              sizes="sm:160px md:160px lg:160px"
              :placeholder="[10, 10, 75]"
              width="160"
              height="160"
            />
          </div>
          <div class="text-center w-full max-w-[160px]">
            <h3
              class="font-semibold text-base sm:text-lg text-gray-800 truncate"
            >
              {{ staff.name }}
            </h3>
            <p class="text-xs sm:text-sm text-gray-600 mt-1 truncate">
              {{ staff.position }}
            </p>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!isLoading"
        class="py-8 flex flex-col items-center justify-center"
      >
        <UIcon
          name="i-heroicons-user-group"
          class="h-12 w-12 text-gray-400 mb-3"
        />
        <p class="text-gray-600">No team members found</p>
      </div>

      <NuxtLink
        to="/team"
        class="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 border border-transparent text-sm sm:text-base font-medium text-white bg-[#09033b] hover:bg-blue-700 transition duration-300 shadow-sm"
        aria-label="View all staff members"
      >
        View All Staff
        <svg
          class="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </NuxtLink>
      <div class="mt-4 text-sm text-gray-500">
        <p>Want to join our team?</p>
        <NuxtLink to="/jobs" class="text-blue-600 hover:underline">
          Submit Application
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useSupabaseClient } from "#imports";
import { useFetch } from "#app";

const supabase = useSupabaseClient();
const staffs = ref([]);
const isLoading = ref(true);
const errorMessage = ref("");
const fetchController = ref(null);

// Priority positions for sorting
const POSITION_PRIORITY = {
  "Chairman Board of Trustees": 1,
  "Executive Director": 2,
  Director: 3,
  Principal: 4,
  Administrator: 5,
};

// Create a fetch function that properly uses AbortController for cancellation
const fetchStaffs = async () => {
  // Cancel any previous requests
  if (fetchController.value) {
    fetchController.value.abort();
  }

  // Create a new AbortController
  fetchController.value = new AbortController();
  isLoading.value = true;
  errorMessage.value = "";

  try {
    // Fetch staff members
    const { data, error } = await supabase
      .from("staff")
      .select("id, name, position, team, profile_image, created_at")
      .in("team", ["management", "office"])
      .order("created_at", { ascending: false })
      .abortSignal(fetchController.value.signal);

    if (error) throw error;

    // Process the staff data
    if (data && data.length) {
      // Create batch signed URLs for better performance
      const staffWithImages = data.filter((staff) => staff.profile_image);
      const imagePromises = [];

      // Process in smaller batches to avoid overwhelming the server
      const batchSize = 5;
      for (let i = 0; i < staffWithImages.length; i += batchSize) {
        const batch = staffWithImages.slice(i, i + batchSize);

        const batchPromises = batch.map(async (staff) => {
          try {
            const { data: urlData, error: urlError } = await supabase.storage
              .from("staff-images")
              .createSignedUrl(staff.profile_image, 3600); // 1 hour expiry

            return {
              staffId: staff.id,
              pictureUrl: !urlError && urlData ? urlData.signedUrl : null,
            };
          } catch (err) {
            console.error(`Error fetching image for staff ${staff.id}:`, err);
            return { staffId: staff.id, pictureUrl: null };
          }
        });

        imagePromises.push(...batchPromises);
      }

      // Wait for all image URL requests to complete
      const imageResults = await Promise.allSettled(imagePromises);

      // Process the results and update the staff data
      const urlMap = {};
      imageResults.forEach((result) => {
        if (result.status === "fulfilled" && result.value) {
          urlMap[result.value.staffId] = result.value.pictureUrl;
        }
      });

      // Update the staff data with picture URLs
      data.forEach((staff) => {
        staff.pictureUrl = urlMap[staff.id] || null;
      });

      // Custom sorting based on position priority
      data.sort((a, b) => {
        const priorityA = POSITION_PRIORITY[a.position] || 999;
        const priorityB = POSITION_PRIORITY[b.position] || 999;

        if (priorityA === priorityB) {
          // If same priority, sort alphabetically by name
          return a.name.localeCompare(b.name);
        }

        return priorityA - priorityB;
      });
    }

    staffs.value = data || [];
  } catch (error) {
    // Only set error if not aborted
    if (error.name !== "AbortError") {
      console.error("Error fetching staff:", error);
      errorMessage.value = "Failed to load team members. Please try again.";
    }
  } finally {
    // Only update loading state if not aborted
    if (fetchController.value?.signal?.aborted !== true) {
      isLoading.value = false;
    }
  }
};

// Handle image loading errors
const handleImageError = (event) => {
  event.target.src = "/assets/images/default-avatar.webp";
};

// Function to retry fetching data
const retryFetch = () => {
  fetchStaffs();
};

// Provide a method to refresh data that can be called from parent components
defineExpose({
  refreshData: fetchStaffs,
});

// Define props with defaults to allow customization if needed
const props = defineProps({
  limit: {
    type: Number,
    default: 8, // Default to showing 8 staff members
  },
  showPositions: {
    type: Array,
    default: () => [], // Optional filter by position
  },
});

// Computed property for filtered staff members
const displayedStaff = computed(() => {
  let filtered = [...staffs.value];

  // Apply position filter if provided
  if (props.showPositions.length > 0) {
    filtered = filtered.filter((staff) =>
      props.showPositions.includes(staff.position)
    );
  }

  // Apply limit
  return filtered.slice(0, props.limit);
});

// Clean up on component unmount
onUnmounted(() => {
  if (fetchController.value) {
    fetchController.value.abort();
  }
});

// Initial data fetch
onMounted(() => {
  fetchStaffs();
});
</script>
