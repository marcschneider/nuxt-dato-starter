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

const { $gsap: gsap, $SplitText: SplitText } = useNuxtApp()
const element = ref()

onMounted(() => {
  const split = new SplitText(element.value, { type: 'chars' })
  gsap.set(element.value, { opacity: 1 })
  gsap.from(split.chars, {
    duration: 0.5,
    y: 20,
    autoAlpha: 0,
    stagger: 0.05,
  })
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
  <component :is="props.tag" ref="element" class="text-red-500 opacity-0" :class="buildStyle">
    {{ props.text }}
  </component>
</template>
