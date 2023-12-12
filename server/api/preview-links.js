import {
  previewLinkBlogQuery,
  previewLinkPageQuery,
  previewLinkTeamQuery,
} from '~/graphql/queries'
import generateCommonUrl from '~/composables/generateCommonUrl'

const runtimeConfig = useRuntimeConfig()
const endpoint = runtimeConfig.public.datocms.endpoint
const environment = runtimeConfig.public.datocms.environment
const token = runtimeConfig.public.datocms.draftEnabledToken

async function loadData(query, pageId) {
  const { data } = await $fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'X-Environment': environment,
    },
    body: {
      query,
      variables: {
        pageId,
      },
    },
  })
  return data || null
}

async function generatePreviewUrl({ item, itemType }) {
  const itemId = item.id
  const type = itemType.attributes.api_key

  let data = null
  let url

  switch (type) {
    case 'page':
      data = await loadData(previewLinkPageQuery, itemId)
      url = generateCommonUrl(data.page)
      return `${url}`
    case 'blog':
      data = await loadData(previewLinkBlogQuery, itemId)
      url = `/${data.setting.specialSlugBlog}/${data.blog.slug}`
      return `${url}`
    case 'team':
      data = await loadData(previewLinkTeamQuery, itemId)
      url = `/${data.setting.specialSlugTeam}/${data.team.slug}`
      return `${url}`
    default:
      return null
  }
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
