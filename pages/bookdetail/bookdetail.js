// pages/bookdetail/bookdetail.js
var app = getApp()
var WxParse = require('../../wxParse/wxParse')
var util = require('../../utils/util')
import { bookdetail } from '../../font/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:app.globalData.pageUrl,
    saleNum: 1,
    show: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.fontFamily()
    var that = this
    var id = options.id
    wx.request({
      url: that.data.url + '/index/details/bookdetails',
      data: {
        id
      },
      success: res => {
        console.log(res)
        that.setData({
          book: res.data.book,
        })
        that.setParse()
      }
    })
  },
  noShow () {
    this.setData({
      show:false
    })
  },
  isShow () {
    this.setData({
      show:true
    })
  },
  preview (e) {
    var src = e.currentTarget.dataset.src
    wx.previewImage({
      urls:[src]
    })
  },
  handleNum (e) {
    var num = parseInt(e.detail.value)
    if(num){
      if(num < 1){
        this.setData({
          saleNum:1
        })
      }else{
        this.setData({
          saleNum:num
        })
      }
    }else{
      this.setData({
        saleNum:1
      })
    }
  },
  // 减
  sub () {
    var num = this.data.saleNum
    if(num-1 > 0){
      this.setData({
        saleNum: num-1
      })
    }
  },
  // 加
  add () {
    var num = this.data.saleNum
    this.setData({
      saleNum: num+1
    })
  },
  isBuy () {
    var that = this
    var id = that.data.book.id
    var book = that.data.book
    book.saleNum = that.data.saleNum
    wx.setStorage({
      key:'bookBuy',
      data: book
    })
    wx.navigateTo({
      url: '../bookorder/bookorder'
    })
    // wx.chooseAddress({
    //   success: res => {
    //     console.log(res)
    //   }
    // })
    // wx.request({
    //   url: that.data.url + '/index/pay/index',
    //   data: {
    //     id,
    //     money: that.data.book.money,
    //     type: 0,
    //     token: wx.getStorageSync('token')
    //   },
    //   success: res => {
    //     console.log(res)
    //     wx.requestPayment({
    //       timeStamp: res.data.data.timeStamp,
    //       nonceStr: res.data.data.nonceStr,
    //       package: res.data.data.package,
    //       signType: res.data.data.signType,
    //       paySign: res.data.data.paySign,
    //       success(res) {
    //         console.log(res)
    //       },
    //       fail(res) {
    //         console.log(res)
    //       }
    //     })
    //   }
    // })
  },
  setParse () {
    var detail = this.data.book.describe
    WxParse.wxParse('detail', 'html', detail, this, 0)
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
    this.noShow()
    this.setData({pageFont: bookdetail()})
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