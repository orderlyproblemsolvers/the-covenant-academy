<template>
  <section class="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#09033b] overflow-hidden font-inter selection:bg-[#FF7F50] selection:text-white">
    
    <div class="absolute inset-0 pointer-events-none">
      <svg class="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="grid-pattern-deepwater" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="white" stroke-width="1" fill="none"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid-pattern-deepwater)" />
      </svg>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto">
      
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-200 text-xs font-bold tracking-wide uppercase mb-6 backdrop-blur-sm">
          <span class="w-2 h-2 rounded-full bg-[#FF7F50] animate-pulse"></span>
          Media Center
        </div>
        
        <h2 class="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Deepwater <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7F50] to-[#ff9f7c]">News</span>
        </h2>
        
        <p class="text-lg text-gray-400 max-w-2xl mx-auto font-light">
          Catch up on the latest events, announcements, and stories from our campus.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <article 
          v-for="(video, index) in recentVideos" 
          :key="video.id || index"
          class="group bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-[#FF7F50]/30 hover:shadow-2xl hover:shadow-[#FF7F50]/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
        >
          <div class="relative aspect-video bg-black overflow-hidden">
            
            <div v-if="!activeVideo[index]" class="absolute inset-0 w-full h-full cursor-pointer" @click="playVideo(index)">
              
              <img 
                :src="`https://i.ytimg.com/vi/${getYoutubeId(video.video_url)}/hqdefault.jpg`" 
                :alt="video.title"
                class="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
                loading="lazy"
              />
              
              <div class="absolute inset-0 bg-gradient-to-t from-[#09033b]/90 via-black/20 to-transparent"></div>

              <div class="absolute inset-0 flex items-center justify-center">
                <div class="relative group/btn">
                  <span class="absolute inset-0 w-full h-full bg-[#FF7F50] rounded-full opacity-20 animate-ping group-hover/btn:animate-none"></span>
                  <div class="relative w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-xl group-hover/btn:bg-[#FF7F50] group-hover/btn:border-[#FF7F50] group-hover/btn:scale-110 transition-all duration-300">
                    <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="absolute top-4 left-4 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg text-xs font-medium text-white border border-white/10">
                {{ formatDate(video.created_at) }}
              </div>
            </div>

            <div v-else class="absolute inset-0 w-full h-full bg-black">
              <iframe
                class="w-full h-full"
                :src="`https://www.youtube-nocookie.com/embed/${getYoutubeId(video.video_url)}?autoplay=1`"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                :title="video.title"
              ></iframe>
            </div>
          </div>

          <div class="p-6 flex flex-col flex-grow">
            <h3 class="text-lg font-bold text-white line-clamp-2 leading-tight mb-3 group-hover:text-[#FF7F50] transition-colors">
              <button @click="playVideo(index)" class="text-left focus:outline-none">
                {{ video.title }}
              </button>
            </h3>
            
            <div class="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
              <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Video Update</span>
              
              <a 
                :href="video.video_url" 
                target="_blank" 
                rel="noopener"
                class="inline-flex items-center text-sm font-medium text-[#FF7F50] hover:text-[#ff9f7c] transition-colors"
              >
                Open in YouTube
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </a>
            </div>
          </div>

        </article>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const supabase = useSupabaseClient();
const videos = ref([]);
const activeVideo = ref([]);

const recentVideos = computed(() => {
  return videos.value.slice(0, 3);
});

const fetchVideos = async () => {
  try {
    const { data, error } = await supabase
      .from("videos")
      .select("id, title, video_url, created_at")
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) throw error;
    videos.value = data;
    // Initialize "active" state to false for all videos
    activeVideo.value = new Array(data.length).fill(false);
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
};

const playVideo = (index) => {
  activeVideo.value[index] = true;
};

const getYoutubeId = (url) => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};

onMounted(() => {
  fetchVideos();
});
</script>