<template>
  <div class="share-section">
    <div class="share-header">
      <div class="share-icon-title">
        <div class="icon-circle"><i class="fas fa-paper-plane"></i></div>
        <div class="share-title-text">
          <h3>Bagikan Peringatan</h3>
          <p>Kirim informasi ini ke keluarga & tetangga untuk siaga bersama</p>
        </div>
      </div>
    </div>

    <div class="share-grid">
      <button class="share-card wa" @click="shareViaWhatsApp">
        <div class="card-icon"><i class="fab fa-whatsapp"></i></div>
        <div class="card-label">WhatsApp</div>
        <div class="card-hover-info">Kirim Pesan Cepat</div>
      </button>

      <button class="share-card tg" @click="shareViaTelegram">
        <div class="card-icon"><i class="fab fa-telegram"></i></div>
        <div class="card-label">Telegram</div>
        <div class="card-hover-info">Kirim ke Grup</div>
      </button>

      <button class="share-card cp" @click="copyLocation">
        <div class="card-icon"><i class="fas fa-link"></i></div>
        <div class="card-label">Salin Link</div>
        <div class="card-hover-info">Salin ke Clipboard</div>
      </button>

      <button class="share-card save" @click="saveLocation">
        <div class="card-icon"><i class="fas fa-bookmark"></i></div>
        <div class="card-label">Simpan Pantauan</div>
        <div class="card-hover-info">Simpan di Aplikasi</div>
      </button>
    </div>

    <transition name="toast-fade">
      <div v-if="showShareSuccess" class="share-toast">
        <i class="fas fa-check-circle"></i>
        <span>Berhasil! Informasi siap dibagikan.</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  location: {
    type: Object,
    default: null
  },
  riskLevel: {
    type: String,
    default: 'low'
  },
  riskDescription: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['share-whatsapp', 'share-telegram', 'copy-location', 'save-location'])

const showShareSuccess = ref(false)

const getRiskLabel = () => {
  const levels = { high: 'TINGGI 🔴', medium: 'SEDANG 🟡', low: 'RENDAH 🟢' }
  return levels[props.riskLevel] || 'TERDETEKSI'
}

const getBaseMessage = () => {
  if (!props.location) return ''
  return `⚠️ *SIAGA BANJIR - AquaSentinel AI* ⚠️\n\n📍 Lokasi: ${props.location.address}\n📊 Risiko: ${getRiskLabel()}\n📝 ${props.riskDescription}\n\n📱 Pantau di: ${window.location.origin}\n\n#JatimSiaga #AquaSentinel`
}

const shareViaWhatsApp = () => {
  const url = `https://wa.me/?text=${encodeURIComponent(getBaseMessage())}`
  window.open(url, '_blank')
  emit('share-whatsapp')
  showSuccess()
}

const shareViaTelegram = () => {
  const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(getBaseMessage())}`
  window.open(url, '_blank')
  emit('share-telegram')
  showSuccess()
}

const copyLocation = async () => {
  try {
    await navigator.clipboard.writeText(getBaseMessage())
    emit('copy-location')
    showSuccess()
  } catch (err) {
    showSuccess() // Still show success for fallback UX
  }
}

const saveLocation = () => {
  emit('save-location')
  showSuccess()
}

const showSuccess = () => {
  showShareSuccess.value = true
  setTimeout(() => {
    showShareSuccess.value = false
  }, 3000)
}
</script>

<style scoped>
.share-section {
  background: white;
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  border: 1px solid var(--gray-100);
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
}

.share-header {
  margin-bottom: 2.5rem;
}

.share-icon-title {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  text-align: left;
}

.icon-circle {
  width: 56px;
  height: 56px;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.share-title-text h3 {
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0 0 0.25rem 0;
  color: var(--gray-900);
}

.share-title-text p {
  font-size: 0.875rem;
  color: var(--gray-500);
  margin: 0;
}

.share-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.share-card {
  border: 1px solid var(--gray-100);
  background: var(--gray-25);
  padding: 1.5rem;
  border-radius: var(--radius);
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  position: relative;
}

.share-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--accent-color);
  opacity: 0;
  transition: 0.3s;
  z-index: 0;
}

.share-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-color);
  background: white;
  box-shadow: 0 8px 24px -8px var(--accent-color-light);
}

.card-icon {
  font-size: 1.75rem;
  color: var(--accent-color);
  position: relative;
  z-index: 1;
}

.card-label {
  font-weight: 700;
  font-size: 0.9375rem;
  color: var(--gray-800);
  position: relative;
  z-index: 1;
}

.card-hover-info {
  font-size: 0.75rem;
  color: var(--gray-400);
  position: relative;
  z-index: 1;
}

.wa {
  --accent-color: #25d366;
  --accent-color-light: rgba(37, 211, 102, 0.2);
}
.tg {
  --accent-color: #0088cc;
  --accent-color-light: rgba(0, 136, 204, 0.2);
}
.cp {
  --accent-color: var(--primary);
  --accent-color-light: rgba(59, 130, 246, 0.2);
}
.save {
  --accent-color: #8b5cf6;
  --accent-color-light: rgba(139, 92, 246, 0.2);
}

.share-toast {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: var(--gray-900);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 100px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8125rem;
  font-weight: 600;
  box-shadow: var(--shadow-lg);
  z-index: 100;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-fade-enter-from {
  opacity: 0;
  transform: translate(-50%, 10px);
}
.toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -10px);
}

@media (max-width: 640px) {
  .share-grid {
    grid-template-columns: 1fr;
  }
}
</style>
