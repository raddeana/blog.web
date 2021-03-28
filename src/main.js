/**
 * 主入口文件
 * @author Philip
 */

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { installRequiredEleCom } from './element-ui'

import './scss/index.scss'

const app = createApp(App)

app.use(store)
app.use(router)

// 安装需要引入的 element 组件
installRequiredEleCom(app)

app.mount('#app')
