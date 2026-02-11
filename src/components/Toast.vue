<template>
  <transition name="toast-pop">
    <div v-if="show" class="toast-wrapper" :class="type" @click="hide">
      <div class="toast-glass">
        <div class="toast-marker"></div>
        <div class="toast-content">
          <div class="toast-icon">
            <i :class="iconClass"></i>
          </div>
          <div class="toast-text">
            <h5>{{ typeTitle }}</h5>
            <p>{{ message }}</p>
          </div>
          <button class="toast-close"><i class="fas fa-times"></i></button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: { type: String, default: '' },
  type: { type: String, default: 'info' },
  show: { type: Boolean, default: false }
})

const emit = defineEmits(['hide'])

const typeTitle = computed(() => {
  const titles = {
    success: 'Berhasil',
    error: 'Gangguan',
    warning: 'Peringatan',
    info: 'Informasi'
  }
  return titles[props.type] || 'Notifikasi'
})

const iconClass = computed(() => {
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-times-circle',
    warning: 'fas fa-exclamation-triangle',
    info: 'fas fa-info-circle'
  }
  return icons[props.type] || 'fas fa-bell'
})

const hide = () => emit('hide')
</script>

<style scoped>
.toast-wrapper {
  position: fixed;
  bottom: 2.5rem;
  right: 2.5rem;
  z-index: 5000;
  cursor: pointer;
  min-width: 380px;
  max-width: 450px;
}

.toast-glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 24px;
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.5) inset;
  padding: 1.5rem;
  display: flex;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-glass:hover {
  transform: scale(1.02);
  background: rgba(255, 255, 255, 0.85);
}

.toast-marker {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 6px;
  background: linear-gradient(
    to bottom,
    var(--toast-color),
    var(--toast-color-alt, var(--toast-color))
  );
  border-radius: 0 4px 4px 0;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
}

.toast-icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: var(--toast-bg);
  color: var(--toast-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
  box-shadow: 0 8px 16px -4px var(--toast-shadow);
}

.toast-text {
  flex: 1;
  text-align: left;
}

.toast-text h5 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 800;
  color: var(--gray-900);
  letter-spacing: -0.01em;
}

.toast-text p {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-600);
  line-height: 1.5;
}

.toast-close {
  background: var(--gray-50);
  border: 1px solid var(--gray-100);
  color: var(--gray-400);
  padding: 0.5rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 0.75rem;
}

.toast-close:hover {
  background: var(--gray-100);
  color: var(--gray-900);
  transform: rotate(90deg);
}

/* Types color system */
.success {
  --toast-color: #10b981;
  --toast-color-alt: #059669;
  --toast-bg: #ecfdf5;
  --toast-shadow: rgba(16, 185, 129, 0.2);
}
.error {
  --toast-color: #ef4444;
  --toast-color-alt: #dc2626;
  --toast-bg: #fef2f2;
  --toast-shadow: rgba(239, 68, 68, 0.2);
}
.warning {
  --toast-color: #f59e0b;
  --toast-color-alt: #d97706;
  --toast-bg: #fffbeb;
  --toast-shadow: rgba(245, 158, 11, 0.2);
}
.info {
  --toast-color: #3b82f6;
  --toast-color-alt: #2563eb;
  --toast-bg: #eff6ff;
  --toast-shadow: rgba(59, 130, 246, 0.2);
}

/* Transitions */
.toast-pop-enter-active {
  animation: toast-in 0.6s cubic-bezier(0.19, 1, 0.22, 1);
}
.toast-pop-leave-active {
  animation: toast-out 0.4s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

@keyframes toast-in {
  0% {
    transform: translateX(100%) scale(0.9);
    opacity: 0;
  }
  60% {
    transform: translateX(-10px) scale(1.02);
  }
  100% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}

@keyframes toast-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.9) translateY(20px);
    opacity: 0;
  }
}

@media (max-width: 500px) {
  .toast-wrapper {
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
    min-width: 0;
  }
}
</style>
