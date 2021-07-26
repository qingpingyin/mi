<template>
    <div class="uc-content">
        <div class="title">
            <h1>喜欢的商品</h1>
        </div>
        <div class="list">
            <div class="user-favourite">
                <ul class="goods-list clearfix">
                    <li class="goods-list-item" v-for="(item,index) in collectList" :key="index">
                        <div class="figure-img">
                            <a  :href="'/#/detail/'+item.id" >
                                <img :src="item.product_img[0].img_url">
                            </a>
                        </div>
                        <h3 class="goods-title"><a>{{item.title}}</a></h3>
                        <p class="price">
                            <span>{{item.shop_price}}元 <del v-if="item.market_price>0">{{item.market_price}}</del></span>
                        </p>
                        <div class="actions">
                            <a class="btn-del" @click="delCollect(item.id)">
                                删除
                            </a>
                            <a  :href="'/#/detail/'+item.id" class="btn-detail ">查看详情</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {collectList, delCollect} from "../api/collect";

    export default {
        name: "Favourite",
        data() {
            return {
                uid:this.$route.query.id,
                collectList:[]
            }
        },
        methods: {
            async delCollect(pid) {
                const resp = await delCollect(this.uid, pid);
                if (resp.status == 200) {
                    this.initCollect()
                }
            },
           async initCollect(){
                const resp = await collectList({
                    "uid": this.uid
                })
                if (resp.status == 200) {
                    this.collectList = resp.data
                }
            }
        },
       async created() {
           this.initCollect()
        }
    }
</script>

<style scoped lang="scss">
    .uc-content{
        float: left;
        width: 978px;
        height: 908px;
        margin-left: 14px;
        background: #fff;
        .clearfix:after {
            content: "";
            display: block;
            clear: both;
        }
        .title{
            h1{
                margin-left: 30px;
                font-size: 30px;
                font-weight: 400;
                line-height: 68px;
                color: #757575;
            }
        }
        .list{
            .user-favourite{
                width: 868px;
                overflow: hidden;
                .goods-list{
                    margin: 0;
                    padding: 0;
                    list-style-type: none;
                    width: 930px;
                    .goods-list-item{
                        float: left;
                        width: 260px;
                        height: 348px;
                        padding-top: 40px;
                        padding-right: 48px;
                        border-bottom: 1px solid #e0e0e0;
                        text-align: center;
                        .figure-img{
                            width: 200px;
                            margin: 0 auto 10px;
                            a{
                                display: block;
                                text-decoration: none;
                                color: #757575;
                            }
                            img{
                                width: 200px;
                                height: 200px;
                            }
                        }
                        .goods-title{
                            margin: 0 0 5px;
                            font-size: 14px;
                            font-weight: 400;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                            a{
                                color: #333;
                                &:hover{
                                    color: #f25807;
                                }
                            }
                        }
                        .price{
                            margin: 0 0 10px;
                            color: #ff6700;
                        }
                        .actions{
                            display: none;
                            .btn-del{
                                display: inline-block;
                                margin: 0 7px;
                                height: 20px;
                                line-height: 20px;
                                width: 77px;
                                border: 1px solid #b0b0b0;
                                font-size: 12px;
                                text-align: center;
                                color: #b0b0b0;
                                cursor: pointer;
                                &:hover{
                                    background-color: #757575;
                                    color: #fff;
                                }

                            }
                            .btn-detail{
                                display: inline-block;
                                width: 77px;
                                margin: 0 7px;
                                height: 20px;
                                line-height: 20px;
                                font-size: 12px;
                                text-align: center;
                                color: #fff;
                                background-color: #ff6700;
                                border: 1px solid #ff6700;
                                cursor: pointer;
                            }
                        }
                        &:hover .actions{
                            display: block;
                        }
                    }
                }
            }
        }
    }
</style>
