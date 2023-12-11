export default function () {
  const route = useRoute()
  const routeParams = route.path.split('/').filter(Boolean)
  const lastRouteItem = routeParams.pop()
  const routeString = routeParams.join('/')

  function checkSpecialSlugs(slugs) {
    for (const slugType in slugs) {
      const specialSlug = slugs[slugType].replace(/^\/|\/$/g, '')
      if (routeString === specialSlug)
        return slugType
    }
  }

  const pageStore = usePageStore()
  const slugType = checkSpecialSlugs(pageStore.specialSlugs)

  if (slugType) {
    return {
      type: slugType,
      value: lastRouteItem,
    }
  }
  else { return null }
}
