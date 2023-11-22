import { specialSlugsQuery } from '~/graphql/queries'

export default async function () {
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

  const { data } = await useGraphqlQuery({
    query: specialSlugsQuery,
  })

  if (!data?.value?.setting) {
    throw createError({
      statusCode: 404,
    })
  }

  const slugType = checkSpecialSlugs(data.value.setting)

  if (slugType) {
    return {
      type: slugType,
      value: lastRouteItem,
    }
  }
  else { return null }
}
