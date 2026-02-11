<template>
  <div class="search-box animate-scale-in" style="animation-delay: 0.5s">
    <div class="search-input">
      <i class="fas fa-search"></i>
      <input
        type="text"
        :value="searchQuery"
        @input="$emit('update:searchQuery', $event.target.value)"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        placeholder="Cari Lokasi Alamat Anda"
        aria-label="Cari alamat atau lokasi"
      />
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
          <i v-if="!isDetecting" class="fas fa-radar"></i>
          <i v-else class="fas fa-spinner fa-spin"></i>
          <span>{{ isDetecting ? 'Menganalisis...' : 'Deteksi Risiko' }}</span>
        </button>
      </div>
    </div>

    <!-- Suggestions -->
    <transition name="fade">
      <div v-if="showSuggestions && filteredSuggestions.length > 0" class="suggestions">
        <div
          v-for="suggestion in filteredSuggestions"
          :key="suggestion.name"
          class="suggestion-item"
          @mousedown="$emit('select-suggestion', suggestion)"
        >
          <div class="suggestion-icon">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <div class="suggestion-text">
            <span class="suggestion-name">{{ suggestion.displayName }}</span>
            <span class="suggestion-meta">{{ suggestion.kec }}, {{ suggestion.kab }}</span>
          </div>
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
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: 1.25rem;
  box-shadow: var(--shadow-lg);
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

.search-input {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.search-input > i {
  position: absolute;
  left: 1.5rem;
  color: var(--primary);
  font-size: 1.25rem;
}

.search-input input {
  flex: 1;
  border: 1px solid var(--gray-100);
  padding: 1.25rem 1.25rem 1.25rem 3.5rem;
  border-radius: var(--radius-lg);
  font-size: 1.125rem;
  font-weight: 500;
  transition: var(--transition);
  background: var(--gray-50);
}

.search-input input:focus {
  outline: none;
  background: white;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--primary-light);
}

.search-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.btn-detect {
  min-width: 180px;
  justify-content: center;
  height: 56px;
  font-size: 1rem;
  font-weight: 700;
  white-space: nowrap;
}

.btn-bookmark {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-lg);
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  color: var(--gray-400);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.btn-bookmark:hover {
  background: white;
  border-color: var(--primary);
  color: var(--primary);
}

.btn-bookmark.saved {
  background: var(--primary-light);
  border-color: var(--primary);
  color: var(--primary);
}

.suggestions {
  position: absolute;
  top: calc(100% + 1rem);
  left: 0;
  right: 0;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--gray-100);
  overflow: hidden;
  z-index: 1000;
}

.suggestion-item {
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  cursor: pointer;
  transition: var(--transition);
}

.suggestion-item:hover {
  background: var(--primary-light);
}

.suggestion-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  transition: var(--transition);
}

.suggestion-item:hover .suggestion-icon {
  background: white;
  transform: scale(1.1);
}

.suggestion-text {
  display: flex;
  flex-direction: column;
}

.suggestion-name {
  font-weight: 700;
  color: var(--gray-900);
}

.suggestion-meta {
  font-size: 0.8125rem;
  color: var(--gray-500);
}

.animate-scale-in {
  opacity: 0;
  transform: scale(0.95);
  animation: scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes scaleIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .search-box {
    padding: 1rem;
    border-radius: var(--radius-lg);
  }

  .search-input {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .search-input > i {
    top: 1.1rem;
  }

  .search-input input {
    padding-left: 3rem;
    width: 100%;
  }

  .search-actions {
    width: 100%;
    margin-top: 0.25rem;
    display: flex;
    gap: 0.5rem;
  }

  .btn-bookmark {
    width: 56px;
    flex-shrink: 0;
  }

  .btn-detect {
    flex: 1;
    min-width: auto;
    width: auto;
  }
}
</style>
