import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLocationStore = defineStore('location', () => {
  // State
  const currentLocation = ref(null)
  const savedLocations = ref([])
  const detectionHistory = ref([])
  const gpsAccuracy = ref(0)
  const gpsStatus = ref('idle') // 'idle', 'loading', 'success', 'error'
  
  // Getters
  const hasLocation = computed(() => currentLocation.value !== null)
  const locationCount = computed(() => savedLocations.value.length)
  const historyCount = computed(() => detectionHistory.value.length)
  const gpsAccuracyLevel = computed(() => {
    if (gpsAccuracy.value < 50) return 'good'
    if (gpsAccuracy.value < 100) return 'medium'
    return 'poor'
  })
  
  // Actions
  const setCurrentLocation = (location) => {
    currentLocation.value = location
    addToHistory(location)
  }
  
  const saveLocation = (location) => {
    const exists = savedLocations.value.some(loc => 
      loc.lat === location.lat && loc.lng === location.lng
    )
    
    if (!exists) {
      const locationWithId = {
        ...location,
        savedAt: new Date().toISOString(),
        id: Date.now().toString()
      }
      
      savedLocations.value.push(locationWithId)
      saveToLocalStorage()
      return locationWithId
    }
    return null
  }
  
  const removeSavedLocation = (id) => {
    savedLocations.value = savedLocations.value.filter(loc => loc.id !== id)
    saveToLocalStorage()
  }
  
  const addToHistory = (location) => {
    const historyItem = {
      ...location,
      detectedAt: new Date().toISOString(),
      id: Date.now().toString()
    }
    
    detectionHistory.value.unshift(historyItem)
    
    // Simpan hanya 50 riwayat terbaru
    if (detectionHistory.value.length > 50) {
      detectionHistory.value = detectionHistory.value.slice(0, 50)
    }
    
    saveToLocalStorage()
  }
  
  const clearHistory = () => {
    detectionHistory.value = []
    saveToLocalStorage()
  }
  
  const setGPSAccuracy = (accuracy) => {
    gpsAccuracy.value = accuracy
  }
  
  const setGPSStatus = (status) => {
    gpsStatus.value = status
  }
  
  // Local storage operations
  const saveToLocalStorage = () => {
    const data = {
      savedLocations: savedLocations.value,
      detectionHistory: detectionHistory.value.slice(0, 20) // Simpan hanya 20 riwayat
    }
    localStorage.setItem('aquasentinel_data', JSON.stringify(data))
  }
  
  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('aquasentinel_data')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        savedLocations.value = data.savedLocations || []
        detectionHistory.value = data.detectionHistory || []
      } catch (error) {
        console.error('Error loading from localStorage:', error)
      }
    }
  }
  
  // Initialize
  loadFromLocalStorage()
  
  return {
    // State
    currentLocation,
    savedLocations,
    detectionHistory,
    gpsAccuracy,
    gpsStatus,
    
    // Getters
    hasLocation,
    locationCount,
    historyCount,
    gpsAccuracyLevel,
    
    // Actions
    setCurrentLocation,
    saveLocation,
    removeSavedLocation,
    addToHistory,
    clearHistory,
    setGPSAccuracy,
    setGPSStatus,
    loadFromLocalStorage,
    saveToLocalStorage
  }
})