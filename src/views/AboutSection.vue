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
          <p class="about-profile__role">Intern Frontend Developer · JobTest Co.</p>
          <p class="about-profile__tagline">
            "Code is just the beginning — the experience is what stays."
          </p>
          <p class="about-bio__text">
            Fresh graduate from
            <strong class="about-highlight">HUFLIT University</strong>
            (10/2022 – 04/2026), GPA&nbsp;<strong class="about-highlight">2.83/4.0</strong>
            — Bachelor's degree, ranked <em>Good</em>.
            Currently building
            <a href="https://aihr.vn" target="_blank" rel="noopener noreferrer" class="about-link">AiHR.vn</a>
            — a comprehensive HR software platform — at
            <strong class="about-highlight">JobTest Co.</strong>,
            working daily with Vue&nbsp;3, TypeScript, and the Composition API.
          </p>
          <p class="about-bio__text">
            Previously interned at
            <a href="https://winsoft.com.vn" target="_blank" rel="noopener noreferrer" class="about-link">Winsoft</a>
            (10/2025 – 12/2025), where I built a hospital management system
            focusing on the frontend with React.js, HTML &amp; CSS.
          </p>

          <!-- Credentials -->
          <div class="about-credentials">
            <div class="about-credential">
              <span class="about-credential__value">2.83<span class="about-credential__unit">/4.0</span></span>
              <span class="about-credential__label">GPA · Good</span>
            </div>
            <div class="about-credential__divider" aria-hidden="true" />
            <div class="about-credential">
              <span class="about-credential__value">605</span>
              <span class="about-credential__label">TOEIC Score</span>
            </div>
            <div class="about-credential__divider" aria-hidden="true" />
            <div class="about-credential">
              <span class="about-credential__value">6.5</span>
              <span class="about-credential__label">IELTS Target '26</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills -->
      <section class="about-skills animate-in" aria-label="Skills">
        <p class="about-skills__label">Tech Stack</p>
        <ul class="about-skills__list">
          <li class="about-skills__item">Vue 3</li>
          <li class="about-skills__item">TypeScript</li>
          <li class="about-skills__item">Composition API</li>
          <li class="about-skills__item">ReactJS</li>
          <li class="about-skills__item">C#</li>
          <li class="about-skills__item">HTML &amp; CSS</li>
          <li class="about-skills__item">Bootstrap</li>
          <li class="about-skills__item">Android Studio</li>
          <li class="about-skills__item">Git</li>
        </ul>
      </section>

      <!-- Education & Experience timeline -->
      <section class="about-timeline animate-in" aria-label="Experience">
        <p class="about-skills__label">Experience &amp; Education</p>

        <ol class="timeline">
          <li class="timeline__item">
            <span class="timeline__dot" aria-hidden="true" />
            <div class="timeline__body">
              <p class="timeline__period">05/2026 – Present</p>
              <h3 class="timeline__title">Intern Frontend Developer</h3>
              <p class="timeline__place">
                <a href="https://aihr.vn" target="_blank" rel="noopener noreferrer" class="about-link">JobTest Co. — AiHR.vn</a>
              </p>
              <p class="timeline__desc">
                Developing the AiHR HR software platform. Stack: Vue 3, TypeScript, Composition API.
              </p>
            </div>
          </li>

          <li class="timeline__item">
            <span class="timeline__dot" aria-hidden="true" />
            <div class="timeline__body">
              <p class="timeline__period">10/2025 – 12/2025</p>
              <h3 class="timeline__title">Frontend Intern</h3>
              <p class="timeline__place">
                <a href="https://winsoft.com.vn" target="_blank" rel="noopener noreferrer" class="about-link">Winsoft</a>
              </p>
              <p class="timeline__desc">
                Built a hospital management system focusing on the frontend layer.
                Stack: React.js, HTML, CSS.
              </p>
            </div>
          </li>

          <li class="timeline__item">
            <span class="timeline__dot timeline__dot--edu" aria-hidden="true" />
            <div class="timeline__body">
              <p class="timeline__period">10/2022 – 04/2026</p>
              <h3 class="timeline__title">Bachelor of Information Technology</h3>
              <p class="timeline__place">HUFLIT University</p>
              <p class="timeline__desc">
                GPA 2.83/4.0 · Ranked <em>Good</em> · TOEIC 605
              </p>
            </div>
          </li>
        </ol>
      </section>

      <!-- Contact -->
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
  background: none; border: none; cursor: pointer;
  transition: color var(--transition-base);
  padding: 0;
}
.about-nav__back:hover { color: var(--color-accent); }

