<template>
  <div class="risk-card glass-panel" :class="riskLevel">
    <!-- Header with animated icon -->
    <div class="card-header">
      <div class="risk-icon-wrapper">
        <i :class="riskIcon"></i>
        <div class="pulse-ring"></div>
      </div>
      <div class="header-content">
        <h4>{{ riskTitle }}</h4>
        <div class="badge-group">
          <span class="risk-badge">{{ riskLevel.toUpperCase() }}</span>
          <span class="conf-badge">Akurasi AI: {{ riskPercentage }}%</span>
        </div>
      </div>
    </div>

    <div class="card-body">
      <!-- Risk Description -->
      <p class="risk-desc">{{ riskDescription }}</p>

      <!-- Advanced Meter -->
      <div class="risk-meter-wrapper">
        <div class="meter-labels">
          <span>Aman</span>
          <span>Waspada</span>
          <span>Bahaya</span>
        </div>
        <div class="meter-track">
          <div class="meter-fill" :style="{ width: riskPercentage + '%' }"></div>
          <div class="meter-marker" :style="{ left: riskPercentage + '%' }">
            <div class="marker-tooltip">{{ riskPercentage }}%</div>
          </div>
        </div>
      </div>

      <!-- Info Grid -->
      <div class="info-grid">
        <div class="info-item">
          <i class="fas fa-hourglass-half"></i>
          <div>
            <span class="label">Prediksi</span>
            <span class="value">{{ predictionTime }}</span>
          </div>
        </div>
        <div class="info-item">
          <i class="fas fa-water"></i>
          <div>
            <span class="label">Air</span>
            <span class="value">{{ waterLevel }}</span>
          </div>
        </div>
        <div class="info-item">
          <i class="fas fa-users"></i>
          <div>
            <span class="label">Evakuasi</span>
            <span class="value">{{ evacuationPoints }} Titik</span>
          </div>
        </div>
      </div>

      <!-- Enhanced Recommendations -->
      <div class="recommendations-box">
        <div class="rec-title">
          <i class="fas fa-clipboard-check"></i>
          <span>Rekomendasi Tindakan</span>
        </div>
        <ul class="rec-list">
          <li v-for="(rec, index) in recommendations" :key="index">
            <i class="fas fa-check"></i>
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
    high: 'Terdeteksi Risiko Tinggi',
    medium: 'Waspada Risiko Sedang',
    low: 'Situasi Terpantau Aman'
  }
  return titles[props.riskLevel] || 'Analisis Risiko'
})

const riskIcon = computed(() => {
  const icons = {
    high: 'fas fa-exclamation-triangle',
    medium: 'fas fa-exclamation-circle',
    low: 'fas fa-shield-alt'
  }
  return icons[props.riskLevel] || 'fas fa-info-circle'
})

const recommendations = computed(() => {
  const recs = {
    high: [
      'Segera menuju titik evakuasi terdekat',
      'Matikan aliran listrik utama',
      'Amankan dokumen penting di tempat tinggi'
    ],
    medium: [
      'Siapkan tas siaga bencana',
      'Pantau terus informasi cuaca',
      'Bersihkan saluran air di sekitar'
    ],
    low: [
      'Tetap memantau prakiraan cuaca',
      'Pastikan drainase tidak tersumbat',
      'Simpan nomor darurat penting'
    ]
  }
  return recs[props.riskLevel] || []
})
</script>

<style scoped>
.risk-card {
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}

.card-header {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  background: var(--bg-header);
  border-bottom: 1px solid var(--border-color);
}

.risk-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--theme-color);
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.pulse-ring {
  position: absolute;
  inset: -4px;
  border-radius: 20px;
  border: 2px solid var(--theme-color);
  opacity: 0.2;
  animation: pulse 2s infinite;
}

.header-content h4 {
  margin: 0 0 0.4rem 0;
  font-size: 1.25rem;
  color: var(--gray-900);
}

.badge-group {
  display: flex;
  gap: 0.5rem;
}

.risk-badge {
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  background: var(--theme-color);
  color: white;
  letter-spacing: 0.05em;
}

.conf-badge {
  font-size: 0.7rem;
  color: var(--gray-500);
  background: white;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.card-body {
  padding: 1.5rem;
}

.risk-desc {
  margin: 0 0 1.5rem 0;
  color: var(--gray-600);
  font-size: 0.95rem;
  line-height: 1.5;
}

/* Meter */
.risk-meter-wrapper {
  margin-bottom: 2rem;
}

.meter-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--gray-400);
}

.meter-track {
  height: 10px;
  background: #f1f5f9;
  border-radius: 10px;
  position: relative;
  overflow: visible;
}

.meter-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981 0%, #f59e0b 50%, #ef4444 100%);
  border-radius: 10px;
  transition: width 1s ease-out;
}

.meter-marker {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background: white;
  border: 3px solid var(--theme-color);
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: left 1s ease-out;
  cursor: help;
}

.marker-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  background: var(--gray-900);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  opacity: 0;
  transition: all 0.2s;
  pointer-events: none;
}

.meter-marker:hover .marker-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-12px);
}

/* Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.info-item {
  background: var(--bg-info);
  padding: 0.8rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.info-item i {
  color: var(--theme-color);
  font-size: 1.1rem;
}

.info-item .label {
  display: block;
  font-size: 0.7rem;
  color: var(--gray-500);
  text-transform: uppercase;
  font-weight: 700;
}

.info-item .value {
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--gray-800);
}

/* Recommendations */
.recommendations-box {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.25rem;
}

.rec-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
}

.rec-title i {
  color: var(--primary);
}

.rec-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.rec-list li {
  display: flex;
  gap: 0.6rem;
  font-size: 0.85rem;
  color: var(--gray-600);
  margin-bottom: 0.5rem;
  align-items: flex-start;
}

.rec-list li i {
  color: var(--success);
  margin-top: 0.2rem;
  font-size: 0.75rem;
}

/* Theme Variations */
.risk-card.high {
  --theme-color: #ef4444;
  --bg-header: #fef2f2;
  --border-color: #fee2e2;
  --bg-info: #fef2f2;
}

.risk-card.medium {
  --theme-color: #f59e0b;
  --bg-header: #fffbeb;
  --border-color: #fef3c7;
  --bg-info: #fffbeb;
}

.risk-card.low {
  --theme-color: #10b981;
  --bg-header: #ecfdf5;
  --border-color: #d1fae5;
  --bg-info: #ecfdf5;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.2;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
