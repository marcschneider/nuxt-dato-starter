import { specialSlugsQuery } from '~/graphql/queries'

export default async function () {
  const route = useRoute()
  const routeParams = route.path.split('/').filter(Boolean)
  const lastRouteItemChache = routeParams.pop()
  const routeString = routeParams.join('/')

  async function loadSpecialSlugs() {
    const { data, error } = await useGraphqlQuery({
      query: specialSlugsQuery,
    })

    return { data, error }
  }

  function checkSpecialSlugs(slugs) {
    for (const slug in slugs) {
      const specialSlug = slugs[slug].replace(/^\/|\/$/g, '')
      if (routeString === specialSlug)
        return [slug, lastRouteItemChache]
    }
  }

  const { data: specialSlugsData } = await loadSpecialSlugs()

  const special = checkSpecialSlugs(specialSlugsData.value.setting)

  if (special)
    return 'special'

  else
    return false
}
