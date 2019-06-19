<template>
<div class="file_upload">
    <el-upload class="upload-demo" :on-success="uploadSuccess" :show-file-list="false" accept="image/jpeg,image/jpg,image/png,pdf" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
</div>
</template>

<script>
export default {
    name: 'InputFile',
    methods: {
        uploadSuccess(response, file, fileList) {
            console.log(file, fileList)
        }
    }
}
</script>
