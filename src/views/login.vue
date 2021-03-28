<template>
<div class="login-page">
    <div class="login-panel">
        <el-form ref="loginForm" :model="loginFormData" :rules="loginFormRules" label-width="80px">
            <el-form-item label="用户名：" prop="username">
                <el-input v-model="loginFormData.username" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input v-model="loginFormData.password" placeholder="请输入" />
            </el-form-item>
            <div class="el-form-actions">
                <el-button type="primary" @click="onSubmit">登录</el-button>
            </div>
        </el-form>
    </div>
</div>
</template>
<style lang="scss" scoped>
.login-panel {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 24vh;
    padding: 30px 10px 15px 10px;
    width: 35%;
    border: 1px solid #409eff;
    border-radius: 3px;

    .el-form-actions {
        text-align: right;
    }
}
</style>
<script>
export default {
    data: function () {
        return {
            loginFormData: {
                username: '',
                password: ''
            },
            loginFormRules: {
                username: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'change'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'change'
                }]
            }
        };
    },
    methods: {
        /**
         * 登录
         * @return {void}
         */
        onSubmit () {
            this.$refs.loginForm.validate(function (valid) {
                if (valid) {

                }
            });
        }
    }
}
</script>