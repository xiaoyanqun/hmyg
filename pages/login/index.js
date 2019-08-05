
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
   handleClike(e){
    console.log()
    if(e.detail.userInfo){
          // 获取用户信息
      const {userInfo} = e.detail
      wx.setStorageSync('userInfo',userInfo);
    
        
      wx.navigateBack({
        // 返回上一个页面 
        delta: 1
      });
    }

   
      
  }
})