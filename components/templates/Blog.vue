<script setup>
defineProps({
  pageData: {
    type: Object,
    required: true,
  },
})

const components = {
  section_title: resolveComponent('SectionsTitle'),
}

function dynamicComponent(section) {
  return components[section._modelApiKey]
}
</script>

<template>
  <ModulesContainer class="mt-10">
    <h1 class="mb-8 text-4xl col-span-full">
      {{ pageData.title }}
    </h1>
  </ModulesContainer>
  <component
    :is="dynamicComponent(section)"
    v-for="section in pageData.content"
    :key="section.id"
    :section-data="section"
  />
</template>
