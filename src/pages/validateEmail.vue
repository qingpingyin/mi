<template>
    <div class="validate-email">
        <div class="validate-email-content">
            <p>{{message}}</p>
        </div>
    </div>
</template>

<script>
    import {validateEmail} from "../api/user";

    export default {
        name: "validateEmail",
        data() {
            return {
                token: this.$route.params.token,
                message: '正在绑定/解绑邮箱，请稍候...'
            }
        },
        methods:{
            async validate(){
                const resp = await validateEmail({
                   "token":this.token
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
