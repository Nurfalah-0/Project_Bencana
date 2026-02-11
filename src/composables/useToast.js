import { ref } from 'vue'

export function useToast() {
  const toastMessage = ref('')
  const toastType = ref('info')
  const showToast = ref(false)
  let toastTimeout = null

  const show = (message, type = 'info', duration = 3000) => {
    // Clear existing timeout
    if (toastTimeout) {
      clearTimeout(toastTimeout)
    }

    // Set new toast
    toastMessage.value = message
    toastType.value = type
    showToast.value = true

    // Auto hide
    toastTimeout = setTimeout(() => {
      showToast.value = false
    }, duration)
  }

  const success = (message, duration = 3000) => {
    show(message, 'success', duration)
  }

  const error = (message, duration = 3000) => {
    show(message, 'error', duration)
  }

  const warning = (message, duration = 3000) => {
    show(message, 'warning', duration)
  }

  const info = (message, duration = 3000) => {
    show(message, 'info', duration)
  }

  const hide = () => {
    showToast.value = false
    if (toastTimeout) {
      clearTimeout(toastTimeout)
    }
  }

  return {
    toastMessage,
    toastType,
    showToast,
    show,
    success,
    error,
    warning,
    info,
    hide
  }
}