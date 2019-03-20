//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    // wx.hideTabBar({})
    //判断是否有播放历史
    var history = wx.getStorageSync('history')
    if(!history){
      var arr = []
      wx.setStorage({
        key: 'history',
        data: arr
      })
    }
    //判断用户是否登录
    var str = wx.getStorageSync('token')
    if(!str){
      wx.switchTab({
        url: 'pages/index/index'
      })
    }
    // 下载字体
    wx.loadFontFace({
      family: '藏研黑体',
      source: "url('https://qiuniu.vmobplus.com/CTRC-HT.ttf')",
      success: res => {
        console.log(res)
      }
    })
    wx.loadFontFace({
      family: 'Himalaya-G',
      source: "url('https://qiuniu.vmobplus.com/Himalaya-G.ttf')",
      success: res => {
        console.log(res)
      }
    })
    wx.loadFontFace({
      family: 'Jomolhari',
      source: "url('https://qiuniu.vmobplus.com/Jomolhari-alpha3c-0605331.ttf')",
      success: res => {
        console.log(res)
      }
    })
    // var token = wx.getStorageSync('token')
    // if(!token){
    //   this.globalData.is_login = false
    // }
  },
  globalData: {
    userInfo: null,
    // pageUrl: "https://wx.novowey.com",
    pageUrl: "http://39.98.207.68",
    // is_login: false
  }
})