<template>
  <section
    class="bg-[#09033b] max-w-6xl mx-auto border border-orange-400/20 shadow-lg p-4 md:p-6 font-inter"
    aria-label="Deepwater News Video Collection"
  >
    <!-- Header -->
    <header class="text-center mb-6">
      <h1 class="text-2xl md:text-3xl lg:text-4xl font-light leading-tight text-white tracking-tight">
        Deepwater News
      </h1>
      <div class="w-16 h-px bg-[#ff7f50] mx-auto mt-2"></div>
    </header>

    <!-- Video Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
      <article
        v-for="(video, index) in recentVideos"
        :key="video.id || index"
        class="bg-[#09033b]/30 overflow-hidden border border-indigo-900/30 transition-all duration-300 hover:shadow-md hover:shadow-orange-500/10"
      >
        <!-- Fixed Aspect Ratio Container -->
        <div class="relative aspect-video overflow-hidden">
          <!-- Thumbnail with Play Button -->
          <div v-if="!activeVideo[index]" class="h-full w-full relative">
            <img
              :src="`https://i.ytimg.com/vi/${getYoutubeId(video.video_url)}/hqdefault.jpg`"
              :alt="`Thumbnail for ${video.title}`"
              class="w-full h-full object-cover"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-black/30 flex items-center justify-center">
              <button 
                @click="playVideo(index)"
                class="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-400 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
                aria-label="Play video"
              >
                <svg class="w-6 h-6 text-white ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                </svg>
              </button>
            </div>
            <!-- Date Badge -->
            <div class="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1">
              {{ formatDate(video.created_at) }}
            </div>
          </div>
          
          <!-- YouTube iframe with same dimensions -->
          <div v-if="activeVideo[index]" class="h-full w-full">
            <iframe
              class="w-full h-full"
              :src="`https://www.youtube-nocookie.com/embed/${getYoutubeId(video.video_url)}?autoplay=1`"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              :title="`YouTube video player for ${video.title}`"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <!-- Content -->
        <div class="p-3">
          <h2 class="text-white text-base font-medium mb-2 min-h-[2.5rem] line-clamp-2">
            <a
              :href="video.video_url"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-orange-300 transition-colors"
            >
              {{ video.title }}
            </a>
          </h2>

          <a
            :href="video.video_url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-1 bg-orange-500 hover:bg-orange-400 text-white px-3 py-1.5 text-xs font-medium transition-colors w-full"
            aria-label="Watch on YouTube"
          >
            Watch on YouTube
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useSupabaseClient } from "#imports";

const supabase = useSupabaseClient();
const videos = ref([]);
const activeVideo = ref([]);

// Get only the three most recent videos
const recentVideos = computed(() => {
  return videos.value.slice(0, 3);
});

// Fetch videos from Supabase
const fetchVideos = async () => {
  try {
    const { data, error } = await supabase
      .from("videos")
      .select("id, title, video_url, created_at")
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) throw error;
    videos.value = data;
    activeVideo.value = new Array(data.length).fill(false);
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
};

// Play video when clicked
const playVideo = (index) => {
  activeVideo.value = [...activeVideo.value];
  activeVideo.value[index] = true;
};

// Extract YouTube video ID from URL
const getYoutubeId = (url) => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

// Fetch videos on component mount
onMounted(() => {
  fetchVideos();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Maintain consistent aspect ratio */
.aspect-video {
  aspect-ratio: 16/9;
}
</style>