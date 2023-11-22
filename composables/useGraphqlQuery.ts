// import { useQuerySubscription } from 'vue-datocms'

import type { Preview } from '~/utils/preview'
import { PREVIEW_MODE_COOKIE_NAME } from '~/utils/preview'

export const isClient = typeof window !== 'undefined'
export const isServer = typeof window === 'undefined'

export default async function useGraphqlQuery({
  query,
  variables = {},
}: {
  query: any
  variables?: Record<string, any>
}) {
  const runtimeConfig = useRuntimeConfig()

  const endpoint = runtimeConfig.public.datocms.endpoint
  const environment = runtimeConfig.public.datocms.environment
  const { preview, token } = await previewAndToken(runtimeConfig)

  if (!token)
    return { data: ref<any>(null) }

  const { data: initialData } = await fetchPublished({
    endpoint,
    token,
    preview,
    query,
    variables,
    environment,
  })

  // if (isClient && preview) {
  //   return subscribeToDrafts({
  //     query,
  //     variables,
  //     initialData: initialData.value,
  //     token,
  //     environment,
  //   })
  // }

  return { data: initialData }
}

async function fetchPublished({
  endpoint,
  token,
  preview,
  query,
  variables,
  environment,
}: {
  endpoint: string
  token: string
  preview: boolean
  query: any
  variables: Record<string, any>
  environment?: string
}) {
  const data = ref<any>(null)

  let fullEndpoint = endpoint

  if (environment)
    fullEndpoint = `${fullEndpoint}/environments/${environment}`

  if (preview)
    fullEndpoint = `${fullEndpoint}/preview`

  const fetchedData = await fetch(
    fullEndpoint,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    },
  ).then(response => response.json())

  if ('errors' in fetchedData)
    throw JSON.stringify(fetchedData.errors)

  if ('data' in fetchedData)
    data.value = fetchedData.data

  return { data }
}

// async function subscribeToDrafts({
//   query,
//   variables = {},
//   token,
//   initialData,
//   environment,
// }: {
//   query: any
//   variables?: Record<string, any>
//   token: string
//   initialData: any
//   environment?: string
// }) {
//   return useQuerySubscription({
//     query,
//     variables,
//     token,
//     initialData,
//     includeDrafts: true,
//     environment,
//   })
// }

async function previewAndToken(
  runtimeConfig: ReturnType<typeof useRuntimeConfig>,
) {
  const preview = isPreviewEnabled(runtimeConfig)
  const token = await (preview
    ? draftEnabledToken(runtimeConfig)
    : bundleSafeToken(runtimeConfig))

  return {
    preview,
    token,
  }
}

function isPreviewEnabled(
  runtimeConfig: ReturnType<typeof useRuntimeConfig>,
): boolean {
  const cookie = useCookie(PREVIEW_MODE_COOKIE_NAME)

  if (cookie.value)
    return true

  return false
}

async function draftEnabledToken(
  runtimeConfig: ReturnType<typeof useRuntimeConfig>,
) {
  if (isServer)
    return runtimeConfig.draftEnabledToken

  if (isClient) {
    const preview = await $fetch<Preview>('/api/preview')

    if (isEnabledPreview(preview))
      return preview.token
  }

  return undefined
}

async function bundleSafeToken(
  runtimeConfig: ReturnType<typeof useRuntimeConfig>,
) {
  return runtimeConfig.public.datocms.bundleSafeToken
}
