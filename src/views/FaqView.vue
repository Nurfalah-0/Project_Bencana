<template>
  <div class="page-container">
    <div class="container">
      <div class="page-header animate-reveal">
        <div class="page-badge">
          <i class="fas fa-question-circle"></i>
          <span>FREQUENTLY ASKED QUESTIONS</span>
        </div>
        <h1 class="page-title">Pertanyaan <span class="highlight">Umum</span></h1>
        <p class="page-desc">
          Temukan jawaban cepat untuk pertanyaan yang paling sering diajukan mengenai layanan
          AquaSentinel.
        </p>
      </div>

      <div class="faq-list animate-reveal" style="animation-delay: 0.2s">
        <div
          v-for="(item, index) in faqs"
          :key="index"
          class="faq-item"
          :class="{ active: activeIndex === index }"
        >
          <button class="faq-question" @click="toggleFaq(index)">
            <span>{{ item.q }}</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="faq-answer">
            <div class="answer-content">
              <p>{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref(0)
const toggleFaq = index => {
  activeIndex.value = activeIndex.value === index ? -1 : index
}

const faqs = [
  {
    q: 'Bagaimana cara AI AquaSentinel memprediksi banjir?',
    a: 'AI kami menganalisis data real-time dari ribuan sensor ketinggian air, radar curah hujan BMKG, dan data topografi wilayah. Algoritma pembelajaran mesin kami memproses pola historis untuk memberikan probabilitas risiko dalam hitungan detik.'
  },
  {
    q: 'Apakah layanan ini tersedia di seluruh Indonesia?',
    a: 'Saat ini AquaSentinel fokus pada wilayah Jawa Timur sebagai prototipe utama. Kami sedang bekerja keras untuk melakukan ekspansi ke wilayah rawan banjir lainnya di seluruh Indonesia dalam waktu dekat.'
  },
  {
    q: 'Apakah data lokasi saya aman?',
    a: 'Tentu. Privasi Anda adalah prioritas kami. Data lokasi hanya digunakan untuk analisis risiko saat itu juga dan tidak dibagikan kepada pihak ketiga manapun tanpa izin eksplisit dari Anda.'
  },
  {
    q: 'Bagaimana cara menyimpan lokasi rumah saya?',
    a: 'Anda dapat menggunakan fitur pencarian alamat atau tombol GPS di halaman utama. Setelah lokasi ditemukan, klik ikon "Simpan Lokasi" (ikon hati atau plus) untuk menambahkannya ke daftar pantauan Anda.'
  }
]
</script>

<style scoped>
.page-container {
  padding: 8rem 0;
}

.page-header {
  text-align: center;
  margin-bottom: 5rem;
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  background: white;
  border-radius: var(--radius);
  border: 1px solid var(--gray-100);
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item.active {
  border-color: var(--primary-soft);
  box-shadow: var(--shadow-md);
}

.faq-question {
  width: 100%;
  padding: 1.5rem 2rem;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  text-align: left;
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--gray-900);
}

.faq-question i {
  font-size: 0.875rem;
  color: var(--gray-400);
  transition: transform 0.3s ease;
}

.faq-item.active .faq-question i {
  transform: rotate(180deg);
  color: var(--primary);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.faq-item.active .faq-answer {
  max-height: 200px;
}

.answer-content {
  padding: 0 2rem 2rem;
  color: var(--gray-500);
  line-height: 1.7;
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
