<script setup>
const route = useRoute()
function disablePreview() {
  window.location.href = `/api/disable-preview?redirect=${route.fullPath}`
}
</script>

<template>
  <div class="fixed w-56 p-5 text-green-800 bg-green-200 rounded-md bottom-5 right-5">
    <p class="mb-3 text-sm font-bold">
      Draft mode is enabled
    </p>
    <button
      class="w-full px-3 py-2 text-sm font-bold text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
      @click="disablePreview"
    >
      Disable
    </button>
  </div>
</template>
