<script setup>
import { StructuredText, renderNodeRule } from 'vue-datocms'

defineProps({
  sectionData: Object,
})

defineComponent({
  components: {
    StructuredText,
  },
})

const customNodeRules = [
  renderNodeRule(
    node => node.type === 'paragraph',
    (node) => {
      return `<p class="text-xl">${node.children}</p>`
    },
  ),
]
</script>

<template>
  <ModulesGrid class="mt-10">
    <StructuredText
      class="col-span-full text-sm tracking-wide font-mono"
      :data="sectionData.text"
      :custom-node-rules="customNodeRules"
    />
  </ModulesGrid>
</template>
