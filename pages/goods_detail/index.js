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
    goodsList:{},
    iscollect:false,
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
        goods_introduce:res.goods_introduce.replace(/\.webp/g,".jpg"),
        goods_name:res.goods_name,
        goods_price:res.goods_price
      }
    })
  },
  handleImgIndex(e){
    const {index} = e.currentTarget.dataset
    const urls = this.data.goodsList.pics.map(v=>v.pics_big)
    console.log(urls)
    wx.previewImage({
      current: urls[index],
      urls,
    });
      
  },
  addCat(){
    const cats = wx.getStorageSync('cats')||{};
  if(cats[this.GoodsList.goods_id]){
    cats[this.GoodsList.goods_id].num++
    }else{
      cats[this.GoodsList.goods_id] = this.GoodsList
      cats[this.GoodsList.goods_id].num = 1
      cats[this.GoodsList.goods_id].isSelect = true
    }
    wx.setStorageSync('cats', cats);
    wx.showToast({
      title: '加入成功',
      icon: "success",
      mask: true
    });
      
  },
  // 点击收藏按钮
  handlecollect(){
   const collect = wx.getStorageSync('collect') || []
   let index = collect.findIndex(v =>v.goods_id === parseInt(this.goods_id))
   if(index === -1){
    collect.push(this.GoodsList)
    wx.showToast({
      title: '收藏成功',
      icon: 'success',
      mask: true,
    });
      
   }else{
    collect.splice(index,1)
    wx.showToast({
      title: '取消成功',
      icon: 'success',
      mask: true,
    });
   }
   this.setData({
    iscollect : !this.data.iscollect
   })
   wx.setStorageSync('collect',collect)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.GoodsList)
    this.goods_id = options.goods_id
    this.getGoodsById()
    const collect = wx.getStorageSync("collect") || []
    const iscollect = collect.some(v=>v.goods_id === parseInt(this.goods_id))
    // console.log(iscollect)
    this.setData({
      iscollect
    })
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