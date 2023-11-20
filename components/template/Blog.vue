<script setup>
defineProps({
  pageData: Object,
})
</script>

<template>
  <h1>{{ pageData.title }}</h1>
  <div v-for="(section, index) in pageData.content" :key="index">
    {{ section }}
  </div>
</template>
