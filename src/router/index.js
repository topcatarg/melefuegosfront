import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ChatPage from '../views/ChatPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/restaurant/:restaurantId',
    name: 'Restaurant',
    component: ChatPage,
    props: true
  },
  {
    path: '/chat/:botType',
    name: 'Chat',
    component: ChatPage,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
