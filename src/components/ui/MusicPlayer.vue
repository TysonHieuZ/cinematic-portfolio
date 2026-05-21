<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const PLAYLIST = [
  { id: 'MoN9ql6Yymw', title: 'Daylight',       artist: 'David Kushner' },
  { id: 'JmJtXPho7sw', title: "Nothing's New",   artist: 'Catie Turner'  },
  { id: 'ixRLjjTRczE', title: 'Another Love',    artist: 'Tom Odell'     },
]

const isExpanded   = ref(false)
const isPlaying    = ref(false)
const isMuted      = ref(false)
const progress     = ref(0)
const duration     = ref(0)
const currentTime  = ref(0)
const currentIndex = ref(0)
const isShuffled   = ref(false)

const currentTrack = computed(() => PLAYLIST[currentIndex.value])

let player = null
let progressInterval = null

// ── YouTube IFrame API ────────────────────────────────────────────────────────
function loadYouTubeAPI() {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) { resolve(); return }
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)
    window.onYouTubeIframeAPIReady = resolve
  })
}

function initPlayer() {
  player = new window.YT.Player('yt-player', {
    videoId: currentTrack.value.id,
    playerVars: { autoplay: 0, controls: 0, disablekb: 1, fs: 0, iv_load_policy: 3, modestbranding: 1, rel: 0 },
    events: { onStateChange: onPlayerStateChange },
  })
}

function onPlayerStateChange(event) {
  if (event.data === 1) {
    isPlaying.value = true
    duration.value  = player.getDuration()
    startProgressTracking()
  } else if (event.data === 2) {
    isPlaying.value = false
    stopProgressTracking()
  } else if (event.data === 0) {
    // Song ended — auto next
    isPlaying.value = false
    stopProgressTracking()
    progress.value = 0; currentTime.value = 0
    nextTrack()
  }
}

function startProgressTracking() {
  stopProgressTracking()
  progressInterval = setInterval(() => {
    if (!player) return
    currentTime.value = player.getCurrentTime()
    duration.value    = player.getDuration()
    progress.value    = duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0
  }, 500)
}
function stopProgressTracking() {
  if (progressInterval) { clearInterval(progressInterval); progressInterval = null }
}

// ── Controls ──────────────────────────────────────────────────────────────────
function togglePlay() {
  if (!player) return
  isPlaying.value ? player.pauseVideo() : player.playVideo()
}

function toggleMute() {
  if (!player) return
  if (isMuted.value) { player.unMute(); isMuted.value = false }
  else               { player.mute();   isMuted.value = true  }
}

function seek(e) {
  if (!player || !duration.value) return
  const rect = e.currentTarget.getBoundingClientRect()
  player.seekTo(((e.clientX - rect.left) / rect.width) * duration.value, true)
}

function loadTrack(index, autoplay = true) {
  currentIndex.value = index
  progress.value = 0; currentTime.value = 0; duration.value = 0
  if (!player) return
  if (autoplay) {
    player.loadVideoById(PLAYLIST[index].id)
    isPlaying.value = true
  } else {
    player.cueVideoById(PLAYLIST[index].id)
    isPlaying.value = false
  }
}

function nextTrack() {
  if (isShuffled.value) {
    let next
    do { next = Math.floor(Math.random() * PLAYLIST.length) }
    while (next === currentIndex.value && PLAYLIST.length > 1)
    loadTrack(next)
  } else {
    loadTrack((currentIndex.value + 1) % PLAYLIST.length)
  }
}

function prevTrack() {
  // If >3s in, restart; else go previous
  if (currentTime.value > 3) {
    player?.seekTo(0, true)
    return
  }
  const prev = (currentIndex.value - 1 + PLAYLIST.length) % PLAYLIST.length
  loadTrack(prev)
}

