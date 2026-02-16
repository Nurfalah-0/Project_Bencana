<template>
  <div class="page-container">
    <div class="container">
      <div class="page-header animate-reveal">
        <div class="page-badge">
          <i class="fas fa-code"></i>
          <span>DEVELOPMENT TEAM</span>
        </div>
        <h1 class="page-title">Tim <span class="highlight">Pengembang</span></h1>
        <p class="page-desc">
          Para talenta di balik layar yang membangun sistem peringatan dini banjir untuk masa depan
          yang lebih aman.
        </p>
      </div>

      <div class="team-grid">
        <div
          v-for="(member, index) in teamMembers"
          :key="index"
          class="team-card animate-reveal"
          :style="{ 'animation-delay': index * 0.1 + 's' }"
        >
          <div class="member-image">
            <div class="placeholder-avatar">
              <i class="fas fa-user-astronaut"></i>
            </div>
          </div>
          <div class="member-info">
            <h3>{{ member.name }}</h3>
            <span class="role">{{ member.role }}</span>
            <div class="member-socials">
              <a href="#"><i class="fab fa-github"></i></a>
              <a href="#"><i class="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const teamMembers = [
  { name: 'Muhammad Iqbal Nurfalah', role: 'Frontend Developer' },
  { name: 'Muhammad Ikhsan Mujianto', role: 'Backend Developer' },
  { name: 'Andri Prayitno', role: 'Social Marketing' },
  { name: 'Moh. Jakfar Ilham S.Kom', role: 'Data Scientist' }
]
</script>

<style scoped>
.page-container {
  padding: 8rem 0;
}

.page-header {
  text-align: center;
  margin-bottom: 6rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 3rem;
}

.team-card {
  text-align: center;
  background: white;
  padding: 3rem 2rem;
  border-radius: var(--radius-xl);
  border: 1px solid var(--gray-100);
  transition: all 0.4s ease;
}

.team-card:hover {
  transform: translateY(-12px);
  border-color: var(--primary-soft);
  box-shadow: var(--shadow-xl);
}

.member-image {
  width: 120px;
  height: 120px;
  margin: 0 auto 2rem;
  position: relative;
}

.placeholder-avatar {
  width: 100%;
  height: 100%;
  background: var(--gray-50);
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--gray-200);
  border: 1px solid var(--gray-100);
}

.team-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.role {
  display: block;
  color: var(--primary);
  font-weight: 700;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
}

.member-socials {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.member-socials a {
  color: var(--gray-400);
  font-size: 1.125rem;
  transition: color 0.3s ease;
}

.member-socials a:hover {
  color: var(--primary);
}

.animate-reveal {
  opacity: 0;
  transform: translateY(20px);
  animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
