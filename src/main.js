import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VeeValidate, { Validator } from 'vee-validate';
import dictionary from './locales/validations';
import BootstrapVue from 'bootstrap-vue'
import ElementUI from 'element-ui'

import './scss/common.scss'

Vue.use(BootstrapVue)
Vue.use(ElementUI)
Vue.use(VeeValidate, {
  fieldsBagName: 'veeFields'
})
Validator.localize(dictionary)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
