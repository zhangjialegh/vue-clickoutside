import Vue from 'vue';
const isServer = Vue.prototype.$isServer;
const ctx = '^HandleOutSideContext$';
const on = (function() {
  if (!isServer && document.addEventListener) {
    return function(dom, event, handler) {
      if (dom && event && handler) {
        dom.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(dom, event, handler) {
      if (dom && event && handler) {
        dom.attachEvent('on' + event, handler);
      }
    };
  }
})();

let mouseDownHandleEvent;
let contextId = 0;
const nodeList = [];


!Vue.prototype.$isServer && on(document, 'mousedown', e => (mouseDownHandleEvent = e));

!Vue.prototype.$isServer && on(document, 'mouseup', e => {
  nodeList.forEach(node => node[ctx].documentHandler(e, mouseDownHandleEvent));
});

function createDocumentHandler(el, binding, vnode) {
  return function(mouseupEvent = {}, mousedownEvent = {}) {
    if (!vnode ||
      !vnode.context ||
      !mouseupEvent.target ||
      !mousedownEvent.target ||
      el.contains(mouseupEvent.target) ||
      el.contains(mousedownEvent.target) ||
      el === mouseupEvent.target) return;

    if (binding.expression &&
      el[ctx].handleFunction &&
      vnode.context[el[ctx].handleFunction]) {
      vnode.context[el[ctx].handleFunction]();
    } else {
      el[ctx].bindingFn && el[ctx].bindingFn();
    }
  };
}

/**
 * v-handleoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-handleoutside="handleClose">
 * ```
 */
export default {
  bind(el, binding, vnode) {
    nodeList.push(el);
    const id = contextId++;
    el[ctx] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      handleFunction: binding.expression,
      bindingFn: binding.value
    };
  },

  update(el, binding, vnode) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);
    el[ctx].handleFunction = binding.expression;
    el[ctx].bindingFn = binding.value;
  },

  unbind(el) {
    let len = nodeList.length;

    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
    delete el[ctx];
  }
};
