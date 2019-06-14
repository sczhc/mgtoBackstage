<template>
<div class="mgto-content">
    <b-form @submit="onSubmit">
        <b-row>
            <b-col md="12">
                <b-form-group horizontal :label-cols="3" label="*類別">
                    <b-form-select v-model="form.newsType">
                        <option value="56">資料夾</option>
                        <option value="21">新聞公佈</option>
                        <option value="22">講辭</option>
                        <option value="23">推廣活動</option>
                        <option value="24">圖片</option>
                        <option value="25">宣傳片</option>
                        <option value="26">剪報</option>
                        <option value="27">參考資料</option>
                        <option value="28">區域合作</option>
                        <option value="46">旅遊快訊</option>
                        <option value="57">澳門旅遊</option>
                        <option value="99">旅遊快訊印刷版</option>
                        <option value="100">業界新聞</option>
                    </b-form-select>
                </b-form-group>
            </b-col>
            <b-col md="12">
                <b-form-group horizontal :label-cols="3" label="*審批狀態">
                    <el-input v-model="form.statusShow" :disabled="disabled"></el-input>
                </b-form-group>
            </b-col>
            <b-col md="12">
                <b-form-group horizontal :label-cols="3" label="上線時間">
                    <el-date-picker prefix-icon="el-icon-date" v-model="form.onlineAt" type="datetime"></el-date-picker>
                </b-form-group>
            </b-col>
            <b-col md="12">
                <b-form-group horizontal :label-cols="3" label="下線時間">
                    <el-date-picker prefix-icon="el-icon-date" v-model="form.offlineAt" type="datetime"></el-date-picker>
                </b-form-group>
            </b-col>
            <b-col md="12">
                <b-form-group horizontal :label-cols="3" label="*日期">
                    <el-date-picker prefix-icon="el-icon-date" v-model="form.dateAt" type="datetime"></el-date-picker>
                </b-form-group>
            </b-col>
            <b-col md="12">
                <b-form-group horizontal :label-cols="3" label="">
                    <b-form-checkbox v-model="form.showDate">
                        <span>是否只顯示日期</span>
                    </b-form-checkbox>
                    <b-form-checkbox v-model="form.showInHomePage">
                        <span>首頁資料夾顯示</span>
                    </b-form-checkbox>
                    <template v-if="isUpdateNotice">
                        <b-form-checkbox v-model="form.isSendUpdateNotice">
                            <span>是否發出更新通知</span>
                        </b-form-checkbox>
                    </template>
                </b-form-group>
            </b-col>
            <template v-if="typeIndex == 1">
                <b-col md="12">
                    <b-form-group horizontal :label-cols="3" label="*通知備註">
                        <b-form-textarea id="textarea-default" v-model="form.updateNoticeRemarks"></b-form-textarea>
                    </b-form-group>
                </b-col>
            </template>
            <template v-if="typeIndex == 5">
                <b-col md="12">
                    <b-form-group horizontal :label-cols="3" label="國家地區">
                        <b-form-select v-model="form.Country" :options="countrys"></b-form-select>
                    </b-form-group>
                </b-col>
            </template>
            <template v-if="typeIndex == 2">
                <b-col md="12">
                    <b-form-group horizontal :label-cols="3" label="*發佈者在活動中的角色">
                        <b-form-select v-model="form.extra.newsRole">
                            <option value="0">參與方</option>
                            <option value="1">支持方</option>
                            <option value="2">協辦方</option>
                            <option value="3">主辦方</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col md="12">
                    <b-form-group horizontal :label-cols="3" label="開始時間">
                        <el-date-picker prefix-icon="el-icon-date" v-model="form.extra.beginTime" type="datetime"></el-date-picker>
                    </b-form-group>
                </b-col>
                <b-col md="12">
                    <b-form-group horizontal :label-cols="3" label="結束時間">
                        <el-date-picker prefix-icon="el-icon-date" v-model="form.extra.endTime" type="datetime"></el-date-picker>
                    </b-form-group>
                </b-col>
                <b-col md="12">
                    <b-form-group horizontal :label-cols="3" label="相關網頁鏈接">
                        <b-form-input v-model="form.extra.url"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="12">
                    <b-form-group horizontal :label-cols="3" label="性質">
                        <b-form-select v-model="form.extra.actNature">
                            <option value=""></option>
                            <option value="0">海外推廣 - 協會性質</option>
                            <option value="1">海外推廣 - 貿易會</option>
                            <option value="2">海外推廣 - 貿易會 (B to C)</option>
                            <option value="3">海外推廣 - 貿易會 (B to B)</option>
                            <option value="4">海外推廣 - 貿易會 (B to B/C)</option>
                            <option value="5">海外推廣 - 公關活動</option>
                            <option value="6">海外推廣 - 講座</option>
                            <option value="7">海外推廣 - 洽談會</option>
                            <option value="8">海外推廣 - 講座及洽談會</option>
                            <option value="9">海外推廣 - 路展</option>
                            <option value="10">海外推廣 - 特別活動</option>
                            <option value="11">海外推廣 - 其他</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col md="12">
                    <b-form-group horizontal :label-cols="3" label="參加團體">
                        <b-form-textarea id="textarea-default" v-model="form.extra.joinGroup"></b-form-textarea>
                    </b-form-group>
                </b-col>
                <b-col md="12">
                    <b-form-group horizontal :label-cols="3" label="截止報名日期">
                        <el-date-picker prefix-icon="el-icon-date" v-model="form.extra.RegDeadline" type="datetime"></el-date-picker>
                    </b-form-group>
                </b-col>
                <b-col md="12">
                    <b-form-group horizontal :label-cols="3" label="eService報名關聯id">
                        <b-form-input v-model="form.extra.eService" type="number"></b-form-input>
                    </b-form-group>
                </b-col>
            </template>
            <template v-if="typeIndex == 3">
                <b-col md="12">
                    <b-form-group horizontal :label-cols="3" label="*圖片方向">
                        <b-form-select v-model="form.extra.picDirection">
                            <option value="transverse">橫向</option>
                            <option value="longitudinal">縱向</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col md="12">
                    <b-form-group horizontal :label-cols="3" label="">
                        <b-form-checkbox v-model="form.extra.picHasPersion">
                            <span>是否有人物</span>
                        </b-form-checkbox>
                    </b-form-group>
                </b-col>
            </template>
            <b-col md="12">
                <b-form-group horizontal :label-cols="3" label="相關新聞">
                    <el-select v-model="form.news" filterable multiple>
                        <el-option v-for="item in news" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                        <div slot="empty">No results found</div>
                        <!-- <div slot="empty">Please enter 1 or more characters</div> -->
                    </el-select>
                </b-form-group>
            </b-col>
            <b-col md="12">
                <b-form-group horizontal :label-cols="3" label="創建時間">
                    <el-date-picker prefix-icon="el-icon-date" v-model="form.createdAt" type="datetime" :disabled="disabled"></el-date-picker>
                </b-form-group>
            </b-col>
            <b-col md="12">
                <b-form-group horizontal :label-cols="3" label="更新時間">
                    <el-date-picker prefix-icon="el-icon-date" v-model="form.updatedAt" type="datetime" :disabled="disabled"></el-date-picker>
                </b-form-group>
            </b-col>
            <b-col md="12">
                <b-form-group horizontal :label-cols="3" label="更新者">
                    <el-input v-model="form.updatedBy" :disabled="disabled"></el-input>
                </b-form-group>
            </b-col>
            <b-col md="12">
                <b-form-group horizontal :label-cols="3" label="發佈者">
                    <el-input v-model="form.createdByShow" :disabled="disabled"></el-input>
                </b-form-group>
            </b-col>
            <b-col md="12">
                <b-form-group horizontal :label-cols="3" label="審批者">
                    <el-input v-model="form.approvedByShow" :disabled="disabled"></el-input>
                </b-form-group>
            </b-col>
            <b-col md="12">
                <b-form-group horizontal :label-cols="3" label="*預設語言">
                    <b-form-select v-model="form.indicator" :options="language">
                    </b-form-select>
                </b-form-group>
            </b-col>
            <b-col md="12">
                <b-form-group horizontal :label-cols="3" label="*Requested New Tags">
                    <b-form-input v-model="form.requestedTags"></b-form-input>
                </b-form-group>
            </b-col>
            <template v-if="typeIndex == 4">
                <b-col md="12">
                    <b-form-group horizontal :label-cols="3" label="*對應刊號">
                        <el-date-picker v-model="form.datePicker" type="date"></el-date-picker>
                    </b-form-group>
                </b-col>
            </template>
            <b-col md="12">
                <div class="multilingualism">
                    <div class="language">
                        <div @click="handClick(item)" v-for="(item,index) in form.multilingualism" :class="['lang',item.active? 'langAction':'']" :data-target="item.language" :key="`multi_${index}`">{{item.title}}</div>
                        <el-button icon="el-icon-plus" @click="handAdd" v-if="choosingButton"></el-button>
                    </div>
                    <div class="multilin-text">
                        <wiz-editor id="titleEditor" v-model="titleValue" :editLang="lang" :toolbar="toolbar"></wiz-editor>
                        <wiz-editor id="contentEditor" v-model="conValue" :editLang="lang" :enterMode="1" height="200px"></wiz-editor>
                    </div>
                </div>
            </b-col>
            <b-button type="submit" variant="primary">提交</b-button>
        </b-row>
    </b-form>
    <!-- 弹窗 -->
    <el-dialog :visible.sync="centerDialogVisible">
        <div slot="title">選擇增加語言</div>
        <b-form-select v-model="selected">
            <template v-for="(item,index) in newLang">
                <option :key="`lang_${index}`" :disabled="item.disabled" :value="item.value">{{item.text}}</option>
            </template>
        </b-form-select>
        <div slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="choiceLang">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import Vue from 'vue';
