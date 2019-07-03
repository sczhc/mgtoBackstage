<template>
<div>
    <PassValue :value="content" @input="setValue"></PassValue>
    <p>父content : {{content}}</p>
</div>
</template>

<script>
import PassValue from '@/components/passValue'
export default {
    name: 'passValue',
    components: {
        PassValue
    },
    data() {
        return {
            content: 'asdfasdf'
        }
    },
    methods: {
        setValue(val) {
            this.content = val
        }
    }
}
</script>
