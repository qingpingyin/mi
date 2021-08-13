<template>
    <div class="cate">
        <div  class="breadcrumbs">
            <div  class="container">
                <a  href="/">首页</a>
                <span class="sep">/</span>
            </div>
        </div>
        <div  class="search-filter">
            <div class="filter-wrap">
                <div class="filter-list">
                    <ul class="item show-less">
                        <span class="label">分类</span>
                        <li>
                            <a @click="ChangeByCate('')">全部</a>
                        </li>
                        <li v-for="(item,index) in cateList" :key="index">
                            <a @click="ChangeByCate(item.categories_name)">{{item.categories_name}}</a>
                        </li>
                        <span class="more-btn">更多<i data-v-65116193="" class="el-icon-arrow-down"></i></span>
                    </ul>
                </div>
            </div>
        </div>
        <div class="search-result">
            <div class="result-order">
                <div class="order-list-box clearfix">
                    <ul class="order-list" >
                        <li class="order-item active">
                            <a >综合</a>
                        </li>
                        <li  class="order-item active">
                            <a >新品</a>
                        </li>
                        <li class="order-item active">
                            <a >销量</a>
                        </li>
                        <li class="order-item active">
                            <a>价格
                                <i class="el-icon-top"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="goods-list-box">
                    <div class="goods-list clearfix">
                        <div class="goods-item" v-for="(item,index) in product.list" :key="index">
                            <a >
                                <div class="figure">
                                    <img :src="item.img_url" alt="">
                                </div>
                                <h2>{{item.title}}</h2>
                                <p class="price"><span>{{item.shop_price}}元</span></p>
                                <div class="thumbs">
                                    <img  :src="item.image" width="34" height="34">
                                </div>
                                <div class="flags">
                                    <span class="salel-label">
                                        <img src="http://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/4f78c46942264753707c27ab69f7ccab.png" width="42" height="18" class="sale-icon">
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-container" v-show="product.total/pageSize>1">
            <el-pagination background
                           :current-page="page"
                           :page-size="pageSize"
                           layout="prev, pager, next"
                           :total="product.total"
                           @current-change="handleCurrentChange" />
        </div>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {getCate} from "@/api/cate";
    export default {
        name: "cate",
        data() {
            return {
                search:this.$route.query.search,
                page:1,
                pageSize:20,
                cateList:[]
            };
        },
        methods:{
            async initList(){
               await this.$store.dispatch('product/setList',{
                   "page":this.page,
                   "pageSize":this.pageSize,
                   "search":this.search
               })
            },
            async ChangeByCate(cateName){
                this.search =cateName
                this.initList()
            },
            async handleCurrentChange(val){
               this.page=val
               this.initList()
            }
        },
        watch:{
            $route: {
                handler() {
                    this.search = this.$route.query.search;
                    this.initList();
                    //深度监听，同时也可监听到param参数变化
                },
                deep: true,
            }
        },
        computed:{
            ...mapGetters(['product'])
        },
        async mounted() {
            this.initList()
            await getCate({"is_nav":2}).then(resp=>{
                this.cateList=resp.data
            })
        }
    }
</script>

<style scoped lang="scss">
    .cate{
        position: relative;
        background: #f5f5f5;
        overflow: hidden;
        .breadcrumbs{
            height: 40px;
            font-size: 12px;
            line-height: 40px;
            background: #f5f5f5;
            color: #757575;
            .container{
                width: 1226px;
                margin-right: auto;
                margin-left: auto;
                a{
                    color: #757575;
                    cursor: pointer;
                }
                .sep{
                    margin: 0 .5em;
                    color: #b0b0b0;
                }
            }
        }
        .search-filter{
            background: #fff;
            cursor: pointer;
            .filter-wrap{
                margin: auto;
                width: 1226px;
                padding: 18px 0;
                .filter-list{
                    position: relative;
                    .item{
                        &:first-child{
                            border-top: none;
                        }
                        position: relative;
                        overflow: hidden;
                        border-top: 1px solid #ededed;
                        padding: 0 60px 0 124px;
                        margin: 0;
                        list-style: none;
                        font-size: 0;
                        .label{
                                top: 0;
                                left: 0;
                                color: #b0b0b0;
                                position: absolute;
                                height: 20px;
                                line-height: 20px;
                                padding: 14px 0;
                                font-size: 14px;
                        }
                        li{
                            display: inline-block;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            color: #424242;
                            font-size: 14px;
                            width: 148px;
                            padding: 14px 0;
                            height: 20px;
                            line-height: 20px;
                            a{
                                width: 148px;
                                display: inline-block;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                color: #424242;
                                &:hover{
                                    color: #ff6700;
                                }
                            }
                        }
                        .more-btn{
                            cursor: pointer;
                            color: #757575;
                            right: 0;
                            top: 0;
                            position: absolute;
                            height: 20px;
                            line-height: 20px;
                            padding: 14px 0;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
        .search-result{
            padding: 20px 0px;
            cursor: pointer;
            .result-order{
                position: relative;
                margin: 0 auto;
                width: 1226px;
                .order-list-box{
                    position: relative;
                    height: 30px;
                    margin: 20px 0;
                    .order-list{
                        float: left;
                        height: 30px;
                        line-height: 30px;
                        padding: 0;
                        margin: 0;
                        .order-item{
                            float: left;
                            padding: 0 30px;
                            border-left: 1px solid #e0e0e0;
                            line-height: 20px;
                            a{
                                color: #424242;
                                -webkit-transition: color .2s;
                                transition: color .2s;
                                &:hover{
                                    color: #ff6700;
                                }
                            }
                        }
                    }

                }
                .goods-list-box{
                    width: 1226px;
                    .goods-list{
                        width: 1240px;
                        margin: 0;
                        .goods-item{
                            position: relative;
                            float: left;
                            width: 296px;
                            height: 430px;
                            margin-right: 14px;
                            margin-bottom: 14px;
                            text-align: center;
                            background: #fff;
                            cursor: pointer;
                            a{
                                display: block;
                                padding-top: 47px;
                                -webkit-box-sizing: border-box;
                                box-sizing: border-box;
                                height: 100%;
                                color: #333;
                                .figure{
                                    margin: 16px 0 0 16px;
                                    img{
                                        width: auto;
                                        height: 140px;
                                        padding: 0 0 10px;
                                    }
                                }
                                h2{
                                    margin: 0 auto;
                                    width: 230px;
                                    font-size: 14px;
                                    font-weight: 400;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    overflow: hidden;
                                }
                                .price{
                                    margin: 0 0 15px;
                                    color: #ff6700;
                                }
                                .thumbs{
                                    width: 100%;
                                    height: 37px;
                                    overflow: hidden;
                                    img{
                                        display: inline-block;
                                        width: 34px;
                                        height: 34px;
                                        margin: 0 4px;
                                        border: 1px solid #e0e0e0;
                                        cursor: pointer;
                                        -webkit-transition: border-color .2s linear;
                                        transition: border-color .2s linear;
                                        &:hover{
                                            border: 1px solid #ff6700;
                                        }
                                    }
                                }
                                .flags{
                                    position: absolute;
                                    overflow: hidden;
                                    left: 0;
                                    bottom: 60px;
                                    z-index: 1;
                                    width: 100%;
                                    font-size: 0;
                                    max-height: 18px;
                                    text-align: center;
                                }
                            }
                        }
                    }
                }
            }
        }
        .page-container{
            text-align: center;
            padding-bottom: 20px;
        }
        .clearfix:after, .clearfix:before {
            content: "";
            display: block;
            clear: both;
        }
    }
</style>
