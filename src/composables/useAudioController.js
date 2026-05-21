import { ref, readonly, computed, onUnmounted } from 'vue'

const FADE_DURATION_MS = 800
const FADE_STEP_MS = 50
const DEFAULT_VOLUME = 0.35

export function useAudioController(options = {}) {
  const { src = '', volume = DEFAULT_VOLUME, loop = true } = options

  const _isPlaying = ref(false)
  const _isMuted = ref(false)
  const _currentVolume = ref(volume)
  let _audioElement = null
  let _fadeIntervalId = null

  const audioLabel = computed(() =>
    _isPlaying.value ? 'Pause ambient audio' : 'Play ambient audio',
  )

  function _getOrCreateAudio() {
    if (!_audioElement) {
      _audioElement = new Audio(src)
      _audioElement.loop = loop
      _audioElement.volume = 0
    }
    return _audioElement
  }

  function _clearFade() {
    if (_fadeIntervalId !== null) {
      clearInterval(_fadeIntervalId)
      _fadeIntervalId = null
    }
  }

  function _fadeVolume(targetVolume, onComplete) {
    _clearFade()
    const audio = _getOrCreateAudio()
    const steps = FADE_DURATION_MS / FADE_STEP_MS
    const step = (targetVolume - audio.volume) / steps

    _fadeIntervalId = setInterval(() => {
      const next = audio.volume + step
      const done = step > 0 ? next >= targetVolume : next <= targetVolume
      if (done) {
        audio.volume = Math.max(0, Math.min(1, targetVolume))
        _currentVolume.value = audio.volume
        _clearFade()
        onComplete?.()
      } else {
        audio.volume = Math.max(0, Math.min(1, next))
        _currentVolume.value = audio.volume
      }
    }, FADE_STEP_MS)
  }

  async function togglePlayback() {
    const audio = _getOrCreateAudio()
    if (_isPlaying.value) {
      _fadeVolume(0, () => { audio.pause(); _isPlaying.value = false })
    } else {
      try {
        await audio.play()
        _isPlaying.value = true
        _fadeVolume(_isMuted.value ? 0 : _currentVolume.value)
      } catch (e) {
        console.warn('[useAudioController] Autoplay blocked:', e)
      }
    }
  }

  function toggleMute() {
    if (!_audioElement) return
    if (_isMuted.value) {
      _isMuted.value = false
      _fadeVolume(_currentVolume.value)
    } else {
      _isMuted.value = true
      _fadeVolume(0)
    }
  }

  function setVolume(level) {
    const clamped = Math.max(0, Math.min(1, level))
    _currentVolume.value = clamped
    if (_audioElement && !_isMuted.value) _audioElement.volume = clamped
  }

  function destroyAudio() {
    _clearFade()
    if (_audioElement) {
      _audioElement.pause()
      _audioElement.src = ''
      _audioElement.load()
      _audioElement = null
    }
    _isPlaying.value = false
  }

  onUnmounted(() => { destroyAudio() })

  return {
    isPlaying: readonly(_isPlaying),
    isMuted: readonly(_isMuted),
    currentVolume: readonly(_currentVolume),
    audioLabel,
    togglePlayback,
    toggleMute,
    setVolume,
    destroyAudio,
  }
}
