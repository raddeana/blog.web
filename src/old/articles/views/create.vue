<template>
    <div class="page-article-create">
        <div class="form-horizontal">
            <div class="form-group">
                <label class="col-sm-2 control-label">标题</label>
                <div class="col-sm-10">
                    <input type="email" 
                           class="form-control" 
                           placeholder="标题" 
                           v-model="title"/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">配图</label>
                <div class="col-sm-10" v-show="files.length === 0">
                    <uploader :ID="'uploader'"
                              :options="options" 
                              :files.sync="files"
                              :btn-content="btnContent">
                    </uploader>
                </div>
                <div class="col-sm-10" v-if="files.length > 0">
                    <div class="pic-preview" @click="onRemovePic()">
                        <img :src="files[0].url" height="117">
                    </div>
                </div>                
            </div>      
            <div class="form-group">
                <label class="col-sm-2 control-label">关键词</label>
                <div class="col-sm-10">
                    <input type="email" 
                           class="form-control" 
                           placeholder="关键词" 
                           v-model="keywords">
                </div>
            </div>                  
            <div class="form-group">
                <label class="col-sm-2 control-label">标签</label>
                <div class="col-sm-10">
                    <label class="checkbox-inline" v-for="tag in tags">
                        <input type="checkbox" v-model="tag.selected"/>
                        <div class="ui-tag" 
                             :style="{ background: tag.color }">{{ tag.name }}</div>
                    </label>               
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">内容</label>
                <div class="col-sm-10">
                    <editor :content.sync="content"></editor>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <label class="radio-inline" 
                           v-for="_auth in auths" 
                           :title="_auth.description">
                        <input type="radio" 
                               name="authority" 
                               :value="_auth.id" 
                               v-model="auth">&nbsp;{{ _auth.name }}
                    </label>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <div class="button blue save" @click="onSave()">
                        <div class="shine"></div>
                        保存
                    </div>
                </div>
            </div>
        </div>     
    </div>
</template>

<style scoped>
    .page-article-create {
        max-width: 1120px;
        padding-top: 45px;
        padding-bottom: 15px;
        margin: auto;
    }

    input[type=checkbox],
    input[type=radio] {
        margin-left: -17px;
        margin-top: 3px;      
    }

    @media screen and (max-width: 767px) {
        .save {
            width: 100%;
        }
    }    

    .pic-preview {
        float: left;
        position: relative;
        overflow: hidden;
    }

    .pic-preview img {
        min-width: 115px;
    }

    .pic-preview:after {
        content: "\5220\9664";    
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;    
        line-height: 110px;
        text-align: center;
        color: #fff;
        background: rgba(242, 148, 148, 0.7);
        font-size: 18px;
        border: 1px solid #D65353;
        transition: opacity 0.5s;
        -moz-transition: opacity 0.5s;
        -webkit-transition: opacity 0.5s;
        -o-transition: opacity 0.5s;
        display: block;
        opacity: 0;
        cursor: pointer;
    }

    .pic-preview:hover:after {
        opacity: 1;
    }
</style>

<script>
    import axios from 'axios';

    import editor from '../components/editor.vue'
    import uploader from '../components/uploader.vue'

    export default {
        components: {
            editor: editor,
            uploader: uploader
        },
        beforeMount () {
            this.$store.dispatch('disabledArticleRemove');
            this.$store.dispatch('disabledArticleEdit');
            this.$store.dispatch('activeArticleBack');
        },        
        mounted () {
            var self = this;

            axios.get('/api/tag').then(function (res) {
                self.tags = res.data.list;
            });

            axios.get('/api/auth', {resource: 'content'}).then(function(res) {
                self.auths = res.data.list;
                self.auth = self.auths[0].id;
            });

            this.title = '';
            this.content = '';

            this.keywords = '';

            if(this.auth.length > 0) {
                this.auth = this.auths[0].id;
            }
        },
        methods: {
            onSave: function() {
                if(!this.title || !this.content) {
                    return false;   
                }

                var tags = this.tags;
                var selectedTags = [];

                for(var i = 0, len = tags.length; i < len; i ++) {
                    var tag = tags[i];

                    if(tag.selected) {
                        selectedTags.push(tag.id);
                        delete tag.selected;
                    }
                }

                var data = {
                    title: this.title,
                    type: 'article',
                    content: this.content,
                    auth_id: this.auth,
                    user_id: 1,
                    tags: selectedTags,
                    keywords: this.keywords
                };

                if(this.files.length > 0) {
                    data.figure =  { 
                        id: this.files[0].id,
                        url: this.files[0].url
                    };
                }

                this.$http.post('/api/content', data).then(function() {
                    this.$router.go('/articles');
                });
            },
            onRemovePic: function() {
                this.$broadcast('EVENT:UPLOADER:REMOVE', this.files[0].uid);
            }
        },
        data () {
            return {
                title: '',
                content: '',
                auth: '',
                keywords: '',
                auths: [],
                tags: [],
                btnContent: '上传',
                options: {
                    fileVal: 'file',
                    runtimeOrder: 'html5',
                    prepareNextFile: true,
                    threads: 3,
                    chunked: true,            
                    chunkSize: 1024 * 1024,       
                    chunkRetry: 3,              
                    fileNumLimit: 1,     
                    fileSingleSizeLimit: 1024 * 1026 * 6,       
                    fileSizeLimit: 1024 * 1026 * 6,        
                    duplicate: false,           
                    server: '/api/file',
                    auto: true,
                    disableGlobalDnd: false,
                    accept: {
                        title: 'Images',
                        extensions: 'gif,jpg,jpeg,bmp,png',
                        mimeTypes: 'image/*'
                    }                         
                },
                uploadedFile: false,
                files: []
            }
        }
    }
</script>
