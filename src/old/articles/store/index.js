/**
 * 文章内容
 * @author Philip
 */

import Vue from 'vue';
import Vuex from 'vuex';
import navigation from './modules/navigation';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        navigation
    },
    getters: getters,
    actions: actions,
    mutations: mutations,
    strict: true
});


export default store