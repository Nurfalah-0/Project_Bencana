<template>
  <div class="page-container">
    <div class="container">
      <div class="page-header animate-reveal">
        <div class="page-badge">
          <i class="fas fa-headset"></i>
          <span>GET IN TOUCH</span>
        </div>
        <h1 class="page-title">Hubungi <span class="highlight">Kami</span></h1>
        <p class="page-desc">
          Punya pertanyaan atau masukan? Tim kami siap membantu Anda kapan saja.
        </p>
      </div>

      <div class="contact-grid">
        <div class="contact-form-wrapper animate-reveal" style="animation-delay: 0.2s">
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label>Nama Lengkap</label>
              <input type="text" placeholder="Masukkan nama Anda" required />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" placeholder="example@email.com" required />
            </div>
            <div class="form-group">
              <label>Pesan</label>
              <textarea placeholder="Tuliskan pesan Anda di sini..." rows="5" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-full">
              Kirim Pesan
              <i class="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>

        <div class="contact-info-wrapper animate-reveal" style="animation-delay: 0.3s">
          <div class="info-card">
            <h3>Informasi Kontak</h3>
            <div class="info-items">
              <div class="info-item">
                <i class="fas fa-envelope"></i>
                <div>
                  <span>Email Resmi</span>
                  <p>support@aquasentinel.id</p>
                </div>
              </div>
              <div class="info-item">
                <i class="fas fa-phone"></i>
                <div>
                  <span>Telepon Darurat</span>
                  <p>112 (BPBD Jawa Timur)</p>
                </div>
              </div>
              <div class="info-item">
                <i class="fas fa-location-dot"></i>
                <div>
                  <span>Kantor Pusat</span>
                  <p>
                    Jl. Kyai Haji Mun'im, Dusun Tj. Lor, Karanganyar, Kec. Paiton, Kabupaten
                    Probolinggo, Jawa Timur 67291
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUIStore } from '@/stores/uiStore'
const uiStore = useUIStore()

const handleSubmit = () => {
  uiStore.notify('Pesan Anda telah dikirim! Tim kami akan segera menghubungi Anda.', 'success')
}
</script>

<style scoped>
.page-container {
  padding: 8rem 0;
}

.page-header {
  text-align: center;
  margin-bottom: 5rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 4rem;
  align-items: start;
}

.contact-form-wrapper {
  background: white;
  padding: 3rem;
  border-radius: var(--radius-xl);
  border: 1px solid var(--gray-100);
  box-shadow: var(--shadow-xl);
}

.form-group {
  margin-bottom: 2rem;
}

.form-group label {
  display: block;
  font-weight: 700;
  color: var(--gray-700);
  margin-bottom: 0.75rem;
  font-size: 0.9375rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem 1.25rem;
  background: var(--gray-50);
  border: 1px solid var(--gray-100);
  border-radius: var(--radius);
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  background: white;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--primary-soft);
}

.btn-full {
  width: 100%;
  justify-content: center;
}

.info-card {
  background: var(--gray-900);
  color: white;
  padding: 3rem;
  border-radius: var(--radius-xl);
}

.info-card h3 {
  color: white;
  margin-bottom: 3rem;
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.info-item {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.info-item i {
  font-size: 1.5rem;
  color: var(--primary);
}

.info-item span {
  display: block;
  color: var(--gray-400);
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.375rem;
}

.info-item p {
  font-weight: 600;
  font-size: 1.0625rem;
}

@media (max-width: 992px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
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
