/**
 * 注册
 * @author Philip
 */

import fireworks from './../common/fireworks.js'

let form = $('#form');
let username = $('#username');
let password = $('#password');
let button = $('#submit');

let validUsername = function(val) {
    if(val) {
        return true
    } else {
        username.addClass('error');
        return false;
    }
};

let validPassword = function(val) {
    if(val) {
        return true
    } else {
        password.addClass('error');
        return false;
    }
};

let validRepeat = function(val) {
    if(val) {
        return true
    } else {
        repeat.addClass('error');
        return false;
    }
};    

username.focus(function() {
    username.removeClass('error');
});

password.focus(function() {
    password.removeClass('error');
    repeat.removeClass('error');
});

repeat.focus(function() {
    password.removeClass('error');
    repeat.removeClass('error');
});    

form.submit(function(e) {
    var unVal = username.val();
    var psVal = password.val();
    var reVal = repeat.val();

    var isUsernameValid = validUsername(unVal);
    var isPasswordValid = validPassword(psVal);
    var isRepeatValid = validRepeat(reVal);

    if( isUsernameValid && isPasswordValid && isRepeatValid) {
        button.button('loading');

        $.ajax({
            url: '/register',
            type: 'post',
            data: {
                username: unVal,
                password: psVal,
                repeat: reVal
            },
            success: function () {
                button.button('complete');
                location.href = '/home';
            },
            error: function () {
                button.button('reset');
            }
        });
    }

    e.preventDefault();
    return false;
});    

username.focus();

fireworks();