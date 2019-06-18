import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import ElementUI from 'element-ui'

Vue.use(BootstrapVue)
Vue.use(ElementUI)

import './scss/common.scss'

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
