import regeneratorRuntime from '../../lib/runtime/runtime'
import {openSetting,chooseAddress,getSetting} from  '../../lib/wxAsync/wxAsync'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    cats:{},
    isSelectAll:false,   //是否全选
    totalPrice:0,  //总价
    totalNum:0,   //总数量
  },
  // 获取收货地址按钮
  async handleSite(){
    // 调用判断是否授权过接口
    const res1 = await getSetting()
    // 判断用户是否授权过
    if(res1.authSetting['scope.address'] || res1.authSetting['scope.address'] === undefined){
      // 授权过或者第一次点击的用户直接调用获取收货地址
     const res2 = await chooseAddress()
     res2.All = res2.provinceName+res2.cityName+res2.countyName+res2.detailInfo
     wx.setStorageSync('user', res2);
    }else{
      //没有授权的用户调用授权接口
      const res3 = await openSetting()
      if(res3.authSetting['scope.address']){
        const res4 = await chooseAddress()
        res4.All = res4.provinceName+res4.cityName+res4.countyName+res4.detailInfo
        wx.setStorageSync('user', res4);
      }
    }
     
      
  },
  // 单选
  handleChangeBy(e){
    console.log(e)
    const {id} = e.currentTarget.dataset
    const {cats} = this.data
    cats[id].isSelect =  !cats[id].isSelect
    this.setCart(cats)
  },
  // 全选
  handleChangeAll(){
    let {cats,isSelectAll} = this.data
    isSelectAll = !isSelectAll
    for(let key in cats){
      cats[key].isSelect = isSelectAll
      console.log(cats[key].isSelect)
    }
    this.setCart(cats)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const user = wx.getStorageSync('user') || {};
    const cats = wx.getStorageSync('cats') || {};
    this.setData({
      user,
      cats
    })
    this.setCart(cats);
  },
  setCart(cats){
   let catsArr =  Object.values(cats)
      //1 计算全选
     let isSelectAll = true
     // 2 计算总的价格 
     let totalPrice = 0;
     // 3 计算 要购买的总数量
     let totalNum = 0;
   catsArr.forEach(v => {
    //  计算选择商品的价格
     if(v.isSelect){
      totalPrice += v.goods_price * v.num
      totalNum += v.num
     }else{
      //  只要有一个没选则取消全选
      isSelectAll = false
     }
   });
   this.setData({
    totalPrice,
    totalNum,
    isSelectAll,
    cats
   })
   wx.setStorageSync('cats', cats);
     
  }
})