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
  <div class="flex space-x-4">
    <div v-for="item in menu" :key="item.id">
      <NuxtLink :to="generateCommonUrl(item.pointsTo)">
        {{ item.title }}
      </NuxtLink>
    </div>
  </div>
</template>
