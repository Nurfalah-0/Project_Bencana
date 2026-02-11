<template>
  <section class="download-banner">
    <div class="banner-content">
      <div class="banner-text">
        <span class="badge-coming-soon">Segera Hadir</span>
        <h3>Pantau Banjir dalam Genggaman</h3>
        <p>
          Dapatkan notifikasi real-time, peta evakuasi offline, dan panduan keselamatan lengkap di
          aplikasi mobile AquaSentinel.
        </p>

        <button class="btn-store" @click="downloadApp">
          <i class="fab fa-google-play"></i>
          <div class="store-text">
            <span class="small">GET IT ON</span>
            <span class="large">Google Play</span>
          </div>
        </button>
      </div>

      <div class="banner-visual">
        <!-- Abstract Phone Mockup / Illustration Placeholder -->
        <div class="phone-mockup">
          <div class="screen">
            <div class="app-header"></div>
            <div class="app-card"></div>
            <div class="app-card short"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative -->
    <div class="bubble b1"></div>
    <div class="bubble b2"></div>
  </section>
</template>

<script setup>
import { inject } from 'vue'
const toast = inject('toast')

const downloadApp = () => {
  toast('Versi Android sedang dalam tahap beta testing!', 'info')
}
</script>

<style scoped>
.download-banner {
  margin: 4rem 0;
  border-radius: var(--radius-xl);
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(37, 99, 235, 0.3);
  color: white;
}

.banner-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 5%;
  position: relative;
  z-index: 10;
  gap: 2rem;
}

.banner-text {
  flex: 1;
  max-width: 500px;
}

.badge-coming-soon {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.4rem 1rem;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  display: inline-block;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.banner-text h3 {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.banner-text p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.btn-store {
  background: white;
  color: var(--primary);
  border: none;
  border-radius: 12px;
  padding: 0.8rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.btn-store:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.btn-store i {
  font-size: 2rem;
}

.store-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.2;
}

.store-text .small {
  font-size: 0.7rem;
  font-weight: 700;
  opacity: 0.7;
}
.store-text .large {
  font-size: 1.2rem;
  font-weight: 800;
}

/* Visual Mockup */
.banner-visual {
  flex: 1;
  display: flex;
  justify-content: center;
}

.phone-mockup {
  width: 200px;
  height: 400px;
  background: white;
  border-radius: 30px;
  padding: 10px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  transform: rotate(-10deg);
  border: 4px solid rgba(255, 255, 255, 0.3);
}

.screen {
  background: #f1f5f9;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
}

.app-header {
  height: 40px;
  background: var(--primary);
  border-radius: 10px;
  width: 60%;
}

.app-card {
  height: 100px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.app-card.short {
  height: 60px;
  opacity: 0.6;
}

/* Bubbles */
.bubble {
  position: absolute;
  border-radius: 50%;
  background: white;
  opacity: 0.1;
}

.b1 {
  width: 300px;
  height: 300px;
  top: -50px;
  right: -50px;
}
.b2 {
  width: 150px;
  height: 150px;
  bottom: 50px;
  left: 10%;
}

@media (max-width: 900px) {
  .banner-content {
    flex-direction: column;
    text-align: center;
  }
  .banner-text {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  .phone-mockup {
    transform: rotate(0);
    height: 300px;
    width: 160px;
  }
}
</style>
