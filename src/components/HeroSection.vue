<template>
  <section class="hero-section">
    <!-- Decorative Blobs -->
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>

    <div class="container">
      <div class="hero-content">
        <div class="hero-badge animate-fade-in" style="animation-delay: 0.1s">
          <i class="fas fa-shield-virus"></i> Siaga Banjir AI
        </div>
        <h1 class="animate-fade-in" style="animation-delay: 0.2s">AquaSentinel</h1>
        <h2 class="animate-fade-in" style="animation-delay: 0.3s">
          Sistem Peringatan Dini Banjir Jawa Timur
        </h2>
        <p class="subtitle animate-fade-in" style="animation-delay: 0.4s">
          Deteksi risiko banjir real-time berbasis AI untuk keselamatan Anda dan keluarga
        </p>

        <!-- Search Box -->
        <SearchBox
          v-model:searchQuery="searchQuery"
          :showSuggestions="showSuggestions"
          :filteredSuggestions="filteredSuggestions"
          :isLocationSaved="isLocationSaved"
          :isDetecting="isDetecting"
          :hasLocation="!!(selectedLocation || gpsLocation)"
          @select-suggestion="selectSuggestion"
          @toggle-save="toggleSaveLocation"
          @detect-risk="detectFloodRisk"
          @focus="handleFocus"
          @blur="handleBlur"
        />

        <!-- GPS Control -->
        <GPSControl
          :gpsButtonClass="gpsButtonClass"
          :gpsButtonIcon="gpsButtonIcon"
          :gpsButtonText="gpsButtonText"
          :isGettingLocation="isGettingLocation"
          :showGPSStatus="showGPSStatus"
          :gpsAccuracyClass="gpsAccuracyClass"
          :gpsStatusText="gpsStatusText"
          :accuracyIndicatorClass="accuracyIndicatorClass"
          :accuracyMessage="accuracyMessage"
          @get-location="getUserLocation"
          @refresh="refreshLocation"
          @show-tips="showGPSTips"
        />

        <!-- Map Display -->
        <transition name="scale">
          <div v-if="showMap" class="hero-map-container">
            <div id="hero-map" ref="mapContainer"></div>
          </div>
        </transition>

        <!-- Features -->
        <div class="features">
          <FeatureItem
            v-for="(feature, index) in features"
            :key="feature.title"
            :icon="feature.icon"
            :title="feature.title"
            :description="feature.description"
            :delay="0.7 + index * 0.1 + 's'"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, inject, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useGPS } from '../composables/useGPS'
import { searchLocations, CONFIG } from '../utils/constants'
import { useLocationStore } from '../stores/locationStore'
import { useMap } from '../composables/useMap'
import { calculateDistance } from '../utils/helpers'

// Components
import SearchBox from './hero/SearchBox.vue'
import GPSControl from './hero/GPSControl.vue'
import FeatureItem from './hero/FeatureItem.vue'

const emit = defineEmits(['detect-location'])

const route = useRoute()
const toast = inject('toast')
const searchQuery = ref('')
const showSuggestions = ref(false)
const isDetecting = ref(false)
const isGettingLocation = ref(false)
const gpsLocation = ref(null)
const selectedLocation = ref(null)
const showMap = ref(false)
const mapContainer = ref(null)
const mapInstance = ref(null)

const { initMap, updateUserMarker: updateMapUserMarker } = useMap()

watch(searchQuery, newVal => {
  if (newVal && newVal.length >= 2) {
    showSuggestions.value = true
  } else {
    showSuggestions.value = false
  }
})

const features = ref([
  {
    icon: 'fas fa-bolt',
    title: 'Real-time Tracking',
    description: 'Posisi live dengan akurasi tinggi'
  },
  { icon: 'fas fa-brain', title: 'AI Prediction', description: 'Prediksi banjir berbasis AI' },
  { icon: 'fas fa-robot', title: 'SiagaBot 24/7', description: 'Asisten virtual siap membantu' },
  { icon: 'fas fa-bell', title: 'Notifikasi Darurat', description: 'Peringatan langsung ke ponsel' }
])

