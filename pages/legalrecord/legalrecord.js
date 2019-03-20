// pages/historyrecord/historyrecord.js
var app = getApp()
var util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.pageUrl,
    booklist: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.fontFamily()
    var that = this
    var title = options.title
    var cateType = options.catetype
    console.log(options)
    wx.setNavigationBarTitle({title})
    that.setData({cateType})
    that.getData(1)
  },
  getData (p) {
    var that = this
    wx.request({
      url: that.data.url+'/index/details/booklist',
      data: {
        p,
        cateType:that.data.cateType
      },
      success: res => {
        console.log(res)
        console.log(that.data.booklist)
        if(res.data.books){
          var data = that.data.booklist
          var arr = data.concat(res.data.books)
          that.setData({
            booklist: arr,
            p
          })
        }else{
          wx.showToast({
            title: 'ཆེས་མཇུག་མ།',
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  },
  detail (e) {
    var id = e.currentTarget.id
    wx.navigateTo({
      url:'../bookdetail/bookdetail?id='+id
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
    var that = this
    var p = that.data.p + 1
    console.log(p)
    that.getData(p)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})