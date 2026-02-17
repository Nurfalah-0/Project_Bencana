<template>
  <div class="page-container">
    <div class="container">
      <div class="page-header animate-reveal">
        <div class="page-badge">
          <i class="fas fa-code"></i>
          <span> DEVELOPMENT TEAM</span>
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
            <img v-if="member.image" :src="member.image" :alt="member.name" class="member-photo" />
            <div v-else class="placeholder-avatar" :style="{ background: member.gradient }">
              <span class="initials">{{ getInitials(member.name) }}</span>
            </div>
          </div>
          <div class="member-info">
            <h3>{{ member.name }}</h3>
            <span class="role">{{ member.role }}</span>
            <div class="member-socials">
              <a
                v-if="member.socials.github"
                :href="member.socials.github"
                target="_blank"
                title="GitHub"
              >
                <i class="fab fa-github"></i>
              </a>
              <a
                v-if="member.socials.linkedin"
                :href="member.socials.linkedin"
                target="_blank"
                title="LinkedIn"
              >
                <i class="fab fa-linkedin"></i>
              </a>
              <a
                v-if="member.socials.instagram"
                :href="member.socials.instagram"
                target="_blank"
                title="Instagram"
              >
                <i class="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUIStore } from '@/stores/uiStore'

const uiStore = useUIStore()

onMounted(() => {
  try {
    // Basic verification of team members loading
    if (!teamMembers || teamMembers.length === 0) {
      uiStore.setError('Data tim pengembang tidak ditemukan.', 'TeamView')
    }
  } catch (error) {
    uiStore.setError(error, 'TeamView')
  }
})
const teamMembers = [
  {
    name: 'Muhammad Iqbal Nurfalah',
    role: 'Frontend Developer',
    image: '/team/iqbal.JPG',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    socials: {
      github: 'https://github.com/Nurfalah-0#',
      linkedin: 'https://www.linkedin.com/in/muhammad-iqbal-nurfalah-7b59503a5/',
      instagram: 'https://www.instagram.com/iqbal_noerfalah/'
    }
  },
  {
    name: 'Muhammad Ikhsan Mujianto',
    role: 'Backend Developer',
    image: '/team/iksan.JPG',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    socials: {
      github: 'https://github.com/Naski1',
      linkedin: 'https://linkedin.com/in/ikhsanmujiano',
      instagram: 'https://www.instagram.com/sanz_eror/'
    }
  },
  {
    name: 'Andri Prayitno',
    role: 'Social Marketing',
    image: '/team/andri.png',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    socials: {
      github: '',
      linkedin: 'https://www.linkedin.com/in/andri-prayitno/',
      instagram: 'https://www.instagram.com/andri_prytn/'
    }
  },
  {
    name: "Moh. Ja'far Ilham S.Kom",
    role: 'Leader',
    image: '/team/pakilham.png',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    socials: {
      github: 'https://github.com/Ondisia',
      linkedin: 'https://www.linkedin.com/in/moh-ja-far-ilham-rohmatullah-096398182/',
      instagram: 'https://www.instagram.com/black_domon/'
    }
  }
]

// Function to get initials from name
const getInitials = name => {
  if (!name) return '??'
  return name
    .trim()
    .split(/\s+/)
    .map(word => word[0])
    .filter(char => char)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
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

.member-photo {
  width: 100%;
  height: 100%;
  border-radius: 40px;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: all 0.4s ease;
}

.team-card:hover .member-photo {
  transform: scale(1.05);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
}

.placeholder-avatar {
  width: 100%;
  height: 100%;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  border: 3px solid white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: all 0.4s ease;
}

.team-card:hover .placeholder-avatar {
  transform: scale(1.05);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
}

.initials {
  font-family:
    'Inter',
    system-ui,
    -apple-system,
    sans-serif;
  letter-spacing: 0.05em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
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
