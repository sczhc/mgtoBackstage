<template>
<div class="dargFile">
    <div class="dargImg">
        <div class="img" v-if="imgs">
            <ul>
                <!-- <li class="img-slide" v-for="(item,index) in imgs" :key="`img-slide-${index}`">{{item.text}}</li> -->
                <li class="img-slide" v-for="(item,index) in imgs" :key="`img-slide-${index}`">
                    <div class="tools-top">
                        <b-button><i class="el-icon-edit"></i>編輯</b-button>
                    </div>
                    <img :src="item.url">
                    <div class="text-inner">
                        <div class="inner">{{item.name}}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="uploadArea" @click="handleClick">
        <input type="file" ref="input" multiple accept="accept" @change="handleChange">
        <div class="fileArea">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        // imgList: Array,
        accept: ''
    },
    data() {
        return {
            imgs: []
        }
    },
    methods: {
        handleClick() {
            this.$refs.input.click()
        },
        handleChange(event) {
            let files = this.$refs.input.files
            console.log(files)
            this.appendFile(files)
        },
        appendFile(files) {
            let file, url
            for (file of files) {
                url = window.URL.createObjectURL(file)
                this.imgs.push({
                    url: url,
                    name: file.name
                })
                console.log(this.imgs)
            }
        }
    },
    // created() {
    //     this.imgs = this.imgList
    // },
    mounted() {
        document.querySelector('.uploadArea').addEventListener('dragenter', (event) => {
            event.preventDefault()
        })
        document.querySelector('.uploadArea').addEventListener('dragover', (event) => {
            event.preventDefault()
        })
        document.querySelector('.uploadArea').addEventListener('drop', (event) => {
            event.stopPropagation()
            event.preventDefault()
            let files = event.dataTransfer.files
            this.appendFile(files)
        })
    }
}
</script>

<style lang="scss">
.dargFile {
    display: flex;
    flex-wrap: wrap;

    .dargImg {
        img {
            width: 150px;
            height: 150px;
        }

        ul {
            display: inline-flex;
            flex-wrap: wrap;

            li {
                margin: 0 10px;
                cursor: pointer;
                position: relative;

                &:hover {
                    .tools-top {
                        top: 0;
                    }
                }
            }
        }

        .tools-top {
            position: absolute;
            transition: all 0.2s ease;
            height: 28px;
            left: 0;
            right: 0;
            top: -30px;
            bottom: auto;
            text-align: center;
            z-index: 1;
            background-color: rgba(0, 0, 0, 0.55);

            .btn {
                font-size: 12px;
                margin: 0;
                padding: 4px;
                background-color: #6FB3E0;
                border-color: #6FB3E0;
                border-width: 2px;

                &:hover {
                    background-color: #4F99C6;
                }
            }
        }

        .text-inner {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            color: #FFF;
            background-color: rgba(0, 0, 0, 0.55);

            .inner {
                display: inline-block;
                padding: 4px 0;
                margin: 0;
                max-width: 90%;
            }
        }
    }

    .fileArea {
        width: 300px;
        height: 150px;
        text-align: center;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        background-color: #fff;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        box-sizing: border-box;

        .el-icon-upload {
            font-size: 60px;
            color: #c0c4cc;
            margin: 20px 0 15px;
        }

        .el-upload__text {
            text-align: center;
            color: #606266;
            font-size: 14px;

            em {
                color: #409eff;
                font-style: normal;
            }
        }
    }
}

input {
    display: none;
}
</style>
