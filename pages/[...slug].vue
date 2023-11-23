<script setup>
import { toHead } from 'vue-datocms'

let pageData = null
let slugType = null
const specialSlug = await isSpecialSlug()

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
  // if (!data.value)
  //   return {}
  return toHead(tags)
})
</script>

<template>
  <div>
    <TemplateTeam v-if="slugType === 'specialSlugTeam'" :page-data="pageData.team" />
    <TemplateBlog v-else-if="slugType === 'specialSlugBlog'" :page-data="pageData.blog" />
    <TemplateCommon v-else :page-data="pageData.page" />
  </div>
</template>
