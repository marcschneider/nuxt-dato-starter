import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'

export default defineNuxtPlugin(() => {
  if (process.client)
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)

  return {
    provide: {
      gsap,
      ScrollTrigger,
      ScrollSmoother,
      SplitText,
    },
  }
})
