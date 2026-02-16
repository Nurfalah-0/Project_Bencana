<template>
  <div class="page-container">
    <div class="container content-wrapper">
      <div class="page-header animate-reveal">
        <div class="page-badge">
          <i class="fas fa-chart-line"></i>
          <span>HISTORICAL ANALYTICS</span>
        </div>
        <h1 class="page-title">Analisis <span class="highlight">Riwayat</span></h1>
        <p class="page-desc">
          Pelajari pola curah hujan dan riwayat banjir di wilayah Anda untuk kesiapsiagaan yang
          lebih baik.
        </p>
      </div>

      <div class="content-grid">
        <div
          v-if="detectionHistory.length === 0"
          class="empty-state animate-reveal"
          style="animation-delay: 0.2s"
        >
          <div class="empty-icon">
            <i class="fas fa-database"></i>
          </div>
          <h3>Belum Ada Data Riwayat</h3>
          <p>
            Mulailah mendeteksi lokasi untuk melihat analisis riwayat banjir di wilayah tersebut.
          </p>
          <router-link to="/" class="btn btn-primary">
            <i class="fas fa-search"></i>
            Mulai Deteksi Sekarang
          </router-link>
        </div>

        <div v-else class="history-list animate-reveal" style="animation-delay: 0.2s">
          <div class="history-actions">
            <button class="btn btn-danger btn-sm" @click="clearHistory">
              <i class="fas fa-trash"></i> Hapus Semua Riwayat
            </button>
          </div>

          <div class="history-items">
            <div v-for="item in detectionHistory" :key="item.id" class="history-card">
              <div class="history-status" :class="item.riskLevel"></div>
              <div class="history-details">
                <div class="history-main">
                  <span class="history-address">{{ item.address }}</span>
                  <span class="history-time">{{ formatDate(item.detectedAt) }}</span>
                </div>
                <div class="history-meta">
                  <span class="risk-badge" :class="item.riskLevel">
                    Risiko {{ formatRisk(item.riskLevel) }}
                  </span>
                  <span class="coordinates">
                    <i class="fas fa-map-marker-alt"></i>
                    {{ item.lat.toFixed(4) }}, {{ item.lng.toFixed(4) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'
import { useLocationStore } from '../stores/locationStore'

const locationStore = useLocationStore()
const toast = inject('toast')

const detectionHistory = computed(() => locationStore.detectionHistory)

const formatDate = dateString => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatRisk = level => {
  const risks = {
    low: 'Rendah',
    medium: 'Sedang',
    high: 'Tinggi'
  }
  return risks[level] || level
}

const clearHistory = () => {
  if (confirm('Hapus seluruh riwayat deteksi?')) {
    locationStore.clearHistory()
    toast('Riwayat berhasil dikosongkan', 'success')
  }
}
</script>

<style scoped>
.page-container {
  padding: 8rem 0;
  min-height: 80vh;
  background: var(--gray-25);
  position: relative;
  overflow: hidden;
}

.content-wrapper {
  position: relative;
  z-index: 10;
}

.page-header {
  text-align: center;
  margin-bottom: 5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.page-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 1.25rem;
  background: var(--primary-soft);
  color: var(--primary);
  border-radius: 100px;
  font-weight: 800;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  margin-bottom: 2rem;
  border: 1px solid hsla(var(--primary-h), var(--primary-s), 50%, 0.1);
}

.page-title {
  margin-bottom: 1.5rem;
}

.page-desc {
  font-size: 1.125rem;
  color: var(--gray-600);
  line-height: 1.7;
}

.empty-state {
  background: white;
  border-radius: var(--radius-xl);
  padding: 5rem 2rem;
  text-align: center;
  border: 1px solid var(--gray-100);
  box-shadow: var(--shadow-xl);
}

.empty-icon {
  width: 100px;
  height: 100px;
  background: var(--gray-50);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: var(--gray-300);
  margin: 0 auto 2rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.empty-state p {
  color: var(--gray-500);
  margin-bottom: 2.5rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.history-list {
  max-width: 900px;
  margin: 0 auto;
}

.history-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
}

.history-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.history-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  border: 1px solid var(--gray-100);
  box-shadow: var(--shadow-md);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.history-card:hover {
  transform: translateX(5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-soft);
}

.history-status {
  width: 6px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
}

.history-status.high {
  background: var(--danger);
}
.history-status.medium {
  background: var(--warning);
}
.history-status.low {
  background: var(--success);
}

.history-details {
  flex: 1;
}

.history-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.history-address {
  font-weight: 800;
  font-size: 1.125rem;
  color: var(--gray-900);
}

.history-time {
  font-size: 0.8125rem;
  color: var(--gray-400);
  font-weight: 600;
}

.history-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.risk-badge {
  padding: 0.375rem 0.875rem;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.risk-badge.high {
  background: #fee2e2;
  color: #991b1b;
}

.risk-badge.medium {
  background: #fef3c7;
  color: #92400e;
}

.risk-badge.low {
  background: #d1fae5;
  color: #065f46;
}

.coordinates {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: var(--gray-500);
  font-weight: 500;
}

.animate-reveal {
  opacity: 0;
  transform: translateY(20px);
  animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@media (max-width: 640px) {
  .history-main {
    flex-direction: column;
    gap: 0.5rem;
  }

  .history-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
}

@keyframes reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
