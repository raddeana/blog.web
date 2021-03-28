export default {
    state: {
        data: []
    },
    mutations: {
        /**
         * 更新标签
         * @EventHandler
         */
        updateTags (state, tags) {
            state.data = tags;
        },

        /**
         * 关闭所有
         * @EventHandler
         */
        closeAll (state) {
            state.data = [];
        }
    }
}