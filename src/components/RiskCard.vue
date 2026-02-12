<template>
  <div class="risk-card glass-panel" :class="riskLevel">
    <!-- Header with animated icon -->
    <header class="card-header">
      <div class="risk-icon-wrapper">
        <i :class="riskIcon"></i>
        <div class="pulse-ring"></div>
      </div>
      <div class="header-content">
        <h4 class="card-title">{{ riskTitle }}</h4>
        <div class="badge-group">
          <span class="risk-badge">{{ riskLevel.toUpperCase() }}</span>
          <span class="conf-badge">AI Confidence: {{ riskPercentage }}%</span>
        </div>
      </div>
    </header>

    <div class="card-body">
      <!-- Risk Description -->
      <p class="risk-desc">{{ riskDescription }}</p>

      <!-- Advanced Meter -->
      <div class="risk-meter-container">
        <div class="meter-labels">
          <span class="label-low">Aman</span>
          <span class="label-high">Bahaya</span>
        </div>
        <div class="meter-track">
          <div class="meter-fill" :style="{ width: riskPercentage + '%' }"></div>
          <div class="meter-thumb" :style="{ left: riskPercentage + '%' }">
            <div class="thumb-point"></div>
          </div>
        </div>
      </div>

      <!-- Info Grid -->
      <div class="info-row">
        <div class="info-box">
          <div class="info-icon"><i class="fas fa-clock-three"></i></div>
          <div class="info-data">
            <span class="info-label">Prediksi</span>
            <span class="info-value">{{ predictionTime }}</span>
          </div>
        </div>
        <div class="info-box">
          <div class="info-icon"><i class="fas fa-droplet"></i></div>
          <div class="info-data">
            <span class="info-label">Debit Air</span>
            <span class="info-value">{{ waterLevel }}</span>
          </div>
        </div>
      </div>

      <!-- Recommendations -->
      <div class="actions-container">
        <div class="actions-header">
          <i class="fas fa-list-check"></i>
          <span>Rekomendasi Utama</span>
        </div>
        <ul class="actions-list">
          <li v-for="(rec, index) in recommendations" :key="index" class="action-item">
            <i class="fas fa-circle-check"></i>
            <span>{{ rec }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  riskLevel: {
    type: String,
    default: 'low',
    validator: value => ['high', 'medium', 'low'].includes(value)
  },
  riskDescription: {
    type: String,
    default: 'Data risiko belum tersedia.'
  },
  riskPercentage: {
    type: Number,
    default: 0
  },
  predictionTime: {
    type: String,
    default: '-'
  },
  waterLevel: {
    type: String,
    default: 'Normal'
  },
  evacuationPoints: {
    type: Number,
    default: 0
  }
})

const riskTitle = computed(() => {
  const titles = {
    high: 'Risiko Banjir Tinggi',
    medium: 'Risiko Banjir Sedang',
    low: 'Area Terpantau Aman'
  }
  return titles[props.riskLevel] || 'Analisis Risiko'
})

const riskIcon = computed(() => {
  const icons = {
    high: 'fas fa-tornado',
    medium: 'fas fa-cloud-showers-heavy',
    low: 'fas fa-shield-check'
  }
  return icons[props.riskLevel] || 'fas fa-info-circle'
})

const recommendations = computed(() => {
  const recs = {
    high: [
      'Segera evakuasi ke titik aman terdekat',
      'Putuskan aliran listrik di rumah',
      'Pindahkan aset berharga ke lantai atas'
    ],
    medium: [
      'Siapkan tas siaga darurat',
      'Pantau curah hujan secara periodik',
      'Pastikan drainase tidak terstop'
    ],
    low: [
      'Pantau prakiraan cuaca harian',
      'Jaga kebersihan selokan sekitar',
      'Simpan kontak darurat 112'
    ]
  }
  return recs[props.riskLevel] || []
})
</script>

<style scoped>
.risk-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: var(--transition);
  background: white;
  border: 1px solid var(--gray-100);
}

.card-header {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  border-bottom: 1px solid var(--gray-100);
}

.risk-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--risk-color);
  position: relative;
  box-shadow: var(--shadow-sm);
  z-index: 1;
}

.pulse-ring {
  position: absolute;
  inset: -4px;
  border-radius: 18px;
  border: 2px solid var(--risk-color);
  opacity: 0.15;
  animation: ripple 2s infinite;
  z-index: -1;
}

@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 0.3;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

.card-title {
  font-size: 1.125rem;
  font-weight: 800;
  margin: 0 0 0.375rem 0;
  color: var(--gray-900);
}

.badge-group {
  display: flex;
  gap: 0.5rem;
}

.risk-badge {
  font-size: 0.625rem;
  font-weight: 900;
  padding: 0.25rem 0.625rem;
  border-radius: 100px;
  background: var(--risk-color);
  color: white;
  letter-spacing: 0.05em;
}

.conf-badge {
  font-size: 0.625rem;
  font-weight: 700;
  padding: 0.25rem 0.625rem;
  border-radius: 100px;
  background: var(--gray-50);
  color: var(--gray-500);
  border: 1px solid var(--gray-100);
}

.card-body {
  padding: 1.5rem;
}

.risk-desc {
  font-size: 0.9375rem;
  color: var(--gray-600);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

/* Meter Styles */
.risk-meter-container {
  margin-bottom: 2rem;
}

.meter-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.6875rem;
  font-weight: 800;
  color: var(--gray-400);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.meter-track {
  height: 10px;
  background: var(--gray-100);
  border-radius: 100px;
  position: relative;
}

.meter-fill {
  height: 100%;
  border-radius: 100px;
  background: linear-gradient(to right, #10b981, #f59e0b, #ef4444);
  transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.meter-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: white;
  border: 3px solid var(--risk-color);
  border-radius: 50%;
  box-shadow: var(--shadow-md);
  transition: left 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Info Grid */
.info-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.info-box {
  background: var(--gray-25);
  border: 1px solid var(--gray-100);
  padding: 0.875rem;
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.info-icon {
  font-size: 1rem;
  color: var(--risk-color);
}

.info-data {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.625rem;
  font-weight: 700;
  color: var(--gray-400);
  text-transform: uppercase;
}
.info-value {
  font-size: 0.875rem;
  font-weight: 800;
  color: var(--gray-800);
}

/* Actions */
.actions-container {
  background: var(--gray-50);
  border-radius: 14px;
  padding: 1.25rem;
}

.actions-header {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-weight: 800;
  font-size: 0.8125rem;
  color: var(--gray-900);
  margin-bottom: 1rem;
}

.actions-header i {
  color: var(--primary);
}

.actions-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.action-item {
  display: flex;
  gap: 0.75rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--gray-600);
  line-height: 1.4;
}

.action-item i {
  color: var(--secondary);
  font-size: 0.875rem;
  margin-top: 0.125rem;
}

/* Themes */
.risk-card.high {
  --risk-color: #ef4444;
}
.risk-card.medium {
  --risk-color: #f59e0b;
}
.risk-card.low {
  --risk-color: #10b981;
}

@media (max-width: 480px) {
  .info-row {
    grid-template-columns: 1fr;
  }
}
</style>
