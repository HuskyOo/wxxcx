// pages/my-course/my-course.js
let app = getApp(), util = require('../../utils/util')
import { buy } from '../../request/index'
import { myCourse } from '../../font/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.pageUrl,
    navIndex: 1,  //选中的导航
    navList:[], //导航栏数据
    pageFont: {}, //页面文字
    history: [],  //历史数据
    buy: [],  //购买数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    console.log(id)
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
    let pageFont = myCourse()
    this.setData({
      pageFont: pageFont,
      navList:[
        {
          id: 1,
          img: '/images/course_history.png',
          activeImg: '/images/course_history_select.png',
          title: pageFont.history
        },
        {
          id: 2,
          img: '/images/course_buy.png',
          activeImg: '/images/course_buy_select.png',
          title: pageFont.buy
        },
        {
          id: 3,
          img: '/images/course_enshrine.png',
          activeImg: '/images/course_enshrine_select.png',
          title: pageFont.enshrine
        },
      ],
    })
    // console.log(this.data.pageFont)
    this.getData()
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