<script setup>
definePageMeta({
  layout: false,
})

const cookie = useCookie(PREVIEW_MODE_COOKIE_NAME)
const isPreview = computed(() => !!cookie.value)
const password = ref('')

function enablePreview() {
  window.location.href = `/api/enable-preview?secret=${password.value}`
}

function disablePreview() {
  window.location.href = '/api/disable-preview'
}
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div v-if="!isPreview" class="w-64 p-6 bg-white rounded shadow-md">
      <form @submit.prevent="enablePreview">
        <label for="password" class="sr-only">Password</label>
        <input id="password" v-model="password" type="password" placeholder="Password" class="w-full px-3 py-2 mb-4 text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300">
        <button type="submit" class="w-full px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none">
          Submit
        </button>
      </form>
    </div>
    <div v-else class="w-64 p-6 text-center bg-white rounded shadow-md">
      <p>You are already logged in.</p>
      <a class="underline" @click="disablePreview">Logout</a>
    </div>
  </div>
</template>
