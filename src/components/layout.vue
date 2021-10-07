<template>
<el-header>
    <div class="blog-title">
        <img class="logo" src="https://raddeana-materials.oss-cn-hangzhou.aliyuncs.com/images/logo.png" />
        <h4 class="blog-name">Raddeana</h4>
    </div>
    <div class="login-user">
        <el-dropdown @command="handleUserOperation">
            <span class="el-dropdown-link">Philip<i class="el-icon-arrow-down el-icon--right" /></span>
            <template #dropdown>
                <el-dropdown-menu @command="handleUserOperation">
                    <el-dropdown-item icon="el-icon-edit-outline">修改密码</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-circle-close">登出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</el-header>
<el-container>
    <el-aside width="220px">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
        >
            <el-sub-menu index="1">
                <template #title>
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                </template>
                <el-menu-item-group>
                    <template #title>分组一</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="1">
                <template #title>
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                </template>
                <el-menu-item-group>
                    <template #title>分组一</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </el-aside>
    <el-main>
        <router-view v-slot="{ Component }">
            <keep-alive :include="tagNames">
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </el-main>
</el-container>
</template>
<style lang="scss" scoped>
.el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #efefef;
    line-height: 60px;
    background: #18355e;

    .blog-title {
        display: flex;
        align-items: center;

        .logo {
            width: 45px;
            height: 45px;
        }

        .blog-name {
            color: #aa2241;
            font-size: 18px;
            margin: 0 0 0 15px;
        }
    }

    .login-user {
        .el-dropdown-menu {
            background: transparent;
        }

        .el-dropdown-link {
            cursor: pointer;
            color: #fff;
        }

        .el-icon-arrow-down {
            font-size: 12px;
        }

        .el-dropdown-menu__item {
            text-align: left;
        }
    }
}

.el-container {
    height: calc(100% - 60px);

    .el-menu {
        height: 100%;
    }
}
</style>
<script>
export default {
    name: 'layout',
    watch: {
        $route: function () {
            let tags = this.$store.state.tags.data.filter(({ name }) => {
                return this.$route.name === name
            })

            if (!tags.length) {
                this.$store.state.tags.data.push(this.$route);
            }
        }
    },
    computed: {
        tags: function () {
            return this.$store.state.tags.data;
        },
        tagNames: function () {
            let tagNames = this.$store.state.tags.data.map(({ name }) => {
                return name;
            });

            return tagNames;
        }
    },

    methods: {
        /**
         * 用户操作
         * @return {void}
         */
        handleUserOperate () {

        }
    },
    /**
     * @Hook
     */
    mounted () {
        this.$store.state.tags.data.push(this.$route);
    }
}
</script>
