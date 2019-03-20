// pages/prove/prove.js
var app = getApp();
var util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    p:1,
    url: app.globalData.pageUrl,
    num: 50,
    // name: '嗨呀',
    // prve: '邻居',
    realName: 'མིང་བདེན་པ་རེད།',
    relationlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.fontFamily()
    var that = this
    var id = options.id
    var welfareDetails = wx.getStorageSync('welfareDetails')
    console.log(id)
    that.setData({
      id,
      relationlist:welfareDetails.relationlist,
      author:welfareDetails.welfare.author,
      relationlist_count: welfareDetails.welfare.relationlist_count
    })
  },
  getMore (p) {
    var that = this
    var id = that.data.id
    var arr = that.data.relationlist
    wx.request({
      url: that.data.url + '/index/welfare/relationlist',
      data: {id,p},
      success: res => {
        console.log(res)
        if(res.data.code == 1){
          var relationlist = arr.concat(res.data.Relationlist)
          that.setData({p,relationlist})
        }
      }
    })
  },
  //证明提交跳转
  jumpRefer: function () {
    var id = this.data.id
    wx.navigateTo({
      url: '../proveRefer/proveRefer?id='+id
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
    var p = this.data.p + 1
    this.getMore(p)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})