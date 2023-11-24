<script setup>
defineProps({
  sectionData: Object,
})
</script>

<template>
  <ModulesGrid class="mt-10">
    <div class="col-span-full text-sm tracking-wide font-mono">
      {{ sectionData }}
    </div>
  </ModulesGrid>
</template>
