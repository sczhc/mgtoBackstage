<template>
    <div class="file_upload">
        <div class="drag_file" @click="handleClick">
            <i class="el-icon-upload"></i>
            <div class="file-text">将文件拖到此处，或<em>点击上传</em></div>
            <input type="file" name="file" multiple="multiple" refs="inputFile" class="file-upload_input">
        </div>
    </div>
</template>

<script>
export default {
    name:'InputFile',
    methods: {
        handleClick() {
            this.$refs.inputFile.onclick
        }
    }
}
</script>

