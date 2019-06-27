import WForm from './home'

/* istanbul ignore next */
WForm.install = function(Vue) {
    Vue.component(WForm.name,WForm)
}

export default WForm