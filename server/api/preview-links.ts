export default eventHandler(async (event) => {
  setResponseHeaders(event, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  })
  if (event.req.method === 'OPTIONS')
    return send(event, 'ok')

  return {
    previewLinks: [
      {
        label: 'Published (en)',
        url: 'https://closetoknown.digital',
      },
      {
        label: 'Draft (en)',
        url: 'https://closetoknown.digital',
      },
    ],
  }
})
