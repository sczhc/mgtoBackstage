<template>
<div class="wizEditor">
    <textarea :id="id" :value="value"></textarea>
</div>
</template>

<script>
const CKEDITOR = window.CKEDITOR

if (!CKEDITOR)
    throw new Error('ckeditor cannot locate!!!')

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
        extraplugins: {
            type: String,
            default: ''
        },
        editorLang: {
            type: String,
            default: ''
        },
        startupMode: {
            type: String,
            default: 'wysiwyg'
        }
    },
    beforeUpdate() {
        const ckeditorId = this.id;
        if (this.value !== CKEDITOR.instances[ckeditorId].getData()) {
            CKEDITOR.instances[ckeditorId].setData(this.value)
        }
    },
    mounted() {
        const ckeditorId = this.id
        const ckeditorConfig = {
            toolbar: this.toolbar,
            language: this.language,
            height: this.height,
            extraplugins: this.extraplugins,
            startupMode: this.startupMode
        }
        CKEDITOR.replace(ckeditorId, ckeditorConfig)
        CKEDITOR.instances[ckeditorId].setData(this.value)
        CKEDITOR.instances[ckeditorId].on('change', () => {
            let ckeditorData = CKEDITOR.instances[ckeditorId].getData()
            if (ckeditorData !== this.value) {
                let ckValue = {
                    editorLang: this.editorLang,
                    ckeditorData: ckeditorData
                }
                this.$emit('input', ckValue)
            }
        })
    },
    destroyed() {
        const ckeditorId = this.id
        if (CKEDITOR.instances[ckeditorId])
            CKEDITOR.instances[ckeditorId].destroy()
    }
}
</script>
