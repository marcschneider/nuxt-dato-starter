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
  <ElementsContainer class="mt-10">
    <h1 class="mb-8 text-4xl col-span-full">
      {{ pageData.title }}
    </h1>
  </ElementsContainer>
  <component
    :is="dynamicComponent(section)"
    v-for="(section, index) in pageData.content"
    :key="section.id"
    :index="index"
    :section-data="section"
  />
</template>
