<template>
  <div class="gps-section animate-fade-in" style="animation-delay: 0.6s">
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
      <span>{{ gpsButtonText }}</span>
    </button>

    <!-- GPS Info -->
    <transition name="slide-up">
      <div v-if="showGPSStatus" class="gps-info">
        <div class="accuracy-indicator" :class="gpsAccuracyClass">
          <i class="fas fa-bullseye"></i>
          <span>{{ gpsStatusText }}</span>
        </div>
        <div class="gps-actions">
          <button
            class="btn-refresh"
            @click="$emit('refresh')"
            aria-label="Perbarui lokasi GPS"
            title="Refresh GPS"
          >
            <i class="fas fa-sync-alt"></i>
          </button>
          <button
            class="btn-help"
            @click="$emit('show-tips')"
            aria-label="Tips mendapatkan GPS akurat"
            title="Tips GPS"
          >
            <i class="fas fa-question-circle"></i>
          </button>
        </div>
      </div>
    </transition>

    <!-- Accuracy Message -->
    <div class="accuracy-message" :class="accuracyIndicatorClass">
      <i class="fas fa-info-circle"></i>
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
  gap: 1.5rem;
  margin-bottom: 3.5rem;
}

.btn-gps {
  padding: 1rem 2rem;
  border-radius: 100px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 2px solid var(--primary);
  background: white;
  color: var(--primary);
  transition: var(--transition);
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.1);
}

.btn-gps:hover:not(:disabled) {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(59, 130, 246, 0.2);
}

.gps-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gps-pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--primary);
  animation: pulse 1.5s infinite ease-out;
  opacity: 0.5;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

.gps-info {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.accuracy-indicator {
  padding: 0.75rem 1.5rem;
  border-radius: 100px;
  font-weight: 700;
  font-size: 0.8125rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.accuracy-indicator.good {
  background: var(--success-light);
  color: var(--success);
}
.accuracy-indicator.medium {
  background: var(--warning-light);
  color: var(--warning);
}
.accuracy-indicator.poor {
  background: var(--error-light);
  color: var(--error);
}

.gps-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-refresh,
.btn-help {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--gray-200);
  background: white;
  color: var(--gray-500);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.btn-refresh:hover,
.btn-help:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.accuracy-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.accuracy-message.info {
  color: var(--gray-500);
}
.accuracy-message.good {
  color: var(--success);
}
.accuracy-message.medium {
  color: var(--warning);
}
.accuracy-message.poor {
  color: var(--error);
}

.animate-fade-in {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
