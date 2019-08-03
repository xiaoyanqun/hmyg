
/***
 * 用户信息授权接口
 *  */
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    });

  })
}


/***
 * 跳转收获地址接口
 *  */
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    });

  })
}


/***
 * 判断用户是否授权接口
 *  */
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    });

  })
}

/***
 * promise 形式的wx.showModal 对话框
 *  */
export const showModal = ({content}) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success(res) {
        resolve(res);
      }
    })
  })
}


/***
 * promise 形式的wx.showToast 弹框
 *  */
export const showToast = ({content}) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: content,
      icon: 'none',
      success: (result) => {
        resolve(result);
      }
    });
  })
}

/***
 * promise 形式的wx.getUserInfo 用户授权
 *  */
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout:10000,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    });
      
  })
}



  