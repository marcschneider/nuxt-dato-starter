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
  <TemplateTeam v-if="slugType === 'specialSlugTeam'" :content="pageData.value.team" />
  <TemplateBlog v-else-if="slugType === 'specialSlugBlog'" :content="pageData.value.blog" />
  <TemplateCommon v-else :content="pageData.value.page" />
</template>
