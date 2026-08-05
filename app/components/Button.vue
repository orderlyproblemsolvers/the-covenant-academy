<template>
  <NuxtLink
    :to="props.to"
    class="group inline-flex items-center justify-center px-8 py-2 text-base font-medium transition-all duration-300"
    :class="classes"
  >
    {{props.content}}
    <Icon class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" v-if="props.icon" :name="props.icon"/>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps({
  to: {
    type: String,
    required: true
  },
  icon: String,
  content: {
    type: String,
    required: true
  },
  styles: {
    type: String,
    required: true
  }
})

const classes = computed(()=>({
'bg-[#09033b]': props.styles == 'primary',
'hover:bg-[#0a0440]': props.styles == 'primary',
'text-white': props.styles == 'primary' || props.styles == 'alternate' || props.styles === 'tertiary',
'border': props.styles == 'secondary' || props.styles === 'tertiary',
'border-gray-200 ': props.styles == 'secondary' || props.styles === 'tertiary',
'hover:border-[#09033b] ': props.styles == 'secondary' || props.styles === 'tertiary',
'text-[#09033b]': props.styles == 'secondary',
'hover:text-[#09033b] ': props.styles == 'secondary ' || props.styles === 'tertiary',
'hover:bg-gray-50': props.styles == 'secondary' || props.styles === 'tertiary',
'bg-gradient-to-r': props.styles == 'alternate',
'from-orange-500': props.styles == 'alternate',
'to-orange-600': props.styles == 'alternate'
}))
</script>