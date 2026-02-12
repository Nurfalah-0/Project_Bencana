<template>
  <section class="download-banner">
    <div class="container banner-container">
      <div class="banner-content animate-reveal">
        <div class="banner-text">
          <div class="status-badge">
            <span class="pulse-dot"></span>
            Segera Hadir di Android & iOS
          </div>
          <h2 class="banner-title">
            Pantau Banjir dalam <span class="highlight-text">Genggaman</span>
          </h2>
          <p class="banner-desc">
            Dapatkan peringatan dini instan, pantau ketinggian air real-time dari ribuan sensor, dan
            akses peta evakuasi offline bahkan saat sinyal terputus.
          </p>

          <div class="cta-actions">
            <button class="btn-store gplay" @click="downloadApp">
              <div class="store-icon">
                <i class="fab fa-google-play"></i>
              </div>
              <div class="store-info">
                <span class="store-label">COMING SOON ON</span>
                <span class="store-name">Google Play</span>
              </div>
              <div class="btn-shine"></div>
            </button>
            <button class="btn-store appstore" @click="downloadApp">
              <div class="store-icon">
                <i class="fab fa-apple"></i>
              </div>
              <div class="store-info">
                <span class="store-label">COMING SOON ON</span>
                <span class="store-name">App Store</span>
              </div>
            </button>
          </div>
        </div>

        <div class="banner-visual">
          <div class="mockup-container">
            <!-- Main Phone -->
            <div class="phone-frame main-phone animate-float">
              <div class="phone-inner">
                <div class="phone-top">
                  <div class="speaker"></div>
                  <div class="camera"></div>
                </div>
                <div class="phone-screen">
                  <div class="app-ui">
                    <div class="app-nav"></div>
                    <div class="app-map">
                      <div class="radar-ping"></div>
                      <div class="marker m1"></div>
                      <div class="marker m2"></div>
                    </div>
                    <div class="app-cards">
                      <div class="u-card"></div>
                      <div class="u-card"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="phone-glow"></div>
            </div>

            <!-- Secondary Decorative Elements -->
            <div class="floating-element card-1 animate-float-slow">
              <i class="fas fa-shield-check"></i>
              <span>Safe Zone</span>
            </div>
            <div class="floating-element card-2 animate-float">
              <i class="fas fa-droplet"></i>
              <span>High Alert</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Background Decoration -->
    <div class="decorative-blobs">
      <div class="blob-item b-1"></div>
      <div class="blob-item b-2"></div>
      <div class="grid-overlay"></div>
    </div>
  </section>
</template>

<script setup>
import { inject } from 'vue'
const toast = inject('toast')

const downloadApp = () => {
  toast('Versi aplikasi sedang dalam tahap optimasi akhir!', 'info')
}
</script>

<style scoped>
.download-banner {
  padding: 6rem 0;
  margin: 6rem 0;
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-xl);
  background: #0f172a; /* Deep elegant dark background */
}

.banner-container {
  position: relative;
  z-index: 10;
}

.banner-content {
  display: flex;
  align-items: center;
  gap: 4rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-xl);
  padding: 5rem 6%;
  box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.5);
}

.banner-text {
  flex: 1.2;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 1.25rem;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 100px;
  color: #60a5fa;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #3b82f6;
  border-radius: 50%;
  position: relative;
}

.pulse-dot::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: inherit;
  animation: pulse-ring 2s infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}

.banner-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  font-weight: 900;
}

.highlight-text {
  background: linear-gradient(135deg, #60a5fa 0%, #34d399 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.banner-desc {
  font-size: 1.125rem;
  color: #94a3b8;
  line-height: 1.8;
  margin-bottom: 3rem;
  max-width: 540px;
}

.cta-actions {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.btn-store {
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 0.875rem 1.75rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  color: white;
}

.btn-store:hover {
  background: #2d3a4f;
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

.btn-store.gplay:hover {
  background: white;
  color: #0f172a;
}

.store-icon {
  font-size: 2rem;
}

.store-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.store-label {
  font-size: 0.6875rem;
  font-weight: 700;
  opacity: 0.6;
  letter-spacing: 0.05em;
}

.store-name {
  font-size: 1.25rem;
  font-weight: 800;
}

.btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: 0.5s;
}

.btn-store:hover .btn-shine {
  left: 100%;
  transition: 0.8s;
}

/* Banner Visual / Mockup */
.banner-visual {
  flex: 0.8;
  display: flex;
  justify-content: center;
  perspective: 1000px;
}

.mockup-container {
  position: relative;
  width: 100%;
  max-width: 320px;
  height: 480px;
}

.phone-frame {
  width: 260px;
  height: 520px;
  background: #1e293b;
  border-radius: 40px;
  padding: 12px;
  box-shadow:
    0 50px 100px -20px rgba(0, 0, 0, 0.5),
    inset 0 0 0 2px rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 5;
  transform: rotate3d(1, -1, 0, 15deg);
}

.phone-inner {
  background: #0f172a;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.phone-top {
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
}

.speaker {
  width: 40px;
  height: 4px;
  background: #334155;
  border-radius: 4px;
}

.camera {
  width: 6px;
  height: 6px;
  background: #334155;
  border-radius: 50%;
}

.phone-screen {
  flex: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.app-ui {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.app-nav {
  height: 30px;
  background: rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  width: 50%;
}

.app-map {
  flex: 1;
  background: #1e293b;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
}

.radar-ping {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  background: #3b82f6;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.radar-ping::after {
  content: '';
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  border: 2px solid rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  animation: radar-ping 2s infinite;
}

@keyframes radar-ping {
  0% {
    transform: scale(0.5);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

.marker {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
}
.m1 {
  top: 30%;
  left: 40%;
}
.m2 {
  bottom: 25%;
  right: 30%;
}

.app-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.u-card {
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.phone-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, #60a5fa 0%, transparent 70%);
  opacity: 0.15;
  filter: blur(40px);
  z-index: 1;
}

/* Floating Elements */
.floating-element {
  position: absolute;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  font-weight: 700;
  font-size: 0.875rem;
  z-index: 10;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.card-1 {
  top: 10%;
  right: -40px;
  color: #34d399;
}

.card-2 {
  bottom: 15%;
  left: -40px;
  color: #fbbf24;
}

/* Decorations */
.decorative-blobs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.blob-item {
  position: absolute;
  filter: blur(80px);
  opacity: 0.15;
}

.b-1 {
  width: 600px;
  height: 600px;
  background: var(--primary);
  top: -300px;
  left: -200px;
}

.b-2 {
  width: 500px;
  height: 500px;
  background: #34d399;
  bottom: -200px;
  right: -100px;
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Animations Helpers */
.animate-float {
  animation: float 4s ease-in-out infinite;
}

.animate-float-slow {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate3d(1, -1, 0, 15deg);
  }
  50% {
    transform: translateY(-20px) rotate3d(1, -1, 0, 18deg);
  }
}

@media (max-width: 1100px) {
  .banner-content {
    flex-direction: column;
    text-align: center;
    padding: 4rem 2rem;
  }

  .banner-desc {
    margin-left: auto;
    margin-right: auto;
  }

  .cta-actions {
    justify-content: center;
  }

  .banner-visual {
    margin-top: 4rem;
  }

  .phone-frame {
    transform: none;
    margin: 0 auto;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
}

@media (max-width: 640px) {
  .download-banner {
    padding: 3rem 0;
    margin: 3rem 0;
  }

  .banner-title {
    font-size: 2.25rem;
  }

  .card-1,
  .card-2 {
    display: none;
  }
}
</style>
