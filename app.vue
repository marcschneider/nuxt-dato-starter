<script setup>
const { $ScrollSmoother: ScrollSmoother } = useNuxtApp()

const pageWrapper = ref()

onMounted(() => {
  ScrollSmoother.create({
    content: pageWrapper.value,
    smooth: 0.25,
    effects: true,
  })
})
</script>

<template>
  <div ref="pageWrapper">
    <NuxtLayout>
      <NuxtLoadingIndicator color="black" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
