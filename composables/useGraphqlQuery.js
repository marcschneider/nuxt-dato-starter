import { useQuerySubscription } from 'vue-datocms'

export default async ({ query, variables = {} }) => {
  const runtimeConfig = useRuntimeConfig()

  const endpoint = runtimeConfig.public.datocms.endpoint
  const environment = runtimeConfig.public.datocms.environment
  // const { preview, token } = await previewAndToken(runtimeConfig)
  const preview = false
  const token = '5969fabbf7805613775c69ca15f1f7'

  if (!token)
    return { data: ref(null) }

  const initialData = await fetchPublished({
    endpoint,
    token,
    preview,
    query,
    variables,
    environment,
  })

  if (isClient && preview) {
    return useQuerySubscription({
      query,
      variables,
      token,
      initialData,
      includeDrafts: true,
      environment,
    })
  }

  return { data: initialData }
}

async function fetchPublished({ endpoint, token, preview, query, variables, environment }) {
  const normalizedData = ref(null)

  const { data } = await useFetch(endpoint, {
    key: JSON.stringify({ query, variables }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'X-Environment': environment,
      ...(preview && { 'X-Include-Drafts': 'true' }),
    },
    body: {
      query,
      variables,
    },
  })

  normalizedData.value = data.value.data

  return normalizedData
}

async function previewAndToken(runtimeConfig) {
  const preview = isPreviewEnabled(runtimeConfig)
  const token = await (preview
    ? draftEnabledToken(runtimeConfig)
    : bundleSafeToken(runtimeConfig))

  return {
    preview,
    token,
  }
}

function isPreviewEnabled() {
  const cookie = useCookie(PREVIEW_MODE_COOKIE_NAME)

  if (cookie.value)
    return true

  return false
}

async function draftEnabledToken(runtimeConfig) {
  if (isServer)
    return runtimeConfig.draftEnabledToken

  if (isClient) {
    const preview = await $fetch('/api/preview')

    if (isEnabledPreview(preview))
      return preview.token
  }

  return undefined
}

async function bundleSafeToken(runtimeConfig) {
  return runtimeConfig.public.datocms.bundleSafeToken
}
