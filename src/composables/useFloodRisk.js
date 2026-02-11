import { ref, computed } from 'vue'
import { CONFIG } from '@/utils/constants'

export function useFloodRisk() {
  const floodRiskData = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const detectRisk = async (location) => {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simple risk calculation
      const risk = calculateRisk(location)
      floodRiskData.value = {
        ...risk,
        location: location,
        detectedAt: new Date().toISOString()
      }
      
      return floodRiskData.value
    } catch (err) {
      error.value = 'Gagal mendeteksi risiko banjir. Silakan coba lagi.'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const calculateRisk = (location) => {
    let totalScore = 0
    const factors = []

    // Factor 1: Distance to danger zones
    let minDistanceToDanger = Infinity
    CONFIG.DANGER_ZONES.forEach(zone => {
      const distance = calculateDistance(
        location.lat, location.lng,
        zone.lat, zone.lng
      )
      if (distance < minDistanceToDanger) {
        minDistanceToDanger = distance
      }
    })

    if (minDistanceToDanger < 200) {
      totalScore += 8
      factors.push('Sangat dekat dengan zona bahaya')
    } else if (minDistanceToDanger < 500) {
      totalScore += 5
      factors.push('Dekat dengan zona bahaya')
    } else if (minDistanceToDanger < 1000) {
      totalScore += 2
      factors.push('Berada dalam radius 1km dari zona bahaya')
    }

    // Factor 2: Proximity to river
    const riverDistance = calculateDistance(
      location.lat, location.lng,
      -7.7120, 113.4950 // River coordinates
    )
    
    if (riverDistance < 100) {
      totalScore += 7
      factors.push('Sangat dekat dengan sungai')
    } else if (riverDistance < 300) {
      totalScore += 4
      factors.push('Dekat dengan sungai')
    }

    // Factor 3: Elevation (simulated)
    const elevationScore = Math.random() * 3
    totalScore += elevationScore
    if (elevationScore > 2) {
      factors.push('Area rendah rawan genangan')
    }

    // Determine risk level
    let riskLevel
    if (totalScore >= 10) {
      riskLevel = 'high'
    } else if (totalScore >= 5) {
      riskLevel = 'medium'
    } else {
      riskLevel = 'low'
    }

    // Generate recommendations
    const recommendations = generateRecommendations(riskLevel, factors)

    return {
      level: riskLevel,
      score: Math.round(totalScore * 10) / 10,
      factors: factors,
      recommendations: recommendations,
      nearestEvacuation: findNearestEvacuation(location),
      predictionWindow: getPredictionWindow(riskLevel),
      waterLevel: getWaterLevel(riskLevel),
      confidence: Math.min(95, Math.round((totalScore / 15) * 100))
    }
  }

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c * 1000 // meters
  }

  const findNearestEvacuation = (location) => {
    let nearest = null
    let minDistance = Infinity
    
    CONFIG.EVACUATION_POINTS.forEach(point => {
      const distance = calculateDistance(
        location.lat, location.lng,
        point.lat, point.lng
      )
      if (distance < minDistance) {
        minDistance = distance
        nearest = { ...point, distance: Math.round(distance) }
      }
    })
    
    return nearest
  }

  const generateRecommendations = (riskLevel, factors) => {
    const baseRecommendations = {
      high: [
        'Evakuasi segera ke titik evakuasi terdekat',
        'Hubungi BPBD setempat untuk bantuan',
        'Siapkan tas darurat dengan dokumen penting',
        'Matikan listrik dan gas sebelum meninggalkan rumah',
        'Ikuti arahan petugas evakuasi'
      ],
      medium: [
        'Persiapkan rencana evakuasi',
        'Pantau informasi cuaca terkini',
        'Siapkan perlengkapan darurat',
        'Kenali rute evakuasi terdekat',
        'Koordinasikan dengan tetangga'
      ],
      low: [
        'Tetap waspada terhadap perubahan cuaca',
        'Simpan nomor darurat BPBD',
        'Kenali titik evakuasi di sekitar Anda',
        'Siapkan tas darurat untuk berjaga-jaga',
        'Periksa saluran air di sekitar rumah'
      ]
    }

    const specificRecommendations = []
    
    // Add specific recommendations based on factors
    if (factors.some(f => f.includes('sungai'))) {
      specificRecommendations.push('Waspada kenaikan debit sungai saat hujan deras')
    }
    
    if (factors.some(f => f.includes('zona bahaya'))) {
      specificRecommendations.push('Pantau perkembangan kondisi zona bahaya')
    }

    return [...baseRecommendations[riskLevel], ...specificRecommendations]
  }

  const getPredictionWindow = (riskLevel) => {
    const windows = {
      high: '30-60 menit',
      medium: '1-2 jam',
      low: '2-4 jam'
    }
    return windows[riskLevel] || 'Tidak dapat diprediksi'
  }

  const getWaterLevel = (riskLevel) => {
    const levels = {
      high: 'Tinggi (waspada)',
      medium: 'Sedang (siaga)',
      low: 'Rendah (normal)'
    }
    return levels[riskLevel] || 'Normal'
  }

  const riskColor = computed(() => {
    if (!floodRiskData.value) return '#6B7280'
    
    const colors = {
      high: '#DC2626',
      medium: '#F59E0B',
      low: '#10B981'
    }
    return colors[floodRiskData.value.level] || '#6B7280'
  })

  const riskIcon = computed(() => {
    if (!floodRiskData.value) return 'fas fa-question-circle'
    
    const icons = {
      high: 'fas fa-exclamation-triangle',
      medium: 'fas fa-exclamation-circle',
      low: 'fas fa-check-circle'
    }
    return icons[floodRiskData.value.level] || 'fas fa-question-circle'
  })

  return {
    floodRiskData,
    isLoading,
    error,
    detectRisk,
    riskColor,
    riskIcon
  }
}