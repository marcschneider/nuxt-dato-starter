// Put this code in the /server/api directory of your Nuxt website (`/server/api/preview-links.ts` will work):
// this function knows how to convert a DatoCMS record into a canonical URL within the website.
// this function knows how to convert a DatoCMS record
// into a canonical URL within the website
function generatePreviewUrl({ item, itemType, locale }) {
  switch (itemType.attributes.api_key) {
    case 'landing_page':
      return `/landing-pages/${item.attributes.slug}`
    case 'blog_post':
      // blog posts are localized:
      const localePrefix = locale === 'en' ? '' : `/${locale}`
      return `${localePrefix}/blog/${item.attributes.slug[locale]}`
    default:
      return null
  }
}
export default eventHandler(async (event) => {
  // In this method, we'll make good use of the utility methods that
  // H3 make available: they all take the `event` as first parameter.
  // For more info, see: https://github.com/unjs/h3#utilities
  // Setup content-type and CORS permissions.
  setResponseHeaders(event, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization', // add any other headers you need
  })
  // This will allow OPTIONS request
  if (event.req.method === 'OPTIONS')
    return send(event, 'ok')

  // Actually generate the URL using the info that DatoCMS is sending.
  const url = generatePreviewUrl(await readBody(event))
  // No URL? No problem: let's send back no link.
  if (!url)
    return { previewLinks: [] }

  // Let's guess the base URL using environment variables:
  // if you're not working with Vercel or Netlify,
  // ask for instructions to the provider you're deploying to.
  const baseUrl = process.env.VERCEL_URL
    ? // Vercel auto-populates this environment variable
      `https://${process.env.VERCEL_URL}`
    : // Netlify auto-populates this environment variable
    process.env.URL
  // Here is the list of links we're returnig to DatoCMS and that
  // will be made available in the sidebar of the record editing page.
  const previewLinks = [
    // Public URL:
    {
      label: 'Published version',
      url: `${baseUrl}${url}`,
    },
  ]
  return { previewLinks }
})
