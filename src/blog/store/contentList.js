/**
 * 内容
 * @author Philip
 */

import { observable, action } from 'mobx'

class ContentList {
    // 利用
    @observable pageSize = 10
    @observable pageIndex = 1
    @observable content = []

    /**
    * 更新页面下标
    * @Action
    */
    @action updatePageIndex (pageIndex) {
        this.pageIndex = pageIndex
    }

    /**
    * 更新内容列表
    * @Action
    */
    @action fetchContentList (content) {
        this.content = content
    }
}

export default new ContentList()
