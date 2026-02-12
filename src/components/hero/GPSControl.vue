<template>
  <div class="gps-section animate-fade-in">
    <button
      class="btn-gps"
      :class="gpsButtonClass"
      @click="$emit('get-location')"
      :disabled="isGettingLocation"
      aria-label="Gunakan lokasi GPS saat ini"
    >
      <div class="gps-icon-wrapper">
        <i :class="gpsButtonIcon"></i>
        <div v-if="isGettingLocation" class="gps-pulse"></div>
      </div>
      <span class="btn-text">{{ gpsButtonText }}</span>
    </button>

    <!-- GPS Info & Actions -->
    <transition name="slide-up">
      <div v-if="showGPSStatus" class="gps-status-card">
        <div class="accuracy-badge" :class="gpsAccuracyClass">
          <i class="fas fa-satellite-dish"></i>
          <span>{{ gpsStatusText }}</span>
        </div>

        <div class="gps-actions">
          <button
            class="action-btn refresh"
            @click="$emit('refresh')"
            aria-label="Perbarui lokasi GPS"
            title="Refresh GPS"
          >
            <i class="fas fa-sync-alt" :class="{ 'fa-spin': isGettingLocation }"></i>
          </button>
          <button
            class="action-btn help"
            @click="$emit('show-tips')"
            aria-label="Tips mendapatkan GPS akurat"
            title="Tips GPS"
          >
            <i class="fas fa-lightbulb"></i>
          </button>
        </div>
      </div>
    </transition>

    <!-- Accuracy Message -->
    <div class="accuracy-tip" :class="accuracyIndicatorClass">
      <i class="fas fa-shield-check" v-if="accuracyIndicatorClass === 'good'"></i>
      <i class="fas fa-info-circle" v-else></i>
      <span>{{ accuracyMessage }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  gpsButtonClass: String,
  gpsButtonIcon: String,
  gpsButtonText: String,
  isGettingLocation: Boolean,
  showGPSStatus: Boolean,
  gpsAccuracyClass: String,
  gpsStatusText: String,
  accuracyIndicatorClass: String,
  accuracyMessage: String
})

defineEmits(['get-location', 'refresh', 'show-tips'])
</script>

<style scoped>
.gps-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 3.5rem;
}

.btn-gps {
  padding: 0.875rem 2.25rem;
  border-radius: 100px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 2px solid var(--primary);
  background: white;
  color: var(--primary);
  transition: var(--transition);
  box-shadow: 0 8px 20px var(--primary-soft);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.btn-gps:hover:not(:disabled) {
  background: var(--primary);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 12px 28px var(--primary-soft);
}

.btn-gps:active:not(:disabled) {
  transform: translateY(-1px);
}

.btn-gps:disabled {
  opacity: 0.7;
  cursor: wait;
}

.gps-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.gps-pulse {
  position: absolute;
  width: 200%;
  height: 200%;
  border-radius: 50%;
  background: var(--primary);
  animation: pulse 2s infinite ease-out;
  opacity: 0;
}

@keyframes pulse {
  0% {
    transform: scale(0.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

.gps-status-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-radius: 100px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-100);
}

.accuracy-badge {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-weight: 700;
  font-size: 0.8125rem;
  padding: 0.5rem 1rem;
  border-radius: 100px;
  transition: var(--transition-fast);
}

.accuracy-badge.good {
  background: #d1fae5;
  color: #065f46;
}
.accuracy-badge.medium {
  background: #fef3c7;
  color: #92400e;
}
.accuracy-badge.poor {
  background: #fee2e2;
  color: #991b1b;
}

.gps-actions {
  display: flex;
  gap: 0.25rem;
}

.action-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: var(--gray-50);
  color: var(--gray-600);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-fast);
  cursor: pointer;
}

.action-btn:hover {
  background: var(--primary-soft);
  color: var(--primary);
  transform: scale(1.1);
}

.accuracy-tip {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gray-500);
  transition: var(--transition-fast);
}

.accuracy-tip.good {
  color: var(--secondary);
}
.accuracy-tip.medium {
  color: var(--warning);
}
.accuracy-tip.poor {
  color: var(--danger);
}

/* Transitions */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

@media (max-width: 640px) {
  .btn-gps {
    width: 100%;
    justify-content: center;
    padding: 1rem;
  }
}
</style>
