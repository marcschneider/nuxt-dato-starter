<script setup>
const pageData = ref()
const slugType = ref()
const specialSlug = await isSpecialSlug()

if (specialSlug) {
  const specialPageData = await loadSpecialPage(specialSlug)
  pageData.value = specialPageData
  slugType.value = specialSlug.type
}
else {
  const commonSlugId = await isCommonSlug()

  if (commonSlugId) {
    const commonPageData = await loadCommonPage(commonSlugId)
    pageData.value = commonPageData
  }
}
</script>

<template>
  {{ pageData }}
  <!-- <TemplateTeam v-if="slugType === 'specialSlugTeam'" :page-data="pageData.value.team" />
  <TemplateBlog v-else-if="slugType === 'specialSlugBlog'" :page-data="pageData.value.blog" />
  <TemplateCommon v-else :page-data="pageData.value.page" /> -->
</template>
