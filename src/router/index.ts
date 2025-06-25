import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import EventView from '../views/EventView.vue'
import CreateAccountView from '@/views/CreateAccountView.vue'
import BountyView from '@/views/BountyView.vue'
// import ProfilePage from '../views/ProfilePage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/bounty',
      name: 'bounty',
      component: BountyView
    },
    {
      path: '/events',
      name: 'events',
      component: EventView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: "/create-account",
      name: "create-account",
      component: CreateAccountView
    }
    // {
    //   path: "/profile",
    //   name: "profile",
    //   component: ProfilePage
    // }
  ]
})

export default router
