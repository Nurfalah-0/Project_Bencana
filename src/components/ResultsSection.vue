<template>
  <section class="results-section" :class="{ active: showResults }">
    <div class="results-backdrop" @click="closeResults"></div>
    <div class="container">
      <div class="results-glass animate-up">
        <!-- Floating Header -->
        <div class="results-header glass-panel">
          <div class="header-title">
            <div class="header-icon"><i class="fas fa-satellite-dish"></i></div>
            <div class="header-text">
              <h2>Hasil Analisis AI</h2>
              <span class="header-subtitle">Real-time Flood Detection System</span>
            </div>
          </div>
          <button class="btn-close-compact" @click="closeResults" title="Tutup">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="results-body">
          <!-- Main Grid -->
          <div class="results-grid">
            <!-- Left Column: Status & Map -->
            <div class="grid-left">
              <!-- Location Status Card -->
              <div class="location-card glass-panel">
                <div class="location-header">
                  <div class="status-badge" :class="floodRisk?.level">
                    <span class="status-dot"></span>
                    {{ floodRisk?.level.toUpperCase() }}
                  </div>
                  <div class="time-badge">
                    <i class="far fa-clock"></i> {{ formattedTimeShort }}
                  </div>
                </div>
                <h3>{{ locationData?.address || 'Lokasi Terdeteksi' }}</h3>
                <div class="location-meta">
                  <span
                    ><i class="fas fa-ruler-vertical"></i> Elevasi:
                    {{ locationData?.waterLevel || 'Normal' }}</span
                  >
                  <span><i class="fas fa-bullseye"></i> Akurasi: {{ accuracyText }}</span>
                </div>
              </div>

              <!-- Map Container -->
              <div class="map-container glass-panel">
                <MapComponent
                  :location="locationData"
                  :accuracy="locationData?.accuracy"
                  :show-route-to="showRouteTo"
                />
              </div>
            </div>

            <!-- Right Column: Risk Details & Actions -->
            <div class="grid-right">
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
  display: flex;
  position: fixed;
  inset: 0;
  z-index: 2000;
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s ease;
  overflow-y: auto;
  padding: 2rem 1rem;
  justify-content: center;
  align-items: flex-start;
}

.results-section.active {
  opacity: 1;
  pointer-events: auto;
}

.results-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  z-index: -1;
}

.results-glass {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.5);
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  overflow: hidden;
}

.animate-up {
  animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Glass Panel Utility */
.glass-panel {
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: var(--radius-lg);
}

/* Header */
.results-header {
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.header-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: white;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2);
}

.header-text h2 {
  font-size: 1.5rem;
  margin: 0;
  color: var(--gray-900);
}

.header-subtitle {
  font-size: 0.875rem;
  color: var(--gray-500);
  font-weight: 500;
}

.btn-close-compact {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--gray-200);
  background: white;
  color: var(--gray-500);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-close-compact:hover {
  background: var(--danger);
  color: white;
  border-color: var(--danger);
  transform: rotate(90deg);
}

/* Body */
.results-body {
  padding: 2rem;
}

.results-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

/* Left Grid */
.grid-left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.location-card {
  padding: 1.5rem;
}

.location-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.05em;
}

.status-badge.high {
  background: #fee2e2;
  color: #dc2626;
}
.status-badge.medium {
  background: #fef3c7;
  color: #d97706;
}
.status-badge.low {
  background: #d1fae5;
  color: #059669;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
}

.time-badge {
  font-size: 0.875rem;
  color: var(--gray-500);
  background: white;
  padding: 0.35rem 0.85rem;
  border-radius: 100px;
  border: 1px solid var(--gray-100);
}

.location-card h3 {
  font-size: 1.75rem;
  margin: 0 0 1rem 0;
  color: var(--gray-900);
  line-height: 1.2;
}

.location-meta {
  display: flex;
  gap: 1.5rem;
}

.location-meta span {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9rem;
  color: var(--gray-600);
  font-weight: 500;
}

.location-meta i {
  color: var(--primary);
}

.map-container {
  height: 400px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

/* Right Grid */
.grid-right {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .results-grid {
    grid-template-columns: 1fr;
  }
  .grid-right {
    order: -1; /* Risk info likely more important on mobile */
  }
}

@media (max-width: 768px) {
  .results-body {
    padding: 1rem;
  }

  .location-card h3 {
    font-size: 1.5rem;
  }

  .map-container {
    height: 300px;
  }
}
</style>
