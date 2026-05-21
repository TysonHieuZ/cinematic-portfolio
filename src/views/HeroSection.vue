<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useCinematicScroll } from '@/composables/useCinematicScroll'
import { useTimeTracker }      from '@/composables/useTimeTracker'
import { useAppStore }         from '@/stores/appStore'

import HeroHeadline  from '@/components/hero/HeroHeadline.vue'
import HeroScrollCue from '@/components/hero/HeroScrollCue.vue'
import FooterClock   from '@/components/footer/FooterClock.vue'
import BaseButton    from '@/components/ui/BaseButton.vue'

const appStore = useAppStore()
const { accentColor, isReducedMotion, isVi } = storeToRefs(appStore)
const router = useRouter()

const t = computed(() => isVi.value ? {
  subCopy:  'Code chỉ là khởi đầu — trải nghiệm mới là điều đọng lại. Sinh viên mới tốt nghiệp đang biến ý tưởng thành sản phẩm web sạch và tương tác. Hiện đang xây dựng tại',
  work:     'Xem dự án',
  about:    'Về tôi ↗',
  projects: 'Dự án',
  experience: 'Kinh nghiệm',
  ambition: 'Tham vọng',
  available: 'Sẵn sàng cơ hội',
} : {
  subCopy:  'Code is just the beginning — the experience is what stays. Fresh graduate turning ideas into clean, interactive web products. Currently building at',
  work:     'Selected Work',
  about:    'About Me ↗',
  projects: 'Project',
  experience: 'Experience',
  ambition: 'Ambition',
  available: 'Available for opportunities',
})

const { animateHeroEntrance, animateParallaxLayer, triggerPageLeaveTransition } = useCinematicScroll()
const { formattedTime, formattedDate, timeZoneLabel, isTicking } = useTimeTracker()

const headlineRef   = ref(null)
const subCopyRef    = ref(null)
const ctaRef        = ref(null)
const avatarRef     = ref(null)
const parallaxBgRef = ref(null)

function handleNavigateToProjects() {
  if (isReducedMotion.value) { router.push('/projects'); return }
  triggerPageLeaveTransition(() => router.push('/projects'))
}
function handleNavigateToAbout() {
  if (isReducedMotion.value) { router.push('/about'); return }
  triggerPageLeaveTransition(() => router.push('/about'))
}

onMounted(() => {
  if (isReducedMotion.value) return
  animateHeroEntrance({
    headline: headlineRef.value,
    subCopy:  subCopyRef.value,
    cta:      ctaRef.value,
    reel:     avatarRef.value,
  })
  if (parallaxBgRef.value) animateParallaxLayer(parallaxBgRef.value, 'slow')
})
</script>

<template>
  <div class="hero-page">

    <section class="hero-section" aria-label="Hero" role="region">
      <div ref="parallaxBgRef" class="hero-section__bg" aria-hidden="true" />
      <div class="hero-section__grain" aria-hidden="true" />

      <!-- Vertical index line -->
      <div class="hero-section__index-line" aria-hidden="true">
        <span class="hero-section__index-label">001</span>
        <div class="hero-section__index-track" />
      </div>

      <div class="hero-section__grid">
        <!-- Left -->
        <div class="hero-section__content">
          <div ref="headlineRef" class="hero-section__headline-wrap">
            <HeroHeadline :accent-color="accentColor" :is-vi="isVi" />
          </div>

          <p ref="subCopyRef" class="hero-section__sub-copy">
            {{ t.subCopy }}
            <a href="https://aihr.vn" target="_blank" rel="noopener noreferrer" class="hero-section__inline-link">AiHR.vn</a>.
          </p>

          <div ref="ctaRef" class="hero-section__cta-group">
            <BaseButton variant="primary" size="lg" @click="handleNavigateToProjects">
              {{ t.work }}
            </BaseButton>
            <BaseButton variant="ghost" size="lg" @click="handleNavigateToAbout">
              {{ t.about }}
            </BaseButton>
          </div>

          <div class="hero-section__stats">
            <div class="hero-section__stat">
              <span class="hero-section__stat-value">1+</span>
              <span class="hero-section__stat-label">{{ t.projects }}</span>
            </div>
            <div class="hero-section__stat-divider" aria-hidden="true" />
            <div class="hero-section__stat">
              <span class="hero-section__stat-value">Fresh</span>
              <span class="hero-section__stat-label">{{ t.experience }}</span>
            </div>
            <div class="hero-section__stat-divider" aria-hidden="true" />
            <div class="hero-section__stat">
              <span class="hero-section__stat-value">∞</span>
              <span class="hero-section__stat-label">{{ t.ambition }}</span>
            </div>
          </div>
        </div>

        <!-- Right: avatar -->
        <div ref="avatarRef" class="hero-section__avatar-wrap">
          <div class="hero-section__avatar-frame">
            <span class="hero-section__corner hero-section__corner--tl" aria-hidden="true" />
            <span class="hero-section__corner hero-section__corner--br" aria-hidden="true" />
            <img src="/avatar.jpg" alt="Nguyễn Hữu Hiếu" class="hero-section__avatar-img" loading="eager" />
            <div class="hero-section__avatar-overlay" aria-hidden="true" />
          </div>
          <p class="hero-section__avatar-label" aria-hidden="true">
            <span class="hero-section__avatar-dot" />
            {{ t.available }}
          </p>
        </div>
      </div>

      <div class="hero-section__scroll-cue">
        <HeroScrollCue />
      </div>
    </section>

    <FooterClock
      :formatted-time="formattedTime"
      :formatted-date="formattedDate"
      :time-zone-label="timeZoneLabel"
      :is-ticking="isTicking"
    />
  </div>
