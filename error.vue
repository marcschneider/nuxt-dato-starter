<script setup lang="ts">
const error = useError()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div>
    <h2>{{ error.statusCode }}</h2>
    <p>{{ error.message }}</p>
    <button @click="handleError">
      Clear errors
    </button>
  </div>
</template>
