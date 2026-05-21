<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useCinematicScroll } from '@/composables/useCinematicScroll'
import { useTimeTracker }      from '@/composables/useTimeTracker'
import { useAudioController }  from '@/composables/useAudioController'
import { useAppStore }         from '@/stores/appStore'

import HeroHeadline      from '@/components/hero/HeroHeadline.vue'
import HeroReelFrame     from '@/components/hero/HeroReelFrame.vue'
import HeroScrollCue     from '@/components/hero/HeroScrollCue.vue'
import FooterClock       from '@/components/footer/FooterClock.vue'
import AudioToggleButton from '@/components/ui/AudioToggleButton.vue'
import BaseButton        from '@/components/ui/BaseButton.vue'

// ─── Store ────────────────────────────────────────────────────────────────────
const appStore = useAppStore()
const { accentColor, isReducedMotion } = storeToRefs(appStore)

// ─── Router ───────────────────────────────────────────────────────────────────
const router = useRouter()

// ─── Composables ──────────────────────────────────────────────────────────────
const {
  animateHeroEntrance,
  animateParallaxLayer,
  triggerPageLeaveTransition,
} = useCinematicScroll()

const { formattedTime, formattedDate, timeZoneLabel, isTicking } = useTimeTracker()

const {
  isPlaying, isMuted, audioLabel,
  togglePlayback, toggleMute,
} = useAudioController({ src: '/audio/ambient.mp3', volume: 0.3 })

// ─── Template refs ────────────────────────────────────────────────────────────
const headlineRef   = ref(null)
const subCopyRef    = ref(null)
const ctaRef        = ref(null)
const reelRef       = ref(null)
const parallaxBgRef = ref(null)

// ─── Local state ──────────────────────────────────────────────────────────────
const isReelOverlayOpen = ref(false)

// ─── Handlers ─────────────────────────────────────────────────────────────────
function handleOpenReelOverlay()  { isReelOverlayOpen.value = true  }
function handleCloseReelOverlay() { isReelOverlayOpen.value = false }

function handleNavigateToProjects() {
  if (isReducedMotion.value) { router.push('/projects'); return }
  triggerPageLeaveTransition(() => router.push('/projects'))
}

function handleNavigateToAbout() {
  if (isReducedMotion.value) { router.push('/about'); return }
  triggerPageLeaveTransition(() => router.push('/about'))
}

function handleReelHoverChange(isHovering) {
  appStore.setCustomCursorActive(isHovering)
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  if (isReducedMotion.value) return

  animateHeroEntrance({
    headline: headlineRef.value,
    subCopy:  subCopyRef.value,
    cta:      ctaRef.value,
    reel:     reelRef.value,
  })

  if (parallaxBgRef.value) {
    animateParallaxLayer(parallaxBgRef.value, 'slow')
  }
})
</script>

<template>
  <div class="hero-page">

    <!-- ── Nav bar ─────────────────────────────────────────────────── -->
    <nav class="hero-nav" aria-label="Primary navigation">
      <span class="hero-nav__logo">Portfolio.</span>
      <ul class="hero-nav__links">
        <li>
          <button class="hero-nav__link" type="button" @click="handleNavigateToProjects">
            Work
          </button>
        </li>
        <li>
          <button class="hero-nav__link" type="button" @click="handleNavigateToAbout">
            About
          </button>
        </li>
      </ul>
    </nav>

    <!-- ── Hero section ────────────────────────────────────────────── -->
    <section class="hero-section" aria-label="Hero" role="region">

      <!-- Parallax background -->
      <div ref="parallaxBgRef" class="hero-section__bg" aria-hidden="true" />

      <!-- Grain overlay -->
      <div class="hero-section__grain" aria-hidden="true" />

      <!-- Vertical index line -->
      <div class="hero-section__index-line" aria-hidden="true">
        <span class="hero-section__index-label">001</span>
        <div class="hero-section__index-track" />
      </div>

      <!-- Main grid -->
      <div class="hero-section__grid">

        <!-- Left: text content -->
        <div class="hero-section__content">
          <div ref="headlineRef" class="hero-section__headline-wrap">
            <HeroHeadline :accent-color="accentColor" />
          </div>

          <p ref="subCopyRef" class="hero-section__sub-copy">
            Directing visual narratives at the intersection
            of code&nbsp;&amp;&nbsp;craft.
            Available for select collaborations in&nbsp;2026.
          </p>

          <div ref="ctaRef" class="hero-section__cta-group">
            <BaseButton variant="primary" size="lg" @click="handleNavigateToProjects">
              Selected Work
            </BaseButton>
            <BaseButton variant="ghost" size="lg" @click="handleOpenReelOverlay">
              Watch Reel ↗
            </BaseButton>
          </div>

          <!-- Stats row -->
          <div class="hero-section__stats">
            <div class="hero-section__stat">
              <span class="hero-section__stat-value">12+</span>
              <span class="hero-section__stat-label">Projects</span>
            </div>
            <div class="hero-section__stat-divider" aria-hidden="true" />
            <div class="hero-section__stat">
              <span class="hero-section__stat-value">6yr</span>
              <span class="hero-section__stat-label">Experience</span>
            </div>
            <div class="hero-section__stat-divider" aria-hidden="true" />
            <div class="hero-section__stat">
              <span class="hero-section__stat-value">∞</span>
              <span class="hero-section__stat-label">Coffee</span>
            </div>
          </div>
        </div>

        <!-- Right: reel frame -->
        <div ref="reelRef" class="hero-section__reel-wrap">
          <HeroReelFrame
            :is-overlay-open="isReelOverlayOpen"
            thumbnail-src=""
            thumbnail-alt="Showreel preview"
            @open-overlay="handleOpenReelOverlay"
            @close-overlay="handleCloseReelOverlay"
            @hover-change="handleReelHoverChange"
          />
        </div>

      </div>

      <!-- Scroll cue -->
      <div class="hero-section__scroll-cue">
        <HeroScrollCue />
      </div>

      <!-- Audio toggle -->
      <div class="hero-section__audio">
        <AudioToggleButton
          :is-playing="isPlaying"
          :is-muted="isMuted"
          :aria-label="audioLabel"
          @toggle-playback="togglePlayback"
          @toggle-mute="toggleMute"
        />
        <span class="hero-section__audio-label" aria-hidden="true">
          {{ isPlaying ? 'ambient on' : 'ambient off' }}
        </span>
      </div>

    </section>

    <!-- ── Footer clock ─────────────────────────────────────────────── -->
    <FooterClock
      :formatted-time="formattedTime"
      :formatted-date="formattedDate"
      :time-zone-label="timeZoneLabel"
      :is-ticking="isTicking"
    />

  </div>
