<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import gsap from 'gsap'

const router  = useRouter()
const store   = useAppStore()
const contentRef = ref(null)

const t = computed(() => store.isVi ? {
  eyebrow:  'Liên hệ',
  title1:   'Kết nối',
  title2:   'với tôi',
  subtitle: 'Sẵn sàng cho các cơ hội mới. Hãy liên hệ qua bất kỳ kênh nào bên dưới.',
  work:     'Liên hệ công việc',
  social:   'Mạng xã hội & Code',
  copy:     'Sao chép',
  copied:   'Đã sao chép!',
  back:     '← Quay lại',
} : {
  eyebrow:  'Contact',
  title1:   'Get in',
  title2:   'touch',
  subtitle: 'Open to new opportunities. Reach out through any channel below.',
  work:     'Work Contact',
  social:   'Social & Code',
  copy:     'Copy',
  copied:   'Copied!',
  back:     '← Back',
})

// ── Contact items ─────────────────────────────────────────────────────────────
const workContacts = [
  {
    id: 'gmail',
    label: 'Gmail',
    value: 'huuhieuz2310@gmail.com',
    hint: computed(() => store.isVi ? 'Liên hệ công việc' : 'Contact for work'),
    href: 'mailto:huuhieuz2310@gmail.com',
    color: '#EA4335',
    icon: 'gmail',
  },
  {
    id: 'zalo',
    label: 'Zalo',
    value: '0865 871 703',
    hint: computed(() => store.isVi ? 'Nhắn tin Zalo' : 'Message on Zalo'),
    href: 'https://zalo.me/0865871703',
    color: '#0068FF',
    icon: 'zalo',
  },
  {
    id: 'teams',
    label: 'Microsoft Teams',
    value: 'hai2003nkp@gmail.com',
    hint: computed(() => store.isVi ? 'Họp qua Teams' : 'Meet on Teams'),
    href: 'https://teams.microsoft.com/l/chat/0/0?users=hai2003nkp@gmail.com',
    color: '#6264A7',
    icon: 'teams',
  },
]

const socialContacts = [
  {
    id: 'github',
    label: 'GitHub',
    value: 'TysonHieuZ',
    hint: computed(() => store.isVi ? 'Xem code của tôi' : 'See my code'),
    href: 'https://github.com/TysonHieuZ',
    color: '#c9a96e',
    icon: 'github',
  },
  {
    id: 'gitlab',
    label: 'GitLab',
    value: 'TysonHieuZ',
    hint: computed(() => store.isVi ? 'Xem dự án' : 'View projects'),
    href: 'https://gitlab.com/TysonHieuZ',
    color: '#FC6D26',
    icon: 'gitlab',
  },
  {
    id: 'discord',
    label: 'Discord',
    value: 'TysonHieuZ',
    hint: computed(() => store.isVi ? 'Chat Discord' : 'Chat on Discord'),
    href: 'https://discord.com/users/TysonHieuZ',
    color: '#5865F2',
    icon: 'discord',
  },
]

// ── Copy to clipboard ─────────────────────────────────────────────────────────
const copiedId = ref('')
async function copyToClipboard(text, id) {
  try {
    await navigator.clipboard.writeText(text)
    copiedId.value = id
    setTimeout(() => { copiedId.value = '' }, 2000)
  } catch {
    // fallback
    const el = document.createElement('textarea')
    el.value = text
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    copiedId.value = id
    setTimeout(() => { copiedId.value = '' }, 2000)
  }
}

onMounted(() => {
  if (!contentRef.value) return
  const els = contentRef.value.querySelectorAll('.animate-in')
  gsap.fromTo(els,
    { opacity: 0, y: 28 },
    { opacity: 1, y: 0, duration: 0.85, stagger: 0.1, ease: 'power3.out', delay: 0.05 },
  )
})
</script>

