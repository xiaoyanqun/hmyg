import {login} from '../../lib/wxAsync/wxAsync'
import {request} from '../../request/request'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async handleClike(e){
    console.log(e)
    // 获取用户信息
    const {encryptedData,rawData,iv,signature} = e.detail
    // 获取用户登录code
    const {code} = await login()
    const obj = {encryptedData,rawData,iv,signature,code}
    // 获取登录token
    const {token} = await request({url:"/users/wxlogin",method:'post',data:obj})
    // 存储token值
    wx.setStorageSync('token', token);
      
    wx.navigateBack({
      // 返回上一个页面 
      delta: 1
    });
      
  }
})