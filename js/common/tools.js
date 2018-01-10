/**
 * 工具类
 * @author Philip
 */

// 正则表达式
const regExps = {
  'number': /^((-?((0\.)|([1-9][0-9]*\.))(([0-9]*[1-9]{1})|(0{1,2})))|(-?[1-9][0-9]*))$/,
  '+number': /^(((-((0\.)|([1-9][0-9]*\.))(([0-9]*[1-9]{1})|(0{1,2}))))|(-[1-9][0-9]*))$/,
  '-number': /^-?[1-9][0-9]*$/,
  'int': /^[1-9][0-9]*$/,
  '+int': /^[1-9][0-9]*$/,
  '-int': /^-[1-9][0-9]*$/,
  'float': /^(-?((0\.)|([1-9][0-9]*\.)))(([0-9]*[1-9]{1})|(0{1,2}))$/,
  '+float': /^((0\.)|([1-9][0-9]*\.))(([0-9]*[1-9]{1})|(0{1,2}))$/,
  '-float': /^(-(((0\.)|([1-9][0-9]*\.))))(([0-9]*[1-9]{1})|(0{1,2}))$/,
  'ip': /^(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])$/,
  'email': /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]{2,5}$/,
  'phone': /^(\d{3,4}-)?\d{7,8}$/,
  'mobile': /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
  'phone|mobile': /(^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$|^(\d{3,4}-)?\d{7,8}$)/,
  'name': /^([\u4e00-\u9fa5]|[a-zA-Z])((([\u4e00-\u9fa5]|[a-zA-Z])*[\.]{0,1}([\u4e00-\u9fa5]|[a-zA-Z]))*)$/,
  'money': /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/,
  'url': /^(http:\/\/)?(\w+\.){1,3}(((com|org|net|mil|edu|gov)(\.(uk|jp|cn|hk))?)|ca|io|cc|in|au|co\.cc|co\.in|uk|jp|cn|hk)((\/|\?)[\w-\/?%&=]*)?$/,
  'postcode': /^[1-9][0-9]{5}$/
};

/*
 * 校验
 * @param { string } 校验类型
 * @param { value } 校验值
 * @return { boolean } 校验结果
 */
module.exports.valid = function(type, val) {
    var reg = regExp[type];

    if(reg) {
        return reg.test;
    } else {
        throw('regexp 不存在');
    }
};

/*
 * 生成uuid
 * @return { string } 生成的uuid
 */
module.exports.uuid = function () {
    var s = [];
    var hexDigits = "0123456789abcdef";

    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }

    s[14] = "4";                                        // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);   // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
};

module.exports.removeElement = function (_element){
    var _parentElement = _element.parentNode;
    
    if(_parentElement){
        _parentElement.removeChild(_element);  
    }
};
