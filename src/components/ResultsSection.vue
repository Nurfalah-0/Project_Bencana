<template>
  <section class="results-section" :class="{ active: showResults }">
    <div class="results-backdrop" @click="closeResults"></div>
    <div class="container results-container">
      <div class="results-panel animate-panel">
        <!-- Panel Header -->
        <header class="panel-header glass-panel">
          <div class="header-main">
            <div class="header-icon-box">
              <i class="fas fa-microchip-ai"></i>
              <div class="icon-pulse"></div>
            </div>
            <div class="header-info">
              <h2 class="panel-title">Hasil Analisis AI</h2>
              <div class="panel-meta">
                <span class="meta-item">
                  <i class="fas fa-clock"></i>
                  Terdeteksi: {{ formattedTimeShort }}
                </span>
                <span class="meta-separator">•</span>
                <span class="meta-item">
                  <i class="fas fa-signal"></i>
                  Live System
                </span>
              </div>
            </div>
          </div>
          <button class="btn-close-panel" @click="closeResults" aria-label="Tutup Panel">
            <i class="fas fa-times"></i>
          </button>
        </header>

        <div class="panel-body">
          <div class="results-grid">
            <!-- Left Column: Location & Live Map -->
            <div class="grid-column left">
              <!-- Location Master Card -->
              <div class="location-master-card glass-panel">
                <div class="card-badges">
                  <div class="badge-status" :class="floodRisk?.level">
                    <span class="pulse-dot"></span>
                    {{ floodRisk?.level.toUpperCase() }}
                  </div>
                  <div class="badge-accuracy">
                    <i class="fas fa-bullseye"></i>
                    Akurasi: {{ accuracyText }}
                  </div>
                </div>

                <h3 class="location-title">{{ locationData?.address || 'Lokasi Terdeteksi' }}</h3>

                <div class="location-stats">
                  <div class="stat-item">
                    <div class="stat-icon"><i class="fas fa-water"></i></div>
                    <div class="stat-text">
                      <span class="stat-label">Elevasi Air</span>
                      <span class="stat-value">{{ locationData?.waterLevel || 'Normal' }}</span>
                    </div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-icon"><i class="fas fa-compass"></i></div>
                    <div class="stat-text">
                      <span class="stat-label">Koordinat</span>
                      <span class="stat-value"
                        >{{ locationData?.lat?.toFixed(4) }},
                        {{ locationData?.lng?.toFixed(4) }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- Interactive Map -->
              <div class="map-view-card glass-panel">
                <div class="map-header">
                  <i class="fas fa-map-location-dot"></i>
                  <span>Live Tactical Map</span>
                </div>
                <div class="map-wrapper">
                  <MapComponent
                    :location="locationData"
                    :accuracy="locationData?.accuracy"
                    :show-route-to="showRouteTo"
                  />
                </div>
              </div>
            </div>

            <!-- Right Column: Analysis & Response -->
            <div class="grid-column right">
              <RiskCard
                :risk-level="floodRisk?.level"
                :risk-description="floodRisk?.description"
                :risk-percentage="riskPercentage"
                :prediction-time="floodRisk?.predictionTime"
                :water-level="floodRisk?.waterLevel"
                :evacuation-points="CONFIG.EVACUATION_POINTS.length"
              />

              <EmergencySteps
                :risk-level="floodRisk?.level"
                :nearest-evacuation="floodRisk?.nearestEvacuationPoint"
                @show-evacuation-route="showEvacuationRoute"
                @call-emergency="callEmergency"
                @show-checklist="showChecklist"
              />

              <ShareSection
                :location="locationData"
                :risk-level="floodRisk?.level"
                :risk-description="floodRisk?.description"
                @share-whatsapp="shareViaWhatsApp"
                @share-telegram="shareViaTelegram"
                @copy-location="copyLocation"
                @save-location="saveLocation"
              />
            </div>
          </div>

          <TipsSection />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, inject } from 'vue'
