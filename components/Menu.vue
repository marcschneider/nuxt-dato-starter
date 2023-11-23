<script setup>
import { menuHeaderQuery } from '~/graphql/queries'

const { data } = await useGraphqlQuery({
  query: menuHeaderQuery,
})

const menu = computed(() => {
  return data.value.layout.menuHeader
})
</script>

<template>
  <div>{{ menu }}</div>
  <div v-for="item in menu" :key="item.pointsTo.id">
    {{ item.title }}
  </div>
</template>
