<script setup lang="ts">
import { PREVIEW_MODE_COOKIE_NAME } from '~/utils/preview'

const cookie = useCookie(PREVIEW_MODE_COOKIE_NAME)

const isPreview = computed(() => !!cookie.value)

function enablePreview() {
  const password = prompt('Enter the password to enable preview mode, please:', 'Only for the purpose of the demo, password is "42"')

  if (password !== null)
    window.location.href = `/api/enable-preview?secret=${password}`
}

function disablePreview() {
  window.location.href = '/api/disable-preview'
}
</script>

<template>
  <div
    class="bg-slate-800 w-2/12 p-5 rounded-md font-mono text-sm text-white fixed bottom-5 right-5"
    :class="{ '!bg-green-800': isPreview }"
  >
    <div v-if="isPreview">
      This is page is showing draft content.
      <a class="underline" @click="disablePreview">Click here</a>
      to exit preview mode.
    </div>
    <div v-else>
      This is page is showing published content.
      <a class="underline" @click="enablePreview">Click here</a>
      to enter preview mode!
    </div>
  </div>
</template>
