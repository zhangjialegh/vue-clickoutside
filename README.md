# vue-v-clickoutside

> A simple click-outside directive for Vue.js

[![NPM](https://nodei.co/npm/vue-v-clickoutside.png?compact=true)](https://nodei.co/npm/vue-v-clickoutside/)

# Installation
```
npm i vue-v-clickoutside

or

yarn add vue-v-clickoutside
```
# Usage



```javascript

/*全局引入*/

import ClickOutSide from 'vue-v-clickoutside'
Vue.directive('clickoutside', ClickOutSide)


/*局部引入*/

import ClickOutSide from 'vue-v-clickoutside'
export default {
  ...
  directives: {
    'clickoutside': ClickOutSide
  }
  ...
}

```




