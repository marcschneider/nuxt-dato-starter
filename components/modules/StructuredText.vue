<script setup>
import { StructuredText, renderNodeRule } from 'vue-datocms'
import { isHeading } from 'datocms-structured-text-utils'
import { ElementsTypography } from '#components'

defineProps({
  content: Object,
})

defineComponent({
  components: {
    StructuredText,
  },
})

const customNodeRules = [
  renderNodeRule(isHeading, ({ adapter: { renderNode: h }, node, children, key }) => {
    let styleType = 'base'
    if (node.level === 1)
      styleType = 'xl'
    else if (node.level === 2)
      styleType = 'lg'
    else
      styleType = 'base'
    return h(ElementsTypography, { key, tag: `h${node.level}`, styleType, text: children[0] }, [])
  }),
]
</script>

<template>
  <StructuredText
    :data="content"
    :custom-node-rules="customNodeRules"
  />
</template>
