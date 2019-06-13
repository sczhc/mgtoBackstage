<template>
<div class="wizEditor">
    <textarea :id="id" :name="id" :value="value"></textarea>
</div>
</template>

<script>
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
        toolbar: {
            type: Array,
            default: () => [
                ['Source', '-', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromword', '-', 'Undo', 'Redo', '-', 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent'],
                '/',
                ['Table', 'HorizontalRule', '-', 'Styles', '-', 'Bold', 'Italic', 'Strike', '-', 'RemoveFormat', '-', 'Link', 'Unlink', 'Anchor', '-', 'Maximize']
            ]
        },
        language: {
            type: String,
            default: 'zh'
        },
        editLang: {
            type: String,
            default: ''
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
                    height: this.height
                }
                CKEDITOR.replace(ckeditorId, ckeditorConfig)
                this.instance.setData(this.value)
                this.instance.on('change', this.onChange)
                this.instance.on('mode', this.onMode)
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
                    // this.instance.removeListener('change')
                    // this.instance.removeListener('mode')
                    this.instance.destroy(true)
                    // CKEDITOR.remove(CKEDITOR.instances[this.id])
                    // console.log(CKEDITOR.constructor(this.id))
                    this.create()
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
