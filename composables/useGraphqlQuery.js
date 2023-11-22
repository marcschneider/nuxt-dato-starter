export default (options) => {
  const { query, variables = {}, includeDrafts = false } = options
  const runtimeConfig = useRuntimeConfig()
  const key = JSON.stringify(options)
  return useFetch('https://graphql.datocms.com', {
    key,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${runtimeConfig.public.datoCmsToken}`,
      ...(includeDrafts && { 'X-Include-Drafts': 'true' }),
    },
    body: {
      query,
      variables,
    },
    transform: ({ data }) => {
      return data
    },
  })
}
