<script setup>
function findPage(pages, params) {
  const param = params.shift();
  const page = pages.find(p => p.slug === param);
  if (!page) {
    return null;
  }
  if (params.length === 0) {
    return page;
  }
  return findPage(page.children, params);
}

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
});

// const routeArr = params.pathMatch.match(/([^\/]+)/g) || [''];
</script>

<template>
  <div v-if="error">Something bad happened!</div>
  <div class="m-2 flex flex-row w-full gap-2" v-else>
    <div v-for="page in data.allPages" :key="page.id">
      <p class="cursor-pointer hover:bg-green-300 transition text-md px-4 py-1 bg-green-200 text-green-800 rounded-md font-medium">
        {{ page.pageName }}
      </p>
    </div>
  </div>
</template>