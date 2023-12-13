<script setup>
defineProps(['member'])
</script>

<template>
  <article>
    <NuxtLink
      class="block p-6 border-b rounded typography-base hover:bg-gray-50"
      :to="generateSpecialUrl(member.slug)"
    >
      {{ member.name }}
    </NuxtLink>
  </article>
</template>
