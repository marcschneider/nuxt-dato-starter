<script setup>
const { $gsap: gsap } = useNuxtApp()

onMounted(() => {
  const sections = gsap.utils.toArray('.panel')

  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: '.inner',
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
    <div class="inner">
      <section class="bg-red-500 panel will-change-transform">
        ONE
      </section>
      <section class="bg-orange-500 panel will-change-transform">
        TWO
      </section>
      <section class="bg-purple-500 panel will-change-transform">
        THREE
      </section>
      <section class="bg-green-500 panel will-change-transform">
        FOUR
      </section>
      <section class="bg-gray-500 panel will-change-transform">
        FIVE
      </section>
    </div>
  </div>
</template>

<style>
.outer {
  width: 100vw;
  overflow: hidden;
}
.inner {
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
