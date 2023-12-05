<script setup>
import { Image as DatocmsImage, StructuredText, renderNodeRule } from 'vue-datocms'
import { isHeading } from 'datocms-structured-text-utils'
import { ElementsTypography } from '#components'

defineProps({
  content: Object,
})

function renderLinkToRecord({ record, children, transformedMeta }) {
  switch (record.__typename) {
    case 'PageRecord':
      return h(
        'a',
        { ...transformedMeta, href: `/team/${record.slug}` },
        children,
      )
    default:
      return null
  }
}

function renderInlineRecord({ record }) {
  switch (record.__typename) {
    case 'PageRecord':
      return h('a', { href: `/team/${record.slug}` }, record.label)
    default:
      return null
  }
}

function renderBlock({ record }) {
  switch (record.__typename) {
    case 'ImageRecord':
      return h(DatocmsImage, {
        'data': record.image.responsiveImage,
        'fade-in-duration': 0,
        'priority': true,
      })
    default:
      return null
  }
}

const customNodeRules = [
  // renderNodeRule(isHeading, ({ adapter: { renderNode: h }, node, children, key }) => {
  //   let styleType = 'base'
  //   if (node.level === 1)
  //     styleType = 'xl'
  //   else if (node.level === 2)
  //     styleType = 'lg'
  //   else
  //     styleType = 'base'
  //   return h(ElementsTypography, {
  //     key,
  //     tag: `h${node.level}`,
  //     styleType,
  //     text: children[0],
  //   }, [])
  // }),
]
</script>

<template>
  <StructuredText
    :data="content"
    :render-link-to-record="renderLinkToRecord"
    :render-inline-record="renderInlineRecord"
    :render-block="renderBlock"
    :custom-node-rules="customNodeRules"
  />
</template>
