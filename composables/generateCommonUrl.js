export default function (item) {
  function buildSlug(obj) {
    if (!obj)
      return ''

    const { slug, parent } = obj
    const parentSlug = buildSlug(parent)

    if (parentSlug)
      return `${parentSlug}/${slug}`

    return slug
  }

  const slug = buildSlug(item)
  return `/${slug}`
}
