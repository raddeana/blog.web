/**
 * 滚动条
 * @author Philip
 */

import Draggable from './draggable';
import addEvent from './addEvent';

/**
 * 滚动条类
 * @constructor
 */
var Scrollbar = function (ele) {
    this.ele = ele;
    this.content = ele.childNodes[0];

    this.currY = 0;

    this.active = false;
    this.init();
};

/**
 * 初始化
 * @returns none
 */ 
Scrollbar.prototype.init = function () {
    var self = this;

    this.scrollbar = document.createElement('div');
    this.scrollbar.className = 'scrollbar';

    this.wrapper = document.createElement('div');
    this.wrapper.className = 'scrollbar-wrapper';

    this.wrapper.appendChild(this.scrollbar);
    this.ele.appendChild(this.wrapper);

    this.caculateScrollbarHeight();

    this.initActions();
    this.show();
};

/**
 * 初始化行为
 * @returns none
 */ 
Scrollbar.prototype.initActions = function () {
    var self = this;
    var draggable = null;

    this.time = 0;
    this.timer = null;

    window.onresize = function () {
        self.caculateScrollbarHeight();
    };

    addEvent(this.ele, 'click', function () {
        self.show();
    });

    addEvent(this.ele, 'mousewheel', function (e) {
        self.currY += ( e.delta * 120 + 4 );

        var wrapperHeight = self.ele.offsetHeight;
        var contentHeight = self.content.offsetHeight;

        var ratio = wrapperHeight / contentHeight;
        var maxOffset = wrapperHeight - contentHeight;

        if(maxOffset > 0) {
            return false;
        }

        if(self.currY > 0) {
            self.currY = 0;
        } else if(self.currY < maxOffset) {
            self.currY = maxOffset + 6;
        }     

        self.scrollbar.style.transform = 'translate(0px, ' + - self.currY * ratio + 'px) translateZ(0px)';
        self.content.style.transform = 'translate(0px, ' + self.currY + 'px) translateZ(0px)';

        draggable.currX = 0;
        draggable.currY = self.currY;

        self.show();
    });

    draggable = new Draggable(this.ele, {
        x: false,
        y: true,
        mover: this.content,
        onMove: function (curr) {
            var wrapperHeight = self.ele.offsetHeight;
            var contentHeight = self.content.offsetHeight;

            var ratio = wrapperHeight / contentHeight;

            self.scrollbar.style.transform = 'translate(0px, ' + - ( curr.y ?  ( ( curr.y + 6 ) * ratio ) : 0 ) + 'px) translateZ(0px)';
            self.currY = curr.y;

            self.show();
        },
        onBeforeMove: function (curr) {
            var wrapperHeight = self.ele.offsetHeight;
            var contentHeight = self.content.offsetHeight;
            var maxOffset = wrapperHeight - contentHeight;

            if(maxOffset > 0) {
                return false;
            } else {
                if(curr.y > 0) {
                    return {
                        x: 0,
                        y: 0
                    };
                } else if(curr.y < maxOffset) {
                    return {
                        x: 0,
                        y: maxOffset
                    };
                }else {
                    return true;
                }
            }
        }
    });
};

/**
 * 计算滚动条高度
 * @returns none
 */ 
Scrollbar.prototype.caculateScrollbarHeight = function() {
    var wrapperHeight = this.ele.offsetHeight;
    var contentHeight = this.content.offsetHeight;

    var ratio = wrapperHeight / contentHeight;
    
    if(ratio < 1) {
        this.scrollbar.style.height = ratio * wrapperHeight  + 'px';
        this.active = true;
    } else {
        this.active = false;
        this.scrollbar.style.transform = 'translate(0px, 0px) translateZ(0px)';
        this.content.style.transform = 'translate(0px, 0px) translateZ(0px)';        
    }
};

/**
 * 显示滚动条
 * @returns none
 */ 
Scrollbar.prototype.show = function () {
    if(!this.active) {
        return false;
    }

    var self = this;

    this.wrapper.style.opacity = 1;
    this.time = 0;

    if(!this.timer) {
        this.timer = setInterval(function () {
            if(self.time === 600) {
                self.hide();
            } else {
                self.time += 100;
            }
        }, 100);        
    }
};

/**
 * 隐藏滚动条
 * @returns none
 */ 
Scrollbar.prototype.hide = function () {
    this.wrapper.style.opacity = 0;
    this.time = 0;
    clearInterval(this.timer);

    this.timer = null;
};


module.exports = Scrollbar;