/* Main */
.about-main {
  max-width: 820px;
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
  width: 2rem; height: 1px;
  background: var(--color-accent);
}
.about-hero__title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 300;
  line-height: 0.95;
  color: var(--color-text-primary);
}
.about-hero__title em { font-style: italic; color: var(--color-accent); }

/* Profile */
.about-profile {
  display: grid;
  grid-template-columns: 200px 1fr;
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
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}
.about-profile__avatar-overlay {
  position: absolute; inset: 0;
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
  font-size: 1rem;
  font-style: italic;
  color: var(--color-text-muted);
  border-left: 2px solid var(--color-accent);
  padding-left: var(--space-4);
}
.about-bio__text {
  font-family: var(--font-body);
  font-size: 0.92rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
}
.about-highlight {
  color: var(--color-text-primary);
  font-weight: 500;
}
.about-link {
  color: var(--color-accent);
  border-bottom: 1px solid rgba(201,169,110,0.3);
  transition: border-color var(--transition-base);
  text-decoration: none;
}
.about-link:hover { border-color: var(--color-accent); }

/* Credentials row */
.about-credentials {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  padding-top: var(--space-3);
  border-top: 1px solid rgba(107, 94, 72, 0.12);
  flex-wrap: wrap;
}
.about-credential {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.about-credential__value {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--color-text-primary);
  line-height: 1;
}
.about-credential__unit {
  font-size: 0.9rem;
  color: var(--color-text-muted);
}
.about-credential__label {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}
.about-credential__divider {
  width: 1px; height: 28px;
  background: rgba(107, 94, 72, 0.2);
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

/* Timeline */
.about-timeline { display: flex; flex-direction: column; }

.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  padding-left: var(--space-6);
}
.timeline::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: linear-gradient(to bottom, var(--color-accent), rgba(107,94,72,0.15));
}

.timeline__item {
  position: relative;
  padding-bottom: var(--space-8);
  padding-left: var(--space-5);
}
.timeline__item:last-child { padding-bottom: 0; }

.timeline__dot {
  position: absolute;
  left: -1px;
  top: 6px;
  width: 9px; height: 9px;
  border-radius: 50%;
  background: var(--color-accent);
  border: 2px solid var(--color-bg-base);
  box-shadow: 0 0 8px rgba(201,169,110,0.4);
  transform: translateX(-50%);
}
.timeline__dot--edu {
  background: var(--color-bg-base);
  border-color: var(--color-accent);
}

.timeline__period {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  color: var(--color-accent);
  margin-bottom: var(--space-1);
}
.timeline__title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 300;
  color: var(--color-text-primary);
  margin-bottom: 2px;
}
.timeline__place {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
  margin-bottom: var(--space-2);
}
.timeline__desc {
  font-family: var(--font-body);
  font-size: 0.88rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
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
  font-size: clamp(1.1rem, 2.5vw, 1.8rem);
  font-weight: 300;
  color: var(--color-text-primary);
  transition: color var(--transition-base);
  text-decoration: none;
}
.about-contact__email:hover { color: var(--color-accent); }

/* Social */
.about-social {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}
.about-social__link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: 0.68rem;
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
.about-social__icon { width: 0.9rem; height: 0.9rem; }

/* Responsive */
@media (max-width: 640px) {
  .about-main {
    padding: var(--space-12) var(--space-5) var(--space-10);
    gap: var(--space-10);
  }
  .about-nav { padding: var(--space-4) var(--space-5); }
  .about-profile { grid-template-columns: 1fr; }
  .about-profile__avatar-wrap { max-width: 180px; aspect-ratio: 1 / 1; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-in { opacity: 1 !important; transform: none !important; }
}
</style>
