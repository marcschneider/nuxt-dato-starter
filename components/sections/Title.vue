<script setup>
defineProps({
  sectionData: Object,
})
</script>

<template>
  <ElementsContainer class="mt-10">
    <h2 class="col-span-full typography-title-lg">
      {{ sectionData.title }}
    </h2>
  </ElementsContainer>
</template>
