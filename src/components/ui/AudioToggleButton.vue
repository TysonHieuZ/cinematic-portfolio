<script setup>
defineProps({
  isPlaying: { type: Boolean, required: true },
  isMuted:   { type: Boolean, default: false },
  ariaLabel: { type: String, default: 'Toggle ambient audio' },
})

defineEmits({ togglePlayback: null, toggleMute: null })
</script>

<template>
  <div class="audio-toggle" role="group" :aria-label="ariaLabel">
    <button
      class="audio-toggle__btn"
      :class="{ 'audio-toggle__btn--active': isPlaying }"
      :aria-label="isPlaying ? 'Pause audio' : 'Play audio'"
      :aria-pressed="isPlaying"
      type="button"
      @click="$emit('togglePlayback')"
    >
      <!-- Animated bars when playing -->
      <span v-if="isPlaying" class="audio-toggle__bars" aria-hidden="true">
        <span class="audio-toggle__bar" />
        <span class="audio-toggle__bar" />
        <span class="audio-toggle__bar" />
        <span class="audio-toggle__bar" />
      </span>
      <!-- Play icon when paused -->
      <svg v-else viewBox="0 0 24 24" class="audio-toggle__icon" aria-hidden="true" fill="currentColor">
        <polygon points="6,4 20,12 6,20"/>
      </svg>
    </button>

    <button
      v-if="isPlaying"
      class="audio-toggle__mute"
      :aria-label="isMuted ? 'Unmute' : 'Mute'"
      :aria-pressed="isMuted"
      type="button"
      @click="$emit('toggleMute')"
    >
      <svg v-if="isMuted" viewBox="0 0 24 24" class="audio-toggle__icon audio-toggle__icon--sm" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/>
        <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
      </svg>
      <svg v-else viewBox="0 0 24 24" class="audio-toggle__icon audio-toggle__icon--sm" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.audio-toggle {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.audio-toggle__btn {
  display: grid;
  place-items: center;
  width: 2.5rem; height: 2.5rem;
  background: rgba(26, 24, 18, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(107, 94, 72, 0.3);
  border-radius: 50%;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all var(--transition-base);
}

.audio-toggle__btn:hover { color: var(--color-text-primary); transform: scale(1.08); }
.audio-toggle__btn--active { border-color: var(--color-accent); color: var(--color-accent); }

.audio-toggle__mute {
  display: grid;
  place-items: center;
  width: 1.8rem; height: 1.8rem;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: color var(--transition-base);
  background: none; border: none;
}
.audio-toggle__mute:hover { color: var(--color-text-secondary); }

.audio-toggle__icon { width: 0.9rem; height: 0.9rem; }
.audio-toggle__icon--sm { width: 0.8rem; height: 0.8rem; }

/* Animated sound bars */
.audio-toggle__bars {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 14px;
}
.audio-toggle__bar {
  width: 2px;
  background: currentColor;
  border-radius: 1px;
  animation: soundbar 0.8s ease-in-out infinite alternate;
}
.audio-toggle__bar:nth-child(1) { height: 6px;  animation-delay: 0s; }
.audio-toggle__bar:nth-child(2) { height: 12px; animation-delay: 0.15s; }
.audio-toggle__bar:nth-child(3) { height: 8px;  animation-delay: 0.05s; }
.audio-toggle__bar:nth-child(4) { height: 10px; animation-delay: 0.2s; }

@keyframes soundbar {
  from { transform: scaleY(0.3); }
  to   { transform: scaleY(1); }
}

@media (prefers-reduced-motion: reduce) {
  .audio-toggle__bar { animation: none; height: 8px; }
  .audio-toggle__btn { transition: none; }
}
</style>
