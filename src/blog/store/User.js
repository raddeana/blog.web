/**
 * 用户
 * @author Philip
 */

import { observable, action } from 'mobx';

export default class User {
   // 利用
  @observable user = []
  @observable bear = [] 

  /**
   * 更新用户
   * @Action
   */
  @action updateUser (user) {
      this.user = user
  }

  /**
   * 更新bear
   * @Action
   */
  @action updateBear (bear) {
      this.bear = bear
  }
}

export default new User()