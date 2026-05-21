<script setup>
defineProps({
  isOverlayOpen: { type: Boolean, default: false },
  thumbnailSrc:  { type: String, default: '' },
  thumbnailAlt:  { type: String, default: 'Showreel thumbnail' },
})

const emit = defineEmits({
  openOverlay:  null,
  closeOverlay: null,
  hoverChange:  (val) => typeof val === 'boolean',
})

function handleOpenOverlay() { emit('openOverlay') }
function handleCloseOverlay() { emit('closeOverlay') }
function handleMouseEnter() { emit('hoverChange', true) }
function handleMouseLeave() { emit('hoverChange', false) }
</script>

<template>
  <div class="reel-frame" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">

    <!-- Reel thumbnail button -->
    <button
      class="reel-frame__trigger"
      aria-label="Watch showreel video"
      type="button"
      @click="handleOpenOverlay"
    >
      <!-- Gradient placeholder (no real video needed to run) -->
      <div class="reel-frame__thumbnail">
        <div class="reel-frame__gradient" aria-hidden="true" />
        <img
          v-if="thumbnailSrc"
          :src="thumbnailSrc"
          :alt="thumbnailAlt"
          class="reel-frame__img"
          loading="lazy"
        />
      </div>

      <!-- Play button overlay -->
      <span class="reel-frame__play" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor" class="reel-frame__play-icon">
          <polygon points="6,4 20,12 6,20"/>
        </svg>
      </span>

      <!-- Corner decorations -->
      <span class="reel-frame__corner reel-frame__corner--tl" aria-hidden="true" />
      <span class="reel-frame__corner reel-frame__corner--br" aria-hidden="true" />
    </button>

    <!-- Label -->
    <p class="reel-frame__label" aria-hidden="true">
      <span class="reel-frame__label-dot" />
      Showreel 2026
    </p>

    <!-- Overlay / Lightbox -->
    <Teleport to="body">
      <div
        v-if="isOverlayOpen"
        class="reel-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Showreel video"
        @click.self="handleCloseOverlay"
      >
        <button
          class="reel-overlay__close"
          aria-label="Close showreel"
          type="button"
          @click="handleCloseOverlay"
        >
          ✕
        </button>

        <div class="reel-overlay__content">
          <!-- Placeholder — replace src with real embed URL -->
          <div class="reel-overlay__placeholder">
            <p>🎬 Showreel video embed goes here</p>
            <p class="reel-overlay__hint">Replace with an iframe or video tag</p>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<style scoped>
.reel-frame {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.reel-frame__trigger {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 1px solid rgba(201, 169, 110, 0.15);
  border-radius: var(--radius-sm);
  overflow: hidden;
  cursor: pointer;
  background: var(--color-surface-raised);
  transition: border-color var(--transition-slow), box-shadow var(--transition-slow);
}

.reel-frame__trigger:hover {
  border-color: rgba(201, 169, 110, 0.4);
  box-shadow: var(--shadow-glow);
}

.reel-frame__thumbnail { position: absolute; inset: 0; }

.reel-frame__gradient {
  position: absolute; inset: 0;
  background: linear-gradient(
    135deg,
    #1a1410 0%,
    #0f0e0a 40%,
    #1c1508 70%,
    #0a0905 100%
  );
}

.reel-frame__img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0.6;
  transition: opacity var(--transition-slow);
}
.reel-frame__trigger:hover .reel-frame__img { opacity: 0.8; }

.reel-frame__play {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: var(--color-accent);
  transition: transform var(--transition-base);
}
.reel-frame__trigger:hover .reel-frame__play { transform: scale(1.15); }

.reel-frame__play-icon { width: 2.5rem; height: 2.5rem; }

/* Corner brackets */
.reel-frame__corner {
  position: absolute;
  width: 16px; height: 16px;
  border-color: var(--color-accent);
  border-style: solid;
  opacity: 0.6;
}
.reel-frame__corner--tl { top: 6px; left: 6px; border-width: 1px 0 0 1px; }
.reel-frame__corner--br { bottom: 6px; right: 6px; border-width: 0 1px 1px 0; }

.reel-frame__label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.reel-frame__label-dot {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: var(--color-accent);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; } 50% { opacity: 0.3; }
}

/* Overlay */
.reel-overlay {
  position: fixed; inset: 0;
  background: rgba(10, 9, 5, 0.95);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: grid;
  place-items: center;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.reel-overlay__close {
  position: absolute;
  top: var(--space-8); right: var(--space-8);
  width: 2.5rem; height: 2.5rem;
  border-radius: 50%;
  border: 1px solid var(--color-text-muted);
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all var(--transition-base);
}
.reel-overlay__close:hover { border-color: var(--color-accent); color: var(--color-accent); }

.reel-overlay__content {
  width: min(90vw, 900px);
  aspect-ratio: 16 / 9;
}

.reel-overlay__placeholder {
  width: 100%; height: 100%;
  background: var(--color-surface-raised);
  border: 1px solid rgba(201, 169, 110, 0.2);
  border-radius: var(--radius-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: 0.9rem;
}

.reel-overlay__hint { color: var(--color-text-muted); font-size: 0.75rem; }

@media (prefers-reduced-motion: reduce) {
  .reel-frame__label-dot { animation: none; }
  .reel-frame__trigger { transition: none; }
}
</style>
