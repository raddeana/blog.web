<template>
    <div class="page-articles-list">
        <div class="article" v-for="item in items" :key="item.id">
            <div class="title">
                <div class="tags">
                    <div class="ui-tag breviary" 
                         v-for="tag in item.tags" 
                         :style="{ background: tag.color }">{{ tag.name }}</div>
                </div>         
                <router-link class="main" 
                             :to="{ name: 'article', params: { id: item.id }}" 
                             :title="item.title">
                    {{ item.title }}
                </router-link>                
                <p class="sub">
                    <a :href="'/user/' + item.author.id ">{{ item.author.nick }}</a> 
                    · 大约11小时之前
                </p>
            </div>
            <router-link class="img" 
                         :to="{ name: 'article', params: { id: item.id }}" 
                         :title="item.title" 
                         :style="{ 'background-image': 'url(' + ( item.figure.url || '/images/avatars/me.jpg' ) + ')' }">
            </router-link>                   
        </div>
    </div>
</template>

<style scoped>
    .article .img {
        background-repeat: no-repeat;
    }
</style>

<script>
    import axios from 'axios';

    export default {
        beforeMount () {
            this.$store.dispatch('disabledArticleRemove');
            this.$store.dispatch('disabledArticleEdit');
            this.$store.dispatch('disabledArticleBack');
        },
        mounted () {
            var self = this;

            axios.get('/api/content', { 
                type: 'article', 
                page_num: this.paging.page_num, 
                page_size: this.paging.page_size 
            }).then(function(res) {
                self.items = res.data.list;
            });      
        },        
        data() {
            return {
                paging: {
                    page_num: 1,
                    page_size: 24
                },
                items: []
            }
        }
    }
</script>
