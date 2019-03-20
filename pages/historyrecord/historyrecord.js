// pages/historyrecord/historyrecord.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyRecord: [],
    url: app.globalData.pageUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  detail (e) {
    console.log(e)
    var index = e.currentTarget.dataset.msg
    var type = e.currentTarget.dataset.type
    if(type === '0'){
      wx.navigateTo({
        url: '../singleDetails/singleDetails?lan=zang&n='+index,
      })
    }else if(type == 1){
      wx.navigateTo({
        url: '../video/video?lan=zang&n='+index,
      })
    }else{
      type = -1
      wx.navigateTo({
        url: '../albumDetails/albumDetails?lan=zang&id='+id,
      })
    }
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
    wx.getStorage({
      key: 'history',
      success (res) {
        console.log(res.data)
        that.setData({historyRecord:res.data})
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