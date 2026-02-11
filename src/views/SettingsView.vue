<template>
  <div class="settings-view">
    <div class="container">
      <div class="page-header">
        <h1><i class="fas fa-cog"></i> Pengaturan</h1>
        <p>Kelola preferensi dan pengaturan aplikasi AquaSentinel</p>
      </div>

      <div class="settings-grid">
        <!-- GPS Settings -->
        <div class="settings-card">
          <h3><i class="fas fa-satellite"></i> Pengaturan GPS</h3>
          <div class="setting-item">
            <div class="setting-info">
              <h4>Akurasi Tinggi</h4>
              <p>Gunakan akurasi GPS tinggi untuk hasil lebih presisi</p>
            </div>
            <div class="setting-control">
              <label class="toggle-switch">
                <input type="checkbox" v-model="highAccuracy" />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h4>Refresh Otomatis</h4>
              <p>Perbarui lokasi secara otomatis setiap 30 detik</p>
            </div>
            <div class="setting-control">
              <label class="toggle-switch">
                <input type="checkbox" v-model="autoRefresh" />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="settings-card">
          <h3><i class="fas fa-bell"></i> Notifikasi</h3>
          <div class="setting-item">
            <div class="setting-info">
              <h4>Peringatan Banjir</h4>
              <p>Terima notifikasi saat risiko banjir terdeteksi</p>
            </div>
            <div class="setting-control">
              <label class="toggle-switch">
                <input type="checkbox" v-model="floodAlerts" checked />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h4>Pembaruan Cuaca</h4>
              <p>Notifikasi perubahan kondisi cuaca</p>
            </div>
            <div class="setting-control">
              <label class="toggle-switch">
                <input type="checkbox" v-model="weatherUpdates" />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <!-- Display Settings -->
        <div class="settings-card">
          <h3><i class="fas fa-palette"></i> Tampilan</h3>
          <div class="setting-item">
            <div class="setting-info">
              <h4>Mode Gelap</h4>
              <p>Gunakan tema gelap untuk kenyamanan mata</p>
            </div>
            <div class="setting-control">
              <label class="toggle-switch">
                <input type="checkbox" v-model="darkMode" />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h4>Mode Satelit</h4>
              <p>Tampilkan peta dalam mode satelit secara default</p>
            </div>
            <div class="setting-control">
              <label class="toggle-switch">
                <input type="checkbox" v-model="satelliteMode" />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <!-- Data Settings -->
        <div class="settings-card">
          <h3><i class="fas fa-database"></i> Data</h3>
          <div class="setting-item">
            <div class="setting-info">
              <h4>Simpan Riwayat</h4>
              <p>Simpan riwayat deteksi lokasi</p>
            </div>
            <div class="setting-control">
              <label class="toggle-switch">
                <input type="checkbox" v-model="saveHistory" />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h4>Cache Data</h4>
              <p>Simpan data sementara untuk kinerja lebih cepat</p>
            </div>
            <div class="setting-control">
              <label class="toggle-switch">
                <input type="checkbox" v-model="enableCache" />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="settings-actions">
        <button class="btn btn-primary" @click="saveSettings">
          <i class="fas fa-save"></i> Simpan Pengaturan
        </button>
        <button class="btn btn-secondary" @click="resetSettings">
          <i class="fas fa-undo"></i> Reset ke Default
        </button>
        <button class="btn btn-danger" @click="clearData">
          <i class="fas fa-trash"></i> Hapus Semua Data
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'

const toast = inject('toast')

// Settings state
const highAccuracy = ref(true)
const autoRefresh = ref(false)
const floodAlerts = ref(true)
const weatherUpdates = ref(true)
const darkMode = ref(false)
const satelliteMode = ref(false)
const saveHistory = ref(true)
const enableCache = ref(true)

onMounted(() => {
  loadSettings()
})

const loadSettings = () => {
  const saved = localStorage.getItem('aquasentinel_settings')
  if (saved) {
    const settings = JSON.parse(saved)
    highAccuracy.value = settings.highAccuracy ?? true
    autoRefresh.value = settings.autoRefresh ?? false
    floodAlerts.value = settings.floodAlerts ?? true
    weatherUpdates.value = settings.weatherUpdates ?? true
    darkMode.value = settings.darkMode ?? false
    satelliteMode.value = settings.satelliteMode ?? false
    saveHistory.value = settings.saveHistory ?? true
    enableCache.value = settings.enableCache ?? true
  }
}

const saveSettings = () => {
  const settings = {
    highAccuracy: highAccuracy.value,
    autoRefresh: autoRefresh.value,
    floodAlerts: floodAlerts.value,
    weatherUpdates: weatherUpdates.value,
    darkMode: darkMode.value,
    satelliteMode: satelliteMode.value,
    saveHistory: saveHistory.value,
    enableCache: enableCache.value,
    savedAt: new Date().toISOString()
  }

  localStorage.setItem('aquasentinel_settings', JSON.stringify(settings))
  toast('Pengaturan berhasil disimpan!', 'success')

  // Apply dark mode if enabled
  if (darkMode.value) {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

const resetSettings = () => {
  if (confirm('Reset semua pengaturan ke nilai default?')) {
    localStorage.removeItem('aquasentinel_settings')
    loadSettings()
    toast('Pengaturan direset ke default', 'info')
  }
}

const clearData = () => {
  if (confirm('Hapus semua data termasuk lokasi tersimpan? Tindakan ini tidak dapat dibatalkan.')) {
    localStorage.removeItem('aquasentinel_saved_locations')
    localStorage.removeItem('aquasentinel_history')
    toast('Semua data berhasil dihapus', 'success')
  }
}
</script>

<style scoped>
.settings-view {
  padding: 2rem 0;
  min-height: 70vh;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.page-header p {
  color: var(--gray-600);
  font-size: 1.125rem;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.settings-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--gray-200);
}

.settings-card h3 {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: var(--gray-800);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--gray-100);
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-info h4 {
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: var(--gray-700);
}

.setting-info p {
  font-size: 0.875rem;
  color: var(--gray-500);
}

/* Toggle Switch */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--gray-300);
  transition: 0.4s;
  border-radius: 34px;
}

.toggle-slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: var(--primary);
}

input:checked + .toggle-slider:before {
  transform: translateX(26px);
}

.settings-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }

  .settings-actions {
    flex-direction: column;
  }

  .settings-actions .btn {
    width: 100%;
  }
}
</style>
