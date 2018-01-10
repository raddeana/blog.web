/**
 * 浮层
 * @author Philip
 */

/** 
 *  width: 300
 *  height: 200
 *  left: 0
 *  top: 0
 *  url: 'www.baidu.com'
 *  content: ''
 *  id: ''
 *  draggable: false
 *  onReady: function () {}
 *  onClose: function () {}
 */

import Draggable from './draggable'

var num = 0;

/**
 * 浮层类
 * @constructor
 * @param {object} 配置项
 */
var Popup = function (options) {
    this.mask = null;
    this.options = options;

    this.init();
};

Popup.prototype = {
    /**
     * 浮层初始化函数
     * @returns none
     */
    init: function () {
        this.wrapper = document.createElement('div');
        this.container = document.createElement('div');

        this.wrapper.className = 'popup-wrapper';
        this.container.className = 'popup-container';

        if(this.options.url) {
            this.iframe = document.createElement('iframe');
            this.iframe.url = this.options.url;
        } else {
            var content;

            if(this.options.id) {
                content = document.getElementById(this.options.id).innerHTML;
            } else {
                content = this.options.content;
            }

            this.container.innerHTML = content;
        }

        if(this.options.onReady && typeof this.options.onReady === 'function') {
            this.options.onReady(this.container);
        }

        new Draggable(this.wrapper);
    },
    /**
     * 打开浮层
     * @returns none
     */    
    open: function () {
        if(!this.mask) {
            this.mask = document.createElement('div');
            this.mask.className = 'popup-mask';
        }

        this.show();
        num++;
    },
    /**
     * 显示浮层
     * @returns none
     */        
    show: function () {
        this.ins.style.display = 'block';
        this.mask.style.display = 'block';
    },
    /**
     * 关闭浮层
     * @returns none
     */     
    close: function () {
        num --;
        this.ins.style.display = 'none';        

        if(num === 0) {
            this.mask.style.display = 'none';
        }
    },
    /**
     * 移除浮层
     * @returns none
     */         
    remove: function () {
        if(this.ins.style.display === 'none') {
            num --;

            if(num === 0) {
                this.mask.style.display = 'none';
            }            
        }

        this.ins.remove();
    }
};

module.exports = Popup;