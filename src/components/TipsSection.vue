<template>
  <div class="tips-section">
    <div class="tips-header">
      <div class="tips-icon-circle"><i class="fas fa-lightbulb"></i></div>
      <h3>Tips Edukasi & Mitigasi</h3>
    </div>

    <div class="tips-grid">
      <div
        v-for="(tip, index) in tips"
        :key="tip.id"
        class="tip-card"
        :style="{ 'animation-delay': index * 0.1 + 's' }"
      >
        <div class="tip-card-top">
          <div class="tip-icon-box">
            <i :class="tip.icon"></i>
          </div>
          <h4>{{ tip.title }}</h4>
        </div>
        <div class="tip-card-body">
          <p>{{ tip.description }}</p>
          <div class="tip-items-wrapper">
            <div v-for="(item, i) in tip.items" :key="i" class="tip-item-bullet">
              <i class="fas fa-check-circle"></i>
              <span>{{ item }}</span>
            </div>
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
    icon: 'fas fa-map-marked-alt',
    title: 'Kenali Peta Lokasi',
    description: 'Pahami topografi dan titik aman di sekitar Anda.',
    items: ['Catat titik evakuasi', 'Hafalkan rute alternatif', 'Kenali zona genangan']
  },
  {
    id: 2,
    icon: 'fas fa-bell',
    title: 'Peringatan Dini',
    description: 'Pastikan Anda selalu terhubung dengan info cuaca.',
    items: ['Aktifkan notifikasi AI', 'Follow info BPDB/BMKG', 'Cek Tinggi Muka Air']
  },
  {
    id: 3,
    icon: 'fas fa-users',
    title: 'Koordinasi Warga',
    description: 'Keselamatan bersama dimulai dari komunikasi yang baik.',
    items: ['Grup siaga lingkungan', 'Tunjuk koordinator RT', 'Pelajari sinyal kentongan']
  },
  {
    id: 4,
    icon: 'fas fa-box-open',
    title: 'Tas Siaga Bencana',
    description: 'Siapkan kebutuhan dasar untuk 3 hari pertama.',
    items: ['Dokumen & Arsip digital', 'Obat khusus & P3K', 'Senter & Powerbank']
  },
  {
    id: 5,
    icon: 'fas fa-house-flood-water',
    title: 'Preventif Rumah',
    description: 'Langkah teknis mengurangi kerugian aset.',
    items: ['Tinggikan stop kontak', 'Pintu barikade air', 'Elevasi barang berharga']
  },
  {
    id: 6,
    icon: 'fas fa-car-side',
    title: 'Logistik Kendaraan',
    description: 'Pastikan mobilitas tidak terhambat saat darurat.',
    items: ['BBM selalu terisi', 'Parkir di tempat tinggi', 'Cek kit darurat mobil']
  }
])
</script>

<style scoped>
.tips-section {
  margin-top: 2rem;
  margin-bottom: 4rem;
}

.tips-header {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.tips-icon-circle {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: var(--primary-light);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.tips-header h3 {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--gray-900);
  margin: 0;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.tip-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 1.75rem;
  border: 1px solid var(--gray-100);
  transition: var(--transition);
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  display: flex;
  flex-direction: column;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tip-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-light);
  box-shadow: var(--shadow-lg);
}

.tip-card-top {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.tip-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: var(--gray-50);
  color: var(--gray-600);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  transition: var(--transition);
}

.tip-card:hover .tip-icon-box {
  background: var(--primary);
  color: white;
  transform: scale(1.1);
}

.tip-card-top h4 {
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0;
  color: var(--gray-900);
}

.tip-card-body p {
  font-size: 0.875rem;
  color: var(--gray-500);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.tip-items-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.tip-item-bullet {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--gray-700);
}

.tip-item-bullet i {
  font-size: 0.875rem;
  color: var(--secondary);
}

@media (max-width: 1024px) {
  .tips-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .tips-grid {
    grid-template-columns: 1fr;
  }
}
</style>