</template>

<style scoped>
/* ── Page wrapper ── */
.hero-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-bg-base);
}

/* ── Nav ── */
.hero-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-6) var(--space-8);
  background: linear-gradient(to bottom, rgba(10,9,5,0.9) 0%, transparent 100%);
  backdrop-filter: blur(1px);
}

.hero-nav__logo {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 300;
  color: var(--color-text-primary);
  letter-spacing: 0.05em;
}

.hero-nav__links {
  display: flex;
  gap: var(--space-8);
}

.hero-nav__link {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  background: none;
  border: none;
  cursor: pointer;
  transition: color var(--transition-base);
  padding: 0;
}
.hero-nav__link:hover { color: var(--color-accent); }

/* ── Hero section ── */
.hero-section {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 100vh;
}

/* Parallax background */
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

/* Film grain */
.hero-section__grain {
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
  opacity: 0.028;
  pointer-events: none;
  z-index: 1;
}

/* Vertical index line */
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
  width: 1px;
  height: 80px;
  background: linear-gradient(to bottom, transparent, var(--color-accent), transparent);
  opacity: 0.4;
}

/* Main grid */
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

/* Text content */
.hero-section__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.hero-section__headline-wrap {
  /* GSAP animates the outer wrapper — keeps headline component clean */
  overflow: hidden;
}

.hero-section__sub-copy {
  font-family: var(--font-body);
  font-size: clamp(0.95rem, 1.4vw, 1.1rem);
  line-height: 1.7;
  color: var(--color-text-secondary);
  max-width: 42ch;
  opacity: 0; /* Revealed by GSAP */
}

.hero-section__cta-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  opacity: 0; /* Revealed by GSAP */
}

/* Stats */
.hero-section__stats {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding-top: var(--space-4);
  border-top: 1px solid rgba(107, 94, 72, 0.15);
}

.hero-section__stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

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
  width: 1px;
  height: 32px;
  background: rgba(107, 94, 72, 0.2);
}

/* Reel frame */
.hero-section__reel-wrap {
  opacity: 0; /* Revealed by GSAP */
}

/* Scroll cue */
.hero-section__scroll-cue {
  position: absolute;
  bottom: var(--space-8);
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
}

/* Audio */
.hero-section__audio {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-8);
  z-index: 50;
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.hero-section__audio-label {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .hero-section__grid {
    grid-template-columns: 1fr;
    padding: var(--space-20) var(--space-6) var(--space-8);
    padding-inline-start: var(--space-6);
    gap: var(--space-10);
  }

  .hero-section__index-line { display: none; }

  .hero-section__cta-group { flex-direction: column; align-items: flex-start; }

  .hero-nav { padding: var(--space-5) var(--space-5); }
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .hero-section__sub-copy,
  .hero-section__cta-group,
  .hero-section__reel-wrap {
    opacity: 1;
  }
  .hero-section__bg { will-change: auto; }
}
</style>
