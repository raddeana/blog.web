/**
 * store
 * @author Philip
 */

import Vuex from 'vuex';
import user from './modules/user';
import tags from './modules/tags';

export default new Vuex.Store({
    modules: {
        user,
        tags
    }
})