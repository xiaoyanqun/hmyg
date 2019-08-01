import {
  request
} from "../../request/request";
import regeneratorRuntime from '../../lib/runtime/runtime'
// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:{}
  },
  goods_id:'',
  GoodsList:{},
  async getGoodsById(){
    const res = await request({url:'/goods/detail',data:{goods_id:this.goods_id}})
    console.log(res)
    this.GoodsList = res
    this.setData({
      goodsList:{
        pics:res.pics,
        goods_introduce:res.goods_introduce,
        goods_name:res.goods_name,
        goods_price:res.goods_price
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.goods_id)
    this.goods_id = options.goods_id
    this.getGoodsById()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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