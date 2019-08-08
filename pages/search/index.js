import {request} from '../../request/request'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:"",
    goodsList:[],
    isButton:false,
  },
  Time:-1,
  // 搜索
   handleInput(e){
    const value = e.detail.value
    console.log( e.detail.value)
    if(!value.trim()){
      return
    }else{
      clearTimeout(this.Time)
      this.Time = setTimeout(()=>{
        this.search(value)
      },1000)
    
    }
  },
  // 取消
  handledel(){
    this.setData({
      value:"",
      goodsList:[],
      isButton:false
    })
  },
  async search(query){
    const res = await request({url:"/goods/qsearch",data:{query}})
    console.log(res)
    this.setData({
      goodsList:res,
      isButton:true
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