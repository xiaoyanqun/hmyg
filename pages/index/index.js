import {request} from '../../request/request'
Page({
  data: {
    swiperList:[],
    navList:[],
    goodList:[]
  },
  // 请求轮播图
  getSwiperList(){
    request({url:'/home/swiperdata'})
    .then(res=>{
      this.setData({
        swiperList:res
       })
    })
  },
  // 请求导航数据
  getGoodList(){
    request({url:'/home/floordata'})
    .then(res=>{  
      this.setData({
        goodList:res
      })
    })
  },
  // 请求商品信息
  getNavList(){
    request({url:'/home/catitems'})
    .then(res=>{  
      this.setData({
        navList:res
      })
    })
  },
  //options(Object)
  onLoad: function(options) {
    this.getSwiperList()
    this.getNavList()
    this.getGoodList()
  },
});
  
  