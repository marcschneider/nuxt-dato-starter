<script setup>
import { Image as DatocmsImage, StructuredText, renderMarkRule, renderNodeRule } from 'vue-datocms'

const props = defineProps({
  sectionData: Object,
  index: Number,
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
        // when the image is in the first two blocks, it will be prioritized
        'priority': props.index <= 1,
      })
    default:
      return null
  }
}
</script>

<template>
  <ModulesContainer>
    <StructuredText
      class="col-span-full"
      :data="sectionData.text"
      :render-link-to-record="renderLinkToRecord"
      :render-inline-record="renderInlineRecord"
      :render-block="renderBlock"
    />
  </ModulesContainer>
</template>

<style scoped>
::v-deep h1 {
  @apply typography-title-lg;
}

::v-deep a {
  @apply typography-link;
}
</style>
