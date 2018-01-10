/**
 * 全局下拉菜单
 * @author Philip
 */

/**
 * 获取元素距左侧距离  
 * @param { element } 元素
 * return { number } 元素在页面上的绝对left
 */
let getElementLeft = function (element){
    let actualLeft = element.offsetLeft;
    let current = element.offsetParent;

    while (current !== null){
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }

    return actualLeft;
};

/**
 * 获取元素距顶部距离 
 * @param { element } 元素
 * return { number } 元素在页面上的绝对top
 */
let getElementTop = function (element){
    let actualTop = element.offsetTop;
    let current = element.offsetParent;
    
    while (current !== null){
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }

    return actualTop;
};

/**
 * 全局下拉菜单
 * @constructor 
 * 菜单项：{
 *     text: 'sth',
 *     click: function () {}
 * }
 */
let Menu = function () {
    this.menu = document.createElement('div');
    this.menu.className = 'ui-menu';
    this.menu.style.display = 'none';
    
    this.menucontainer = document.createElement('ul');
    this.menu.appendChild(this.menucontainer);

    this.active = false;

    document.body.appendChild(this.menu);
};

/**
 * 设置 
 * @param { array } 菜单项
 * return none
 */
Menu.prototype.set = function (items) {
    this.items = items;
    this.draw();
};

/**
 * 打开关闭
 * @param { event } 触发的event
 * @param { event } 绑定的元素
 * @param { array } 菜单项 
 * return none
 */
Menu.prototype.toggle = function (event, ele, items) {
    if (this.active) {
        this.close();
    } else {
        this.open(event, ele, items);
    }
};

/**
 * 弹出菜单
 * @param { event } 触发的event
 * @param { event } 绑定的元素
 * @param { array } 菜单项 
 * return none
 */
Menu.prototype.open = function (event, ele, items) {
    this.set(items);
    this.menu.style.display = 'block';

    let eleHeight = ele.offsetHeight;
    let eleWidth = ele.offsetWidth;

    let menuHeight = this.menu.offsetHeight;
    let menuWidth = this.menu.offsetWidth;

    let top = getElementTop(ele);
    let left = getElementLeft(ele);

    let portHeight = document.body.clientHeight;
    let portWidth = document.body.clientWidth;

    let _top = top + eleHeight + 12;
    let _left = left + eleWidth;

    let className = 'ui-menu';

    if (_top + menuHeight > portHeight) {
        _top = _top - menuHeight - 24;
        className += ' top';
    } else {
        className += ' bottom';
    }

    if (_left + menuWidth > portWidth) {
        _left = _left - menuWidth;
        className += ' left';
    } else {
        className += ' right';
    }

    this.menu.className = className;

    this.menu.style.left = _left + 'px';
    this.menu.style.top = _top + 'px';
    this.menu.style.opacity = 1;

    this.active = true;
};

/**
 * 绘制 
 * return none
 */
Menu.prototype.draw = function () {
    let items = this.items;

    this.menucontainer.innerHTML = '';

    for (let i = 0, len = items.length; i < len; i ++) {
        let item = items[i];
        let _item = document.createElement('li');

        _item.className = 'ui-menu-item';
        _item.innerHTML = item.text;

        _item.addEventListener('click', function () {
            menu.close();

            if (item.click && typeof item.click === 'function') {
                item.click();
            }
        });

        this.menucontainer.appendChild(_item);
    }
};

/**
 * 关闭菜单 
 * return none
 */
Menu.prototype.close = function () {
    this.menu.style.display = 'none';
    this.menu.style.opacity = 0;

    this.active = false;
};

let menu = null;
let menuMap = {};

/*
 * 添加一个menu
 * @params { document } 触发元素
 * @params { string } 触发事件
 * @params { boolean } 是否阻止原生事件
 * @params { arr } 菜单项
 * @return none
 */
module.exports.add = function (element, event, prevent, items) {
    if(!menu) {
        menu = new Menu();
    }

    element.addEventListener(event, function (e) {
        if(prevent) {
            e.preventDefault();
        }

        e.stopPropagation();

        menu.toggle(e, element, items);
    });

    document.addEventListener('click', function () {
        menu.close();
    });
};
