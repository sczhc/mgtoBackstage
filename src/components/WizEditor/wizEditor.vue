<template>
<div class="wizEditor">
    <!-- <vue-ueditor-wrap v-model="msg"></vue-ueditor-wrap> -->
    <vue-ueditor-wrap ref="ueditor" v-model="msg" :config="config"></vue-ueditor-wrap>
</div>
</template>

<script>
export default {
    data() {
        return {
            msg: '',
            config: {
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 240,
                // 初始容器宽度
                initialFrameWidth: '100%',
                toolbars: [
                    ['fullscreen', 'source', '|','pasteplain', 'undo', 'redo','insertorderedlist','insertunorderedlist', '|','inserttable', 'horizontal','|','fontfamily','|'],
                    ['bold','italic','strikethrough','removeformat','link','unlink','anchor']
                ]
            }
        }
    }
}
</script>
