<template>
  <section class="faq-section">
    <div class="container">
      <div class="faq-header">
        <div class="faq-badge">Bantuan</div>
        <h2>Pertanyaan Umum</h2>
        <p>Informasi seputar fitur dan penggunaan AquaSentinel</p>
      </div>

      <div class="faq-grid">
        <div
          v-for="faq in faqs"
          :key="faq.id"
          class="faq-card"
          :class="{ active: activeFaq === faq.id }"
          @click="toggleFaq(faq.id)"
        >
          <div class="faq-question">
            <span>{{ faq.question }}</span>
            <div class="toggle-icon">
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>
          <transition name="expand">
            <div v-if="activeFaq === faq.id" class="faq-answer-wrapper">
              <div class="faq-answer-content">
                <p>{{ faq.answer }}</p>
                <div v-if="faq.additional" class="faq-note">
                  <i class="fas fa-info-circle"></i>
                  <span>{{ faq.additional }}</span>
                </div>
                <ul v-if="faq.listItems" class="faq-bullets">
                  <li v-for="(item, index) in faq.listItems" :key="index">
                    <i class="fas fa-check-circle"></i> {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeFaq = ref(null)

const faqs = ref([
  {
    id: 1,
    question: 'Bagaimana cara AI mendeteksi banjir?',
    answer:
      'AquaSentinel menggunakan kombinasi data topografi digital, curah hujan real-time dari BMKG, dan laporan warga untuk memprediksi potensi genangan dengan akurasi tinggi.',
    additional: 'Update data dilakukan setiap 15 menit.'
  },
  {
    id: 2,
    question: 'Apakah aplikasi ini bisa digunakan offline?',
    answer:
      'Untuk fitur deteksi real-time membutuhkan internet. Namun, panduan keselamatan dan peta jalur evakuasi yang sudah disimpan bisa diakses tanpa koneksi internet.'
  },
  {
    id: 3,
    question: 'Bagaimana jika lokasi GPS saya tidak akurat?',
    answer:
      'Pastikan Anda berada di luar ruangan dengan pandangan langit yang jelas. Anda juga bisa memasukkan alamat secara manual melalui kolom pencarian jika GPS terkendala.',
    listItems: [
      'Aktifkan mode "High Accuracy" di pengaturan HP',
      'Refresh browser jika posisi stuck',
      'Gunakan Wi-Fi untuk bantuan lokasi'
    ]
  },
  {
    id: 4,
    question: 'Apakah ada peringatan dini otomatis?',
    answer:
      'Ya, jika Anda mengizinkan notifikasi browser, AquaSentinel akan mengirimkan peringatan jika lokasi Anda terdeteksi berada dalam zona merah banjir.'
  }
])

const toggleFaq = id => {
  activeFaq.value = activeFaq.value === id ? null : id
}
</script>

<style scoped>
.faq-section {
  padding: 5rem 0;
  background: radial-gradient(circle at 50% 0%, #f8fafc 0%, white 100%);
  border-top: 1px solid var(--gray-100);
}

.faq-header {
  text-align: center;
  margin-bottom: 3.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.faq-badge {
  display: inline-block;
  padding: 0.4rem 1rem;
  background: #e0f2fe;
  color: var(--primary);
  border-radius: 100px;
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.faq-header h2 {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--gray-900);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.faq-header p {
  color: var(--gray-500);
  font-size: 1.1rem;
}

.faq-grid {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-card {
  background: white;
  border-radius: 16px;
  border: 1px solid var(--gray-100);
  padding: 0 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.faq-card:hover {
  border-color: var(--primary-light);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.faq-card.active {
  border-color: var(--primary);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.1);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
}

.faq-question span {
  font-weight: 700;
  color: var(--gray-800);
  font-size: 1.05rem;
}

.toggle-icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-400);
  transition: transform 0.3s ease;
}

.active .toggle-icon {
  transform: rotate(180deg);
  color: var(--primary);
}

.faq-answer-wrapper {
  max-height: 500px; /* Approximate max height for transition */
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  opacity: 1;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.faq-answer-content {
  padding-bottom: 1.5rem;
  border-top: 1px solid var(--gray-50);
  padding-top: 1rem;
}

.faq-answer-content p {
  color: var(--gray-600);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.faq-note {
  background: #f0f9ff;
  border-radius: 10px;
  padding: 0.8rem 1rem;
  display: flex;
  gap: 0.8rem;
  align-items: flex-start;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: var(--gray-700);
}

.faq-note i {
  color: var(--primary);
  margin-top: 3px;
}

.faq-bullets {
  list-style: none;
  padding: 0;
  margin: 0;
}

.faq-bullets li {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.9rem;
  color: var(--gray-600);
  margin-bottom: 0.5rem;
}

.faq-bullets i {
  color: var(--success);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .faq-header h2 {
    font-size: 1.8rem;
  }
}
</style>
