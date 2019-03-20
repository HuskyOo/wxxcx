// pages/donation/donation.js
var app = getApp()
var until = require('../../utils/util')
Page({
  // 金额按钮
  changeMoney (e) {
    var n = e.target.dataset.index
    this.setData({money_index:n})
  },
  // 输入金额
  handleInput (e) {
    var value = parseFloat(e.detail.value)
    if(value){
      console.log(1)
      this.setData({money_input:value})
    }else{
      console.log(value)
      this.setData({money_input:''})
    }
  },
  // 留言
  messageChange (e) {
    this.setData({message:e.detail.value})
  },
  // 确认按钮 (点击提交金额 留言)
  handleSure () {
    var that = this
    if(this.data.money_input){
      var money = this.data.money_input
    }else{
      var money = this.data.money_list[this.data.money_index]
    }
    if(this.data.message){
      var message = this.data.message
    }else{
      var message = this.data.place_message
    }
    wx.request({
      url: that.data.url + '/index/pay/index',
      data: {
        goods_id: that.data.welfare.id,
        money: money,
        goods_type: 2,
        token: wx.getStorageSync('token'),
        message: message
        // address: that.data.dressData.provinceName + that.data.dressData.cityName + that.data.dressData.countyName + that.data.dressData.detailInfo,
        // tel: that.data.dressData.telNumber,
        // username: that.data.dressData.userName,
        // postalCode: that.data.dressData.postalCode
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
            wx.navigateBack({
              delta: 1
            })
          },
          fail(res) {
            console.log(res)
          }
        })
      }
    })
    console.log(money, message)
  },
  

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.pageUrl,
    money_list:[10,20,30,100,500,1000],
    money_index: 0,
    money_input: '',
    place_message: 'འདི་ནས་གཏམ་སྤེལ་ཆོག',
    message:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    until.fontFamily()
    console.log(options.id)
    var welfare = wx.getStorageSync('welfareDetails')
    this.setData({
      welfare: welfare.welfare
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})