<script setup>
import { computed } from 'vue'

const props = defineProps({
  title:       { type: String, required: true },
  category:    { type: String, required: true },
  year:        { type: [String, Number], required: true },
  description: { type: String, default: '' },
  tags:        { type: Array, default: () => [] },
  index:       { type: Number, default: 0 },
})

// Subtle accent variation per card
const swatchColors = ['#c9a96e', '#8b9e7a', '#7a8b9e', '#9e7a8b']
const swatchColor = computed(() => swatchColors[props.index % swatchColors.length])

const emit = defineEmits({ hoverChange: (val) => typeof val === 'boolean' })

function handleMouseEnter() { emit('hoverChange', true) }
function handleMouseLeave() { emit('hoverChange', false) }
</script>

<template>
  <article
    class="project-card"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Index number -->
    <span class="project-card__number">{{ String(index + 1).padStart(2, '0') }}</span>

    <!-- Gradient swatch area -->
    <div class="project-card__swatch" aria-hidden="true">
      <div class="project-card__swatch-inner" :style="{ background: `linear-gradient(135deg, ${swatchColor}, transparent)` }" />
    </div>

    <div class="project-card__body">
      <header class="project-card__header">
        <p class="project-card__category">{{ category }} · {{ year }}</p>
        <h3 class="project-card__title">{{ title }}</h3>
      </header>

      <p v-if="description" class="project-card__desc">{{ description }}</p>

      <footer class="project-card__footer">
        <ul class="project-card__tags" aria-label="Technologies">
          <li v-for="tag in tags" :key="tag" class="project-card__tag">{{ tag }}</li>
        </ul>
        <span class="project-card__arrow" aria-hidden="true">↗</span>
      </footer>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-5);
  padding: var(--space-6);
  background: var(--color-surface-raised);
  border: 1px solid rgba(107, 94, 72, 0.12);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: border-color var(--transition-slow), box-shadow var(--transition-slow), transform var(--transition-slow);
  overflow: hidden;
}

.project-card:hover {
  border-color: rgba(201, 169, 110, 0.3);
  box-shadow: var(--shadow-md), var(--shadow-glow);
  transform: translateY(-4px);
}

.project-card__number {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--color-text-muted);
  letter-spacing: 0.1em;
  padding-top: 2px;
}

.project-card__swatch {
  position: absolute;
  top: 0; right: 0;
  width: 120px; height: 100%;
  opacity: 0.06;
  transition: opacity var(--transition-slow);
}

.project-card:hover .project-card__swatch { opacity: 0.12; }

.project-card__swatch-inner {
  width: 100%; height: 100%;
  /* color set dynamically via :style */
}

.project-card__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.project-card__category {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.project-card__title {
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  font-weight: 300;
  line-height: 1.1;
  color: var(--color-text-primary);
  transition: color var(--transition-base);
}

.project-card:hover .project-card__title { color: var(--color-accent); }

.project-card__desc {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.project-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--space-2);
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.project-card__tag {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  padding: 0.15em 0.5em;
  border: 1px solid rgba(107, 94, 72, 0.25);
  border-radius: var(--radius-xs);
}

.project-card__arrow {
  color: var(--color-text-muted);
  font-size: 1rem;
  transition: color var(--transition-base), transform var(--transition-base);
}
.project-card:hover .project-card__arrow {
  color: var(--color-accent);
  transform: translate(2px, -2px);
}

@media (prefers-reduced-motion: reduce) {
  .project-card { transition: none; }
  .project-card__arrow { transition: none; }
}
</style>
