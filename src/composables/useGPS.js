import { ref, computed } from 'vue'

export function useGPS() {
  const position = ref(null)
  const accuracy = ref(0)
  const accuracyLevel = ref('unknown')
  const isGPSLoading = ref(false)
  const gpsError = ref(null)
  const watchId = ref(null)
  const lastUpdate = ref(null)

  const getLocation = async (options = {}) => {
    isGPSLoading.value = true
    gpsError.value = null

    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        gpsError.value =
          'Browser Anda tidak mendukung geolokasi. Gunakan browser modern seperti Chrome atau Firefox.'
        isGPSLoading.value = false
        reject(gpsError.value)
        return
      }

      const defaultOptions = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }

      navigator.geolocation.getCurrentPosition(
        pos => {
          handlePositionSuccess(pos)
          resolve(position.value)
        },
        err => {
          handlePositionError(err)
          reject(gpsError.value)
        },
        { ...defaultOptions, ...options }
      )
    })
  }

  const handlePositionSuccess = pos => {
    position.value = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    }
    accuracy.value = pos.coords.accuracy || 100
    accuracyLevel.value = evaluateGPSAccuracy(accuracy.value)
    lastUpdate.value = new Date()
    isGPSLoading.value = false
  }

  const handlePositionError = error => {
    isGPSLoading.value = false
    const errorMessages = {
      1: 'Akses lokasi ditolak. Silakan izinkan akses lokasi di pengaturan browser Anda.',
      2: 'GPS tidak tersedia. Pastikan GPS aktif, gunakan area terbuka, dan coba lagi.',
      3: 'Waktu habis saat mengambil lokasi. Pastikan GPS aktif dan coba lagi.',
      0: 'Terjadi kesalahan saat mengambil lokasi. Silakan coba lagi.'
    }
    gpsError.value = errorMessages[error.code] || 'Gagal mendapatkan lokasi. Silakan coba lagi.'
    console.error('GPS Error:', error)
  }

  const evaluateGPSAccuracy = acc => {
    if (acc < 50) return 'good'
    if (acc < 100) return 'medium'
    return 'poor'
  }

  const refreshLocation = () => {
    return getLocation({ maximumAge: 0 })
  }

  const startWatching = () => {
    if (watchId.value) {
      navigator.geolocation.clearWatch(watchId.value)
    }

    watchId.value = navigator.geolocation.watchPosition(
      handlePositionSuccess,
      handlePositionError,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  }

  const stopWatching = () => {
    if (watchId.value) {
      navigator.geolocation.clearWatch(watchId.value)
      watchId.value = null
    }
  }

  const getSignalStrength = computed(() => {
    if (accuracy.value < 20) return 'Sangat Kuat'
    if (accuracy.value < 50) return 'Kuat'
    if (accuracy.value < 100) return 'Sedang'
    if (accuracy.value < 200) return 'Lemah'
    return 'Sangat Lemah'
  })

  const formattedAccuracy = computed(() => {
    return `±${Math.round(accuracy.value)} meter`
  })

  const timeSinceUpdate = computed(() => {
    if (!lastUpdate.value) return null
    const diff = new Date() - lastUpdate.value
    const seconds = Math.floor(diff / 1000)

    if (seconds < 60) return `${seconds} detik lalu`
    if (seconds < 3600) return `${Math.floor(seconds / 60)} menit lalu`
    return `${Math.floor(seconds / 3600)} jam lalu`
  })

  return {
    // State
    position,
    accuracy,
    accuracyLevel,
    isGPSLoading,
    gpsError,

    // Computed
    getSignalStrength,
    formattedAccuracy,
    timeSinceUpdate,

    // Methods
    getLocation,
    refreshLocation,
    startWatching,
    stopWatching,
    evaluateGPSAccuracy
  }
}
