import { specialSlugsQuery } from '~/graphql/queries'

export default async function () {
  const route = useRoute()
  const routeParams = route.path.split('/').filter(Boolean)
  const lastRouteItemChache = routeParams.pop()
  const routeString = routeParams.join('/')

  function checkSpecialSlugs(slugs) {
    for (const slug in slugs) {
      const specialSlug = slugs[slug].replace(/^\/|\/$/g, '')
      if (routeString === specialSlug)
        return [slug, lastRouteItemChache]
    }
  }

  const { data } = await useGraphqlQuery({
    query: specialSlugsQuery,
  })

  const special = checkSpecialSlugs(data.value.setting)

  if (special)
    return 'special'

  else
    return false
}
