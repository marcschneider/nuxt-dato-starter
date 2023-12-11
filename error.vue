<script setup lang="ts">
const error = useError()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="p-20">
    <h2 class="mt-5 font-mono">
      {{ error?.statusCode }}
    </h2>
    <p class="mt-5 font-mono">
      {{ error?.statusMessage }}
    </p>
    <p class="mt-5 font-mono">
      {{ error?.message }}
    </p>
    <div class="mt-5 font-mono" v-html="error?.stack" />
    <button type="button" class="mt-5 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" @click="handleError">
      Clear errors
    </button>
  </div>
</template>
