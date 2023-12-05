<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: 'span',
  },
  styleType: {
    type: String,
    default: 'base',
  },
})

const buildStyle = computed(() => {
  if (props.styleType === 'xl')
    return 'text-6xl font-bold text-gray-900'
  if (props.styleType === 'lg')
    return 'text-xl font-bold text-gray-900'
  if (props.styleType === 'base')
    return 'text-base font-medium text-gray-500'

  return 'text-red-500'
})
</script>

<template>
  <component :is="props.tag" :class="buildStyle">
    {{ props.text }}
  </component>
</template>
