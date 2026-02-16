<!-- src/App.vue -->
<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />

    <!-- Modals -->
    <ChecklistModal
      :show="uiStore.activeModals.checklist"
      @close="uiStore.closeModal('checklist')"
    />
    <GPSTipsModal :show="uiStore.activeModals.gpsTips" @close="uiStore.closeModal('gpsTips')" />

    <!-- Toast -->
    <Toast
      :message="uiStore.toastMessage"
      :type="uiStore.toastType"
      :show="uiStore.showToast"
      @hide="uiStore.showToast = false"
    />

    <!-- Global Error Overlay -->
    <div v-if="uiStore.globalError" class="global-error-overlay">
      <div class="error-content">
        <span class="error-source">{{ uiStore.globalError.source }}</span>
        <span class="error-message">{{ uiStore.globalError.message }}</span>
        <button @click="uiStore.clearError" class="error-close">&times;</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Toast from './components/Toast.vue'
import ChecklistModal from './components/modals/ChecklistModal.vue'
import GPSTipsModal from './components/modals/GPSTipsModal.vue'
import { useUIStore } from './stores/uiStore'
import { useLocationStore } from './stores/locationStore'

const uiStore = useUIStore()
const locationStore = useLocationStore()

onMounted(() => {
  locationStore.loadStoreData()
})

// Re-expose legacy provide for components not yet refactored
import { provide } from 'vue'
provide('toast', (message, type) => uiStore.notify(message, type))
provide('showChecklistModal', () => uiStore.openModal('checklist'))
provide('showGPSTipsModal', () => uiStore.openModal('gpsTips'))
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.global-error-overlay {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 9999;
  animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.error-content {
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(12px);
  padding: 1rem 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 400px;
}

.error-source {
  background: #ef4444;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
}

.error-message {
  color: #f8fafc;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.4;
}

.error-close {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.2s;
}

.error-close:hover {
  color: white;
}

@keyframes slide-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
