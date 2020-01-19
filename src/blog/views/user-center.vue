<template>
    <div class="page-user-center">
        <el-row>
            <el-col :span="8">
                <div class="user-info-panel">
                    <el-avatar
                        shape="square"
                        :size="size"
                        :src="squareUrl"
                    />
                </div>
            </el-col>
            <el-col :span="16">
                <el-form ref="userInfoForm" :model="userInfoForm" label-width="120px">
                    <el-form-item label="用户名">
                        <span>{{ userInfo.username }}</span>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="男" value="shanghai"></el-option>
                            <el-option label="女" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="生日">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择生日" v-model="form.date1" />
                        </el-col>
                    </el-form-item>
                    <el-form-item>

                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleSubmit">提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<script>
export default {
    name: 'home',
    data () {
        return {
            userInfoForm: {},
            userInfo: {}
        }
    },
    /**
     * @Hook
     */
    created () {
        this.getUserInfo()
    },
    methods: {
        /**
         * 获取用户信息
         * @return void
         */
        getUserInfo () {

        },

        /**
         * 提交
         * @EventHandler
         */
        handleSubmit () {

        }
    }
}
</script>
