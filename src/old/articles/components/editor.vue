<template>
    <div class="ckeditor" id="editor"></div>
</template>
<style scoped>
    .editor {
        color: #333;
    }

    .editor-container {
        border-radius: 1px;
        box-shadow: none;
    }
</style>
<script>
    export default {
        props: ['content'],
        mounted () {
            var self = this;
            var editor = CKEDITOR.replace('editor');

            editor.setData(this.content);

            this.$watch('content', function (nv, ov) {
               editor.setData(nv);
            });

            this.$on('EVENT:EDITOR:SYNC', function() {
               this.content = editor.getData();
            });

            editor.on('instanceReady', function () {
                
            });
        }
    }
</script>