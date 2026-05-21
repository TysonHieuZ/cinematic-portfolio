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
          About me
        </p>
        <h1 class="about-hero__title">The&nbsp;person<br /><em>behind it</em></h1>
      </section>

      <!-- Avatar + Bio -->
      <section class="about-profile animate-in" aria-label="Profile">
        <div class="about-profile__avatar-wrap">
          <img
            src="/avatar.jpg"
            alt="Nguyễn Hữu Hiếu"
            class="about-profile__avatar"
          />
          <div class="about-profile__avatar-overlay" aria-hidden="true" />
          <span class="about-profile__corner about-profile__corner--tl" aria-hidden="true" />
          <span class="about-profile__corner about-profile__corner--br" aria-hidden="true" />
        </div>

        <div class="about-profile__info">
          <h2 class="about-profile__name">Nguyễn Hữu Hiếu</h2>
          <p class="about-profile__role">Intern Frontend Developer</p>
          <p class="about-profile__tagline">
            "Code is just the beginning — the experience is what stays."
          </p>
          <p class="about-bio__text">
            Fresh graduate (11/04/2026) with a passion for building clean,
            interactive web experiences. Currently developing at
            <a href="https://aihr.vn" target="_blank" rel="noopener noreferrer" class="about-link">AiHR.vn</a>
            — an HR software platform — where I work with Vue 3, TypeScript,
            and the Composition API daily.
          </p>
          <p class="about-bio__text">
            I believe great interfaces feel less like software and more like
            an extension of thought. Still early in the journey, but moving fast.
          </p>
        </div>
      </section>

      <!-- Skills -->
      <section class="about-skills animate-in" aria-label="Skills">
        <p class="about-skills__label">Tech Stack</p>
        <ul class="about-skills__list">
          <li class="about-skills__item">Vue 3</li>
          <li class="about-skills__item">TypeScript</li>
          <li class="about-skills__item">ReactJS</li>
          <li class="about-skills__item">C#</li>
          <li class="about-skills__item">HTML &amp; CSS</li>
          <li class="about-skills__item">Bootstrap</li>
          <li class="about-skills__item">Composition API</li>
          <li class="about-skills__item">Git</li>
        </ul>
      </section>

      <!-- Social + Contact -->
      <section class="about-contact animate-in" aria-label="Contact">
        <p class="about-contact__label">Get in touch</p>
        <a href="mailto:huuhieuz2310@gmail.com" class="about-contact__email">
          huuhieuz2310@gmail.com&nbsp;↗
        </a>

        <div class="about-social">
          <a
            href="https://github.com/TysonHieuZ"
            target="_blank"
            rel="noopener noreferrer"
            class="about-social__link"
          >
            <svg viewBox="0 0 24 24" class="about-social__icon" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            GitHub
          </a>
          <a
            href="https://www.facebook.com/Ng.Hu.Hieu2310/"
            target="_blank"
            rel="noopener noreferrer"
            class="about-social__link"
          >
            <svg viewBox="0 0 24 24" class="about-social__icon" fill="currentColor" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </a>
        </div>
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
  max-width: 800px;
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

/* Profile */
.about-profile {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: var(--space-10);
  align-items: start;
}

.about-profile__avatar-wrap {
  position: relative;
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 1px solid rgba(201, 169, 110, 0.15);
  aspect-ratio: 3 / 4;
}

.about-profile__avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.about-profile__avatar-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,9,5,0.4) 0%, transparent 60%);
  pointer-events: none;
}

.about-profile__corner {
  position: absolute;
  width: 14px; height: 14px;
  border-color: var(--color-accent);
  border-style: solid;
  opacity: 0.6;
  z-index: 2;
}
.about-profile__corner--tl { top: 6px; left: 6px; border-width: 1px 0 0 1px; }
.about-profile__corner--br { bottom: 6px; right: 6px; border-width: 0 1px 1px 0; }

.about-profile__info {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.about-profile__name {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 300;
  color: var(--color-text-primary);
  line-height: 1.1;
}

.about-profile__role {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.about-profile__tagline {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-style: italic;
  color: var(--color-text-muted);
  border-left: 2px solid var(--color-accent);
  padding-left: var(--space-4);
}

.about-bio__text {
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
}

.about-link {
  color: var(--color-accent);
  border-bottom: 1px solid rgba(201,169,110,0.3);
  transition: border-color var(--transition-base);
}
.about-link:hover { border-color: var(--color-accent); }

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
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.about-contact__label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.about-contact__email {
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2.5vw, 1.9rem);
  font-weight: 300;
  color: var(--color-text-primary);
  transition: color var(--transition-base);
}
.about-contact__email:hover { color: var(--color-accent); }

/* Social */
.about-social {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.about-social__link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  padding: var(--space-2) var(--space-4);
  border: 1px solid rgba(107, 94, 72, 0.2);
  border-radius: var(--radius-xs);
  transition: all var(--transition-base);
  text-decoration: none;
}
.about-social__link:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.about-social__icon {
  width: 0.9rem;
  height: 0.9rem;
}

/* Responsive */
@media (max-width: 640px) {
  .about-main {
    padding: var(--space-12) var(--space-5) var(--space-10);
    gap: var(--space-10);
  }
  .about-nav { padding: var(--space-4) var(--space-5); }
  .about-profile {
    grid-template-columns: 1fr;
  }
  .about-profile__avatar-wrap {
    max-width: 200px;
    aspect-ratio: 1 / 1;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-in { opacity: 1 !important; transform: none !important; }
}
</style>
