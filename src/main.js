import Vue from 'vue'
import App from './App'
import SvgIcon from '@/components/mySvg' // svg组件
import store from '@/store/index'

// 注册到全局
Vue.component('my-svg', SvgIcon)
// 全局引入SVG图标（/assets/icons）
const reqc = require.context('./assets/icons', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(reqc);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
