<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useCinematicScroll } from '@/composables/useCinematicScroll'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import BaseButton  from '@/components/ui/BaseButton.vue'

const router = useRouter()
const { animateFadeUpBatch, animateProjectCardReveal } = useCinematicScroll()

const cardRefs = ref([])

const projects = [
  {
    title: 'Noir Collective',
    category: 'Brand Identity',
    year: '2026',
    description: 'A cinematic brand system built around shadow, contrast, and monochrome depth.',
    tags: ['Vue 3', 'GSAP', 'Figma'],
  },
  {
    title: 'Obsidian Dashboard',
    category: 'Web Application',
    year: '2025',
    description: 'Real-time analytics interface with dark-glass aesthetic and fluid data visualisations.',
    tags: ['Pinia', 'D3.js', 'Tailwind'],
  },
  {
    title: 'Lumière Studio',
    category: 'Photography Portfolio',
    year: '2025',
    description: 'Editorial-grade portfolio with film-grain textures and magazine-style layout.',
    tags: ['Vue 3', 'GSAP ScrollTrigger', 'CSS Grid'],
  },
  {
    title: 'Signal & Noise',
    category: 'Music Platform',
    year: '2024',
    description: 'Ambient music player with waveform visualisation and spatial audio controls.',
    tags: ['Web Audio API', 'Canvas', 'Vue 3'],
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
          Portfolio · {{ projects.length }} Projects
        </p>
        <h1 class="projects-header__title">Selected<br /><em>Work</em></h1>
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
            :index="index"
          />
        </li>
      </ul>
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
}
.projects-header__title em {
  font-style: italic;
  color: var(--color-accent);
}

.projects-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

@media (max-width: 640px) {
  .projects-main { padding: var(--space-8) var(--space-4); }
}
</style>