function toggleShuffle() { isShuffled.value = !isShuffled.value }

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00'
  return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`
}

onMounted(async () => {
  await loadYouTubeAPI()
  initPlayer()
})
onUnmounted(() => {
  stopProgressTracking()
  if (player) { player.destroy(); player = null }
})
</script>

<template>
  <div class="music-player" :class="{ 'music-player--expanded': isExpanded }">

    <!-- Hidden YouTube iframe -->
    <div class="music-player__yt-wrap" aria-hidden="true">
      <div id="yt-player" />
    </div>

    <!-- ── Collapsed pill ── -->
    <div v-if="!isExpanded" class="music-player__pill">
      <button class="music-player__pill-play" :aria-label="isPlaying ? 'Pause' : 'Play'" type="button" @click="togglePlay">
        <span v-if="isPlaying" class="music-player__bars" aria-hidden="true">
          <span class="music-player__bar" /><span class="music-player__bar" /><span class="music-player__bar" />
        </span>
        <svg v-else viewBox="0 0 24 24" fill="currentColor" class="music-player__sm-icon" aria-hidden="true"><polygon points="6,4 20,12 6,20"/></svg>
      </button>

      <div class="music-player__pill-info" @click="isExpanded = true">
        <span class="music-player__pill-title">{{ currentTrack.title }}</span>
        <span class="music-player__pill-artist">{{ currentTrack.artist }}</span>
      </div>

      <button class="music-player__pill-next" aria-label="Next track" type="button" @click="nextTrack">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5,4 15,12 5,20"/><line x1="19" y1="4" x2="19" y2="20" stroke="currentColor" stroke-width="2"/></svg>
      </button>

      <button class="music-player__pill-expand" aria-label="Expand player" type="button" @click="isExpanded = true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="18 15 12 9 6 15"/></svg>
      </button>
    </div>

    <!-- ── Expanded card ── -->
    <div v-else class="music-player__card">
      <!-- Header -->
      <div class="music-player__card-header">
        <span class="music-player__card-label">Now Playing</span>
        <button class="music-player__close" aria-label="Collapse" type="button" @click="isExpanded = false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
      </div>

      <!-- Vinyl -->
      <div class="music-player__art" aria-hidden="true">
        <div class="music-player__art-inner" :class="{ 'music-player__art-inner--spin': isPlaying }">
          <svg viewBox="0 0 100 100" class="music-player__vinyl">
            <circle cx="50" cy="50" r="48" fill="#1a1812" stroke="rgba(201,169,110,0.2)" stroke-width="1"/>
            <circle cx="50" cy="50" r="35" fill="#111009"/>
            <circle cx="50" cy="50" r="22" fill="#1a1812"/>
            <circle cx="50" cy="50" r="8"  fill="#0a0905"/>
            <circle cx="50" cy="50" r="3"  fill="#c9a96e"/>
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(201,169,110,0.06)" stroke-width="1"/>
            <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(201,169,110,0.04)" stroke-width="1"/>
            <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(201,169,110,0.06)" stroke-width="1"/>
            <circle cx="50" cy="50" r="26" fill="none" stroke="rgba(201,169,110,0.04)" stroke-width="1"/>
          </svg>
        </div>
      </div>

      <!-- Track info -->
      <div class="music-player__track">
        <p class="music-player__track-title">{{ currentTrack.title }}</p>
        <p class="music-player__track-artist">{{ currentTrack.artist }}</p>
      </div>

      <!-- Playlist dots -->
      <div class="music-player__dots" aria-label="Playlist">
        <button
          v-for="(track, i) in PLAYLIST"
          :key="track.id"
          class="music-player__dot"
          :class="{ 'music-player__dot--active': i === currentIndex }"
          :aria-label="`Play ${track.title}`"
          :title="track.title"
          type="button"
          @click="loadTrack(i)"
        />
      </div>

      <!-- Progress -->
      <div class="music-player__progress-wrap" role="slider" :aria-valuenow="Math.round(progress)" aria-valuemin="0" aria-valuemax="100" aria-label="Song progress" @click="seek">
        <div class="music-player__progress-track">
          <div class="music-player__progress-fill" :style="{ width: progress + '%' }" />
          <div class="music-player__progress-thumb" :style="{ left: progress + '%' }" />
        </div>
      </div>
      <div class="music-player__times">
        <span>{{ formatTime(currentTime) }}</span>
        <span>{{ formatTime(duration) }}</span>
      </div>

      <!-- Controls -->
      <div class="music-player__controls">
        <!-- Shuffle -->
        <button
          class="music-player__ctrl-btn"
          :class="{ 'music-player__ctrl-btn--active': isShuffled }"
          aria-label="Shuffle"
          type="button"
          @click="toggleShuffle"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/>
            <polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/>
          </svg>
        </button>

        <!-- Prev -->
        <button class="music-player__ctrl-btn" aria-label="Previous" type="button" @click="prevTrack">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <polygon points="19,20 9,12 19,4"/><line x1="5" y1="4" x2="5" y2="20" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>

        <!-- Play/Pause -->
        <button class="music-player__play-btn" :aria-label="isPlaying ? 'Pause' : 'Play'" type="button" @click="togglePlay">
          <svg v-if="isPlaying" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <polygon points="6,4 20,12 6,20"/>
          </svg>
        </button>

        <!-- Next -->
        <button class="music-player__ctrl-btn" aria-label="Next" type="button" @click="nextTrack">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <polygon points="5,4 15,12 5,20"/><line x1="19" y1="4" x2="19" y2="20" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>

        <!-- Mute -->
        <button class="music-player__ctrl-btn" :aria-label="isMuted ? 'Unmute' : 'Mute'" type="button" @click="toggleMute">
          <svg v-if="isMuted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/>
            <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        </button>
      </div>

      <!-- YouTube link -->
      <a
        :href="`https://www.youtube.com/watch?v=${currentTrack.id}`"
        target="_blank" rel="noopener noreferrer"
        class="music-player__yt-link"
        aria-label="Open on YouTube"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="width:12px;height:12px">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.75 15.5V8.5l6.25 3.5-6.25 3.5z"/>
        </svg>
        Open on YouTube
      </a>
    </div>

  </div>
