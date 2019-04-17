// pages/aboutUs/aboutUs.js
var app = getApp()
var WxParse = require('../../wxParse/wxParse');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "穹窿银城",
    content: "",
    info: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let info = decodeURIComponent(options.info)
    console.log(info, options.info)
    WxParse.wxParse('info', 'html', info, this, 0)
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