<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useCinematicScroll } from '@/composables/useCinematicScroll'
import ProjectCard from '@/components/projects/ProjectCard.vue'

const router = useRouter()
const { animateProjectCardReveal } = useCinematicScroll()

const cardRefs = ref([])

const projects = [
  {
    title: 'AiHR — Phần mềm Nhân sự',
    category: 'Web Application',
    year: '2026',
    description:
      'Hệ thống quản lý nhân sự toàn diện cho doanh nghiệp Việt Nam. Tham gia phát triển giao diện người dùng với Vue 3, TypeScript và Composition API tại công ty AiHR.',
    tags: ['Vue 3', 'TypeScript', 'Composition API'],
    link: 'https://aihr.vn',
  },
]

function handleNavigateHome() {
  router.push('/')
}

onMounted(() => {
  const cards = cardRefs.value.filter(Boolean)
  cards.forEach((card, index) => {
    animateProjectCardReveal(card, index)
  })
})
</script>

<template>
  <div class="projects-page">
    <nav class="projects-nav" aria-label="Page navigation">
      <button class="projects-nav__back" type="button" @click="handleNavigateHome">
        ← Back
      </button>
      <span class="projects-nav__title">Selected Work</span>
    </nav>

    <main class="projects-main">
      <header class="projects-header">
        <p class="projects-header__eyebrow">
          <span class="projects-header__line" aria-hidden="true" />
          Portfolio · {{ projects.length }} Project
        </p>
        <h1 class="projects-header__title">Selected<br /><em>Work</em></h1>
        <p class="projects-header__note">
          Just getting started — more projects on the way.
        </p>
      </header>

      <ul class="projects-grid" aria-label="Project list">
        <li
          v-for="(project, index) in projects"
          :key="project.title"
          :ref="(el) => { if (el) cardRefs[index] = el }"
        >
          <ProjectCard
            :title="project.title"
            :category="project.category"
            :year="project.year"
            :description="project.description"
            :tags="project.tags"
            :link="project.link"
            :index="index"
          />
        </li>
      </ul>

      <!-- Coming soon placeholder -->
      <div class="projects-coming">
        <span class="projects-coming__line" aria-hidden="true" />
        <p class="projects-coming__text">More coming soon</p>
        <span class="projects-coming__line" aria-hidden="true" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.projects-page {
  min-height: 100vh;
  background: var(--color-bg-base);
  display: flex;
  flex-direction: column;
}

.projects-nav {
  position: sticky;
  top: 0; z-index: 10;
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding: var(--space-5) var(--space-8);
  background: rgba(10, 9, 5, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(107, 94, 72, 0.1);
}

.projects-nav__back {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: var(--color-text-muted);
  background: none; border: none; cursor: pointer;
  transition: color var(--transition-base);
}
.projects-nav__back:hover { color: var(--color-accent); }

.projects-nav__title {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.projects-main {
  flex: 1;
  padding: var(--space-16) var(--space-8);
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.projects-header {
  margin-bottom: var(--space-12);
}

.projects-header__eyebrow {
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

.projects-header__line {
  display: inline-block;
  width: 2rem; height: 1px;
  background: var(--color-accent);
}

.projects-header__title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 300;
  line-height: 0.95;
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
}
.projects-header__title em {
  font-style: italic;
  color: var(--color-accent);
}

.projects-header__note {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
}

.projects-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* Coming soon */
.projects-coming {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  margin-top: var(--space-12);
  opacity: 0.4;
}

.projects-coming__line {
  flex: 1;
  height: 1px;
  background: rgba(107, 94, 72, 0.3);
}

.projects-coming__text {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  white-space: nowrap;
}

@media (max-width: 640px) {
  .projects-main { padding: var(--space-8) var(--space-4); }
}
</style>
