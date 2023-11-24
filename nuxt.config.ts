import process from 'node:process'

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    previewModeEncryptionSecret: process.env.NUXT_ENV_PREVIEW_MODE_ENCRYPTION_SECRET,
    previewModePassword: process.env.NUXT_ENV_PREVIEW_MODE_PASSWORD,
    draftEnabledToken: process.env.NUXT_ENV_DATOCMS_API_DRAFT_ENABLED_TOKEN,
    public: {
      datocms: {
        bundleSafeToken: process.env.NUXT_ENV_DATOCMS_API_BUNDLE_SAFE_TOKEN,
        environment: process.env.NUXT_ENV_DATOCMS_ENVIRONMENT,
        endpoint: 'https://graphql.datocms.com',
      },
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/html-validator',
    '@nuxtjs/fontaine',
  ],
  nitro: {
    preset: 'netlify_edge',
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
})
