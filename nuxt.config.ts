export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      datoCmsToken: process.env.DATO_CMS_TOKEN,
    }
  },
  nitro: {
    preset: 'netlify_edge',
  },
})