<template>
  <div class="feature animate-fade-in" :style="{ 'animation-delay': delay }">
    <div class="feature-icon-wrapper">
      <i :class="icon"></i>
    </div>
    <div class="feature-content">
      <h4 class="feature-title">{{ title }}</h4>
      <p class="feature-desc">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  title: String,
  description: String,
  delay: String
})
</script>

<style scoped>
.feature {
  background: white;
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--gray-100);
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  text-align: left;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
}

.feature::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--primary-soft) 0%, transparent 50%);
  opacity: 0;
  transition: var(--transition-fast);
}

.feature:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 30px 60px -12px hsla(var(--primary-h), var(--primary-s), 50%, 0.15);
  border-color: var(--primary-soft);
  background: white;
}

.feature:hover::before {
  opacity: 1;
  background: linear-gradient(135deg, var(--primary-soft) 0%, transparent 100%);
}

.feature-icon-wrapper {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: var(--primary-soft);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  z-index: 1;
}

.feature:hover .feature-icon-wrapper {
  background: var(--primary);
  color: white;
  transform: scale(1.15) rotate(12deg);
  box-shadow: 0 10px 20px -5px var(--primary-soft);
}

.feature:hover .feature-icon-wrapper i {
  color: white !important;
}

.feature-content {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  position: relative;
  z-index: 1;
}

.feature-title {
  font-size: 1.0625rem;
  font-weight: 800;
  color: var(--gray-900);
  margin: 0;
  transition: color 0.3s ease;
}

.feature:hover .feature-title {
  color: var(--primary);
}

.feature-desc {
  font-size: 0.875rem;
  color: var(--gray-500);
  line-height: 1.6;
  margin: 0;
  font-weight: 500;
  transition: color 0.3s ease;
}

.feature:hover .feature-desc {
  color: var(--gray-600);
}

@media (max-width: 640px) {
  .feature {
    padding: 1.25rem;
  }

  .feature-icon-wrapper {
    width: 44px;
    height: 44px;
    font-size: 1.125rem;
  }

  .feature-title {
    font-size: 1rem;
  }
}
</style>
