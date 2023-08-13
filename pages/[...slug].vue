<script setup>
const QUERY = `
  query MyQuery {
    test {
      id
    }
  }
`;
const { data, error } = await useGraphqlQuery({ query: QUERY });
</script>

<template>
  <p v-if="error">Something bad happened!</p>
  <p v-else>Data: <code>{{ data }}</code></p>
</template>