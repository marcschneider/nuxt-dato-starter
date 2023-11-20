<script setup>
defineProps({
  pageData: Object,
})

// function sectionName(item) {
//   if (item._modelApiKey === undefined)
//     return

//   const words = item._modelApiKey.split('_')

//   const camelCase = words.map((word) => {
//     return word.charAt(0).toUpperCase() + word.slice(1)
//   }).join('')

//   return resolveComponent(`Section${camelCase}`)
// }

const Foo = resolveComponent('SectionTitle')
</script>

<template>
  <h1>{{ pageData.title }}</h1>
  <component
    :is="Foo"
    v-for="(section, index) in pageData.content"
    :key="index"
    :section-data="section"
  />
</template>
