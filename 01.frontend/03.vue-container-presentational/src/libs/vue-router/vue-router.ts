import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { UserListPage } from '@/views/pages/user/'


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: UserListPage,
        meta: {
            requierdAuth: true,
        }
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})