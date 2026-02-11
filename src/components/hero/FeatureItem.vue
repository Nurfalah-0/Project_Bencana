<template>
  <div class="feature animate-fade-in" :style="{ 'animation-delay': delay }">
    <div class="feature-icon">
      <i :class="icon"></i>
    </div>
    <div class="feature-text">
      <h4>{{ title }}</h4>
      <p>{{ description }}</p>
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
  padding: 1.75rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--gray-100);
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  text-align: left;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}

.feature:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-light);
}

.feature-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--primary-light);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.feature-text h4 {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
  color: var(--gray-900);
}

.feature-text p {
  font-size: 0.875rem;
  color: var(--gray-600);
  line-height: 1.5;
  margin: 0;
}

.animate-fade-in {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
