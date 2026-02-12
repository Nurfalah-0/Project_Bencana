<template>
  <div class="emergency-section">
    <div class="section-header">
      <div class="header-icon-box">
        <i class="fas fa-shield-heart"></i>
      </div>
      <div class="header-content">
        <h3 class="section-title">Protokol Keselamatan</h3>
        <p class="section-subtitle">Langkah kritis untuk perlindungan diri & aset</p>
      </div>
    </div>

    <div class="steps-container">
      <div
        v-for="(step, index) in actualSteps"
        :key="step.number"
        class="step-card glass-panel"
        :class="{ urgent: step.urgent }"
        :style="{ '--anim-delay': index * 0.15 + 's' }"
      >
        <div class="card-glow"></div>

        <div class="step-top">
          <div class="step-badge">Tahap {{ step.number }}</div>
          <div class="step-icon-circle">
            <i :class="step.icon"></i>
          </div>
        </div>

        <div class="step-body">
          <h4 class="step-title">{{ step.title }}</h4>
          <p class="step-desc">{{ step.description }}</p>
        </div>

        <button class="btn-step-action" @click="handleAction(step.action)">
          <span>{{ step.buttonText }}</span>
          <i class="fas fa-chevron-right"></i>
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
  return [
    {
      number: 1,
      title: 'Evakuasi Cepat',
      description:
        props.riskLevel === 'high'
          ? `Segera menuju ke ${props.nearestEvacuation?.name || 'titik aman'} sekarang!`
          : 'Kenali jalur evakuasi dan titik aman terdekat di lokasi Anda.',
      icon: 'fas fa-person-running',
      action: 'showRoute',
      buttonText: 'Cek Jalur',
      urgent: props.riskLevel === 'high'
    },
    {
      number: 2,
      title: 'Layanan Darurat',
      description: 'Hubungi 112 jika Anda atau orang sekitar butuh pertolongan medis.',
      icon: 'fas fa-phone-sparkles',
      action: 'callEmergency',
      buttonText: 'Panggil',
      urgent: false
    },
    {
      number: 3,
      title: 'Persiapan Logistik',
      description: 'Pastikan Tas Siaga Bencana (TSB) sudah siap di dekat pintu utama.',
      icon: 'fas fa-kit-medical',
      action: 'showChecklist',
      buttonText: 'Cek TSB',
      urgent: false
    }
  ]
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
  margin-top: 2rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.header-icon-box {
  width: 44px;
  height: 44px;
  background: var(--primary-soft);
  color: var(--primary);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 800;
  margin: 0;
  color: var(--gray-900);
}

.section-subtitle {
  font-size: 0.8125rem;
  color: var(--gray-500);
  font-weight: 500;
  margin: 0.125rem 0 0 0;
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.step-card {
  background: white;
  padding: 1.5rem;
  border-radius: 20px;
  border: 1px solid var(--gray-100);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: var(--transition);
  animation: revealUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
  animation-delay: var(--anim-delay);
}

@keyframes revealUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.step-card:hover {
  transform: translateY(-8px);
  border-color: var(--primary-soft);
  box-shadow: var(--shadow-lg);
}

.card-glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, var(--primary-soft) 0%, transparent 70%);
  opacity: 0.3;
  pointer-events: none;
}

.step-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.step-badge {
  font-size: 0.625rem;
  font-weight: 800;
  color: var(--gray-400);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--gray-50);
  padding: 0.25rem 0.625rem;
  border-radius: 100px;
}

.step-icon-circle {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: var(--gray-50);
  color: var(--gray-600);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  transition: var(--transition-fast);
}

.step-card:hover .step-icon-circle {
  background: var(--primary);
  color: white;
  transform: scale(1.1) rotate(5deg);
}

.step-body {
  flex: 1;
}

.step-title {
  font-size: 1rem;
  font-weight: 800;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.step-desc {
  font-size: 0.8125rem;
  color: var(--gray-600);
  line-height: 1.5;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.btn-step-action {
  width: 100%;
  padding: 0.75rem;
  border-radius: 12px;
  background: var(--gray-50);
  border: 1px solid var(--gray-100);
  color: var(--gray-800);
  font-weight: 700;
  font-size: 0.8125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: var(--transition-fast);
}

.btn-step-action:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
  transform: translateY(-2px);
}

/* Urgent Styling */
.step-card.urgent {
  background: linear-gradient(135deg, #fffafa, #fff5f5);
  border-color: #feb2b2;
}

.step-card.urgent .step-icon-circle {
  background: #fee2e2;
  color: #dc2626;
}
.step-card.urgent:hover .step-icon-circle {
  background: #dc2626;
  color: white;
}
.step-card.urgent .btn-step-action {
  background: #dc2626;
  color: white;
  border: none;
}
.step-card.urgent .btn-step-action:hover {
  background: #991b1b;
}

@media (max-width: 900px) {
  .steps-container {
    grid-template-columns: 1fr;
  }
  .step-card {
    flex-direction: row;
    gap: 1.5rem;
    align-items: center;
  }
  .step-top {
    margin: 0;
    order: -1;
  }
  .step-badge {
    display: none;
  }
  .step-body {
    margin: 0;
  }
  .btn-step-action {
    width: auto;
    padding: 0.75rem 1.25rem;
  }
}
</style>