<template>
  <div class="contact-page">
    <nav class="contact-nav" aria-label="Page navigation">
      <button class="contact-nav__back" type="button" @click="router.push('/')">
        {{ t.back }}
      </button>
    </nav>

    <main ref="contentRef" class="contact-main">

      <!-- Hero -->
      <section class="contact-hero animate-in">
        <p class="contact-hero__eyebrow">
          <span class="contact-hero__line" aria-hidden="true" />
          {{ t.eyebrow }}
        </p>
        <h1 class="contact-hero__title">
          {{ t.title1 }}<br /><em>{{ t.title2 }}</em>
        </h1>
        <p class="contact-hero__subtitle">{{ t.subtitle }}</p>
      </section>

      <!-- Work contacts -->
      <section class="contact-group animate-in" aria-label="Work contacts">
        <p class="contact-group__label">{{ t.work }}</p>
        <ul class="contact-list">
          <li v-for="item in workContacts" :key="item.id" class="contact-item">
            <a
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-item__link"
              :style="{ '--item-color': item.color }"
            >
              <!-- Icon -->
              <span class="contact-item__icon-wrap" aria-hidden="true">
                <!-- Gmail -->
                <svg v-if="item.icon === 'gmail'" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
                <!-- Zalo -->
                <svg v-else-if="item.icon === 'zalo'" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 16.43c-.195.195-.512.195-.707 0l-2.829-2.828-2.828 2.828a.5.5 0 0 1-.707-.707l2.828-2.828-2.828-2.829a.5.5 0 0 1 .707-.707l2.828 2.829 2.829-2.829a.5.5 0 0 1 .707.707l-2.829 2.829 2.829 2.828a.5.5 0 0 1 0 .707zM7.5 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 10a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </svg>
                <!-- Teams -->
                <svg v-else-if="item.icon === 'teams'" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.625 7.5h-4.5a.375.375 0 0 0-.375.375v6.75c0 .207.168.375.375.375h4.5A.375.375 0 0 0 21 14.625v-6.75A.375.375 0 0 0 20.625 7.5zM18 6.75a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75zM3 9.375A2.625 2.625 0 0 1 5.625 6.75h5.25A2.625 2.625 0 0 1 13.5 9.375v5.25A2.625 2.625 0 0 1 10.875 17.25h-5.25A2.625 2.625 0 0 1 3 14.625v-5.25zM8.25 5.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5z"/>
                </svg>
              </span>

              <div class="contact-item__body">
                <span class="contact-item__label">{{ item.label }}</span>
                <span class="contact-item__value">{{ item.value }}</span>
                <span class="contact-item__hint">{{ item.hint.value }}</span>
              </div>

              <span class="contact-item__arrow" aria-hidden="true">↗</span>
            </a>

            <!-- Copy button -->
            <button
              class="contact-item__copy"
              :aria-label="`Copy ${item.label}`"
              type="button"
              @click.prevent="copyToClipboard(item.value, item.id)"
            >
              <svg v-if="copiedId === item.id" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              <span class="contact-item__copy-label">
                {{ copiedId === item.id ? t.copied : t.copy }}
              </span>
            </button>
          </li>
        </ul>
      </section>

      <!-- Social contacts -->
      <section class="contact-group animate-in" aria-label="Social contacts">
        <p class="contact-group__label">{{ t.social }}</p>
        <ul class="contact-list">
          <li v-for="item in socialContacts" :key="item.id" class="contact-item">
            <a
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-item__link"
              :style="{ '--item-color': item.color }"
            >
              <span class="contact-item__icon-wrap" aria-hidden="true">
                <!-- GitHub -->
                <svg v-if="item.icon === 'github'" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                <!-- GitLab -->
                <svg v-else-if="item.icon === 'gitlab'" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
                </svg>
                <!-- Discord -->
                <svg v-else-if="item.icon === 'discord'" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </span>

              <div class="contact-item__body">
                <span class="contact-item__label">{{ item.label }}</span>
                <span class="contact-item__value">{{ item.value }}</span>
                <span class="contact-item__hint">{{ item.hint.value }}</span>
              </div>

              <span class="contact-item__arrow" aria-hidden="true">↗</span>
            </a>

            <button
              class="contact-item__copy"
              :aria-label="`Copy ${item.label}`"
              type="button"
              @click.prevent="copyToClipboard(item.href, item.id)"
            >
              <svg v-if="copiedId === item.id" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              <span class="contact-item__copy-label">
                {{ copiedId === item.id ? t.copied : t.copy }}
              </span>
            </button>
          </li>
        </ul>
      </section>

    </main>
  </div>
</template>

<style scoped>
.contact-page {
  min-height: 100vh;
  background: var(--color-bg-base);
}

