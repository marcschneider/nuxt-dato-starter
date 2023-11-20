<script setup>
defineProps({
  pageData: {
    type: Object,
    required: true,
  },
})

const components = {
  section_title: resolveComponent('SectionTitle'),
  section_lead: resolveComponent('SectionLead'),
}

function dynamicComponent(section) {
  return components[section._modelApiKey]
}
</script>

<template>
  <h1>{{ pageData.title }}</h1>
  <component
    :is="dynamicComponent(section)"
    v-for="section in pageData.content"
    :key="section.id"
    :section-data="section"
  />
</template>
