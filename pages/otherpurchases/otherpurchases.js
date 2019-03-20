Page({

  /** 
   * 页面的初始数据
   */
  data: {
    purchaseBookList: [
      {
        "id": "1",
        "title": "正版五本最新藏族语言学习图书",
        "image": "../../images/tuijianone.png",
        "price": "5900.00",
        "number": "1",
        "description": "藏语5本",
        "time": "一个月前"
      },
      {
        "id": "2",
        "title": "正版五本最新藏族语言学习图书",
        "image": "../../images/tuijianone.png",
        "price": "5900.00",
        "number": "1",
        "description": "藏语5本",
        "time": "一个月前"        
      },
      {
        "id": "3",
        "title": "正版五本最新藏族语言学习图书",
        "image": "../../images/tuijianone.png",
        "price": "5900.00",
        "number": "1",
        "description": "藏语5本",
        "time": "一个月前"        
      },
    ]
  },

  // 图书购买页面
  bookJump: function(e){
    wx.navigateTo({
      url: '../buy/buy',
    })
  },

  // 课程购买页面
  courseJump: function(e){
    wx.navigateTo({
      url: '../coursePurchase/coursePurchase',
    })
  },

  // 其他购买页面
  otherJump: function(e){
    wx.navigateTo({
      url: '../otherpurchases/otherpurchases',
    })
  },

  // 首页跳转
  homeJump: function (e) {
    wx.redirectTo({
      url: '../index/index',
    })
  },

  // 图书购买页面
  shoppingJump: function (e) {
    wx.redirectTo({
      url: '../buy/buy',
    })
  },

  // 个人中心跳转
  myJump: function (e) {
    wx.redirectTo({
      url: '../my/my',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})