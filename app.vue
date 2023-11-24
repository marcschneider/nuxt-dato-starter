<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html {
  @apply antialiased sc:text-[0.8333333333vw];
}

.page-enter-active,
.page-leave-active {
  @apply transition duration-500;
}
.page-enter-from,
.page-leave-to {
  @apply opacity-0 blur-[1rem];
}
</style>
