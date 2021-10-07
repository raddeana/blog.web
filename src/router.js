/**
 * 路由
 * @author Chenxiangyu
 */
import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/components/layout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        component: Layout,
        name: 'layout',
        children: [{
            path: '',
            name: 'articles',
            component: () => import(/* webpackChunkName: "articles" */ './views/articles.vue')
        }, {
            path: 'micro-app',
            name: 'micro-app',
            component: () => import(/* webpackChunkName: "micro-app" */ './views/micro-app.vue')
        }]
    }, {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ './views/login.vue')
    }]
})

export default router