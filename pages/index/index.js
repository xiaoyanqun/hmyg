import {request} from '../../request/request'
Page({
  data: {
    swiperList:[]
  },
  getSwiperList(){
    request({url:'/home/swiperdata'})
    .then(res=>{
      this.setData({
        swiperList:res
       })
    })
  },
  //options(Object)
  onLoad: function(options) {
    this.getSwiperList()
  },
});
  
  