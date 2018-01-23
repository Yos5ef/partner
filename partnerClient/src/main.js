import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import AMap from 'vue-amap';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(AMap);
Vue.use(ElementUI)


AMap.initAMapApiLoader({
  key: '973ff4275eaf1fb1ba1292a967ba116b',
  // plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType']
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})