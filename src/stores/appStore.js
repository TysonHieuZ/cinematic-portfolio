import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  // ── Accent color ──────────────────────────────────────────────────
  const _accentColor = ref('#c9a96e')
  const accentColor = computed(() => _accentColor.value)

  function setAccentColor(hexColor) {
    _accentColor.value = hexColor
    document.documentElement.style.setProperty('--color-accent', hexColor)
  }

  // ── Reduced motion ────────────────────────────────────────────────
  const _isReducedMotion = ref(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )
  const isReducedMotion = computed(() => _isReducedMotion.value)

  // ── Custom cursor ─────────────────────────────────────────────────
  const _isCustomCursorActive = ref(false)
  const isCustomCursorActive = computed(() => _isCustomCursorActive.value)
  function setCustomCursorActive(isActive) { _isCustomCursorActive.value = isActive }

  // ── Theme (dark / light) ──────────────────────────────────────────
  const _theme = ref(
    typeof window !== 'undefined'
      ? (localStorage.getItem('portfolio-theme') ?? 'dark')
      : 'dark',
  )
  const theme = computed(() => _theme.value)
  const isDark = computed(() => _theme.value === 'dark')

  function toggleTheme() {
    _theme.value = _theme.value === 'dark' ? 'light' : 'dark'
  }

  watch(_theme, (val) => {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('data-theme', val)
    localStorage.setItem('portfolio-theme', val)
  }, { immediate: true })

  // ── Locale (vi / en) ──────────────────────────────────────────────
  const _locale = ref(
    typeof window !== 'undefined'
      ? (localStorage.getItem('portfolio-locale') ?? 'en')
      : 'en',
  )
  const locale = computed(() => _locale.value)
  const isVi = computed(() => _locale.value === 'vi')

  function toggleLocale() {
    _locale.value = _locale.value === 'en' ? 'vi' : 'en'
  }

  watch(_locale, (val) => {
    if (typeof localStorage !== 'undefined') localStorage.setItem('portfolio-locale', val)
  })

  return {
    accentColor, setAccentColor,
    isReducedMotion,
    isCustomCursorActive, setCustomCursorActive,
    theme, isDark, toggleTheme,
    locale, isVi, toggleLocale,
  }
})
