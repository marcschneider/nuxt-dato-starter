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
    (node, children) => {
      console.log(node)
      return `<p class="text-xl">${node.children}</p>`
    },
  ),
]
</script>

<template>
  <div>
    <StructuredText :data="sectionData.text" :custom-node-rules="customNodeRules" />
  </div>
</template>
