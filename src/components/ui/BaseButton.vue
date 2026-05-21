<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'ghost', 'danger'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  isDisabled: { type: Boolean, default: false },
  isLoading:  { type: Boolean, default: false },
  type:       { type: String, default: 'button' },
})

const emit = defineEmits({ click: (e) => e instanceof MouseEvent })

function handleButtonClick(event) {
  if (props.isDisabled || props.isLoading) return
  emit('click', event)
}
</script>

<template>
  <button
    :type="type"
    :disabled="isDisabled || isLoading"
    :aria-disabled="isDisabled || isLoading"
    :aria-busy="isLoading"
    :class="['base-btn', `base-btn--${variant}`, `base-btn--${size}`,
             { 'base-btn--disabled': isDisabled, 'base-btn--loading': isLoading }]"
    @click="handleButtonClick"
  >
    <span v-if="isLoading" class="base-btn__spinner" aria-hidden="true" />
    <slot />
  </button>
</template>

<style scoped>
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border: 1px solid transparent;
  font-family: var(--font-ui);
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.base-btn--sm { padding: var(--space-2) var(--space-4); }
.base-btn--md { padding: var(--space-3) var(--space-6); }
.base-btn--lg { padding: var(--space-4) var(--space-10); font-size: 0.8rem; }

.base-btn--primary {
  background: var(--color-accent);
  color: var(--color-bg-base);
  border-color: var(--color-accent);
}
.base-btn--primary:hover:not(:disabled) {
  background: transparent;
  color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

.base-btn--ghost {
  background: transparent;
  color: var(--color-text-secondary);
  border-color: var(--color-text-muted);
}
.base-btn--ghost:hover:not(:disabled) {
  border-color: var(--color-accent);
  color: var(--color-accent);
  transform: translateY(-2px);
}

.base-btn--secondary {
  background: var(--color-surface-raised);
  color: var(--color-text-primary);
  border-color: var(--color-surface-high);
}
.base-btn--secondary:hover:not(:disabled) {
  background: var(--color-surface-high);
}

.base-btn--danger { background: var(--color-error); color: #fff; }

.base-btn--disabled,
.base-btn:disabled { opacity: 0.35; cursor: not-allowed; pointer-events: none; }

.base-btn__spinner {
  width: 0.9em; height: 0.9em;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

@media (prefers-reduced-motion: reduce) {
  .base-btn { transition: none; }
  .base-btn__spinner { animation-duration: 2s; }
}
</style>