// GPS Composable
const { getLocation, accuracy, accuracyLevel, isGPSLoading, gpsError, refreshLocation } = useGPS()
const locationStore = useLocationStore()
const showGPSTipsModal = inject('showGPSTipsModal')

const showGPSTips = () => {
  if (showGPSTipsModal) showGPSTipsModal()
}

onMounted(() => {
  locationStore.loadSavedLocations()

  if (!navigator.geolocation) {
    toast('Browser Anda tidak mendukung GPS. Gunakan Chrome/Firefox terbaru.', 'warning')
  }

  // Check for query params (from SavedLocationsView)
  if (route.query.lat && route.query.lng && route.query.address) {
    const lat = parseFloat(route.query.lat)
    const lng = parseFloat(route.query.lng)
    const address = route.query.address

    searchQuery.value = address
    selectedLocation.value = {
      lat,
      lng,
      displayName: address
    }

    showMap.value = true
    setTimeout(() => {
      initMap('hero-map', [lat, lng]).then(inst => {
        mapInstance.value = inst
        // Leaflet event listeners can be added here if needed
        mapInstance.value.on('click', e => {
          console.log('Map clicked at:', e.latlng.lat, e.latlng.lng)
        })
      })
    }, 500)
  }
})

const filteredSuggestions = computed(() => {
  if (!searchQuery.value || searchQuery.value.length < 2) return []
  return searchLocations(searchQuery.value)
})

const gpsButtonClass = computed(() => {
  if (isGettingLocation.value) return 'gps-loading'
  if (gpsError.value) return 'gps-error'
  return accuracyLevel.value || 'medium'
})

const gpsButtonIcon = computed(() => {
  if (isGettingLocation.value) return 'fas fa-spinner fa-spin'
  if (gpsError.value) return 'fas fa-exclamation-triangle'
  return 'fas fa-location-dot'
})

const gpsButtonText = computed(() => {
  if (isGettingLocation.value) return 'Mendeteksi GPS...'
  if (gpsError.value) return 'Gagal Deteksi'
  if (accuracyLevel.value === 'good') return 'GPS Akurat'
  if (accuracyLevel.value === 'medium') return 'GPS Sedang'
  return 'Gunakan Lokasi Saya'
})

const accuracyIndicatorClass = computed(() => {
  if (isGettingLocation.value) return 'info'
  return accuracyLevel.value || 'info'
})

const accuracyMessage = computed(() => {
  if (isGettingLocation.value) return 'Mendeteksi lokasi dengan akurasi tinggi...'
  if (accuracy.value > 0) {
    if (accuracyLevel.value === 'good') return `Akurasi tinggi (±${Math.round(accuracy.value)}m)`
    if (accuracyLevel.value === 'medium') return `Akurasi sedang (±${Math.round(accuracy.value)}m)`
    return `Akurasi rendah (±${Math.round(accuracy.value)}m) - Gunakan area terbuka`
  }
  return 'Tekan tombol GPS untuk mendeteksi lokasi Anda'
})

const showGPSStatus = computed(() => {
  return !isGettingLocation.value && !gpsError.value && accuracy.value > 0
})

const gpsAccuracyClass = computed(() => accuracyLevel.value || 'medium')

const gpsStatusText = computed(() => {
  const meters = Math.round(accuracy.value)
  if (accuracyLevel.value === 'good') return `GPS Akurat (±${meters}m)`
  if (accuracyLevel.value === 'medium') return `GPS Sedang (±${meters}m)`
  return `GPS Lemah (±${meters}m)`
})

const isLocationSaved = computed(() => {
  const current = selectedLocation.value || gpsLocation.value
  if (!current || !locationStore) return false

  const currentAddress = selectedLocation.value?.displayName || searchQuery.value
  return locationStore.isLocationSaved({
    lat: current.lat,
    lng: current.lng,
    address: currentAddress
  })
})

