// pages/Pendingpayment/Pendingpayment.js
var app = getApp()
var util = require("../../utils/util")
import { paddingpayment } from '../../font/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.pageUrl,
    page_index:0,
    title_list:[],
    buyList: []
  },

  getData () {
    var that = this
    wx.request({
      url: that.data.url + '/index/buy/order',
      data: {token: wx.getStorageSync('token')},
      success: res => {
        console.log(res)
        that.setData({
          buyList:res.data.data ? res.data.data : []
        })
      }
    })
  },
  
  pageChange (e) {
    // console.log(e.currentTarget.id)
    var n = e.currentTarget.id
    this.setData({page_index:n})
  },
  
  goDetail (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../indent/indent?id='+id
    })
  },
  // 删除订单
  delete (e) {
    var that = this
    console.log(e.currentTarget.dataset.id)
    var id =  e.currentTarget.dataset.id
    wx.showModal({
      title: this.data.pageFont.cancelOrder,
      content: this.data.pageFont.isCancelOrder,
      success: res => {
        console.log(res)
        if(res.confirm){
          wx.request({
            url: that.data.url + '/index/buy/orderdel',
            data: {id},
            success: res => {
              console.log(res)
              if(res.data.code === 1){
                wx.showToast({
                  title: this.data.pageFont.delSuccess,
                  icon: 'none'
                })
                that.getData()
              }
            }
          })
        }
      }
    })
    // wx.request({
    //   url: that.data.url + '/index/buy/orderdel',
    //   data: {id},
    //   success: res => {
    //     console.log(res)
    //   }
    // })
  },
  // 去支付
  payment (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    wx.request({
      url: that.data.url + '/index/pay/paid',
      data: {
        order_id: id,
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
            that.getData()
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
  // 取消订单
  cancel (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    wx.request({
      url: that.data.url + '/index/buy/',
      data:{
        goods_id: id
      },
      success: res => {

      }
    })
  },
  // 确认收货
  delivery (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    wx.request({
      url: that.data.url + '/index/buy/confirm',
      data: {
        order_id: id
      },
      success: res => {
        // console.log(res)
        if(res.data.code === 1){
          wx.showToast({
            title: this.data.pageFont.finish,
            icon: 'none'
          }),
          that.getData()
        }
      }
    })
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
    util.fontFamily()
    this.setData({page_index:options.id})
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
    let pageFont = paddingpayment()
    this.getData()
    this.setData({
      pageFont,
      title_list:[
        {id:0,title: pageFont.all},
        {id:1,title: pageFont.daifukuan},
        {id:2,title: pageFont.daifahuo},
        {id:3,title: pageFont.yifahuo},
        {id:4,title: pageFont.yiwancheng}
      ],
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