<template>
  <div class="min-h-screen bg-gray-50 font-inter">
    <header class="border-b border-gray-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-5xl">
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-[#FF7F50]">Candidate assessment</p>
        <div class="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 class="text-3xl font-light tracking-tight text-[#09033b]">E-<span class="font-bold">Testing</span></h1>
            <p class="mt-2 text-sm text-gray-500">Administer an in-person diagnostic test and download the completed assessment.</p>
          </div>
          <button
            @click="returnToPicker"
          >
            <UIcon name="i-heroicons-arrow-left" class="h-4 w-4" aria-hidden="true" />
            Back to Tests
          </button>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <section v-if="view === 'picker'" aria-labelledby="test-picker-heading">
        <div class="mb-6">
          <h2 id="test-picker-heading" class="text-xl font-bold text-[#09033b]">Choose a test</h2>
          <p class="mt-1 text-sm text-gray-500">Select the assessment to administer to the candidate.</p>
        </div>
        <div class="grid gap-4 md:grid-cols-2">
          <button
            v-for="test in tests"
            :key="test.id"
            type="button"
            class="group flex min-h-40 flex-col items-start justify-between border border-gray-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#09033b] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#09033b] focus:ring-offset-2"
            @click="selectTest(test)"
          >
            <span>
              <span class="mb-3 flex h-10 w-10 items-center justify-center bg-[#09033b] text-white">
                <UIcon name="i-heroicons-clipboard-document-check" class="h-5 w-5" aria-hidden="true" />
              </span>
              <span class="block text-lg font-bold text-[#09033b]">{{ test.title }}</span>
              <span class="mt-2 block text-sm text-gray-500">{{ test.questions.length }} {{ test.questions.length === 1 ? 'question' : 'questions' }}</span>
            </span>
            <span class="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#FF7F50]">
              Start setup
              <UIcon name="i-heroicons-arrow-right" class="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </button>
        </div>
      </section>

      <section v-else-if="view === 'intro'" class="mx-auto max-w-2xl" aria-labelledby="intro-heading">
        <div class="border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-[#FF7F50]">Test setup</p>
          <h2 id="intro-heading" class="mt-2 text-2xl font-bold text-[#09033b]">{{ selectedTest.title }}</h2>
          <p class="mt-3 text-gray-600">{{ selectedTest.instructions }}</p>
          <p class="mt-2 text-sm text-gray-500">{{ selectedTest.questions.length }} questions. Answers remain on this device until the PDF is downloaded.</p>

          <form class="mt-8 space-y-5" @submit.prevent="startTest">
            <div>
              <label for="candidate-name" class="mb-2 block text-sm font-semibold text-gray-700">Candidate Name</label>
              <input id="candidate-name" v-model.trim="candidate.name" type="text" required autocomplete="name" class="w-full border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[#09033b] focus:ring-2 focus:ring-[#09033b]/20" />
            </div>
            <div>
              <label for="candidate-email" class="mb-2 block text-sm font-semibold text-gray-700">Candidate Email</label>
              <input id="candidate-email" v-model.trim="candidate.email" type="email" required autocomplete="email" class="w-full border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[#09033b] focus:ring-2 focus:ring-[#09033b]/20" />
            </div>
            <button type="submit" class="inline-flex w-full items-center justify-center gap-2 bg-[#09033b] px-5 py-3 font-semibold text-white transition hover:bg-[#0c0552] focus:outline-none focus:ring-2 focus:ring-[#09033b] focus:ring-offset-2">
              Start Test
              <UIcon name="i-heroicons-arrow-right" class="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </section>

      <section v-else class="space-y-6" aria-labelledby="test-heading">
        <div class="border border-gray-200 bg-white p-6 shadow-sm">
          <div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.2em] text-[#FF7F50]">In progress</p>
              <h2 id="test-heading" class="mt-2 text-2xl font-bold text-[#09033b]">{{ selectedTest.title }}</h2>
              <p class="mt-2 text-sm text-gray-500">Candidate: {{ candidate.name }} ({{ candidate.email }})</p>
            </div>
            <p class="text-sm font-semibold text-gray-500">{{ answeredCount }} / {{ selectedTest.questions.length }} answered</p>
          </div>
        </div>

        <form class="space-y-5" @submit.prevent="submitTest">
          <div v-if="selectedTest.passages" class="space-y-5">
            <section v-for="passage in selectedTest.passages" :key="passage.id" class="border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h3 class="text-lg font-bold text-[#09033b]">{{ passage.title }}</h3>
              <div class="mt-4 whitespace-pre-line text-sm leading-7 text-gray-700">{{ passage.text }}</div>
            </section>
          </div>
          <article v-for="(question, index) in selectedTest.questions" :key="question.id" class="border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 class="text-base font-bold leading-7 text-[#09033b]">
              <span class="mr-2 text-[#FF7F50]">{{ index + 1 }}.</span>{{ question.prompt }}
            </h3>
            <div v-if="question.type === 'mcq'" class="mt-5 space-y-3">
              <label v-for="(option, optionIndex) in question.options" :key="`${question.id}-${optionIndex}`" class="flex cursor-pointer items-start gap-3 border border-gray-200 p-4 text-sm text-gray-700 transition hover:border-[#09033b] has-[:checked]:border-[#09033b] has-[:checked]:bg-[#09033b]/5">
                <input v-model="answers[question.id]" type="radio" :name="question.id" :value="option" class="mt-0.5 h-4 w-4 accent-[#09033b]" />
                <span>{{ option }}</span>
              </label>
            </div>
            <textarea v-else v-model="answers[question.id]" rows="5" class="mt-5 w-full resize-y border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#09033b] focus:ring-2 focus:ring-[#09033b]/20" :aria-label="`Answer for question ${index + 1}`"></textarea>
          </article>

          <div v-if="formError" class="border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">{{ formError }}</div>
          <div class="flex justify-end border-t border-gray-200 pt-6">
            <button type="submit" class="inline-flex items-center justify-center gap-2 bg-[#FF7F50] px-6 py-3 font-bold text-white transition hover:bg-[#e96e40] focus:outline-none focus:ring-2 focus:ring-[#FF7F50] focus:ring-offset-2">
              <UIcon name="i-heroicons-arrow-down-tray" class="h-5 w-5" aria-hidden="true" />
              Submit & Download PDF
            </button>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import jsPDF from 'jspdf'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

useHead({
  title: 'E-Testing | Admin',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})

const tests = [
  {
    id: 'math-general',
    title: 'Mathematics Test - General Primary Teacher Role',
    instructions: 'Answer all questions.',
    questions: [
      { id: 'q1', type: 'mcq', prompt: 'Which of the following is NOT a characteristic of an isosceles triangle?', options: ['Opposite sides are equal.', 'All sides are equal.', 'Base angles are equal.'] },
      { id: 'q2', type: 'mcq', prompt: 'The interior angles of a triangle are 75 degrees, 56 degrees, and y degrees. Find the value of y.', options: ['94 degrees', '49 degrees', '96 degrees'] },
      { id: 'q3', type: 'mcq', prompt: 'How many liters are there in 5000ml?', options: ['5l', '500l', '50l'] },
      { id: 'q4', type: 'mcq', prompt: 'Write 6.00am in 24-hour clock format.', options: ['18:00 GMT', '06:00 GMT', '16:00 GMT'] },
      { id: 'q5', type: 'mcq', prompt: 'What is the total time spent by a car travelling a distance of 360km with a speed of 40km/hr?', options: ['8 hours', '9 hours', '6 hours'] },
      { id: 'q6', type: 'mcq', prompt: 'An open cube has how many faces?', options: ['5', '6', '8'] },
      { id: 'q7', type: 'short_text', prompt: '___________ drawing is using a smaller drawing to represent a large one. (fill in the blank)' },
      { id: 'q8', type: 'mcq', prompt: 'In the dataset: 3, 9, 8, 5, 7, 4, what is the median?', options: ['6', '7', '5'] },
      { id: 'q9', type: 'mcq', prompt: 'The mean of the dataset in question 8 above is:', options: ['6', '5', '7'] },
      { id: 'q10', type: 'mcq', prompt: 'Pick the odd one out.', options: ['Pictogram', 'Bar chart', 'Population'] }
    ]
  },
  {
    id: 'math-specialist',
    title: 'Mathematics Test - Mathematics Specialist Teacher Role',
    instructions: 'Answer all questions.',
    questions: [
      { id: 'q1', type: 'short_text', prompt: 'Core Geometry: Which defining characteristic separates an isosceles triangle from an equilateral triangle?' },
      { id: 'q2', type: 'short_text', prompt: 'Angles & Geometry: The interior angles of a triangle are 75 degrees, 56 degrees, and y degrees. Calculate the exact value of y.' },
      { id: 'q3', type: 'short_text', prompt: 'Unit Conversion: Convert 5500ml into liters and state the fractional equivalent in its simplest form.' },
      { id: 'q4', type: 'short_text', prompt: 'Time & Calendar: A train departs at 6:45 AM and arrives at 14:20. How long did the journey take in hours and minutes?' },
      { id: 'q5', type: 'short_text', prompt: 'Speed, Distance & Time: What is the total time spent by a car travelling a distance of 360km at a constant speed of 40km/hr?' },
      { id: 'q6', type: 'short_text', prompt: '3D Spatial Geometry: An open box shaped like a cube is painted on the outside only. How many painted faces does it have?' },
      { id: 'q7', type: 'short_text', prompt: "Scale & Representation: Define the term 'scale drawing' and provide one practical example of its use in a primary classroom setting." },
      { id: 'q8', type: 'short_text', prompt: 'Measures of Location: Calculate the median and the range of the following dataset: 3, 9, 8, 5, 7, 4.' },
      { id: 'q9', type: 'short_text', prompt: 'Data Calculation: Determine the mean of the dataset given in question 8 above.' },
      { id: 'q10', type: 'short_text', prompt: 'Data Classification: Categorize the following terms and identify the odd one out with reason: Pictogram, Bar chart, Population, Pie chart.' },
      { id: 'q11', type: 'short_text', prompt: 'Advanced Computation (Order of Operations): Evaluate 24 - 4 x (3 + 2) / 2 using BODMAS/PEMDAS.' },
      { id: 'q12', type: 'short_text', prompt: 'Advanced Problem Solving: A water tank is 2/5 full. When 30 more liters of water are added, the tank becomes 7/10 full. What is the total maximum capacity of the tank in liters?' },
      { id: 'q13', type: 'short_text', prompt: 'Advanced Probability & Statistics: A bag contains 4 red marbles, 3 blue marbles, and 5 green marbles. What is the probability of picking a blue marble, expressed as a percentage?' },
      { id: 'q14', type: 'short_text', prompt: 'Algebraic Reasoning: Solve for x in the equation: 3x + 7 = 22.' },
      { id: 'q15', type: 'short_text', prompt: "Mathematics Pedagogy & Methodology: Briefly explain how you would teach the distinction between a 'factor' and a 'multiple' to a Grade 4 primary class, using the number 12 as your main teaching example." }
    ]
  },
  {
    id: 'prospectus',
    title: 'Prospectus Test',
    instructions: 'Answer all questions.',
    questions: [
      { id: 'q1', type: 'short_text', prompt: 'What is the name of the school?' },
      { id: 'q2', type: 'short_text', prompt: 'Write out three registration procedures of the school.' },
      { id: 'q3', type: 'short_text', prompt: 'What are the classes in this school called?' },
      { id: 'q4', type: 'short_text', prompt: 'List 3 purposes and practices in this school.' }
    ]
  },
  {
    id: 'english',
    title: 'Use of English Language Test - Question Paper Type B',
    instructions: 'Read passages 1 and 2 carefully, then answer the questions that follow. Complete the objectives section by choosing the best option. Suggested duration: 35 minutes.',
    passages: [
      { id: 'passage-1', title: 'Passage 1', text: 'Music plays a vital role in human society. Good music provides entertainment and emotional release, and it accompanies activities ranging from dances to religious ceremonies. Music is heard everywhere; in auditoriums, homes, elevators, schools, sports arenas and on the streets. Recorded performance is a sensational innovation of the twentieth century. Thanks to modern technology like compact disc (CD), digital video disc (DVD) and the MP3 player, music can now be heard in diverse places. Such places include living rooms and cars. Jogging paths can also function as new kinds of concert halls where we can hear what we want as often as we want.\n\nLive performances provide a special excitement. In a live performance, artistes put themselves on the line. To avoid embarrassment, the artiste must train beforehand and ensure the technical difficulties are avoided and that the listeners are actively involved. What is performed, how it sounds and how the artistes feel that evening exist for a fleeting moment and can never be repeated. An audience responds to the excitement of such a moment and feelings are exchanged between stage and hall.\n\nOur response to musical performance or an artiste is subjective and rooted in deep feelings. Even professional critics can differ strongly in their evaluations of a performance. There is no one truth about what we hear and feel. It is up to us as listeners to evaluate performances of music. Alert and repeated listening will enhance our ability to compare performances and judge music so that we can fully enjoy it.' },
      { id: 'passage-2', title: 'Passage 2', text: 'In 1951, the Government decided to start a Pottery Training Centre where new and more advanced technical methods, especially glazing, could be taught. The centre was intended to serve the whole of the defunct Northern Region, and there were several reasons for choosing Abuja. The first was the excellence of the traditional pottery made in the Emirate. Secondly, firewood is plentiful; this is the most important consideration, because in the making of glazed pottery, more firewood than clay is required. Thirdly, there are good clays and good local sources for the raw materials needed for the glazes. Fourthly, water, which is another important raw material, is plentiful. Finally, Abuja is in a central position for the whole region.\n\nNearly all the making is done by a process called throwing, so called because the lumps of clay are thrown by the potter onto a wheel-head. They are weighed out so that each pot will be roughly the same size. Note: the original scan is unclear here; a phrase describing how the potter drives the wheel appears to be cut off. He has a bowl of water, a loofah, a bamboo knife, a pointed stick or porcupine quill, a wooden-smoothing tool called a rib, and a piece of wire-like object used for wedging. He makes the wheel-head slightly damp and throws the lump into the middle, using water to keep it slippery. He shapes the pot and trims off waste clay. In this way, a small and medium-sized pot can be made more quickly and accurately.' }
    ],
    questions: [
      { id: 'q1', type: 'mcq', prompt: 'Which question paper type of Use of English is given to you?', options: ['Type D', 'Type B', 'Type I', 'Type U'] },
      { id: 'q2', type: 'mcq', prompt: 'The expression "stage and hall," as used in Passage 1 means the', options: ['director and audience', 'artiste and his music', 'artiste and the audience', 'producer and director'] },
      { id: 'q3', type: 'mcq', prompt: 'From Passage 1, it can be deduced that music is...', options: ['better appreciated by professional critics', 'appreciated as the environment dictates', 'better appreciated in a crowd', 'better appreciated when we are happy'] },
      { id: 'q4', type: 'mcq', prompt: 'According to the writer, live performances provide a special excitement because they are', options: ['educative', 'stage-managed', 'interactive', 'error-free and original'] },
      { id: 'q5', type: 'mcq', prompt: 'According to Passage 1, music plays a vital role in human society because', options: ['everybody can listen to music through the CD, MP3 and DVD', 'music provides enjoyment and relief', 'it is easy to appreciate music', 'stage performance is the most popular music opportunity'] },
      { id: 'q6', type: 'mcq', prompt: 'Which of the following was a reason for choosing Abuja as a pottery center?', options: ['it was the only place for glazed project', 'its medium-sized pot project', 'it was the only place for pot makers', 'its proximity to raw materials'] },
      { id: 'q7', type: 'mcq', prompt: 'Which of the following is true according to Passage 2?', options: ['The potter does not have to work hard if he uses the wheel', 'Anyone, with almost no training, can run pots on a wheel', 'Pots can be made quickly and correctly', 'A pot thrown on a wheel is less likely to break'] },
      { id: 'q8', type: 'mcq', prompt: 'The girl says she is averse ..... what others admire.', options: ['for', 'from', 'to', 'with'] },
      { id: 'q9', type: 'mcq', prompt: 'Our teacher defined ...... in his introductory lecture. Choose the correctly spelled word.', options: ['onomatopiea', 'onomatopoeia', 'onomatopoeia', 'onomatopoeia'] },
      { id: 'q10', type: 'mcq', prompt: 'The philanthropist devoted himself ...... the poor.', options: ['to helping', 'in helping', 'by helping', 'to be helping'] },
      { id: 'q11', type: 'mcq', prompt: 'Tinu likes apples..... she does not like oranges.', options: ['or', 'for', 'so', 'but'] },
      { id: 'q12', type: 'mcq', prompt: 'The students had a ..... on Independence Day.', options: ['march pass', 'match pass', 'mass pass', 'match post'] },
      { id: 'q13', type: 'mcq', prompt: 'Do you mind ..... another hour or two?', options: ['to wait', 'to have waited', 'wait', 'waiting'] },
      { id: 'q14', type: 'mcq', prompt: 'The continuous rain has really ..... the soil.', options: ['melted up', 'mopped up', 'satiated', 'saturated'] },
      { id: 'q15', type: 'mcq', prompt: 'The police described the boy as being ....... hand.', options: ['on by', 'up to', 'over at', 'out of'] },
      { id: 'q16', type: 'mcq', prompt: 'It was very easy for the two political parties to form a ..... government.', options: ['co-operative', 'colonial', 'collusion', 'coalition'] },
      { id: 'q17', type: 'mcq', prompt: 'All farmers were encouraged...... carry out fumigation on their farms.', options: ['to', 'from', 'in', 'with'] },
      { id: 'q18', type: 'mcq', prompt: 'There were lots of ..... in the park.', options: ['luxury buses moving fast', 'luxury buses fast moving', 'moving fast luxury buses', 'fast-moving luxury buses'] },
      { id: 'q19', type: 'mcq', prompt: 'Yours is to command....., is to obey.', options: ['their', 'theirs', 'theirs', "theirs"] },
      { id: 'q20', type: 'mcq', prompt: 'Local governments are authorized to pass .......', options: ["bye's-law", 'bye-law', 'bye-laws', "byes'-laws"] },
      { id: 'q21', type: 'mcq', prompt: 'Umar: I have never visited the dentist. Aliyu: ...', options: ['neither have I', 'I also never', 'neither myself', "I myself haven't"] },
      { id: 'q22', type: 'mcq', prompt: 'Usman would have won the race....', options: ['if can run faster', 'although he ran faster', 'only if he could run faster', 'if he had run faster'] },
      { id: 'q23', type: 'mcq', prompt: 'My father told me to take the money from...... it.', options: ['ever who offers', 'whoever offers', 'whomever offers', 'whomsoever offers'] },
      { id: 'q24', type: 'mcq', prompt: "Our teacher defined.... as the killing of one's mother.", options: ['patriarch', 'matricide', 'matriarch', 'patricide'] },
      { id: 'q25', type: 'mcq', prompt: 'If you are confused ..... anything, phone my office.', options: ['about', 'for', 'of', 'with'] },
      { id: 'q26', type: 'mcq', prompt: 'We have a family mutiny..... our hands.', options: ['from', 'of', 'on', 'for'] },
      { id: 'q27', type: 'mcq', prompt: 'We should try to help.....', options: ['the less fortunate', 'this less fortunate', 'the less fortunate', 'less fortunate'] },
      { id: 'q28', type: 'mcq', prompt: 'Glazier: choose the option with the same vowel sound.', options: ['gleam', 'flat', 'feign', 'glass'] },
      { id: 'q29', type: 'mcq', prompt: 'Laud: choose the option with the same vowel sound.', options: ['lavatory', 'loud', 'lathe', 'core'] },
      { id: 'q30', type: 'mcq', prompt: 'Coma: choose the option with the same vowel sound.', options: ['colonel', 'cogent', 'come', 'comma'] },
      { id: 'q31', type: 'mcq', prompt: 'Lose: choose the option with the same consonant sound.', options: ['mouse', 'nurse', 'noise', 'horse'] },
      { id: 'q32', type: 'mcq', prompt: 'Guitar: choose the option with the same consonant sound.', options: ['jam', 'strange', 'judge', 'rogue'] },
      { id: 'q33', type: 'mcq', prompt: 'Loose: choose the option with the same consonant sound.', options: ['sell', 'fuse', 'close', 'rouse'] },
      { id: 'q34', type: 'mcq', prompt: 'Rite: choose the option that rhymes with the given word.', options: ['list', 'wit', 'wright', 'rim'] },
      { id: 'q35', type: 'mcq', prompt: 'Joys: choose the option that rhymes with the given word.', options: ['elbow', 'pots', 'boys', 'stays'] },
      { id: 'q36', type: 'mcq', prompt: 'Call: choose the option that rhymes with the given word.', options: ['wall', 'quail', 'dull', 'slate'] },
      { id: 'q37', type: 'mcq', prompt: 'Dedication: choose the most appropriate stress pattern.', options: ['dedicaTION', 'deDIcation', 'dediCAtion', 'DEdication'] },
      { id: 'q38', type: 'mcq', prompt: 'International: choose the most appropriate stress pattern.', options: ['interNAtional', 'internaTIOnal', 'INternational', 'inTERnational'] },
      { id: 'q39', type: 'mcq', prompt: 'Information: choose the most appropriate stress pattern.', options: ['inforMAtion', 'informaTION', 'inFORmation', 'INformation'] },
      { id: 'q40', type: 'mcq', prompt: 'In "Adamu is leaving a car behind," the emphatic stress is on "leaving." Choose the question the sentence answers.', options: ['who is leaving a car behind?', 'Is Adamu leaving a car in front?', 'Who is leaving a car behind?', 'Where is Adamu leaving a car?'] },
      { id: 'q41', type: 'mcq', prompt: 'In "Lambusa TOOK OFF the wig," choose the question the sentence answers.', options: ['Who took off the wig?', 'What did Lambusa do?', 'Did Lambusa take off a wig?', 'Did Lambusa take off the ring?'] },
      { id: 'q42', type: 'mcq', prompt: 'In "The bed is IN the room," choose the question the sentence answers.', options: ['Is the bed in the parlour?', 'Was the bed in the room?', 'What is in the room?', 'Where is the bed?'] }
    ]
  }
]

const view = ref('picker')
const selectedTest = ref(null)
const candidate = ref({ name: '', email: '' })
const answers = ref({})
const formError = ref('')

const answeredCount = computed(() => selectedTest.value?.questions.filter((question) => String(answers.value[question.id] || '').trim()).length || 0)

const selectTest = (test) => {
  selectedTest.value = test
  candidate.value = { name: '', email: '' }
  answers.value = {}
  formError.value = ''
  view.value = 'intro'
}

const startTest = () => {
  formError.value = ''
  if (!selectedTest.value.questions.length) {
    formError.value = 'This test has no questions yet. Add the English questions before starting it.'
    return
  }
  view.value = 'test'
}

const returnToPicker = () => {
  selectedTest.value = null
  candidate.value = { name: '', email: '' }
  answers.value = {}
  formError.value = ''
  view.value = 'picker'
}

const safePdfText = (value) => String(value || '').replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/[\u2013\u2014]/g, '-').replace(/\u00A0/g, ' ')

const addWrappedText = (pdf, text, x, y, width, lineHeight = 5) => {
  const lines = pdf.splitTextToSize(safePdfText(text), width)
  pdf.text(lines, x, y)
  return y + lines.length * lineHeight
}

const submitTest = () => {
  formError.value = ''
  const unanswered = selectedTest.value.questions.find((question) => !String(answers.value[question.id] || '').trim())
  if (unanswered) {
    formError.value = 'Please answer every question before submitting the test.'
    return
  }

  const pdf = new jsPDF({ unit: 'mm', format: 'a4' })
  const margin = 18
  const contentWidth = 210 - margin * 2
  let y = 20
  const ensureSpace = (height) => {
    if (y + height > 280) {
      pdf.addPage()
      y = 20
    }
  }

  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(18)
  y = addWrappedText(pdf, 'The Covenant Academy', margin, y, contentWidth, 7)
  pdf.setFontSize(13)
  y += 3
  y = addWrappedText(pdf, selectedTest.value.title, margin, y, contentWidth, 6)
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(10)
  y += 5
  y = addWrappedText(pdf, `Candidate: ${candidate.value.name}`, margin, y, contentWidth)
  y = addWrappedText(pdf, `Email: ${candidate.value.email}`, margin, y, contentWidth)
  y = addWrappedText(pdf, `Submitted: ${new Date().toLocaleString('en-GB')}`, margin, y, contentWidth)
  y += 7
  pdf.setDrawColor(210, 210, 210)
  pdf.line(margin, y, 210 - margin, y)
  y += 8

  selectedTest.value.questions.forEach((question, index) => {
    const answer = answers.value[question.id]
    ensureSpace(20)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(10)
    y = addWrappedText(pdf, `${index + 1}. ${question.prompt}`, margin, y, contentWidth)
    y += 2
    pdf.setFont('helvetica', 'normal')
    y = addWrappedText(pdf, `Answer: ${answer}`, margin + 4, y, contentWidth - 4)
    y += 7
  })

  const fileName = `${selectedTest.value.id}-${candidate.value.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'candidate'}.pdf`
  pdf.save(fileName)
  returnToPicker()
}
</script>
