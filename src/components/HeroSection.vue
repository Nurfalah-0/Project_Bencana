<template>
  <section class="hero-section">
    <!-- Sophisticated Background Elements -->
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="hero-overlay"></div>

    <div class="container">
      <div class="hero-content">
        <div class="hero-badge animate-reveal">
          <div class="badge-content">
            <i class="fas fa-shield-check"></i>
            <span>AI FLOOD SHIELD v2.0</span>
          </div>
        </div>

        <h1 class="hero-title animate-reveal" style="animation-delay: 0.1s">AquaSentinel</h1>

        <h2 class="hero-subtitle animate-reveal" style="animation-delay: 0.2s">
          Sistem Peringatan Dini Banjir <span class="highlight">Jawa Timur</span>
        </h2>

        <p class="hero-description animate-reveal" style="animation-delay: 0.3s">
          Deteksi risiko banjir real-time berbasis AI untuk keselamatan Anda dan keluarga dengan
          akurasi pemosisian tinggi.
        </p>

        <!-- Search Box Integration -->
        <div class="hero-main-action animate-reveal" style="animation-delay: 0.4s">
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
        </div>

        <!-- GPS Control Integration -->
        <div class="hero-gps-action animate-reveal" style="animation-delay: 0.5s">
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
        </div>

        <!-- Map Display -->
        <transition name="scale-fade">
          <div v-if="showMap" class="hero-map-wrapper animate-reveal" style="animation-delay: 0.2s">
            <div class="map-container-inner">
              <div id="hero-map" ref="mapContainer"></div>
              <div class="map-overlay-info">
                <i class="fas fa-location-crosshairs"></i>
                <span>Live Location Tracking</span>
              </div>
            </div>
          </div>
        </transition>

        <!-- Features Grid -->
        <div class="features-grid">
          <FeatureItem
            v-for="(feature, index) in features"
            :key="feature.title"
            :icon="feature.icon"
            :title="feature.title"
            :description="feature.description"
            :delay="0.6 + index * 0.1 + 's'"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, inject, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useGPS } from '../composables/useGPS'
import { searchLocations } from '../utils/constants'
import { useLocationStore } from '../stores/locationStore'
import { useMap } from '../composables/useMap'

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
    icon: 'fas fa-bolt-lightning',
    title: 'Real-time Tracking',
    description: 'Update posisi live dengan presisi milimeter'
  },
  {
    icon: 'fas fa-microchip',
    title: 'AI Engine',
    description: 'Prediksi risiko banjir berbasis mesin pembelajaran'
  },
  {
    icon: 'fas fa-cloud-bolt',
    title: 'Radar Curah Hujan',
    description: 'Pantauan cuaca ekstrem langsung dari BMKG'
  },
  {
    icon: 'fas fa-bell',
    title: 'Siaga Dini',
    description: 'Notifikasi instan saat level air meningkat'
  }
])

// GPS Composable
const { getLocation, accuracy, accuracyLevel, gpsError, refreshLocation } = useGPS()
const locationStore = useLocationStore()
const showGPSTipsModal = inject('showGPSTipsModal')

const showGPSTips = () => {
  if (showGPSTipsModal) showGPSTipsModal()
}

