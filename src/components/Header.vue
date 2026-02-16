<template>
  <header class="aquasentinel-header" :class="{ scrolled: isScrolled }">
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
            <router-link to="/" class="nav-link">
              <i class="fas fa-home"></i>
              <span>Beranda</span>
            </router-link>
            <router-link to="/lokasi-tersimpan" class="nav-link">
              <i class="fas fa-bookmark"></i>
              <span>Pantauan</span>
            </router-link>
            <router-link to="/analisis-riwayat" class="nav-link">
              <i class="fas fa-chart-line"></i>
              <span>Riwayat</span>
            </router-link>
            <router-link to="/pengaturan" class="nav-link">
              <i class="fas fa-cog"></i>
              <span>Pengaturan</span>
            </router-link>
          </div>

          <div class="action-buttons">
            <button class="btn btn-download" @click="downloadApp">
              <i class="fab fa-android"></i>
              <span class="btn-text">Download App</span>
            </button>
            <button class="btn-menu" @click="toggleMobileMenu" aria-label="Buka Menu">
              <i class="fas fa-bars-staggered" v-if="!isMobileMenuOpen"></i>
              <i class="fas fa-times" v-else></i>
            </button>
          </div>
        </div>
      </nav>
    </div>

    <!-- Mobile Menu -->
    <Teleport to="body">
      <div
        class="mobile-nav-overlay"
        :class="{ active: isMobileMenuOpen }"
        @click.self="toggleMobileMenu"
      >
        <div class="mobile-nav-drawer" :class="{ active: isMobileMenuOpen }">
          <div class="mobile-nav-header">
            <div class="logo">
              <i class="fas fa-water"></i>
              <span>AquaSentinel</span>
            </div>
            <button class="btn-close" @click="toggleMobileMenu">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="mobile-nav-body">
            <div class="mobile-nav-items">
              <router-link to="/" class="mobile-nav-link" @click="toggleMobileMenu">
                <i class="fas fa-home"></i>
                <div class="link-text">
                  <span class="label">Beranda</span>
                  <span class="desc">Kembali ke halaman utama</span>
                </div>
              </router-link>
              <router-link to="/lokasi-tersimpan" class="mobile-nav-link" @click="toggleMobileMenu">
                <i class="fas fa-bookmark"></i>
                <div class="link-text">
                  <span class="label">Pantauan</span>
                  <span class="desc">Akses lokasi favorit Anda</span>
                </div>
              </router-link>
              <router-link to="/analisis-riwayat" class="mobile-nav-link" @click="toggleMobileMenu">
                <i class="fas fa-chart-line"></i>
                <div class="link-text">
                  <span class="label">Analisis Riwayat</span>
                  <span class="desc">Lihat data banjir masa lalu</span>
                </div>
              </router-link>
              <router-link to="/pengaturan" class="mobile-nav-link" @click="toggleMobileMenu">
                <i class="fas fa-cog"></i>
                <div class="link-text">
                  <span class="label">Pengaturan</span>
                  <span class="desc">Kustomisasi aplikasi</span>
                </div>
              </router-link>

              <div class="mobile-nav-divider"></div>

              <router-link to="/buku-panduan" class="mobile-nav-link" @click="toggleMobileMenu">
                <i class="fas fa-question-circle"></i>
                <div class="link-text">
                  <span class="label">Bantuan</span>
                  <span class="desc">Pusat bantuan & FAQ</span>
                </div>
              </router-link>
              <router-link to="/tim-pengembang" class="mobile-nav-link" @click="toggleMobileMenu">
                <i class="fas fa-info-circle"></i>
                <div class="link-text">
                  <span class="label">Tentang</span>
                  <span class="desc">Info pengembang & aplikasi</span>
                </div>
              </router-link>
            </div>

            <div class="mobile-nav-footer">
              <button class="btn btn-download btn-block" @click="downloadApp">
                <i class="fab fa-android"></i> Download App Sekarang
              </button>
              <p class="footer-note">v1.0.0 Alpha - © 2024 AquaSentinel</p>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </header>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const toast = inject('toast')

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const downloadApp = () => {
  toast('Aplikasi akan segera tersedia di Google Play Store!', 'info')
}
</script>

<style scoped>
.aquasentinel-header {
  transition: var(--transition);
}

.aquasentinel-header.scrolled {
  padding: 0.25rem 0;
  box-shadow: var(--shadow-md);
}

.desktop-nav {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.nav-link {
  color: var(--gray-600);
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 1.125rem;
  border-radius: var(--radius);
  transition: var(--transition-fast);
  white-space: nowrap;
  font-size: 0.9375rem;
}

.nav-link:hover {
  background: var(--primary-soft);
  color: var(--primary);
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  background: var(--primary);
  color: white;
  box-shadow: 0 4px 12px var(--primary-soft);
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mobile-nav-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-nav-overlay.active {
  opacity: 1;
  visibility: visible;
}

.mobile-nav-drawer {
  position: fixed;
  top: 0;
  right: -100%;
  width: min(340px, 85%);
  height: 100vh;
  background: white;
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.15);
  transition: right 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
}

.mobile-nav-drawer.active {
  right: 0;
}

.mobile-nav-header {
  padding: 2rem 1.5rem;
  border-bottom: 1px solid var(--gray-50);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-nav-body {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
}

.mobile-nav-items {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem 1.25rem;
  color: var(--gray-700);
  text-decoration: none;
  border-radius: var(--radius);
  transition: var(--transition-fast);
}

.mobile-nav-link i {
  width: 44px;
  height: 44px;
  background: var(--gray-50);
  color: var(--gray-500);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  transition: var(--transition-fast);
}

.mobile-nav-link .link-text {
  display: flex;
  flex-direction: column;
}

.mobile-nav-link .label {
  font-weight: 700;
  font-size: 1rem;
  color: var(--gray-900);
}

.mobile-nav-link .desc {
  font-size: 0.8125rem;
  color: var(--gray-500);
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  background: var(--primary-soft);
}

.mobile-nav-link:hover i,
.mobile-nav-link.router-link-active i {
  background: var(--primary);
  color: white;
}

.mobile-nav-divider {
  height: 1px;
  background: var(--gray-100);
  margin: 1rem 0;
}

.mobile-nav-footer {
  margin-top: auto;
  padding: 1.5rem;
}

.btn-block {
  width: 100%;
}

.footer-note {
  text-align: center;
  font-size: 0.75rem;
  color: var(--gray-400);
  margin-top: 1.5rem;
}

@media (max-width: 992px) {
  .tagline {
    display: none;
  }
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .btn-download .btn-text {
    display: none;
  }

  .btn-download {
    padding: 0.75rem;
    border-radius: var(--radius-sm);
  }

  .btn-menu {
    display: flex;
  }
}
</style>
