import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import echarts from "echarts";
// import '../public/lib/gdmap.js';
Vue.prototype.$echarts = echarts;
Vue.prototype.$AMAP = (window as any).AMap;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
