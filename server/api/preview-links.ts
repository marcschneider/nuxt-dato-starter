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
        url: 'https://develop--unknown-dato.netlify.app/blog/marc',
      },
      {
        label: 'Draft (en)',
        url: 'https://develop--unknown-dato.netlify.app/api/enable-preview?secret=42&redirect=/blog/marc',
      },
    ],
  }
})
