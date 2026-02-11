<template>
  <div class="modal-overlay" :class="{ active: show }" @click.self="close">
    <div class="modal-glass">
      <div class="modal-header">
        <div class="header-main">
          <div class="header-icon"><i class="fas fa-clipboard-check"></i></div>
          <div class="header-text">
            <h3>Checklist Persiapan</h3>
            <p>Pastikan barang esensial siap sebelum evakuasi</p>
          </div>
        </div>
        <button class="btn-close-minimal" @click="close"><i class="fas fa-times"></i></button>
      </div>

      <div class="modal-body custom-scrollbar">
        <div class="checklist-grid">
          <div
            v-for="item in checklistItems"
            :key="item.id"
            class="check-item-card"
            :class="{ checked: item.checked }"
            @click="toggleItem(item)"
          >
            <div class="check-box">
              <i v-if="item.checked" class="fas fa-check"></i>
            </div>
            <div class="check-label">
              <span class="main-label">{{ item.label }}</span>
              <span class="category-tag">{{ item.category }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <div class="footer-stats">
          <div class="progress-info">
            <span class="pct">{{ completionPercentage }}%</span>
            <span class="lbl">Tercapai</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-fill" :style="{ width: completionPercentage + '%' }"></div>
          </div>
        </div>
        <div class="footer-actions">
          <button class="btn-ghost" @click="resetChecklist">
            <i class="fas fa-redo"></i> <span>Reset</span>
          </button>
          <button class="btn-premium-primary" @click="close">
            <span>Selesai</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  show: { type: Boolean, default: false }
})

const emit = defineEmits(['close'])

const checklistItems = ref([
  { id: 1, label: 'Dokumen penting (KTP, KK, Akta)', checked: false, category: 'Administrasi' },
  { id: 2, label: 'Uang tunai & Kartu ATM', checked: false, category: 'Finansial' },
  { id: 3, label: 'Ponsel & Power bank jumbo', checked: false, category: 'Elektronik' },
  { id: 4, label: 'Obat-obatan kronis & P3K', checked: false, category: 'Kesehatan' },
  { id: 5, label: 'Pakaian ganti & Selimut', checked: false, category: 'Logistik' },
  { id: 7, label: 'Senter & Baterai Cadangan', checked: false, category: 'Keamanan' },
  { id: 6, label: 'Air mineral & Ransum 3 hari', checked: false, category: 'Konsumsi' }
])

const completedCount = computed(() => checklistItems.value.filter(item => item.checked).length)
const totalCount = computed(() => checklistItems.value.length)
const completionPercentage = computed(() =>
  Math.round((completedCount.value / totalCount.value) * 100)
)

const close = () => emit('close')
const toggleItem = item => {
  item.checked = !item.checked
  saveToLocal()
}

const resetChecklist = () => {
  if (confirm('Atur ulang seluruh daftar?')) {
    checklistItems.value.forEach(i => (i.checked = false))
    saveToLocal()
  }
}

const saveToLocal = () =>
  localStorage.setItem('aquasentinel_checklist_v2', JSON.stringify(checklistItems.value))
const loadFromLocal = () => {
  const saved = localStorage.getItem('aquasentinel_checklist_v2')
  if (saved) checklistItems.value = JSON.parse(saved)
}

onMounted(loadFromLocal)
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 5000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-overlay.active {
  opacity: 1;
  pointer-events: auto;
}

.modal-glass {
  background: white;
  width: 90%;
  max-width: 600px;
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.2);
  transform: translateY(30px) scale(0.95);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-overlay.active .modal-glass {
  transform: translateY(0) scale(1);
}

.modal-header {
  padding: 1.75rem 2.5rem;
  background: white;
  border-bottom: 1px solid var(--gray-50);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-main {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.header-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: var(--primary-light);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.header-text h3 {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--gray-900);
  margin: 0;
}
.header-text p {
  font-size: 0.8125rem;
  color: var(--gray-500);
  margin: 0;
  font-weight: 500;
}

.btn-close-minimal {
  background: var(--gray-50);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  color: var(--gray-400);
  cursor: pointer;
  transition: 0.3s;
}

.btn-close-minimal:hover {
  background: var(--danger);
  color: white;
  transform: rotate(90deg);
}

.modal-body {
  padding: 2rem 2.5rem;
  max-height: 60vh;
  overflow-y: auto;
}

.checklist-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.check-item-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem;
  border-radius: 18px;
  border: 1px solid var(--gray-100);
  cursor: pointer;
  transition: var(--transition);
}

.check-item-card:hover {
  border-color: var(--primary);
  background: var(--primary-light);
}

.check-box {
  width: 24px;
  height: 24px;
  border-radius: 8px;
  border: 2px solid var(--gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  color: white;
  font-size: 0.75rem;
}

.check-item-card.checked {
  border-color: var(--secondary);
  background: #f0fdf4;
}
.check-item-card.checked .check-box {
  background: var(--secondary);
  border-color: var(--secondary);
}
.check-item-card.checked .main-label {
  text-decoration: line-through;
  opacity: 0.5;
}

.check-label {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}
.main-label {
  font-weight: 700;
  color: var(--gray-800);
  font-size: 0.9375rem;
}
.category-tag {
  font-size: 0.6875rem;
  font-weight: 800;
  color: var(--gray-400);
  text-transform: uppercase;
}

.modal-footer {
  padding: 2rem 2.5rem;
  background: var(--gray-25);
  border-top: 1px solid var(--gray-100);
}

.footer-stats {
  margin-bottom: 2rem;
}
.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.75rem;
}
.progress-info .pct {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--primary);
}
.progress-info .lbl {
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--gray-500);
  text-transform: uppercase;
}

.progress-bar-container {
  height: 8px;
  background: var(--gray-100);
  border-radius: 100px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: var(--primary);
  border-radius: inherit;
  transition: width 1s linear;
}

.footer-actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.btn-ghost {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  border: none;
  background: transparent;
  color: var(--gray-500);
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
}

.btn-ghost:hover {
  color: var(--danger);
  transform: rotate(-5deg);
}

.btn-premium-primary {
  background: var(--gray-900);
  color: white;
  border: none;
  padding: 0.875rem 2.5rem;
  border-radius: 100px;
  font-weight: 800;
  cursor: pointer;
  transition: var(--transition);
}

.btn-premium-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

@media (max-width: 640px) {
  .modal-glass {
    width: 95%;
    max-height: 95vh;
  }
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1.5rem;
  }
}
</style>
