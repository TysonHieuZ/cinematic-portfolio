import { ref, computed, readonly, onMounted, onUnmounted } from 'vue'

const TICK_INTERVAL_MS = 1000

export function useTimeTracker(options = {}) {
  const {
    locale = 'en-US',
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
    autoStart = true,
  } = options

  const _currentDate = ref(new Date())
  const _isTicking = ref(false)
  let _intervalId = null

  const formattedTime = computed(() =>
    new Intl.DateTimeFormat(locale, {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false, timeZone,
    }).format(_currentDate.value),
  )

  const formattedDate = computed(() =>
    new Intl.DateTimeFormat(locale, {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone,
    }).format(_currentDate.value),
  )

  const timeZoneLabel = computed(() => {
    const parts = new Intl.DateTimeFormat(locale, { timeZoneName: 'short', timeZone })
      .formatToParts(_currentDate.value)
    return parts.find((p) => p.type === 'timeZoneName')?.value ?? timeZone
  })

  function startClock() {
    if (_isTicking.value) return
    _intervalId = setInterval(() => {
      _currentDate.value = new Date()
    }, TICK_INTERVAL_MS)
    _isTicking.value = true
  }

  function stopClock() {
    if (_intervalId !== null) {
      clearInterval(_intervalId)
      _intervalId = null
    }
    _isTicking.value = false
  }

  onMounted(() => { if (autoStart) startClock() })
  onUnmounted(() => { stopClock() })

  return {
    currentDate: readonly(_currentDate),
    formattedTime,
    formattedDate,
    timeZoneLabel,
    isTicking: readonly(_isTicking),
    startClock,
    stopClock,
  }
}
