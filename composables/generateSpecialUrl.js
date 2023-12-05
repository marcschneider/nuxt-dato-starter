export default async function () {
  const store = usePageStore()
  const specialSlugs = ref([])

  // Load earlier?
  await store.loadSpecialSlugs()

  // this can be used without async/await
  specialSlugs.value = store.getSpecialSlugs

  return specialSlugs.value.data.setting.specialSlugTeam
}
