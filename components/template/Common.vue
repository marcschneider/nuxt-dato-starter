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
  <h1 class="text-4xl mb-8">
    {{ pageData.title }}
  </h1>
  <component
    :is="dynamicComponent(section)"
    v-for="section in pageData.content"
    :key="section.id"
    class="text-sm tracking-wide font-mono w-6/12 bg-green-100 p-6 rounded-xl mt-2"
    :section-data="section"
  />
</template>
