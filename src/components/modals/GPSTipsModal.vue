<template>
  <div class="modal-overlay" :class="{ active: show }" @click.self="close">
    <div class="modal-premium">
      <div class="modal-decoration"></div>
      <div class="modal-header">
        <div class="header-icon-box"><i class="fas fa-satellite-dish"></i></div>
        <div class="header-title">
          <h3>Optimalkan GPS</h3>
          <p>Tingkatkan akurasi deteksi lokasi AI Anda</p>
        </div>
        <button class="btn-circular" @click="close"><i class="fas fa-times"></i></button>
      </div>

      <div class="modal-body custom-scrollbar">
        <div class="tips-grid">
          <div v-for="tip in gpsTips" :key="tip.id" class="tip-modern-card">
            <div class="tip-icon"><i :class="tip.icon"></i></div>
            <div class="tip-info">
              <h4>{{ tip.title }}</h4>
              <p>{{ tip.description }}</p>
            </div>
          </div>
        </div>

        <div class="accuracy-indicator-panel">
          <h5><i class="fas fa-signal"></i> Status Indikator</h5>
          <div class="accuracy-pills">
            <div class="acc-pill good">
              <span class="dot"></span>
              <span class="txt">Presisi (0-20m)</span>
            </div>
            <div class="acc-pill warn">
              <span class="dot"></span>
              <span class="txt">Wajar (20-80m)</span>
            </div>
            <div class="acc-pill bad">
              <span class="dot"></span>
              <span class="txt">Rendah (>80m)</span>
            </div>
          </div>
        </div>

        <div class="troubleshoot-area">
          <h5><i class="fas fa-wrench"></i> Masih Bermasalah?</h5>
          <div class="steps-flow">
            <div class="flow-item">
              <div class="flow-num">1</div>
              <p>Periksa Izin Lokasi di Browser</p>
            </div>
            <div class="flow-item">
              <div class="flow-num">2</div>
              <p>Segarkan Halaman (F5)</p>
            </div>
            <div class="flow-item">
              <div class="flow-num">3</div>
              <p>Nyalakan Wi-Fi (membantu triangulasi)</p>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn-premium-outline" @click="refreshGPS">
          <i class="fas fa-sync"></i> <span>Refresh GPS</span>
        </button>
        <button class="btn-premium-fill" @click="close">
          <span>Mengerti</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'

const props = defineProps({
  show: { type: Boolean, default: false }
})

const emit = defineEmits(['close'])
const toast = inject('toast')

const gpsTips = ref([
  {
    id: 1,
    icon: 'fas fa-map-pin',
    title: 'Izin Lokasi Presisi',
    description: 'Pastikan opsi "Precise Location" aktif di pengaturan privasi browser Anda.'
  },
  {
    id: 2,
    icon: 'fas fa-cloud-sun',
    title: 'Open Sky',
    description:
      'Gunakan perangkat di area yang tidak terhalang beton tebal atau gedung pencakar langit.'
  },
  {
    id: 3,
    icon: 'fas fa-broadcast-tower',
    title: 'Wi-Fi & Bluetooth',
    description:
      'Mengaktifkan Wi-Fi membantu sistem melakukan triangulasi meski tidak terhubung internet.'
  }
])

const close = () => emit('close')

const refreshGPS = () => {
  toast('Sinkronisasi ulang data satelit GPS sedang berlangsung...', 'info')
  close()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 5000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s ease;
}

.modal-overlay.active {
  opacity: 1;
  pointer-events: auto;
}

.modal-premium {
  background: white;
  width: 90%;
  max-width: 650px;
  border-radius: 32px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 50px 100px -20px rgba(0, 0, 0, 0.3);
  transform: translateY(40px);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-overlay.active .modal-premium {
  transform: translateY(0);
}

.modal-decoration {
  position: absolute;
  top: -100px;
  right: -100px;
  width: 300px;
  height: 300px;
  background: var(--primary-light);
  border-radius: 50%;
  opacity: 0.3;
  filter: blur(50px);
}

.modal-header {
  padding: 2.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  z-index: 10;
}

.header-icon-box {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.header-title h3 {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--gray-900);
  margin: 0;
}
.header-title p {
  font-size: 0.875rem;
  color: var(--gray-500);
  margin: 0;
  font-weight: 500;
}

.btn-circular {
  margin-left: auto;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--gray-100);
  background: white;
  color: var(--gray-500);
  cursor: pointer;
  transition: 0.3s;
}

.btn-circular:hover {
  background: var(--gray-900);
  color: white;
}

.modal-body {
  padding: 0 2.5rem 2.5rem;
  max-height: 60vh;
  overflow-y: auto;
}

.tips-grid {
  display: grid;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.tip-modern-card {
  background: var(--gray-25);
  border: 1px solid var(--gray-100);
  padding: 1.25rem;
  border-radius: 20px;
  display: flex;
  gap: 1.25rem;
  transition: 0.3s;
}

.tip-modern-card:hover {
  transform: scale(1.01);
  border-color: var(--primary-light);
}

.tip-icon {
  font-size: 1.5rem;
  color: var(--primary);
}
.tip-info h4 {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--gray-900);
  margin: 0 0 0.25rem 0;
}
.tip-info p {
  font-size: 0.8125rem;
  color: var(--gray-500);
  line-height: 1.5;
  margin: 0;
}

.accuracy-indicator-panel h5,
.troubleshoot-area h5 {
  font-size: 0.9375rem;
  font-weight: 800;
  color: var(--gray-900);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.accuracy-pills {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.acc-pill {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 1rem;
  border-radius: 100px;
  border: 1px solid var(--gray-200);
}

.acc-pill .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.acc-pill .txt {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--gray-600);
}

.acc-pill.good {
  background: #f0fdf4;
  border-color: #bbf7d0;
}
.acc-pill.good .dot {
  background: var(--secondary);
}

.acc-pill.warn {
  background: #fffbeb;
  border-color: #fef3c7;
}
.acc-pill.warn .dot {
  background: var(--warning);
}

.acc-pill.bad {
  background: #fef2f2;
  border-color: #fee2e2;
}
.acc-pill.bad .dot {
  background: var(--danger);
}

.steps-flow {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.flow-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: var(--gray-50);
  border-radius: 12px;
}

.flow-num {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: var(--gray-900);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 800;
}

.flow-item p {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gray-700);
}

.modal-footer {
  padding: 2rem 2.5rem;
  border-top: 1px solid var(--gray-50);
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.btn-premium-outline {
  background: transparent;
  border: 1px solid var(--gray-200);
  padding: 0.875rem 1.5rem;
  border-radius: 100px;
  font-weight: 700;
  color: var(--gray-600);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: 0.3s;
}

.btn-premium-outline:hover {
  background: var(--gray-50);
  color: var(--gray-900);
}

.btn-premium-fill {
  background: var(--gray-900);
  color: white;
  border: none;
  padding: 0.875rem 2.5rem;
  border-radius: 100px;
  font-weight: 800;
  cursor: pointer;
  transition: 0.3s;
}

.btn-premium-fill:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

@media (max-width: 640px) {
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1.5rem;
  }
  .modal-footer {
    flex-direction: column-reverse;
  }
}
</style>
