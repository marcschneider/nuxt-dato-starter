<script setup>
defineProps({
  pageData: {
    type: Object,
    required: true,
  },
})

const components = {
  section_title: resolveComponent('SectionsTitle'),
  section_text: resolveComponent('SectionsText'),
}

function dynamicComponent(section) {
  return components[section._modelApiKey]
}
</script>

<template>
  <component
    :is="dynamicComponent(section)"
    v-for="section in pageData.content"
    :key="section.id"
    :section-data="section"
  />
</template>
