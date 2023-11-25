<script setup>
const { $gsap: gsap } = useNuxtApp()

const outer = ref()
const inner = ref()

onMounted(() => {
  gsap.set(inner.value, { x: -100 })
  gsap.to(inner.value, {
    rotation: 30,
    x: 0,
    opacity: 1,
    duration: 0.25,
    ease: 'power2.out',
  })
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: outer.value,
      start: 'top top',
      end: '+=1000',
      scrub: 1,
      pin: true,
      markers: true,
    },
  })
  tl.to(inner.value, { yPercent: 100, duration: 0 })
  tl.to(inner.value, { rotation: 360, duration: 3 })
})
</script>

<template>
  <div ref="outer" class="w-full h-[200vh] bg-slate-100 mt-20">
    <div ref="inner" class="text-center opacity-100 text-8xl">
      GSAP
    </div>
  </div>
</template>
