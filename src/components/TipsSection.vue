<template>
  <div class="tips-section">
    <div class="tips-header">
      <div class="header-icon-box">
        <i class="fas fa-lightbulb-on"></i>
      </div>
      <div class="header-content">
        <h3 class="tips-title">Panduan & Edukasi</h3>
        <p class="tips-subtitle">Tindakan preventif untuk meminimalisir dampak bencana</p>
      </div>
    </div>

    <div class="tips-grid">
      <div
        v-for="(tip, index) in tips"
        :key="tip.id"
        class="tip-card"
        :style="{ '--anim-delay': index * 0.1 + 's' }"
      >
        <div class="tip-top">
          <div class="tip-icon-circle">
            <i :class="tip.icon"></i>
          </div>
          <h4 class="tip-card-title">{{ tip.title }}</h4>
        </div>

        <p class="tip-card-desc">{{ tip.description }}</p>

        <div class="tip-check-list">
          <div v-for="(item, i) in tip.items" :key="i" class="check-item">
            <div class="check-dot"></div>
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tips = ref([
  {
    id: 1,
    icon: 'fas fa-map-location-dot',
    title: 'Analisis Medan',
    description: 'Pahami kondisi geografis dan titik evakuasi di sekitar Anda.',
    items: ['Hafalkan rute alternatif', 'Kenali zona rawan genangan']
  },
  {
    id: 2,
    icon: 'fas fa-tower-broadcast',
    title: 'Informasi Real-time',
    description: 'Selalu terhubung dengan pusat data peringatan dini.',
    items: ['Aktifkan notifikasi aplikasi', 'Pantau debit sungai terdekat']
  },
  {
    id: 3,
    icon: 'fas fa-people-group',
    title: 'Sinergi Warga',
    description: 'Keselamatan bersama dimulai dari kordinasi lingkungan.',
    items: ['Grup siaga bencana RT/RW', 'Tunjuk koordinator lapangan']
  },
  {
    id: 4,
    icon: 'fas fa-briefcase-medical',
    title: 'Logistik Darurat',
    description: 'Siapkan kebutuhan dasar untuk bertahan 72 jam.',
    items: ['P3K & Obat-obatan rutin', 'Cadangan pangan & air bersih']
  },
  {
    id: 5,
    icon: 'fas fa-house-chimney-crack',
    title: 'Proteksi Rumah',
    description: 'Langkah teknis mengamankan properti dari genangan.',
    items: ['Tinggikan instalasi listrik', 'Barikade pintu masuk air']
  },
  {
    id: 6,
    icon: 'fas fa-car-rear',
    title: 'Aset Bergerak',
    description: 'Posisikan kendaraan di tempat yang aman dan tinggi.',
    items: ['Parkir di area elevasi tinggi', 'Pastikan tangki BBM terisi']
  }
])
</script>

<style scoped>
.tips-section {
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.tips-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.header-icon-box {
  width: 44px;
  height: 44px;
  background: var(--primary-soft);
  color: var(--primary);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.tips-title {
  font-size: 1.125rem;
  font-weight: 800;
  margin: 0;
  color: var(--gray-900);
}

.tips-subtitle {
  font-size: 0.8125rem;
  color: var(--gray-500);
  font-weight: 500;
  margin-top: 0.125rem;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.tip-card {
  background: white;
  border-radius: 20px;
  padding: 1.75rem;
  border: 1px solid var(--gray-100);
  transition: var(--transition);
  animation: revealUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
  animation-delay: var(--anim-delay);
}

.tip-card:hover {
  transform: translateY(-6px);
  border-color: var(--primary-soft);
  box-shadow: var(--shadow-lg);
}

.tip-top {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.tip-icon-circle {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--gray-50);
  color: var(--gray-600);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  transition: var(--transition-fast);
}

.tip-card:hover .tip-icon-circle {
  background: var(--primary);
  color: white;
}

.tip-card-title {
  font-size: 1rem;
  font-weight: 800;
  color: var(--gray-900);
  margin: 0;
}

.tip-card-desc {
  font-size: 0.8125rem;
  color: var(--gray-500);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.tip-check-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--gray-700);
}

.check-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--secondary);
}

@keyframes revealUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1024px) {
  .tips-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .tips-grid {
    grid-template-columns: 1fr;
  }
}
</style>
