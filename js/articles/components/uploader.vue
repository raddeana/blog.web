<template>
    <div class="ui-uploader-wrapper">
        <button class="button green ui-uploader" :class="className">
            <span class="shine"></span>
            <span :id="ID">{{ btnContent }}</span>
        </button>
        <div class="ui-uploader-dnd">拖拽文件上传</div>
    </div>
</template>
 
<style scoped>
    .ui-uploader {
        margin-top: 0px;
        padding: 0px;
        width: 80px;
        height: 39px;
        line-height: 34px;        
    }

    .ui-uploader.button .shine{
        top: -1px;
        left: 3px;
        width: 30px;    
    }

    .ui-uploader.button:hover .shine{
        left: 47px;
    }

    .ui-uploader .webuploader-element-invisible {
        position: absolute;
        clip: rect( 1px, 1px, 1px, 1px );
    }    

    .ui-uploader-dnd {
        width: 100%;
        margin-top: 15px;
        border: 1px dashed #737373;
        border-radius: 1px;
        line-height: 75px;
        text-align: center;
        font-size: 16px;
        color: #585858;
    }


    @media screen and (max-width: 767px) {
        .ui-uploader {
            width: 100%;
        }
    }    
</style>

<script>
    var thumbMap = {
        jpg: '',
        gif: '',
        jpeg: '',
        png: '',
        zip: '//libs/webuploader/attachmentIcons/icon_zip.png',
        rar: '/libs/webuploader/attachmentIcons/icon_rar.png',
        rm: '/libs/webuploader/attachmentIcons/icon_avi.png',
        rmvb: '/libs/webuploader/attachmentIcons/icon_avi.png',
        mpeg1: '/libs/webuploader/attachmentIcons/icon_avi.png',
        mpeg4: '/libs/webuploader/attachmentIcons/icon_avi.png',
        mov: '/libs/webuploader/attachmentIcons/icon_avi.png',
        mtv: '/libs/webuploader/attachmentIcons/icon_avi.png',
        dat: '/libs/webuploader/attachmentIcons/icon_avi.png',
        wmv: '/libs/webuploader/attachmentIcons/icon_avi.png',
        avi: '/libs/webuploader/attachmentIcons/icon_avi.png',
        '3gp': '/libs/webuploader/attachmentIcons/icon_avi.png',
        amv: '/libs/webuploader/attachmentIcons/icon_avi.png',
        dmv: '/libs/webuploader/attachmentIcons/icon_avi.png',
        flv: '/libs/webuploader/attachmentIcons/icon_avi.png',
        css: '/libs/webuploader/attachmentIcons/icon_avi.png',
        csv: '/libs/webuploader/attachmentIcons/icon_csv.png',
        html: '/libs/webuploader/attachmentIcons/icon_html.png',
        mp3: '/libs/webuploader/attachmentIcons/icon_mp3.png',
        pdf: '/libs/webuploader/attachmentIcons/icon_pdf.png',
        ppt: '/libs/webuploader/attachmentIcons/icon_ppt.png',
        raw: '/libs/webuploader/attachmentIcons/icon_raw.png',
        tif: '/libs/webuploader/attachmentIcons/icon_tif.png',
        txt: '/libs/webuploader/attachmentIcons/icon_txt.png',
        wav: '/libs/webuploader/attachmentIcons/icon_wav.png',
        doc: '/libs/webuploader/attachmentIcons/icon_doc.png',
        docx: '/libs/webuploader/attachmentIcons/icon_doc.png',
        dot: '/libs/webuploader/attachmentIcons/icon_doc.png',
        dotx: '/libs/webuploader/attachmentIcons/icon_doc.png',
        docm: '/libs/webuploader/attachmentIcons/icon_doc.png',
        xlsx: '/libs/webuploader/attachmentIcons/icon_xls.png',
        xls: '/libs/webuploader/attachmentIcons/icon_xls.png',
        xlt: '/libs/webuploader/attachmentIcons/icon_xls.png',
        xla: '/libs/webuploader/attachmentIcons/icon_xls.png',
        xlw: '/libs/webuploader/attachmentIcons/icon_xls.png',
        unidentified: '/libs/webuploader/image/file.png'
    };

    export default {
        props: ['files', 'options', 'ID', 'className', 'btnContent'],
        mounted () {
            var self = this;

            var options = {
                method: 'POST',
                fileVal: self.options.fileVal,
                runtimeOrder: self.options.runtimeOrder,
                prepareNextFile: self.options.prepareNextFile,
                threads: self.options.threads,
                chunked: self.options.chunked,            
                chunkSize: self.options.chunkSize,       
                chunkRetry: self.options.chunkRetry,              
                fileNumLimit: self.options.fileNumLimit,     
                fileSingleSizeLimit: self.options.fileSingleSizeLimit,       
                fileSizeLimit: self.options.fileSizeLimit,        
                duplicate: self.options.duplicate,
                pick: '#' + self.ID,             
                server: self.options.server,
                auto: self.options.auto,
                disableGlobalDnd: self.options.disableGlobalDnd,
                accept: {
                    title: self.options.accept.title,
                    extensions: self.options.accept.extensions,
                    mimeTypes: self.options.accept.mimeTypes
                },
                formData: self.options.formData,
                dnd: self.options.dnd       
            };

            // 初始化控件
            var uploader = WebUploader.create(options);

            // 当有文件被添加进队列的时候
            uploader.on('fileQueued', function (file) {
                var src = file.src;
                var ext = file.ext.replace(".", "");

                if (ext == "jpg" || ext == "gif" || ext == "jpeg" || ext == "png") { 
                    uploader.makeThumb(file, function(error, ret) {
                        if(!error) {
                            self.setThumb(file, ret)
                        }
                    });

                    file.thumb = thumbMap['unidentified'];
                } else {
                    var thumb = thumbMap[ext];
                    file.thumb = thumb ? thumb : thumbMap['unidentified'];
                }

                file.__hash = file.__hash || (file.__hash = file.name + file.size + file.lastModifiedDate );
                file.file_dna = file.__hash;
            });

            // 文件上传过程中
            uploader.on('uploadProgress', function (file, percentage) {
                file.percentage = percentage;
            });   

            // 文件上传失败
            uploader.on('uploadError', function (file, reason, res) {

            }); 

            // 文件上传成功
            uploader.on('uploadSuccess', function (file, response) {
                response.uid = file.id;
                self.files.push(response);
            });    

            uploader.on('error', function(type, file) {
                var msg = '';

                switch(type) {
                    case 'Q_EXCEED_NUM_LIMIT':
                        msg = '上传文件数量超出限制';
                        break;
                    case 'Q_EXCEED_SIZE_LIMIT':
                        msg = '上传文件大小超出限制';   
                        break;
                    case 'F_EXCEED_SIZE':
                        msg = '上传文件大小超出限制';
                        break;
                    case 'F_DUPLICATE':
                        msg = '文件类型重复';
                        break;
                    case 'Q_TYPE_DENIED':
                        var size = file.size;

                        if(size == 0) {
                            msg = '不可以上传空文件';
                        } else {
                            msg = '不支持该文件类型';
                        }

                        break;          
                    default:
                        msg = '未知错误';
                        break;                                 
                }

            });

            uploader.on("uploadBeforeSend", function (obj, data, headers) {
                var file = obj.file;

                if(self.options.headers) {
                    for(var key in self.options.headers.$model) {
                        headers[key] = self.options.headers.$model[key];
                    }               
                }
            });

            self.$on('EVENT:UPLOADER:REMOVE', function(id) {
                var files = self.files;

                if(id === true) {
                    for(var i = 0, len = files.length; i < len ; i ++) {
                        uploader.removeFile(files[i].uid, true);        
                    }

                    self.files = [];  
                } else {
                    for(var i = 0, len = files.length; i < len ; i ++) {
                        var _id = files[i].uid;
                        
                        if(_id == id) {
                            self.$http.delete('/api/file/' + files[i].id).then(function() {
                                uploader.removeFile(id, true);
                                self.files = files.splice(i, 1);  
                            });                      
                        }
                    }
                }
            });            
        },
        methods : {
            setThumb(file, ret) {

            }
        },
        data () {
            return {  
            }
        }
    }
</script>