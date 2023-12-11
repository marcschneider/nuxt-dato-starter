import {
  PREVIEW_MODE_COOKIE_NAME,
  previewModeEncryptionSecretHash,
} from '~/utils/preview'

export default eventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const query = getQuery(event)

  const password = runtimeConfig.previewModePassword

  if (query.secret !== password) {
    sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Missing or invalid `secret` query string parameter!',
      }),
    )

    return
  }

  const hash = previewModeEncryptionSecretHash(
    runtimeConfig.previewModeEncryptionSecret,
  )

  setCookie(event, PREVIEW_MODE_COOKIE_NAME, hash, {
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
