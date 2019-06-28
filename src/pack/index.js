import WForm from './home'
import DargFile from './DargFile'
import WCkeditor from './WCkeditor'

const components = [
    WForm, DargFile, WCkeditor
]

export function install(Vue) {
    if (install.installed) return
    install.installed = true
    components.forEach(component => {
        Vue.component(component.name, component)
    })
}

// Create module definition for Vue.use()
const plugin = {
    install
}

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue
}
if (GlobalVue) {
    GlobalVue.use(plugin)
}

// To allow use as module (npm/webpack/etc.) export component
export default {
    WForm, DargFile, WCkeditor
}