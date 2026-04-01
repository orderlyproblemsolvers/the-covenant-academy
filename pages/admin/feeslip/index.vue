<template>
  <div class="min-h-screen bg-[#f0ede8] p-6 font-sans" style="font-family: 'Georgia', serif;">
    <div class="max-w-5xl mx-auto space-y-6">

      <div class="bg-[#09033b] text-white rounded-2xl p-6 flex items-center justify-between shadow-xl relative overflow-hidden">
        <div class="absolute inset-0 opacity-5" style="background-image: repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%); background-size: 12px 12px;"></div>
        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-1">
            <div class="w-1 h-8 bg-[#ff7f50] rounded-full"></div>
            <h1 class="text-2xl font-bold tracking-tight" style="font-family: 'Georgia', serif;">Pupil Bill Generator</h1>
          </div>
          <p class="text-blue-200 text-sm ml-4">The Covenant Academy — Upload your Excel sheet and generate bills in seconds</p>
        </div>
        <div class="flex gap-2 relative z-10">
          <button @click="mode = 'single'" :class="mode === 'single' ? 'bg-[#ff7f50] text-white shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">Single Student</button>
          <button @click="mode = 'bulk'" :class="mode === 'bulk' ? 'bg-[#ff7f50] text-white shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">Bulk Generate</button>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-[#e8e0d8] p-6">
        <h2 class="text-[#09033b] font-semibold text-lg mb-4 flex items-center gap-2" style="font-family: 'Georgia', serif;">
          <span class="bg-[#09033b] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">1</span>
          Upload Excel Sheet
        </h2>
        <label class="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-[#09033b]/20 rounded-xl cursor-pointer bg-[#f9f7f4] hover:bg-[#f0ede8] transition-colors"
          @dragover.prevent @drop.prevent="handleDrop">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-[#09033b]/30 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      <div v-if="students.length" class="bg-white rounded-2xl shadow-sm border border-[#e8e0d8] p-6">
        <h2 class="text-[#09033b] font-semibold text-lg mb-4 flex items-center gap-2" style="font-family: 'Georgia', serif;">
          <span class="bg-[#09033b] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">2</span>
          Bill Settings
        </h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-[#09033b] mb-1">Academic Year</label>
            <input v-model="settings.academicYear" type="text" placeholder="e.g. 2025/2026"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#09033b] focus:border-[#09033b] outline-none" />
          </div>
          <div>
            <label class="block text-sm font-medium text-[#09033b] mb-1">Term</label>
            <select v-model="settings.term"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#09033b] focus:border-[#09033b] outline-none">
              <option>1st Term</option>
              <option>2nd Term</option>
              <option>3rd Term</option>
            </select>
          </div>
        </div>
      </div>

      <template v-if="students.length && mode === 'single'">
        <div class="bg-white rounded-2xl shadow-sm border border-[#e8e0d8] p-6">
          <h2 class="text-[#09033b] font-semibold text-lg mb-4 flex items-center gap-2" style="font-family: 'Georgia', serif;">
            <span class="bg-[#09033b] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">3</span>
            Select Student
          </h2>
          <div class="mb-4">
            <input v-model="search" type="text" placeholder="Search student name..."
              class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#09033b] outline-none" />
          </div>
          <select v-model="selectedStudentIndex" size="6"
            class="w-full border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#09033b] outline-none">
            <option v-for="(s, i) in filteredStudents" :key="i" :value="s._originalIndex">
              {{ s.cleanName }} — {{ s.grade }}
            </option>
          </select>
        </div>

        <div v-if="selectedStudent" class="bg-white rounded-2xl shadow-sm border border-[#e8e0d8] p-6">
          <h2 class="text-[#09033b] font-semibold text-lg mb-4 flex items-center gap-2" style="font-family: 'Georgia', serif;">
            <span class="bg-[#09033b] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">4</span>
            Review Bill — {{ selectedStudent.cleanName }}
          </h2>
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
          <div class="bg-[#f9f7f4] p-4 rounded-lg space-y-3">
            <label class="flex items-center gap-2 text-sm font-medium text-[#09033b]">
              <input type="checkbox" v-model="singleFlatFeeEnabled" class="h-4 w-4" />
              Include "Amount to Pay Now" line
            </label>
            <div v-if="singleFlatFeeEnabled" class="relative">
              <span class="absolute left-3 top-2 text-gray-500 text-sm">₦</span>
              <input v-model.number="singleFlatFee" type="number" min="0"
                class="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#09033b] outline-none" />
              <p v-if="selectedStudent.parsedFlatFee" class="text-xs text-[#ff7f50] mt-1">
                Auto-parsed from name: ₦{{ selectedStudent.parsedFlatFee.toLocaleString() }}
              </p>
            </div>
          </div>
          <div class="mt-6 flex gap-3">
            <button @click="openPreview(selectedStudent)"
              class="flex-1 bg-[#09033b] hover:bg-[#0d0550] text-white py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              Preview Bill
            </button>
            <button @click="generateSinglePDF(selectedStudent)"
              class="flex-1 bg-[#ff7f50] hover:bg-[#e86e40] text-white py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      </template>

      <template v-if="students.length && mode === 'bulk'">
        <div class="bg-white rounded-2xl shadow-sm border border-[#e8e0d8] p-6">
          <h2 class="text-[#09033b] font-semibold text-lg mb-1 flex items-center gap-2" style="font-family: 'Georgia', serif;">
            <span class="bg-[#09033b] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">3</span>
            Review & Generate All Bills
          </h2>
          <p class="text-gray-500 text-sm mb-5">Verify flat fees below before generating. Leave blank to omit from bill.</p>
          <div class="mb-4 flex flex-wrap gap-2">
            <button @click="bulkFilterClass = null" :class="bulkFilterClass === null ? 'bg-[#09033b] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
              class="px-3 py-1 rounded-full text-xs font-medium transition-colors">All Classes</button>
            <button v-for="cls in classGroups" :key="cls" @click="bulkFilterClass = cls"
              :class="bulkFilterClass === cls ? 'bg-[#09033b] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
              class="px-3 py-1 rounded-full text-xs font-medium transition-colors">{{ cls }}</button>
          </div>
          <div class="overflow-x-auto rounded-lg border border-gray-200">
            <table class="w-full text-sm">
              <thead class="bg-[#09033b] text-white">
                <tr>
                  <th class="px-4 py-3 text-left font-medium">Student</th>
                  <th class="px-4 py-3 text-left font-medium">Class</th>
                  <th class="px-4 py-3 text-right font-medium">Total Due</th>
                  <th class="px-4 py-3 text-left font-medium w-48">Flat Fee (₦)</th>
                  <th class="px-4 py-3 text-center font-medium">Preview</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="(student, i) in bulkFilteredStudents" :key="i" class="hover:bg-[#f9f7f4]">
                  <td class="px-4 py-3 font-medium text-[#09033b]">{{ student.cleanName }}</td>
                  <td class="px-4 py-3 text-gray-500">{{ student.grade }}</td>
                  <td class="px-4 py-3 text-right font-medium">₦{{ computeTotal(student).toLocaleString() }}</td>
                  <td class="px-4 py-3">
                    <div class="relative">
                      <input v-model.number="student.flatFeeOverride" type="number" min="0"
                        :placeholder="student.parsedFlatFee ? student.parsedFlatFee.toLocaleString() : 'None'"
                        class="w-full border border-gray-300 rounded-md pl-3 pr-2 py-1.5 text-sm focus:ring-2 focus:ring-[#09033b] outline-none" />
                      <span v-if="student.parsedFlatFee && !student.flatFeeOverride"
                        class="absolute -top-1 -right-1 bg-[#ff7f50] text-white text-[9px] px-1 rounded-full">auto</span>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-center">
                    <button @click="openPreview(student)" class="text-[#09033b] hover:text-[#ff7f50] transition-colors" title="Preview">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-6 flex items-center justify-between">
            <p class="text-sm text-gray-500">{{ bulkFilteredStudents.length }} students selected</p>
            <button @click="generateBulkPDFs" :disabled="bulkGenerating"
              class="bg-[#ff7f50] hover:bg-[#e86e40] disabled:opacity-60 text-white px-8 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors shadow-md">
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
          <div v-if="bulkGenerating" class="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div class="bg-[#ff7f50] h-2 rounded-full transition-all duration-300"
              :style="{ width: (bulkProgress / bulkFilteredStudents.length * 100) + '%' }"></div>
          </div>
        </div>
      </template>
    </div>

    <transition name="fade">
      <div v-if="previewStudent" class="fixed inset-0 z-50 flex items-center justify-center p-4" style="background:rgba(9,3,59,0.7); backdrop-filter: blur(4px);">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
          <div class="bg-[#09033b] px-6 py-4 flex items-center justify-between flex-shrink-0">
            <div>
              <h3 class="text-white font-semibold text-base" style="font-family:'Georgia',serif;">Bill Preview</h3>
              <p class="text-blue-200 text-xs mt-0.5">{{ previewStudent.cleanName }} · {{ previewStudent.grade }}</p>
            </div>
            <div class="flex items-center gap-3">
              <button @click="generateSinglePDF(previewStudent)"
                class="bg-[#ff7f50] hover:bg-[#e86e40] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </button>
              <button @click="previewStudent = null" class="text-white/60 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div class="overflow-y-auto flex-1 p-6 bg-[#f0ede8]">
            <div class="bg-white shadow-lg rounded-sm mx-auto" style="width:100%; max-width:540px; font-family:'Georgia',serif; position:relative; overflow:hidden;">

              <div style="height:6px; background: linear-gradient(90deg, #09033b 0%, #09033b 60%, #ff7f50 60%, #ff7f50 100%);"></div>

              <div style="padding: 28px 32px 24px;">

                <div style="display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:18px;">
                  <div style="flex:1;">
                    <div style="font-size:17px; font-weight:bold; color:#09033b; letter-spacing:0.5px; line-height:1.2;">THE COVENANT ACADEMY</div>
                    <div style="font-size:9px; color:#888; margin-top:3px; line-height:1.5;">
                      No 8a Kayes Street, Opp Sageto, Off Nouakchott Street<br/>
                      Zone 1, Wuse Abuja &nbsp;|&nbsp; +2348036233157 &nbsp;|&nbsp; tcadinfo@gmail.com
                    </div>
                  </div>
                  <div v-if="logoBase64" style="margin-left:16px; flex-shrink:0;">
                    <img :src="logoBase64" style="width:52px; height:52px; object-fit:contain;" />
                  </div>
                  <div v-else style="width:52px; height:52px; background:#09033b; border-radius:4px; display:flex; align-items:center; justify-content:center; margin-left:16px; flex-shrink:0;">
                    <span style="color:white; font-size:9px; text-align:center; font-weight:bold; line-height:1.2;">TCA</span>
                  </div>
                </div>

                <div style="background:#09033b; color:white; padding:8px 14px; border-radius:4px; margin-bottom:16px;">
                  <div style="font-size:11px; font-weight:bold; letter-spacing:0.8px;">FEE STATEMENT</div>
                  <div style="font-size:9.5px; color:#b0c4de; margin-top:1px;">{{ settings.term }} &nbsp;·&nbsp; {{ settings.academicYear }} &nbsp;·&nbsp; {{ previewStudent.grade }}</div>
                </div>

                <div style="display:flex; align-items:center; gap:10px; margin-bottom:16px; padding-bottom:12px; border-bottom:1px solid #eee;">
                  <div style="width:3px; height:36px; background:#ff7f50; border-radius:2px; flex-shrink:0;"></div>
                  <div>
                    <div style="font-size:8.5px; color:#999; text-transform:uppercase; letter-spacing:1px;">Name of Pupil</div>
                    <div style="font-size:14px; font-weight:bold; color:#09033b; margin-top:1px;">{{ previewStudent.cleanName }}</div>
                  </div>
                </div>

                <div style="margin-bottom:12px;">
                  <div style="font-size:8.5px; font-weight:bold; color:#09033b; text-transform:uppercase; letter-spacing:1px; margin-bottom:6px; padding-bottom:4px; border-bottom:2px solid #09033b;">Fee Breakdown</div>
                  <div v-for="(fee, key) in previewStudent.fees" :key="key"
                    style="display:flex; justify-content:space-between; align-items:center; padding:5px 0; border-bottom:1px solid #f5f5f5;">
                    <span style="font-size:10px; color:#555;">{{ formatLabel(key) }}</span>
                    <span style="font-size:10px; font-weight:600; color:#09033b; font-variant-numeric:tabular-nums;">₦{{ fee.toLocaleString() }}</span>
                  </div>
                </div>

                <div style="background:#09033b; color:white; padding:10px 14px; border-radius:4px; display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                  <span style="font-size:10px; font-weight:bold; letter-spacing:0.5px;">TOTAL FEE DUE</span>
                  <span style="font-size:14px; font-weight:bold; font-variant-numeric:tabular-nums;">₦{{ computeTotal(previewStudent).toLocaleString() }}</span>
                </div>

                <div v-if="previewFlatFee" style="background:#fff8f6; border:1.5px solid #ff7f50; border-radius:4px; padding:9px 14px; display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                  <span style="font-size:10px; font-weight:bold; color:#ff7f50; letter-spacing:0.3px;">AMOUNT TO PAY NOW</span>
                  <span style="font-size:13px; font-weight:bold; color:#ff7f50; font-variant-numeric:tabular-nums;">₦{{ previewFlatFee.toLocaleString() }}</span>
                </div>

                <div style="border:1px solid #d9c9b8; border-left:3px solid #b8860b; border-radius:4px; background:#fffdf7; padding:10px 12px; margin-bottom:14px;">
                  <div style="font-size:8px; font-weight:bold; color:#b8860b; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:5px;">Important Notice</div>
                  <p style="font-size:8.5px; color:#444; line-height:1.55; margin:0 0 5px 0;">
                    Dear Parents, we sincerely apologize for an error in the 2nd term diesel charges. We realized that we undercharged due to the absence of a proper bursar and with diesel prices increasing again, there is a difference that needs to be covered.
                  </p>
                  <p style="font-size:8.5px; color:#444; line-height:1.55; margin:0;">
                    We kindly want to notify you that this difference will be included with the <strong>3rd term fees slip</strong>. Thank you for your understanding and support. Also look out for the Graduation Fee which will be communicated soon.
                  </p>
                </div>

                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:14px;">
                  <div style="background:#f9f7f4; border-radius:4px; padding:9px 12px;">
                    <div style="font-size:8px; font-weight:bold; color:#09033b; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:5px;">Payment Details</div>
                    <div style="font-size:8.5px; color:#555; line-height:1.7;">
                      <div><strong style="color:#09033b;">A/C Name:</strong> THE COVENANT ACADEMY LTD</div>
                      <div><strong style="color:#09033b;">A/C No:</strong> 0164030012</div>
                      <div><strong style="color:#09033b;">Bank:</strong> GT Bank</div>
                    </div>
                  </div>
                  <div style="background:#f9f7f4; border-radius:4px; padding:9px 12px;">
                    <div style="font-size:8px; font-weight:bold; color:#09033b; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:5px;">Please Note</div>
                    <div style="font-size:8.5px; color:#555; line-height:1.55;">PTC Levy is ₦15,000 for the whole year and is <strong>not</strong> included in the total above.</div>
                  </div>
                </div>

                <div style="display:flex; align-items:flex-end; justify-content:space-between; padding-top:10px; border-top:1px dashed #ddd;">
                  <div style="font-size:8.5px; color:#777; font-style:italic;">Thank you for your co-operation.</div>
                  <div style="text-align:center;">
                    <div style="border-top:1px solid #09033b; width:90px; padding-top:3px;">
                      <div style="font-size:8px; color:#09033b; font-weight:bold;">BURSAR</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style="height:4px; background: linear-gradient(90deg, #ff7f50 0%, #ff7f50 40%, #09033b 40%, #09033b 100%);"></div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'

definePageMeta({ layout: 'admin', middleware: 'admin' })

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
const previewStudent = ref(null)

const settings = ref({ academicYear: '2025/2026', term: '1st Term' })

const BILL_COLUMNS = [
  'TUITION', 'OUTSTANDING', 'INTERHOUSE SPORT', 'DIESEL', 'M.I.S',
  'LESSON FEE', 'PHOTO', 'BUS FEE', 'PACES', 'CLUB',
  'RESULT FOLDER', 'TEXTBOOK', 'EX. BOOK', 'THURSDAY WEAR',
  'SPORTSWEAR', 'CARDIGAN', 'UNIFORM', 'DEV. LEVY'
]

const COLUMN_LABELS = {
  'TUITION': 'Tuition', 'OUTSTANDING': 'Outstanding', 'INTERHOUSE SPORT': 'Interhouse Sport',
  'DIESEL': 'Diesel', 'M.I.S': 'M.I.S', 'LESSON FEE': 'Lesson Fee', 'PHOTO': 'Photo',
  'BUS FEE': 'Bus Fee', 'PACES': 'Paces', 'CLUB': 'Club', 'RESULT FOLDER': 'Result Folder',
  'TEXTBOOK': 'Textbook', 'EX. BOOK': 'Exercise Book', 'THURSDAY WEAR': 'Thursday Wear',
  'SPORTSWEAR': 'Sportswear', 'CARDIGAN': 'Cardigan', 'UNIFORM': 'Uniform', 'DEV. LEVY': 'Dev. Levy',
  'GRADUATION': 'Graduation'
}

const handleDrop = (e) => { const f = e.dataTransfer.files[0]; if (f) processFile(f) }
const handleFile = (e) => { const f = e.target.files[0]; if (f) processFile(f) }

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

const CLASS_KEYWORDS = ['PLAY GROUP', 'NURSERY ONE', 'NURSERY TWO', 'RR', 'READING READINESS',
  'GRADE ONE', 'GRADE TWO', 'GRADE THREE', 'GRADE FOUR', 'GRADE FIVE', 'GRADE SIX']
const CLASS_LABEL_MAP = {
  'PLAY GROUP': 'Play Group', 'NURSERY ONE': 'Nursery 1', 'NURSERY TWO': 'Nursery 2',
  'RR': 'Reading Readiness', 'READING READINESS': 'Reading Readiness',
  'GRADE ONE': 'Grade 1', 'GRADE TWO': 'Grade 2', 'GRADE THREE': 'Grade 3',
  'GRADE FOUR': 'Grade 4', 'GRADE FIVE': 'Grade 5', 'GRADE SIX': 'Grade 6'
}

const parseFlatFee = (name) => {
  const match = String(name).match(/(?:\(|\b)?\s*(?:N)?\s*(\d[\d,]*\.?\d*)\s*(k)?\s*(?:flat(?:\s*fee)?)\s*(?:\)|\b)/i)
  if (!match) return null
  let val = parseFloat(match[1].replace(/,/g, ''))
  if (match[2]) val *= 1000
  return isNaN(val) ? null : val
}

const cleanName = (name) => String(name)
  .replace(/\(?\d+%\s*(?:discount)?\)?/gi, '(20% Discount off tuition only)')
  .replace(/N?\d+(?:,\d+)*[kK]?\s*flat(?:\s*fee)?(?:\/flat\s*fee)?/gi, '')
  .replace(/\((?!20% Discount).*?\)/g, '')
  .replace(/\s+/g, ' ').trim()

const parseStudents = (rows) => {
  let headerRow = null, headerRowIndex = -1
  for (let i = 0; i < rows.length; i++) {
    const upper = rows[i].map(c => String(c).trim().toUpperCase())
    if (upper.includes('NAME') && upper.includes('TUITION')) { headerRow = upper; headerRowIndex = i; break }
  }
  if (!headerRow) return
  const nameCol = headerRow.indexOf('NAME')
  const classCol = headerRow.indexOf('CLASS')
  const parsed = []
  const groups = new Set()
  let currentGrade = 'Unknown'
  for (let i = headerRowIndex + 1; i < rows.length; i++) {
    const row = rows[i]
    const classCell = String(row[classCol] || '').trim().toUpperCase()
    const nameCell = String(row[nameCol] || '').trim()
    if (classCell !== '') {
      const mk = CLASS_KEYWORDS.find(k => classCell.includes(k))
      if (mk) { currentGrade = CLASS_LABEL_MAP[mk] || mk; groups.add(currentGrade); if (!nameCell) continue }
    }
    if (!nameCell) continue
    const fees = {}
    for (const col of BILL_COLUMNS) {
      const colIdx = headerRow.indexOf(col)
      if (colIdx === -1) continue
      const val = parseFloat(String(row[colIdx] || '0').replace(/,/g, '')) || 0
      if (val > 0) fees[col] = val
    }
    const flatFee = parseFlatFee(nameCell)
    parsed.push({ rawName: nameCell, cleanName: cleanName(nameCell), grade: currentGrade, fees, parsedFlatFee: flatFee, flatFeeOverride: flatFee || null, _originalIndex: parsed.length })
  }
  students.value = parsed
  classGroups.value = Array.from(groups)
}

const filteredStudents = computed(() => {
  const q = search.value.toLowerCase()
  return students.value.filter(s => s.cleanName.toLowerCase().includes(q))
})
const selectedStudent = computed(() => selectedStudentIndex.value !== null ? students.value[selectedStudentIndex.value] : null)
const selectedStudentFees = computed(() => selectedStudent.value?.fees || {})
const singleTotal = computed(() => selectedStudent.value ? computeTotal(selectedStudent.value) : 0)
const bulkFilteredStudents = computed(() => bulkFilterClass.value ? students.value.filter(s => s.grade === bulkFilterClass.value) : students.value)

const previewFlatFee = computed(() => {
  if (!previewStudent.value) return null
  if (mode.value === 'single') return singleFlatFeeEnabled.value ? singleFlatFee.value : null
  return previewStudent.value.flatFeeOverride || previewStudent.value.parsedFlatFee || null
})

watch(selectedStudent, (s) => {
  if (s?.parsedFlatFee) { singleFlatFee.value = s.parsedFlatFee; singleFlatFeeEnabled.value = true }
  else { singleFlatFee.value = 0; singleFlatFeeEnabled.value = false }
})

const computeTotal = (student) => Object.values(student.fees).reduce((a, b) => a + b, 0)
const formatLabel = (key) => COLUMN_LABELS[key] || key

const openPreview = (student) => { previewStudent.value = student }

onMounted(async () => {
  try {
    const res = await fetch('/assets/images/tcad-nbg.png')
    const blob = await res.blob()
    const reader = new FileReader()
    reader.onloadend = () => { logoBase64.value = reader.result }
    reader.readAsDataURL(blob)
  } catch {}
})

// ─── PDF BUILD ────────────────────────────────────────────────────────────────
const buildPDF = (student, flatFee = null) => {
  const doc = new jsPDF()
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const mL = 18, mR = 192
  let y = 0

  // ── Decorative top band ──
  doc.setFillColor(9, 3, 59)
  doc.rect(0, 0, pageW * 0.65, 4, 'F')
  doc.setFillColor(255, 127, 80)
  doc.rect(pageW * 0.65, 0, pageW * 0.35, 4, 'F')
  y = 16

  // ── Watermark ──
  if (logoBase64.value) {
    doc.saveGraphicsState()
    doc.setGState(new doc.GState({ opacity: 0.05 }))
    doc.addImage(logoBase64.value, 'PNG', (pageW - 100) / 2, (pageH - 100) / 2, 100, 100)
    doc.restoreGraphicsState()
  }

  // ── Logo top-right ──
  if (logoBase64.value) doc.addImage(logoBase64.value, 'PNG', 155, 8, 36, 36)

  // ── School name & address ──
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(9, 3, 59)
  doc.text('THE COVENANT ACADEMY', mL, y)
  y += 5
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(120, 120, 120)
  doc.text('No 8a Kayes Street, Opp Sageto, Off Nouakchott Street, Zone 1, Wuse Abuja', mL, y)
  y += 4.5
  doc.text('Tel: +2348036233157   |   Email: tcadinfo@gmail.com', mL, y)
  
  // Force 'y' to clear the logo on the right. 
  // The logo starts at y=8 and is 36 units tall (ends at 44).
  y = 52

  // ── Title bar ──
  doc.setFillColor(9, 3, 59)
  doc.roundedRect(mL, y, mR - mL, 12, 2, 2, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(255, 255, 255)
  doc.text('FEE STATEMENT', mL + 5, y + 4.5)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(176, 196, 222)
  doc.text(`${settings.value.term}   ·   ${settings.value.academicYear}   ·   ${student.grade}`, mL + 5, y + 9)
  y += 17

  // ── Accent bar + student name ──
  doc.setFillColor(255, 127, 80)
  doc.rect(mL, y, 2.5, 11, 'F')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(160, 160, 160)
  doc.text('NAME OF PUPIL', mL + 5, y + 3.5)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.setTextColor(9, 3, 59)
  doc.text(student.cleanName, mL + 5, y + 9.5)
  y += 15

  // ── Divider ──
  doc.setDrawColor(220, 220, 220)
  doc.setLineWidth(0.3)
  doc.line(mL, y, mR, y)
  y += 6

  // ── Fee breakdown header ──
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.setTextColor(9, 3, 59)
  doc.text('FEE BREAKDOWN', mL, y)
  doc.setLineWidth(0.5)
  doc.setDrawColor(9, 3, 59)
  doc.line(mL, y + 1.5, mR, y + 1.5)
  y += 6

  // ── Fee rows ──
  doc.setLineWidth(0.15)
  doc.setDrawColor(240, 240, 240)
  for (const [col, val] of Object.entries(student.fees)) {
    if (!val) continue
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.5)
    doc.setTextColor(80, 80, 80)
    doc.text(formatLabel(col), mL, y)
    doc.setFont('helvetica', 'semibold')
    doc.setTextColor(9, 3, 59)
    doc.text('N ' + val.toLocaleString(), mR, y, { align: 'right' })
    doc.line(mL, y + 1.5, mR, y + 1.5)
    y += 6.5
  }

  y += 2

  // ── Total box ──
  doc.setFillColor(9, 3, 59)
  doc.roundedRect(mL, y, mR - mL, 11, 2, 2, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9.5)
  doc.setTextColor(255, 255, 255)
  doc.text('TOTAL FEE DUE', mL + 5, y + 7)
  doc.text('N ' + computeTotal(student).toLocaleString(), mR - 4, y + 7, { align: 'right' })
  y += 15

  // ── Flat fee box ──
  if (flatFee && flatFee > 0) {
    doc.setDrawColor(255, 127, 80)
    doc.setLineWidth(0.8)
    doc.roundedRect(mL, y, mR - mL, 10, 2, 2, 'S')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(255, 127, 80)
    doc.text('AMOUNT TO PAY NOW', mL + 5, y + 6.5)
    doc.text('N ' + flatFee.toLocaleString(), mR - 4, y + 6.5, { align: 'right' })
    y += 14
  }

  // ── Apology note ──
  doc.setFillColor(255, 253, 245)
  doc.setDrawColor(184, 134, 11)
  doc.setLineWidth(0.3)
  const noteH = 40 // INCREASED HEIGHT TO FIT NEW TEXT
  doc.roundedRect(mL, y, mR - mL, noteH, 2, 2, 'FD')
  // Gold left border
  doc.setFillColor(184, 134, 11)
  doc.rect(mL, y, 2.5, noteH, 'F')
  // Note heading
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.setTextColor(184, 134, 11)
  doc.text('IMPORTANT NOTICE', mL + 6, y + 5)
  // Note body
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(70, 70, 70)
  doc.text('Dear Parents, we sincerely apologize for an error in the 2nd term diesel charges. We realized', mL + 6, y + 10)
  doc.text('that we undercharged due to the absence of a proper bursar and with diesel prices increasing', mL + 6, y + 15)
  doc.text('again, there is a difference that needs to be covered.', mL + 6, y + 20)
  doc.text('We kindly notify you that this difference will be included with the 3rd term fees slip.', mL + 6, y + 25)
  doc.text('Thank you for your understanding and support.', mL + 6, y + 30)
  doc.text('Also look out for the Graduation Fee which will be communicated soon.', mL + 6, y + 35) // NEW LINE
  y += noteH + 6

  // ── Bottom 2-column section ──
  const colW = (mR - mL - 6) / 2

  // Left: Payment details
  doc.setFillColor(249, 247, 244)
  doc.roundedRect(mL, y, colW, 26, 2, 2, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.setTextColor(9, 3, 59)
  doc.text('PAYMENT DETAILS', mL + 4, y + 5)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(60, 60, 60)
  doc.text('A/C Name: THE COVENANT ACADEMY LIMITED', mL + 4, y + 11)
  doc.text('A/C No:    0164030012', mL + 4, y + 16.5)
  doc.text('Bank:       GT Bank', mL + 4, y + 22)

  // Right: PTC note
  const rX = mL + colW + 6
  doc.setFillColor(249, 247, 244)
  doc.roundedRect(rX, y, colW, 26, 2, 2, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.setTextColor(9, 3, 59)
  doc.text('PLEASE NOTE', rX + 4, y + 5)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(60, 60, 60)
  doc.text('PTC Levy is N15,000 for the whole year', rX + 4, y + 11)
  doc.text('and is NOT included in the total above.', rX + 4, y + 16.5)
  y += 32

  // ── Sign off ──
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(9)
  doc.setTextColor(110, 110, 110)
  doc.text('Thank you for your co-operation.', mL, y)
  doc.setDrawColor(9, 3, 59)
  doc.setLineWidth(0.4)
  doc.line(mR - 50, y, mR, y)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.setTextColor(9, 3, 59)
  doc.text('BURSAR', mR - 25, y + 5, { align: 'center' })

  // ── Bottom decorative band ──
  doc.setFillColor(255, 127, 80)
  doc.rect(0, pageH - 4, pageW * 0.4, 4, 'F')
  doc.setFillColor(9, 3, 59)
  doc.rect(pageW * 0.4, pageH - 4, pageW * 0.6, 4, 'F')

  return doc
}

const generateSinglePDF = (student) => {
  const flatFee = singleFlatFeeEnabled.value ? singleFlatFee.value : (student.flatFeeOverride || student.parsedFlatFee || null)
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
    await new Promise(r => setTimeout(r, 100))
  }
  bulkGenerating.value = false
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>