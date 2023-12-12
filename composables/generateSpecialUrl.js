export default function (slug) {
  const pageStore = usePageStore()
  const specialSlugs = pageStore.specialSlugs
  const teamSlug = specialSlugs.specialSlugTeam.replace(/^\/|\/$/g, '')
  return `/${teamSlug}/${slug}`
}
