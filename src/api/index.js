import axios from 'axios'


//获取购物中所有商品数量总和
export const getCartCount = () =>{
    return axios.get('/carts/products/sum');
}

// 获取购物车列表
export const getCartList = () =>{
    return axios.get('/carts');
}
