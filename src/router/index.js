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
    path: '/analisis-riwayat',
    name: 'history',
    component: () => import('../views/HistoryView.vue'),
    meta: {
      title: 'Analisis Riwayat - AquaSentinel',
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
  },
  {
    path: '/buku-panduan',
    name: 'guide',
    component: () => import('../views/GuideView.vue'),
    meta: {
      title: 'Buku Panduan - AquaSentinel',
      showHeader: true,
      showFooter: true
    }
  },
  {
    path: '/tim-pengembang',
    name: 'team',
    component: () => import('../views/TeamView.vue'),
    meta: {
      title: 'Tim Pengembang - AquaSentinel',
      showHeader: true,
      showFooter: true
    }
  },
  {
    path: '/tanya-jawab',
    name: 'faq',
    component: () => import('../views/FaqView.vue'),
    meta: {
      title: 'FAQ - AquaSentinel',
      showHeader: true,
      showFooter: true
    }
  },
  {
    path: '/hubungi-kami',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: {
      title: 'Hubungi Kami - AquaSentinel',
      showHeader: true,
      showFooter: true
    }
  },
  {
    path: '/privasi',
    name: 'privacy',
    component: () => import('../views/PrivacyView.vue'),
    meta: {
      title: 'Kebijakan Privasi - AquaSentinel',
      showHeader: true,
      showFooter: true
    }
  },
  {
    path: '/ketentuan',
    name: 'terms',
    component: () => import('../views/TermsView.vue'),
    meta: {
      title: 'Ketentuan Layanan - AquaSentinel',
      showHeader: true,
      showFooter: true
    }
  },
  {
    path: '/penafian',
    name: 'disclaimer',
    component: () => import('../views/DisclaimerView.vue'),
    meta: {
      title: 'Penafian - AquaSentinel',
      showHeader: true,
      showFooter: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Update title pada setiap route change
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'AquaSentinel'
  next()
})

export default router
