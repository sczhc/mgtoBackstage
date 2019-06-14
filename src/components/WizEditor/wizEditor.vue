<template>
<div class="wizEditor">
    <textarea :id="id" :name="id" :value="value"></textarea>
</div>
</template>

<script>
import {
    setTimeout,
    setInterval
} from 'timers';
const CKEDITOR = window.CKEDITOR

export default {
    name: 'ckeditor4',
    props: {
        value: String,
        id: {
            type: String,
            default: 'editor'
        },
        height: {
            type: String,
            default: '90px'
        },
        // 工具栏
        toolbar: {
            type: Array,
            default: () => [
                ['Source', '-', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromword', '-', 'Undo', 'Redo', '-', 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent'],
                '/',
                ['Table', 'HorizontalRule', '-', 'Styles', '-', 'Bold', 'Italic', 'Strike', '-', 'RemoveFormat', '-', 'Link', 'Unlink', 'Anchor', '-', 'Maximize']
            ]
        },
        // 用户语言
        language: {
            type: String,
            default: 'zh'
        },
        editLang: {
            type: String,
            default: ''
        },
        // 设置密钥的行为
        // CKEDITOR.ENTER_P（1） - <p>创建新段落
        // CKEDITOR.ENTER_BR（2） - 线条被<br>元素打破
        // CKEDITOR.ENTER_DIV（3） - <div>创建新块
        enterMode: {
            type: Number,
            default: 2
        }
    },
    beforeUpdate() {
        if (this.value !== this.instance.getData()) {
            this.instance.setData(this.value)
        }
    },
    computed: {
        instance() {
            const ckeditorId = this.id
            return CKEDITOR.instances[ckeditorId]
        }
    },
    mounted() {
        this.create()
    },
    methods: {
        create() {
            if (!CKEDITOR) {
                throw new Error('ckeditor cannot locate!!!')
            } else {
                const ckeditorId = this.id
                const ckeditorConfig = {
                    toolbar: this.toolbar,
                    language: this.language,
                    height: this.height,
                    enterMode: this.enterMode
                }
                CKEDITOR.replace(ckeditorId, ckeditorConfig)
                this.instance.setData(this.value)
                this.instance.on('change', this.onChange)
                this.instance.on('mode', this.onMode)
                this.instance.on('focus', () => {
                    this.instance.on('change', this.onChange)
                })
            }
        },
        onMode() {
            if (this.instance.mode === 'source') {
                let editable = this.instance.editable()
                editable.attachListener(editable, 'input', () => {
                    this.onChange()
                })
            }
        },
        onChange() {
            let ckeditorData = this.instance.getData()
            if (ckeditorData !== this.value) {
                this.$emit('input', ckeditorData)
            }
        }
    },
    watch: {
        'editLang': {
            handler(n, o) {
                if (n !== o) {
                    this.instance.setData(this.value)
                    this.instance.setMode('wysiwyg')
                    this.instance.removeListener('change', this.onChange)
                }
            }
        }
    },
    destroyed() {
        if (this.instance)
            this.instance.destroy()
    }
}
</script>
