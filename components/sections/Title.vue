<script setup>
defineProps({
  sectionData: Object,
})
</script>

<template>
  <ModulesContainer class="mt-10">
    <ElementsTypography
      class="col-span-full"
      :text="sectionData.title"
      tag="h2"
      style-type="xl"
    />
  </ModulesContainer>
</template>
