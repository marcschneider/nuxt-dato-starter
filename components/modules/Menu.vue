<script setup>
import { menuHeaderQuery } from '~/graphql/queries'

const { data } = await useGraphqlQuery({
  query: menuHeaderQuery,
})

const menu = computed(() => {
  return data.value.layout.menuHeader
})

function generateUrl(item) {
  function buildSlug(obj) {
    if (!obj)
      return ''

    const { slug, parent } = obj
    const parentSlug = buildSlug(parent)

    if (parentSlug)
      return `${parentSlug}/${slug}`

    return slug
  }

  const slug = buildSlug(item)
  return `/${slug}`
}
</script>

<template>
  <div class="flex space-x-4">
    <div v-for="item in menu" :key="item.id">
      <NuxtLink :to="generateUrl(item.pointsTo)">
        {{ item.title }}
      </NuxtLink>
    </div>
  </div>
</template>