</template>

<style scoped>
.hero-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-bg-base);
}

.hero-section {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 100vh;
}

.hero-section__bg {
  position: absolute;
  inset: -25%;
  background:
    radial-gradient(ellipse 70% 60% at 65% 35%, rgba(201,169,110,0.08) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 20% 80%, rgba(201,169,110,0.04) 0%, transparent 50%),
    linear-gradient(160deg, #0f0d08 0%, #0a0905 50%, #0d0c07 100%);
  will-change: transform;
  z-index: 0;
}

[data-theme="light"] .hero-section__bg {
  background:
    radial-gradient(ellipse 70% 60% at 65% 35%, rgba(160,120,64,0.06) 0%, transparent 60%),
    linear-gradient(160deg, #ede8de 0%, #f5f0e8 50%, #ede8de 100%);
}

.hero-section__grain {
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
  opacity: 0.025;
  pointer-events: none;
  z-index: 1;
}

.hero-section__index-line {
  position: absolute;
  left: var(--space-8);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  z-index: 5;
}
.hero-section__index-label {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.15em;
  color: var(--color-text-muted);
  writing-mode: vertical-rl;
}
.hero-section__index-track {
  width: 1px; height: 80px;
  background: linear-gradient(to bottom, transparent, var(--color-accent), transparent);
  opacity: 0.4;
}

.hero-section__grid {
  position: relative;
  z-index: 2;
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: var(--space-12);
  padding: var(--space-24) var(--space-16) var(--space-12);
  padding-inline-start: clamp(var(--space-12), 8vw, var(--space-24));
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.hero-section__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}
.hero-section__headline-wrap { overflow: hidden; }

.hero-section__sub-copy {
  font-family: var(--font-body);
  font-size: clamp(0.95rem, 1.4vw, 1.1rem);
  line-height: 1.7;
  color: var(--color-text-secondary);
  max-width: 42ch;
  opacity: 0;
}
.hero-section__inline-link {
  color: var(--color-accent);
  border-bottom: 1px solid rgba(201,169,110,0.3);
  transition: border-color var(--transition-base);
}
.hero-section__inline-link:hover { border-color: var(--color-accent); }

.hero-section__cta-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  opacity: 0;
}

.hero-section__stats {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding-top: var(--space-4);
  border-top: 1px solid rgba(107, 94, 72, 0.15);
}
.hero-section__stat { display: flex; flex-direction: column; gap: 2px; }
.hero-section__stat-value {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 300;
  color: var(--color-text-primary);
  line-height: 1;
}
.hero-section__stat-label {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}
.hero-section__stat-divider {
  width: 1px; height: 32px;
  background: rgba(107, 94, 72, 0.2);
}

/* Avatar */
.hero-section__avatar-wrap {
  opacity: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  align-items: center;
}
.hero-section__avatar-frame {
  position: relative;
  width: 100%;
  max-width: 420px;
  aspect-ratio: 3 / 4;
  border: 1px solid rgba(201, 169, 110, 0.15);
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--color-surface-raised);
}
.hero-section__avatar-img {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  transition: transform 0.6s ease;
}
.hero-section__avatar-frame:hover .hero-section__avatar-img { transform: scale(1.04); }
.hero-section__avatar-overlay {
  position: absolute; inset: 0;
  background:
    linear-gradient(to top, rgba(10,9,5,0.5) 0%, transparent 50%),
    linear-gradient(to bottom, rgba(10,9,5,0.15) 0%, transparent 30%);
  pointer-events: none;
}
.hero-section__corner {
  position: absolute;
  width: 20px; height: 20px;
  border-color: var(--color-accent);
  border-style: solid;
  opacity: 0.7;
  z-index: 2;
}
.hero-section__corner--tl { top: 8px; left: 8px; border-width: 1px 0 0 1px; }
.hero-section__corner--br { bottom: 8px; right: 8px; border-width: 0 1px 1px 0; }

.hero-section__avatar-label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}
.hero-section__avatar-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #4caf50;
  box-shadow: 0 0 6px rgba(76,175,80,0.6);
  animation: pulse-green 2s ease-in-out infinite;
}
@keyframes pulse-green {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.7); }
}

.hero-section__scroll-cue {
  position: absolute;
  bottom: var(--space-8);
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
}

/* Responsive */
@media (max-width: 900px) {
  .hero-section__grid {
    grid-template-columns: 1fr;
    padding: var(--space-16) var(--space-6) var(--space-8);
    padding-inline-start: var(--space-6);
    gap: var(--space-10);
  }
  .hero-section__avatar-wrap { order: -1; }
  .hero-section__avatar-frame { max-width: 240px; aspect-ratio: 1 / 1; }
  .hero-section__index-line { display: none; }
  .hero-section__cta-group { flex-direction: column; align-items: flex-start; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-section__sub-copy,
  .hero-section__cta-group,
  .hero-section__avatar-wrap { opacity: 1; }
  .hero-section__bg { will-change: auto; }
  .hero-section__avatar-dot { animation: none; }
}
</style>
