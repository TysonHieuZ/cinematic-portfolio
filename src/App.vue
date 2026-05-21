<script setup>
import { RouterView, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useAppStore } from '@/stores/appStore'
import SideNav    from '@/components/ui/SideNav.vue'
import MusicPlayer from '@/components/ui/MusicPlayer.vue'
import gsap from 'gsap'

const appStore = useAppStore()
const router   = useRouter()

onMounted(() => {
  // Custom cursor
  const cursor = document.querySelector('.app-shell__cursor')
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power2.out' })
    })
  }

  // Fade body back in on every route change
  router.afterEach(() => {
    gsap.to('body', { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out', clearProps: 'all' })
  })
})
</script>

<template>
  <div class="app-shell" :style="{ '--color-accent': appStore.accentColor }">

    <!-- Custom cursor dot -->
    <div class="app-shell__cursor" aria-hidden="true" />

    <!-- Side navigation (desktop) -->
    <SideNav />

    <!-- Mobile top bar -->
    <div class="app-mobile-bar" aria-label="Mobile controls">
      <span class="app-mobile-bar__logo">HiếuZ.</span>
      <div class="app-mobile-bar__actions">
        <button
          class="app-mobile-bar__btn"
          :aria-label="appStore.isDark ? 'Light mode' : 'Dark mode'"
          type="button"
          @click="appStore.toggleTheme()"
        >
          <svg v-if="appStore.isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
        <button
          class="app-mobile-bar__btn app-mobile-bar__btn--locale"
          :aria-label="appStore.isVi ? 'Switch to English' : 'Tiếng Việt'"
          type="button"
          @click="appStore.toggleLocale()"
        >
          {{ appStore.isVi ? 'VI' : 'EN' }}
        </button>
      </div>
    </div>

    <!-- Main content — offset for side nav -->
    <div class="app-content">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>

    <!-- Music player -->
    <MusicPlayer />

  </div>
</template>

<style>
/* ── Page transition ── */
.page-enter-active { transition: opacity 0.35s ease, transform 0.35s ease; }
.page-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.page-enter-from   { opacity: 0; transform: translateY(16px); }
.page-leave-to     { opacity: 0; transform: translateY(-8px) scale(0.98); }

/* ── Custom cursor ── */
.app-shell__cursor {
  position: fixed;
  top: 0; left: 0;
  width: 8px; height: 8px;
  background: var(--color-accent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
  will-change: transform;
}
@media (hover: none) { .app-shell__cursor { display: none; } }

/* ── Shell ── */
.app-shell { position: relative; min-height: 100vh; }

/* ── Content offset for side nav ── */
.app-content {
  padding-left: 56px;
}
@media (max-width: 768px) {
  .app-content { padding-left: 0; padding-top: 52px; }
}

/* ── Mobile top bar ── */
.app-mobile-bar {
  display: none;
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  height: 52px;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-5);
  background: rgba(var(--nav-bg-rgb), 0.9);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(var(--border-rgb), 0.12);
}
@media (max-width: 768px) {
  .app-mobile-bar { display: flex; }
}

.app-mobile-bar__logo {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 300;
  color: var(--color-text-primary);
}

.app-mobile-bar__actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.app-mobile-bar__btn {
  display: grid;
  place-items: center;
  width: 36px; height: 36px;
  border-radius: var(--radius-sm);
  background: none;
  border: 1px solid rgba(var(--border-rgb), 0.15);
  cursor: pointer;
  color: var(--color-text-muted);
  transition: all var(--transition-base);
}
.app-mobile-bar__btn:hover { color: var(--color-accent); border-color: rgba(201,169,110,0.3); }
.app-mobile-bar__btn svg { width: 16px; height: 16px; }
.app-mobile-bar__btn--locale {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
}
</style>
