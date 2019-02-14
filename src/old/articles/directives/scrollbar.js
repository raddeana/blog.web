import Vue from 'vue'
import Scrollbar from '../../widgets/scrollbar'

export default Vue.directive('scrollbar', {
    bind: function (el, binding, vnode) {
        var scrollbar = new Scrollbar(el);
    }
});