</template>

<style scoped>
.music-player__yt-wrap {
  position: absolute; width: 1px; height: 1px;
  overflow: hidden; opacity: 0; pointer-events: none;
}

.music-player {
  position: fixed;
  bottom: var(--space-6);
  left: 72px;
  z-index: 150;
}

/* ── Pill ── */
.music-player__pill {
  display: flex; align-items: center; gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: rgba(var(--nav-bg-rgb), 0.92);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(var(--border-rgb), 0.15);
  border-radius: 999px;
  box-shadow: var(--shadow-md);
}

.music-player__pill-play {
  display: grid; place-items: center;
  width: 28px; height: 28px; border-radius: 50%;
  background: var(--color-accent); border: none; cursor: pointer;
  color: var(--color-bg-base); flex-shrink: 0;
  transition: transform var(--transition-base);
}
.music-player__pill-play:hover { transform: scale(1.1); }
.music-player__sm-icon { width: 10px; height: 10px; }

.music-player__bars { display: flex; align-items: flex-end; gap: 2px; height: 12px; }
.music-player__bar {
  width: 2px; background: currentColor; border-radius: 1px;
  animation: bar-bounce 0.7s ease-in-out infinite alternate;
}
.music-player__bar:nth-child(1) { height: 5px;  animation-delay: 0s; }
.music-player__bar:nth-child(2) { height: 10px; animation-delay: 0.15s; }
.music-player__bar:nth-child(3) { height: 7px;  animation-delay: 0.08s; }
@keyframes bar-bounce { from { transform: scaleY(0.4); } to { transform: scaleY(1); } }

.music-player__pill-info {
  display: flex; flex-direction: column; cursor: pointer; min-width: 0;
}
.music-player__pill-title {
  font-family: var(--font-body); font-size: 0.75rem;
  color: var(--color-text-primary); white-space: nowrap; line-height: 1.2;
}
.music-player__pill-artist {
  font-family: var(--font-mono); font-size: 0.58rem;
  letter-spacing: 0.08em; color: var(--color-text-muted); white-space: nowrap;
}

.music-player__pill-next,
.music-player__pill-expand {
  display: grid; place-items: center;
  width: 22px; height: 22px;
  background: none; border: none; cursor: pointer;
  color: var(--color-text-muted); transition: color var(--transition-base); flex-shrink: 0;
}
.music-player__pill-next:hover,
.music-player__pill-expand:hover { color: var(--color-accent); }
.music-player__pill-next svg,
.music-player__pill-expand svg { width: 13px; height: 13px; }

/* ── Card ── */
.music-player__card {
  width: 248px;
  background: rgba(var(--nav-bg-rgb), 0.96);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(var(--border-rgb), 0.15);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  box-shadow: var(--shadow-lg);
  display: flex; flex-direction: column; gap: var(--space-3);
}

