import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  // Toast State
  const toastMessage = ref('')
  const toastType = ref('info')
  const showToast = ref(false)
  let toastTimeout = null

  const notify = (message, type = 'info', duration = 3000) => {
    if (toastTimeout) clearTimeout(toastTimeout)

    toastMessage.value = message
    toastType.value = type
    showToast.value = true

    toastTimeout = setTimeout(() => {
      showToast.value = false
    }, duration)
  }

  // Modal State
  const activeModals = ref({
    checklist: false,
    gpsTips: false
  })

  const openModal = modalName => {
    if (activeModals.value.hasOwnProperty(modalName)) {
      activeModals.value[modalName] = true
    }
  }

  const closeModal = modalName => {
    if (activeModals.value.hasOwnProperty(modalName)) {
      activeModals.value[modalName] = false
    }
  }

  // Error State
  const globalError = ref(null)

  const setError = (error, source = 'System') => {
    globalError.value = {
      message: error.message || error,
      source,
      timestamp: new Date().toISOString()
    }

    // Also notify via toast if it's an error
    notify(globalError.value.message, 'error', 5000)

    // Auto-clear global error after 10s
    setTimeout(() => {
      if (globalError.value && globalError.value.message === (error.message || error)) {
        globalError.value = null
      }
    }, 10000)
  }

  const clearError = () => {
    globalError.value = null
  }

  return {
    // Toast
    toastMessage,
    toastType,
    showToast,
    notify,

    // Modals
    activeModals,
    openModal,
    closeModal,

    // Errors
    globalError,
    setError,
    clearError
  }
})
