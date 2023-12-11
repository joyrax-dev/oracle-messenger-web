import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import RoleView from '@/views/RoleView.vue'
import AboutView from '@/views/AboutView.vue'

const routes = [
    {
        path: '/',
        name: 'HOME',
        component: HomeView
    },
    {
        path: '/login',
        name: 'LOGIN',
        component: LoginView
    },
    {
        path: '/register',
        name: 'REGISTER',
        component: RegisterView
    },
    {
        path: '/role',
        name: 'ROLE',
        component: RoleView
    },
    {
        path: '/about',
        name: 'ABOUT',
        component: AboutView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
