<script setup>
import {
  allTeamFiltersQuery,
  allTeamMembersQuery,
} from '~/graphql/queries'

const router = useRouter()

const INITIAL_COUNT = 1
const INCREMENT = 1
const TEXT_LOAD_MORE = 'Load more'

const { data: filterData } = await useGraphqlQuery({
  query: allTeamFiltersQuery,
})

const allTeamFilters = computed(() => {
  return filterData.value?.allTeamFilters || null
})

const initialFilterName = router.currentRoute.value.query.filter
const initialFilter = allTeamFilters.value.find(filter => urlFriendlyName(filter.name) === initialFilterName)
const initialFilterId = initialFilter ? initialFilter.id : allTeamFilters.value[0].id

const currentFilterId = ref(initialFilterId)
const count = ref(INITIAL_COUNT)
const countIncrement = ref(INCREMENT)

const { data: memberData } = await useGraphqlQuery({
  subscription: false,
  query: allTeamMembersQuery,
  variables: {
    count,
    currentFilterId,
  },
})

function setCount() {
  count.value += countIncrement.value
}

function setFilter(id, name) {
  currentFilterId.value = id
  count.value = INITIAL_COUNT

  router.push({ query: { filter: urlFriendlyName(name) } })
}

const maxCount = computed(() => {
  return memberData.value?._allTeamsMeta.count || null
})

const allTeamMembers = computed(() => {
  return memberData.value?.allTeams || null
})

watch(() => router.currentRoute.value, (newRoute) => {
  const newFilterName = newRoute.query.filter
  const newFilter = allTeamFilters.value.find(filter => urlFriendlyName(filter.name) === newFilterName)
  const newFilterId = newFilter ? newFilter.id : allTeamFilters.value[0].id

  if (newFilterId !== currentFilterId.value) {
    currentFilterId.value = newFilterId
    count.value = INITIAL_COUNT
  }
})
</script>

<template>
  <ElementsContainer class="mt-10">
    <div class="col-span-full">
      <ElementsFilter
        v-if="allTeamFilters"
        :all-filters="allTeamFilters"
        :current-filter-id="currentFilterId"
        @set-filter="setFilter"
      />
      <div v-if="allTeamMembers" class="flex flex-col mb-4">
        <ElementsTeamItem
          v-for="member in allTeamMembers"
          :key="member.id"
          :member="member"
        />
      </div>
      <ElementsButton
        v-if="count < maxCount"
        type="secondary"
        @click="setCount"
      >
        {{ TEXT_LOAD_MORE }}
      </ElementsButton>
    </div>
  </ElementsContainer>
</template>
