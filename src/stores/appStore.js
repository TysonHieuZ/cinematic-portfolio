import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const _accentColor = ref('#c9a96e')
  const _isCustomCursorActive = ref(false)
  const _isReducedMotion = ref(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )

  const accentColor = computed(() => _accentColor.value)
  const isReducedMotion = computed(() => _isReducedMotion.value)
  const isCustomCursorActive = computed(() => _isCustomCursorActive.value)

  function setAccentColor(hexColor) {
    _accentColor.value = hexColor
    document.documentElement.style.setProperty('--color-accent', hexColor)
  }

  function setCustomCursorActive(isActive) {
    _isCustomCursorActive.value = isActive
  }

  return {
    accentColor,
    isReducedMotion,
    isCustomCursorActive,
    setAccentColor,
    setCustomCursorActive,
  }
})
