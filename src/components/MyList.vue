<template>
    <div class="myList">
        <div class="list-right ">
            <ul class="clearfix" >
                <li v-for="(item,index) in list" :key="index">
                    <router-link :to="{name:'detail',query:{id:item.id}}">
                    <a>
                        <div class="figure ">
                            <img :src="item.img_url" alt/>
                        </div>
                        <h3>
                            {{item.title}}
                        </h3>
                        <p class="desc">{{item.description}}</p>
                        <p class="price">
                            <span class="num">{{item.shop_price}}元起</span>
                            <del v-if="item.market_price==null">{{item.market_price}}元</del>
                        </p>
                    </a>
                    </router-link>
                </li>
                <li v-show="isMore">
                    <a href="/#/cate">
                        浏览更多<i class="el-icon-d-arrow-right"></i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MyList",
        props:["list","isMore"],
        data(){
            return{};
        },
        computed:{},
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
    .myList{

        .list-right{
            width: 978px;
            float: left;
            margin-left: 14px;
            min-height: 1px;
            ul{
                margin: 0 0 -14px -14px;
                width: 992px;
                height: 614px;
                padding: 0;
                list-style-type: none;
                li{
                    position: relative;
                    z-index: 1;
                    float: left;
                    width: 234px;
                    height: 300px;
                    margin-left: 14px;
                    margin-bottom: 14px;
                    background: #fff;
                    -webkit-transition: all .2s linear;
                    transition: all .2s linear;
                    a{
                        display: block;
                        height: 100%;
                        -webkit-box-sizing: border-box;
                        box-sizing: border-box;
                        padding: 20px 0;
                        .figure{
                            margin: 16px 0px 0px 16px;
                            img{
                                width: auto;
                                height: 140px;
                                /*padding: 0 0 10px;*/
                            }
                        }
                        h3{
                            margin: 0 10px 2px;
                            text-align: center;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                            font-size: 14px;
                            font-weight: 400;
                            color: #333;
                        }
                        .desc{
                            margin: 0 10px 10px;
                            height: 18px;
                            font-size: 12px;
                            color: #b0b0b0;
                            text-align: center;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                        }
                        .price{
                            margin: 0 10px 14px;
                            text-align: center;
                            color: #ff6700;
                            del{
                                padding-left:5px ;
                                color: #b0b0b0;
                            }
                        }
                    }
                    &:nth-last-child(1){
                        text-align: center;
                        line-height: 280px;
                        a{
                            font-size: 18px;
                            color: #333;
                            &:hover{
                                color: #f25807;
                            }
                        }
                    }
                }
            }
        }
        .clearfix:after, .clearfix:before {
            content: " ";
            display: table;
        }
    }
</style>
