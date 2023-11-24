<script setup>
defineProps({
  sectionData: Object,
})
</script>

<template>
  <ModulesGrid class="mt-10">
    <ModulesStructuredText
      class="col-span-full"
      :content="sectionData.text"
    />
  </ModulesGrid>
</template>
