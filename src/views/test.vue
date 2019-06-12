<template>
    <div>{{title}}
        <wiz-editor v-model="title"></wiz-editor>
    </div>
</template>

<script>
import WizEditor from '@/components/WizEditor'
export default {
    name: 'ckeditor4',
    components: {
        WizEditor
    },
    data() {
        return {
            content: 'asdfasdf'
        }
    },
    computed:{
        title:{
            get(){
                return this.content
            },
            set(val){
                this.content =val
            }
        }
    }
}
</script>
