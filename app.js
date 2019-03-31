//app.js
// const bgMusic = wx.getBackgroundAudioManager()
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    // wx.hideTabBar({})
    //判断是否有播放历史
    let history = wx.getStorageSync('history'), lan = wx.getStorageSync('lan');
    if(!history){
      var arr = []
      wx.setStorage({
        key: 'history',
        data: arr
      })
    }
    if(!lan){
      wx.setStorage({
        key: 'lan',
        data: 0
      });
    }
    //判断用户是否登录
    var str = wx.getStorageSync('token')
    if(!str){
      wx.switchTab({
        url: '/pages/home/home'
      })
    }
    
    // this.setBgMusic()
  },
  globalData: {
    userInfo: null,
    // pageUrl: "https://wx.novowey.com",
    pageUrl: "https://chonlong.cn",
    // is_login: false
    bgMusic: null,
  },
  // setBgMusic () {
  //   console.log(bgMusic)
  //   let history = wx.getStorageSync('history');
  //   if(history.length > 0){}
  // }
})