import {throttle, debounce} from './throttle';
import tools from './tools';

module.exports.throttle = throttle;
module.exports.debounce = debounce;
module.exports.tools = tools;

window.common = {
    throttle: throttle,
    debounce: debounce,
    tools: tools
};