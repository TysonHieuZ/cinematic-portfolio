<script setup>
defineProps({
  formattedTime: { type: String, required: true },
  formattedDate: { type: String, required: true },
  timeZoneLabel: { type: String, default: '' },
  isTicking:     { type: Boolean, default: false },
})
</script>

<template>
  <footer class="footer-clock" aria-label="Current local time" role="contentinfo">
    <time class="footer-clock__time" :datetime="formattedTime" aria-live="off">
      {{ formattedTime }}
    </time>

    <span class="footer-clock__sep" aria-hidden="true">·</span>

    <span class="footer-clock__date">{{ formattedDate }}</span>

    <span
      v-if="timeZoneLabel"
      class="footer-clock__tz"
      :aria-label="`Timezone: ${timeZoneLabel}`"
    >
      {{ timeZoneLabel }}
    </span>

    <span v-if="isTicking" class="footer-clock__pulse" aria-hidden="true" />
  </footer>
</template>

<style scoped>
.footer-clock {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-8);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  border-top: 1px solid rgba(107, 94, 72, 0.15);
}

.footer-clock__time {
  font-variant-numeric: tabular-nums;
  color: var(--color-text-secondary);
}

.footer-clock__sep { opacity: 0.3; }

.footer-clock__tz {
  padding: 0.1em 0.45em;
  background: rgba(201, 169, 110, 0.1);
  color: var(--color-accent);
  border-radius: 2px;
  font-size: 0.6rem;
  letter-spacing: 0.12em;
}

.footer-clock__pulse {
  display: inline-block;
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--color-accent);
  animation: tick 1s ease-in-out infinite;
}

@keyframes tick {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.2; transform: scale(0.5); }
}

@media (prefers-reduced-motion: reduce) {
  .footer-clock__pulse { animation: none; }
}
</style>
