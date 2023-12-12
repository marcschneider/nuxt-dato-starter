import { previewLinkPageQuery } from '~/graphql/queries'

const runtimeConfig = useRuntimeConfig()
const endpoint = runtimeConfig.public.datocms.endpoint
const environment = runtimeConfig.public.datocms.environment
const token = runtimeConfig.public.datocms.draftEnabledToken

async function loadData(pageId) {
  const { data } = await $fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'X-Environment': environment,
    },
    body: {
      query: previewLinkPageQuery,
      variables: {
        pageId,
      },
    },
  })
  return data || null
}

async function generatePreviewUrl(body) {
  const { item } = body

  // const { item, itemType, locale } = body
  const data = await loadData(item.id) // 94688351 //94512920 //93760636

  // const url = generateCommonUrl(data.data.page)

  return JSON.stringify(data)

  // if (url)
  //   return url
  // else
  //   return null

  // switch (itemType.attributes.api_key) {
  //   case 'page':
  //     url = generateUrl()
  //     return `page/${item.id}/${url}`
  //   case 'blog':
  //     return `blog/${item.id}`
  //   case 'team':
  //     return `team/${item.id}`
  //   default:
  //     return null
  // }
}

export default eventHandler(async (event) => {
  setResponseHeaders(event, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  })

  if (event.node.req.method === 'OPTIONS')
    return send(event, 'ok')

  const url = await generatePreviewUrl(await readBody(event))

  return {
    previewLinks: [
      {
        label: 'Vorschau',
        url: 'https://develop--unknown-dato.netlify.app/api/enable-preview?secret=42&redirect=/blog/marc',
      },
      {
        label: 'Live',
        url: 'https://develop--unknown-dato.netlify.app/api/disable-preview?redirect=/blog/marc',
      },
      {
        label: 'Data',
        url: `https://develop--unknown-dato.netlify.app/api/disable-preview?redirect=${url}`,
      },
    ],
  }
})
