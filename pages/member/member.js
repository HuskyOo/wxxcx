// pages/member/member.js
var app = getApp()
var util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.fontFamily()
  },
  buy () {
    var that = this
    wx.request({
      url: app.globalData.pageUrl + '/index/pay/index',
      data: {
        money: that.data.money,
        goods_type: 3,
        token: wx.getStorageSync('token'),
      },
      success: res => {
        console.log(res)
        wx.requestPayment({
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonceStr,
          package: res.data.data.package,
          signType: res.data.data.signType,
          paySign: res.data.data.paySign,
          success(res) {
            console.log(res)
            // wx.navigateBack({
            //   delta: 1
            // })
          },
          fail(res) {
            console.log(res)
            // wx.navigateBack({
            //   delta: 1
            // })
          }
        })
      }
    })
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
    var that = this
    wx.request({
      url: app.globalData.pageUrl + '/index/index/usertype',
      data: {
        token: wx.getStorageSync('token')
      },
      success: res => {
        console.log(res)
        that.setData({
          vip:res.data.type,
          money: res.data.vipmoney
        })
      }
    })
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