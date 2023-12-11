import { defineStore } from 'pinia'
import { specialSlugsQuery } from '~/graphql/queries'

export const usePageStore = defineStore('page', {
  state: () => ({
    specialSlugs: [],
  }),
  getters: {
    getSpecialSlugs: state => state.specialSlugs,
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
  },
})
