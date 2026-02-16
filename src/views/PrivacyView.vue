<template>
  <div class="page-container">
    <div class="container">
      <div class="legal-content animate-reveal">
        <h1 class="page-title">Kebijakan <span class="highlight">Privasi</span></h1>
        <p class="last-updated">Terakhir diperbarui: 16 Februari 2026</p>

        <section class="legal-section">
          <h2>1. Informasi yang Kami Kumpulkan</h2>
          <p>
            AquaSentinel mengumpulkan informasi lokasi (koordinat GPS) hanya saat Anda menggunakan
            fitur "Deteksi Posisi Saya" atau melakukan pencarian alamat. Informasi ini diperlukan
            untuk menghitung risiko banjir di lokasi spesifik tersebut.
          </p>
        </section>

        <section class="legal-section">
          <h2>2. Penggunaan Data</h2>
          <p>Data lokasi Anda digunakan secara eksklusif untuk:</p>
          <ul>
            <li>Menghitung probabilitas risiko banjir berdasarkan model AI.</li>
            <li>Memberikan peringatan dini yang relevan dengan posisi Anda.</li>
            <li>Meningkatkan akurasi model prediksi kami secara agregat.</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>3. Keamanan Data</h2>
          <p>
            Kami menerapkan standar keamanan enkripsi tinggi untuk melindungi data pribadi Anda.
            Data lokasi Anda tidak pernah disimpan secara permanen di server kami kecuali Anda
            memilih untuk "Menyimpan Lokasi" di perangkat Anda sendiri (local storage).
          </p>
        </section>

        <section class="legal-section">
          <h2>4. Hubungi Kami</h2>
          <p>
            Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, silakan hubungi kami di
            support@aquasentinel.id.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  padding: 8rem 0;
}

.legal-content {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.last-updated {
  color: var(--gray-500);
  margin-bottom: 4rem;
  font-weight: 600;
}

.legal-section {
  margin-bottom: 3rem;
}

.legal-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
  color: var(--gray-900);
}

.legal-section p {
  color: var(--gray-600);
  line-height: 1.8;
  margin-bottom: 1rem;
}

.legal-section ul {
  padding-left: 1.5rem;
  color: var(--gray-600);
  line-height: 1.8;
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
