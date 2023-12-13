<script setup>
import {
  allTeamFiltersQuery,
  allTeamMembersQuery,
} from '~/graphql/queries'

const initialCount = 1
const increment = 1

// Add simple layout and remove all unnecessary design
// Add filter changes to url

const { data: filter } = await useGraphqlQuery({
  query: allTeamFiltersQuery,
})

const allTeamFilters = computed(() => {
  return filter.value?.allTeamFilters || null
})

const count = ref(initialCount)
const countIncrement = ref(increment)
const currentFilterId = ref(allTeamFilters.value[0].id)

const { data: members } = await useGraphqlQuery({
  subscription: false,
  query: allTeamMembersQuery,
  variables: {
    count,
    currentFilterId,
  },
})

function setFilter(id) {
  currentFilterId.value = id
  count.value = initialCount
}

const maxCount = computed(() => {
  return members.value?._allTeamsMeta.count || null
})

const allTeamMembers = computed(() => {
  return members.value?.allTeams || null
})
</script>

<template>
  <ElementsContainer>
    <div class="col-span-full">
      <h2 class="mb-6 text-xl font-bold">
        All team members
      </h2>
      <div v-if="allTeamFilters" class="flex gap-4">
        <button
          v-for="filter in allTeamFilters"
          :key="filter.id"
          :class="{
            'bg-blue-500': currentFilterId === filter.id,
          }"
          @click="setFilter(filter.id)"
        >
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
