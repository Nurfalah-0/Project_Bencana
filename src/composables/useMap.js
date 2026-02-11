import { ref, onUnmounted } from 'vue'
import { CONFIG } from '@/utils/constants'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export function useMap() {
  const map = ref(null)
  const userMarker = ref(null)
  const accuracyCircle = ref(null)
  const evacuationMarkers = ref([])
  const dangerZones = ref([])
  const riverPath = ref(null)
  const isSatelliteView = ref(false)

  // Fix for default marker icons in Leaflet when using build tools
  const fixLeafletIcon = () => {
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
      iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
      shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href
    })
  }

  const initMap = async (elementId, center = CONFIG.DEFAULT_CENTER, zoom = CONFIG.DEFAULT_ZOOM) => {
    try {
      fixLeafletIcon()

      if (map.value) {
        map.value.remove()
      }

      map.value = L.map(elementId).setView(center, zoom)

      // Use OpenStreetMap as default
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map.value)

      // Add initial features
      addEvacuationPoints()
      addDangerZones()
      addRiverFeatures()

      return map.value
    } catch (error) {
      console.error('Error loading Leaflet Map:', error)
      throw error
    }
  }

  const addEvacuationPoints = () => {
    if (!map.value) return

    // Clear existing
    evacuationMarkers.value.forEach(marker => marker.remove())
    evacuationMarkers.value = []

    CONFIG.EVACUATION_POINTS.forEach(point => {
      const marker = L.circleMarker([point.lat, point.lng], {
        radius: 8,
        fillColor: '#10B981',
        color: '#FFFFFF',
        weight: 2,
        opacity: 1,
        fillOpacity: 1
      }).addTo(map.value)

      marker.bindPopup(`
        <div style="min-width: 200px; padding: 5px;">
          <h4 style="margin: 0 0 8px 0; color: #10B981;">${point.name}</h4>
          <p style="margin: 4px 0;"><strong>Tipe:</strong> ${point.type}</p>
          <p style="margin: 4px 0;"><strong>Alamat:</strong> ${point.address}</p>
        </div>
      `)

      evacuationMarkers.value.push(marker)
    })
  }

  const addDangerZones = () => {
    if (!map.value) return

    // Clear existing
    dangerZones.value.forEach(zone => zone.remove())
    dangerZones.value = []

    CONFIG.DANGER_ZONES.forEach(zone => {
      const color = zone.risk === 'high' ? '#DC2626' : '#F59E0B'

      const circle = L.circle([zone.lat, zone.lng], {
        color: color,
        fillColor: color,
        fillOpacity: 0.2,
        radius: zone.radius
      }).addTo(map.value)

      const marker = L.circleMarker([zone.lat, zone.lng], {
        radius: 6,
        fillColor: color,
        color: '#FFFFFF',
        weight: 2,
        opacity: 1,
        fillOpacity: 1
      }).addTo(map.value)

      marker.bindPopup(`
        <div style="min-width: 200px; padding: 5px;">
          <h4 style="margin: 0 0 8px 0; color: ${color};">${zone.name}</h4>
          <p style="margin: 4px 0;"><strong>Risiko:</strong> ${zone.risk === 'high' ? 'Tinggi' : 'Sedang'}</p>
          <p style="margin: 4px 0;">${zone.description}</p>
        </div>
      `)

      dangerZones.value.push(circle, marker)
    })
  }

  const addRiverFeatures = () => {
    if (!map.value) return

    if (riverPath.value) riverPath.value.remove()

    const riverCoordinates = [
      [-7.713, 113.493],
      [-7.712, 113.495],
      [-7.711, 113.497],
      [-7.71, 113.498]
    ]

    riverPath.value = L.polyline(riverCoordinates, {
      color: '#059669',
      weight: 3,
      opacity: 0.8
    }).addTo(map.value)
  }

  const updateUserMarker = (position, accuracy) => {
    if (!map.value) return
    const pos = [position[0], position[1]]

    if (userMarker.value) userMarker.value.remove()
    if (accuracyCircle.value) accuracyCircle.value.remove()

    let color = '#2563eb'
    if (accuracy < 50) color = '#10B981'
    else if (accuracy < 100) color = '#F59E0B'
    else color = '#EF4444'

    userMarker.value = L.circleMarker(pos, {
      radius: 10,
      fillColor: color,
      color: '#FFFFFF',
      weight: 3,
      opacity: 1,
      fillOpacity: 1,
      zIndexOffset: 1000
    }).addTo(map.value)

    if (accuracy < 1000) {
      accuracyCircle.value = L.circle(pos, {
        radius: accuracy,
        color: color,
        fillColor: color,
        fillOpacity: 0.1,
        weight: 1
      }).addTo(map.value)
    }

    map.value.setView(pos, CONFIG.DEFAULT_ZOOM)
  }

  const showRouteToLocation = (fromLat, fromLng, toLat, toLng) => {
    // Basic Leaflet doesn't have a directions service like Google.
    // For now, we'll just draw a line or use an external service link.
    // In a real app, one might use Leaflet Routing Machine.
    if (!map.value) return

    const line = L.polyline(
      [
        [fromLat, fromLng],
        [toLat, toLng]
      ],
      {
        color: '#10B981',
        weight: 5,
        opacity: 0.7,
        dashArray: '10, 10'
      }
    ).addTo(map.value)

    evacuationMarkers.value.push(line)
  }

  const toggleSatelliteView = () => {
    if (!map.value) return
    isSatelliteView.value = !isSatelliteView.value

    // Clear existing tiles
    map.value.eachLayer(layer => {
      if (layer instanceof L.TileLayer) {
        map.value.removeLayer(layer)
      }
    })

    if (isSatelliteView.value) {
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution:
            'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EBP, and the GIS User Community'
        }
      ).addTo(map.value)
    } else {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map.value)
    }
  }

  const cleanup = () => {
    if (map.value) {
      map.value.remove()
      map.value = null
    }
    userMarker.value = null
    accuracyCircle.value = null
    evacuationMarkers.value = []
    dangerZones.value = []
    riverPath.value = null
  }

  onUnmounted(() => {
    cleanup()
  })

  return {
    map,
    userMarker,
    initMap,
    updateUserMarker,
    showRouteToLocation,
    toggleSatelliteView,
    cleanup
  }
}
