const query = `
  query {
    setting {
      specialSlugBlog
      specialSlugTeam
    }
  }
`

export default async function () {
  const { data } = await useGraphqlQuery({
    query,
  })

  if (data)
    return data

  else
    return null
}
