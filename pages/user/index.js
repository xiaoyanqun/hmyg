
Page({
  data: {
    userInfo:{},
  },
  //options(Object)
  onLoad: function(options) {
   
  },
  onReady: function() {
    
  },
  onShow: function() {
    const collect =  wx.getStorageSync('collect')
    this.setData({
      collectnum:collect.length
    })
    const userInfo =  wx.getStorageSync('userInfo');
    if(!userInfo){
     wx.navigateTo({
       url: '/pages/login/index',
     });
    }else{
     this.setData({
       userInfo
     })
    }
      
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
  