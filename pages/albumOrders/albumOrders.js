// pages/albumOrders/albumOrders.js
var util = require('../../utils/util')
var app = getApp()
import { albumOrder } from '../../font/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.pageUrl,
    token: wx.getStorageSync('token'),
    albumName:'藏族文化历史',
    totalUpdate:'10',
    update:'9',
    cash:'200',
    payCash:'200',
    lan_index:0
  },
  jumpBuy:function(){
    // var timetemp = Date.parse(new Date())
    // timetemp /= 1000
    // console.log(timetemp)
    var that = this
    console.log(that.data.token)
    wx.request({
      url: that.data.url + '/index/pay/index',
      data: {
        goods_id: that.data.data.id,
        money: that.data.data.money,
        goods_type: 1,
        token: wx.getStorageSync('token'),
        remark: '',
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
            // wx.navigateBack({
            //   delta: 1
            // })
          }
        })
      }
    })
    console.log(111)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    util.fontFamily()
    if(options.lan == 'zang'){
      this.setData({
        lan_index:1
      })
    }
    this.setData({
      data:wx.getStorageSync('album')
    })
    this.setData({
      page_font:{
        name:['名称','མིང་།'],
        episodes:['集数','ལེ་ཚན།'],
        price:['价格', 'རིན་གོང་།'],
        reality:['实际支付', 'འགྲོ་སོང་བསྡོམས་འབོར།'],
        ex:['注：一旦售出不可退换、立即购买','མཆན། ཉོས་ཚར་རྗེས་ཕྱིར་ལོག་མི་བྱེད།'],
        pay:['立即购买','མྱུར་དུ་ཉོ།'],
        expect:['共 '+that.data.data.media.length+' 节课程','སློབ་ཚན'+that.data.data.media.length+'ཡོད།'],
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
    this.setData({pageFont: albumOrder()})
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