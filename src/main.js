import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import ElementUI from 'element-ui'

import './scss/common.scss'

Vue.use(BootstrapVue)
Vue.use(ElementUI)

Vue.config.productionTip = false
const vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

export default vm