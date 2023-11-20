<script setup>
defineProps({
  content: Object,
})
</script>

<template>
  <h1>Blog</h1>
  <div>
    {{ content }}
  </div>
</template>
