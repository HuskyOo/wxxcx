// pages/my-course/my-course.js
let app = getApp(), util = require('../../utils/util')
import { buy } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.pageUrl,
    navIndex: 1,
    navList:[
      {
        id: 1,
        img: '/images/cancel.png',
        activeImg: '',
        title: '历史'
      },
      {
        id: 2,
        img: '/images/buy.png',
        activeImg: '',
        title: '已购买'
      },
      {
        id: 3,
        img: '/images/yiwancheng.png',
        activeImg: '',
        title: '收藏'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.fontFamily()
    this.getData()
  },

  getData () {
    buy().then((res) => {
      console.log(res)
      this.setData({
        buy: res
      })
    })
    this.setData({history: wx.getStorageSync('history')})
  },
  switchNav (e) {
    let id = e.currentTarget.id
    // console.log(id)
    this.setData({
      navIndex: id
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