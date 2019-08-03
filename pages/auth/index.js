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
    const {encryptedData,rawData,iv,signature} = e.detail
    const {code} = await login()
    const obj = {encryptedData,rawData,iv,signature,code}
    const res1 = await request({url:"/users/wxlogin",method:'post',data:obj})
    console.log(res1)
    // wx.navigateTo({
    //   url: '/pages/pay/index',
    // });
      
  }
})