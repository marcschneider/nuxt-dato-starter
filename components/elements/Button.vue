<script setup>
defineProps({
  type: {
    type: String,
    default: 'primary',
  },
})
</script>

<template>
  <button
    class="px-4 py-2 rounded typography-base"
    :class="{
      'text-white bg-black hover:bg-gray-700': type === 'primary',
      'text-black border hover:bg-gray-100': type === 'secondary',
    }"
  >
    <slot />
  </button>
</template>
