<script setup>
const cookie = useCookie(PREVIEW_MODE_COOKIE_NAME)
const isPreview = computed(() => !!cookie.value)
</script>

<template>
  <ElementsPreview v-if="isPreview" />
  <div class="flex flex-col min-h-screen">
    <SectionsHeader />
    <div class="flex-grow">
      <slot />
    </div>
    <SectionsFooter />
  </div>
</template>
