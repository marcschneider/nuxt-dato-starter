<script setup>
import { allTeamMembersQuery } from '~/graphql/queries'

const count = ref(1)
const countIncrement = 1

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
    query: allTeamMembersQuery,
    variables: {
      count,
    },
  },
  // Add dynamic overwrite for watch to useGraphqlQuery composable
  watch: [count],
})

const maxCount = computed(() => {
  return data.value.data._allTeamsMeta.count
})

const allTeamMembers = computed(() => {
  return data.value.data.allTeams
})
</script>

<template>
  <ElementsContainer>
    <div class="col-span-full">
      <h2 class="mb-6 text-xl font-bold">
        All team members
      </h2>
      <NuxtLink
        v-for="member in allTeamMembers"
        :key="member.id"
        class="block p-6 mb-6 shadow-md w-72"
        :to="generateSpecialUrl(member.slug)"
      >
        {{ member.name }}
      </NuxtLink>
      <button
        v-if="count < maxCount"
        class="px-3 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
        @click="count += countIncrement"
      >
        Load more
      </button>
    </div>
  </ElementsContainer>
</template>
