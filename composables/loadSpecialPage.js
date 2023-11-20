import { blogContentQuery, teamContentQuery } from '~/graphql/queries'

const queryMap = {
  specialSlugTeam: teamContentQuery,
  specialSlugBlog: blogContentQuery,
}

export default async function (slug) {
  const query = queryMap[slug.type]
  if (!query)
    return null

  const { data } = await useGraphqlQuery({
    query,
    variables: { slug: slug.value },
  })

  return data
}
