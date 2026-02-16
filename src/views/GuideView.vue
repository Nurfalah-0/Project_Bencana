<template>
  <div class="page-container">
    <div class="container">
      <div class="page-header animate-reveal">
        <div class="page-badge">
          <i class="fas fa-book"></i>
          <span>USER DOCUMENTATION</span>
        </div>
        <h1 class="page-title">Buku <span class="highlight">Panduan</span></h1>
        <p class="page-desc">
          Pelajari cara menggunakan fitur-fitur AquaSentinel untuk perlindungan maksimal keluarga
          Anda.
        </p>
      </div>

      <div class="guide-grid">
        <div
          v-for="(item, index) in guideItems"
          :key="index"
          class="guide-card animate-reveal"
          :style="{ 'animation-delay': index * 0.1 + 's' }"
        >
          <div class="guide-icon">
            <i :class="item.icon"></i>
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
          <button class="btn-text">
            Baca Selengkapnya
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const guideItems = [
  {
    icon: 'fas fa-map-location-dot',
    title: 'Deteksi Lokasi',
    desc: 'Cara menggunakan pencarian alamat dan GPS untuk mendapatkan hasil analisis risiko banjir yang akurat.'
  },
  {
    icon: 'fas fa-bell-concierge',
    title: 'Sistem Notifikasi',
    desc: 'Mengatur notifikasi peringatan dini agar Anda selalu siaga saat kondisi cuaca ekstrem terjadi.'
  },
  {
    icon: 'fas fa-floppy-disk',
    title: 'Manajemen Lokasi',
    desc: 'Menyimpan dan mengelola daftar lokasi pantauan favorit untuk akses cepat kapan saja.'
  },
  {
    icon: 'fas fa-kit-medical',
    title: 'Langkah Darurat',
    desc: 'Protokol keselamatan yang harus dilakukan saat terjadi banjir di wilayah pemukiman.'
  }
]
</script>

<style scoped>
.page-container {
  padding: 8rem 0;
  min-height: 80vh;
}

.page-header {
  text-align: center;
  margin-bottom: 5rem;
}

.page-badge {
  display: inline-flex;
  padding: 0.5rem 1.25rem;
  background: var(--primary-soft);
  color: var(--primary);
  border-radius: 100px;
  font-weight: 800;
  font-size: 0.75rem;
  margin-bottom: 1.5rem;
}

.guide-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.guide-card {
  background: white;
  padding: 2.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--gray-100);
  transition: all 0.4s ease;
  box-shadow: var(--shadow-sm);
}

.guide-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-soft);
}

.guide-icon {
  width: 60px;
  height: 60px;
  background: var(--primary-soft);
  color: var(--primary);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.guide-card h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.guide-card p {
  color: var(--gray-500);
  font-size: 0.9375rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.btn-text {
  background: none;
  border: none;
  color: var(--primary);
  font-weight: 700;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0;
}

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
</style>
