<script setup>
import {
  allTeamFiltersQuery,
  allTeamMembersQuery,
} from '~/graphql/queries'

const router = useRouter()

const initialCount = 1
const increment = 1
const textLoadMore = 'Load more'

const { data: filterData } = await useGraphqlQuery({
  query: allTeamFiltersQuery,
})

const allTeamFilters = computed(() => {
  return filterData.value?.allTeamFilters || null
})

const count = ref(initialCount)
const countIncrement = ref(increment)

const initialFilterName = router.currentRoute.value.query.filter
const initialFilter = allTeamFilters.value.find(filter => urlFriendlyName(filter.name) === initialFilterName)
const initialFilterId = initialFilter ? initialFilter.id : allTeamFilters.value[0].id

const currentFilterId = ref(initialFilterId)

const { data: memberData } = await useGraphqlQuery({
  subscription: false,
  query: allTeamMembersQuery,
  variables: {
    count,
    currentFilterId,
  },
})

function setFilter(id, name) {
  currentFilterId.value = id
  count.value = initialCount

  router.push({ query: { filter: urlFriendlyName(name) } })
}

const maxCount = computed(() => {
  return memberData.value?._allTeamsMeta.count || null
})

const allTeamMembers = computed(() => {
  return memberData.value?.allTeams || null
})
</script>

<template>
  <ElementsContainer class="mt-10">
    <div class="col-span-full">
      <nav v-if="allTeamFilters" class="flex gap-2 mb-4">
        <button
          v-for="filter in allTeamFilters"
          :key="filter.id"
          class="px-3 py-1 rounded-full typography-base"
          :class="{
            'bg-black text-white': currentFilterId === filter.id,
            'hover:bg-gray-100': currentFilterId !== filter.id,
          }"
          :aria-label="`Filter by ${filter.name}`"
          @click="setFilter(filter.id, filter.name)"
        >
          {{ filter.name }}
        </button>
      </nav>
      <div class="flex flex-col mb-4">
        <ElementsTeamItem
          v-for="member in allTeamMembers"
          :key="member.id"
          :member="member"
        />
      </div>
      <ElementsButton
        v-if="count < maxCount"
        type="secondary"
        aria-label="Load more team members"
        @click="count += countIncrement"
      >
        {{ textLoadMore }}
      </ElementsButton>
    </div>
  </ElementsContainer>
</template>
