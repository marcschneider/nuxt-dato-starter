<script setup>
const pageData = ref()
const specialSlug = await isSpecialSlug()

if (specialSlug) {
  const specialPageData = await loadSpecialPage(specialSlug)
  pageData.value = specialPageData
}
else {
  const commonSlugId = await isCommonSlug()

  if (commonSlugId) {
    const foo = await loadCommonPage(commonSlugId)
    pageData.value = foo.value.page.pageName
  }
}
</script>

<template>
  <div class="cursor-pointer hover:bg-green-300 transition text-md px-4 py-1 bg-green-200 text-green-800 rounded-md font-medium w-fit">
    {{ pageData }}
  </div>
</template>
