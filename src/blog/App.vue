<template>
    <div class="wrapper">
        <div class="header">
            <img src="https://raddeana-materials.oss-cn-hangzhou.aliyuncs.com/images/logo.png" />
            <h4 class="title">Raddeana</h4>
            <el-menu
                class="navigation"
                default-active="article"
                mode="horizontal"
                @open="handleOpen"
                @close="handleClose"
                background-color="#FFC107"
                text-color="#fff"
                active-text-color="#ffd04b"
            >
                <el-menu-item index="article">
                    <i class="el-icon-menu"></i>
                    <span slot="title">文章</span>
                </el-menu-item>
                <el-menu-item index="project">
                    <i class="el-icon-document"></i>
                    <span slot="title">项目计划</span>
                </el-menu-item>
                <el-menu-item index="event">
                    <i class="el-icon-setting"></i>
                    <span slot="title">事件</span>
                </el-menu-item>
            </el-menu>
            <el-dropdown class="actions">
                <span class="el-dropdown-link">
                    已登录<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>用户中心</el-dropdown-item>
                    <el-dropdown-item>登出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .wrapper {
        position: fixed;
        height: 100%;
        width: 100%;
        left: 0;
        right: 0;

        .header {
            position: relative;
            height: 48px;
            padding: 0 15px;
            display: flex;
            flex-direction: row;
            background: #FFC107;

            .actions {
                position: absolute;
                right: 15px;
                top: 15px;

                .el-dropdown-link {
                    color: #fff;
                    cursor: pointer;
                }
            }

            img {
                width: 36px;
                height: 36px;
                margin: 5px 0 0 0;
                border-radius: 36px;
                border: 1px solid #b7566d;
            }

            .title {
                margin: 0 0 0 10px;
                font-size: 16px;
                color: #fff;
                line-height: 45px;
                font-weight: normal;
            }

            .navigation {
                display: flex;
                margin: 0 0 0 95px;

                .el-menu-item {
                    height: 48px;
                    line-height: 46px;

                    i {
                        color: #fff;
                    }

                    &.is-active {
                        background: rgb(204, 154, 6)!important;

                        i {
                            color: #ffd04b;
                        }
                    }
                }
            }
        }

        .content {
            position: relative;
        }
    }
</style>
