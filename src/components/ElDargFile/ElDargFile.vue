<template>
<div class="dargFile">
    <div class="dargImg">
        <div class="img" v-if="imgs">
            <ul>
                <!-- <li class="img-slide" v-for="(item,index) in imgs" :key="`img-slide-${index}`">{{item.text}}</li> -->
                <li class="img-slide" v-for="(item,index) in imgs" :key="`img-slide-${index}`">
                    <a href="javascript:void(0)">
                        <img :src="item.url">
                        <div class="text-inner">
                            <div class="inner">{{item.name}}</div>
                        </div>
                    </a>
                    <div class="tags">
                        <div class="label-holder">
                            <label class="no-margin">
                                <input type="checkbox" :value="item.name" v-model="checkedNames">
                            </label>
                        </div>
                        <div class="label-holder">
                            <el-button @click="deleteCurrent(index)" icon="el-icon-close"></el-button>
                        </div>
                    </div>
                    <div class="tools-top">
                        <el-button @click="handleModal"><i class="el-icon-edit"></i>編輯</el-button>
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
    <el-dialog class="file-modal" :visible.sync="imgModal" title="編輯">
        <el-form label-width="100px">
            <el-row>
                <el-col :span="24">
                    <el-form-item>
                        <template slot="label">
                            <label><span class="mandatory">*</span>附件類型</label>
                        </template>
                        <el-select v-model="imgTyp">
                            <el-option value="38" label="圖片"></el-option>
                            <el-option value="37" label="文件"></el-option>
                            <el-option value="39" label="影片"></el-option>
                            <el-option value="40" label="社交渠道"></el-option>
                            <el-option value="41" label="其他"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="文件">
                        <label class="ace-file-input">
                            <input type="file" class="modalFile" ref="modalFile" @change="handleModalChange" accept="application/pdf,application/octet-stream,image/png,image/jpeg,image/pjpeg,image/gif,image/bmp,text/plain,text/srt,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,video/3gpp2,video/mp4,audio/mpeg,audio/mp3,video/mp3,video/3gpp,video/mp4v-es,video/x-ms-asf,video/x-ms-wmv,video/mng,video/x-mng,video/x-ms-wma,application/x-gzip,application/xml,text/xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
                            <span class="ace-file-container" :data-title="fileText">
                                <span class="ace-file-name" :data-title="fileBrowse">
                                    <i class="el-icon-upload"></i>
                                </span>
                            </span>
                            <a href="javascript:void(0)" v-if="isUpload" class="remove" @click="removeFile">
                                <i class="el-icon-close"></i>
                            </a>
                        </label>
                        <div class="help-block" v-if="isUpload">
                            <a href="" target="_blank">查看文件</a>
                        </div>
                        <p class="text-primary">
                            允許上傳pdf,octet-stream,png,jpeg,pjpeg,gif,bmp,plain,srt,vnd.openxmlformats-officedocument.spreadsheetml.sheet,vnd.ms-excel,3gpp2,mp4,mpeg,mp3,mp3,3gpp,mp4v-es,x-ms-asf,x-ms-wmv,mng,x-mng,x-ms-wma,x-gzip,xml,xml,msword,vnd.openxmlformats-officedocument.wordprocessingml.document的文件，文件大小限制100M
                        </p>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item>
                        <div class="language-content">
                            <div class="lang-list">
                                <ul class="language">
                                    <li v-for="(item,index) in language" :key="`lang-list-${index}`" @click="handleChangeLang(item)" :class="[item.active? 'lang-active':'']">{{item.text}}</li>
                                </ul>
                            </div>
                            <!-- <div class="content-list">
                            </div> -->
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item>
                        <template slot="label">
                            <label><span class="mandatory">*</span>Title</label>
                        </template>
                        <el-input v-model="titleEdit"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item>
                        <template slot="label">
                            <label><span class="mandatory">*</span>Summary</label>
                        </template>
                        <el-input v-model="summaryEdit"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template slot="footer">
            <el-button @click="handleClose">關閉</el-button>
        </template>
    </el-dialog>
</div>
</template>

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
        }
    },
    data() {
        return {
            imgs: [],
            imgModal: false,
            imgTyp: '38',
            fileText: '選擇文件',
            fileBrowse: '瀏覽 ...',
            isUpload: false,
            language: [],
            checkedNames: []
        }
    },
    methods: {
        removeFile() {
            let obj = this.$refs.modalFile
            obj.value = ''
            this.fileBrowse = '瀏覽 ...'
            this.fileText = '選擇文件'
            this.isUpload = false
        },
        handleClick() {
            this.$refs.input.click()
        },
        handleModal() {
            this.imgModal = true
        },
        handleClose() {
            this.imgModal = false
        },
        handleChange() {
            let files = this.$refs.input.files
            this.appendFile(files)
        },
        handleModalChange(event) {
            let tar = event.target.files
            if (tar) {
                this.fileBrowse = tar[0].name
                this.fileText = '變更'
                this.isUpload = true
            }
        },
        handleChangeLang(item) {
            this.language.forEach(item => item.active = false)
            item.active = true
        },
        appendFile(files) {
            let file, url
            for (file of files) {
                url = window.URL.createObjectURL(file)
                this.imgs.push({
                    url: url,
                    name: file.name
                })
            }
        },
        deleteCurrent(index) {
            this.imgs.splice(index, 1)
        },
        onSubmit() {

        }
    },
    // created() {
    //     this.imgs = this.imgList
    // },
    mounted() {
        document.querySelector('.uploadArea').addEventListener('dragenter', (event) => {
            event.preventDefault()
        })
        document.querySelector('.uploadArea').addEventListener('dragover', (event) => {
            event.preventDefault()
        })
        document.querySelector('.uploadArea').addEventListener('drop', (event) => {
            event.stopPropagation()
            event.preventDefault()
            let files = event.dataTransfer.files
            this.appendFile(files)
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
            }
        })
    },
    computed: {
        currentIndex() {
            return this.language.findIndex(item => item.active)
        },
        titleEdit: {
            get() {
                return this.currentIndex > -1 ? this.language[this.currentIndex].content.title : ''
            },
            set(val) {
                this.language[this.currentIndex].content.title = val
            }
        },
        summaryEdit: {
            get() {
                return this.currentIndex > -1 ? this.language[this.currentIndex].content.summary : ''
            },
            set(val) {
                this.language[this.currentIndex].content.summary = val
            }
        }
    },
    created() {
        let lang = []
        lang = this.newLang.map(item => {
            return {
                ...item
            }
        })
        lang.forEach(item => item.active = false)
        lang[0].active = true
        this.language = lang
    },
    watch: {
        'imgs': {
            handler(n) {
                this.$emit('imgInput', n)
            },
            deep: true
        },
        'checkedNames': {
            handler(n) {
                this.$emit('checked', n)
            },
            deep: true
        },
        'afferentList': {
            handler(n) {
                this.checkedNames = n
            },
            deep: true,
            immediate: true
        },
        // 'imgList': {
        //     handler(n) {
        //         this.imgs = n
        //     },
        //     deep: true
        // }
    }
}
</script>
