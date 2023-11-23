function generatePreviewUrl({ item, itemType, locale }) {
  console.log(item || 'no item')
  console.log(itemType || 'no itemType')
  console.log(locale || 'no locale')

  return null
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
  const baseUrl = process.env.URL ? process.env.URL : 'http://localhost:3000'
  console.log('baseUrl', baseUrl)

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
    ],
  }
})