import WizEditor from '@/components/WizEditor'
export default {
    components: {
        WizEditor
    },
    data() {
        return {
            disabled: true,
            form: {
                newsType: 56,
                statusShow: 'DRAFT',
                onlineAt: '',
                offlineAt: '',
                dateAt: '',
                showDate: false,
                showInHomePage: false,
                isSendUpdateNotice: false,
                updateNoticeRemarks: '',
                Country: '',
                extra: {
                    newsRole: 0,
                    beginTime: '',
                    endTime: '',
                    url: '',
                    actNature: '',
                    joinGroup: '',
                    RegDeadline: '',
                    eService: null,
                    picDirection: 'transverse',
                    picHasPersion: false
                },
                news: '',
                createdAt: '',
                updatedAt: '',
                updatedBy: '',
                createdByShow: '',
                approvedByShow: '',
                indicator: '',
                requestedTags: '',
                datePicker: '',
                multilingualism: [{
                        language: 'zh_TW',
                        title: '繁體中文[默認]',
                        active: true,
                        content: {
                            title: 'aaaaaaa',
                            content: '',
                            remark: ''
                        }
                    },
                    {
                        language: 'zh_CN',
                        title: '簡體中文',
                        active: false,
                        content: {
                            title: 'bbbbbb',
                            content: '',
                            remark: ''
                        }
                    },
                    {
                        language: 'pt_PT',
                        title: 'Português',
                        active: false,
                        content: {
                            title: 'cccccc',
                            content: '',
                            remark: ''
                        }
                    }
                ],
            },
            language: [{
                    value: '',
                    text: '不設定預設語言'
                },
                {
                    value: 'zh_TW',
                    text: '繁體中文'
                },
                {
                    value: 'zh_CN',
                    text: '简体中文'
                },
                {
                    value: 'pt_PT',
                    text: 'Português'
                },
                {
                    value: 'en',
                    text: 'English'
                },
                {
                    value: 'jp',
                    text: '日本語'
                },
                {
                    value: 'kr',
                    text: '한국어'
                },
                {
                    value: 'th',
                    text: 'ภาษาไทย'
                },
                {
                    value: 'my',
                    text: 'Bahasa Malaysia'
                },
                {
                    value: 'id',
                    text: 'Bahasa Indonesia'
                },
                {
                    value: 'de',
                    text: 'Deutsch'
                },
                {
                    value: 'fr',
                    text: 'Français'
                },
                {
                    value: 'es',
                    text: 'Español'
                },
                {
                    value: 'it',
                    text: 'Italiano'
                },
                {
                    value: 'ru',
                    text: 'Pусский'
                },
                {
                    value: 'ae',
                    text: 'عربي'
                }
            ],
            news: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                },
                {
                    value: '选项6',
                    label: '黄金糕1'
                },
                {
                    value: '选项7',
                    label: '黄金糕2'
                },
                {
                    value: '选项8',
                    label: '黄金糕3'
                },
            ],
            countrys: [{
                    value: '',
                    text: ''
                },
                {
                    value: 'A2',
                    text: '澳大拉西亞 (Australasia)'
                },
                {
                    value: 'A3',
                    text: '大西洋 (Atlantic Ocean)'
                },
                {
                    value: 'AA',
                    text: '阿魯尼丘帕得許 (Arunachal Pradesh (State of))'
                },
                {
                    value: 'AC',
                    text: '阿士摩卡提爾群島 (Ashmore and Cartier Islands)'
                },
                {
                    value: 'AD',
                    text: '安道爾 (Andorra)'
                }
            ],
            toolbar: [
                ['Source', '-', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromword', '-', 'Undo', 'Redo', '-', 'Outdent', 'Indent'],
                '/',
                ['Table', 'HorizontalRule', '-', 'Styles', '-', 'Strike', '-', 'RemoveFormat', '-', 'Maximize']
            ],
            centerDialogVisible: false,
            selected: '',
            typeIndex: 1,
            isUpdateNotice: true
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            console.log(this.form)
        },
        handClick(item) {
            this.form.multilingualism.forEach(obj => obj.active = false)
            item.active = true;
        },
        handAdd() {
            this.selectedLang()
            this.centerDialogVisible = true
        },
        choiceLang(val) {
            let title = ''
            this.language.forEach(item => {
                if (item.value == this.selected)
                    title = item.text
            })
            this.form.multilingualism.push({
                language: this.selected,
                title: title,
                active: false,
                content: {
                    title: '',
                    content: '',
                    remark: ''
                }
            })
            this.centerDialogVisible = false
        },
        selectedLang() {
            for (let i = 0; i < this.newLang.length; i++) {
                if (!this.newLang[i].disabled) {
                    this.selected = this.newLang[i].value
                    return
                }
            }
        }
    },
    watch: {
        'form.newsType': {
            handler(n) {
                if (n == 56) {
                    this.typeIndex = 1
                    this.isUpdateNotice = true
                } else if (n == 23) {
                    this.typeIndex = 2
                    this.isUpdateNotice = false
                } else if (n == 24) {
                    this.typeIndex = 3
                    this.isUpdateNotice = false
                } else if (n == 99) {
                    this.typeIndex = 4
                    this.isUpdateNotice = false
                } else if (n == 21 || n == 22) {
                    this.typeIndex = 5
                    this.isUpdateNotice = false
                } else {
                    this.typeIndex = 6
                    this.isUpdateNotice = false
                }
            },
            immediate: true
        }
    },
    computed: {
        newLang() {
            let newLang = []
            newLang = this.language.map(item => {
                return {
                    ...item
                }
            })
            newLang.shift()
            newLang.forEach(item => {
                item.disabled = false
            })
            this.form.multilingualism.forEach(item => {
                newLang.forEach(obj => {
                    if (obj.value == item.language)
                        obj.disabled = true
                })
            })
            return newLang
        },
        choosingButton() {
            return this.form.multilingualism.length !== this.newLang.length;
        },
        lang() {
            return this.form.multilingualism[this.currentIndex].language
        },
        currentIndex() {
            return this.form.multilingualism.findIndex(item => item.active)
        },
        titleValue: {
            get() {
                return this.currentIndex > -1 ? this.form.multilingualism[this.currentIndex].content.title : ''
            },
            set(val) {
                this.form.multilingualism[this.currentIndex].content.title = val
            }
        },
        conValue: {
            get() {
                return this.currentIndex > -1 ? this.form.multilingualism[this.currentIndex].content.content : ''
            },
            set(val) {
                this.form.multilingualism[this.currentIndex].content.content = val
            }
        },
    }
}
</script>

<style lang="scss">
.necessary {
    color: #D53F40;
}

.mgto-content {
    margin: 100px;

    .row {
        margin: 0;
    }

    .el-button {
        outline: none;
    }

    .form-group {
        margin: 15px 0;

        .col-form-label {
            text-align: right;
        }
    }
}

.multilingualism {
    .language {
        display: flex;
        flex-wrap: wrap;

        >div {
            padding: 5px 10px;
            border: 1px solid;
            cursor: pointer;
            background: #ccc;

            &.langAction {
                background: #fff;
            }

            &:not(:last-of-type) {
                border-right: 0;
            }
        }
    }
}
</style>
