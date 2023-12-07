import { PREVIEW_MODE_COOKIE_NAME } from '~/utils/preview'

export default eventHandler(async (event) => {
  const query = getQuery(event)

  deleteCookie(event, PREVIEW_MODE_COOKIE_NAME, {
    sameSite: 'none',
    secure: true,
  })

  const redirectUrl = Array.isArray(query.redirect)
    ? query.redirect[0]
    : typeof query.redirect === 'string'
      ? query.redirect
      : '/'

  sendRedirect(event, redirectUrl)

  event.node.res.end()
})
