<template>
<div class="darg">
    <darg-file :newLang="dargLang"></darg-file>
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
            imgList: [{
                    name: 'img1',
                    text: 'img1'
                },
                {
                    name: 'img2',
                    text: 'img2'
                },
                {
                    name: 'img3',
                    text: 'img3'
                }
            ],
            dargLang: [{
                    value: 'zh_TW',
                    text: '繁體中文',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'zh_CN',
                    text: '简体中文',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'pt_PT',
                    text: 'Português',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'en',
                    text: 'English',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'jp',
                    text: '日本語',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'kr',
                    text: '한국어',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'th',
                    text: 'ภาษาไทย',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'my',
                    text: 'Bahasa Malaysia',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'id',
                    text: 'Bahasa Indonesia',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'de',
                    text: 'Deutsch',

                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'fr',
                    text: 'Français',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'es',
                    text: 'Español',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'it',
                    text: 'Italiano',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'ru',
                    text: 'Pусский',
                    content: {
                        title: '',
                        summary: ''
                    }
                },
                {
                    value: 'ae',
                    text: 'عربي',
                    content: {
                        title: '',
                        summary: ''
                    }
                }
            ]
        }
    }
}
</script>
