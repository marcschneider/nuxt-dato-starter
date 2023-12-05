<script setup>
defineProps({
  pageData: {
    type: Object,
    required: true,
  },
})

const components = {
  section_title: resolveComponent('SectionsTitle'),
  section_rich_text: resolveComponent('SectionsRichText'),
}

function dynamicComponent(section) {
  return components[section._modelApiKey]
}
</script>

<template>
  <component
    :is="dynamicComponent(section)"
    v-for="(section, index) in pageData.content"
    :key="section.id"
    :index="index"
    :section-data="section"
  />
</template>
