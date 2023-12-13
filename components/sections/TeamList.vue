<script setup>
import { allTeamMembersQuery } from '~/graphql/queries'

// How the data is sorted is unclear -> Fix it

const initialCount = ref(1)
const count = ref(1)
const countIncrement = ref(1)
const filterId = ref('')

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
      filterId,
    },
  },
  // Add dynamic overwrite for watch to useGraphqlQuery composable
  watch: [count, filterId],
})

function setFilter(id) {
  filterId.value = id
  count.value = initialCount.value
}

const maxCount = computed(() => {
  return data.value.data._allTeamsMeta.count
})

const allTeamMembers = computed(() => {
  return data.value.data.allTeams
})

const allTeamFilters = computed(() => {
  return data.value.data.allTeamFilters || null
})

// Works just on client side
onMounted(() => {
  setFilter(allTeamFilters.value[0].id)
})
</script>

<template>
  <ElementsContainer>
    <div class="col-span-full">
      <h2 class="mb-6 text-xl font-bold">
        All team members
      </h2>
      <div v-if="allTeamFilters" class="flex gap-4">
        <!-- Mark active filter -->
        <button v-for="filter in allTeamFilters" :key="filter.id" @click="setFilter(filter.id)">
          {{ filter.name }}
        </button>
      </div>
      <NuxtLink
        v-for="member in allTeamMembers"
        :key="member.id"
        class="block p-6 mb-6 shadow-md w-72"
        :to="generateSpecialUrl(member.slug)"
      >
        {{ member.name }}
      </NuxtLink>
      <!-- The max count should also be reactive and respect the data limit inclusive the filter -->
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
