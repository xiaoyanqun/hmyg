export const request = (params)=>{
  wx.showLoading({
    title: '加载中'
  });
  // 接口前缀
  const baseUrl = 'https://api.zbztb.cn/api/public/v1'
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url:baseUrl+params.url,
      success: (result) => {
        resolve(result.data.message)
      },
      fail: (err) => {
        reject(err)
      },
      complete:()=>{
        wx.hideLoading()
      }
    });
  })
}