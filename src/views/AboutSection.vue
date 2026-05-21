<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'

const router = useRouter()
const contentRef = ref(null)

function handleNavigateHome() { router.push('/') }

onMounted(() => {
  if (!contentRef.value) return
  const els = contentRef.value.querySelectorAll('.animate-in')
  gsap.fromTo(
    els,
    { opacity: 0, y: 32 },
    { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.1 },
  )
})
</script>

<template>
  <div class="about-page">
    <nav class="about-nav" aria-label="Page navigation">
      <button class="about-nav__back" type="button" @click="handleNavigateHome">
        ← Back
      </button>
    </nav>

    <main ref="contentRef" class="about-main">
      <!-- Hero -->
      <section class="about-hero animate-in">
        <p class="about-hero__eyebrow">
          <span class="about-hero__line" aria-hidden="true" />
          About
        </p>
        <h1 class="about-hero__title">The&nbsp;person<br /><em>behind it</em></h1>
      </section>

      <!-- Bio -->
      <section class="about-bio animate-in" aria-label="Biography">
        <p class="about-bio__text">
          A front-end engineer and visual director obsessed with the space where
          technology meets cinema. Six years crafting digital experiences that
          feel less like software, more like film.
        </p>
        <p class="about-bio__text">
          Currently available for select collaborations — brand identities,
          interactive installations, and web experiences that deserve more than
          a template.
        </p>
      </section>

      <!-- Skills -->
      <section class="about-skills animate-in" aria-label="Skills">
        <p class="about-skills__label">Expertise</p>
        <ul class="about-skills__list">
          <li class="about-skills__item">Vue 3 / Nuxt</li>
          <li class="about-skills__item">GSAP &amp; Motion Design</li>
          <li class="about-skills__item">UI / UX Direction</li>
          <li class="about-skills__item">Brand Identity</li>
          <li class="about-skills__item">Three.js / WebGL</li>
          <li class="about-skills__item">Figma</li>
        </ul>
      </section>

      <!-- Contact -->
      <section class="about-contact animate-in" aria-label="Contact">
        <p class="about-contact__label">Get in touch</p>
        <a href="mailto:hello@portfolio.com" class="about-contact__email">
          hello@portfolio.com&nbsp;↗
        </a>
      </section>
    </main>
  </div>
</template>

<style scoped>
.about-page {
  min-height: 100vh;
  background: var(--color-bg-base);
}

/* Nav */
.about-nav {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: var(--space-5) var(--space-8);
  background: rgba(10, 9, 5, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(107, 94, 72, 0.1);
}

.about-nav__back {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: var(--color-text-muted);
  background: none;
  border: none;
  cursor: pointer;
  transition: color var(--transition-base);
  padding: 0;
}
.about-nav__back:hover { color: var(--color-accent); }

/* Main */
.about-main {
  max-width: 720px;
  margin: 0 auto;
  padding: var(--space-20) var(--space-8) var(--space-16);
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
}

/* Hero */
.about-hero__eyebrow {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: var(--space-4);
}

.about-hero__line {
  display: inline-block;
  width: 2rem;
  height: 1px;
  background: var(--color-accent);
}

.about-hero__title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 300;
  line-height: 0.95;
  color: var(--color-text-primary);
}
.about-hero__title em {
  font-style: italic;
  color: var(--color-accent);
}

/* Bio */
.about-bio {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.about-bio__text {
  font-family: var(--font-body);
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
}

/* Skills */
.about-skills__label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: var(--space-4);
}

.about-skills__list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.about-skills__item {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: var(--color-text-secondary);
  padding: var(--space-2) var(--space-4);
  border: 1px solid rgba(107, 94, 72, 0.25);
  border-radius: var(--radius-xs);
  transition: border-color var(--transition-base), color var(--transition-base);
}
.about-skills__item:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

/* Contact */
.about-contact {
  border-top: 1px solid rgba(107, 94, 72, 0.15);
  padding-top: var(--space-8);
}

.about-contact__label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: var(--space-3);
}

.about-contact__email {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 3vw, 2.2rem);
  font-weight: 300;
  color: var(--color-text-primary);
  transition: color var(--transition-base);
}
.about-contact__email:hover { color: var(--color-accent); }

/* Responsive */
@media (max-width: 640px) {
  .about-main {
    padding: var(--space-12) var(--space-5) var(--space-10);
    gap: var(--space-10);
  }
  .about-nav { padding: var(--space-4) var(--space-5); }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-in { opacity: 1 !important; transform: none !important; }
}
</style>
