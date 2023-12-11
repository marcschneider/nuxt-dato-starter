<script setup>
definePageMeta({
  layout: false,
})

const cookie = useCookie(PREVIEW_MODE_COOKIE_NAME)
const isPreview = computed(() => !!cookie.value)
const password = ref('')
const errorMessage = ref('')

async function enablePreview() {
  const response = await fetch(`/api/enable-preview?secret=${password.value}`)

  if (response.status === 401)
    errorMessage.value = 'Invalid password'
  else
    window.location.href = response.url
}

function disablePreview() {
  window.location.href = '/api/disable-preview'
}
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div v-if="!isPreview" class="p-6 bg-white rounded shadow-md w-72">
      <p class="mb-4 text-lg font-bold">
        Enable preview mode
      </p>
      <form @submit.prevent="enablePreview">
        <div class="mb-4">
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full px-3 py-2 mb-2 text-black placeholder-gray-500 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
          <p v-if="errorMessage" class="text-sm text-red-500">
            {{ errorMessage }}
          </p>
        </div>
        <button type="submit" class="w-full px-3 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none">
          Enable
        </button>
      </form>
    </div>
    <div v-else class="p-6 bg-white rounded shadow-md w-72">
      <p class="mb-4 text-lg font-bold">
        Preview is enabled
      </p>
      <button
        class="w-full px-3 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
        @click="disablePreview"
      >
        Disable
      </button>
    </div>
  </div>
</template>
