<script setup>

// Steps
// 1. Get full url
// 2. Extract the last part of the url
// 3. Make a query that searches for the last part of the url and load the id, slug, pageName, children
// 4. Loop trough all results and check if the children slugs match the rest of the slugs
// 5. If a result was found load the content of the page id


const route = useRoute()
console.log(route.path.match(/\/([^/]+)\/?$/)[1])



/////////////////

const allPagesQuery = `
  query ($hasParent: BooleanType) {
    allPages(filter: {parent: {exists: $hasParent}}) {
      id
      slug
      pageName
      children {
        id
        slug
        children {
          id
          slug
        }
      }
    }
  }
`;

const { data, error } = await useGraphqlQuery({
  query: allPagesQuery,
  variables: {
    hasParent: false,
  },
})

</script>

<template>
  <div v-if="error">Something bad happened!</div>
  <div class="m-2 flex flex-row w-full gap-2" v-else>
    <div
      class="cursor-pointer hover:bg-green-300 transition text-md px-4 py-1 bg-green-200 text-green-800 rounded-md font-medium"
      v-for="page in data.allPages"
      :key="page.id"
    >
      {{ page.pageName }}
    </div>
  </div>
</template>