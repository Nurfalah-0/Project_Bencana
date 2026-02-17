<template>
  <div class="saved-locations-view">
    <div class="container">
      <div class="page-header">
        <h1><i class="fas fa-bookmark"></i> Lokasi Tersimpan</h1>
        <p>Daftar lokasi yang telah Anda simpan untuk pemantauan banjir</p>
      </div>

      <div v-if="savedLocations.length === 0" class="empty-state">
        <div class="empty-icon">
          <i class="fas fa-map-marker-alt"></i>
        </div>
        <h3>Belum ada lokasi tersimpan</h3>
        <p>Simpan lokasi untuk memantau risiko banjir dengan mudah</p>
        <button class="btn btn-primary" @click="goToHome">
          <i class="fas fa-search"></i> Cari Lokasi
        </button>
      </div>

      <div v-else class="locations-grid">
        <div v-for="location in savedLocations" :key="location.id" class="location-card">
          <div class="location-header">
            <h4>{{ location.address }}</h4>
            <div class="location-meta">
              <span class="timestamp">{{ formatDate(location.savedAt) }}</span>
              <span class="accuracy" :class="getAccuracyClass(location.accuracy)">
                ±{{ Math.round(location.accuracy) }}m
              </span>
            </div>
          </div>

          <div class="location-details">
            <div class="detail">
              <i class="fas fa-map-pin"></i>
              <span>{{ location.lat.toFixed(6) }}, {{ location.lng.toFixed(6) }}</span>
            </div>
            <div class="detail">
              <i class="fas fa-water"></i>
              <span>Risiko: {{ getRiskText(location.floodRisk) }}</span>
            </div>
          </div>

          <div class="location-actions">
            <button class="btn btn-sm btn-primary" @click="viewLocation(location)">
              <i class="fas fa-eye"></i> Lihat
            </button>
            <button class="btn btn-sm btn-secondary" @click="detectRisk(location)">
              <i class="fas fa-redo"></i> Deteksi Ulang
            </button>
            <button class="btn btn-sm btn-danger" @click="removeLocation(location.id)">
              <i class="fas fa-trash"></i> Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLocationStore } from '../stores/locationStore'

const router = useRouter()
const locationStore = useLocationStore()
const toast = inject('toast')

const savedLocations = computed(() => locationStore.savedLocations)

onMounted(() => {
  locationStore.loadStoreData()
})

const formatDate = dateString => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getAccuracyClass = accuracy => {
  if (accuracy < 50) return 'good'
  if (accuracy < 100) return 'medium'
  return 'poor'
}

const getRiskText = risk => {
  const risks = {
    low: 'Rendah',
    medium: 'Sedang',
    high: 'Tinggi'
  }
  return risks[risk] || 'Tidak diketahui'
}

const goToHome = () => {
  router.push('/')
}

const viewLocation = location => {
  // Navigate to home and trigger detection
  router.push({
    path: '/',
    query: {
      lat: location.lat,
      lng: location.lng,
      address: location.address
    }
  })
}

const detectRisk = location => {
  router.push({
    path: '/',
    query: {
      lat: location.lat,
      lng: location.lng,
      address: location.address,
      detect: 'true'
    }
  })
  toast('Memulai deteksi ulang...', 'info')
}

const removeLocation = id => {
  if (confirm('Hapus lokasi ini dari daftar tersimpan?')) {
    const location = savedLocations.value.find(loc => loc.id === id)
    if (location) {
      locationStore.removeLocation(location)
      toast('Lokasi berhasil dihapus', 'success')
    }
  }
}
</script>

<style scoped>
.saved-locations-view {
  padding: 2rem 0;
  min-height: 70vh;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.page-header p {
  color: var(--gray-600);
  font-size: 1.125rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
}

.empty-icon {
  font-size: 4rem;
  color: var(--gray-300);
  margin-bottom: 1.5rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--gray-700);
}

.empty-state p {
  color: var(--gray-500);
  margin-bottom: 2rem;
}

.locations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.location-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--gray-200);
  transition: var(--transition);
}

.location-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.location-header {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--gray-100);
}

.location-header h4 {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
  color: var(--gray-800);
}

.location-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}

.timestamp {
  color: var(--gray-500);
}

.accuracy {
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
}

.accuracy.good {
  background: #d1fae5;
  color: #065f46;
}

.accuracy.medium {
  background: #fef3c7;
  color: #92400e;
}

.accuracy.poor {
  background: #fee2e2;
  color: #991b1b;
}

.location-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.detail {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--gray-700);
}

.detail i {
  color: var(--primary);
  width: 20px;
}

.location-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn-danger {
  background: var(--danger);
  color: white;
}

.btn-danger:hover {
  background: #b91c1c;
}

@media (max-width: 768px) {
  .locations-grid {
    grid-template-columns: 1fr;
  }

  .page-header h1 {
    font-size: 2rem;
  }
}
</style>
