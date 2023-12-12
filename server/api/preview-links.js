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
const secret = runtimeConfig.previewModePassword
const baseUrl = 'https://develop--unknown-dato.netlify.app'

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

const typeMapping = {
  page: {
    query: previewLinkPageQuery,
    url: data => generateCommonUrl(data.page),
  },
  blog: {
    query: previewLinkBlogQuery,
    url: data => `/${data.setting.specialSlugBlog}/${data.blog.slug}`,
  },
  team: {
    query: previewLinkTeamQuery,
    url: data => `/${data.setting.specialSlugTeam}/${data.team.slug}`,
  },
}

async function generateRedirectUrl({ item, itemType }) {
  const itemId = item.id
  const type = itemType.attributes.api_key

  if (!typeMapping[type])
    return null

  const data = await loadData(typeMapping[type].query, itemId)
  const url = typeMapping[type].url(data)

  return url
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

  const redirect = await generateRedirectUrl(await readBody(event))

  return {
    previewLinks: [
      {
        label: '🔍 Vorschau',
        url: `${baseUrl}/api/enable-preview?secret=${secret}&redirect==${redirect}`,
      },
      {
        label: '⚡ Live',
        url: `${baseUrl}/api/disable-preview?redirect==${redirect}`,
      },
    ],
  }
})
