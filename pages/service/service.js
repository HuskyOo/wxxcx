// pages/service/service.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //窗口高度
    winHeight: "",
    //预设当前项的值
    currentTab: "7",
    //tab标题的滚动条位置
    scrollLeft: 300,
    height: "",
    tab: [
      {
        "id": "0",
        "title": "藏语",
      },
      {
        "id": "1",
        "title": "汉语",
      },
      {
        "id": "2",
        "title": "书城",
      },
      {
        "id": "3",
        "title": "直播",
      },
      {
        "id": "4",
        "title": "公益",
      },
      {
        "id": "5",
        "title": "访谈",
      },
      {
        "id": "6",
        "title": "唱诵",
      },
      {
        "id": "7",
        "title": "服务",
      },
    ],
  },

  swichNav: function (e) {
    var cur = e.target.dataset.current;
    console.log(cur)
    if (cur == 0){
      wx.redirectTo({
        url: '../index/index',
      })
    } else if (cur == 1) {
      wx.redirectTo({
        url: '../chinese/chinese',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (cur == 2) {
      wx.redirectTo({
        url: '../bookcity/bookcity',
      })
    } else if (cur == 3) {
      wx.redirectTo({
        url: '../live/live',
      })
    } else if (cur == 4) {
      wx.redirectTo({
        url: '../welfare/welfare',
      })
    } else if (cur == 5) {
      wx.redirectTo({
        url: '../interview/interview',
      })
    } else if (cur == 6) {
      wx.redirectTo({
        url: '../sing/sing',
      })
    }
  },

  homeJump: function (e) {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  shoppingJump: function (e) {
    wx.redirectTo({
      url: '../buy/buy',
    })
  },
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