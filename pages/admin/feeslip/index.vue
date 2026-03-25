<template>
  <div class="min-h-screen bg-[#f5f5f7] p-6 font-sans">
    <div class="max-w-5xl mx-auto space-y-6">

      <!-- Header -->
      <div class="bg-[#09033b] text-white rounded-xl p-6 flex items-center justify-between shadow-lg">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Pupil Bill Generator</h1>
          <p class="text-blue-200 text-sm mt-1">Upload your Excel sheet and generate bills in seconds</p>
        </div>
        <div class="flex gap-2">
          <button
            @click="mode = 'single'"
            :class="mode === 'single' ? 'bg-[#ff7f50] text-white' : 'bg-white/10 text-white hover:bg-white/20'"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >Single Student</button>
          <button
            @click="mode = 'bulk'"
            :class="mode === 'bulk' ? 'bg-[#ff7f50] text-white' : 'bg-white/10 text-white hover:bg-white/20'"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >Bulk Generate</button>
        </div>
      </div>

      <!-- Step 1: Upload -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-[#09033b] font-semibold text-lg mb-4 flex items-center gap-2">
          <span class="bg-[#ff7f50] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">1</span>
          Upload Excel Sheet
        </h2>

        <label
          class="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-[#ff7f50]/40 rounded-xl cursor-pointer bg-[#fff8f6] hover:bg-[#fff3ef] transition-colors"
          @dragover.prevent
          @drop.prevent="handleDrop"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-[#ff7f50]/60 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span class="text-[#09033b] font-medium text-sm">{{ fileName || 'Click or drag & drop your .xlsx file here' }}</span>
          <span class="text-gray-400 text-xs mt-1">Supports .xlsx and .xls</span>
          <input type="file" class="hidden" accept=".xlsx,.xls" @change="handleFile" />
        </label>

        <div v-if="students.length" class="mt-4 flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-green-800 text-sm font-medium">{{ students.length }} students loaded across {{ classGroups.length }} classes</span>
        </div>
      </div>

      <!-- Step 2: Term / Year / Settings -->
      <div v-if="students.length" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-[#09033b] font-semibold text-lg mb-4 flex items-center gap-2">
          <span class="bg-[#ff7f50] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">2</span>
          Bill Settings
        </h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-[#09033b] mb-1">Academic Year</label>
            <input v-model="settings.academicYear" type="text" placeholder="e.g. 2025/2026"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#ff7f50] focus:border-[#ff7f50] outline-none" />
          </div>
          <div>
            <label class="block text-sm font-medium text-[#09033b] mb-1">Term</label>
            <select v-model="settings.term"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#ff7f50] focus:border-[#ff7f50] outline-none">
              <option>1st Term</option>
              <option>2nd Term</option>
              <option>3rd Term</option>
            </select>
          </div>
        </div>
      </div>

      <!-- SINGLE MODE -->
      <template v-if="students.length && mode === 'single'">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 class="text-[#09033b] font-semibold text-lg mb-4 flex items-center gap-2">
            <span class="bg-[#ff7f50] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">3</span>
            Select Student
          </h2>

          <div class="mb-4">
            <input v-model="search" type="text" placeholder="Search student name..."
              class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#ff7f50] outline-none" />
          </div>

          <select v-model="selectedStudentIndex" size="6"
            class="w-full border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#ff7f50] outline-none">
            <option v-for="(s, i) in filteredStudents" :key="i" :value="s._originalIndex">
              {{ s.cleanName }} — {{ s.grade }}
            </option>
          </select>
        </div>

        <!-- Single student review -->
        <div v-if="selectedStudent" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 class="text-[#09033b] font-semibold text-lg mb-4 flex items-center gap-2">
            <span class="bg-[#ff7f50] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">4</span>
            Review Bill — {{ selectedStudent.cleanName }}
          </h2>

          <!-- Fee rows -->
          <div class="divide-y divide-gray-100 mb-4">
            <div v-for="(fee, key) in selectedStudentFees" :key="key" class="flex justify-between py-2 text-sm">
              <span class="text-gray-600">{{ formatLabel(key) }}</span>
              <span class="font-medium text-[#09033b]">₦{{ fee.toLocaleString() }}</span>
            </div>
          </div>

          <div class="flex justify-between py-3 border-t-2 border-[#09033b] mb-4">
            <span class="font-bold text-[#09033b]">TOTAL FEE DUE</span>
            <span class="font-bold text-[#09033b] text-lg">₦{{ singleTotal.toLocaleString() }}</span>
          </div>

          <!-- Flat fee -->
          <div class="bg-[#f5f5f7] p-4 rounded-lg space-y-3">
            <label class="flex items-center gap-2 text-sm font-medium text-[#09033b]">
              <input type="checkbox" v-model="singleFlatFeeEnabled" class="h-4 w-4 text-[#ff7f50]" />
              Include "Amount to Pay Now" line
            </label>
            <div v-if="singleFlatFeeEnabled" class="relative">
              <span class="absolute left-3 top-2 text-gray-500 text-sm">₦</span>
              <input v-model.number="singleFlatFee" type="number" min="0"
                class="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#ff7f50] outline-none" />
              <p v-if="selectedStudent.parsedFlatFee" class="text-xs text-[#ff7f50] mt-1">
                Auto-parsed from name: ₦{{ selectedStudent.parsedFlatFee.toLocaleString() }}
              </p>
            </div>
          </div>

          <button @click="generateSinglePDF(selectedStudent)"
            class="mt-6 w-full bg-[#ff7f50] hover:bg-[#e86e40] text-white py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Bill PDF
          </button>
        </div>
      </template>

      <!-- BULK MODE -->
      <template v-if="students.length && mode === 'bulk'">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 class="text-[#09033b] font-semibold text-lg mb-1 flex items-center gap-2">
            <span class="bg-[#ff7f50] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">3</span>
            Review & Generate All Bills
          </h2>
          <p class="text-gray-500 text-sm mb-5">Verify flat fees below before generating. Leave blank to omit from bill.</p>

          <!-- Filter by class -->
          <div class="mb-4 flex flex-wrap gap-2">
            <button
              @click="bulkFilterClass = null"
              :class="bulkFilterClass === null ? 'bg-[#09033b] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
              class="px-3 py-1 rounded-full text-xs font-medium transition-colors"
            >All Classes</button>
            <button
              v-for="cls in classGroups" :key="cls"
              @click="bulkFilterClass = cls"
              :class="bulkFilterClass === cls ? 'bg-[#09033b] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
              class="px-3 py-1 rounded-full text-xs font-medium transition-colors"
            >{{ cls }}</button>
          </div>

          <!-- Student review table -->
          <div class="overflow-x-auto rounded-lg border border-gray-200">
            <table class="w-full text-sm">
              <thead class="bg-[#09033b] text-white">
                <tr>
                  <th class="px-4 py-3 text-left font-medium">Student</th>
                  <th class="px-4 py-3 text-left font-medium">Class</th>
                  <th class="px-4 py-3 text-right font-medium">Total Due</th>
                  <th class="px-4 py-3 text-left font-medium w-48">Flat Fee (₦)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="(student, i) in bulkFilteredStudents" :key="i" class="hover:bg-gray-50">
                  <td class="px-4 py-3 font-medium text-[#09033b]">{{ student.cleanName }}</td>
                  <td class="px-4 py-3 text-gray-500">{{ student.grade }}</td>
                  <td class="px-4 py-3 text-right font-medium">₦{{ computeTotal(student).toLocaleString() }}</td>
                  <td class="px-4 py-3">
                    <div class="relative">
                      <input
                        v-model.number="student.flatFeeOverride"
                        type="number"
                        min="0"
                        :placeholder="student.parsedFlatFee ? student.parsedFlatFee.toLocaleString() : 'None'"
                        class="w-full border border-gray-300 rounded-md pl-3 pr-2 py-1.5 text-sm focus:ring-2 focus:ring-[#ff7f50] outline-none"
                      />
                      <span v-if="student.parsedFlatFee && !student.flatFeeOverride"
                        class="absolute -top-1 -right-1 bg-[#ff7f50] text-white text-[9px] px-1 rounded-full">auto</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Generate button -->
          <div class="mt-6 flex items-center justify-between">
            <p class="text-sm text-gray-500">{{ bulkFilteredStudents.length }} students selected</p>
            <button
              @click="generateBulkPDFs"
              :disabled="bulkGenerating"
              class="bg-[#ff7f50] hover:bg-[#e86e40] disabled:opacity-60 text-white px-8 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors shadow-md"
            >
              <svg v-if="!bulkGenerating" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <svg v-else class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              {{ bulkGenerating ? `Generating ${bulkProgress}/${bulkFilteredStudents.length}...` : `Generate ${bulkFilteredStudents.length} PDFs` }}
            </button>
          </div>

          <!-- Progress bar -->
          <div v-if="bulkGenerating" class="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div class="bg-[#ff7f50] h-2 rounded-full transition-all duration-300"
              :style="{ width: (bulkProgress / bulkFilteredStudents.length * 100) + '%' }"></div>
          </div>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'

definePageMeta({ layout: 'admin', middleware: 'admin' })

// ─── State ───────────────────────────────────────────────────────────────────
const mode = ref('single')
const fileName = ref('')
const students = ref([])
const classGroups = ref([])
const search = ref('')
const selectedStudentIndex = ref(null)
const bulkFilterClass = ref(null)
const bulkGenerating = ref(false)
const bulkProgress = ref(0)
const logoBase64 = ref('')
const singleFlatFeeEnabled = ref(false)
const singleFlatFee = ref(0)

const settings = ref({
  academicYear: '2025/2026',
  term: '1st Term'
})

// ─── Columns to include on bill (skip SHI, and tracking columns) ──────────────
const BILL_COLUMNS = [
  'TUITION', 'OUTSTANDING', 'INTERHOUSE SPORT', 'DIESEL', 'M.I.S',
  'LESSON FEE', 'PHOTO', 'BUS FEE', 'PACES', 'CLUB',
  'RESULT FOLDER', 'TEXTBOOK', 'EX. BOOK', 'THURSDAY WEAR',
  'SPORTSWEAR', 'CARDIGAN', 'UNIFORM', 'DEV. LEVY'
]

const COLUMN_LABELS = {
  'TUITION': 'Tuition',
  'OUTSTANDING': 'Outstanding',
  'INTERHOUSE SPORT': 'Interhouse Sport',
  'DIESEL': 'Diesel',
  'M.I.S': 'M.I.S',
  'LESSON FEE': 'Lesson Fee',
  'PHOTO': 'Photo',
  'BUS FEE': 'Bus Fee',
  'PACES': 'Paces',
  'CLUB': 'Club',
  'RESULT FOLDER': 'Result Folder',
  'TEXTBOOK': 'Textbook',
  'EX. BOOK': 'Exercise Book',
  'THURSDAY WEAR': 'Thursday Wear',
  'SPORTSWEAR': 'Sportswear',
  'CARDIGAN': 'Cardigan',
  'UNIFORM': 'Uniform',
  'DEV. LEVY': 'Dev. Levy'
}

// ─── File handling ────────────────────────────────────────────────────────────
const handleDrop = (e) => {
  const file = e.dataTransfer.files[0]
  if (file) processFile(file)
}

const handleFile = (e) => {
  const file = e.target.files[0]
  if (file) processFile(file)
}

const processFile = (file) => {
  fileName.value = file.name
  const reader = new FileReader()
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result)
    const workbook = XLSX.read(data, { type: 'array' })
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' })
    parseStudents(rows)
  }
  reader.readAsArrayBuffer(file)
}

// ─── Parse students from rows ─────────────────────────────────────────────────
const CLASS_KEYWORDS = ['PLAY GROUP', 'NURSERY ONE', 'NURSERY TWO', 'RR', 'READING READINESS',
  'GRADE ONE', 'GRADE TWO', 'GRADE THREE', 'GRADE FOUR', 'GRADE FIVE', 'GRADE SIX']

const CLASS_LABEL_MAP = {
  'PLAY GROUP': 'Play Group', 'NURSERY ONE': 'Nursery 1', 'NURSERY TWO': 'Nursery 2',
  'RR': 'Reading Readiness', 'READING READINESS': 'Reading Readiness',
  'GRADE ONE': 'Grade 1', 'GRADE TWO': 'Grade 2', 'GRADE THREE': 'Grade 3',
  'GRADE FOUR': 'Grade 4', 'GRADE FIVE': 'Grade 5', 'GRADE SIX': 'Grade 6'
}

const parseFlatFee = (name) => {
  // Match:
  // (86k flat), 86k flat fee, N86,000 flat fee, 86000 flat, etc.
  const match = String(name).match(
    /(?:\(|\b)?\s*(?:N)?\s*(\d[\d,]*\.?\d*)\s*(k)?\s*(?:flat(?:\s*fee)?)\s*(?:\)|\b)/i
  );

  if (!match) return null;

  let val = match[1].replace(/,/g, '');
  val = parseFloat(val);

  // If 'k' is present → multiply
  if (match[2]) {
    val = val * 1000;
  }

  return isNaN(val) ? null : val;
};

const cleanName = (name) => {
  return String(name)
    // 1. Identify 20%, (20%), 20% discount, etc., and replace with the specific string
    .replace(/\(?\d+%\s*(?:discount)?\)?/gi, '(20% discount off tuition only)')
    
    // 2. Identify and remove flat fee variations (including currency, commas, 'k', and slashes)
    .replace(/N?\d+(?:,\d+)*[kK]?\s*flat(?:\s*fee)?(?:\/flat\s*fee)?/gi, '')
    
    // 3. Your original logic: remove any remaining text inside parentheses
    .replace(/\((?!20% Discount).*?\)/g, '') 
    
    // 4. Clean up extra spaces
    .replace(/\s+/g, ' ')
    .trim();
};

const isClassHeader = (row, headerColIndex) => {
  // A class header row has the class name in the CLASS column and no name in NAME column
  const classCell = String(row[0] || '').trim().toUpperCase()
  return CLASS_KEYWORDS.some(k => classCell.includes(k)) && !row[headerColIndex]
}

const parseStudents = (rows) => {
  // 1. Find header row (Same as before)
  let headerRow = null
  let headerRowIndex = -1
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const upper = row.map(c => String(c).trim().toUpperCase())
    if (upper.includes('NAME') && upper.includes('TUITION')) {
      headerRow = upper
      headerRowIndex = i
      break
    }
  }
  if (!headerRow) return

  const nameCol = headerRow.indexOf('NAME')
  const classCol = headerRow.indexOf('CLASS')

  const parsed = []
  const groups = new Set()
  
  // Start with Unknown, but it will be overwritten by the first class found
  let currentGrade = 'Unknown'

  for (let i = headerRowIndex + 1; i < rows.length; i++) {
    const row = rows[i]
    const classCell = String(row[classCol] || '').trim().toUpperCase()
    const nameCell = String(row[nameCol] || '').trim()

    // 2. STICKY CLASS LOGIC:
    // If the class cell is NOT empty, try to identify a new class
    if (classCell !== '') {
      const matchedKeyword = CLASS_KEYWORDS.find(k => classCell.includes(k))
      if (matchedKeyword) {
        currentGrade = CLASS_LABEL_MAP[matchedKeyword] || matchedKeyword
        groups.add(currentGrade)
        
        // If there is NO name on this row, it's just a header row—skip to next
        if (!nameCell) continue 
      }
    }

    // 3. Skip rows that have no name (like empty rows at the bottom)
    if (!nameCell) continue

    // Build fee map (Same as before)
    const fees = {}
    for (const col of BILL_COLUMNS) {
      const colIdx = headerRow.indexOf(col)
      if (colIdx === -1) continue
      const val = parseFloat(String(row[colIdx] || '0').replace(/,/g, '')) || 0
      if (val > 0) fees[col] = val
    }

    const flatFee = parseFlatFee(nameCell)

    parsed.push({
      rawName: nameCell,
      cleanName: cleanName(nameCell),
      grade: currentGrade, // This now uses the "sticky" value
      fees,
      parsedFlatFee: flatFee,
      flatFeeOverride: flatFee || null,
      _originalIndex: parsed.length
    })
  }

  students.value = parsed
  classGroups.value = Array.from(groups)
}

// ─── Computed ─────────────────────────────────────────────────────────────────
const filteredStudents = computed(() => {
  const q = search.value.toLowerCase()
  return students.value.filter(s => s.cleanName.toLowerCase().includes(q))
})

const selectedStudent = computed(() =>
  selectedStudentIndex.value !== null ? students.value[selectedStudentIndex.value] : null
)

const selectedStudentFees = computed(() => {
  if (!selectedStudent.value) return {}
  return selectedStudent.value.fees
})

const singleTotal = computed(() => {
  if (!selectedStudent.value) return 0
  return computeTotal(selectedStudent.value)
})

const bulkFilteredStudents = computed(() => {
  if (!bulkFilterClass.value) return students.value
  return students.value.filter(s => s.grade === bulkFilterClass.value)
})

// Watch selected student to prefill flat fee
watch(selectedStudent, (s) => {
  if (s?.parsedFlatFee) {
    singleFlatFee.value = s.parsedFlatFee
    singleFlatFeeEnabled.value = true
  } else {
    singleFlatFee.value = 0
    singleFlatFeeEnabled.value = false
  }
})

// ─── Helpers ──────────────────────────────────────────────────────────────────
const computeTotal = (student) =>
  Object.values(student.fees).reduce((a, b) => a + b, 0)

const formatLabel = (key) => COLUMN_LABELS[key] || key

// ─── Logo ─────────────────────────────────────────────────────────────────────
onMounted(async () => {
  try {
    const res = await fetch('/assets/images/tcad-nbg.png')
    const blob = await res.blob()
    const reader = new FileReader()
    reader.onloadend = () => { logoBase64.value = reader.result }
    reader.readAsDataURL(blob)
  } catch {}
})

// ─── PDF Generation ───────────────────────────────────────────────────────────
const buildPDF = (student, flatFee = null) => {
  const doc = new jsPDF()
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const marginLeft = 20
  const marginRight = 190
  let y = 15

  // Watermark
  if (logoBase64.value) {
    doc.saveGraphicsState()
    doc.setGState(new doc.GState({ opacity: 0.08 }))
    doc.addImage(logoBase64.value, 'PNG', (pageW - 90) / 2, (pageH - 90) / 2, 90, 90)
    doc.restoreGraphicsState()
  }

  // Logo top right
  if (logoBase64.value) {
    doc.addImage(logoBase64.value, 'PNG', 150, 10, 40, 40)
  }

  // School address block
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(80, 80, 80)
  const addressLines = [
    'No 8a Kayes Street, Opp Sageto, Off',
    'Nouakchott Street, Zone 1, Wuse Abuja.',
    'Phone No: +2348036233157',
    'Email: tcadinfo@gmail.com'
  ]
  for (const line of addressLines) {
    doc.text(line, marginLeft, y)
    y += 6
  }

  y += 8

  // Title
  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(9, 3, 59)
  doc.text(`Your Up To Date Bill For ${settings.value.term} ${settings.value.academicYear}`, marginLeft, y)
  y += 7
  doc.setFontSize(11)
  doc.text(`(${student.grade})`, marginLeft, y)
  y += 10

  // Student name
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  doc.text(`Name of Pupil: ${student.cleanName}`, marginLeft, y)
  y += 10

  // Fees heading
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Fees Breakdown:', marginLeft, y)
  y += 8

  // Fee rows
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  for (const [col, val] of Object.entries(student.fees)) {
    if (!val || val === 0) continue
    doc.text(formatLabel(col) + ':', marginLeft, y)
    doc.text('N ' + val.toLocaleString(), marginRight, y, { align: 'right' })
    y += 7
  }

  // Total
  y += 4
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.line(marginLeft, y, marginRight, y)
  y += 5
  doc.text('TOTAL FEE DUE:', marginLeft, y)
  doc.text('N ' + computeTotal(student).toLocaleString(), marginRight, y, { align: 'right' })

  // Flat fee
  if (flatFee && flatFee > 0) {
    y += 8
    doc.setFont('helvetica', 'bold')
    doc.text('TOTAL FLAT FEE DUE TO PAY NOW:', marginLeft, y)
    doc.text('N ' + flatFee.toLocaleString(), marginRight, y, { align: 'right' })
  }

  // Notes
  y += 14
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('PLEASE NOTE:', marginLeft, y)
  y += 6
  doc.setFont('helvetica', 'normal')
  doc.text('PTC Levy is N10,000 for the whole year and not included above.', marginLeft, y)

  // Payment details
  y += 12
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('Payment Details:', marginLeft, y)
  y += 7
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  const paymentLines = [
    'A/C Name: THE COVENANT ACADEMY LIMITED',
    'A/C NO: 0164030012',
    'Bank: GT Bank'
  ]
  for (const line of paymentLines) {
    doc.text(line, marginLeft, y)
    y += 6
  }

  // Sign off
  y += 14
  doc.setFontSize(11)
  doc.text('Thank you for Your Co-Operation.', marginLeft, y)
  y += 18
  doc.text('……………………………………', marginLeft, y)
  y += 6
  doc.text('(Bursar)', marginLeft, y)

  return doc
}

const generateSinglePDF = (student) => {
  const flatFee = singleFlatFeeEnabled.value ? singleFlatFee.value : null
  const doc = buildPDF(student, flatFee)
  const term = settings.value.term.replace(/\s+/g, '_')
  const year = settings.value.academicYear.replace('/', '-')
  const grade = student.grade.replace(/\s+/g, '_')
  const name = student.cleanName.replace(/\s+/g, '_')
  doc.save(`${name}_${grade}_${term}_${year}.pdf`)
}

const generateBulkPDFs = async () => {
  bulkGenerating.value = true
  bulkProgress.value = 0
  const list = bulkFilteredStudents.value

  for (let i = 0; i < list.length; i++) {
    const student = list[i]
    const flatFee = student.flatFeeOverride || student.parsedFlatFee || null
    const doc = buildPDF(student, flatFee)
    const term = settings.value.term.replace(/\s+/g, '_')
    const year = settings.value.academicYear.replace('/', '-')
    const grade = student.grade.replace(/\s+/g, '_')
    const name = student.cleanName.replace(/\s+/g, '_')
    doc.save(`${name}_${grade}_${term}_${year}.pdf`)
    bulkProgress.value = i + 1
    // Small delay to avoid browser freezing
    await new Promise(r => setTimeout(r, 100))
  }

  bulkGenerating.value = false
}
</script>