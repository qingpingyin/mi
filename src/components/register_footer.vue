<template>
    <div class="n-footer">
        <div class="nf-link-area clearfix">
            <ul class="lang-select-list">
                <li>
                    <a class="lang-select-li current" href="javascript:void(0)" data-lang="zn_CN">简体</a>
                |</li>

                <li>
                    <a class="lang-select-li " href="javascript:void(0)" data-lang="zn_CN">繁体</a>
                |</li>

                <li>
                    <a class="lang-select-li " href="javascript:void(0)" data-lang="zn_CN">English</a>
                |</li>
                <li>
                    <a class="a_critical" href="https://account.xiaomi.com/helpcenter/faq/zh_TW/00.introduction/faq-1" >常见问题</a>
                </li>
            </ul>
        </div>
        <p class="nf-intro">
            小米公司版权所有-京ICP备10046444-
            <span>
                <img src="https://account.xiaomi.com/static/res/9204d06/account-static/respassport/acc-2014/img/ghs.png" alt>
            </span>
            京公网安备11010802020134号-京ICP证110507号</p>

    </div>

</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style lang="scss">
.n-footer{
    display: block;
    color:#9d9d9d;
    text-align: center;
    height:80px;
    margin-top: -80px;
    .nf-link-area{
        text-align: center;
        ul,li{
            display: inline-block;
            margin: 0;
            padding: 0;
            list-style: none;
            a:hover,a.current{
                color: #333;
            }
            a{
                color: #9d9d9d;
                padding: 0 10px;
                text-decoration: none;
            }
        }
    }
}
</style>
