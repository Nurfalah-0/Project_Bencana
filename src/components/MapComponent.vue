<template>
  <div class="map-wrapper">
    <div id="map" ref="mapContainer"></div>

    <!-- Floating Top Bar (Info) -->
    <div class="map-overlay-top">
      <div class="info-pill glass-panel">
        <i class="fas fa-location-dot text-primary"></i>
        <span>{{ coordinatesText }}</span>
      </div>
      <div class="info-pill glass-panel" v-if="accuracy">
        <i class="fas fa-bullseye text-accent"></i>
        <span>±{{ Math.round(accuracy) }}m</span>
      </div>
    </div>

    <!-- Floating Controls (Right) -->
    <div class="map-controls">
      <button class="control-btn glass-panel" @click="centerToUser" title="Lokasi Saya">
        <i class="fas fa-crosshairs"></i>
      </button>
      <button class="control-btn glass-panel" @click="toggleSatellite" title="Mode Satelit">
        <i class="fas fa-layer-group"></i>
      </button>

      <div class="zoom-group glass-panel">
        <button class="zoom-btn" @click="zoomIn" title="Perbesar">
          <i class="fas fa-plus"></i>
        </button>
        <button class="zoom-btn" @click="zoomOut" title="Perkecil">
          <i class="fas fa-minus"></i>
        </button>
      </div>

      <button
        class="control-btn glass-panel"
        :class="{ active: isRoutingActive }"
        @click="toggleRouting"
        title="Toggle Rute"
      >
        <i class="fas fa-route"></i>
      </button>
    </div>

    <!-- Floating Legend (Bottom) -->
    <div class="map-legend glass-panel">
      <div class="legend-item">
        <span class="dot user-dot"></span>
        <span>Lokasi Anda</span>
      </div>
      <div class="legend-item">
        <span class="dot danger-dot"></span>
        <span>Bahaya</span>
      </div>
      <div class="legend-item">
        <span class="dot safe-dot"></span>
        <span>Evakuasi</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useMap } from '../composables/useMap'

const props = defineProps({
  location: {
    type: Object,
    default: () => ({ lat: 0, lng: 0 })
  },
  accuracy: {
    type: Number,
    default: 0
  },
  showRouteTo: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['route-shown'])

const mapContainer = ref(null)
const mapInstance = ref(null)
const { initMap, updateUserMarker, showRouteToLocation, toggleSatelliteView } = useMap()
const isRoutingActive = ref(false)

const coordinatesText = computed(() => {
  if (!props.location || !props.location.lat) return 'Menunggu GPS...'
  return `${props.location.lat.toFixed(5)}, ${props.location.lng.toFixed(5)}`
})

onMounted(() => {
  if (mapContainer.value) {
    initMap('map').then(inst => {
      mapInstance.value = inst

      if (mapInstance.value) {
        mapInstance.value.on('click', e => {
          console.log('Map clicked at:', e.latlng.lat, e.latlng.lng)
        })
      }
    })
  }
})

onUnmounted(() => {
  mapInstance.value = null
})

watch(
  () => props.location,
  newLocation => {
    if (newLocation && newLocation.lat && mapContainer.value) {
      updateUserMarker([newLocation.lat, newLocation.lng], props.accuracy || 50)
    }
  },
  { immediate: true }
)

watch(
  () => props.showRouteTo,
  newRoute => {
    if (newRoute && props.location && props.location.lat) {
      showRouteToLocation(props.location.lat, props.location.lng, newRoute.lat, newRoute.lng)
      isRoutingActive.value = true
      emit('route-shown', newRoute)
    } else if (!newRoute && isRoutingActive.value) {
      isRoutingActive.value = false
    }
  }
)

const centerToUser = () => {
  if (props.location && props.location.lat) {
    updateUserMarker([props.location.lat, props.location.lng], props.accuracy || 50)
  }
}

const toggleSatellite = () => {
  toggleSatelliteView()
}

const zoomIn = () => {
  if (mapInstance.value) {
    mapInstance.value.setZoom(mapInstance.value.getZoom() + 1)
  }
}

const zoomOut = () => {
  if (mapInstance.value) {
    mapInstance.value.setZoom(mapInstance.value.getZoom() - 1)
  }
}

const toggleRouting = () => {
  isRoutingActive.value = !isRoutingActive.value
  if (!isRoutingActive.value) {
    emit('route-shown', null)
  }
}
</script>

<style scoped>
.map-wrapper {
  position: relative;
  height: 550px;
  width: 100%;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  border: 4px solid white;
}

#map {
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* Glass Panel Utility */
.glass-panel {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* Text Colors */
.text-primary {
  color: var(--primary);
}
.text-accent {
  color: var(--accent);
}

/* Top Overlay */
.map-overlay-top {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 10;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.info-pill {
  padding: 0.6rem 1.25rem;
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gray-800);
  display: flex;
  align-items: center;
  gap: 0.6rem;
  transition: transform 0.2s;
}

.info-pill:hover {
  transform: translateY(-2px);
}

/* Controls */
.map-controls {
  position: absolute;
  right: 1.5rem;
  bottom: 6rem; /* Above legend */
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.control-btn {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: var(--gray-600);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.control-btn:hover {
  transform: scale(1.1);
  color: var(--primary);
  background: white;
}

.control-btn.active {
  background: var(--primary);
  color: white;
}

.zoom-group {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
}

.zoom-btn {
  width: 48px;
  height: 48px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--gray-600);
  cursor: pointer;
  transition: background 0.2s;
}

.zoom-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--primary);
}

.zoom-btn:first-child {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

/* Legend */
.map-legend {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  padding: 0.75rem 1.5rem;
  border-radius: 100px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  white-space: nowrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--gray-700);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 0 0 2px white;
}

.user-dot {
  background: #2563eb;
  box-shadow:
    0 0 12px #2563eb,
    0 0 0 2px white;
}
.danger-dot {
  background: #dc2626;
  box-shadow:
    0 0 12px #dc2626,
    0 0 0 2px white;
}
.safe-dot {
  background: #10b981;
  box-shadow:
    0 0 12px #10b981,
    0 0 0 2px white;
}

/* Responsive */
@media (max-width: 640px) {
  .map-wrapper {
    height: 450px;
    border-width: 2px;
  }

  .map-overlay-top {
    top: 1rem;
    left: 1rem;
    right: 4rem; /* Avoid controls */
  }

  .info-pill span {
    font-size: 0.75rem;
  }

  .map-controls {
    right: 1rem;
    bottom: 5rem;
  }

  .control-btn,
  .zoom-btn {
    width: 40px;
    height: 40px;
  }

  .map-legend {
    bottom: 1rem;
    padding: 0.5rem 1rem;
    gap: 1rem;
    width: 90%;
    justify-content: center;
  }
}
</style>
