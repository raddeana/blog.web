/**
 * 应用
 * @author Philip
 */
import Vue from 'vue'
import Element from 'element-ui'
import App from './app.vue'
import router from './router'
import store from './store'

import '../../theme/index.css'
import '../scss/app.scss'

Vue.use(Element)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
