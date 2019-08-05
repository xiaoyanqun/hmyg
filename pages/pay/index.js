import regeneratorRuntime from '../../lib/runtime/runtime'
import {requestPayment,showToast} from  '../../lib/wxAsync/wxAsync'
import {request} from '../../request/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    cats:{},
    totalPrice:0,  //总价
    totalNum:0,   //总数量
  },
  // 支付
  async handleClose(){
   const token =  wx.getStorageSync('token')
   if(!token){
      // 2.1 跳转到 授权页面
      wx.navigateTo({
        url: '/pages/auth/index',
      });
   }else{
    //  编写请求头，发送token
     const header = {Authorization:token}
     const consignee_addr = this.data.user.All
     const order_price = this.data.totalPrice
     const {cats} = this.data
     let goods = []
    //  以选中的商品
     for(let key in cats){
      if(cats[key].isSelect){
        goods.push({
          goods_id:cats[key].goods_id,
          goods_number:cats[key].num,
          goods_price:cats[key].goods_price
        }
        )
      }
     }
     const data = {
      consignee_addr,
      order_price,
      goods
     }
     try {
        //  获取支付订单
    const {order_number} = await request({url:'/my/orders/create',method:"post",header,data})
    // 获取支付参数
    const {pay} = await request({url:'/my/orders/req_unifiedorder',method:"post",header,data:{order_number}})
    // 调用微信支付接口
    const res = await requestPayment(pay)
    // 查询支付状态是否支付
    const res2 = await request({url:'/my/orders/chkOrder',method:"post",header,data:{order_number}})
    await showToast({title:"支付成功"})
    // 跳转订单页面
    wx.navigateTo({
      url:'/pages/order/index'
    })
  } catch (error) {
       console.log(error)
      await showToast({title:"支付失败"})
     }
   }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const user = wx.getStorageSync('user') || {};
    const cats = wx.getStorageSync('cats') || {};
    this.setData({
      user,
      cats
    })
    this.setCart(cats);
  },
  setCart(cats){
   let catsArr =  Object.values(cats)
     // 2 计算总的价格 
     let totalPrice = 0;
     // 3 计算 要购买的总数量
     let totalNum = 0;
   catsArr.forEach(v => {
    //  计算选择商品的价格
     if(v.isSelect){
      totalPrice += v.goods_price * v.num
      totalNum += v.num
     }
   });
   this.setData({
    totalPrice,
    totalNum,
    cats,
   })
   wx.setStorageSync('cats', cats);
  }
})