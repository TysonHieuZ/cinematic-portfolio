<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useCinematicScroll } from '@/composables/useCinematicScroll'
import ProjectCard from '@/components/projects/ProjectCard.vue'

const router = useRouter()
const { animateProjectCardReveal } = useCinematicScroll()
const cardRefs = ref([])

const projects = [
  // ── Professional ──────────────────────────────────────────────────
  {
    title: 'AiHR — Phần mềm Nhân sự',
    category: 'Web Application · Professional',
    year: '2026',
    description:
      'Hệ thống quản lý nhân sự toàn diện cho doanh nghiệp Việt Nam. Đang phát triển giao diện người dùng tại JobTest Co. với Vue 3, TypeScript và Composition API.',
    tags: ['Vue 3', 'TypeScript', 'Composition API'],
    link: 'https://aihr.vn',
    badge: 'Current',
  },
  {
    title: 'Hospital Management System',
    category: 'Web Application · Internship',
    year: '2025',
    description:
      'Phần mềm quản lý bệnh viện xây dựng trong thời gian thực tập tại Winsoft (10–12/2025). Tập trung vào lớp giao diện người dùng với React.js, HTML và CSS.',
    tags: ['React.js', 'HTML', 'CSS'],
    link: 'https://winsoft.com.vn',
    badge: 'Internship',
  },

  // ── Academic ──────────────────────────────────────────────────────
  {
    title: 'Elixir — Quản lý Bất động sản',
    category: 'Web Application · Academic',
    year: '2024',
    description:
      'Hệ thống quản lý và tìm kiếm bất động sản với giao diện web đầy đủ, tích hợp API bên ngoài. Dự án nhóm thực hiện trong quá trình học.',
    tags: ['HTML', 'CSS', 'JavaScript', 'API'],
    link: 'https://github.com/qtuan0343/Elixir',
    badge: 'Academic',
  },
  {
    title: 'Music Player App',
    category: 'Mobile Application · Academic',
    year: '2024',
    description:
      'Ứng dụng Android nghe nhạc với đầy đủ chức năng: phát nhạc, danh sách phát, tìm kiếm bài hát. Đồ án môn học Android Development.',
    tags: ['Android Studio', 'Java', 'XML'],
    link: 'https://github.com/TysonHieuZ/DoAnAndroid',
    badge: 'Academic',
  },

  // ── Personal ──────────────────────────────────────────────────────
  {
    title: 'Fashion Store',
    category: 'Web Application · Personal',
    year: '2023',
    description:
      'Trang web cửa hàng quần áo với giao diện hiện đại, giỏ hàng và trang sản phẩm. Dự án cá nhân để luyện tập HTML, CSS và JavaScript thuần.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: '',
    badge: 'Personal',
  },
  {
    title: 'Cinema App',
    category: 'Mobile Application · Personal',
    year: '2023',
    description:
      'Ứng dụng di động chiếu phim với danh sách phim, lịch chiếu và đặt vé. Xây dựng bằng Android Studio và Dart trong thời gian tự học.',
    tags: ['Android Studio', 'Dart'],
    link: '',
    badge: 'Personal',
  },
]

function handleNavigateHome() { router.push('/') }

onMounted(() => {
  const cards = cardRefs.value.filter(Boolean)
  cards.forEach((card, index) => {
    animateProjectCardReveal(card, index)
  })
})
</script>

<template>
  <div class="projects-page">
    <nav class="projects-nav" aria-label="Page navigation">
      <button class="projects-nav__back" type="button" @click="handleNavigateHome">
        ← Back
      </button>
      <span class="projects-nav__title">Selected Work</span>
    </nav>

    <main class="projects-main">
      <header class="projects-header">
        <p class="projects-header__eyebrow">
          <span class="projects-header__line" aria-hidden="true" />
          Portfolio · {{ projects.length }} Projects
        </p>
        <h1 class="projects-header__title">Selected<br /><em>Work</em></h1>
      </header>

      <!-- Professional -->
      <div class="projects-group">
        <p class="projects-group__label">Professional &amp; Internship</p>
        <ul class="projects-grid" aria-label="Professional projects">
          <li
            v-for="(project, index) in projects.filter(p => ['Current','Internship'].includes(p.badge))"
            :key="project.title"
            :ref="(el) => { if (el) cardRefs[index] = el }"
          >
            <ProjectCard
              :title="project.title"
              :category="project.category"
              :year="project.year"
              :description="project.description"
              :tags="project.tags"
              :link="project.link"
              :badge="project.badge"
              :index="index"
            />
          </li>
        </ul>
      </div>

      <!-- Academic -->
      <div class="projects-group">
        <p class="projects-group__label">Academic</p>
        <ul class="projects-grid" aria-label="Academic projects">
          <li
            v-for="(project, index) in projects.filter(p => p.badge === 'Academic')"
            :key="project.title"
            :ref="(el) => { if (el) cardRefs[index + 2] = el }"
          >
            <ProjectCard
              :title="project.title"
              :category="project.category"
              :year="project.year"
              :description="project.description"
              :tags="project.tags"
              :link="project.link"
              :badge="project.badge"
              :index="index + 2"
            />
          </li>
        </ul>
      </div>

      <!-- Personal -->
      <div class="projects-group">
        <p class="projects-group__label">Personal</p>
        <ul class="projects-grid" aria-label="Personal projects">
          <li
            v-for="(project, index) in projects.filter(p => p.badge === 'Personal')"
            :key="project.title"
            :ref="(el) => { if (el) cardRefs[index + 4] = el }"
          >
            <ProjectCard
              :title="project.title"
              :category="project.category"
              :year="project.year"
              :description="project.description"
              :tags="project.tags"
              :link="project.link"
              :badge="project.badge"
              :index="index + 4"
            />
          </li>
        </ul>
      </div>

    </main>
  </div>
</template>

<style scoped>
.projects-page {
  min-height: 100vh;
  background: var(--color-bg-base);
  display: flex;
  flex-direction: column;
}

.projects-nav {
  position: sticky;
  top: 0; z-index: 10;
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding: var(--space-5) var(--space-8);
  background: rgba(10, 9, 5, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(107, 94, 72, 0.1);
}
.projects-nav__back {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: var(--color-text-muted);
  background: none; border: none; cursor: pointer;
  transition: color var(--transition-base);
}
.projects-nav__back:hover { color: var(--color-accent); }
.projects-nav__title {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.projects-main {
  flex: 1;
  padding: var(--space-16) var(--space-8) var(--space-20);
  max-width: 960px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
}

.projects-header { }
.projects-header__eyebrow {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: var(--space-4);
}
.projects-header__line {
  display: inline-block;
  width: 2rem; height: 1px;
  background: var(--color-accent);
}
.projects-header__title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 300;
  line-height: 0.95;
  color: var(--color-text-primary);
}
.projects-header__title em {
  font-style: italic;
  color: var(--color-accent);
}

/* Groups */
.projects-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.projects-group__label {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid rgba(107, 94, 72, 0.12);
}

.projects-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

@media (max-width: 640px) {
  .projects-main { padding: var(--space-8) var(--space-4) var(--space-12); }
}
</style>
