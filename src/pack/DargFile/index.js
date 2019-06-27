import DargFile from './DargFile'

/* istanbul ignore next */
DargFile.install = function (Vue) {
    Vue.component(DargFile.name, DargFile)
}

export default DargFile