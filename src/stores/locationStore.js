import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { CONFIG } from '@/utils/constants'

export const useLocationStore = defineStore('location', () => {
  const currentLocation = ref(null)
  const floodRisk = ref(null)
  const gpsData = ref({
    accuracy: 0,
    accuracyLevel: 'unknown',
    signal: 'unknown'
  })
  const savedLocations = ref([])
  const showResults = ref(false)

  // Load saved locations from localStorage
  const loadSavedLocations = () => {
    try {
      const saved = localStorage.getItem('aquasentinel_saved_locations')
      if (saved) {
        savedLocations.value = JSON.parse(saved)
      }
    } catch (e) {
      console.error('Failed to load saved locations', e)
      savedLocations.value = []
    }
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('aquasentinel_saved_locations', JSON.stringify(savedLocations.value))
  }

  const addLocation = location => {
    const exists = savedLocations.value.some(
      loc =>
        (loc.lat === location.lat && loc.lng === location.lng) || loc.address === location.address
    )

    if (!exists) {
      const newLoc = {
        ...location,
        id: location.id || Date.now(),
        savedAt: new Date().toISOString()
      }
      savedLocations.value.unshift(newLoc)
      if (savedLocations.value.length > 20) {
        savedLocations.value = savedLocations.value.slice(0, 20)
      }
      saveToLocalStorage()
      return true
    }
    return false
  }

  const removeLocation = location => {
    const initialLength = savedLocations.value.length
    savedLocations.value = savedLocations.value.filter(
      loc =>
        !(loc.lat === location.lat && loc.lng === location.lng) && loc.address !== location.address
    )

    if (savedLocations.value.length !== initialLength) {
      saveToLocalStorage()
      return true
    }
    return false
  }

  const isLocationSaved = location => {
    if (!location) return false
    return savedLocations.value.some(
      loc =>
        (loc.lat === location.lat && loc.lng === location.lng) || loc.address === location.address
    )
  }

  // Save current location
  const saveCurrentLocation = () => {
    if (!currentLocation.value) return

    const locationToSave = {
      ...currentLocation.value,
      id: Date.now(),
      savedAt: new Date().toISOString()
    }

    savedLocations.value.unshift(locationToSave)

    // Keep only last 20 saved locations
    if (savedLocations.value.length > 20) {
      savedLocations.value = savedLocations.value.slice(0, 20)
    }

    localStorage.setItem('aquasentinel_saved_locations', JSON.stringify(savedLocations.value))
  }

  // Set location from GPS
  const setLocationFromGPS = (position, accuracy) => {
    currentLocation.value = {
      lat: position.lat,
      lng: position.lng,
      address: `Lokasi (${position.lat.toFixed(4)}, ${position.lng.toFixed(4)})`,
      accuracy: accuracy,
      timestamp: new Date().toISOString(),
      type: 'gps'
    }

    // Auto-detect flood risk
    detectFloodRiskForLocation(position.lat, position.lng)
    showResults.value = true
  }

  // Set location from address
  const setLocationFromAddress = address => {
    const location = getLocationFromAddress(address)
    if (location) {
      currentLocation.value = {
        ...location,
        address: address,
        timestamp: new Date().toISOString(),
        type: 'manual'
      }
      detectFloodRiskForLocation(location.lat, location.lng)
      showResults.value = true
    }
  }

  // Detect flood risk (simulated)
  const detectFloodRiskForLocation = (lat, lng) => {
    // Simple flood risk calculation based on distance to danger zones
    let nearestDangerZone = null
    let minDistance = Infinity

    CONFIG.DANGER_ZONES.forEach(zone => {
      const distance = calculateDistance(lat, lng, zone.lat, zone.lng)
      if (distance < minDistance) {
        minDistance = distance
        nearestDangerZone = zone
      }
    })

    // Determine risk level (AI Prediction logic)
    let riskLevel = 'low'
    if (minDistance < 200) riskLevel = 'high'
    else if (minDistance < 500) riskLevel = 'medium'

    // Find nearest evacuation point
    const nearestEvac = findNearestEvacuationPoint(lat, lng)

    floodRisk.value = {
      level: riskLevel,
      description: getRiskDescription(riskLevel),
      nearestDangerZone,
      distanceToDanger: Math.round(minDistance),
      nearestEvacuationPoint: nearestEvac,
      predictionTime: getPredictionTime(riskLevel),
      waterLevel: riskLevel === 'high' ? 'critical' : riskLevel === 'medium' ? 'alert' : 'normal',
      timestamp: new Date().toISOString(),
      zoneName:
        nearestDangerZone && minDistance < nearestDangerZone.radius ? nearestDangerZone.name : null
    }
  }

  // Helper functions
  const getLocationFromAddress = address => {
    for (const [name, data] of Object.entries(CONFIG.LOCATIONS_DB)) {
      if (address.toLowerCase().includes(name.toLowerCase())) {
        return {
          lat: data.lat,
          lng: data.lng,
          address: `${data.type} ${name}, Kec. ${data.kec}, Kab. ${data.kab}`,
          ...data
        }
      }
    }
    return {
      lat: CONFIG.DEFAULT_CENTER[0],
      lng: CONFIG.DEFAULT_CENTER[1],
      address: address,
      type: 'Lokasi',
      kec: 'Paiton',
      kab: 'Probolinggo',
      floodRisk: 'medium',
      waterLevel: 'normal'
    }
  }

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c * 1000 // Convert to meters
  }

  const findNearestEvacuationPoint = (lat, lng) => {
    let nearest = null
    let minDistance = Infinity

    CONFIG.EVACUATION_POINTS.forEach(point => {
      const distance = calculateDistance(lat, lng, point.lat, point.lng)
      if (distance < minDistance) {
        minDistance = distance
        nearest = { ...point, distance: Math.round(distance) }
      }
    })

    return nearest
  }

  const getRiskDescription = riskLevel => {
    const descriptions = {
      high: 'Area rawan banjir. Siap siaga untuk evakuasi segera.',
      medium: 'Area berpotensi banjir saat hujan lebat. Waspada terhadap genangan.',
      low: 'Area relatif aman, tetap pantau kondisi cuaca.'
    }
    return descriptions[riskLevel] || 'Data risiko belum tersedia.'
  }

  const getPredictionTime = riskLevel => {
    const now = new Date()
    const minutes = riskLevel === 'high' ? 30 : riskLevel === 'medium' ? 60 : 120
    const predictionTime = new Date(now.getTime() + minutes * 60000)
    return predictionTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  }

  const getWaterLevel = riskLevel => {
    const levels = {
      high: 'Waspada',
      medium: 'Siaga',
      low: 'Normal'
    }
    return levels[riskLevel] || 'Normal'
  }

  // Computed properties
  const riskPercentage = computed(() => {
    if (!floodRisk.value) return 0
    const percentages = { high: 85, medium: 57, low: 20 }
    return percentages[floodRisk.value.level] || 0
  })

  const formattedCurrentTime = computed(() => {
    return new Date().toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Jakarta'
    })
  })

  return {
    // State
    currentLocation,
    floodRisk,
    gpsData,
    savedLocations,
    showResults,

    // Computed
    riskPercentage,
    formattedCurrentTime,

    // Actions
    loadSavedLocations,
    saveCurrentLocation,
    addLocation,
    removeLocation,
    isLocationSaved,
    setLocationFromGPS,
    setLocationFromAddress,
    detectFloodRiskForLocation
  }
})
