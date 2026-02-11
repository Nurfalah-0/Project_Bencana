<!-- src/App.vue -->
<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />

    <!-- Modals -->
    <ChecklistModal :show="showChecklistModal" @close="showChecklistModal = false" />
    <GPSTipsModal :show="showGPSTipsModal" @close="showGPSTipsModal = false" />

    <!-- Toast -->
    <Toast :message="toastMessage" :type="toastType" :show="showToast" @hide="showToast = false" />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Toast from './components/Toast.vue'
import ChecklistModal from './components/modals/ChecklistModal.vue'
import GPSTipsModal from './components/modals/GPSTipsModal.vue'

// Toast functionality
const toastMessage = ref('')
const toastType = ref('info')
const showToast = ref(false)

const showToastMessage = (message, type = 'info') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// Provide toast to child components
provide('toast', showToastMessage)

// Modals
const showChecklistModal = ref(false)
const showGPSTipsModal = ref(false)

// Provide modal controls
provide('showChecklistModal', () => (showChecklistModal.value = true))
provide('showGPSTipsModal', () => (showGPSTipsModal.value = true))
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
</style>
