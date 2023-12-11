export default eventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  const cookie = getCookie(event, PREVIEW_MODE_COOKIE_NAME)

  if (!cookie)
    return { enabled: false }

  const hash = previewModeEncryptionSecretHash(runtimeConfig.previewModeEncryptionSecret)

  if (cookie === hash) {
    return {
      enabled: true,
      token: runtimeConfig.public.datocms.draftEnabledToken,
    }
  }

  return { enabled: false }
})
