<template>
  <div class="page-container">
    <div class="container content-wrapper">
      <div class="page-header animate-reveal">
        <div class="page-badge">
          <i class="fas fa-chart-line"></i>
          <span>HISTORICAL ANALYTICS</span>
        </div>
        <h1 class="page-title">Analisis <span class="highlight">Riwayat</span></h1>
        <p class="page-desc">
          Pelajari pola curah hujan dan riwayat banjir di wilayah Anda untuk kesiapsiagaan yang
          lebih baik.
        </p>
      </div>

      <div class="content-grid">
        <div class="empty-state animate-reveal" style="animation-delay: 0.2s">
          <div class="empty-icon">
            <i class="fas fa-database"></i>
          </div>
          <h3>Belum Ada Data Riwayat</h3>
          <p>
            Mulailah mendeteksi lokasi untuk melihat analisis riwayat banjir di wilayah tersebut.
          </p>
          <router-link to="/" class="btn btn-primary">
            <i class="fas fa-search"></i>
            Mulai Deteksi Sekarang
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Logic can be added later as needed
</script>

<style scoped>
.page-container {
  padding: 8rem 0;
  min-height: 80vh;
  background: var(--gray-25);
  position: relative;
  overflow: hidden;
}

.content-wrapper {
  position: relative;
  z-index: 10;
}

.page-header {
  text-align: center;
  margin-bottom: 5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.page-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 1.25rem;
  background: var(--primary-soft);
  color: var(--primary);
  border-radius: 100px;
  font-weight: 800;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  margin-bottom: 2rem;
  border: 1px solid hsla(var(--primary-h), var(--primary-s), 50%, 0.1);
}

.page-title {
  margin-bottom: 1.5rem;
}

.page-desc {
  font-size: 1.125rem;
  color: var(--gray-600);
  line-height: 1.7;
}

.empty-state {
  background: white;
  border-radius: var(--radius-xl);
  padding: 5rem 2rem;
  text-align: center;
  border: 1px solid var(--gray-100);
  box-shadow: var(--shadow-xl);
}

.empty-icon {
  width: 100px;
  height: 100px;
  background: var(--gray-50);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: var(--gray-300);
  margin: 0 auto 2rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.empty-state p {
  color: var(--gray-500);
  margin-bottom: 2.5rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
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
