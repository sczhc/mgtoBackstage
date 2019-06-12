<template>
<div class="wizEditor">{{value }}
    <textarea :id="id" :value="value"></textarea>
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
        extraPlugins: {
            type: String,
            default: ''
        },
        // editorMult: {
        //     type: Object,
        //     default: () => {}
        // },
        // types: {
        //     type: String,
        //     default: ''
        // },
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
        // this.create()
    },
    methods: {
        create() {
            if (!CKEDITOR) {
                throw new Error('ckeditor cannot locate!!!')
            } else {
                const ckeditorId = this.id
                console.log(ckeditorId)
                const ckeditorConfig = {
                    toolbar: this.toolbar,
                    language: this.language,
                    height: this.height,
                    extraPlugins: this.extraPlugins,
                }
                CKEDITOR.replace(ckeditorId, ckeditorConfig)
                this.instance.setData(this.value)
                // this.instance.on('change', this.onChange)
                this.instance.on('mode', this.onMode)
            }
        },
        onMode() {
            if (this.instance.mode === 'source') {
                let editable = this.instance.editable()
                editable.attachListener(editable, 'input', () => {
                    // this.onChange()
                })
            }
        },
        onChange() {
            let ckeditorData = this.instance.getData()
            if (ckeditorData !== this.value) {
                // let ckValue = {
                //     editorLang: this.editorMult.editorLang,
                //     ckeditorData: ckeditorData
                // }
                // this.$emit('input', ckValue)

                this.$emit('input', ckeditorData)
                console.log("111", ckeditorData)
                return
            }
        }
    },
    watch: {
        'id': {
            handler(n, o) {
                console.log(n,o)
                if (n !== o) {
                    CKEDITOR.instances[o].destroy();
                    this.create();
                }
            },
            immediate:true
        }
    },
    destroyed() {
        if (this.instance)
            this.instance.destroy()
    }
}
</script>
