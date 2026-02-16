<template>
  <div class="page-container">
    <div class="container">
      <div class="legal-content animate-reveal">
        <h1 class="page-title">Ketentuan <span class="highlight">Layanan</span></h1>
        <p class="last-updated">Terakhir diperbarui: 16 Februari 2026</p>

        <section class="legal-section">
          <h2>1. Penerimaan Ketentuan</h2>
          <p>
            Dengan mengakses atau menggunakan platform AquaSentinel, Anda setuju untuk terikat oleh
            ketentuan layanan ini. Jika Anda tidak menyetujui bagian mana pun dari ketentuan ini,
            Anda tidak diperkenankan menggunakan layanan kami.
          </p>
        </section>

        <section class="legal-section">
          <h2>2. Batasan Penggunaan</h2>
          <p>
            Layanan ini disediakan untuk membantu kesiapsiagaan bencana. Anda dilarang menggunakan
            informasi dari platform ini untuk:
          </p>
          <ul>
            <li>Kegiatan yang melanggar hukum.</li>
            <li>Menyebarkan hoaks atau kepanikan yang tidak perlu.</li>
            <li>Melakukan reverse engineering pada model prediksi AI kami.</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>3. Akurasi Informasi</h2>
          <p>
            Meskipun kami berupaya memberikan data paling akurat melalui teknologi AI, AquaSentinel
            tidak memberikan jaminan 100% mengenai akurasi prediksi. Data ini bersifat bantuan
            informasi dan tidak menggantikan instruksi resmi dari BPBD atau instansi terkait.
          </p>
        </section>

        <section class="legal-section">
          <h2>4. Perubahan Layanan</h2>
          <p>
            Kami berhak mengubah atau menghentikan layanan kapan saja tanpa pemberitahuan sebelumnya
            dalam rangka pemeliharaan sistem atau pembaruan keamanan.
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
