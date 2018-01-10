<template>
    <div class="page-article">
        <div class="view-mode" v-if="currentView === 'view'">
            <div class="article-view container-fluid">
                <h3 class="title">{{ data.title }}</h3>
                <i class="glyphicon glyphicon-heart" :class="{'active': stared}"></i>
                <div class="tags">
                    <span class="update-at">发布于2013年11月10日，星期日，23:20</span>
                    <div class="ui-tag" 
                         v-for="tag in data.tags"
                         :style="{ background: tag.color }"
                         :title="tag.description">{{ tag.name }}</div>
                </div>            
                <img class="figure" v-if="data.figure" :src="data.figure.url"/>
                <div class="content" v-html="data.content"></div>
            </div>
            <message :data="messages"></message>
        </div>
        <div class="edit-mode" v-if="currentView === 'edit'">
            <div class="article-edit">
                <div class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">标题</label>
                        <div class="col-sm-10">
                            <input type="email" 
                                   class="form-control" 
                                   placeholder="标题" 
                                   v-model="edit.title"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">配图</label>
                        <div class="col-sm-10" v-show="edit.files.length === 0">
                            <uploader :options="options" 
                                      :files.sync="edit.files" 
                                      :ID="'uploader'" 
                                      :btn-content="edit.btnContent">
                            </uploader>
                        </div>
                        <div class="col-sm-10" v-if="edit.files.length > 0">
                            <div class="pic-preview" @click="onRemovePic()">
                                <img :src="edit.files[0].url" height="117">
                            </div>
                        </div>                
                    </div>      
                    <div class="form-group">
                        <label class="col-sm-2 control-label">关键词</label>
                        <div class="col-sm-10">
                            <input type="email" 
                                   class="form-control" 
                                   placeholder="关键词" 
                                   v-model="edit.keywords">
                        </div>
                    </div>                  
                    <div class="form-group">
                        <label class="col-sm-2 control-label">标签</label>
                        <div class="col-sm-10">
                            <label class="checkbox-inline" v-for="tag in tags">
                                <input type="checkbox" 
                                       v-model="tag.selected"/>
                                <div class="ui-tag" 
                                     :style="{ background: tag.color }">{{ tag.name }}</div>
                            </label>               
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">内容</label>
                        <div class="col-sm-10">
                            <editor :content.sync="edit.content"></editor>
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
                                       v-model="edit.auth">&nbsp;{{ _auth.name }}
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                            <div class="button blue save" @click="onSave()">
                                <div class="shine"></div>
                                保存
                            </div> 

                            <div class="button red cancel" @click="onCancel()">
                                <div class="shine"></div>
                                取消
                            </div>                   
                        </div>
                    </div>
                </div>     
            </div>        
        </div>
    </div>
</template>

<style scoped>
    .article-view {
        position: relative;
        padding: 15px;
        border: 1px solid #E3E2E2;    
        background: #fff;
        border-radius: 1px;
    }

    .article-view .glyphicon {
        position: absolute;
        color: #FFC107;
        font-size: 18px;
        right: 15px;
        top: 18px;
        cursor: pointer;
    }

    .article-view .title {
        font-size: 18px;
        margin-top: 0px;
    }

    .article-view .figure {
        max-width: 100%;
        max-height: 325px;
        margin-top: 25px;
        display: block;        
    }

    .article-view .update-at {
        font-size: 12px;
    }
    
    .article-view .content {
        margin: 25px 20px 0px 0px;
        width: auto;    
    }

    .article-edit {
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
        .save,
        .cancel {
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

    .tags {
        overflow: hidden;
        margin-top: 10px;
    }
</style>

<script>
    import axios from 'axios';

    import editor from '../components/editor.vue'
    import cont from '../components/content.vue'
    import message from '../components/message.vue'
    import uploader from '../components/uploader.vue'

    export default {
        components: {
            editor: editor,
            cont: cont,
            message: message,
            uploader: uploader
        },
        beforeMount () {
            this.$store.dispatch('activeArticleRemove');
            this.$store.dispatch('activeArticleEdit');
            this.$store.dispatch('activeArticleBack');
        },
        mounted () {
            var self = this;

            axios.get('/api/tag').then(function (res) {
                self.tags = res.data.list;

                for(var i = 0, len1 = self.tags.length; i < len1; i ++) {
                    var tag = self.tags[i];
                    tag.selected = false;

                    for(var j = 0, len2 = self.data.tags.length; j < len2; j ++) {
                        var _tag = self.data.tags[j];

                        if(_tag.id === tag.id) {
                            tag.selected = true;
                        }
                    }
                }                
            });

            axios.get('/api/auth', {resource: 'content'}).then(function (res) {
                self.auths = res.data.list;
            });

            axios.get('/api/content/' + self.$route.params.id).then(function (res) {
                if(!res.data) {
                    self.$router.go('/articles');
                }

                self.data = res.data;
            });              
        },
        methods: {
            onStar () {

            },
            onSave: function() {
                if(!this.edit.title || !this.edit.content) {
                    return false;   
                }

                var tags = this.tags;
                var selected = [];

                for(var i = 0, len = tags.length; i < len; i ++) {
                    var tag = tags[i];

                    if(tag.selected) {
                        selected.push(tag.id);
                        delete tag.selected;
                    }
                }

                var data = {
                    title: this.edit.title,
                    auth_id: this.edit.auth ,
                    content: this.edit.content,
                    tags: selected,
                    keywords: this.edit.keywords
                };

                if(this.edit.files.length > 0) {
                    data.figure =  { 
                        id: this.edit.files[0].id,
                        url: this.edit.files[0].url
                    };
                } else {
                    data.figure = null;
                }

                this.$http.put('/api/content/' + this.data.id, data).then( function (res) {
                    this.data = res.data;
                    this.currentView = 'view';
                });
            },
            onRemovePic: function() {
                if(this.edit.files[0].uid) {
                    this.$broadcast('EVENT:UPLOADER:REMOVE', this.edit.files[0].uid);
                } else {
                    this.edit.files = [];
                }
            },
            onCancel: function() {
                this.currentView = 'view';
            }
        },
        data() {
            return {
                stared: '',
                currentView: 'view',
                messages: [],
                data: {
                    figure: {},
                    tags: [],
                    messages: [],
                    auth: {},
                    title: '',
                    keywords: '',
                    content: ''
                },
                tags: [],
                auths: [],
                edit: {
                    title: '',
                    content: '',
                    auth: '',
                    keywords: '',
                    auth: '',
                    btnContent: '上传',
                    uploadedFile: false,
                    files: []
                },
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
                pager: {
                    page_num: 1, 
                    page_size: 24
                }
            };
        }
    }
</script>
