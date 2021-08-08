<template>
    <div class="user-detail">
        <div class="user-card">
            <el-upload
                class="avatar-uploader"
                action
                :before-upload="BeforeUpload"
                :http-request="UploadRequest"
                :show-file-list="false"
                :on-change="onChangeFile">
                <img v-if="avatar" :src="avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <div class="tip">
            <p>点击上传头像,只能上传png/jpg文件,且不超过2M</p>
        </div>
        <div class="nike-name">
            <span>昵称:</span><input v-model="nike_name">
        </div>
        <div class="user-name">
            <span>用户名:</span><input v-model="real_name">
        </div>
        <button @click="save()">保存</button>
    </div>
</template>

<script>
    import {avatarUpload} from "@/api/upload";
    import {updateUser} from "@/api/user";
    export default {
        name: "Account",
        data() {
            return{
                uid: this.$route.query.id,
                nike_name:'',
                real_name:'',
                avatar:''
            }
        },
        methods: {
            async save(){
                await updateUser({
                    "uid":this.uid,
                    "nike_name":this.nike_name,
                    "real_name":this.real_name
                }).then(()=>{
                    this.$store.dispatch("user/getUserInfo")
                })
            },
            onChangeFile(file){
                this.avatar = URL.createObjectURL(file.raw);
            },
            BeforeUpload(file) {
                const isPNG = file.type === 'image/png' || file.type === 'image/jpeg'
                const isLt2M = file.size / 1024 / 1024 < 2
                if (!isPNG) {
                    this.$message.error('上传头像图片只能是 PNG/JPG 格式!')
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!')
                }
                return isPNG && isLt2M
            },
            async UploadRequest(option) {
                let fd =new FormData();
                fd.append('file',option.file)
                await avatarUpload(fd).then(()=>{
                    this.$store.dispatch("user/getUserInfo")
                })
            },
        },
        computed:{
        },
        components: {
        },
        async beforeMount() {
            this.nike_name = this.$store.getters.user.nike_name
            this.real_name = this.$store.getters.user.real_name
            this.avatar = this.$store.getters.user.avatar
        }
    }
</script>

<style scoped lang="scss">
    .user-detail{
        float: left;
        .user-card{
            position: relative;
            width: 178px;
            height: 178px;
            padding-left: 100px;
            padding-top: 40px;

            .avatar-uploader,.el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 100%;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                &:hover{
                    border-color: #ff6700;
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
                    border-radius: 100%;
                    display: block;
                }
            }

        }
        .tip{
            margin:20px 100px;
            p{
                font-size: 12px;
                color: #757575;
            }
        }
        .nike-name,.user-name{
            padding-left: 80px;
            margin: 20px 20px;
            span{
                display: inline-block;
                width: 60px;
                margin-right: 8px;
                font-size: 15px;
            }
            input{
                display: inline-block;
                border:1px solid #757575 ;
                &:hover{
                    border:1px solid #f25807;
                }
            }
        }
        button{
            margin-left: 305px;
        }
    }
</style>
