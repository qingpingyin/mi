<template>
    <div class="user-address">
        <div class="title">
            <h1>收货地址</h1>
        </div>
        <div class="address-box">
            <div class="address-list" >
                <div class="address-item">
                    <div class="add-desc" @click="modalShow=true">
                        <span class="icon-plus">+</span>
                        <span>添加新地址</span>
                    </div>
                </div>
                <div class="address-item" v-for="(item,index) in this.addressList" :key="index">
                    <div class="address-info">
                        <div  class="name">{{item.receiver_name}}</div>
                        <div class="tel">{{item.receiver_mobile}}</div>
                        <div class="address-con">
                            <span>{{item.receiver_province}}</span>
                            <span>{{item.receiver_city}}</span>
                            <span>{{item.receiver_district}}</span>
                            <span class="info">{{item.receiver_address}}</span>
                        </div>
                        <div class="address-action">
                            <span @click="editAddress(item)">修改</span>
                            <span @click="delAddress(item.id)">删除</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal
                :modalShow="modalShow"
                title="收货地址"
                @close="modalShow = false"
                @cancle="modalShow = false"
                @confirm="addNewAddress"
        >
            <template v-slot:dialog-body>
                <form class="new-address">
                    <!--           收货人姓名-->
                    <div class="input-group">
                        <div
                                class="input-item"
                                :class="{'input-focus':target == 1,'input-active':newAddress.receiver_name != ''}"
                        >
                            <label for="address-name">姓名</label>
                            <input
                                    type="text"
                                    :placeholder="target == 1?'收货人姓名':''"
                                    id="address-name"
                                    @focus="target = 1"
                                    @blur="target = 0"
                                    v-model="newAddress.receiver_name"
                            />
                        </div>
                        <!--             收货人手机号-->
                        <div
                                class="input-item"
                                :class="{'input-focus':target == 2,'input-active':newAddress.receiver_mobile != ''}"
                        >
                            <label for="phone">手机号</label>
                            <input
                                    type="text"
                                    :placeholder="target == 2?'手机号':''"
                                    id="phone"
                                    @focus="target = 2"
                                    @blur="target = 0"
                                    v-model="newAddress.receiver_mobile"
                            />
                        </div>
                    </div>
                    <div class="aj-china-area">
                        <span>省:</span>
                        <select v-model="newAddress.receiver_province" @change="changeCity()" class="aj-select" >
                            <option value="">请选择</option>
                            <option v-for="(item, index) in optionData" :value="item.name" :key="index">{{item.name}}</option>
                        </select>
                        <span>市: </span>
                        <select v-model="newAddress.receiver_city" @change="changeDistrict()" class="aj-select" >
                            <option v-for="(item, index) in cityArr" :value="item.name" :key="index">{{item.name}}</option>
                        </select>
                        <span>区:</span>
                        <select v-model="newAddress.receiver_district" class="aj-select"  >
                            <option v-for="(item, index) in districtArr" :value="item.name" :key="index">{{item.name}}</option>
                        </select>
                    </div>

                    <!--          详细地址-->
                    <div class="input-group textarea-wrapper">
                        <div
                                class="input-item"
                                :class="{'input-focus':target == 3,'input-active':newAddress.receiver_address != ''}"
                        >
                            <label for="name">详细地址</label>
                            <textarea
                                    :placeholder="target == 3?'详细地址，路名或街道名称，门牌号':''"
                                    id="name"
                                    @focus="target = 3"
                                    @blur="target = 0"
                                    v-model="newAddress.receiver_address"
                            ></textarea>
                        </div>
                    </div>
                </form>
            </template>
        </Modal>
    </div>
</template>

<script>
    import Modal from "@/components/Modal";
    import optionData from "@/utils/city";
    import {createAddress, deleteAddress, getAddress} from "@/api/address";
    export default {
        name: "Address",
        data(){
            return{
                uid:this.$route.query.id,
                optionData,
                cityArr:[],
                districtArr:[],
                modalShow: false, //是否显示添加地址弹出框
                target: 0, // modal组件动态绑定样式
                addressList: [], //收货地址列表
                newAddress: {
                    receiver_name: "",
                    receiver_mobile: "",
                    receiver_province: "",
                    receiver_city: "",
                    receiver_district: "",
                    receiver_address: ""
                },
            }
        },
        methods:{
            async addNewAddress(){
                await createAddress(this.newAddress).then(()=>{
                    this.modalShow = false
                    this.initAddress()
                })
            },
            async delAddress(id){
                await deleteAddress(id).then(()=>{
                    this.initAddress();
                })
            },
            editAddress(item){
                this.newAddress=item
                this.modalShow=true
            },
            changeCity() {
                var _this = this
                var  item =''
                _this.optionData.forEach(function (ele) {
                    if(ele.name===_this.newAddress.receiver_province){
                        item =ele
                    }
                })
                this.cityArr = item.sub;//将选中的item的sub设置给cityArr 用于显示市
                this.newAddress.receiver_city = item.sub[0].name;//默认选择第一个市
            },
            changeDistrict(){
                var _this = this
                var  item =''
                _this.cityArr.forEach(function (ele) {

                    if(ele.name===_this.newAddress.receiver_city){
                        item =ele
                    }
                })
                this.districtArr = item.sub;//将选中的item的sub设置给cityArr 用于显示市
                this.newAddress.receiver_district = item.sub[0].name;//默认选择第一个市
            },
            async initAddress(){
                await getAddress({
                    "uid": this.uid
                }).then(resp=>{
                    this.addressList = resp.data
                    this.modalShow=false
                })
            }

        },
        computed:{},
        components:{
            Modal
        },
        mounted() {
            this.initAddress()
        }
    }
