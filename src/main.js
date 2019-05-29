import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import ElementUI from 'element-ui'
import CKEditor from '@ckeditor/ckeditor5-vue'
import VueUeditorWrap from 'vue-ueditor-wrap'

Vue.use(BootstrapVue)
Vue.use(ElementUI)
Vue.use(CKEditor)


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.component('vue-ueditor-wrap', VueUeditorWrap)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
