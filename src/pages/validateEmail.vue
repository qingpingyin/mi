<template>
    <div class="validate-email">
        <div class="validate-email-content">
            <p>{{message}}</p>
        </div>
    </div>
</template>

<script>
    import {validateEmail} from "@/api/user";

    export default {
        name: "validateEmail",
        data() {
            return {
                token: this.$route.query.token,
                message: '正在绑定/解绑邮箱，请稍候...'
            }
        },
        methods:{
            async validate(){
               await validateEmail({
                   "token":this.token,
                }).then(()=>{
                   setInterval(()=>{
                       this.message = "绑定/解绑邮箱成功"
                       this.$router.push({
                           name: 'self'
                       })
                   },3000)
               })
            }
        },
        mounted() {
            this.validate()
        }

    }
</script>

<style scoped lang="scss">
    .validate-email{
        height: 700px;
        display: flex;
        align-items: center;
        .validate-email-content{
            width: 500px;
            margin: 0 auto;
            text-align: center;
        }
    }
</style>
