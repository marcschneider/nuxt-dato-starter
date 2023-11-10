<script setup>
const route = useRoute()
const routeParams = route.path.split('/').filter(Boolean);
const lastRouteItem = routeParams[routeParams.length - 1];

// Make a query that searches for the last part of the url and load the id, slug, pageName, parent
const matchingSlugsQuery = `
  query ($slug: String) {
    allPages(filter: {slug: {eq: $slug}}) {
      id
      slug
      pageName
      parent {
        id
        slug
        pageName
        parent {
          id
          slug
          pageName
        }
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

// Loop trough all results and check if the parent slugs match the rest of the slugs
const findMatch = function (pages) {
  for (const page of pages) {
    // Check if parent slugs match the expected hierarchy
    if (checkParentHierarchy(page)) {
      return page.id;
    }
  }
  return null; // Return null if no match is found
};

const checkParentHierarchy = function (page) {
  let currentPage = page;

  for (let index = routeParams.length - 2; index >= 0; index--) {
    if(!currentPage.parent || currentPage.parent.slug !== routeParams[index]) {
      return false;
    }
    currentPage = currentPage.parent;
  }
  
  return true;
}

const matchId = findMatch(matchingSlugsData.value.allPages)

// If a result was found load the content of the page id
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
  <div class="m-2 flex flex-row gap-2" v-else>
    <div class="cursor-pointer hover:bg-green-300 transition text-md px-4 py-1 bg-green-200 text-green-800 rounded-md font-medium">
      {{ contentData.page.pageName }} – {{ contentData.page.id }}      
    </div>
  </div>
</template>