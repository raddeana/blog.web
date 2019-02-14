/**
 * 通用的配置，例如顶部的配置跟地址菜单
 * @author Philip
 */

import * as types from '../types';


const state = {
    ARTICLE_STATE_VIEW: false,
    ARTICLE_STATE_EDIT: false
};

const getters = {
};

const actions = {
    /*
    * 查看文章
    **/
    viewArticle ({ commit }) {
        commit(types.ARTICLE_STATE_VIEW, true);
        commit(types.ARTICLE_STATE_EDIT, false);
    },

    /*
     * 编辑文章
     **/
    editArticle ({ commit }){
        commit(types.ARTICLE_STATE_VIEW, false);
        commit(types.ARTICLE_STATE_EDIT, true);
    }
}

const mutations = {
    [types.ARTICLE_STATE_VIEW] (state, data) {
        state.ARTICLE_STATE_VIEW = data;
    },
    [types.ARTICLE_STATE_EDIT] (state, data) {
        state.ARTICLE_STATE_EDIT = data;
    }  
};


export default {
    state,
    getters,
    actions,
    mutations
}