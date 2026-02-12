<template>
  <div class="search-box animate-scale-in">
    <div class="search-input-wrapper">
      <div class="input-group">
        <i class="fas fa-search search-icon"></i>
        <input
          type="text"
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
          @focus="$emit('focus')"
          @blur="$emit('blur')"
          placeholder="Cari Lokasi Alamat Anda..."
          aria-label="Cari alamat atau lokasi"
        />
        <button
          v-if="searchQuery"
          class="btn-clear"
          @click="$emit('update:searchQuery', '')"
          aria-label="Bersihkan pencarian"
        >
          <i class="fas fa-times-circle"></i>
        </button>
      </div>

      <div class="search-actions">
        <button
          v-if="hasLocation"
          class="btn-bookmark"
          :class="{ saved: isLocationSaved }"
          @click="$emit('toggle-save')"
          :aria-label="isLocationSaved ? 'Hapus dari tersimpan' : 'Simpan lokasi'"
          :title="isLocationSaved ? 'Hapus' : 'Simpan'"
        >
          <i :class="isLocationSaved ? 'fas fa-bookmark' : 'far fa-bookmark'"></i>
        </button>
        <button
          :class="['btn btn-primary btn-detect', { 'btn-loading': isDetecting }]"
          @click="$emit('detect-risk')"
          :disabled="isDetecting"
          aria-label="Deteksi risiko banjir di lokasi ini"
        >
          <div class="btn-content">
            <i v-if="!isDetecting" class="fas fa-radar"></i>
            <i v-else class="fas fa-spinner fa-spin"></i>
            <span class="btn-text">{{ isDetecting ? 'Menganalisis...' : 'Deteksi Risiko' }}</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Suggestions List -->
    <transition name="slide-down">
      <div v-if="showSuggestions && filteredSuggestions.length > 0" class="suggestions-container">
        <div class="suggestions-header">
          <span>Saran Lokasi</span>
        </div>
        <div class="suggestions-list">
          <button
            v-for="suggestion in filteredSuggestions"
            :key="suggestion.name"
            class="suggestion-item"
            @mousedown="$emit('select-suggestion', suggestion)"
          >
            <div class="suggestion-icon">
              <i class="fas fa-map-pin"></i>
            </div>
            <div class="suggestion-info">
              <span class="suggestion-name">{{ suggestion.displayName }}</span>
              <span class="suggestion-meta">{{ suggestion.kec }}, {{ suggestion.kab }}</span>
            </div>
            <i class="fas fa-chevron-right arrow-icon"></i>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
defineProps({
  searchQuery: String,
  showSuggestions: Boolean,
  filteredSuggestions: Array,
  isLocationSaved: Boolean,
  isDetecting: Boolean,
  hasLocation: Boolean
})

defineEmits([
  'update:searchQuery',
  'select-suggestion',
  'toggle-save',
  'detect-risk',
  'focus',
  'blur'
])
</script>

<style scoped>
.search-box {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: 0.75rem;
  box-shadow: var(--glass-shadow);
  margin-bottom: 2.5rem;
  position: relative;
  z-index: 100;
  transition: var(--transition);
}

.search-box:focus-within {
  background: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.input-group {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  color: var(--primary);
  font-size: 1.125rem;
  pointer-events: none;
}

.btn-clear {
  position: absolute;
  right: 1.25rem;
  background: none;
  border: none;
  color: var(--gray-400);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  transition: var(--transition-fast);
}

.btn-clear:hover {
  color: var(--danger);
  transform: scale(1.1);
}

.input-group input {
  width: 100%;
  border: 1px solid var(--gray-100);
  padding: 1.125rem 1.125rem 1.125rem 3.5rem;
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-weight: 600;
  transition: var(--transition-fast);
  background: var(--gray-50);
  color: var(--gray-900);
}

.input-group input:focus {
  outline: none;
  background: white;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--primary-soft);
}

.search-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.btn-detect {
  min-width: 160px;
  height: clamp(52px, 8vh, 60px);
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.btn-bookmark {
  width: clamp(52px, 8vh, 60px);
  height: clamp(52px, 8vh, 60px);
  border-radius: var(--radius-lg);
  background: var(--gray-50);
  border: 1px solid var(--gray-100);
  color: var(--gray-400);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-fast);
  cursor: pointer;
}

.btn-bookmark:hover {
  background: white;
  border-color: var(--primary);
  color: var(--primary);
  transform: translateY(-2px);
}

.btn-bookmark.saved {
  background: var(--primary-soft);
  border-color: var(--primary);
  color: var(--primary);
}

/* Suggestions Container */
.suggestions-container {
  position: absolute;
  top: calc(100% + 0.75rem);
  left: 0;
  right: 0;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 40px -12px rgba(16, 24, 40, 0.2);
  border: 1px solid var(--gray-100);
  overflow: hidden;
  z-index: 1000;
  animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.suggestions-header {
  padding: 1rem 1.5rem;
  background: var(--gray-25);
  border-bottom: 1px solid var(--gray-100);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--gray-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.suggestions-list {
  max-height: 320px;
  overflow-y: auto;
}

.suggestion-item {
  width: 100%;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  cursor: pointer;
  transition: var(--transition-fast);
  border: none;
  background: transparent;
  text-align: left;
  border-bottom: 1px solid var(--gray-50);
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-item:hover {
  background: var(--primary-soft);
}

.suggestion-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  font-size: 1.125rem;
  transition: var(--transition-fast);
}

.suggestion-item:hover .suggestion-icon {
  background: white;
  transform: scale(1.1) rotate(-10deg);
}

.suggestion-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.suggestion-name {
  font-weight: 700;
  color: var(--gray-900);
  font-size: 1rem;
}

.suggestion-meta {
  font-size: 0.875rem;
  color: var(--gray-500);
}

.arrow-icon {
  color: var(--gray-300);
  font-size: 0.875rem;
  opacity: 0;
  transform: translateX(-10px);
  transition: var(--transition-fast);
}

.suggestion-item:hover .arrow-icon {
  opacity: 1;
  transform: translateX(0);
}

/* Animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@media (max-width: 768px) {
  .search-box {
    padding: 0.5rem;
    border-radius: var(--radius-lg);
  }

  .search-input-wrapper {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }

  .input-group input {
    padding-left: 3.25rem;
    height: 56px;
  }

  .search-actions {
    width: 100%;
    gap: 0.5rem;
  }

  .btn-bookmark {
    flex: 1;
    max-width: 60px;
  }

  .btn-detect {
    flex: 4;
  }

  .btn-text {
    font-size: 0.875rem;
  }
}
</style>
