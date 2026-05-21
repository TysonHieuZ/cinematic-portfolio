<script setup>
defineProps({
  label: { type: String, default: 'Scroll to explore' },
})
</script>

<template>
  <div class="scroll-cue" :aria-label="label" role="presentation">
    <span class="scroll-cue__text" aria-hidden="true">Scroll</span>
    <div class="scroll-cue__track" aria-hidden="true">
      <div class="scroll-cue__dot" />
    </div>
  </div>
</template>

<style scoped>
.scroll-cue {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.scroll-cue__text {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  writing-mode: vertical-rl;
}

.scroll-cue__track {
  width: 1px;
  height: 56px;
  background: rgba(107, 94, 72, 0.25);
  position: relative;
  overflow: hidden;
  border-radius: 1px;
}

.scroll-cue__dot {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 8px;
  background: var(--color-accent);
  border-radius: 2px;
  animation: scroll-drop 1.8s ease-in-out infinite;
}

@keyframes scroll-drop {
  0%   { top: -8px; opacity: 0; }
  20%  { opacity: 1; }
  80%  { opacity: 1; }
  100% { top: 56px; opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-cue__dot { animation: none; top: 24px; opacity: 1; }
}
</style>
