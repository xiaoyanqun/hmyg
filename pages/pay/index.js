import regeneratorRuntime from '../../lib/runtime/runtime'
import {getUserInfo} from  '../../lib/wxAsync/wxAsync'
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
    console.log('正常')
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
      //1 计算全选
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