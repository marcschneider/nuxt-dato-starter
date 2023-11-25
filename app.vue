<script setup>
const { $ScrollSmoother: ScrollSmoother } = useNuxtApp()
onMounted(() => {
  ScrollSmoother.create({
    smooth: 0.5,
    effects: true,
  })
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="black" />
    <NuxtPage />
  </NuxtLayout>
</template>
