<template>
  <div class="p-8 bg-[#f5f5f7] min-h-screen">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Header -->
      <div class="bg-[#09033b] text-white p-6">
        <h2 class="text-2xl font-bold">Pupil's Bill Generator</h2>
        <p class="text-gray-300">Generate and download customized billing statements</p>
      </div>

      <form @submit.prevent="generatePDF" class="p-6 space-y-8">
        <!-- Pupil Information Card -->
        <div class="bg-[#f5f5f7] p-5 rounded-lg border border-gray-200">
          <h3 class="text-lg font-semibold mb-4 flex items-center text-[#09033b]">
            <span class="bg-[#ff7f50] text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">1</span>
            Pupil Information
          </h3>
          
          <!-- Name -->
          <div class="mb-4">
            <label class="block text-[#09033b] font-medium mb-2">Pupil Name</label>
            <input 
              v-model="form.name" 
              type="text" 
              class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#ff7f50] focus:border-[#ff7f50] outline-none transition-colors" 
              placeholder="Enter pupil's full name"
            />
          </div>
          
          <!-- Academic Settings Grid -->
          <div class="grid md:grid-cols-3 gap-4">
            <!-- Academic Year -->
            <div>
              <label class="block text-[#09033b] font-medium mb-2">Academic Year</label>
              <input 
                v-model="form.academicYear" 
                type="text" 
                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#ff7f50] focus:border-[#ff7f50] outline-none transition-colors" 
                placeholder="e.g. 2024/2025"
              />
            </div>

            <!-- Grade -->
            <div>
              <label class="block text-[#09033b] font-medium mb-2">Grade</label>
              <select 
                v-model="form.grade" 
                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#ff7f50] focus:border-[#ff7f50] outline-none transition-colors"
              >
                <option v-for="grade in grades" :key="grade" :value="grade">{{ grade }}</option>
              </select>
            </div>

            <!-- Term -->
            <div>
              <label class="block text-[#09033b] font-medium mb-2">Term</label>
              <select 
                v-model="form.term" 
                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#ff7f50] focus:border-[#ff7f50] outline-none transition-colors"
              >
                <option v-for="term in terms" :key="term" :value="term">{{ term }}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Basic Fees Card -->
        <div class="bg-[#f5f5f7] p-5 rounded-lg border border-gray-200">
          <h3 class="text-lg font-semibold mb-4 flex items-center text-[#09033b]">
            <span class="bg-[#ff7f50] text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">2</span>
            Basic Fees
          </h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div v-for="(key, index) in Object.keys(form.fees.basic)" :key="'basic-' + index" class="space-y-1">
              <label class="block text-[#09033b] font-medium">{{ formatKey(key) }}</label>
              <div class="relative">
                <span class="absolute left-3 top-2 text-gray-500">₦</span>
                <input
                  v-model.number="form.fees.basic[key]"
                  type="number"
                  class="w-full border border-gray-300 rounded-md pl-8 pr-4 py-2 focus:ring-2 focus:ring-[#ff7f50] focus:border-[#ff7f50] outline-none transition-colors"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Fees Card -->
        <div class="bg-[#f5f5f7] p-5 rounded-lg border border-gray-200">
          <h3 class="text-lg font-semibold mb-4 flex items-center text-[#09033b]">
            <span class="bg-[#ff7f50] text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">3</span>
            Additional Fees
          </h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div v-for="(key, index) in Object.keys(form.fees.additional)" :key="'add-' + index" class="space-y-2">
              <label class="flex items-center gap-2 font-medium text-[#09033b]">
                <input 
                  type="checkbox" 
                  class="h-5 w-5 rounded text-[#ff7f50] focus:ring-[#ff7f50] border-gray-300 transition-colors" 
                  v-model="form.fees.additional[key].enabled" 
                />
                {{ formatKey(key) }}
              </label>
              <div class="relative" v-if="form.fees.additional[key].enabled">
                <span class="absolute left-3 top-2 text-gray-500">₦</span>
                <input
                  v-model.number="form.fees.additional[key].amount"
                  type="number"
                  class="w-full border border-gray-300 rounded-md pl-8 pr-4 py-2 focus:ring-2 focus:ring-[#ff7f50] focus:border-[#ff7f50] outline-none transition-colors"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Information Card -->
        <div class="bg-[#f5f5f7] p-5 rounded-lg border border-gray-200">
          <h3 class="text-lg font-semibold mb-4 flex items-center text-[#09033b]">
            <span class="bg-[#ff7f50] text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">4</span>
            Payment Information
          </h3>
          <div class="space-y-4">
            <!-- Flat Fee Toggle and Input -->
            <div>
              <label class="flex items-center gap-2 font-medium text-[#09033b] mb-2">
                <input 
                  type="checkbox" 
                  class="h-5 w-5 rounded text-[#ff7f50] focus:ring-[#ff7f50] border-gray-300 transition-colors" 
                  v-model="form.enableFlatFee" 
                />
                Specify Flat Fee to Pay Now (Optional)
              </label>
              <div class="relative" v-if="form.enableFlatFee">
                <span class="absolute left-3 top-2 text-gray-500">₦</span>
                <input 
                  v-model.number="form.flatFee" 
                  type="number" 
                  class="w-full border border-gray-300 rounded-md pl-8 pr-4 py-2 focus:ring-2 focus:ring-[#ff7f50] focus:border-[#ff7f50] outline-none transition-colors" 
                  min="0" 
                />
              </div>
            </div>
            
            <!-- Summary -->
            <div class="bg-[#09033b]/5 p-4 rounded-lg mt-4 border border-[#09033b]/10">
              <div class="flex justify-between items-center">
                <span class="text-[#09033b] font-medium">Total Fee Due:</span>
                <span class="text-[#09033b] font-bold text-xl">₦{{ totalFee.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between items-center mt-2" v-if="form.enableFlatFee">
                <span class="text-[#09033b] font-medium">Amount to Pay Now:</span>
                <span class="text-[#09033b] font-bold text-xl">₦{{ Number(form.flatFee).toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Watermark Preview -->
        <div class="bg-[#f5f5f7] p-5 rounded-lg border border-gray-200">
          <h3 class="text-lg font-semibold mb-4 flex items-center text-[#09033b]">
            <span class="bg-[#ff7f50] text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">5</span>
            Watermark Settings
          </h3>
          <div class="flex items-center gap-2 font-medium text-[#09033b] mb-4">
            <input 
              type="checkbox" 
              class="h-5 w-5 rounded text-[#ff7f50] focus:ring-[#ff7f50] border-gray-300 transition-colors" 
              v-model="form.enableWatermark" 
            />
            Add School Logo as Watermark for Authenticity
          </div>
          
          <div class="relative h-36 bg-white border border-gray-300 rounded-md overflow-hidden" v-if="form.enableWatermark && logoBase64">
            <div class="absolute inset-0 flex items-center justify-center opacity-20">
              <img :src="logoBase64" alt="Logo Watermark Preview" class="max-h-full max-w-full" />
            </div>
            <div class="absolute inset-0 flex items-center justify-center">
              <p class="text-gray-500 text-sm">Watermark Preview</p>
            </div>
          </div>
          
          <p class="text-sm text-gray-500 mt-2" v-if="form.enableWatermark && !logoBase64">
            Logo will be loaded and applied as watermark to the PDF document
          </p>
        </div>

        <!-- Submit -->
        <div class="flex items-center justify-center pt-4">
          <button 
            type="submit" 
            class="bg-[#ff7f50] hover:bg-[#ff7f50]/90 text-white px-8 py-3 rounded-md font-medium flex items-center space-x-2 transition-colors shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download Bill (PDF)</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import jsPDF from 'jspdf'

  definePageMeta({
    layout: 'admin',
    middleware: 'admin'
  })
  
  // Available grades and terms
  const grades = [
    'Play Group',
    'Nursery 1',
    'Nursery 2',
    'Reading Readiness',
    'Grade 1',
    'Grade 2',
    'Grade 3',
    'Grade 4',
    'Grade 5',
    'Grade 6'
  ]
  
  const terms = ['1st Term', '2nd Term', '3rd Term']
  
  // Form data
  const form = ref({
    name: 'MAKOZI JAANA',
    academicYear: '2024/2025',
    grade: 'Grade 6',
    term: '3rd Term',
    enableFlatFee: true,
    flatFee: 128000,
    enableWatermark: true,
    fees: {
      basic: {
        tuition: 197640,
        diesel: 14100,
        paces: 25950,
        mis: 3750
      },
      additional: {
        photo: { enabled: true, amount: 8000 },
        clubs: { enabled: true, amount: 10000 },
        excursion: { enabled: false, amount: 0 },
        uniforms: { enabled: false, amount: 0 },
        sweater: { enabled: false, amount: 0 },
        thursdayWear: { enabled: false, amount: 0 },
        bus: { enabled: false, amount: 0 },
        outstanding: { enabled: false, amount: 0 },
        others: { enabled: false, amount: 0 }
      }
    }
  })
  
  // Compute total
  const totalFee = computed(() => {
    const basicSum = Object.values(form.value.fees.basic).reduce((a, b) => a + Number(b), 0)
    const additionalSum = Object.values(form.value.fees.additional)
      .filter(f => f.enabled)
      .reduce((sum, f) => sum + Number(f.amount), 0)
    return basicSum + additionalSum
  })
  
  // Format label text
  const formatKey = key =>
    key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
  
  // Load logo as base64
  const logoBase64 = ref('')
  onMounted(async () => {
    try {
      const res = await fetch('/assets/images/tcad-nbg.png')
      const blob = await res.blob()
      const reader = new FileReader()
      reader.onloadend = () => {
        logoBase64.value = reader.result
      }
      reader.readAsDataURL(blob)
    } catch (error) {
      console.error('Failed to load logo:', error)
    }
  })
  
  // PDF Generator
  const generatePDF = () => {
    const doc = new jsPDF()
    doc.setTextColor(0, 0, 0)
    
    // Add watermark if enabled
    if (form.value.enableWatermark && logoBase64.value) {
      // Get page dimensions
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      
      // Calculate center position and size for watermark
      const watermarkWidth = 80
      const watermarkHeight = 80
      const watermarkX = (pageWidth - watermarkWidth) / 2
      const watermarkY = (pageHeight - watermarkHeight) / 2
      
      // Add watermark with reduced opacity
      doc.saveGraphicsState()
      doc.setGState(new doc.GState({ opacity: 0.1 }))
      doc.addImage(logoBase64.value, 'PNG', watermarkX, watermarkY, watermarkWidth, watermarkHeight)
      doc.restoreGraphicsState()
    }
    
    let y = 20
    const marginLeft = 20
  
    // Add logo at top right
    if (logoBase64.value) {
      doc.addImage(logoBase64.value, 'PNG', 150, 10, 40, 40)
    }
    y += 30
  
    const addText = (text, x = marginLeft, size = 12, bold = false) => {
      doc.setFontSize(size)
      doc.setFont('helvetica', bold ? 'bold' : 'normal')
      doc.text(text, x, y)
      y += 8
    }
  
    addText('No 8a Kayes Street, Opp Sageto, Off')
    addText('Nouakchott Street, Zone 1, Wuse Abuja.')
    addText('Phone No: +2348036233157')
    addText('Email: tcadinfo@gmail.com')
    y += 10
  
    addText(`Your Up To Date Bill For ${form.value.term} ${form.value.academicYear}`, marginLeft, 14, true)
    addText(`(${form.value.grade})`, marginLeft, 12, true)
    y += 5
  
    addText(`Name of Pupil: ${form.value.name}`, marginLeft, 12, true)
    y += 8
  
    addText('Fees Breakdown:', marginLeft, 13, true)
  
    for (const [key, value] of Object.entries(form.value.fees.basic)) {
      const label = formatKey(key) + ':'
      const amount = 'N ' + Number(value).toLocaleString()
      doc.text(label, marginLeft, y)
      doc.text(amount, 190, y, { align: 'right' })
      y += 7
    }
  
    for (const [key, value] of Object.entries(form.value.fees.additional)) {
      if (value.enabled) {
        const label = formatKey(key) + ':'
        const amount = 'N ' + Number(value.amount).toLocaleString()
        doc.text(label, marginLeft, y)
        doc.text(amount, 190, y, { align: 'right' })
        y += 7
      }
    }
  
    // Total
    y += 5
    doc.text('TOTAL FEE DUE:', marginLeft, y)
    doc.text('N ' + totalFee.value.toLocaleString(), 190, y, { align: 'right' })
    
    // Optional flat fee
    if (form.value.enableFlatFee) {
      y += 7
      doc.text('TOTAL FLAT FEE DUE TO PAY NOW:', marginLeft, y)
      doc.text('N ' + Number(form.value.flatFee).toLocaleString(), 190, y, { align: 'right' })
    }
  
    y += 12
    addText('PLEASE NOTE:', marginLeft, 11, true)
    addText('PTC Levy is N10,000 for the whole year and not included above.')
  
    y += 10
    addText('Payment Details:', marginLeft, 13, true)
    addText('A/C Name: THE COVENANT ACADEMY LIMITED')
    addText('A/C NO: 0164030012')
    addText('Bank: GT Bank')
  
    y += 20
    addText('Thank you for Your Co-Operation.', marginLeft)
    y += 15
    doc.text('……………………………………', marginLeft, y)
    y += 5
    doc.text('(Bursar)', marginLeft, y)
  
    // Format filename with grade and term
    const fileName = `${form.value.name.replace(/\s+/g, '_')}_${form.value.grade.replace(/\s+/g, '_')}_${form.value.term.replace(/\s+/g, '_')}_${form.value.academicYear.replace(/\//, '-')}.pdf`
    doc.save(fileName)
  }
  </script>