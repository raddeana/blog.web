import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        name: 'articles',
        component: () => import(/* webpackChunkName: "articles" */ './views/articles.vue')
    }, {
        path: '/projects',
        name: 'projects',
        component: () => import(/* webpackChunkName: "projects" */ './views/projects.vue')
    }, {
        path: '/events',
        name: 'events',
        component: () => import(/* webpackChunkName: "events" */ './views/events.vue')
    }, {
        path: '/user-center',
        name: 'user-center',
        component: () => import(/* webpackChunkName: "user-center" */ './views/user-center.vue')
    }]
})
