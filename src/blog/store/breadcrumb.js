/**
 * 内容
 * @author Philip
 */

import { observable, action, computed } from 'mobx'

const RoutesMap = {
    '/content-list': '内容列表',
    '/hack': '黑客',
    '/user': '用户'
}

class Breadcrumb {
    // 利用
    @observable currentNavPath = ''

    /**
     * 获取当前路由的名称
     * @Action
     */
    @computed get currentNavName () {
        return RoutesMap[this.currentNavPath]
    }

    /**
     * 当前路由 key
     * @Action
     */
    @computed get currentNavKey () {
        return this.currentNavPath.replace('/', '')
    }

    /**
     * 更新当前导航Key
     * @Action
     */
    @action updateCurrentNavPath (currentNavPath) {
        this.currentNavPath = currentNavPath
    }
}

export default new Breadcrumb()
