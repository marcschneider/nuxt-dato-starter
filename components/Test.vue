<script setup>
const { $gsap: gsap } = useNuxtApp()

onMounted(() => {
  gsap.set('.text-center', { x: -100 })
  gsap.to('.text-center', {
    rotation: 30,
    x: 0,
    opacity: 1,
    duration: 0.5,
    ease: 'power2.out',
  })
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.w-full',
      start: 'top top',
      end: '+=1000',
      scrub: 1,
      pin: true,
      markers: true,
    },
  })
  tl.to('.text-center', { yPercent: 100, duration: 0 })
  tl.to('.text-center', { rotation: 360, duration: 3 })
})
</script>

<template>
  <div class="w-full h-[200vh] bg-slate-100 mt-20">
    <div class="text-center opacity-0 text-8xl">
      GSAP
    </div>
  </div>
</template>
