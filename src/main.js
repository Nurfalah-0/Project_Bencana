// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Google Maps logic is handled in composables/useMap.js

// Import Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css'

// Import CSS global
import './assets/main.css'

// Inisialisasi aplikasi
const app = createApp(App)

// Setup Pinia untuk state management
app.use(createPinia())

// Setup Router
app.use(router)

// Mount aplikasi
app.mount('#app')

// Global Error Handler for Debugging
const showError = (message, source) => {
  const errorId = 'global-error-overlay'
  let errorDiv = document.getElementById(errorId)

  if (!errorDiv) {
    errorDiv = document.createElement('div')
    errorDiv.id = errorId
    errorDiv.style.cssText = `
      position: fixed;
      bottom: 1rem;
      left: 1rem;
      background: rgba(15, 23, 42, 0.9);
      backdrop-filter: blur(8px);
      color: #f8fafc;
      padding: 0.75rem 1.25rem;
      border-radius: 12px;
      z-index: 99999;
      font-size: 0.8125rem;
      font-weight: 500;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.1);
      max-width: 320px;
      animation: slideIn 0.3s ease-out;
    `
    document.body.appendChild(errorDiv)

    const style = document.createElement('style')
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(-20px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `
    document.head.appendChild(style)
  }

  errorDiv.innerHTML = `<span style="color: #ef4444; font-weight: 800; margin-right: 0.5rem;">${source}</span> ${message}`

  // Auto hide after 10 seconds for global errors
  setTimeout(() => {
    if (errorDiv && errorDiv.parentNode) {
      errorDiv.parentNode.removeChild(errorDiv)
    }
  }, 10000)
}

app.config.errorHandler = (err, instance, info) => {
  showError(`${err.message} (Info: ${info})`, 'Vue Error')
}

window.onerror = (message, source, lineno, colno, error) => {
  showError(`${message} at ${source}:${lineno}:${colno}`, 'Window Error')
}

window.addEventListener('unhandledrejection', event => {
  showError(event.reason, 'Unhandled Promise Rejection')
})
