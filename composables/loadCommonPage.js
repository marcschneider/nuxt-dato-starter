import { commonContentQuery } from '~/graphql/queries'

export default async function (pageId) {
  const { data } = await useGraphqlQuery({
    query: commonContentQuery,
    variables: {
      id: pageId,
    },
  })

  if (data) {
    return data
  }
  else {
    throw createError({
      statusCode: 404,
    })
  }
}
