<script setup>
defineProps({
  sectionData: Object,
})
</script>

<template>
  <ModulesGrid class="mt-10">
    <div class="font-mono text-sm tracking-wide col-span-full">
      {{ sectionData }}
    </div>
  </ModulesGrid>
</template>
