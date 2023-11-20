import { contentQuery } from '~/graphql/queries'

export default async function (pageId) {
  const { data } = await useGraphqlQuery({
    query: contentQuery,
    variables: {
      id: pageId,
    },
  })

  return data
}
