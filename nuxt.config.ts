export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      datoCmsToken: process.env.DATO_CMS_TOKEN,
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/html-validator',
  ],
  nitro: {
    preset: 'netlify_edge',
  },
})