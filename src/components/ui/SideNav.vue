<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'

const route  = useRoute()
const router = useRouter()
const store  = useAppStore()

const t = computed(() => store.isVi
  ? { home: 'Trang chủ', work: 'Dự án', about: 'Về tôi', contact: 'Liên hệ' }
  : { home: 'Home',      work: 'Work',   about: 'About',  contact: 'Contact' },
)

const links = computed(() => [
  { path: '/',         label: t.value.home,    icon: 'home'    },
  { path: '/projects', label: t.value.work,    icon: 'work'    },
  { path: '/about',    label: t.value.about,   icon: 'about'   },
  { path: '/contact',  label: t.value.contact, icon: 'contact' },
])

function navigate(path) { router.push(path) }
function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <nav class="side-nav" aria-label="Site navigation">
    <!-- Logo dot -->
    <div class="side-nav__logo" aria-hidden="true">
      <span class="side-nav__logo-dot" />
    </div>

    <!-- Links -->
    <ul class="side-nav__links">
      <li v-for="link in links" :key="link.path">
        <button
          class="side-nav__item"
          :class="{ 'side-nav__item--active': isActive(link.path) }"
          :aria-label="link.label"
          :aria-current="isActive(link.path) ? 'page' : undefined"
          type="button"
          @click="navigate(link.path)"
        >
          <!-- Icon -->
          <span class="side-nav__icon" aria-hidden="true">
            <!-- Home -->
            <svg v-if="link.icon === 'home'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
              <path d="M9 21V12h6v9"/>
            </svg>
            <!-- Work -->
            <svg v-else-if="link.icon === 'work'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="2" y="7" width="20" height="14" rx="2"/>
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
            </svg>
            <!-- About -->
            <svg v-else-if="link.icon === 'about'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
            <!-- Contact -->
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>          </span>

          <!-- Tooltip label -->
          <span class="side-nav__tooltip">{{ link.label }}</span>

          <!-- Active indicator -->
          <span v-if="isActive(link.path)" class="side-nav__active-bar" aria-hidden="true" />
        </button>
      </li>
    </ul>

    <!-- Bottom controls: theme + locale -->
    <div class="side-nav__controls">
      <!-- Theme toggle -->
      <button
        class="side-nav__ctrl-btn"
        :aria-label="store.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        type="button"
        @click="store.toggleTheme()"
      >
        <svg v-if="store.isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
        <span class="side-nav__tooltip">{{ store.isDark ? 'Light mode' : 'Dark mode' }}</span>
      </button>

      <!-- Locale toggle -->
      <button
        class="side-nav__ctrl-btn side-nav__ctrl-btn--locale"
        :aria-label="store.isVi ? 'Switch to English' : 'Chuyển sang Tiếng Việt'"
        type="button"
        @click="store.toggleLocale()"
      >
        <span class="side-nav__locale-label">{{ store.isVi ? 'VI' : 'EN' }}</span>
        <span class="side-nav__tooltip">{{ store.isVi ? 'English' : 'Tiếng Việt' }}</span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.side-nav {
  position: fixed;
  left: 0; top: 0; bottom: 0;
  width: 56px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-5) 0;
  background: rgba(var(--nav-bg-rgb), 0.85);
  backdrop-filter: blur(16px);
  border-right: 1px solid rgba(var(--border-rgb), 0.12);
  gap: var(--space-4);
}

/* Logo dot */
.side-nav__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px; height: 32px;
  margin-bottom: var(--space-2);
}
.side-nav__logo-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 10px rgba(201,169,110,0.5);
}

/* Links */
.side-nav__links {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  flex: 1;
}

.side-nav__item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; height: 40px;
  border-radius: var(--radius-sm);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-muted);
  transition: color var(--transition-base), background var(--transition-base);
}
.side-nav__item:hover {
  color: var(--color-text-primary);
  background: rgba(var(--border-rgb), 0.08);
}
.side-nav__item--active {
  color: var(--color-accent);
}

.side-nav__icon svg {
  width: 18px; height: 18px;
}

/* Active bar */
.side-nav__active-bar {
  position: absolute;
  left: -8px; top: 50%;
  transform: translateY(-50%);
  width: 3px; height: 20px;
  background: var(--color-accent);
  border-radius: 0 2px 2px 0;
  box-shadow: 2px 0 8px rgba(201,169,110,0.4);
}

/* Tooltip */
.side-nav__tooltip {
  position: absolute;
  left: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%);
  background: var(--color-surface-raised);
  color: var(--color-text-primary);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  white-space: nowrap;
  padding: 0.3em 0.7em;
  border-radius: var(--radius-xs);
  border: 1px solid rgba(var(--border-rgb), 0.15);
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--transition-fast);
  z-index: 300;
}
.side-nav__item:hover .side-nav__tooltip,
.side-nav__ctrl-btn:hover .side-nav__tooltip {
  opacity: 1;
}

/* Bottom controls */
.side-nav__controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.side-nav__ctrl-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px; height: 36px;
  border-radius: var(--radius-sm);
  background: none;
  border: 1px solid rgba(var(--border-rgb), 0.15);
  cursor: pointer;
  color: var(--color-text-muted);
  transition: all var(--transition-base);
}
.side-nav__ctrl-btn:hover {
  color: var(--color-accent);
  border-color: rgba(201,169,110,0.3);
}
.side-nav__ctrl-btn svg { width: 15px; height: 15px; }

.side-nav__ctrl-btn--locale { font-family: var(--font-mono); }
.side-nav__locale-label {
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  font-weight: 500;
}

/* Hide on mobile — use top nav instead */
@media (max-width: 768px) {
  .side-nav { display: none; }
}
</style>
