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
      <ElementsFilter
        v-if="allTeamFilters"
        :all-filters="allTeamFilters"
        :current-filter-id="currentFilterId"
        @set-filter="setFilter"
      />
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
