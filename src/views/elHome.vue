<template>
<div class="mgto-content">
    <el-form ref="form" :model="form" :rules="rules" :label-width="resizeWidth >= 768 ? '200px' : ''">
        <el-row>
            <el-col :span="24">
                <el-form-item>
                    <template slot="label">
                        <label><span class="mandatory">*</span>類別</label>
                    </template>
                    <el-select v-model="form.newsType" @change="handleNews">
                        <el-option value="56" label="資料夾"></el-option>
                        <el-option value="21" label="新聞公佈"></el-option>
                        <el-option value="22" label="講辭"></el-option>
                        <el-option value="23" label="推廣活動"></el-option>
                        <el-option value="24" label="圖片"></el-option>
                        <el-option value="25" label="宣傳片"></el-option>
                        <el-option value="26" label="剪報"></el-option>
                        <el-option value="27" label="參考資料"></el-option>
                        <el-option value="28" label="區域合作"></el-option>
                        <el-option value="46" label="旅遊快訊"></el-option>
                        <el-option value="57" label="澳門旅遊"></el-option>
                        <el-option value="99" label="旅遊快訊印刷版"></el-option>
                        <el-option value="100" label="業界新聞"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item>
                    <template slot="label">
                        <label><span class="mandatory">*</span>審批狀態</label>
                    </template>
                    <el-input v-model="form.statusShow" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="上線時間">
                    <el-date-picker prefix-icon="el-icon-date" v-model="form.onlineAt" type="datetime"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="下線時間">
                    <el-date-picker prefix-icon="el-icon-date" v-model="form.offlineAt" type="datetime"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item prop="dateAt" label="日期">
                    <!-- <template slot="label">
                        <label><span class="mandatory">*</span></label>
                    </template> -->
                    <el-date-picker prefix-icon="el-icon-date" v-model="form.dateAt" type="datetime"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="">
                    <el-checkbox v-model="form.showDate">
                        <span>是否只顯示日期</span>
                    </el-checkbox>
                    <el-checkbox v-model="form.showInHomePage">
                        <span>首頁資料夾顯示</span>
                    </el-checkbox>
                    <template v-if="isUpdateNotice">
                        <el-checkbox v-model="form.isSendUpdateNotice">
                            <span>是否發出更新通知</span>
                        </el-checkbox>
                    </template>
                </el-form-item>
            </el-col>
            <template v-if="typeIndex == 1">
                <el-col :span="24">
                    <el-form-item label="通知備註" prop="updateNoticeRemarks">
                        <!-- <template slot="label">
                            <label><span class="mandatory">*</span></label>
                        </template> -->
                        <el-input type="textarea" v-model="form.updateNoticeRemarks"></el-input>
                    </el-form-item>
                </el-col>
            </template>
            <template v-if="typeIndex == 5">
                <el-col :span="24">
                    <el-form-item label="國家地區">
                        <el-select v-model="form.Country">
                            <el-option v-for="(item,index) in countrys" :key="`countrys-${index}`" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </template>
            <template v-if="typeIndex == 2">
                <el-col :span="24">
                    <el-form-item>
                        <template slot="label">
                            <label><span class="mandatory">*</span>發佈者在活動中的角色</label>
                        </template>
                        <el-select v-model="form.extra.newsRole">
                            <el-option value="0" label="參與方"></el-option>
                            <el-option value="1" label="支持方"></el-option>
                            <el-option value="2" label="協辦方"></el-option>
                            <el-option value="3" label="主辦方"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="開始時間">
                        <el-date-picker prefix-icon="el-icon-date" v-model="form.extra.beginTime" type="datetime"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="結束時間">
                        <el-date-picker prefix-icon="el-icon-date" v-model="form.extra.endTime" type="datetime"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="相關網頁鏈接">
                        <el-input v-model="form.extra.url"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="性質">
                        <el-select v-model="form.extra.actNature">
                            <el-option value=""></el-option>
                            <el-option value="0" label="海外推廣 - 協會性質"></el-option>
                            <el-option value="1" label="海外推廣 - 貿易會"></el-option>
                            <el-option value="2" label="海外推廣 - 貿易會 (B to C)"></el-option>
                            <el-option value="3" label="海外推廣 - 貿易會 (B to B)"></el-option>
                            <el-option value="4" label="海外推廣 - 貿易會 (B to B/C)"></el-option>
                            <el-option value="5" label="海外推廣 - 公關活動"></el-option>
                            <el-option value="6" label="海外推廣 - 講座"></el-option>
                            <el-option value="7" label="海外推廣 - 洽談會"></el-option>
                            <el-option value="8" label="海外推廣 - 講座及洽談會"></el-option>
                            <el-option value="9" label="海外推廣 - 路展"></el-option>
                            <el-option value="10" label="海外推廣 - 特別活動"></el-option>
                            <el-option value="11" label="海外推廣 - 其他"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="參加團體">
                        <el-input type="textarea" id="textarea-default" v-model="form.extra.joinGroup"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="截止報名日期">
                        <el-date-picker prefix-icon="el-icon-date" v-model="form.extra.RegDeadline" type="datetime"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="eService報名關聯id">
                        <el-input v-model="form.extra.eService" type="number"></el-input>
                    </el-form-item>
                </el-col>
            </template>
            <template v-if="typeIndex == 3">
                <el-col :span="24">
                    <el-form-item>
                        <template slot="label">
                            <label><span class="mandatory">*</span>圖片方向</label>
                        </template>
                        <el-select v-model="form.extra.picDirection">
                            <el-option value="transverse" label="橫向"></el-option>
                            <el-option value="longitudinal" label="縱向"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="">
                        <el-checkbox v-model="form.extra.picHasPersion">
                            <span>是否有人物</span>
                        </el-checkbox>
                    </el-form-item>
                </el-col>
            </template>
            <el-col :span="24">
                <el-form-item label="相關新聞">
                    <el-select v-model="form.news" filterable multiple>
                        <el-option v-for="item in news" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                        <div slot="empty" class="noResults">No results found</div>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="創建時間">
                    <el-date-picker prefix-icon="el-icon-date" v-model="form.createdAt" type="datetime" :disabled="disabled"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="更新時間">
                    <el-date-picker prefix-icon="el-icon-date" v-model="form.updatedAt" type="datetime" :disabled="disabled"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="更新者">
                    <el-input v-model="form.updatedBy" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="發佈者">
                    <el-input v-model="form.createdByShow" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="審批者">
                    <el-input v-model="form.approvedByShow" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item>
                    <template slot="label">
                        <label><span class="mandatory">*</span>預設語言</label>
                    </template>
                    <el-select v-model="form.indicator">
                        <el-option v-for="(item,index) in language" :key="`lang-${index}`" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item>
                    <template slot="label">
                        <label><span class="mandatory">*</span>Requested New Tags</label>
                    </template>
                    <el-input v-model="form.requestedTags"></el-input>
                </el-form-item>
            </el-col>
            <template v-if="typeIndex == 4">
                <el-col :span="24">
                    <el-form-item>
                        <template slot="label">
                            <label><span class="mandatory">*</span>對應刊號</label>
                        </template>
                        <el-date-picker v-model="form.datePicker" type="date"></el-date-picker>
                    </el-form-item>
                </el-col>
            </template>
            <el-col :span="24">
                <el-form-item>
                    <div class="multilingualism">
                        <div class="language">
                            <div @click="handClick(item)" v-for="(item,index) in form.multilingualism" :class="['lang',item.active? 'langAction':'']" :data-target="item.language" :key="`multi_${index}`">{{item.title}}</div>
                            <el-button icon="el-icon-plus" @click="handAdd" v-if="choosingButton"></el-button>
                        </div>
                        <div class="multilin-text">
                            <div class="title-mult">
                                <el-row>
                                    <el-col :span="4">
                                        <p>標題</p>
                                    </el-col>
                                    <el-col :span="20">
                                        <wiz-editor id="titleEditor" v-model="titleValue" :editLang="lang" :toolbar="toolbar"></wiz-editor>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="content-mult">
                                <el-row>
                                    <el-col :span="4">
                                        <p>內容</p>
                                    </el-col>
                                    <el-col :span="20">
                                        <wiz-editor id="contentEditor" v-model="conValue" :editLang="lang" :enterMode="1" height="200px"></wiz-editor>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="remark-mult">
                                <el-row>
                                    <el-col :span="4">
                                        <p> 內部備註</p>
                                    </el-col>
                                    <el-col :span="20">
                                        <el-input type="textarea" id="news_draft_translations_kr_summary" v-model="remarkValue"></el-input>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                </el-form-item>

            </el-col>
            <el-col :span="24">
                <el-form-item>
                    <template slot="label">
                        <label><span class="mandatory">*</span>附件</label>
                    </template>
                    <div class="wiz-fileInput">
                        <el-collapse v-model="activeCollapseName">
                            <el-collapse-item name="dargFile">
                                <div slot="title" @click="stopEvent">
                                    <el-button @click="startUpload">開始上傳</el-button>
                                    <el-button @click="deletePage">刪除</el-button>
                                    <el-checkbox v-model="deleteWhole" @click="deleteAll" @change="deleteChange">刪除所有文件</el-checkbox>
                                </div>
                                <darg-file :newLang="dargLang" :imgList="imgList" @imgInput="imgInput" @checked="checkedList" :afferentList="afferentList"></darg-file>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <div class="form-actions">
                    <template v-if="types === 'create'">
                        <el-button type="primary" class="btn-primary" @click="onSubmit">創建</el-button>
                    </template>
                    <template v-else>
                        <el-button type="primary" class="btn-primary" @click="onSubmit">更新</el-button>
                    </template>
                    <a class="btn btn-back" href="/admintools/news_draft/">返回</a>
                    <template v-if="types !== 'create'">
                        <el-button class="btn-preview" @click="handlePreview">預覽</el-button>
                    </template>
                    <template v-if="types === 'update'">
                        <el-button class="btn-approval">提交審批</el-button>
                        <el-button class="btn-release">提交直接發佈</el-button>
                    </template>
                </div>
            </el-col>
        </el-row>
    </el-form>

    <!-- 弹窗 新增语言 -->
    <el-dialog :visible.sync="centerDialogVisible" class="add-modal">
        <div slot="title">選擇增加語言</div>
        <el-select v-model="selected">
            <el-option v-for="(item,index) in newLang" :key="`lang_${index}`" :disabled="item.disabled" :value="item.value" :label="item.text"></el-option>
        </el-select>
        <div slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="choiceLang">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 弹窗 新增语言 -->
    <el-dialog :visible.sync="updateDialogVisible" class="updateDiaglog">
        <div class="label">
            <el-tree ref="tree" :data="labelList" show-checkbox node-key="labels" :check-strictly="true" :check-on-click-node="true" :default-expand-all="true" @node-click="nodeClick" @check="checkNode" @check-change="checkChange">
            </el-tree>
        </div>
    </el-dialog>
    <!-- 弹窗 预览 -->
    <el-dialog :visible.sync="previewDialogVisible" class="preview">
    </el-dialog>
