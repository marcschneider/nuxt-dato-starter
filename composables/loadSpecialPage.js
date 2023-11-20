import { blogContentQuery, teamContentQuery } from '~/graphql/queries'

export default async function (slug) {
  let typeQuery

  if (slug.type === 'specialSlugTeam')
    typeQuery = teamContentQuery

  else if (slug.type === 'specialSlugBlog')
    typeQuery = blogContentQuery

  const { data } = await useGraphqlQuery({
    query: typeQuery,
    variables: {
      slug: slug.value,
    },
  })

  return data
}
