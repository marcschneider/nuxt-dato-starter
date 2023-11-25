import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

export default defineNuxtPlugin(() => {
  if (process.client)
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

  return {
    provide: {
      gsap,
      ScrollTrigger,
      ScrollSmoother,
    },
  }
})
