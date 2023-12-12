import process from 'node:process'

export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  runtimeConfig: {
    previewModeEncryptionSecret: process.env.NUXT_ENV_PREVIEW_MODE_ENCRYPTION_SECRET,
    previewModePassword: process.env.NUXT_ENV_PREVIEW_MODE_PASSWORD,
    datocmsPreviewHost: process.env.NUXT_ENV_DATOCMS_PREVIEW_HOST,
    public: {
      datocms: {
        bundleSafeToken: process.env.NUXT_ENV_DATOCMS_API_BUNDLE_SAFE_TOKEN,
        draftEnabledToken: process.env.NUXT_ENV_DATOCMS_API_DRAFT_ENABLED_TOKEN,
        environment: process.env.NUXT_ENV_DATOCMS_ENVIRONMENT,
        endpoint: 'https://graphql.datocms.com',
      },
    },
  },
  plugins: [
    '~/plugins/gsap',
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/html-validator',
    '@pinia/nuxt',
  ],
  nitro: {
    preset: 'netlify_edge',
  },
})