const toggleSaveLocation = () => {
  const current = selectedLocation.value || gpsLocation.value
  if (!current || !locationStore) return

  const currentAddress = selectedLocation.value?.displayName || searchQuery.value
  const locationData = {
    lat: current.lat,
    lng: current.lng,
    address: currentAddress,
    floodRisk: 'medium'
  }

  if (isLocationSaved.value) {
    locationStore.removeLocation(locationData)
    toast('Lokasi dihapus dari tersimpan', 'info')
  } else {
    locationStore.addLocation(locationData)
    toast('Lokasi berhasil disimpan!', 'success')
  }
}

const handleFocus = () => {
  if (searchQuery.value.length >= 2) {
    showSuggestions.value = true
  }
}

const handleBlur = () => {
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}

const selectSuggestion = suggestion => {
  searchQuery.value = suggestion.displayName
  selectedLocation.value = suggestion
  showSuggestions.value = false

  showMap.value = true
  setTimeout(() => {
    initMap('hero-map', [suggestion.lat, suggestion.lng]).then(inst => {
      mapInstance.value = inst
      // Leaflet event listeners can be added here if needed
      mapInstance.value.on('click', e => {
        console.log('Map clicked at:', e.latlng.lat, e.latlng.lng)
      })
    })
  }, 100)
}

const getUserLocation = async () => {
  isGettingLocation.value = true
  try {
    const location = await getLocation()
    gpsLocation.value = location
    searchQuery.value = `Lokasi GPS (${location.lat.toFixed(4)}, ${location.lng.toFixed(4)})`

    showMap.value = true
    setTimeout(() => {
      initMap('hero-map', [location.lat, location.lng]).then(inst => {
        mapInstance.value = inst
        updateMapUserMarker([location.lat, location.lng], accuracy.value)
      })
    }, 100)

    await detectFloodRisk(true)
  } catch (error) {
    console.error('GPS Error:', error)
    toast('Gagal mendapatkan lokasi GPS', 'error')
  } finally {
    isGettingLocation.value = false
  }
}

const detectFloodRisk = async (autoDetect = false) => {
  if (!searchQuery.value.trim() && !autoDetect) {
    toast('Silakan masukkan alamat atau gunakan GPS terlebih dahulu', 'warning')
    return
  }

  isDetecting.value = true

  try {
    let lat, lng, address
    if (autoDetect && gpsLocation.value) {
      lat = gpsLocation.value.lat
      lng = gpsLocation.value.lng
      address = searchQuery.value
    } else if (selectedLocation.value) {
      lat = selectedLocation.value.lat
      lng = selectedLocation.value.lng
      address = selectedLocation.value.displayName
    } else {
      toast('Pilih lokasi dari suggestions atau gunakan GPS', 'warning')
      isDetecting.value = false
      return
    }

    // Call store action
    locationStore.detectFloodRiskForLocation(lat, lng)
    const riskData = locationStore.floodRisk

    const locationData = {
      address,
      lat,
      lng,
      accuracy: autoDetect ? accuracy.value : 50,
      floodRisk: riskData.level,
      waterLevel: riskData.waterLevel,
      zoneName: riskData.zoneName
    }

    emit('detect-location', {
      location: locationData,
      gps: {
        accuracy: accuracy.value,
        accuracyLevel: accuracyLevel.value,
        signal: getSignalStrength(accuracy.value)
      }
    })

    toast('Risiko banjir berhasil dideteksi', 'success')
  } catch (error) {
    console.error('Detection error:', error)
    toast('Gagal mendeteksi risiko banjir. Coba lagi.', 'error')
  } finally {
    isDetecting.value = false
  }
}

const getSignalStrength = accuracy => {
  if (accuracy < 20) return 'Sangat Kuat'
  if (accuracy < 50) return 'Kuat'
  if (accuracy < 100) return 'Sedang'
  if (accuracy < 200) return 'Lemah'
  return 'Sangat Lemah'
}
</script>

