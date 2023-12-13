import { defineStore } from 'pinia'
import {
  fixedTextsQuery,
  specialSlugsQuery,
} from '~/graphql/queries'

export const usePageStore = defineStore('page', {
  state: () => ({
    specialSlugs: [],
    fixedTexts: null,
  }),
  getters: {
    getSpecialSlugs: state => state.specialSlugs,
    getFixedTexts: state => state.fixedTexts,
  },
  actions: {
    async loadSpecialSlugs() {
      const { data } = await useGraphqlQuery({
        query: specialSlugsQuery,
      })

      if (data?.value?.setting) {
        this.specialSlugs = data.value.setting
      }
      else {
        throw createError({
          statusCode: 404,
        })
      }
    },
    async loadFixedTexts() {
      const { data } = await useGraphqlQuery({
        query: fixedTextsQuery,
      })

      if (data?.value?.layout) {
        this.fixedTexts = data.value.layout
      }
      else {
        throw createError({
          statusCode: 404,
        })
      }
    },
  },
})
