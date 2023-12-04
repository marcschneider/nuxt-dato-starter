import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

export default defineNuxtPlugin(() => {
  // eslint-disable-next-line node/prefer-global/process
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
