<script setup>
defineProps({
  accentColor: { type: String, default: '#c9a96e' },
  roleLabel:   { type: String, default: 'Portfolio headline' },
  isVi:        { type: Boolean, default: false },
})
</script>

<template>
  <header class="hero-headline" :aria-label="roleLabel">
    <p class="hero-headline__eyebrow">
      <span class="hero-headline__line" aria-hidden="true" />
      {{ isVi ? 'Lập trình viên Frontend · 2026' : 'Frontend Developer · 2026' }}
    </p>
    <h1 class="hero-headline__title">
      <span class="hero-headline__title-row">Nguyễn</span>
      <span class="hero-headline__title-row hero-headline__title-row--accent">Hữu Hiếu</span>
      <span class="hero-headline__title-row hero-headline__title-row--sm">
        — {{ isVi ? 'Intern Lập trình viên Frontend' : 'Intern Frontend Developer' }}
      </span>
    </h1>
  </header>
</template>

<style scoped>
.hero-headline {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  overflow: hidden;
}

.hero-headline__eyebrow {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.hero-headline__line {
  display: inline-block;
  width: 2rem;
  height: 1px;
  background: var(--color-accent);
}

.hero-headline__title {
  display: flex;
  flex-direction: column;
  gap: 0;
  font-family: var(--font-display);
  font-weight: 300;
  font-size: clamp(3.5rem, 9vw, 8.5rem);
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
}

.hero-headline__title-row {
  display: block;
  overflow: hidden;
}

.hero-headline__title-row--accent {
  font-style: italic;
  color: var(--color-accent);
}

.hero-headline__title-row--sm {
  font-size: clamp(1rem, 2.2vw, 1.8rem);
  font-style: normal;
  color: var(--color-text-muted);
  margin-top: var(--space-3);
  letter-spacing: 0.01em;
}
</style>