import RiskCard from './RiskCard.vue'
import MapComponent from './MapComponent.vue'
import EmergencySteps from './EmergencySteps.vue'
import ShareSection from './ShareSection.vue'
import TipsSection from './TipsSection.vue'
import { CONFIG } from '@/utils/constants'
import { useLocationStore } from '../stores/locationStore'

const props = defineProps({
  locationData: {
    type: Object,
    required: true
  },
  showResults: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close-results'])
const toast = inject('toast')
const locationStore = useLocationStore()

const showRouteTo = ref(null)

const floodRisk = computed(() => {
  if (!props.locationData) return null
  const riskLevel = props.locationData.floodRisk || 'medium'
  return {
    level: riskLevel,
    description: getRiskDescription(riskLevel),
    predictionTime: getPredictionTime(riskLevel),
    waterLevel: props.locationData.waterLevel || 'Normal',
    nearestEvacuationPoint: CONFIG.EVACUATION_POINTS[0]
  }
})

const getRiskDescription = level => {
  const descriptions = {
    high: 'BAHAYA! Potensi banjir tinggi terdeteksi.',
    medium: 'WASPADA! Curah hujan tinggi berpotensi genangan.',
    low: 'AMAN. Tidak ada potensi banjir signifikan.'
  }
  return descriptions[level] || 'Analisis data belum lengkap.'
}

const getPredictionTime = level => {
  const now = new Date()
  const minutes = level === 'high' ? 30 : level === 'medium' ? 60 : 120
  const predictionTime = new Date(now.getTime() + minutes * 60000)
  return predictionTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

const formattedTimeShort = computed(() => {
  return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
})

const riskPercentage = computed(() => {
  if (!floodRisk.value) return 0
  const percentages = { high: 88, medium: 54, low: 18 }
  return percentages[floodRisk.value.level] || 0
})

const accuracyText = computed(() => {
  if (!props.locationData?.accuracy) return '±15m'
  return `±${Math.round(props.locationData.accuracy)}m`
})

const closeResults = () => emit('close-results')

const showEvacuationRoute = () => {
  if (floodRisk.value?.nearestEvacuationPoint) {
    showRouteTo.value = {
      lat: floodRisk.value.nearestEvacuationPoint.lat,
      lng: floodRisk.value.nearestEvacuationPoint.lng
    }
    // Scroll to map
    const mapEl = document.querySelector('.map-container')
    if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth' })
  }
}

const showChecklistModal = inject('showChecklistModal')

const showChecklist = () => {
  if (showChecklistModal) showChecklistModal()
}

const callEmergency = () => {
  window.open('tel:112')
}

// Sharing functions
const getShareMessage = () => {
  const loc = props.locationData
  const risk = floodRisk.value
  return `⚠️ *AQUASENTINEL ALERT* ⚠️
Status: ${risk.level.toUpperCase()}
Lokasi: ${loc.address}
Risiko: ${riskPercentage.value}%
Waktu: ${formattedTimeShort.value}

Cek detail: ${window.location.origin}`
}

const shareViaWhatsApp = () => {
  window.open(`https://wa.me/?text=${encodeURIComponent(getShareMessage())}`, '_blank')
}

const shareViaTelegram = () => {
  window.open(
    `https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(getShareMessage())}`,
    '_blank'
  )
}

const copyLocation = async () => {
  try {
    await navigator.clipboard.writeText(getShareMessage())
    toast('Info berhasil disalin!', 'success')
  } catch (err) {
    toast('Gagal menyalin', 'error')
  }
}

const saveLocation = () => {
  if (!props.locationData) return
  const added = locationStore.addLocation({
    ...props.locationData,
    floodRisk: floodRisk.value?.level || 'medium'
  })
  if (added) toast('Lokasi disimpan!', 'success')
  else toast('Lokasi sudah ada', 'info')
}
</script>

<style scoped>
.results-section {
  position: fixed;
  inset: 0;
  z-index: 2000;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  overflow-y: auto;
  padding: 4rem 1rem;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
}

.results-section.active {
  opacity: 1;
  pointer-events: auto;
  visibility: visible;
}

.results-backdrop {
  position: fixed;
  inset: 0;
  z-index: -1;
}

.results-container {
  max-width: 1200px;
  margin: 0 auto;
}

.results-panel {
  background: white;
  border-radius: 32px;
  box-shadow: var(--shadow-2xl);
  overflow: hidden;
  transform: translateY(40px) scale(0.98);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.results-section.active .results-panel {
  transform: translateY(0) scale(1);
}

/* Panel Header */
.panel-header {
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--gray-100);
  background: linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.8));
}

.header-main {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.header-icon-box {
  width: 60px;
  height: 60px;
  border-radius: 18px;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  position: relative;
  box-shadow: 0 8px 16px -4px rgba(37, 99, 235, 0.4);
}

.icon-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 22px;
  border: 2px solid var(--primary);
  opacity: 0.2;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.2;
  }
  100% {
    transform: scale(1.3);
    opacity: 0;
  }
}

