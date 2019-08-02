import regeneratorRuntime from '../../lib/runtime/runtime'
import {openSetting,chooseAddress,getSetting} from  '../../lib/wxAsync/wxAsync'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{}
  },
  async handleSite(){
    // 调用判断是否授权过接口
    const res1 = await getSetting()
    // 判断用户是否授权过
    if(res1.authSetting['scope.address'] || res1.authSetting['scope.address'] === undefined){
      // 授权过或者第一次点击的用户直接调用获取收货地址
     const res2 = await chooseAddress()
     res2.All = res2.provinceName+res2.cityName+res2.countyName+res2.detailInfo
     wx.setStorageSync('user', res2);
    }else{
      //没有授权的用户调用授权接口
      const res3 = await openSetting()
      if(res3.authSetting['scope.address']){
        const res4 = await chooseAddress()
        res4.All = res4.provinceName+res4.cityName+res4.countyName+res4.detailInfo
        wx.setStorageSync('user', res4);
      }
    }
     
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const user = wx.getStorageSync('user');
    console.log(user)
    this.setData({
      user
    })
  },

})