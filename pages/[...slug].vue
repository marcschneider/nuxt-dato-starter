<script setup>
const route = useRoute()
const routeParams = route.path.split('/').filter(Boolean)
let lastRouteItem = routeParams[routeParams.length - 1]
const isRootPage = routeParams.length === 0

if (isRootPage)
  lastRouteItem = ''

///////////

async function loadSpecialSlugs() {
  const specialSlugsQuery = `
    query {
      setting {
        specialSlugBlog
        specialSlugTeam
      }
    }
  `

  const { data, error } = await useGraphqlQuery({
    query: specialSlugsQuery,
  })

  return { data, error }
}

// function checkSpecialSlugs(slugs) {
//   slugs.forEach((slug) => {
//     console.log(slug)
//   })
// }

const { data: specialSlugsData } = await loadSpecialSlugs()
console.log(await specialSlugsData.value.setting)

///////////

async function fetchMatchingSlugs() {
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

  const { data, error } = await useGraphqlQuery({
    query: matchingSlugsQuery,
    variables: {
      slug: lastRouteItem,
    },
  })

  return { data, error }
}

async function fetchContent(matchId) {
  const contentQuery = `
    query ($id: ItemId = "") {
      page(filter: {id: {eq: $id}}) {
        pageName
        id
      }
    }
  `

  const { data, error } = await useGraphqlQuery({
    query: contentQuery,
    variables: {
      id: matchId,
    },
  })

  return { data, error }
}

function checkParentHierarchy(page) {
  let currentPage = page

  for (let index = routeParams.length - 2; index >= 0; index--) {
    if (!currentPage.parent || currentPage.parent.slug !== routeParams[index])
      return false

    currentPage = currentPage.parent
  }

  return true
}

function findMatch(pages) {
  let bestMatchId = null

  for (const page of pages) {
    const isMatch = checkParentHierarchy(page)

    if (isMatch && (!bestMatchId || page.parent === null))
      bestMatchId = page.id
  }

  return bestMatchId
}

const { data: matchingSlugsData, error: matchingSlugsDataError } = await fetchMatchingSlugs()
const bestMatchId = findMatch(matchingSlugsData.value.allPages)
const { data: contentData, error: contentError } = await fetchContent(bestMatchId)
</script>

<template>
  <div v-if="matchingSlugsDataError || contentError" class="text-red-800">
    Something bad happened!
  </div>
  <div v-else class="m-2 flex flex-row gap-2">
    <div class="cursor-pointer hover:bg-green-300 transition text-md px-4 py-1 bg-green-200 text-green-800 rounded-md font-medium">
      {{ contentData.page.pageName }} – {{ contentData.page.id }}
    </div>
  </div>
</template>
