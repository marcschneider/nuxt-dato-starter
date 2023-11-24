<template>
  <div class="flex flex-col min-h-screen">
    <SectionsHeader />
    <div class="flex-grow">
      <slot />
    </div>
    <SectionsFooter />
  </div>
</template>
