import menu from '../widgets/menu.js';

var d_nav = document.getElementById('navigation');

var data = [{
    text: '文章',
    click: function () {
        document.location.href = '/articles';
    }
}, {
    text: '服务',
    click: function () {
        document.location.href = '/services';
    }
}, {
    text: '项目',
    click: function () {
        document.location.href = '/projects';
    }
}, {
    text: '个人页面',
    click: function () {
        document.location.href = '/user';
    }
}, {
    text: '航海',
    click: function () {
        document.location.href = '/voyage';
    }
}];

menu.add(d_nav, 'click', false, data);