</div>
</template>

<script>
import Vue from 'vue';
import WizEditor from '@/components/WizEditor'
import DargFile from '@/components/ElDargFile'

let checkList = []

export default {
    components: {
        WizEditor,
        DargFile
    },
    props: {
        types: {
            type: String,
            default: 'update'
        }
    },
    data() {
        return {
            deleteFile: false,
            disabled: true,
            form: {
                newsType: '56',
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
                    newsRole: '0',
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
            dargLang: [{
                    value: 'zh_TW',
                    text: '繁體中文',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'zh_CN',
                    text: '简体中文',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'pt_PT',
                    text: 'Português',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'en',
                    text: 'English',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'jp',
                    text: '日本語',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'kr',
                    text: '한국어',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'th',
                    text: 'ภาษาไทย',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'my',
                    text: 'Bahasa Malaysia',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'id',
                    text: 'Bahasa Indonesia',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'de',
                    text: 'Deutsch',

                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'fr',
                    text: 'Français',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'es',
                    text: 'Español',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'it',
                    text: 'Italiano',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'ru',
                    text: 'Pусский',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'ae',
                    text: 'عربي',
                    content: {
                        title: '',
                        summary: ''
                    }
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
                ['Table', 'Rule', '-', 'Styles', '-', 'Strike', '-', 'RemoveFormat', '-', 'Maximize']
            ],
            centerDialogVisible: false,
            previewDialogVisible: false,
            updateDialogVisible: true,
            selected: '',
            typeIndex: 1,
            isUpdateNotice: true,
            fileList: [],
            showCollapse: true,
            rules: {
                newsType: [{
                    required: true,
                    message: '必須填寫',
                    trigger: 'change'
                }],
                dateAt: [{
                    required: true,
                    message: '必須填寫',
                    trigger: 'change'
                }],
                updateNoticeRemarks: [{
                    required: true,
                    message: '必須填寫',
                    trigger: 'change'
                }]
            },
            activeCollapseName: 'dargFile',
            deleteWhole: false,
            deleteList: [],
            afferentList: [],
            imgList: [],
            resizeWidth: window.innerWidth,
            labelList: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }]
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            this.$refs.form.validate(valid => {
                if (!valid) this.errorScoll()
            })
        },
        errorScoll() {
            let errEle = document.querySelector('.is-invalid')
            errEle ? this.animateScroll(errEle, 50) : ''
        },
        animateScroll(element, speed) {
            //获取元素相对窗口的top值，此处应加上窗口本身的偏移
            let top = window.pageYOffset + element.getBoundingClientRect().top;
            // 获取当前距离窗口的top值
            let osTop = document.documentElement.scrollTop || document.body.srcollTop;
            let requestId;
            let currentNumber = 0;
            //采用requestAnimationFrame，平滑动画
            function step() {
                if (osTop >= top) {
                    currentNumber = osTop -= speed;
                    window.scrollTo(0, osTop);
                    requestId = window.requestAnimationFrame(step);
                } else {
                    window.cancelAnimationFrame(requestId);
                }
            }
            window.requestAnimationFrame(step);
        },
        handClick(item) {
            this.form.multilingualism.forEach(obj => obj.active = false)
            item.active = true;
        },
        handleNews() {
            this.$refs.form.clearValidate()
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
        },
        stopEvent(event) {
            event.stopPropagation()
        },
        startUpload(event) {
            event.stopPropagation()
        },
        deletePage(event) {
            event.stopPropagation()
            if (checkList.length == 0) {
                this.$notify.error({
                    message: '請選擇要刪除的項目'
                })
            } else {
                for (let x in this.imgList) {
                    for (let s in checkList) {
                        if (this.imgList[x] == checkList[s]) {
                            this.imgList.splice(x, 1)
                        }
                    }
                }
            }
        },
        deleteAll(event) {
            event.stopPropagation()
            this.deleteWhole = !this.deleteWhole
        },
        deleteChange(val) {
            if (val) {
                this.afferentList = this.deleteList
            } else {
                this.afferentList = []
            }
        },
        imgInput(val) {
            this.deleteList = []
            this.imgList = []
            for (let x in val) {
                this.deleteList.push(val[x].name)
                this.imgList.push(val[x].name)
            }
        },
        checkedList(val) {
            checkList = val
            if (val.length == this.deleteList.length && val.length != 0) this.deleteWhole = true
            else this.deleteWhole = false
        },
        handlePreview() {

        },
        nodeClick(data, node) {
            this.childNodesChange(node)
            this.parentNodesChange(node)
        },
        childNodesChange(node) {
            let that = this
            let len = node.childNodes.length;
            for (let i = 0; i < len; i++) {
                node.childNodes[i].checked = false;
                that.childNodesChange(node.childNodes[i]);
            }
        },
        parentNodesChange(node) {
            let that = this
            if (node.parent) {
                for (let key in node) {
                    if (key == "parent") {
                        node[key].checked = true;
                        that.parentNodesChange(node[key]);
                    }
                }
            }
        },
        checkNode(data,statu) {
            this.$refs.tree.setCheckedNodes([{
                id: data.id,
                label: data.label
            }])
        },
        checkChange(data,node,self) {
            console.log(data,node,self)
        }
    },
    watch: {
        'form.newsType': {
            handler(n) {
                if (n == '56') {
                    this.typeIndex = 1
                    this.isUpdateNotice = true
                } else if (n == '23') {
                    this.typeIndex = 2
                    this.isUpdateNotice = false
                } else if (n == '24') {
                    this.typeIndex = 3
                    this.isUpdateNotice = false
                } else if (n == '99') {
                    this.typeIndex = 4
                    this.isUpdateNotice = false
                } else if (n == '21' || n == '22') {
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
    mounted() {
        window.onresize = () => {
            this.resizeWidth = window.innerWidth
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
        remarkValue: {
            get() {
                return this.currentIndex > -1 ? this.form.multilingualism[this.currentIndex].content.remark : ''
            },
            set(val) {
                this.form.multilingualism[this.currentIndex].content.remark = val
            }
        }
    }
}
</script>
