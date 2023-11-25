<script setup>
const { $gsap: gsap } = useNuxtApp()

onMounted(() => {
  const sections = gsap.utils.toArray('.panel')

  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: '.outer',
      pin: true,
      scrub: 0,
      // snap: 1 / (sections.length - 1),
      end: '+=3500',
    },
  })
})
</script>

<template>
  <div class="outer">
    <section class="bg-red-500 panel">
      ONE
    </section>
    <section class="bg-orange-500 panel">
      TWO
    </section>
    <section class="bg-purple-500 panel">
      THREE
    </section>
    <section class="bg-green-500 panel">
      FOUR
    </section>
    <section class="bg-gray-500 panel">
      FIVE
    </section>
  </div>
</template>

<style>
.outer {
  overscroll-behavior: none;
  width: 1000%;
  /* height: 100%; */
  display: flex;
  flex-wrap: nowrap;
}
.panel {
  width: 100vw;
  height: 100vh;
}
</style>
