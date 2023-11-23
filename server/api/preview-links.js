const pageQuery = `
  query Page($pageId: ItemId) {
    page(filter: {id: {eq: $pageId}}) {
      slug
      parent {
        slug
        parent {
          slug
        }
      }
    }
  }
`

async function loadData(pageId) {
  const data = await $fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer 04311cbb1d838ee1c833a3d20cdeb8`,
    },
    body: {
      query: pageQuery,
      variables: {
        pageId,
      },
    },
  })
  return data || null
}

function generateUrl(item) {
  function buildSlug(obj) {
    if (!obj)
      return ''

    const { slug, parent } = obj
    const parentSlug = buildSlug(parent)

    if (parentSlug)
      return `${parentSlug}/${slug}`

    return slug
  }

  const slug = buildSlug(item.page)
  return `/${slug}`
}

async function generatePreviewUrl(body) {
  const { item } = body
  // const { item, itemType, locale } = body
  const data = await loadData(item.id) // 94688351 //94512920 //93760636
  const url = generateUrl(data.data)
  if (url)
    return url
  else
    return null

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