import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'AquaSentinel - Peringatan Dini Banjir',
      showHeader: true,
      showFooter: true
    }
  },
  {
    path: '/lokasi-tersimpan',
    name: 'saved-locations',
    component: () => import('../views/SavedLocationsView.vue'),
    meta: {
      title: 'Lokasi Tersimpan - AquaSentinel',
      showHeader: true,
      showFooter: true
    }
  },
  {
    path: '/pengaturan',
    name: 'settings',
    component: () => import('../views/SettingsView.vue'),
    meta: {
      title: 'Pengaturan - AquaSentinel',
      showHeader: true,
      showFooter: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Update title pada setiap route change
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'AquaSentinel'
  next()
})

export default router