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
      Authorization: `Bearer 5969fabbf7805613775c69ca15f1f7`,
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

// function generateUrl(item) {
//   function buildSlug(obj) {
//     if (!obj)
//       return ''

//     const { slug, parent } = obj
//     const parentSlug = buildSlug(parent)

//     if (parentSlug)
//       return `${parentSlug}/${slug}`

//     return slug
//   }

//   const slug = buildSlug(item.page)
//   return `/${slug}`
// }

async function generatePreviewUrl(body) {
  const { item } = body

  console.log(`body: ${body}`)
  console.log(`item: ${item}`)

  // const { item, itemType, locale } = body
  const data = await loadData(item.id) // 94688351 //94512920 //93760636

  console.log(`data: ${data}`)

  // const url = generateUrl(data.data)
  const url = generateCommonUrl(data.data.page)

  console.log(`url: ${url}`)

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
  const url2 = '/about'

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
        url: `https://develop--unknown-dato.netlify.app/api/disable-preview?redirect=${url2}`,
      },
    ],
  }
})
