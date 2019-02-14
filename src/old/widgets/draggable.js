/**
 * 元素可拖拽
 * @author Philip
 */

/**
 * 元素拖拽化
 * @constructor 
 * @param { dom } 元素
 * @param { object } 配置项
 */
var Draggable = function (ele, options) {
    this.ele = ele;
    this.options = options;

    this.init();
};

/*
* 初始化
* @return none
*/
Draggable.prototype.init = function () {
    this.ele.className = this.ele.className + ' draggable';
    
    this.startX = 0;
    this.startY = 0;

    this.currX = 0;
    this.currY = 0;

    this.events();
};

/*
* 初始化事件
* @return none
*/
Draggable.prototype.events = function() {
    var self = this;

    this.ele.addEventListener('mousedown', function (e) {
        self.setup(e);
    });
};

/*
* 绑定鼠标移动事件
* @return none
*/
Draggable.prototype.setup = function (e) {
    var self = this;
    var win = window;

    var onMove = function (e) {        
        var x = e.clientX;
        var y = e.clientY;

        var offsetX = x - self.startX;
        var offsetY = y - self.startY;

        if(self.options.onBeforeMove && typeof self.options.onBeforeMove == 'function') {
            var result = self.options.onBeforeMove({x: offsetX, y: offsetY});

            if(!result){
                return;
            } else if(typeof result === 'object') {
                offsetX = result.x;
                offsetY = result.y;
            }
        }    

        self.move(offsetX, offsetY);

        self.currX = offsetX;
        self.currY = offsetY; 

        if(self.options.onMove && typeof self.options.onMove == 'function') {
            self.options.onMove(self.current());
        }                               
    };

    var onDrop = function (e) {
        win.removeEventListener('mousemove', onMove);
        win.removeEventListener('mouseup', onDrop);
        
        if(self.options.onDrop && typeof self.options.onDrop == 'function') {
            self.options.onDrop(self.current());
        }           
    };

    this.startX = e.clientX - this.currX;
    this.startY = e.clientY - this.currY;

    win.addEventListener('mousemove', onMove);
    win.addEventListener('mouseup', onDrop);
};

/*
 * 移动
 * @params { number } 位移值X
 * @params { number } 位移值Y
 * @return none
 */
Draggable.prototype.move = function (x, y) {
    if(!this.options.x) {
        x = 0;
    }
    
    if(!this.options.y) {
        y = 0;
    }

    var ele = this.ele;

    if(this.options.mover) {
        ele = this.options.mover;
    }

    ele.style.transform = 'translate(' + x + 'px, ' + y + 'px) translateZ(0px)';
};

/*
* 获取当前位移
* @return { object } 当前位移的对象
*/
Draggable.prototype.current = function () {
    var curr = {};

    curr.x = this.currX;
    curr.y = this.currY;

    return curr;
};
    
module.exports = Draggable;