.panel-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--gray-900);
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
}

.panel-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8125rem;
  color: var(--gray-500);
  font-weight: 600;
}

.meta-separator {
  color: var(--gray-300);
}

.btn-close-panel {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--gray-50);
  border: 1px solid var(--gray-100);
  color: var(--gray-400);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  transition: var(--transition-fast);
}

.btn-close-panel:hover {
  background: #fee2e2;
  color: #ef4444;
  border-color: #fecaca;
  transform: rotate(90deg);
}

/* Panel Body */
.panel-body {
  padding: 2.5rem;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.results-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2.5rem;
  margin-bottom: 3rem;
}

.grid-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Location Card */
.location-master-card {
  padding: 2rem;
  background: var(--gray-25);
  border-radius: 24px;
  border: 1px solid var(--gray-100);
}

.card-badges {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.badge-status {
  padding: 0.5rem 1rem;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  letter-spacing: 0.05em;
}

.badge-status.high {
  background: #fee2e2;
  color: #dc2626;
}
.badge-status.medium {
  background: #fef3c7;
  color: #d97706;
}
.badge-status.low {
  background: #d1fae5;
  color: #059669;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  animation: dot-pulse 1.5s infinite;
}

@keyframes dot-pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.badge-accuracy {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--gray-500);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.location-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--gray-900);
  margin: 0 0 2rem 0;
  line-height: 1.4;
}

.location-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: white;
  border: 1px solid var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  font-size: 1.125rem;
}

.stat-text {
  display: flex;
  flex-direction: column;
}
.stat-label {
  font-size: 0.6875rem;
  color: var(--gray-400);
  font-weight: 700;
  text-transform: uppercase;
}
.stat-value {
  font-size: 0.9375rem;
  color: var(--gray-800);
  font-weight: 800;
}

/* Map Card */
.map-view-card {
  border-radius: 24px;
  overflow: hidden;
  background: white;
  border: 1px solid var(--gray-100);
  flex: 1;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.map-header {
  padding: 1.25rem 1.5rem;
  background: var(--gray-25);
  border-bottom: 1px solid var(--gray-100);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  font-weight: 800;
  color: var(--gray-700);
}

.map-header i {
  color: var(--primary);
}
.map-wrapper {
  flex: 1;
  position: relative;
}

/* Responsive */
@media (max-width: 1024px) {
  .results-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .panel-body {
    max-height: none;
  }
  .panel-header {
    padding: 1.5rem;
  }
}

@media (max-width: 640px) {
  .results-section {
    padding: 0.5rem;
  }
  .results-panel {
    border-radius: 24px;
  }
  .panel-body {
    padding: 1.25rem;
  }
  .header-main {
    gap: 1rem;
  }
  .header-icon-box {
    width: 48px;
    height: 48px;
    font-size: 1.25rem;
    border-radius: 14px;
  }
  .panel-title {
    font-size: 1.125rem;
  }
  .location-stats {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
