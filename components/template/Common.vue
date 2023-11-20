<script setup>
defineProps({
  pageData: Object,
})
</script>

<template>
  <h1>{{ pageData.title }}</h1>
  <div>
    {{ pageData.content }}
  </div>
</template>
