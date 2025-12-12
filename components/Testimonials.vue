<template>
  <section class="bg-gray-50 py-16 font-inter">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#09033b] tracking-tight mb-8 text-center">
        Testimonies from our TCA Family
      </h1>

      <div class="relative">
        <div class="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
          <div
            v-for="(testimony, index) in testimonies"
            :key="index"
            class="bg-white border border-gray-200 shadow rounded-lg p-6 min-w-[300px] sm:min-w-[350px] max-w-[350px] flex-shrink-0 flex flex-col justify-between snap-start"
          >
            <div>
              <h3 class="text-lg font-semibold text-[#09033b] mb-4">
                Celebrating the doings of God in the lives of our Treasures @TCA/TCAD
              </h3>
              <p class="text-gray-700 leading-relaxed text-sm">
                {{ truncateText(testimony, 120) }}
              </p>
            </div>
            <button
              @click="openModal(testimony)"
              class="mt-4 text-indigo-600 hover:text-indigo-800 hover:underline font-medium text-left transition-colors"
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showModal"
          class="fixed inset-0  z-[99] flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto"
          @click="closeModal"
        >
          <div
            class="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 sm:p-8 relative my-8 max-h-[90vh] overflow-y-auto"
            @click.stop
          >
            <button
              @click="closeModal"
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h3 class="text-xl font-semibold text-[#09033b] mb-4 pr-8">
              Celebrating the doings of God in the lives of our Treasures @TCA/TCAD
            </h3>
            <p class="text-gray-700 leading-relaxed whitespace-pre-line">
              {{ selectedTestimony }}
            </p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'

const testimonies = [
  `Mrs O came to share her testimony some years ago. Her whole family attended TCA/TCAD.

They first started as fee payers but when her husband lost his job, the school approached them because they noticed that they had stopped bringing their children to school. We checked their story and offered them 100% scholarship. Even when they had to move away from the school, because of economic reasons, we gave them free busing until her husband was able to start bringing their children to school and he in turn started to help other children in need of transport. She once said to us, "Why are you doing this? We are not even members of your church". We told her that this was the one of the reasons why God spoke to our Bishop to start the school and when he heard about their situation and discovered it was genuine, he put all things in place to serve them. 
In TCA/TCAD, we believe that quality education is a bridge builder for the 21st century Nigerian child and we will do all we can to give as many children access to this. Through education, we can build the Nigerian child to excel in both academics and values.

She made our day when she told us that our school's ideology is working. She narrated how her 1st daughter went for the National common entrance exam and came back to tell her Mum joyfully that she refused to cheat even though she saw many children doing so. 

Her Mum asked her why she didn't cheat and she answered because I was taught in school not to cheat. 

We Give God all the Glory!!

#60DoingsofGodinTCA/TCAD`,

  `A parent came to testify some years ago that she and her family travelled to the UK for the 1st time. She stayed in with her family and her son was given pounds for the 1st time by his Uncle.

She was surprised when he walked up to her and said that he was not going to spend it but rather she should take him to see their pastor when they get back to Nigeria. She asked him why and he said, "They taught me in school about firstfruits and I want to present my first fruits to the Lord".

She said, I have to share the testimony because I had taught him about tithing but not firstfruits. She thanked God for the school.

We give God all the Glory!!

#60DoingsofGodinTCA/TCAD`,

  `A parent came to testify about his son's sense of purpose and intentionality through life.

I was used to complaining about giving but my son had to talk to me about it. He said he learnt from school never to complain about giving because God loves a cheerful giver.

Since then, I have become appreciative of the virtues and lessons he has learnt in TCAD.

#60DoingsOfGodInTCA/TCAD.`,

  `A couple shared with us on how God's mandate was made manifest in their daughter's life.

They prayed the child into being and trusted God that the child will live according to what He has ordained for her.

Recently, the daughter was ordained a pastor and she is moving from glory to glory. She will continue to tow the path of grace and righteousness.

Hallelujah!

#60DoingsOfGodInTCA/TCAD`,

  `A couple shared with us on how their son stood out while serving his Dad on mission trip and a mother used him as example.

He became the epitome of service to God and man.

He also served Mummy Hokett in Pasadena.

What a great testimony! They believe the TCA/TCAD contributed to his excellence and selflessness in service.

#60DoingsOfGodInTCA/TCAD.`,

  `A couple testified about how their daughter was offered an opportunity to move from Nigeria abroad by a relative, but the young girl believed in aligning herself to God's will and purpose. Her parents believe that the training in TCA/TCAD contributed to their daughter's point of view. Their daughter teaches her peers about purpose too.

Today she is where God wants her to be. Glory be to God.

#60DoingsOfGodInTCA/TCAD.`,

  `A couple shared with us on how their son's fervent commitment brought his friends to the knowledge of God.

They made us understand that he was the only one who attended church service in his Christian school in the US and that motivated his classmates to tow the same path.

The testimony consist of thanksgiving to God for his wonderous work in the young man's life and the role of TCA/TCAD in making him stand out like a true Daniel.

#60DoingsOfGodInTCA/TCAD.`
]

const showModal = ref(false)
const selectedTestimony = ref("")

function truncateText(text, length) {
  return text.length > length ? text.substring(0, length) + "..." : text
}

function openModal(testimony) {
  selectedTestimony.value = testimony
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

// Watch for modal state changes to control body scroll
watch(showModal, (newVal) => {
  if (process.client) {
    if (newVal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})
</script>

<style scoped>
/* Import Inter font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}
/* Hide scrollbar but allow scroll */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none; /* Firefox */
}

/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

</style>