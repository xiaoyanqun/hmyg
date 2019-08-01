import {
  request
} from "../../request/request";
import regeneratorRuntime from '../../lib/runtime/runtime'
// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, title: "综合", isActive: true },
      { id: 1, title: "销量", isActive: false },
      { id: 2, title: "价格", isActive: false }
    ],
    goodsList:[]
  },
   // 接口用的参数
   QueryParams: {
    // 搜索的关键字 
    query: "",
    // 分类id
    cid: "",
    // 页码
    pagenum: 1,
    // 页容量
    pagesize: 10
  },
  totalPagenum:1,
  ItemChange(e){
    const index = e.detail.index
    const {tabs} = this.data
    tabs.forEach((v,i) => i === index? v.isActive = true:v.isActive = false)
    this.setData({
      tabs
    })
  },
  async getGoodsList(){
    const res = await request({
      url:'/goods/search',
      data:this.QueryParams
    })
    this.totalPagenum = Math.ceil(res.total/this.QueryParams.pagesize)
    this.setData({
      goodsList:[...this.data.goodsList,...res.goods]
    })
    wx.stopPullDownRefresh()
  },
  onLoad(options) {
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
   this.QueryParams.pagenum = 1
   this.data.goodsList = []
   this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.QueryParams.pagenum++
    if(this.totalPagenum<this.QueryParams.pagenum){
      wx.showToast({
        title: '没有下一页数据了',
        icon: "none"
      });
    }else{
      this.getGoodsList()
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})