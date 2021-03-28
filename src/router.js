/**
 * 路由
 * @author Chenxiangyu
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/components/layout.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: '/',
        component: Layout,
        name: 'layout',
        children: [{
            path: '',
            name: 'articles',
            component: () => import(/* webpackChunkName: "articles" */ './views/articles.vue')
        }]
    }, {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ './views/login.vue')
    }]
})

export default router