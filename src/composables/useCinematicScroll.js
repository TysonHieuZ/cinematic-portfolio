import { ref, readonly, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ANIMATION_DEFAULTS = Object.freeze({
  duration: 1.2,
  ease: 'power3.out',
  staggerDelay: 0.12,
  scrubSpeed: 1.4,
})

const PARALLAX_FACTOR = Object.freeze({
  slow: 0.3,
  medium: 0.55,
  fast: 0.8,
})

export function useCinematicScroll() {
  const _isReady = ref(false)
  const _activeTimelines = []
  const _activeScrollTriggers = []

  function _trackTimeline(tl) { _activeTimelines.push(tl); return tl }
  function _trackScrollTrigger(st) { _activeScrollTriggers.push(st); return st }
  function _resolveElement(target) {
    if (typeof target === 'string') return document.querySelector(target)
    return target instanceof Element ? target : null
  }

  function animateHeroEntrance({ headline, subCopy, cta, reel }) {
    const tl = gsap.timeline({ defaults: { ease: ANIMATION_DEFAULTS.ease } })
    if (headline) tl.fromTo(headline, { yPercent: 110, opacity: 0, skewY: 4 }, { yPercent: 0, opacity: 1, skewY: 0, duration: ANIMATION_DEFAULTS.duration })
    if (subCopy)  tl.fromTo(subCopy,  { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.6')
    if (cta)      tl.fromTo(cta,      { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.7 }, '-=0.4')
    if (reel)     tl.fromTo(reel,     { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.4 }, '-=0.5')
    _trackTimeline(tl)
  }

  function animateParallaxLayer(element, factor = 'medium') {
    const el = _resolveElement(element)
    if (!el) return
    const yDistance = window.innerHeight * (PARALLAX_FACTOR[factor] ?? PARALLAX_FACTOR.medium)
    const st = ScrollTrigger.create({
      trigger: el, start: 'top bottom', end: 'bottom top',
      scrub: ANIMATION_DEFAULTS.scrubSpeed,
      onUpdate: (self) => gsap.set(el, { y: self.progress * yDistance * -1, force3D: true }),
    })
    _trackScrollTrigger(st)
  }

  function animateFadeUpBatch(elements, options = {}) {
    if (!elements?.length) return
    const { stagger = ANIMATION_DEFAULTS.staggerDelay, y = 48, delay = 0 } = options
    const tl = gsap.timeline({
      scrollTrigger: { trigger: elements[0], start: 'top 85%', toggleActions: 'play none none none' },
    })
    tl.fromTo(elements, { opacity: 0, y }, { opacity: 1, y: 0, duration: ANIMATION_DEFAULTS.duration, stagger, delay, ease: ANIMATION_DEFAULTS.ease })
    _trackTimeline(tl)
  }

  function animateProjectCardReveal(cardElement, index) {
    const el = _resolveElement(cardElement)
    if (!el) return
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
    })
    tl.fromTo(el, { opacity: 0, y: 64, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.95, delay: index * 0.08, ease: 'power2.out' })
    _trackTimeline(tl)
  }

  /**
   * BUG FIX: chỉ animate wrapper element, KHÔNG animate body nữa.
   * body opacity được reset bởi router.afterEach trong App.vue
   */
  function triggerPageLeaveTransition(onComplete) {
    // Gọi callback ngay sau 1 frame nhỏ — Vue Router sẽ xử lý transition CSS
    // Không dùng gsap animate body để tránh màn hình đen
    setTimeout(() => onComplete?.(), 50)
  }

  function killAllScrollTriggers() {
    _activeScrollTriggers.forEach((st) => st.kill())
    _activeScrollTriggers.length = 0
  }

  onMounted(() => { ScrollTrigger.refresh(); _isReady.value = true })

  onUnmounted(() => {
    _activeTimelines.forEach((tl) => tl.kill())
    _activeTimelines.length = 0
    killAllScrollTriggers()
    ScrollTrigger.getAll().forEach((st) => st.kill())
  })

  return {
    isReady: readonly(_isReady),
    animateHeroEntrance,
    animateParallaxLayer,
    animateFadeUpBatch,
    animateProjectCardReveal,
    triggerPageLeaveTransition,
    killAllScrollTriggers,
  }
}
