#!/bin/bash

echo "🚀 Membuat proyek AquaSentinel Vue.js..."

# Buat proyek Vue
npm create vue@latest aquasentinel-vue

cd aquasentinel-vue

echo "📦 Menginstall dependencies tambahan..."
npm install leaflet leaflet-routing-machine leaflet-control-geocoder

echo "🧹 Membersihkan file default..."
rm -f src/components/HelloWorld.vue
rm -f src/views/AboutView.vue
rm -f src/assets/logo.svg
rm -f src/assets/base.css

echo "📁 Membuat struktur folder..."
mkdir -p src/components/modals
mkdir -p src/composables
mkdir -p src/stores
mkdir -p src/utils

echo "📝 Membuat file komponen..."
# Buat file komponen utama
cat > src/components/Header.vue << 'EOF'
<template>
  <header class="aquasentinel-header">
    <div class="container">
      <nav class="navbar">
        <div class="nav-brand">
          <div class="logo">
            <i class="fas fa-water"></i>
            <span>AquaSentinel</span>
          </div>
          <div class="tagline">Peringatan Dini Banjir</div>
        </div>
        
        <div class="nav-actions">
          <button class="btn btn-download" @click="downloadApp">
            <i class="fab fa-android"></i> Download App
          </button>
          <button class="btn-menu" @click="toggleMobileMenu">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const downloadApp = () => {
  alert('Aplikasi akan segera tersedia di Google Play Store!')
}
</script>

<style scoped>
.aquasentinel-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: var(--shadow-sm);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary);
}

.logo i {
  font-size: 2rem;
  color: var(--primary);
}

.tagline {
  color: var(--gray-600);
  font-size: 0.875rem;
  font-weight: 500;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  cursor: pointer;
  transition: var(--transition);
  text-decoration: none;
  outline: none;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.btn-download {
  background: linear-gradient(135deg, var(--secondary), var(--secondary-dark));
  color: white;
}

.btn-download:hover {
  background: linear-gradient(135deg, var(--secondary-dark), #047857);
}

.btn-menu {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--gray-700);
  cursor: pointer;
  display: none;
}

@media (max-width: 768px) {
  .btn-menu {
    display: block;
  }
  
  .nav-actions .btn-download {
    display: none;
  }
}
</style>
EOF

echo "✅ Setup selesai!"
echo "🚀 Jalankan proyek dengan:"
echo "   cd aquasentinel-vue"
echo "   npm run dev"