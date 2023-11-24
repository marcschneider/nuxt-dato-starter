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
  <ModulesGrid class="mt-10">
    <h1 class="text-4xl mb-8 col-span-full">
      {{ pageData.title }}
    </h1>
  </ModulesGrid>
  <component
    :is="dynamicComponent(section)"
    v-for="section in pageData.content"
    :key="section.id"
    :section-data="section"
  />
</template>
