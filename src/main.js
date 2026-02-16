// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useUIStore } from './stores/uiStore'

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

// Global Error Handler for Engineering Discipline
const uiStore = useUIStore()

app.config.errorHandler = (err, instance, info) => {
  uiStore.setError(err, `Vue: ${info}`)
  console.error('Vue Error:', err, info)
}

window.onerror = (message, source, lineno, colno, error) => {
  uiStore.setError(message, 'Window Error')
  console.error('Window Error:', message, source, lineno, colno, error)
}

window.addEventListener('unhandledrejection', event => {
  uiStore.setError(event.reason || 'Unhandled Promise Rejection', 'Async Error')
  console.error('Unhandled Promise Rejection:', event.reason)
})
