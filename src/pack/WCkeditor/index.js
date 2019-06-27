import WCkeditor from './WCkeditor'

/* istanbul ignore next */
WCkeditor.install = function (Vue) {
    Vue.component(WCkeditor.name, WCkeditor)
}

export default WCkeditor