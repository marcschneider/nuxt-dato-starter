<script setup>
defineProps({
  allFilters: {
    type: Array,
    required: true,
  },
  currentFilterId: {
    type: String,
    required: true,
  },
})
defineEmits(['setFilter'])
</script>

<template>
  <nav class="flex gap-2 mb-4">
    <button
      v-for="filter in allFilters"
      :key="filter.id"
      class="px-3 py-1 rounded-full typography-base"
      :class="{
        'bg-black text-white': currentFilterId === filter.id,
        'hover:bg-gray-100': currentFilterId !== filter.id,
      }"
      @click="$emit('setFilter', filter.id, filter.name)"
    >
      {{ filter.name }}
    </button>
  </nav>
</template>
