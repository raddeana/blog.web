/**
 * 主入口文件
 * @author Philip
 */

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import './scss/index.scss'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
