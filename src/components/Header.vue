<template>
  <header class="aquasentinel-header">
    <div class="container">
      <nav class="navbar">
        <div class="nav-brand">
          <router-link to="/" class="logo">
            <i class="fas fa-water"></i>
            <span>AquaSentinel</span>
          </router-link>
          <div class="tagline">Peringatan Dini Banjir</div>
        </div>

        <div class="nav-actions">
          <div class="desktop-nav">
            <router-link to="/" class="nav-link"> <i class="fas fa-home"></i> Beranda </router-link>
            <router-link to="/lokasi-tersimpan" class="nav-link">
              <i class="fas fa-bookmark"></i> Lokasi Tersimpan
            </router-link>
            <router-link to="/pengaturan" class="nav-link">
              <i class="fas fa-cog"></i> Pengaturan
            </router-link>
          </div>
          <button class="btn btn-download" @click="downloadApp">
            <i class="fab fa-android"></i> Download App
          </button>
          <button class="btn-menu" @click="toggleMobileMenu">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile Menu -->
    <!-- Mobile Menu -->
    <Teleport to="body">
      <div
        class="mobile-nav-overlay"
        :class="{ active: isMobileMenuOpen }"
        @click.self="toggleMobileMenu"
      >
        <div class="mobile-nav-drawer">
          <div class="mobile-nav-header">
            <h3><i class="fas fa-bars"></i> Menu</h3>
            <button class="btn-close" @click="toggleMobileMenu">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="mobile-nav-items">
            <router-link to="/" class="mobile-nav-link" @click="toggleMobileMenu">
              <i class="fas fa-home"></i> Beranda
            </router-link>
            <router-link to="/lokasi-tersimpan" class="mobile-nav-link" @click="toggleMobileMenu">
              <i class="fas fa-bookmark"></i> Lokasi Tersimpan
            </router-link>
            <router-link to="/pengaturan" class="mobile-nav-link" @click="toggleMobileMenu">
              <i class="fas fa-cog"></i> Pengaturan
            </router-link>
            <a href="#" class="mobile-nav-link" @click.prevent="showHelp">
              <i class="fas fa-question-circle"></i> Bantuan
            </a>
            <a href="#" class="mobile-nav-link" @click.prevent="showAbout">
              <i class="fas fa-info-circle"></i> Tentang
            </a>
            <button class="mobile-nav-link btn-download-mobile" @click="downloadApp">
              <i class="fab fa-android"></i> Download App
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </header>
</template>

<script setup>
import { ref, inject } from 'vue'

const isMobileMenuOpen = ref(false)
const toast = inject('toast')

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const downloadApp = () => {
  toast('Aplikasi akan segera tersedia di Google Play Store!', 'info')
}

const showHelp = () => {
  toast('Fitur bantuan akan segera tersedia', 'info')
  toggleMobileMenu()
}

const showAbout = () => {
  toast('AquaSentinel - Sistem Peringatan Dini Banjir Jawa Timur', 'info')
  toggleMobileMenu()
}
</script>

<style scoped>
/* Tambahkan style untuk nav-link */
.aquasentinel-header {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--glass-border);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: var(--transition);
}

.aquasentinel-header:hover {
  background: rgba(255, 255, 255, 0.9);
}

.desktop-nav {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-link {
  color: var(--gray-700);
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius);
  transition: var(--transition);
  font-size: 0.9375rem;
}

.nav-link:hover {
  background: var(--primary-light);
  color: var(--primary);
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  background: var(--primary);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.mobile-nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 9999;
  display: none;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.mobile-nav-overlay.active {
  display: block;
  opacity: 1;
}

.mobile-nav-drawer {
  position: fixed;
  top: 0;
  right: -100%;
  width: min(280px, 75%);
  height: auto;
  min-height: auto;
  max-height: 90vh;
  background: white;
  box-shadow: var(--shadow-xl);
  transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: var(--radius-xl);
  overflow-y: auto;
}

.mobile-nav-overlay.active .mobile-nav-drawer {
  right: 0;
}

.mobile-nav-header {
  padding: 2rem 1.5rem;
  border-bottom: 1px solid var(--gray-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-nav-items {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  color: var(--gray-700);
  text-decoration: none;
  border-radius: var(--radius);
  transition: var(--transition);
  font-weight: 600;
}

.mobile-nav-link:hover {
  background: var(--primary-light);
  color: var(--primary);
  transform: translateX(4px);
}

.btn-download-mobile {
  margin-top: 1rem;
  background: linear-gradient(135deg, var(--secondary), var(--secondary-dark));
  color: white;
  border: none;
  width: 100%;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .btn-menu {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: var(--radius-sm);
    background: var(--primary-light);
    color: var(--primary);
  }
}

@media (min-width: 769px) {
  .mobile-nav-overlay {
    display: none !important;
  }
}
</style>