.music-player__card-header {
  display: flex; align-items: center; justify-content: space-between;
}
.music-player__card-label {
  font-family: var(--font-mono); font-size: 0.58rem;
  letter-spacing: 0.18em; text-transform: uppercase; color: var(--color-accent);
}
.music-player__close {
  display: grid; place-items: center; width: 22px; height: 22px;
  background: none; border: none; cursor: pointer;
  color: var(--color-text-muted); transition: color var(--transition-base);
}
.music-player__close:hover { color: var(--color-text-primary); }
.music-player__close svg { width: 14px; height: 14px; }

/* Vinyl */
.music-player__art { display: flex; justify-content: center; padding: var(--space-1) 0; }
.music-player__art-inner { width: 90px; height: 90px; }
.music-player__art-inner--spin { animation: vinyl-spin 4s linear infinite; }
@keyframes vinyl-spin { to { transform: rotate(360deg); } }
.music-player__vinyl { width: 100%; height: 100%; }

/* Track */
.music-player__track { text-align: center; }
.music-player__track-title {
  font-family: var(--font-display); font-size: 1.05rem;
  font-weight: 300; color: var(--color-text-primary); line-height: 1.2;
}
.music-player__track-artist {
  font-family: var(--font-mono); font-size: 0.62rem;
  letter-spacing: 0.1em; color: var(--color-text-muted); margin-top: 2px;
}

/* Playlist dots */
.music-player__dots {
  display: flex; justify-content: center; gap: var(--space-2);
}
.music-player__dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: rgba(var(--border-rgb), 0.3);
  border: none; cursor: pointer;
  transition: all var(--transition-base);
  padding: 0;
}
.music-player__dot--active {
  background: var(--color-accent);
  box-shadow: 0 0 6px rgba(201,169,110,0.5);
  width: 18px; border-radius: 3px;
}
.music-player__dot:hover:not(.music-player__dot--active) {
  background: rgba(var(--border-rgb), 0.6);
}

/* Progress */
.music-player__progress-wrap { cursor: pointer; padding: var(--space-1) 0; }
.music-player__progress-track {
  position: relative; height: 3px;
  background: rgba(var(--border-rgb), 0.2); border-radius: 2px;
}
.music-player__progress-fill {
  height: 100%; background: var(--color-accent);
  border-radius: 2px; transition: width 0.3s linear;
}
.music-player__progress-thumb {
  position: absolute; top: 50%;
  transform: translate(-50%, -50%);
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 6px rgba(201,169,110,0.5);
  transition: left 0.3s linear;
}
.music-player__times {
  display: flex; justify-content: space-between;
  font-family: var(--font-mono); font-size: 0.56rem; color: var(--color-text-muted);
}

/* Controls */
.music-player__controls {
  display: flex; align-items: center; justify-content: center; gap: var(--space-3);
}
.music-player__ctrl-btn {
  display: grid; place-items: center;
  width: 30px; height: 30px;
  background: none; border: none; cursor: pointer;
  color: var(--color-text-muted); transition: color var(--transition-base);
}
.music-player__ctrl-btn:hover { color: var(--color-text-primary); }
.music-player__ctrl-btn--active { color: var(--color-accent); }
.music-player__ctrl-btn svg { width: 15px; height: 15px; }

.music-player__play-btn {
  display: grid; place-items: center;
  width: 42px; height: 42px; border-radius: 50%;
  background: var(--color-accent); border: none; cursor: pointer;
  color: var(--color-bg-base);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}
.music-player__play-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 0 16px rgba(201,169,110,0.4);
}
.music-player__play-btn svg { width: 16px; height: 16px; }

/* YouTube link */
.music-player__yt-link {
  display: flex; align-items: center; justify-content: center; gap: var(--space-2);
  font-family: var(--font-mono); font-size: 0.58rem;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--color-text-muted); text-decoration: none;
  transition: color var(--transition-base);
  padding-top: var(--space-1);
  border-top: 1px solid rgba(var(--border-rgb), 0.1);
}
.music-player__yt-link:hover { color: var(--color-accent); }

/* Mobile */
@media (max-width: 768px) {
  .music-player { left: var(--space-4); bottom: var(--space-4); }
}

@media (prefers-reduced-motion: reduce) {
  .music-player__bar { animation: none; height: 8px; }
  .music-player__art-inner--spin { animation: none; }
}
</style>
