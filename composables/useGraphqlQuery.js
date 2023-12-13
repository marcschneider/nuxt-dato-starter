import { useQuerySubscription } from 'vue-datocms'

export default async ({ query, variables = {}, options }) => {
  const runtimeConfig = useRuntimeConfig()

  const endpoint = runtimeConfig.public.datocms.endpoint
  const environment = runtimeConfig.public.datocms.environment
  const { preview, token } = previewAndToken(runtimeConfig)

  if (!token)
    return { data: ref(null) }

  const initialData = await fetchPublished({
    endpoint,
    token,
    preview,
    query,
    variables,
    environment,
    options,
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

async function fetchPublished({ endpoint, token, preview, query, variables, environment, options }) {
  const { data, error } = await useFetch(endpoint, {
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
    ...options,
  })

  // Network error
  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode,
    })
  }

  // Data error
  if (data.value.errors || !data.value.data) {
    throw createError({
      statusCode: 404,
    })
  }

  const normalizedData = computed(() => {
    return data.value.data
  })

  return normalizedData
}

function previewAndToken(runtimeConfig) {
  const preview = isPreviewEnabled(runtimeConfig)
  const token = (preview
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

function draftEnabledToken(runtimeConfig) {
  return runtimeConfig.public.datocms.draftEnabledToken
}

function bundleSafeToken(runtimeConfig) {
  return runtimeConfig.public.datocms.bundleSafeToken
}
