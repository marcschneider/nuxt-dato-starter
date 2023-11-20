import { matchingSlugsQuery } from '~/graphql/queries'

export default async function () {
  const route = useRoute()
  const routeParams = route.path.split('/').filter(Boolean)
  let lastRouteItem = routeParams[routeParams.length - 1]
  const isRootPage = routeParams.length === 0

  if (isRootPage)
    lastRouteItem = ''

  function checkParentHierarchy(page) {
    return routeParams.slice(0, -1).every((param, index) => {
      return page.parent && page.parent.slug === routeParams[index]
    })
  }

  function findMatchId(pages) {
    return pages.find(page => checkParentHierarchy(page) && page.parent === null)?.id
  }

  const { data } = await useGraphqlQuery({
    query: matchingSlugsQuery,
    variables: {
      slug: lastRouteItem,
    },
  })

  return findMatchId(data.value.allPages)
}
