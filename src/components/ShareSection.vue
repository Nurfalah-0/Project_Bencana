<template>
  <div class="share-section">
    <div class="share-header">
      <div class="header-icon-box">
        <i class="fas fa-share-nodes"></i>
      </div>
      <div class="header-content">
        <h3 class="share-title">Bagikan Status</h3>
        <p class="share-subtitle">Kirim peringatan ini untuk keselamatan bersama</p>
      </div>
    </div>

    <div class="share-grid">
      <button class="share-card whatsapp" @click="shareViaWhatsApp">
        <div class="card-inner">
          <div class="icon-box"><i class="fab fa-whatsapp"></i></div>
          <span class="card-label">WhatsApp</span>
        </div>
      </button>

      <button class="share-card telegram" @click="shareViaTelegram">
        <div class="card-inner">
          <div class="icon-box"><i class="fab fa-telegram"></i></div>
          <span class="card-label">Telegram</span>
        </div>
      </button>

      <button class="share-card copy" @click="copyLocation">
        <div class="card-inner">
          <div class="icon-box"><i class="fas fa-copy"></i></div>
          <span class="card-label">Salin Teks</span>
        </div>
      </button>

      <button class="share-card save" @click="saveLocation">
        <div class="card-inner">
          <div class="icon-box"><i class="fas fa-bookmark"></i></div>
          <span class="card-label">Simpan</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  location: { type: Object, default: null },
  riskLevel: { type: String, default: 'low' },
  riskDescription: { type: String, default: '' }
})

const emit = defineEmits(['share-whatsapp', 'share-telegram', 'copy-location', 'save-location'])

const getRiskLabel = () => {
  const levels = { high: '🔴 TINGGI', medium: '🟡 SEDANG', low: '🟢 RENDAH' }
  return levels[props.riskLevel] || 'TERDETEKSI'
}

const getBaseMessage = () => {
  if (!props.location) return ''
  return `⚠️ *AQUASENTINEL ALERT* ⚠️\n\n📍 Lokasi: ${props.location.address}\n📊 Risiko: ${getRiskLabel()}\n📝 ${props.riskDescription}\n\n📱 Cek Langsung: ${window.location.origin}`
}

const shareViaWhatsApp = () => {
  window.open(`https://wa.me/?text=${encodeURIComponent(getBaseMessage())}`, '_blank')
  emit('share-whatsapp')
}

const shareViaTelegram = () => {
  window.open(
    `https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(getBaseMessage())}`,
    '_blank'
  )
  emit('share-telegram')
}

const copyLocation = async () => {
  try {
    await navigator.clipboard.writeText(getBaseMessage())
    emit('copy-location')
  } catch (err) {
    /* silent fail */
  }
}

const saveLocation = () => emit('save-location')
</script>

<style scoped>
.share-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid var(--gray-100);
}

.share-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.header-icon-box {
  width: 40px;
  height: 40px;
  background: var(--primary-soft);
  color: var(--primary);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
}

.share-title {
  font-size: 1rem;
  font-weight: 800;
  margin: 0;
  color: var(--gray-900);
}

.share-subtitle {
  font-size: 0.75rem;
  color: var(--gray-500);
  margin: 0;
  font-weight: 500;
}

.share-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.share-card {
  padding: 1.25rem 0.5rem;
  border-radius: 16px;
  border: 1px solid var(--gray-100);
  background: var(--gray-25);
  cursor: pointer;
  transition: var(--transition-fast);
}

.share-card:hover {
  transform: translateY(-4px);
  background: white;
  border-color: var(--accent-color);
  box-shadow: 0 12px 24px -8px var(--accent-color-soft);
}

.card-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
}

.icon-box {
  font-size: 1.5rem;
  color: var(--accent-color);
  transition: var(--transition-fast);
}

.share-card:hover .icon-box {
  transform: scale(1.15);
}

.card-label {
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--gray-700);
}

.whatsapp {
  --accent-color: #25d366;
  --accent-color-soft: rgba(37, 211, 102, 0.2);
}
.telegram {
  --accent-color: #0088cc;
  --accent-color-soft: rgba(0, 136, 204, 0.2);
}
.copy {
  --accent-color: var(--primary);
  --accent-color-soft: rgba(59, 130, 246, 0.2);
}
.save {
  --accent-color: #8b5cf6;
  --accent-color-soft: rgba(139, 92, 246, 0.2);
}

@media (max-width: 480px) {
  .share-grid {
    grid-template-columns: 1fr;
  }
}
</style>
