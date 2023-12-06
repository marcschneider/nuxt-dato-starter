import { useQuerySubscription } from 'vue-datocms'
import { PREVIEW_MODE_COOKIE_NAME } from '~/utils/preview'

export const isClient = typeof window !== 'undefined'
export const isServer = typeof window === 'undefined'

export default async function useGraphqlQuery({ query, variables = {} }) {
  const runtimeConfig = useRuntimeConfig()

  const endpoint = runtimeConfig.public.datocms.endpoint
  const environment = runtimeConfig.public.datocms.environment
  const { preview, token } = await previewAndToken(runtimeConfig)

  if (!token)
    return { data: ref(null) }

  const { data: initialData } = await fetchPublished({
    endpoint,
    token,
    preview,
    query,
    variables,
    environment,
  })

  if (isClient && preview) {
    return subscribeToDrafts({
      query,
      variables,
      initialData: initialData.value,
      token,
      environment,
    })
  }

  return { data: initialData }
}

async function fetchPublished({ endpoint, token, preview, query, variables, environment }) {
  const data = ref(null)

  let fullEndpoint = endpoint

  if (environment)
    fullEndpoint = `${fullEndpoint}/environments/${environment}`

  if (preview)
    fullEndpoint = `${fullEndpoint}/preview`

  const fetchedData = await $fetch(fullEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  if ('errors' in fetchedData)
    throw JSON.stringify(fetchedData.errors)

  if ('data' in fetchedData)
    data.value = fetchedData.data

  return { data }
}

async function subscribeToDrafts({ query, variables = {}, token, initialData, environment }) {
  return useQuerySubscription({
    query,
    variables,
    token,
    initialData,
    includeDrafts: true,
    environment,
  })
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
