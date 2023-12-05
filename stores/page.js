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
      this.specialSlugs = await useGraphqlQuery({
        query: specialSlugsQuery,
      })
    },
  },
})
