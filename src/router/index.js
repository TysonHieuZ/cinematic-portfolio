import { createRouter, createWebHistory } from 'vue-router'
import HeroSection from '@/views/HeroSection.vue'

const routes = [
  { path: '/',         name: 'home',     component: HeroSection },
  { path: '/projects', name: 'projects', component: () => import('@/views/ProjectsSection.vue') },
  { path: '/about',    name: 'about',    component: () => import('@/views/AboutSection.vue') },
  { path: '/contact',  name: 'contact',  component: () => import('@/views/ContactSection.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
