// pages/Pendingpayment/Pendingpayment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buyList: [
      {
        "id": "0",
        "name": "墨香图书",
        "title": "正版五本最新藏族语言学习图书",
        "image": "../../images/courseTwo.png",
        "kind": "藏文翻译",
        "price": "5900.00",
        "freight": "10.00",
        "quantity": "1"
      },
      {
        "id": "1",
        "name": "墨香图书",
        "title": "正版五本最新藏族语言学习图书",
        "image": "../../images/courseTwo.png",
        "kind": "藏文翻译",
        "price": "5900.00",
        "freight": "10.00",
        "quantity": "1"
      },
      {
        "id": "2",
        "name": "墨香图书",
        "title": "正版五本最新藏族语言学习图书",
        "image": "../../images/courseTwo.png",
        "kind": "藏文翻译",
        "price": "5900.00",
        "freight": "10.00",
        "quantity": "1"
      },
      {
        "id": "3",
        "name": "墨香图书",
        "title": "正版五本最新藏族语言学习图书",
        "image": "../../images/courseTwo.png",
        "kind": "藏文翻译",
        "price": "5900.00",
        "freight": "10.00",
        "quantity": "1"
      },
      {
        "id": "4",
        "name": "墨香图书",
        "title": "正版五本最新藏族语言学习图书",
        "image": "../../images/courseTwo.png",
        "kind": "藏文翻译",
        "price": "5900.00",
        "freight": "10.00",
        "quantity": "1"
      },
    ]
  },

  // 跳转全部
  allOrders: function (e) {
    wx.navigateTo({
      url: '../pendingpayment/pendingpayment',
    })
  },

  // 跳转待支付
  paymentOrder: function (e) {
    wx.navigateTo({
      url: '../tobepaid/tobepaid',
    })
  },

  // 跳转待发货
  deliveryOrder: function (e) {
    wx.navigateTo({
      url: '../tobedelivered/tobedelivered',
    })
  },

  // 跳转待收货
  receiptOrder: function (e) {
    wx.navigateTo({
      url: '../shipped/shipped',
    })
  },

  // 跳转已完成
  completeOrder: function (e) {
    wx.navigateTo({
      url: '../completed/completed',
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