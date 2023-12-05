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
      class="mt-20 desktop:col-span-6 desktop:col-start-4 laptop:col-span-6 laptop:col-start-4 tablet:col-span-6 tablet:col-start-2 phone:col-span-full"
      :data="sectionData.text"
      :render-link-to-record="renderLinkToRecord"
      :render-inline-record="renderInlineRecord"
      :render-block="renderBlock"
    />
  </ModulesContainer>
</template>

<style scoped>
:deep(h2) {
  @apply typography-title-md;
}

:deep(h3) {
  @apply typography-title-sm mt-6;
}

:deep(p){
  @apply typography-base;
}

:deep(a) {
  @apply typography-link;
}

:deep(ul) {
  @apply typography-ul mt-6;
}

:deep(ol) {
  @apply typography-ol mt-6;
}
</style>
