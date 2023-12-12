<script setup>
import { allTeamMembers } from '~/graphql/queries'

const count = ref(1)

// Use useGraphqlQuery composable instead
const runtimeConfig = useRuntimeConfig()
const token = runtimeConfig.public.datocms.draftEnabledToken
const { data } = await useFetch('https://graphql.datocms.com', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'X-Include-Drafts': 'true',
  },
  body: {
    query: allTeamMembers,
    variables: {
      count,
    },
  },
  // Add dynamic overwrite for watch to useGraphqlQuery composable
  watch: [count],
})

// Should be a composable
function buildLink(slug) {
  const pageStore = usePageStore()
  const specialSlugs = pageStore.specialSlugs
  const teamSlug = specialSlugs.specialSlugTeam.replace(/^\/|\/$/g, '')
  return `/${teamSlug}/${slug}`
}
</script>

<template>
  <ElementsContainer>
    <div class="col-span-full">
      <h2 class="mb-6 text-xl font-bold">
        All team members
      </h2>
      <NuxtLink
        v-for="item in data.data.allTeams"
        :key="item.id"
        class="block p-6 mb-6 shadow-md w-72"
        :to="buildLink(item.slug)"
      >
        {{ item.name }}
      </NuxtLink>
      <!-- Hide the button when no more data is available -->
      <button class="px-3 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none" @click="count++">
        Load more
      </button>
    </div>
  </ElementsContainer>
</template>
