import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import EscapeRoomView from '../views/EscapeRoomView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/imprint_data',
      name: 'imprint_data',
      component: () => import('../views/ImprintDataPrivacy.vue')
    },
    {
      path: '/room/:roomId',
      name: 'room',
      component: EscapeRoomView
    },
    
  ]
})

export default router
