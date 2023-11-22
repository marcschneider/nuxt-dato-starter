<script setup>
const pageData = ref(null)
const slugType = ref(null)
const specialSlug = await isSpecialSlug()

if (specialSlug) {
  const specialPageData = await loadSpecialPage(specialSlug)
  pageData.value = specialPageData
  slugType.value = specialSlug.type
}
else {
  const commonSlugId = await isCommonSlug()
  const commonPageData = await loadCommonPage(commonSlugId)
  pageData.value = commonPageData
}
</script>

<template>
  <TemplateTeam v-if="slugType === 'specialSlugTeam'" :page-data="pageData.value.team" />
  <TemplateBlog v-else-if="slugType === 'specialSlugBlog'" :page-data="pageData.value.blog" />
  <TemplateCommon v-else :page-data="pageData.value.page" />
</template>
