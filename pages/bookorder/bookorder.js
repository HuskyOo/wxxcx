// pages/bookorder/bookorder.js
var app = getApp()
var util = require('../../utils/util')
import { bookorder } from '../../font/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.pageUrl,
    getdress: false,
    remark: '',
    dressData: {
      provinceName: '',
      cityName: '',
      countyName: '',
      detailInfo: '',
      telNumber: '',
      userName: '',
      postalCode: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.fontFamily()
    this.setData({
      buyInfo:wx.getStorageSync('bookBuy')
    })
  },
  preview (e) {
    var src = e.currentTarget.dataset.src
    wx.previewImage({
      urls:[src]
    })
  },
  isBuy () {
    var that = this
    if(that.data.getdress || that.data.remark){
      wx.request({
        url: that.data.url + '/index/pay/index',
        data: {
          goods_id: that.data.buyInfo.id,
          money: that.data.buyInfo.money*that.data.buyInfo.saleNum,
          goods_type: 0,
          token: wx.getStorageSync('token'),
          address: that.data.dressData.provinceName + that.data.dressData.cityName + that.data.dressData.countyName + that.data.dressData.detailInfo,
          mobile: that.data.dressData.telNumber,
          user: that.data.dressData.userName,
          zipcode: that.data.dressData.postalCode,
          goods_num: that.data.buyInfo.saleNum,
          remark: that.data.remark
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
    }else{
      wx.showToast({
        title: that.data.pageFont.selAddToast,
        icon: 'none'
      })
    }
  },
  getAddress () {
    var that = this
    console.log(1)
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.address']) {
          wx.authorize({
            scope: 'scope.address',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              // wx.startRecord()
              wx.chooseAddress({
                success: res => {
                  console.log(res)
                  that.setData({
                    getdress: true,
                    dressData:res
                  })
                }
              })
            },
            fail () {
              // console.log(2)
              wx.showToast({
                title: 'ཁྱེད་ཀྱིས་དང་ལེན་བྱས་མེད།',
                icon: 'none'
              })
            }
          })
        } else {
          wx.chooseAddress({
            success: res => {
              console.log(res)
              that.setData({
                getdress: true,
                dressData:res
              })
            }
          })
        }
      }
    })
    // wx.chooseAddress({
    //   success: res => {
    //     console.log(res)
    //   }
    // })
  },
  handleRemark (e) {
    let remark = e.detail.value
    this.setData({remark})
    // console.log(remark)
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
    this.setData({
      pageFont: bookorder()
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