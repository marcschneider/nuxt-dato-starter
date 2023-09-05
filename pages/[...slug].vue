<script setup>

// Steps

// 1. Get full url
const route = useRoute()

// 2. Extract the last part of the url
const lastRouteItem = route.path.match(/\/([^/]+)\/?$/)[1]

// 3. Make a query that searches for the last part of the url and load the id, slug, pageName, children
const matchingSlugsQuery = `
  query ($slug: String) {
    allPages(filter: {slug: {eq: $slug}}) {
      id
      slug
      pageName
      children {
        id
        slug
      }
    }
  }
`
const {data: matchingSlugsData, error: matchingSlugsDataError} = await useGraphqlQuery({
  query: matchingSlugsQuery,
  variables: {
    slug: lastRouteItem,
  },
})

// 4. Loop trough all results and check if the children slugs match the rest of the slugs
const findMatch = function (pages) {
  for(const page of pages) {
    return page.id
  }
}

const matchId = findMatch(matchingSlugsData.value.allPages)

// 5. If a result was found load the content of the page id
const contentQuery = `
  query ($id: ItemId = "") {
    page(filter: {id: {eq: $id}}) {
      pageName
      id
    }
  }
`

const {data: contentData, error: contentError} = await useGraphqlQuery({
  query: contentQuery,
  variables: {
    id: matchId,
  },
})
</script>

<template>
  <div v-if="matchingSlugsDataError || contentError ">Something bad happened!</div>
  <div class="m-2 flex flex-row w-full gap-2" v-else>
    <div class="cursor-pointer hover:bg-green-300 transition text-md px-4 py-1 bg-green-200 text-green-800 rounded-md font-medium">
      {{ contentData.page }}
    </div>
  </div>
</template>