</script>

<style scoped lang="scss">
    .user-address{
        float: left;
        width: 978px;
        height: 908px;
        margin-left: 14px;
        background: #fff;
        .title{
            h1{
                margin-left: 30px;
                font-size: 30px;
                font-weight: 400;
                line-height: 68px;
                color: #757575;
            }
        }
        .address-box{
            .address-list{
                margin-left: 30px;
                .address-item{
                    display: inline-block;
                    width: 268px;
                    height: 178px;
                    border: 1px solid #e0e0e0;
                    cursor: pointer;
                    position: relative;
                    margin-right: 17px;
                    margin-bottom: 20px;
                    vertical-align: top;
                    -webkit-transition: all .4s ease;
                    transition: all .4s ease;
                    .add-desc{
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        -webkit-transform: translate3d(-50%,-50%,0);
                        transform: translate3d(-50%,-50%,0);
                        color: #b0b0b0;
                        .icon-plus{
                            display: block;
                            width: 30px;
                            height: 30px;
                            margin: 0 auto 8px;
                            font-size: 30px;
                            line-height: 30px;
                            background-color: #e0e0e0;
                            border-radius: 17px;
                            text-align: center;
                            -webkit-transition: all .4s ease;
                            transition: all .4s ease;
                            color: #fff;
                        }
                        .span{

                        }
                    }
                    .address-info{
                        line-height: 22px;
                        color: #757575;
                        padding: 15px 24px 0;
                        .name{
                            font-size: 18px;
                            color: #333;
                            line-height: 30px;
                            margin-bottom: 10px;
                        }
                        .tel{
                            line-height: 22px;
                            color: #757575;
                        }
                        .address-con{
                            line-height: 22px;
                            color: #757575;
                            span{
                                display: inline-block;
                                margin-right: 3px;
                                word-wrap: break-word;
                            }
                            .info{
                                width: 100%;
                            }
                        }
                        .address-action{
                            display: none;
                            text-align: right;
                            position: absolute;
                            right: 24px;
                            bottom: 10px;
                            width: 76px;
                            height: 21px;
                            span{
                                color: #ff6700;
                                margin-left: 10px;
                            }
                        }
                    }
                    &:hover .address-action{
                        display: block;
                    }
                }
            }
        }
        .new-address {
            .input-group {
                display: flex;
                justify-content: space-between;
                margin-bottom: 14px;
                .input-item {
                    position: relative;
                    width: 283px;
                    height: 40px;
                    border: 1px solid #e0e0e0;
                    box-sizing: border-box;
                    font-size: 14px;
                    color: #b0b0b0;
                    transition: border-color 0.4s;
                    &:hover {
                        border-color: #b0b0b0;
                    }
                    label {
                        position: absolute;
                        font-size: 14px;
                        left: 14px;
                        top: 10px;
                        z-index: 333;
                        background-color: #fff;
                        padding: 2px 2px;
                        transition: all 0.4s;
                    }
                    input {
                        position: absolute;
                        left: 0;
                        top: 50%;
                        outline: none;
                        border: none;
                        padding-left: 16px;
                        transform: translateY(-50%);
                        transition: all 0.5s;
                        &::placeholder {
                            color: #b0b0b0;
                        }
                    }
                    &.input-focus {
                        border-color: #ff6700;
                        label {
                            font-size: 12px;
                            top: -10px;
                            color: #ff6700;
                        }
                    }
                    &.input-active {
                        label {
                            font-size: 12px;
                            top: -10px;
                        }
                    }
                }
            }
            .aj-china-area{
                color: #757575;
                .aj-select{
                    width: 100px;
                    margin: 0 15px;
                    padding: 0 10px;
                    border: 1px solid #e0e0e0;
                    color: #757575;
                    height: 30px;
                    border-radius: 4px;
                }
            }
            .textarea-wrapper {
                margin-top: 8px;
                width: 100%;
                .input-item {
                    width: 100%;
                    height: 64px;
                    label {
                        top: 10px;
                    }
                    textarea {
                        width: 100%;
                        height: 100%;
                        border: none;
                        box-sizing: border-box;
                        padding: 10px 16px;
                        outline: none;
                    }
                }
            }
            .tag-wrapper {
                width: 100%;
                .input-item {
                    width: 100%;
                    input {
                        box-sizing: border-box;
                        width: 100%;
                    }
                }
            }
        }
    }

</style>
