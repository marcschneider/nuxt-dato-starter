import { matchingSlugsQuery } from '~/graphql/queries'

export default async function () {
  const route = useRoute()
  const routeParams = route.path.split('/').filter(Boolean)
  let lastRouteItem = routeParams[routeParams.length - 1]
  const isRootPage = routeParams.length === 0

  if (isRootPage)
    lastRouteItem = ''

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

  async function fetchMatchingSlugs() {
    const { data, error } = await useGraphqlQuery({
      query: matchingSlugsQuery,
      variables: {
        slug: lastRouteItem,
      },
    })

    return { data, error }
  }

  const { data } = await fetchMatchingSlugs()

  const bestMatchId = findMatch(data.value.allPages)

  return bestMatchId
}
