/**
 * 登陆
 * @author Philip
 */

import fireworks from '../animations/fireworks.js'

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

let form = $('#form');
let username = $('#username');
let password = $('#password');
let button = $('#submit');

/**
 * 校验用户名
 * @params { string } 用户名
 * @return { boolean } 用户名是否有效
 */
let validUsername = function (val) {
    if(val) {
        return true
    } else {
        username.addClass('error');
        return false;
    }
};

/**
 * 校验用户密码
 * @params { string } 密码
 * @return { boolean } 密码是否有效
 */
let validPassword = function (val) {
    if(val) {
        return true
    } else {
        password.addClass('error');
        return false;
    }
};

username.focus(function () {
    username.removeClass('error');
});

password.focus(function () {
    password.removeClass('error');
});

form.submit(function (e) {
    let unVal = username.val();
    let psVal = password.val();

    let isUsernameValid = validUsername(unVal);
    let isPasswordValid = validPassword(psVal);

    if( isUsernameValid && isPasswordValid ) {
        button.button('loading');

        $.ajax({
            url: '/api/login',
            type: 'post',
            data: {
                username: unVal,
                password: psVal
            },
            success: function() {
                button.button('complete');
                location.href = '/home';
            },
            error: function() {
                button.button('reset');
            }
        });
    }

    e.preventDefault();
    return false;
});

username.focus();

fireworks();