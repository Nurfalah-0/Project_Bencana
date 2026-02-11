<template>
  <div class="emergency-section">
    <div class="section-title">
      <div class="title-icon"><i class="fas fa-shield-alt"></i></div>
      <h3>Langkah Penyelamatan</h3>
    </div>

    <div class="steps-grid">
      <div
        v-for="(step, index) in actualSteps"
        :key="step.number"
        class="step-card glass-panel"
        :class="{ 'is-urgent': step.urgent }"
        :style="{ 'animation-delay': index * 0.1 + 's' }"
      >
        <div class="step-header">
          <div class="step-number">{{ step.number }}</div>
          <div class="step-icon">
            <i :class="step.icon"></i>
          </div>
        </div>

        <div class="step-content">
          <h4>{{ step.title }}</h4>
          <p>{{ step.description }}</p>
        </div>

        <button class="btn-step-action" @click="handleAction(step.action)">
          <span>{{ step.buttonText }}</span>
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  riskLevel: {
    type: String,
    default: 'low'
  },
  nearestEvacuation: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['show-evacuation-route', 'call-emergency', 'show-checklist'])

const actualSteps = computed(() => {
  const commonSteps = [
    {
      number: 1,
      title: 'Evakuasi',
      description:
        props.riskLevel === 'high'
          ? `SEGERA ke ${props.nearestEvacuation?.name || 'titik aman'}.`
          : 'Kenyali rute evakuasi terdekat.',
      icon: 'fas fa-running',
      action: 'showRoute',
      buttonText: 'Rute',
      urgent: props.riskLevel === 'high'
    },
    {
      number: 2,
      title: 'Bantuan',
      description: 'Hubungi layanan darurat 112 jika terjebak.',
      icon: 'fas fa-phone-volume',
      action: 'callEmergency',
      buttonText: 'Panggil',
      urgent: false
    },
    {
      number: 3,
      title: 'Persiapan',
      description: 'Siapkan tas siaga bencana & dokumen penting.',
      icon: 'fas fa-suitcase-medical',
      action: 'showChecklist',
      buttonText: 'Cek List',
      urgent: false
    }
  ]
  return commonSteps
})

const handleAction = action => {
  switch (action) {
    case 'showRoute':
      emit('show-evacuation-route')
      break
    case 'callEmergency':
      emit('call-emergency')
      break
    case 'showChecklist':
      emit('show-checklist')
      break
  }
}
</script>

<style scoped>
.emergency-section {
  margin-top: 1.5rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.title-icon {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-700);
}

.section-title h3 {
  font-size: 1.25rem;
  margin: 0;
  color: var(--gray-800);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.step-card {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: fadeUp 0.5s ease backwards;
}

.step-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.8);
}

.step-card.is-urgent {
  background: linear-gradient(145deg, rgba(254, 226, 226, 0.5), rgba(255, 255, 255, 0.6));
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.step-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.step-number {
  font-size: 3rem;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.05);
  line-height: 0.8;
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  pointer-events: none;
}

.step-icon {
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  z-index: 1;
}

.step-content {
  flex: 1;
  margin-bottom: 1rem;
  z-index: 1;
}

.step-content h4 {
  font-size: 1rem;
  margin: 0 0 0.25rem 0;
  color: var(--gray-900);
}

.step-content p {
  font-size: 0.8rem;
  color: var(--gray-600);
  margin: 0;
  line-height: 1.4;
}

.btn-step-action {
  width: 100%;
  padding: 0.6rem;
  border-radius: 10px;
  border: none;
  background: white;
  color: var(--primary);
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  z-index: 1;
}

.btn-step-action:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(37, 99, 235, 0.2);
}

.is-urgent .step-icon {
  color: var(--danger);
}

.is-urgent .btn-step-action {
  background: var(--danger);
  color: white;
}

.is-urgent .btn-step-action:hover {
  background: #b91c1c;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .steps-grid {
    grid-template-columns: 1fr;
  }
  .step-card {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
  }
  .step-header {
    margin: 0;
  }
  .step-content {
    margin: 0;
  }
  .btn-step-action {
    width: auto;
    padding: 0.5rem 1rem;
  }
  .step-number {
    display: none;
  }
}
</style>