/* Nav */
.contact-nav {
  position: sticky; top: 0; z-index: 10;
  padding: var(--space-5) var(--space-8);
  background: rgba(var(--nav-bg-rgb), 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(var(--border-rgb), 0.1);
}
.contact-nav__back {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: var(--color-text-muted);
  background: none; border: none; cursor: pointer;
  transition: color var(--transition-base); padding: 0;
}
.contact-nav__back:hover { color: var(--color-accent); }

/* Main */
.contact-main {
  max-width: 720px;
  margin: 0 auto;
  padding: var(--space-20) var(--space-8) var(--space-16);
  display: flex;
  flex-direction: column;
  gap: var(--space-14);
}

/* Hero */
.contact-hero__eyebrow {
  display: flex; align-items: center; gap: var(--space-3);
  font-family: var(--font-mono); font-size: 0.68rem;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--color-text-muted); margin-bottom: var(--space-4);
}
.contact-hero__line {
  display: inline-block; width: 2rem; height: 1px;
  background: var(--color-accent);
}
.contact-hero__title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 300; line-height: 0.95;
  color: var(--color-text-primary);
  margin-bottom: var(--space-5);
}
.contact-hero__title em { font-style: italic; color: var(--color-accent); }
.contact-hero__subtitle {
  font-family: var(--font-body); font-size: 1rem;
  line-height: 1.7; color: var(--color-text-secondary);
  max-width: 44ch;
}

/* Group */
.contact-group__label {
  font-family: var(--font-mono); font-size: 0.62rem;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--color-text-muted);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid rgba(var(--border-rgb), 0.12);
  margin-bottom: var(--space-4);
}

/* List */
.contact-list {
  display: flex; flex-direction: column; gap: var(--space-3);
}

/* Item */
.contact-item {
  display: flex; align-items: stretch; gap: var(--space-2);
}

.contact-item__link {
  flex: 1;
  display: flex; align-items: center; gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  background: var(--color-surface-raised);
  border: 1px solid rgba(var(--border-rgb), 0.12);
  border-radius: var(--radius-sm);
  text-decoration: none;
  transition: border-color var(--transition-base), box-shadow var(--transition-base), transform var(--transition-base);
  overflow: hidden;
  position: relative;
}
.contact-item__link::before {
  content: '';
  position: absolute; left: 0; top: 0; bottom: 0;
  width: 3px;
  background: var(--item-color, var(--color-accent));
  opacity: 0;
  transition: opacity var(--transition-base);
}
.contact-item__link:hover {
  border-color: rgba(var(--border-rgb), 0.25);
  box-shadow: var(--shadow-sm);
  transform: translateX(3px);
}
.contact-item__link:hover::before { opacity: 1; }

.contact-item__icon-wrap {
  display: grid; place-items: center;
  width: 36px; height: 36px; flex-shrink: 0;
  border-radius: var(--radius-sm);
  background: rgba(var(--border-rgb), 0.08);
  color: var(--item-color, var(--color-accent));
  transition: background var(--transition-base);
}
.contact-item__link:hover .contact-item__icon-wrap {
  background: color-mix(in srgb, var(--item-color, var(--color-accent)) 15%, transparent);
}
.contact-item__icon-wrap svg { width: 18px; height: 18px; }

.contact-item__body {
  display: flex; flex-direction: column; gap: 1px; min-width: 0;
}
.contact-item__label {
  font-family: var(--font-mono); font-size: 0.62rem;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--color-text-muted);
}
.contact-item__value {
  font-family: var(--font-body); font-size: 0.92rem;
  color: var(--color-text-primary);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.contact-item__hint {
  font-family: var(--font-mono); font-size: 0.6rem;
  letter-spacing: 0.08em; color: var(--color-text-muted);
}

.contact-item__arrow {
  margin-left: auto; flex-shrink: 0;
  color: var(--color-text-muted); font-size: 1rem;
  transition: color var(--transition-base), transform var(--transition-base);
}
.contact-item__link:hover .contact-item__arrow {
  color: var(--item-color, var(--color-accent));
  transform: translate(2px, -2px);
}

/* Copy button */
.contact-item__copy {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 3px;
  min-width: 52px; padding: 0 var(--space-3);
  background: var(--color-surface-raised);
  border: 1px solid rgba(var(--border-rgb), 0.12);
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--color-text-muted);
  transition: all var(--transition-base);
  flex-shrink: 0;
}
.contact-item__copy:hover { color: var(--color-accent); border-color: rgba(201,169,110,0.3); }
.contact-item__copy svg { width: 14px; height: 14px; }
.contact-item__copy-label {
  font-family: var(--font-mono); font-size: 0.52rem;
  letter-spacing: 0.1em; text-transform: uppercase;
  white-space: nowrap;
}

/* Responsive */
@media (max-width: 640px) {
  .contact-main { padding: var(--space-12) var(--space-4) var(--space-10); }
  .contact-nav { padding: var(--space-4) var(--space-4); }
  .contact-item__hint { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .animate-in { opacity: 1 !important; transform: none !important; }
  .contact-item__link { transition: none; }
}
</style>
