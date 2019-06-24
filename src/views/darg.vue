<template>
    <div class="darg">
        <darg-file :imgList="imgList"></darg-file>
    </div>
</template>

<script>
import DargFile from '@/components/DargFile';
export default {
    components: {
        DargFile
    },
    data() {
        return {
            imgList: [
                {name:'img1',text:'img1'},
                {name:'img2',text:'img2'},
                {name:'img3',text:'img3'}
            ]
        }
    }
}
</script>

<style lang="scss">
.darg {
    
}
</style>

