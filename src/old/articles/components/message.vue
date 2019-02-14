<template>
    <div class="message-container container-fluid">
        <div class="panel panel-default">
            <div class="panel-heading">留言</div>
            <div class="panel-body">
                <textarea class="form-control" rows="3"></textarea>
                <div class="button submit" @click="onSubmit()">
                    <div class="shine"></div>
                    提交留言
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .message-container {
        margin-top: 25px;
        padding: 0;
    }

    .panel-heading {
        border-top-left-radius: 1px;
        border-top-right-radius: 1px;
    } 

    .panel-heading {
        padding: 0;
        line-height: 28px;
        text-indent: 25px;
        color: #fff;
        background: #4F6275;    
    }

    .panel-body {
        border-top-bottom-radius: 1px;
        border-top-bottom-radius: 1px;
    }

    .submit {
        float: right;
    }
</style>
<script>
    export default {
        props: ['data'],
        data() {
            return {
                authenticating: false
            }
        }
    }
</script>