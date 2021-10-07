/**
 * 微应用相关函数（注册等）
 * @author Chen Xiangyu
 */
import { registerMicroApps, start } from 'qiankun';

export function register () {
    registerMicroApps([{
        name: 'voyage', // app name registered
        entry: '//localhost:8081/',
        container: '#micro-app',
        activeRule: '/voyage',
    }]);
    
    start();
}