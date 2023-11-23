function generatePreviewUrl({ item, itemType, locale }) {
  switch (itemType.attributes.api_key) {
    case 'page':
      return `page/${item.id}`
    case 'blog':
      return `blog/${item.id}`
    case 'team':
      return `team/${item.id}`
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

  const url = generatePreviewUrl(await readBody(event))

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
        url,
      },
    ],
  }
})
