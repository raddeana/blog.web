/**
 * 文章
 * @author Philip
 */
import Vue from 'vue';
import VueRouter from "vue-router";

import App from './app.vue';
import router from './router';
import store from './store';
import scrollbar from './directives/scrollbar';

Vue.use(VueRouter);

Vue.config.debug = true;

let model = {
    router,
    store,
    render: h => h(App)
};

const app = new Vue(model).$mount('app');
