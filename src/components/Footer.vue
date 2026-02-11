<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-info">
          <div class="footer-logo">
            <i class="fas fa-shield-virus"></i>
            <span>AquaSentinel</span>
          </div>
          <p class="footer-desc">
            Sistem Peringatan Dini Banjir tercanggih di Jawa Timur. Menggunakan kecerdasan buatan
            untuk menjaga keselamatan Anda 24/7.
          </p>
          <div class="footer-contact-list">
            <a href="mailto:support@aquasentinel.id" class="footer-contact-item">
              <i class="fas fa-envelope"></i>
              <span>support@aquasentinel.id</span>
            </a>
            <a href="tel:112" class="footer-contact-item">
              <i class="fas fa-phone-alt"></i>
              <span>Garis Darurat: 112 (BPBD)</span>
            </a>
          </div>
        </div>

        <div class="footer-nav">
          <div class="nav-group">
            <h5>Navigasi Utama</h5>
            <div class="nav-links">
              <a href="#" @click.prevent="navigate('home')">Beranda Utama</a>
              <a href="#" @click.prevent="navigate('saved')">Daftar Pantauan</a>
              <a href="#" @click.prevent="navigate('history')">Analisis Riwayat</a>
              <a href="#" @click.prevent="navigate('settings')">Konfigurasi</a>
            </div>
          </div>
          <div class="nav-group">
            <h5>Informasi & Edukasi</h5>
            <div class="nav-links">
              <a href="#" @click.prevent="navigate('help')">Buku Panduan</a>
              <a href="#" @click.prevent="navigate('about')">Tim Pengembang</a>
              <a href="#" @click.prevent="navigate('faq')">Tanya Jawab (FAQ)</a>
              <a href="#" @click.prevent="navigate('contact')">Hubungi Kami</a>
            </div>
          </div>
          <div class="nav-group">
            <h5>Hukum</h5>
            <div class="nav-links">
              <a href="#" @click.prevent="navigate('privacy')">Privasi Data</a>
              <a href="#" @click.prevent="navigate('terms')">Ketentuan Layanan</a>
              <a href="#" @click.prevent="navigate('disclaimer')">Penafian Situs</a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="bottom-left">
          <p>&copy; {{ currentYear }} AquaSentinel Pro. Powered by Jatim Digital.</p>
        </div>
        <div class="bottom-right">
          <div class="social-pills">
            <a href="#" class="social-pill" title="Facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social-pill" title="Twitter">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="social-pill" title="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="social-pill" title="LinkedIn">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="#" class="social-pill" title="GitHub">
              <i class="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const navigate = page => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.footer {
  background: var(--gray-900);
  color: white;
  padding: 6rem 0 3rem;
  margin-top: 5rem;
  position: relative;
  overflow: hidden;
}

/* Subtle decorative glow */
.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
}

.footer-top {
  display: grid;
  grid-template-columns: 1.5fr 3fr;
  gap: 5rem;
  margin-bottom: 5rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.75rem;
  font-weight: 900;
  color: white;
  margin-bottom: 1.5rem;
}

.footer-logo i {
  color: var(--primary);
}

.footer-desc {
  color: var(--gray-400);
  line-height: 1.7;
  font-size: 1.0625rem;
  margin-bottom: 2.5rem;
  max-width: 450px;
}

.footer-contact-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--gray-400);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9375rem;
  transition: var(--transition);
}

.footer-contact-item:hover {
  color: white;
}

.footer-contact-item i {
  color: var(--primary);
  opacity: 0.8;
}

.footer-nav {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}

.nav-group h5 {
  font-size: 1.125rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: white;
  position: relative;
}

.nav-group h5::after {
  content: '';
  position: absolute;
  bottom: -0.75rem;
  left: 0;
  width: 24px;
  height: 2px;
  background: var(--primary);
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-links a {
  color: var(--gray-400);
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  transition: var(--transition);
}

.nav-links a:hover {
  color: white;
  transform: translateX(6px);
}

.footer-bottom {
  padding-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bottom-left p {
  color: var(--gray-500);
  font-size: 0.875rem;
  font-weight: 500;
}

.social-pills {
  display: flex;
  gap: 0.75rem;
}

.social-pill {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-400);
  text-decoration: none;
  transition: var(--transition);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.social-pill:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.2);
}

@media (max-width: 1024px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
  .footer-nav {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .footer-nav {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .footer-bottom {
    flex-direction: column-reverse;
    gap: 2rem;
    text-align: center;
  }
  .footer-info {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .footer-contact-item {
    justify-content: center;
  }
}
</style>
