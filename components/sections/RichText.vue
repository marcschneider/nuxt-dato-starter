<script setup>
defineProps({
  sectionData: Object,
})
</script>

<template>
  <ModulesContainer class="mt-10">
    <ModulesStructuredText
      class="col-span-full"
      :content="sectionData.text"
    />
  </ModulesContainer>
</template>
