import { createRouter, createWebHistory } from 'vue-router'
import HeroSection from '@/views/HeroSection.vue'

const routes = [
  { path: '/',         name: 'home',     component: HeroSection },
  { path: '/projects', name: 'projects', component: () => import('@/views/ProjectsSection.vue') },
  { path: '/about',    name: 'about',    component: () => import('@/views/AboutSection.vue') },
  // Catch-all redirect (quan trọng cho GitHub Pages)
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  // import.meta.env.BASE_URL tự lấy từ vite.config base
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
