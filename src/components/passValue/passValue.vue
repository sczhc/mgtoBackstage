<template>
<div>
    <el-input v-model="word"></el-input>
    <el-button @click="update">更新</el-button>
    <p>子content: {{word}}</p>
</div>
</template>

<script>
export default {
    props: {
        value: ''
    },
    data() {
        return {
            word: ''
        }
    },
    methods: {
        update() {
            this.$emit('input', this.word)
        }
    },
    mounted() {
        this.word = this.value
    }
}
</script>

<style lang="scss" scoped>
.el-button {
    background-color: red;
}
.el-input {
    width: 300px;
}
</style>