onMounted(() => {
  locationStore.loadSavedLocations()

  if (!navigator.geolocation) {
    toast('Browser Anda tidak mendukung GPS.', 'warning')
  }

  // Check for query params
  if (route.query.lat && route.query.lng && route.query.address) {
    const lat = parseFloat(route.query.lat)
    const lng = parseFloat(route.query.lng)
    const address = route.query.address

    searchQuery.value = address
    selectedLocation.value = { lat, lng, displayName: address }

    showMap.value = true
    setTimeout(() => {
      initMap('hero-map', [lat, lng]).then(inst => {
        mapInstance.value = inst
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
  return accuracyLevel.value || ''
})

const gpsButtonIcon = computed(() => {
  if (isGettingLocation.value) return 'fas fa-circle-notch fa-spin'
  if (gpsError.value) return 'fas fa-triangle-exclamation'
  return 'fas fa-crosshairs'
})

const gpsButtonText = computed(() => {
  if (isGettingLocation.value) return 'Mensinkronkan GPS...'
  if (gpsError.value) return 'GPS Bermasalah'
  if (accuracyLevel.value === 'good') return 'Sinyal GPS Optimal'
  if (accuracyLevel.value === 'medium') return 'Sinyal GPS Stabil'
  return 'Deteksi Posisi Saya'
})

const accuracyIndicatorClass = computed(() => {
  if (isGettingLocation.value) return 'info'
  return accuracyLevel.value || 'info'
})

const accuracyMessage = computed(() => {
  if (isGettingLocation.value) return 'Mencari koordinat satelit...'
  if (accuracy.value > 0) {
    if (accuracyLevel.value === 'good') return `Akurasi optimal (±${Math.round(accuracy.value)}m)`
    return `Akurasi sedang (±${Math.round(accuracy.value)}m) - Cek ruang terbuka`
  }
  return 'Gunakan GPS untuk data paling akurat'
})

const showGPSStatus = computed(() => {
  return !isGettingLocation.value && !gpsError.value && accuracy.value > 0
})

const gpsAccuracyClass = computed(() => accuracyLevel.value || 'medium')

const gpsStatusText = computed(() => {
  const meters = Math.round(accuracy.value)
  return `Presisi: ±${meters}m`
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
    toast('Lokasi dihapus', 'info')
  } else {
    locationStore.addLocation(locationData)
    toast('Lokasi disimpan!', 'success')
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
    })
  }, 100)
}

const getUserLocation = async () => {
  isGettingLocation.value = true
  try {
    const location = await getLocation()
    gpsLocation.value = location
    searchQuery.value = `📍 Lokasi GPS Aktif`

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
    toast('GPS tidak terdeteksi', 'error')
  } finally {
    isGettingLocation.value = false
  }
}

const detectFloodRisk = async (autoDetect = false) => {
  if (!searchQuery.value.trim() && !autoDetect) {
    toast('Input alamat atau gunakan GPS', 'warning')
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
      toast('Lokasi tidak valid', 'warning')
      isDetecting.value = false
      return
    }

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

    toast('Analisis risiko selesai', 'success')
  } catch (error) {
    console.error('Detection error:', error)
    toast('Gagal menganalisis risiko', 'error')
  } finally {
    isDetecting.value = false
  }
}

const getSignalStrength = accuracy => {
  if (accuracy < 20) return 'Ekselen'
  if (accuracy < 50) return 'Kuat'
  if (accuracy < 100) return 'Cukup'
  return 'Lemah'
}
</script>

<style scoped>
.hero-badge {
  display: inline-flex;
  margin-bottom: 2rem;
}

.badge-content {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 1.25rem;
  background: var(--primary-soft);
  color: var(--primary);
  border-radius: 100px;
  font-weight: 800;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  border: 1px solid hsla(var(--primary-h), var(--primary-s), 50%, 0.1);
  box-shadow: 0 4px 12px var(--primary-soft);
}

.hero-title {
  font-weight: 900;
  margin-bottom: 1rem;
}

.hero-subtitle {
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.hero-description {
  font-size: clamp(1.125rem, 3vw, 1.25rem);
  max-width: 700px;
  margin: 0 auto 3.5rem;
  color: var(--gray-600);
  line-height: 1.7;
  font-weight: 500;
}

.hero-main-action {
  max-width: 800px;
  margin: 0 auto 2rem;
  position: relative;
  z-index: 1000; /* Extremely high to beat any sibling overlays */
}

.hero-gps-action {
  margin: 0 auto 5rem;
  position: relative;
  z-index: 50;
}

/* Map Refinement */
.hero-map-wrapper {
  margin: 3rem auto 5rem;
  max-width: 1000px;
  position: relative;
}

.map-container-inner {
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--glass-border);
  height: clamp(350px, 50vh, 550px);
  position: relative;
}

#hero-map {
  width: 100%;
  height: 100%;
}

.map-overlay-info {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  padding: 0.75rem 1.25rem;
  border-radius: 100px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
  font-size: 0.8125rem;
  color: var(--primary);
  box-shadow: var(--shadow-md);
  z-index: 500;
  pointer-events: none;
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 4rem;
  position: relative;
  z-index: 10;
}

/* Animations */
.animate-reveal {
  opacity: 0;
  transform: translateY(20px);
  animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scale-fade-enter-active,
.scale-fade-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.scale-fade-enter-from,
.scale-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .hero-description {
    margin-bottom: 2.5rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .map-container-inner {
    height: 350px;
    border-radius: var(--radius-lg);
  }
}
</style>
