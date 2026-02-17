<template>
  <div class="risk-card" :class="riskLevel">
    <!-- Gradient Header Strip -->
    <div class="card-accent-strip"></div>

    <!-- Header with animated icon -->
    <header class="card-header">
      <div class="risk-icon-wrapper">
        <i :class="riskIcon"></i>
        <div class="pulse-ring"></div>
      </div>
      <div class="header-content">
        <h4 class="card-title">{{ riskTitle }}</h4>
        <div class="badge-group">
          <span class="risk-badge">
            <span class="badge-dot"></span>
            {{ riskLevel.toUpperCase() }}
          </span>
          <span class="conf-badge">
            <i class="fas fa-brain"></i>
            AI Confidence: {{ riskPercentage }}%
          </span>
        </div>
      </div>
    </header>

    <div class="card-body">
      <!-- Risk Description -->
      <div class="risk-desc-box">
        <i class="fas fa-triangle-exclamation desc-icon"></i>
        <p class="risk-desc">{{ riskDescription }}</p>
      </div>

      <!-- Advanced Meter -->
      <div class="risk-meter-container">
        <div class="meter-labels">
          <span class="label-low"> <i class="fas fa-shield-check"></i> Aman </span>
          <span class="label-high"> <i class="fas fa-burst"></i> Bahaya </span>
        </div>
        <div class="meter-track">
          <div class="meter-fill" :style="{ width: riskPercentage + '%' }"></div>
          <div class="meter-thumb" :style="{ left: riskPercentage + '%' }">
            <div class="thumb-point"></div>
            <span class="thumb-label">{{ riskPercentage }}%</span>
          </div>
        </div>
      </div>

      <!-- Info Grid -->
      <div class="info-row">
        <div class="info-box">
          <div class="info-icon"><i class="fas fa-clock"></i></div>
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
            <span class="action-num">{{ index + 1 }}</span>
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
      'Pastikan drainase tidak tersumbat'
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
  border-radius: 24px;
  overflow: hidden;
  transition: var(--transition);
  background: white;
  border: 1px solid var(--gray-100);
  position: relative;
  animation: cardReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

.risk-card:hover {
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

@keyframes cardReveal {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Accent Strip */
.card-accent-strip {
  height: 4px;
  background: var(--risk-gradient);
  width: 100%;
}

.card-header {
  padding: 1.75rem 1.75rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.risk-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: var(--risk-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--risk-color);
  position: relative;
  flex-shrink: 0;
  z-index: 1;
}

.pulse-ring {
  position: absolute;
  inset: -5px;
  border-radius: 20px;
  border: 2px solid var(--risk-color);
  opacity: 0.15;
  animation: ripple 2.5s infinite;
  z-index: -1;
}

@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 0.3;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.card-title {
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  color: var(--gray-900);
  letter-spacing: -0.01em;
}

.badge-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.risk-badge {
  font-size: 0.625rem;
  font-weight: 900;
  padding: 0.3rem 0.75rem;
  border-radius: 100px;
  background: var(--risk-color);
  color: white;
  letter-spacing: 0.06em;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  box-shadow: 0 2px 8px var(--risk-shadow);
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: white;
  animation: dotBlink 1.5s infinite;
}

@keyframes dotBlink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

.conf-badge {
  font-size: 0.625rem;
  font-weight: 700;
  padding: 0.3rem 0.75rem;
  border-radius: 100px;
  background: var(--gray-50);
  color: var(--gray-500);
  border: 1px solid var(--gray-100);
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
}

.conf-badge i {
  font-size: 0.625rem;
  color: var(--risk-color);
}

.card-body {
  padding: 0.5rem 1.75rem 1.75rem;
}

/* Risk Description Box */
.risk-desc-box {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: var(--risk-bg);
  border-radius: 14px;
  margin-bottom: 1.75rem;
  border-left: 3px solid var(--risk-color);
}

.desc-icon {
  color: var(--risk-color);
  font-size: 1rem;
  margin-top: 0.125rem;
  flex-shrink: 0;
}

.risk-desc {
  font-size: 0.9375rem;
  color: var(--gray-700);
  line-height: 1.6;
  font-weight: 600;
  margin: 0;
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
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.meter-labels i {
  font-size: 0.625rem;
}

.label-low {
  color: #10b981;
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.label-high {
  color: #ef4444;
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.meter-track {
  height: 10px;
  background: var(--gray-100);
  border-radius: 100px;
  position: relative;
  overflow: visible;
}

.meter-fill {
  height: 100%;
  border-radius: 100px;
  background: linear-gradient(
    90deg,
    #10b981 0%,
    #84cc16 25%,
    #facc15 50%,
    #f97316 75%,
    #ef4444 100%
  );
  transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.meter-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: left 1.5s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.thumb-point {
  width: 22px;
  height: 22px;
  background: white;
  border: 3px solid var(--risk-color);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.thumb-label {
  position: absolute;
  top: -28px;
  font-size: 0.6875rem;
  font-weight: 800;
  color: var(--risk-color);
  background: white;
  padding: 0.125rem 0.5rem;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  white-space: nowrap;
}

/* Info Grid */
.info-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.75rem;
}

.info-box {
  background: var(--gray-25);
  border: 1px solid var(--gray-100);
  padding: 1rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 0.875rem;
  transition: var(--transition-fast);
}

.info-box:hover {
  border-color: var(--risk-color);
  background: var(--risk-bg);
}

.info-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: white;
  border: 1px solid var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--risk-color);
  flex-shrink: 0;
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
  letter-spacing: 0.03em;
}
.info-value {
  font-size: 1rem;
  font-weight: 800;
  color: var(--gray-800);
}

/* Actions */
.actions-container {
  background: var(--gray-50);
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  border: 1px solid var(--gray-100);
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
  gap: 0.75rem;
}

.action-item {
  display: flex;
  gap: 0.75rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--gray-600);
  line-height: 1.4;
  align-items: flex-start;
}

.action-num {
  width: 22px;
  height: 22px;
  border-radius: 7px;
  background: var(--risk-bg);
  color: var(--risk-color);
  font-size: 0.6875rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 0.0625rem;
  border: 1px solid var(--risk-color);
}

/* Themes */
.risk-card.high {
  --risk-color: #ef4444;
  --risk-bg: #fef2f2;
  --risk-shadow: rgba(239, 68, 68, 0.25);
  --risk-gradient: linear-gradient(135deg, #ef4444, #f97316);
}
.risk-card.medium {
  --risk-color: #f59e0b;
  --risk-bg: #fffbeb;
  --risk-shadow: rgba(245, 158, 11, 0.25);
  --risk-gradient: linear-gradient(135deg, #f59e0b, #eab308);
}
.risk-card.low {
  --risk-color: #10b981;
  --risk-bg: #ecfdf5;
  --risk-shadow: rgba(16, 185, 129, 0.25);
  --risk-gradient: linear-gradient(135deg, #10b981, #34d399);
}

@media (max-width: 480px) {
  .info-row {
    grid-template-columns: 1fr;
  }
  .card-header {
    padding: 1.25rem;
  }
  .card-body {
    padding: 0.5rem 1.25rem 1.25rem;
  }
}
</style>
