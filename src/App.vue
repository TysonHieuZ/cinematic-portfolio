<script setup>
import { RouterView, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useAppStore } from '@/stores/appStore'
import gsap from 'gsap'

const appStore = useAppStore()
const router = useRouter()

// ─── Custom cursor ────────────────────────────────────────────────────────────
onMounted(() => {
  const cursor = document.querySelector('.app-shell__cursor')
  if (!cursor) return

  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.15,
      ease: 'power2.out',
    })
  })

  // Fade body back in on every route change (fixes black screen bug)
  router.afterEach(() => {
    gsap.to('body', { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out', clearProps: 'all' })
  })
})
</script>

<template>
  <div
    class="app-shell"
    :style="{ '--color-accent': appStore.accentColor }"
  >
    <!-- Custom cursor dot -->
    <div class="app-shell__cursor" aria-hidden="true" />

    <!-- Router outlet with CSS transition -->
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<style>
/* ── Page transition ── */
.page-enter-active { transition: opacity 0.35s ease, transform 0.35s ease; }
.page-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.page-enter-from   { opacity: 0; transform: translateY(20px); }
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

.app-shell { position: relative; min-height: 100vh; }

@media (hover: none) {
  /* Hide cursor on touch devices */
  .app-shell__cursor { display: none; }
}
</style>
