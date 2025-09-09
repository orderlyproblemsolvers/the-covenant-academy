<template>
  <div class="curriculum-viewer p-6 max-w-7xl mx-auto font-inter">
    <!-- Header -->
    <div class="mb-10 text-center lg:text-left">
      <h1 class="text-4xl font-light text-[#09033b] tracking-tight mb-4">
        Grade <span class="font-medium">Curriculum</span> Viewer
      </h1>
      <div class="w-16 h-px bg-[#09033b] mx-auto lg:mx-0"></div>
    </div>

    <!-- Grade and Subject Selection -->
    <div class="flex flex-col lg:flex-row items-start gap-6 mb-10">
      <div class="flex flex-col sm:flex-row items-center gap-4">
        <label for="grade-select" class="text-base font-medium text-gray-600 whitespace-nowrap">
          Select Grade:
        </label>
        <select 
          id="grade-select"
          v-model="selectedGrade" 
          class="px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-[#09033b] focus:border-transparent outline-none min-w-40 text-gray-700"
        >
          <option value="">-- Select a Grade --</option>
          <option v-for="grade in availableGrades" :key="grade" :value="grade">
            {{ grade }}
          </option>
        </select>
      </div>

      <!-- Subject Selection -->
      <div v-if="selectedGrade && availableSubjects.length > 0" class="flex flex-col sm:flex-row items-center gap-4">
        <label for="subject-select" class="text-base font-medium text-gray-600 whitespace-nowrap">
          Jump to Subject:
        </label>
        <select 
          id="subject-select"
          v-model="selectedSubject" 
          @change="scrollToSubject"
          class="px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-[#09033b] focus:border-transparent outline-none min-w-52 text-gray-700"
        >
          <option value="">-- Select a Subject --</option>
          <option v-for="subject in availableSubjects" :key="subject" :value="subject">
            {{ subject }}
          </option>
        </select>
      </div>
    </div>

    <!-- Subject Navigation Pills (Mobile Friendly) -->
    <div v-if="selectedGrade && availableSubjects.length > 0" class="mb-8">
      <h3 class="text-sm font-medium text-gray-600 mb-3">Quick Navigation:</h3>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="subject in availableSubjects" 
          :key="subject"
          @click="navigateToSubject(subject)"
          class="px-3 py-1.5 text-sm bg-[#09033b]/10 text-[#09033b] rounded-lg hover:bg-[#09033b]/20 transition-colors border border-[#09033b]/20 hover:border-[#09033b]/40"
        >
          {{ subject }}
        </button>
      </div>
    </div>

    <!-- Curriculum Display -->
    <div v-if="selectedGrade && currentCurriculum" class="space-y-10">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-semibold text-[#09033b] tracking-tight">
          {{ selectedGrade }} <span class="text-gray-500">2025/2026 Scheme of Work</span>
        </h2>
        
        <!-- Back to Top Button -->
        <button
          v-if="showBackToTop"
          @click="scrollToTop"
          class="hidden lg:flex items-center gap-2 px-4 py-2 bg-[#09033b] text-white rounded-lg hover:bg-[#09033b]/90 transition-colors text-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
          Back to Top
        </button>
      </div>

      <div class="space-y-8">
        <div 
          v-for="(content, subjectName) in currentCurriculum.subjects" 
          :key="subjectName"
          :id="`subject-${subjectName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`"
          class="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition subject-section"
        >
          <!-- Subject Header -->
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold text-[#09033b] tracking-tight">
              {{ subjectName }}
            </h3>
            <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {{ Array.isArray(content) ? content.length : Object.values(content).flat().length }} topics
            </span>
          </div>

          <!-- If content is an array (direct topics) -->
          <div v-if="Array.isArray(content)" class="grid gap-4">
            <div 
              v-for="(topic, index) in content" 
              :key="index"
              class="p-4 bg-gray-50 rounded-xl border-l-4 border-[#09033b]/80"
            >
              <div class="flex items-center gap-2 mb-2">
                <span class="bg-[#09033b]/10 text-[#09033b] text-xs font-medium px-2.5 py-0.5 rounded">
                  Week {{ index + 1 }}
                </span>
              </div>
              <p class="text-gray-700 leading-relaxed">{{ topic }}</p>
            </div>
          </div>

          <!-- If content is an object (has sub-subjects) -->
          <div v-else-if="typeof content === 'object'" class="space-y-6">
            <div 
              v-for="(topics, subSubjectName) in content" 
              :key="subSubjectName"
              class="pl-4 border-l-4 border-[#09033b]/40"
            >
              <h4 class="text-lg font-medium text-[#09033b] mb-3">
                {{ subSubjectName }}
              </h4>
              <div class="grid gap-3">
                <div 
                  v-for="(topic, index) in topics" 
                  :key="index"
                  class="p-3 bg-[#09033b]/5 rounded-lg border-l-4 border-[#09033b]/30"
                >
                  <div class="flex items-center gap-2 mb-1">
                    <span class="bg-[#09033b]/10 text-[#09033b] text-xs font-medium px-2.5 py-0.5 rounded">
                      Week {{ index + 1 }}
                    </span>
                  </div>
                  <p class="text-gray-700 text-sm leading-relaxed">{{ topic }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="selectedGrade && !currentCurriculum" class="text-center py-16">
      <p class="text-gray-500 text-lg italic">
        No curriculum data found for <span class="text-[#09033b] font-medium">{{ selectedGrade }}</span>
      </p>
    </div>

    <!-- Initial State -->
    <div v-else class="text-center py-16">
      <p class="text-gray-500 text-lg">
        Please select a grade to view its curriculum
      </p>
    </div>

    <!-- Floating Back to Top Button (Mobile) -->
    <Transition name="fade">
      <button
        v-if="showBackToTop"
        @click="scrollToTop"
        class="lg:hidden fixed bottom-6 right-6 p-3 bg-[#09033b] text-white rounded-full shadow-lg hover:bg-[#09033b]/90 transition-colors z-50"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </button>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'

const selectedGrade = ref('')
const selectedSubject = ref('')
const curriculumData = ref([])
const showBackToTop = ref(false)

const sampleData = [
  {
    "grade": "Grade 6",
    "subjects": {
        "Christian Religious Knowledge": [
          "PACES",
          "Paul's Early Life: Paul's name, nationality and religion i.e. Saul",
          "Paul's Early Life: Paul's place of birth (Tarsus), Son of a Pharisee, studied under Gamaliel, persecuted the Church",
          "Paul's Early Life: Approval of Stephen's death",
          "Paul's Conversion: Paul's proposed mission to Damascus, What happened to Paul on the way",
          "Paul's Conversion: Healing and commission of Paul by Ananias",
          "Paul's Sent Forth: Selection and send forth of Paul and Barnabas, missionary work",
          "Paul's Missionary Journey: Paul preached to different people",
          "Paul's Missionary Journey: Preaching in Antioch, Lystra and Derbe",
          "Paul's Missionary Journey: Corinth – Paul preached to Jews and Gentiles",
          "Paul's Missionary Journey: Importance of missionary work",
          "Revision",
          "Examination",
          "Christmas Party, Closure & Results"
        ],
      "Civic Education": [
        "PACES",
        "National Honours: MON, CON",
        "National Honours: OON, OFR",
        "National Honours: CFR, GCON",
        "National Honours Awards (General)",
        "People for National Awards",
        "Reasons for National Honours/Awards",
        "Reasons for National Honours/Awards (continued)",
        "Reasons for National Honours/Awards (continued)",
        "Reasons for National Honours/Awards (continued)",
        "Valuing Nigerian Goods",
        "Revision",
        "Examination",
        "Christmas Party, Closure & Results"
      ],
      "Social Studies": [
        "PACES",
        "Concept of living together, peaceful coexistence",
        "External influence on Nigerian family life",
        "Influence from foreign countries on Nigerian family life",
        "Influence of religion on family life in Nigeria",
        "Influence of working parents on Nigerian family life",
        "Meaning of marriage and inter marriage",
        "Types of inter marriage",
        "Advantages and disadvantages of inter ethnic marriages",
        "Problems of inter religious marriage",
        "Values that foster inter marriage, problems of inter racial marriage",
        "Revision",
        "Examination",
        "Christmas Party, Closure & Results"
      ],
      "Security Education": [
        "PACES",
        "Personal Security",
        "Meaning of Personal Security",
        "Precautionary measures on Personal Security",
        "Enumerate precautionary measures",
        "Duties and responsibilities of a child in respect of personal security",
        "Duties and responsibilities of a child in respect of personal security (continued)",
        "Duties and responsibilities of a child in respect of personal security (continued)",
        "Child's responsibility in relation to women's security",
        "Identification of duties and responsibilities in relation to personal security",
        "Personal Security Management",
        "Revision",
        "Examination",
        "Christmas Party, Closure & Results"
      ],
      "English Language": [
        "PACES",
        "Pronunciation, stress, intonation, dictionary use, fluency, writing essays",
        "Speech: distinguish command, questions, statements, comprehension, figures of speech",
        "Speech: reporting incidents, idiomatic expressions, comprehension, writing introductory paragraphs",
        "Speech: reporting incidents, idiomatic expressions, summary writing, concluding paragraphs",
        "Speech: reporting incidents, idiomatic expressions, reading comprehension, narrative essay",
        "Speech: participating in short play, idiomatic expressions, drama, expository essay",
        "Speech: drama, idiomatic expressions, descriptive essay",
        "Speech: drama, idiomatic expressions, argumentative essay",
        "Speech: intonation practice, idiomatic expressions, synonyms, drama acting",
        "Reading comprehension, argumentative essay, simple compositions",
        "Revision",
        "Examination",
        "Christmas Party, Closure & Results"
      ],
        "Basic Science": [
          "PACES",
          "Solar System: meaning, components, location of planets",
          "Solar System: gravity and weightlessness",
          "Earth Movement: rotation and revolution",
          "Earth Movement: solar and lunar eclipses",
          "Earth and Sun: effects of interaction",
          "Climate: meaning of weather, weather symbols",
          "Climate: use of weather symbols",
          "Climate: weather instruments",
          "Climate: keeping weather records",
          "Climate: global warming causes and effects",
          "Revision",
          "Examination",
          "Christmas Party, Closure & Results"
        ],
        "Basic Technology": [
          "PACES",
          "Primary and secondary colours, definition and types",
          "Secondary colours",
          "Colour separation",
          "Production of colours",
          "Production of secondary colours",
          "Drawing instruments: board practice",
          "Drawing instruments: dividers, compasses",
          "Drawing instruments: rulers, T-square, set square, pencils, French curves",
          "Woodwork hand tools: introduction, measuring and marking tools",
          "Woodwork hand tools: marking tools, cutting tools, saws and planes",
          "Revision",
          "Examination",
          "Christmas Party, Closure & Results"
        ],
        "ICT/Computer Science": [
          "PACES",
          "Word processing: meaning, examples, types",
          "Microsoft Word: identifying software, loading and quitting",
          "Uses of word processing software",
          "Word processing environment: title bar, menu bar",
          "Word processing skills: opening MS Word",
          "Word processing: creating new documents",
          "Word processing skills: editing documents",
          "Word processing skills: saving documents",
          "Word processing skills: retrieving documents",
          "Word processing skills: minimize, restore, quitting software",
          "Practical: creating new document, revision",
          "Examination",
          "Christmas Party, Closure & Results"
        ],
      "Pre-Vocational Studies": {
        "Agricultural Science": [
          "PACES",
          "Preservation of farm produce: meaning, reasons",
          "Preservation of farm produce: shelf life, contamination prevention",
          "Methods of preservation: sun drying",
          "Methods of preservation: smoking, salting, frying",
          "Methods of preservation: refrigeration, canning",
          "Methods of preservation: bagging, bottling",
          "Practical: sun drying",
          "Practical: refrigeration of milk and fish",
          "Practical: bagging seeds and grains",
          "Practical: bottling, salting, smoking fish and meat",
          "Revision",
          "Examination",
          "Christmas Party, Closure & Results"
        ],
        "Home Economics": [
          "PACES",
          "Healthy home environment: reasons for cleaning",
          "Healthy home environment: cleaning agents and tools",
          "Healthy home environment: guidelines for cleaning",
          "Healthy home environment: practical cleaning",
          "Stitches: definition, types",
          "Stitches: general uses",
          "Stitches: practical temporary stitches",
          "Stitches: practical permanent stitches",
          "Stitches: practical permanent stitches (continued)",
          "Stitches: practical decorative stitches",
          "Revision",
          "Examination",
          "Christmas Party, Closure & Results"
        ]
      },
      "History": [
        "PACES",
        "Civil rule in Nigeria: Dr Nnamdi Azikiwe",
        "Civil rule in Nigeria: Sir Abubakar Tafawa Balewa",
        "Civil rule in Nigeria: Alhaji Shehu Shagari",
        "Civil rule in Nigeria: Chief Olusegun Obasanjo",
        "Civil rule in Nigeria: Alhaji Umaru Musa Yar'Adua",
        "Civil rule in Nigeria: Dr Goodluck Ebele Jonathan",
        "Civil rule in Nigeria: President Muhammadu Buhari",
        "The process of civil rule in Nigeria",
        "The process of civil rule in Nigeria (continued)",
        "PACES",
        "Revision",
        "Examination",
        "Christmas Party, Closure & Results"
      ],
      "Physical and Health Education": [
        "PACES",
        "Physical fitness and body conditioning",
        "Physical fitness and body conditioning (continued)",
        "Athletics I: relay race meaning, types",
        "Athletics I: relay skills (baton grip, take off, exchange)",
        "Athletics II: basic skills in hurdles",
        "Athletics II: meaning and types of jumps",
        "Athletics II: basic skills in high jump",
        "Athletics II: rules and regulations in high jump, long jump",
        "Athletics II: stages in long jump, rules and regulations",
        "PACES",
        "Revision",
        "Examination",
        "Christmas Party, Closure & Results"
      ]
    }
  },
      {
    "grade": "Grade 5",
    "subjects": {
        "Christian Religious Knowledge": [
          "PACES",
          "God supplies our needs",
          "God grants our requests",
          "Things God provides: Air, Sun, Food, Shelter, Security, Health",
          "Work: definition and importance",
          "Types of work",
          "Why God wants us to work",
          "God saves us from danger",
          "Examples of God's deliverance: Red Sea",
          "The story of Daniel",
          "The story of Shadrach, Meshach and Abednego",
          "God's Deliverance (continued)",
          "Revision",
          "Examination",
          "Christmas Party, Closure & Results"
        ],
      
      "Civic Education": [
        "Loyalty: meaning, evidence in family",
        "Loyalty to the community",
        "Loyalty to the state or nation",
        "Consequences of disloyalty",
        "Loyal services to the nation",
        "Leadership",
        "Types of leadership",
        "Qualities of a good leader",
        "Levels of leadership",
        "Levels of leadership (continued)",
        "Levels of leadership (continued)",
        "Revision",
        "Examination",
        "Christmas Party, Closure & Results"
      ],
      "Security Education": [
        "PACES",
        "Security tips and alerts",
        "Roles of security agents in neighbourhood",
        "Roles of elders in neighbourhood security",
        "Consequences of failing to report hooligans",
        "Means of securing the environment",
        "Importance of modern security",
        "Uses of modern media for security",
        "Security agencies",
        "Security agencies (continued)",
        "More security agencies in modern times",
        "Revision",
        "Examination",
        "Christmas Party, Closure & Results"
      ],
      "Social Studies": [
        "PACES",
        "Environment: definition, types of influence",
        "Influence of man on environment",
        "Influence of physical environment on man",
        "Influence of social environment on man",
        "Identify other family members",
        "Obligations of other family members",
        "Advantages of accepting others into family",
        "Promoting good family relationships",
        "Disadvantages of accepting others into family",
        "Behaviours of family members, tolerance",
        "Revision",
        "Examination",
        "Christmas Party, Closure & Results"
      ],
      "English Language": [
        "Resumption test",
        "Intonation in statements, adjectives, formal letter",
        "Intonation in questions, adjectives, formal letter writing",
        "Intonation in requests, adjectives, narrative composition",
        "Intonation, stress, alphabet, narrative writing",
        "Intonation, stress, guided narrative composition",
        "Intonation in questions, direct and indirect speech, descriptive essay",
        "Intonation in commands, direct and indirect speech, descriptive essay",
        "Intonation in requests, comprehension, descriptive essay",
        "Stress and intonation, active and passive sentences, invitation writing",
        "Aural discrimination, active/passive sentences, invitation writing",
        "Revision",
        "Examination",
        "Christmas Party, Closure & Results"
      ],

        "Agricultural Science": [
          "How to grow crops: classification",
          "How to grow crops: pre-planting activities",
          "How to grow crops: nursery beds, sowing",
          "How to grow crops: transplanting seedlings",
          "How to grow crops: post-planting activities (watering, mulching)",
          "How to grow crops: thinning and supplying",
          "How to grow crops: application of fertilizer, manure",
          "How to grow crops: weeding, staking",
          "How to grow crops: pesticides",
          "How to grow crops: harvesting, processing, preservation",
          "How to grow crops: storage and marketing, safety signs",
          "Revision",
          "Examination",
          "Christmas Party, Closure & Results"
        ],
        "Home Economics": [
          "PACES",
          "Family: meaning, types",
          "Family: functions of members",
          "Family: roles of father and mother",
          "Family: roles of children",
          "Family: family tree",
          "Family values and life cycle",
          "Family values",
          "Personal and family resources: meaning, uses",
          "Care of personal belongings",
          "Effects of choices in personal resources",
          "Revision",
          "Examination",
          "Christmas Party, Closure & Results"
        ],
     
        "Basic Science": [
          "PACES",
          "Environmental changes: erosion",
          "Pollution: types",
          "Pollution: effects and control",
          "Waste: types",
          "Waste disposal methods",
          "Waste management: recycling",
          "Waste management: advantages of recycling",
          "Environmental quality: meaning, healthy environment",
          "Environmental quality: materials for healthy environment",
          "Environmental quality: advantages, disadvantages",
          "Revision",
          "Examination",
          "Christmas Party, Closure & Results"
        ],
        "Basic Technology": [
          "PACES",
          "Materials: definition, types",
          "Materials: metals",
          "Materials: plastics and rubber",
          "Maintenance: definition, types, importance",
          "Motor vehicle internal parts: definition",
          "Motor vehicle internal parts: airbag, seat belt, steering",
          "Motor vehicle internal parts: brake, clutch, gearbox",
          "Motor vehicle internal parts: functions",
          "Drawing instruments: definition, identification",
          "Drawing instruments: uses",
          "Revision",
          "Examination",
          "Christmas Party, Closure & Results"
        ],
        "ICT/Computer Science": [
          "PACES",
          "Computer games: meaning, types, uses",
          "Steps in playing computer games",
          "Predicting player actions, solutions",
          "Steps in playing Test Drive game",
          "Predicting player actions",
          "Steps in playing games, problem solving",
          "Steps in playing Mario game",
          "Predicting actions in games",
          "Steps in playing Dave game",
          "Demonstrating games, importance",
          "Revision",
          "Examination",
          "Christmas Party, Closure & Results"
        ],
      
      "History": [
        "PACES",
        "British Rule in Nigeria: reasons, administrators",
        "British Rule in Nigeria: protectorates",
        "British Rule in Nigeria: consequences",
        "Meaning of nationalism and nationalists",
        "Nationalists: Herbert Macaulay",
        "Nationalists: Herbert Macaulay (continued)",
        "Nationalists: Dr Nnamdi Azikiwe",
        "Nationalists: Sir Ahmadu Bello, Chief Awolowo, Aminu Kano",
        "Nigerian Independence: federation, republic",
        "Nigerian Independence (continued)",
        "Revision",
        "Examination",
        "Christmas Party, Closure & Results"
      ],
      "Physical and Health Education": [
        "PACES",
        "Creative rhythmic activities: meaning, types",
        "Creative rhythmic activities: physical fitness",
        "Measuring physical fitness: endurance, strength, speed",
        "Measuring physical fitness: strength, speed",
        "Measuring physical fitness: agility, basketball skills",
        "Field events: meaning, types",
        "Field events: long jump skills",
        "Field events: long jump, high jump skills",
        "Field events: high jump demonstration, rules",
        "PACES",
        "Revision",
        "Examination",
        "Christmas Party, Closure & Results"
      ]
    }
  },
  {
    "grade": "Grade 4",
    "subjects": {
        "Christian Religious Knowledge": [
          "PACES",
          "We are children of one Father",
          "We are children of one Father (continued)",
          "We are children of one Father (continued)",
          "God calls us for a purpose",
          "God calls us for a purpose (continued)",
          "God calls us for a purpose (continued)",
          "God gives His laws to us",
          "God gives His laws to us (continued)",
          "God gives His laws to us (continued)",
          "Jesus loves all people",
          "Revision",
          "Examination",
          "Christmas Party, Closure & Results"
        ],
      
      "Civic Education": [
        "PACES",
        "Meaning of governance",
        "Meaning of governance (continued)",
        "Government at different levels",
        "Importance of good governance",
        "Good governance",
        "Types of government",
        "Types of government (continued)",
        "Examples of types of government and functions",
        "Monarchy vs oligarchy, traditional vs constitutional",
        "Arms of government",
        "Revision",
        "Examination",
        "Christmas Party, Closure & Results"
      ],
      "Security Education": [
        "PACES",
        "Meaning of security and security education",
        "Need for security education",
        "Neighbourhood security",
        "Observation of neighbours' movement",
        "Reporting suspicious movements",
        "Objects of alert",
        "Roles of security agents in neighbourhood",
        "Elders and youth in neighbourhood",
        "Dangerous people in neighbourhood",
        "Recruitment of security agents",
        "Revision",
        "Examination",
        "Christmas Party, Closure & Results"
      ],
      "Social Studies": [
        "PACES",
        "Meaning of social studies",
        "Man and his physical environment",
        "Human influence on environment",
        "Patterns of behaviour: influence on environment",
        "The family",
        "Family tree",
        "Roles of family members",
        "Advantages/disadvantages of nuclear family",
        "Merits/demerits of extended family",
        "Qualities of a good family, living in harmony",
        "Revision",
        "Examination",
        "Christmas Party, Closure & Results"
      ],
      "English Studies": [
        "PACES",
        "My family, picture reading, writing short sentences",
        "Simple conversation, present tense, addresses",
        "Conversation using modal auxiliaries, tenses, descriptive passage",
        "Obligations: must, nouns, poems, simple sentences",
        "Poems, future tense, descriptive essay",
        "Vowels and consonants, future actions, informal letter",
        "Vowel discrimination, adjectives, informal letter, composition",
        "Vowel discrimination, clauses, passage, composition",
        "Vowel discrimination, alphabet, reading story, invitations",
        "Oral composition, descriptive/narrative, dictionary use, invitations",
        "Stress and intonation, verbs, passage, poems",
        "Examination",
        "Christmas Party, Closure & Results"
      ],
        "Agricultural Science": [
          "PACES",
          "Meaning of agriculture: definition",
          "Agriculture: growing crops",
          "Agriculture: rearing animals",
          "Importance of agriculture: food, medicine",
          "Importance of agriculture: jobs, income",
          "Importance of agriculture: raw materials",
          "Importance of agriculture: cloth making, decoration",
          "People in agriculture: animal rearers, crop farmers",
          "People in agriculture: fishermen, marketers",
          "People in agriculture: gardeners, teachers",
          "Revision",
          "Examination",
          "Christmas Party, Closure & Results"
        ],
        "Home Economics": [
          "PACES",
          "Home economics: meaning",
          "Home economics: scope",
          "Home economics: careers",
          "Home economics: importance to society",
          "Personal grooming: body parts",
          "Personal grooming: body functions",
          "Personal grooming: cosmetics, deodorants",
          "Personal grooming: choice and use of cosmetics",
          "Personal grooming: identification and effects of cosmetics",
          "Personal grooming: daily care of body",
          "Revision",
          "Examination",
          "Christmas Party, Closure & Results"
        ],
        "Basic Science": [
          "PACES",
          "Changes in nature: meaning",
          "Changes in nature: types",
          "Changes in nature: non-living matter",
          "Changes in nature: plants",
          "Changes in animals",
          "Life cycle of insects",
          "Weather",
          "Weather instruments",
          "Safety in our environment",
          "Safety in our environment (continued)",
          "Revision",
          "Examination",
          "Christmas Party, Closure & Results"
        ],
        "Basic Technology": [
          "PACES",
          "Technology and you: meaning",
          "Technology and you: types",
          "Technology and you: shelter, communication",
          "Technology and you: importance",
          "Technology and you: products at home",
          "Technology and you: transportation",
          "Shape construction: introduction",
          "Shape construction: plain and solid shapes",
          "Shape construction: materials",
          "Shape construction: methods",
          "Revision",
          "Examination",
          "Christmas Party, Closure & Results"
        ],
        "ICT/Computer Science": [
          "PACES",
          "Meaning of data",
          "Meaning of information",
          "Sources of information",
          "Sources of information (continued)",
          "Sources of information (continued)",
          "Computer as information processing machine",
          "Computer as information processing machine (continued)",
          "Computer as information processing machine (continued)",
          "Types of information from computer",
          "Uses of computer: advantages and disadvantages",
          "Revision",
          "Examination",
          "Christmas Party, Closure & Results"
        ],
      
      "Physical and Health Education": [
        "PACES",
        "Locomotor movement: definition",
        "Locomotor movement: walking, running, skipping",
        "Locomotor movement: sliding, hopping",
        "Locomotor movement: jumping, leaping",
        "Non-locomotor movement: meaning",
        "Non-locomotor movement: stretching, bending",
        "Non-locomotor movement: twisting, swinging",
        "Non-locomotor movement: pulling, pushing",
        "Athletics: meaning, events, middle distance race",
        "Athletics: long distance race, skills",
        "Revision",
        "Examination",
        "Christmas Party, Closure & Results"
      ],
      "History": [
        "Resumption test/PACES",
        "Early Regions: Eastern, Mid-Western",
        "Early Regions: Northern, Western",
        "Early Regions: location on map",
        "Early Regions: ethnic groups",
        "Early Regions: states in regions",
        "State Creation: meaning, reasons, 1967 states",
        "State Creation: governors of 1967 states",
        "Colonial Headquarters: Calabar, Lokoja",
        "Colonial Headquarters: years established",
        "Federal Capitals: Lagos, Abuja",
        "Revision",
        "Examination",
        "Christmas Party, Closure & Results"
      ]
    }
  },  
  {
    "grade": "Grade 3",
    "subjects": {
      "English Language": [
        "PACES",
        "Listening /speaking - pronunciation of consonants and consonant clusters: /b/,/p/, /pl/, /pr/, /br/ using letter sounds. Reading: aural discrimination (skills: phonic vowel sound). Writing: Introduction to the use of capital letters and full stop. Grammatical accuracy: Use of regular and irregular plurals.",
        "Listening /speaking - pronunciations of consonants and consonant clusters using letter sound F: /f/, /fl/, /fr/, V-/v/. Reading - concept of print: features of printed materials and types. Writing: Introduction to hand writing. Grammatical accuracy: introduction to verbs.",
        "Listening /speaking - (Consonants and consonant clusters cont): /t/, /d/, /g/, /k/. Reading – The value of friendship - Simple (song) on National value. Writing: Use of punctuation sentences: Comma (,), question (?), and exclamation marks(!). Grammatical accuracy: Singular and plural continues: irregular/zero plural.",
        "Listening /speaking - Making simple statement using the correct tell and intonation and responding to simple questions on parts speech. Reading – Aural discrimination/ɔ:/, /ɔi/, as in pot, door, boy using letter sound. Writing - Writing answers to a comprehension passage: Days of the week. Grammatical accuracy: Use of auxiliary verb e.g. Can, may and will.",
        "Listening /speaking - Stress and intonation (in a dialogue). Reading – aural discrimination of sounds /e/, /ei/ using letter sounds. Writing – A short C composition (guided) about myself. Dictation of numbers. Grammatical accuracy: expressing future actions in the negative using 'will' and 'shall'.",
        "Listening /speaking: 1) Oral composition 2) Aural discrimination of /i/ and /I:/ sounds as bit, beat etc. Reading – Reading a non fiction passage on drug abuse effects (Comprehension passages). Writing – Writing three or four sentences on everyday activities using the present and past tense. Grammatical accuracy: Using past continuous tense.",
        "Listening /speaking - Pronunciation of vowels and diphthongs: / ʒ/ /ə/ as in third, sister. / ɛə/ /Iə/ asin care, near using letter sounds. Reading – Comprehension, independent reading. Writing – Writing answer to questions ( a simple narrative passage). Grammatical accuracy: Present perfect tenses.",
        "Listening /speaking - Making request using please plus auxiliary and giving polite response. Reading – Auxiliary discrimination of sounds /u/ and /u:/ using letter sounds. Writing – Continuous writing: A short story about \"my best friend\". Grammatical accuracy: Writing the names of colour and numerals.",
        "Listening /speaking: Pronunciation practice: production of multi syllabic words. Reading – Non fiction: Reading time chart Calendar. Writing – Hand writing: using determiners with nouns to show singular and plural. Grammatical accuracy: Perfect tense ' with ' 'for' and 'since'.",
        "Listening /speaking: Aural discrimination, producing/ai/,/au/,/uə/ and /əu/ diphthongs. Pronunciation of consonant sounds /ə/ and /ɵ/; /s/ and/ ʃ/ - the thin sell shell. Reading – Creative reading using structure and words and a passage/poem on Road Safety. Writing – Colours, shapes and sizes and passage on personal hygiene. Grammatical accuracy: Interrogation with responses using present perfect tense and plural formation using numerals in words form.",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "Basic Science": [
        "PACES",
        "Measurement of length (methods of measuring length)",
        "The instruments used for measuring length.",
        "Units of measuring length",
        "Measuring mass/weight.",
        "The instruments used for measuring mass/weight.",
        "The instruments used for measuring mass/weight.",
        "Units of measuring mass/weight.",
        "Measurement of Time",
        "Instruments for measuring time",
        "Units of measuring time",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "Basic Technology": [
        "PACES",
        "Understanding Basic Technology: Forms Of Technology",
        "Understanding Basic Technology: Underdeveloped technology",
        "Understanding Basic Technology: Developed technology",
        "Examples of underdeveloped technology",
        "Examples of underdeveloped technology",
        "Examples of developed technology",
        "Examples of developed technology. Things that produce sounds. Musical instruments.",
        "Characteristics of underdeveloped technology",
        "Characteristics of developed technology",
        "PACES",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "ICT/Computer Science": [
        "PACES",
        "HISTORY OF COMPUTER: Early counting devices",
        "HISTORY OF COMPUTER: Early counting devices",
        "Later Development of Computer",
        "Later Development of Computer: Counting with Abacus",
        "Later Development of Computer: Counting with Abacus",
        "Later Development of Computer: Binary digits, bit and bytes.",
        "Later Development of Computer: Binary digits, bit and bytes.",
        "Computer definition and parts of computer",
        "Computer definition and parts of computer",
        "PACES",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "Agricultural Science": [
        "PACES",
        "Climates for crops and animals",
        "Factors of climate",
        "Distribution of crops",
        "Savannah crops",
        "Distribution of animals",
        "Savannah animals",
        "Materials needed for growing crops",
        "How to raise ornamental plants",
        "Raising of seedling in the nursery",
        "Watering",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "Home Economics": [
        "PACES",
        "Grooming and care of the body: Definition of good grooming. Identification of different parts of the body",
        "Grooming and care of the body: Maintenance of body hygiene. Reason for daily care of the body. The uses of bathing/washing materials",
        "Care of hand and feet: Identification of hand and feet. Functions of hands and feet",
        "Care of hand and feet: Reason for daily care of the hands and feet. Causes of foot rot",
        "Care of the hair: Types of hair. Tools used for hair care and cleaning",
        "Care of the hair: Effects of shaving with unsterilized Instrument when barbing the hair",
        "Care of the skin: Types of the skin. Article for skin care. Skin infection",
        "Practical: Care of skin",
        "Care of the mouth and teeth: Define mouth show parts of mouth. Materials for cleaning the mouth. Danger of not caring for the mouth. Modern material for cleaning the teeth",
        "Personal health rules: Define personal health rules for healthy living. Rules of good health in development effect of rough play.",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "Christian Religious Knowledge": [
        "PACES",
        "The promise of the Saviour",
        "The prophecy",
        "The type of Saviour",
        "Significance of a Saviour",
        "The promise of the Comforter",
        "The coming of the Holy Spirit.",
        "The second coming of Jesus",
        "Preparation for the second coming",
        "Reason for coming second time and Request from God.",
        "PACES",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "Social Studies": [
        "PACES",
        "The nuclear and extended families: Concept of the family",
        "The nuclear and extended families: Nuclear family",
        "The nuclear and extended families: Extended family",
        "The nuclear and extended families: Respect among family members",
        "The nuclear and extended families: Functions or roles of extended family members",
        "Types of marriages in our Community: Meaning of marriage",
        "Types of marriages in our Community: Types of marriages",
        "Types of marriages in our Community: Forms of marriage in Nigeria",
        "Various ways of getting married and the objects used in the ceremony: Marriage pratices in Nigeria",
        "Various ways of getting married and the objects used in the ceremony: Objects used in marriage ceremonies and role –play or film show on how marriages are contracted",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "Civic Education": [
        "PACES",
        "Civic Education: 1.components of Civic Education - Nationality. - Right and duties. - Democratic practices. - Community values.",
        "Dimensions of Civic Education: - Political. - Legal. - Social. - Economic. - Cultural",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "Security Education": [
        "PACES",
        "Identification of security agencies and their primary duties. Security agencies and their primary duties: - Police. -FRSC. - NDLEA. - SSS. - I.C.P.C.. - NSCDC. - Military. - Prisons. - NAFDAC, etc.",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ]
    }
  },
  {
    "grade": "Grade 2",
    "subjects": {
      "Mathematics": [
        "Whole numbers 1-100",
        "Whole numbers 1-200",
        "Whole numbers 1-200",
        "Fractions",
        "Fractions",
        "Addition of 2-digits",
        "Addition of 3-digits",
        "Subtraction of 2-digit numbers",
        "Subtraction of 3-digit numbers",
        "Addition and subtraction of 2-digit numbers",
        "Addition and subtraction of 3-digit numbers. Multiplication",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "English Language": [
        "PACES",
        "Expressing Plurals, Indicating Plurals using the structure, we are, you are., Passage illustrating the use of various structural pattern, etc.",
        "Expressing what things are made of, Describing things and people by weight and size, Reading simple passages, Describing things according to color, etc",
        "Expressing what things are made of, Expressing how past actions were performed, Reading numbers 1-10, spelling of names of persons and places within pupils environment, etc.",
        "Oral comprehension, Responding to (What) questions about the past, Reading Passage, Spelling of simple words, etc.",
        "Oral expression, Reading simple passages, Asking questions using the correct form of (be), etc.",
        "Giving oral information through response to questions, Denoting continuous action, Reading passages, Writing given short and simple words e.g. cat, eat, etc.",
        "Giving oral information through to questions, Irregular plurals, Reading simple passages, Dictation; etc.",
        "Oral comprehension, Expressing future actions and plans with future time adverbial, reading simple statements, copying of given simple words, etc.",
        "Expressing how past actions were performed, Using the verb (To have), Parts of the body - (reading and writing simple sentences), etc. Copying short sentences",
        "Asking and answering questions about past actions.",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "Basic Science": [
        "PACES",
        "THE SENSES - SEEING: with the eyes. Colors, shapes and sizes of objects in class room, school and home. Preparation of clay for moulding",
        "THE SENSES - HEARING: with the ear",
        "THE SENSES - HEARING: with the ear Contd.",
        "THE SENSES - SMELLING: with the nose",
        "THE SENSES - SMELLING: with the nose Contd. Moulding with clay.",
        "THE SENSES – TASTE: with the tongue (detecting various taste sweet and bitter)",
        "THE SENSES – TASTE: with the tongue Description of things by their taste Contd.",
        "THE SENSES – TOUCHING: with fingers",
        "Road Users",
        "Road Users",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "Basic Technology": [
        "PACES",
        "Forms of energy (Sound)",
        "Forms of energy (Sound) Contd.",
        "Forms of energy (Sound) Contd.",
        "Forms of energy (Sound) Contd.",
        "Sound energy: Things that produce sounds. Musical instruments.",
        "Sound energy Contd.: Things that produce sounds. Musical instruments.",
        "Sound energy Contd.: Things that produce sounds. Musical instruments.",
        "Sound energy Contd.: Things that produce sounds. Musical instruments.",
        "Sound energy Contd.: Things that produce sounds. Musical instruments.",
        "PACES",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "ICT/Computer Science": [
        "PACES",
        "Features of computer parts: Monitor as a part of computer.",
        "Features of computer parts: Keyboard as a part of computer.",
        "Features of computer parts: Keyboard as a part of computer",
        "Features of computer parts: CPU as part of a computer",
        "Features of computer parts: Mouse as a part of computer",
        "Features of computer parts: Joysticks as a part of computer",
        "Features of computer parts: Light pen as a part of computer",
        "Features of computer parts: Scanner as part of a computer",
        "Features of computer parts: Printer as parts of a computer",
        "Features of computer parts: Other parts of a computer",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "Agricultural Science": [
        "PACES",
        "Basic farm tools",
        "Simple farm tools",
        "Farm tools, Maintenance of farm tools, Digging tools",
        "Digging tools",
        "Vegetable crops",
        "Examples Vegetable crops",
        "Uses of Vegetable crops",
        "Grain crops",
        "Uses of Grain crops",
        "PACES",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "Home Economics": [
        "PACES",
        "Exercise: Meaning of exercise and time of exercise",
        "Exercise: Explain types of exercise and time of exercise",
        "Exercise: Importance of exercise to the body",
        "Exercise: Practical (demonstration)",
        "Rest and Sleep: Meaning of rest. Importance of rest. Time of rest and reason for good rest.",
        "Rest and Sleep: Rest and sleep: meaning of sleep. Importance of sleep.",
        "Rest and Sleep: Effects of inadequate rest and sleep. Where and how to sleep. Difference between rest and sleep.",
        "Eating good food: Types of food/group. Meaning of balance diet. Importance of balance diet",
        "Eating good food: Effects of eating unbalance diet. Effects of over feeding e.g. obesity",
        "PRACTICALS: Group food items according to importance. Group food items according to nutrient.",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "Christian Religious Knowledge": [
        "PACES",
        "The meaning of prayer. Jesus the man of prayer",
        "Why do we pray",
        "How do we pray",
        "When to pray",
        "Significance of prayers",
        "How to pray",
        "Types of prayer",
        "Things you should pray for",
        "Jesus power and natural forces",
        "Natural forces in our environment.",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "Social Studies": [
        "PACES",
        "Scope of Social Studies. Meaning of social studies",
        "Scope of Social Studies: Areas which social studies focuses",
        "Physical environment",
        "The food we eat in our culture as family members: Examples of some Nigerian foods",
        "The food we eat in our culture as family members: Consequences of eating together as a family",
        "Importance of these foods to our growth",
        "Importance of these foods to our growth",
        "Greeting and respect to elders in our culture: Meaning of greetings. Forms of greetings",
        "Greeting and respect to elders in our culture: Practical demonstration of the various ways of greetings in our culture",
        "Greeting and respect to elders in our culture: Recognising the importance of greetings",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "Civic Education": [
        "PACES",
        "Importance of civic education",
        "Importance of civic education Contd.",
        "Importance of civic education to National development.",
        "Importance of civic education, system of government",
        "Importance of civic education, system of government Contd.",
        "Importance of civic education",
        "Stimulation of civic engagement in the political, social and economic processes",
        "Stimulation of civic engagement in the political, social and economic processes Contd.",
        "Stimulation of civic engagement in the political, social and economic processes Contd.",
        "PACES",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "Security Education": [
        "PACES",
        "Sources of danger and insecurity",
        "Sources of danger and insecurity Contd.",
        "Sources of danger and insecurity Contd.",
        "Sources of danger and insecurity Contd.",
        "How to keep away from dangers Contd.",
        "How to keep away from dangers Contd.",
        "How to keep away from dangers Contd.",
        "How to keep away from dangers Contd.",
        "How to keep away from dangers Contd.",
        "PACES",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ]
    }
  },
  {
    "grade": "Grade 1",
    "subjects": {
      "Christian Religious Knowledge": [
        "PACES",
        "God The Creator",
        "Thing That God Created",
        "Why God Created Things",
        "Why God Created Human Being",
        "Things That Were Created By Human Being",
        "The Birth Of Jesus",
        "The Birth Of Jesus Count",
        "The Significance of Christmas",
        "Ways Of Protection",
        "Ways Of Protection",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "Social Studies": [
        "PACES",
        "Social studies (meaning), Family (meaning).",
        "Family (types of family)",
        "Qualities of a good family.",
        "Meaning and types of culture",
        "Types of culture (material culture)",
        "Types of culture (non- material culture)",
        "Values that show good morals in our society.",
        "Values that show bad morals in our society.",
        "Values that show good/bad morals in our society (role play)",
        "Values that show good/bad morals in our society (role play)",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "Home Economics": [
        "PACES",
        "The human body: Identification of head, hair, eyes and nose. Identification of mouth and ears",
        "The human body: Identification of the neck and trunk. Identification of the chest and belly.",
        "The human body: Identification of the leg and hand. identification of nails",
        "Daily care of the body: Reason for daily care of the body. Materials used for the care of the body.",
        "Practical: Care of the nose, eyes and teeth. Care of the materials used.",
        "Care of the mouth, teeth and tongue: Function of the mouth, teeth, and tongue. Reasons for cleaning our mouth, teeth and tongue.",
        "Care of the mouth, teeth, and tongue: Materials used for cleaning our mouth, teeth, and tongue",
        "Care of the mouth, teeth and tongue: Ways for caring for our mouth, teeth and tongue. Causes and prevention of decay tooth",
        "Care of hand and feet: Parts of the hands and feet. Care of hand and feet. Reasons for keeping hands and feet clean",
        "Care of hand and feet: When to wash hand and feet. Danger of not caring for hand and feet",
        "Care of hands and feet (Practical): Reasons for keeping the nails well-trimmed and clean.",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "English Language": [
        "Grammatical Accuracy structure (Identification of person), reading (Eye movement), Writing (writing letters of the alphabet, Listening/ speaking (simple greetings and commands greetings at home and appropriate time for particular greetings). Reading letters of the alphabets, words on home objects.",
        "Listening/ speaking (Identification of objects.), Grammatical Accuracy structure (Identification of objects and spelling out names of objects), Reading letters of the alphabets, (A-a) Writing (Identification of upper and lower case letters), Identification of colors.",
        "Identification of animals, identification of objects in the classroom, reading letters of the alphabets, Writing letters of the alphabets,(H-M)",
        "Pronunciation of basic sound /a/, /b/, /d/in a given simple words, grammatical accuracy (correct pronunciations of alphabets), (Aa , Bb, Cc, asking and answering questions (simple questions and answer), blending sounds of letters to form words, /а / ant, /b/ bat.",
        "Correct pronunciation of words, clear recitation of various rhymes.",
        "Identification/pronunciation of objects in the environment, identification of objects in the environment using them in making sentences, reading and writing. A-Z.",
        "Identification of objects with emphasis on the article 'a', simple commands (command at home, Identification and reading of familiar sounds in words.",
        "Word sounds and syllables, combining sounds to form two to three letter word.",
        "Identification of objects in colors, identification of objects colors in terms of their colors, reading of colors (major)",
        "Pronunciation of words, sounds and syllables, indicating singular/plural forms, reading (parts of book), combination of the letters to form simple words.",
        "2nd Self-test & CA",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "ICT/Computer Science": [
        "PACES",
        "Definition of a computer",
        "Parts of a computer",
        "Drawing of computer parts",
        "REVISION",
        "EXAMINATION",
        "Christmas Party, Closure & Collection of Results"
      ],
      "Le Français": [
        "PACES",
        "L' alphabet",
        "Les Salutations",
        "Les langages de la classe",
        "Quelques expressions avec 'Je suis'",
        "Comment ça va ?",
        "Les nombres 0 à 10",
        "Les objets dans la classe",
        "La Famille",
        "Les jours de la semaine",
        "2nd Self Test/CA",
        "Revision",
        "Examination",
        "Christmas Party, Closure and Collection of Results."
      ]
    }
  }
]

curriculumData.value = sampleData

// Computed properties
const availableGrades = computed(() => {
  return curriculumData.value.map(item => item.grade).sort()
})

const currentCurriculum = computed(() => {
  if (!selectedGrade.value) return null
  return curriculumData.value.find(item => item.grade === selectedGrade.value)
})

const availableSubjects = computed(() => {
  if (!currentCurriculum.value) return []
  return Object.keys(currentCurriculum.value.subjects).sort()
})

// Methods
const scrollToSubject = () => {
  if (selectedSubject.value) {
    navigateToSubject(selectedSubject.value)
  }
}

const navigateToSubject = async (subjectName) => {
  selectedSubject.value = subjectName
  await nextTick()
  
  const elementId = `subject-${subjectName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`
  const element = document.getElementById(elementId)
  
  if (element) {
    const headerOffset = 100 // Offset for fixed header or spacing
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })

    // Add a subtle highlight animation
    element.classList.add('highlight-subject')
    setTimeout(() => {
      element.classList.remove('highlight-subject')
    }, 2000)
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 500
}

// Watch for grade changes and reset subject selection
watch(selectedGrade, () => {
  selectedSubject.value = ''
})

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.curriculum-viewer {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.curriculum-viewer * {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

select:focus {
  outline: 2px solid #09033b;
  outline-offset: 2px;
}

.curriculum-viewer ::-webkit-scrollbar {
  width: 4px;
}
.curriculum-viewer ::-webkit-scrollbar-track {
  background: #f8f9fa;
}
.curriculum-viewer ::-webkit-scrollbar-thumb {
  background: #09033b;
  border-radius: 2px;
}
.curriculum-viewer ::-webkit-scrollbar-thumb:hover {
  background: #0a0440;
}

.highlight-subject {
  animation: highlight 2s ease-out;
}

@keyframes highlight {
  0% {
    background-color: rgba(9, 3, 59, 0.1);

  }
  100% {
    background-color: transparent;
  
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Mobile responsiveness improvements */
@media (max-width: 640px) {
  .curriculum-viewer {
    padding: 1rem;
  }
  
  .text-4xl {
    font-size: 2rem;
  }
  
  .text-2xl {
    font-size: 1.5rem;
  }
}
</style>