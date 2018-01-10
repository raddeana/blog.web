/**
 * 通用的配置，例如顶部的配置跟地址菜单
 * @author Philip
 */

import * as types from '../types';


const state = {
    ARTICLE_EDIT: false,
    ARTICLE_DELETE: false,
    ARTICLE_BACK: false,
    FORM_DATA: {}
};

const getters = {
};

const actions = {
    /*
    * 激活导航移除按钮显示隐藏
    **/
    activeArticleRemove ({ commit }) {
        commit(types.ARTICLE_DELETE, true);
    },

    /*
     * 激活文章可编辑按钮显示隐藏
     **/
    activeArticleEdit ({ commit }){
        commit(types.ARTICLE_EDIT, true);
    },

    /*
     * 激活后退功能显示隐藏
     **/
    activeArticleBack ({ commit }){
        commit(types.ARTICLE_BACK, true);
    },

    /*
    * 禁用导航移除按钮显示隐藏
    **/
    disabledArticleRemove ({ commit }) {
        commit(types.ARTICLE_DELETE, false);
    },

    /*
     * 禁用文章可编辑按钮显示隐藏
     **/
    disabledArticleEdit ({ commit }){
        commit(types.ARTICLE_EDIT, false);
    },

    /*
     * 禁用后退功能显示隐藏
     **/
    disabledArticleBack ({ commit }){
        commit(types.ARTICLE_BACK, false);
    },
}

const mutations = {
    [types.ARTICLE_EDIT] (state, data) {
        state.ARTICLE_EDIT = data;
    },
    [types.ARTICLE_DELETE] (state, data) {
        state.ARTICLE_DELETE = data;
    },
    [types.ARTICLE_BACK] (state, data) {
        state.ARTICLE_BACK = data;
    }    
};


export default {
    state,
    getters,
    actions,
    mutations
}