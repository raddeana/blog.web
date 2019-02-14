/**
 * 路由
 * @author Philip
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './app.vue'

import list from './views/list.vue'
import create from './views/create.vue'
import article from './views/article.vue'

const routes = [{
    path: '/articles',
    name: 'articles-list',
    component: list
}, {
    path: '/articles/:id(\\d+)',
    name: 'article',
    component: article
}];

if (isBlogger) {
    routes.push({
        path: '/articles/create',
        name: 'create',
        component: create
    });
}

const router = new VueRouter({
    routes: routes,
    linkActiveClass: 'active',
    mode: 'history'
});

export default router;