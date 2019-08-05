import {request} from '../../request/request'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, title: "全部订单", isActive: true },
      { id: 1, title: "待付款", isActive: false },
      { id: 2, title: "待收获", isActive: false },
      { id: 3, title: "退款/退货", isActive: false }
    ],
    orders:[]
  },
 async ItemChange(e){
    const index = e.detail.index
    const {tabs} = this.data
    tabs.forEach((v,i) => i === index? v.isActive = true:v.isActive = false)
    const token = wx.getStorageSync('token');
    const header = {Authorization:token}
    const {orders} =  await request({url:'/my/orders/all',header,data:{type:index+1}})
    orders.forEach(v=>{
      v.create_time_cn = new Date(v.create_time*1000).toLocaleString()
    })
    this.setData({
      tabs,
      orders
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
   onShow:async function () {
    const token = wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      });
    }
    // 获取页面栈信息
    let currentPages =  getCurrentPages();
    // 从页面栈中获取options参数
    const {options} = currentPages[currentPages.length-1]
    const {tabs} = this.data
    tabs.forEach(v=>v.isActive =  v.id === options.type-1?true:false)
    this.setData({
      tabs
    })
    const header = {Authorization:token}
    const {orders} =  await request({url:'/my/orders/all',header,data:{type:options.type}})
    orders.forEach(v=>{
      v.create_time_cn = new Date(v.create_time*1000).toLocaleString()
    })
    this.setData({
      tabs,
      orders
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})