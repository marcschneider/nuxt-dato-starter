<script setup>
import { toHead } from 'vue-datocms'

let pageData = null
let slugType = null
const specialSlug = isSpecialSlug()

if (specialSlug) {
  const specialPageData = await loadSpecialPage(specialSlug)
  pageData = specialPageData
  slugType = specialSlug.type
}
else {
  const commonSlugId = await isCommonSlug()
  const commonPageData = await loadCommonPage(commonSlugId)
  pageData = commonPageData
}

const [prop] = Object.keys(pageData.value)
const tags = pageData.value[prop]._seoMetaTags

useHead(() => {
  return toHead(tags)
})
</script>

<template>
  <div>
    <TemplatesTeam v-if="slugType === 'specialSlugTeam'" :page-data="pageData.team" />
    <TemplatesBlog v-else-if="slugType === 'specialSlugBlog'" :page-data="pageData.blog" />
    <TemplatesCommon v-else :page-data="pageData.page" />
  </div>
</template>
