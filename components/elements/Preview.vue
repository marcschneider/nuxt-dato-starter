<script setup>
function disablePreview() {
  window.location.href = '/api/disable-preview'
}
</script>

<template>
  <div class="fixed w-2/12 p-5 font-mono text-sm text-white bg-green-800 rounded-md bottom-5 right-5">
    This is page is showing draft content.
    <a class="underline" @click="disablePreview">Click here</a>
    to exit preview mode.
  </div>
</template>
