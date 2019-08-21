<template>
<div class="dargFile">
    <div class="dargImg">
        <div class="img" v-if="imgs">
            <ul>
                <li class="img-slide" v-for="(item,index) in imgs" :key="`img-slide-${index}`">
                    <div class="img-tags">
                        <a href="javascript:void(0)">
                            <img :src="item.url">
                            <div class="text-inner">
                                <div class="inner">{{item.name}}</div>
                            </div>
                            <div class="tags">
                                <div class="label-holder">
                                    <label class="no-margin">
                                        <input type="checkbox" :value="item.name" v-model="checkedNames">
                                    </label>
                                </div>
                                <div class="label-holder">
                                    <el-button @click="deleteCurrent(item.id)" icon="el-icon-close"></el-button>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="img-file">
                        <el-collapse v-model="activeNames">
                            <el-collapse-item v-for="obj in enclosureList" :key="obj.key" :title="obj.title">
                                <el-form ref="form" :model="item" :label-width="resizeWidth >= 768 ? '100px' : ''">
                                    <el-form-item label="附件類型">
                                        <el-select v-model="item.imgTyp">
                                            <el-option value="38" label="圖片"></el-option>
                                            <el-option value="37" label="文件"></el-option>
                                            <el-option value="39" label="影片"></el-option>
                                            <el-option value="40" label="社交渠道"></el-option>
                                            <el-option value="41" label="其他"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="Title">
                                        <el-input v-model="item.titleEdit"></el-input>
                                    </el-form-item>
                                    <el-form-item label="Summary">
                                        <el-input v-model="item.summaryEdit"></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="uploadArea" @click="handleClick">
        <input type="file" ref="input" multiple accept="accept" @change="handleChange">
        <div class="fileArea">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </div>
    </div>
</div>
</template>

<script>
// cdn
// <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js">
</script>
<script>
import Sortable from 'sortablejs';
export default {
    props: {
        imgList: {
            type: Array,
            default: () => []
        },
        accept: '',
        newLang: {
            type: Array,
            default: () => []
        },
        afferentList: {
            type: Array,
            default: () => []
        },
        presetLang: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            imgs: [],
            imgTyp: '38',
            preset: '',
            checkedNames: [],
            enclosureList: [],
            activeNames: '',
            resizeWidth: window.innerWidth,
        }
    },
    methods: {
        handleClick() {
            this.$refs.input.click()
        },
        handleChange() {
            let files = this.$refs.input.files
            this.uploadFiles(files)
        },
        deleteCurrent(id) {
            // 请求api
            // axios.post('xxx',{id:id}).then(res => {
            //     console.log(res)
            // }).catch(err => {
            //     console.log(err)
            // })
        },
        uploadFiles(file) {
            let formData = new FormData()
            for (let key in file) {
                console.log(key, file[key])
                formData.append(key, file[key])
            }
            // formData.append('file',file)
            console.log(formData)
            // 请求api
            // axios.post('xxxx',formData).then(res => {
            //     console.log(res)
            // }).catch(err => {
            //     console.log(err)
            // })
        },
        onSubmit() {

        }
    },
    mounted() {
        window.onresize = () => {
            this.resizeWidth = window.innerWidth
        }
        let element = document.querySelector('.uploadArea')
        element.addEventListener('dragenter', (event) => {
            event.preventDefault()
        })
        element.addEventListener('dragover', (event) => {
            event.preventDefault()
        })
        element.addEventListener('drop', (event) => {
            event.stopPropagation()
            event.preventDefault()
            let files = event.dataTransfer.files
            this.uploadFiles(files)
        })

        let $ul = document.querySelector('.dargImg ul')
        let _this = this
        new Sortable($ul, {
            animation: 150,
            swapThreshold: 0.5,
            onUpdate(event) {
                let newIndex = event.newIndex,
                    oldIndex = event.oldIndex,
                    $li = $ul.children[newIndex],
                    $oldLi = $ul.children[oldIndex]
                // 先删除移动的的节点
                $ul.removeChild($li)
                // 再插入移动的节点到原有节点，还原了移动的操作
                if (newIndex > oldIndex)
                    $ul.insertBefore($li, $oldLi)
                else
                    $ul.insertBefore($li, $oldLi.nextSibling)
                // 更新items数组
                let item = _this.imgs.splice(oldIndex, 1)
                _this.imgs.splice(newIndex, 0, item[0])
            },
            onStart(event) {
                console.log(event)
            },
            onEnd(event) {
                console.log(event.newDraggableIndex)
                console.log(event.to)
                console.log(event.from)
            }
        })
    },
    computed: {
        language() {
            let lang = []
            this.newLang.map(item => {
                lang.push({
                    disabled: false,
                    ...item
                })
            })
            lang.splice(0, 1)
            return lang
        }
    },
    created() {},
    watch: {
        imgList: {
            handler(n) {
                this.imgs = n
            },
            immediate: true,
            deep: true
        },
        checkedNames: {
            handler(n) {
                this.$emit('checked', n)
            },
            deep: true
        },
        afferentList: {
            handler(n) {
                this.checkedNames = n
            },
            deep: true,
            immediate: true
        },
        presetLang: {
            handler(n) {
                this.preset = n ? n : 'zh_TW'
            },
            immediate: true
        }
    }
}
</script>
