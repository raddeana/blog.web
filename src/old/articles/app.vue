<template>
    <div class="content" v-scrollbar>
        <div class="articles">
            <router-view transition-mode="out-in"></router-view>
        </div>
        <div class="decorator">
            <div class="clouds white"></div>
            <div class="clouds gray"></div>
            <div class="clouds dark"></div>
        </div>
        <div class="toolbar">
            <ul class="toolbar-container" :class="{ 'active': openToolbar }">
                <li class="toolbar-item create">
                    <router-link v-bind:to="'/articles/create'">
                        <i class="glyphicon glyphicon-send"
                           title="创建">
                        </i>
                    </router-link>
                </li>
                <li class="toolbar-item edit" v-if="toolbarEditActive">
                    <i class="glyphicon glyphicon-pencil"
                       @click="onEdit()" 
                       title="编辑当前文章">
                    </i>
                </li>
                <li class="toolbar-item remove" v-if="toolbarDeleteActive">
                    <i class="glyphicon glyphicon-remove" 
                       @click="onRemove()" 
                       title="删除当前文章"></i>
                </li>
                <li class="toolbar-item back" v-if="toolbarBackActive">
                    <i class="glyphicon glyphicon-arrow-left"
                       @click="onBack()" 
                       title="后退">
                    </i>
                </li>
            </ul>
        </div>        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                openToolbar: false
            };
        },  
        computed: {
            toolbarEditActive () {
                return this.$store.state.navigation.ARTICLE_EDIT
            },
            toolbarDeleteActive () {
                return this.$store.state.navigation.ARTICLE_DELETE
            },
            toolbarBackActive () {
                return this.$store.state.navigation.ARTICLE_BACK
            }                        
        },      
        methods: {
            onToggleToolBar () {
                this.openToolbar = !this.openToolbar;
            },
            onRemove () {
                this.$http.delete('/api/content/' + this.$route.params.id).then(function(res) {
                    this.$router.go('/articles');
                });            
            },
            onEditArticle () {
                this.$store.dispatch('editArticle');
            },
            onViewArticle () {
                this.$store.dispatch('viewArticle');
            },
            onBack () {
                this.$router.back();
            }
        } 
    }
</script>