<style scoped>
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: 100px;
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2rem;
  border: 1px solid hsla(var(--primary-h), var(--primary-s), 90%, 0.5);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}

.hero-content h1 {
  font-size: clamp(2rem, 7vw, 4.5rem);
  margin-bottom: 1.5rem;
  line-height: 1.1;
  font-weight: 900;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-content h2 {
  font-size: clamp(1.25rem, 4vw, 2rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--gray-900);
}

.subtitle {
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto 3.5rem;
  color: var(--gray-600);
  font-weight: 500;
}

.search-box {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: 1.25rem;
  box-shadow: var(--shadow-lg);
  margin-bottom: 2.5rem;
  position: relative;
  z-index: 100;
  transition: var(--transition);
}

.search-box:focus-within {
  background: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

.search-input {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.search-input > i {
  position: absolute;
  left: 1.5rem;
  color: var(--primary);
  font-size: 1.25rem;
}

.search-input input {
  flex: 1;
  border: 1px solid var(--gray-100);
  padding: 1.25rem 1.25rem 1.25rem 3.5rem;
  border-radius: var(--radius-lg);
  font-size: 1.125rem;
  font-weight: 500;
  transition: var(--transition);
  background: var(--gray-50);
}

.search-input input:focus {
  outline: none;
  background: white;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--primary-light);
}

.search-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.btn-detect {
  min-width: 180px;
  justify-content: center;
  height: 56px;
  font-size: 1rem;
  font-weight: 700;
}

.btn-bookmark {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-lg);
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  color: var(--gray-400);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.btn-bookmark:hover {
  background: white;
  border-color: var(--primary);
  color: var(--primary);
}

.btn-bookmark.saved {
  background: var(--primary-light);
  border-color: var(--primary);
  color: var(--primary);
}

/* Suggestions */
.suggestions {
  position: absolute;
  top: calc(100% + 1rem);
  left: 0;
  right: 0;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--gray-100);
  overflow: hidden;
  z-index: 1000;
}

.suggestion-item {
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  cursor: pointer;
  transition: var(--transition);
}

.suggestion-item:hover {
  background: var(--primary-light);
}

.suggestion-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  transition: var(--transition);
}

.suggestion-item:hover .suggestion-icon {
  background: white;
  transform: scale(1.1);
}

.suggestion-text {
  display: flex;
  flex-direction: column;
}

.suggestion-name {
  font-weight: 700;
  color: var(--gray-900);
}

.suggestion-meta {
  font-size: 0.8125rem;
  color: var(--gray-500);
}

/* GPS Section */
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

/* Accuracy indicator refinement */
.accuracy-indicator {
  padding: 0.75rem 1.5rem;
  border-radius: 100px;
  font-weight: 700;
  font-size: 0.8125rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Map */
.hero-map-container {
  margin-top: 1rem;
  margin-bottom: 4rem;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--glass-border);
  height: 500px;
}

#hero-map {
  width: 100%;
  height: 100%;
}

/* Features */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.feature {
  background: white;
  padding: 1.75rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--gray-100);
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  text-align: left;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}

.feature:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-light);
}

.feature-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--primary-light);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.feature-text h4 {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
}

.feature-text p {
  font-size: 0.875rem;
  color: var(--gray-600);
  line-height: 1.5;
  margin: 0;
}

/* Animations */
.animate-fade-in {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-scale-in {
  opacity: 0;
  transform: scale(0.95);
  animation: scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 4rem 0;
  }

  .hero-content h1 {
    font-size: clamp(2rem, 10vw, 3rem);
    margin-bottom: 1.5rem;
  }

  .search-input {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .search-input input {
    padding-right: 1.25rem;
    padding-left: 1.25rem;
  }

  .search-input > i {
    display: none;
  }

  .search-actions {
    width: 100%;
    justify-content: space-between;
  }

  .btn-detect {
    flex: 1;
  }
}
</style>
