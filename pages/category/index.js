import {request} from '../../request/request'
Page({
  data: {
    CategoriesList:[],
    ChildList:[],
    activeIndex:0,
    scrollTop:0
  },
  AllCategoriesList:[],
  //获取大分类数据
  getAllCategoriesList(){
    request({url:"/categories"})
    .then(res=>{
      this.AllCategoriesList =res
      const arr = this.AllCategoriesList.map(v=>{
        const obj = {
          cat_id:v.cat_id,
          cat_name:v.cat_name
        }
        return obj
      })
      this.setData({
        CategoriesList:arr,
        ChildList:this.AllCategoriesList[this.data.activeIndex].children
      })
    })
  },
  // 点击分类
  handleIndex(e){
    this.setData({
      activeIndex: e.currentTarget.dataset.index
    })
    this.getAllCategoriesList()
    this.setData({
      scrollTop:0
    })
  },
  //options(Object)
  onLoad: function(options) {
    this.getAllCategoriesList()
  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
});
  