<template>
  <div class="page-container">
    <div class="container">
      <div class="legal-content animate-reveal">
        <h1 class="page-title">Penafian <span class="highlight">Situs</span></h1>
        <p class="last-updated">Terakhir diperbarui: 16 Februari 2026</p>

        <section class="legal-section">
          <h2>Bukan Pengganti Instruksi Resmi</h2>
          <p>
            AquaSentinel adalah platform berbasis AI yang dikembangkan untuk tujuan bantuan teknis
            dan edukasi. Hasil prediksi risiko banjir yang ditampilkan oleh platform ini
            <strong>bukanlah</strong> pengganti pengumuman atau instruksi resmi dari Badan
            Penanggulangan Bencana Daerah (BPBD), BMKG, atau otoritas pemerintah lainnya.
          </p>
        </section>

        <section class="legal-section">
          <h2>Tanggung Jawab Pengguna</h2>
          <p>
            Penggunaan informasi yang diperoleh dari AquaSentinel sepenuhnya merupakan risiko dan
            tanggung jawab pengguna. Kami tidak bertanggung jawab atas kerugian materiil, cedera
            fisik, atau dampak hukum apa pun yang timbul akibat keputusan yang diambil berdasarkan
            data dari platform kami.
          </p>
        </section>

        <section class="legal-section">
          <h2>Akurasi Prediksi</h2>
          <p>
            Model AI kami terus diperbarui, namun fenomena alam bersifat kompleks dan dapat berubah
            sewaktu-waktu. Probabilitas risiko yang kami berikan bersifat estimasi ilmiah dan dapat
            meleset dari kondisi lapangan yang sebenarnya.
          </p>
        </section>

        <section class="legal-section">
          <h2>Keselamatan Utama</h2>
          <p>
            Utamakan keselamatan Anda dan keluarga. Selalu pantau kanal komunikasi resmi pemerintah
            saat terjadi kondisi darurat atau cuaca ekstrem.
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
