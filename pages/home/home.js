// pages/home/home.js
let app = getApp()
import {zang, commonweal} from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.pageUrl,
    //导航栏内容
    nav: [
      {
        id:1,
        title: "众筹"
      },
      {
        id:2,
        title: "课程"
      },
      {
        id:3,
        title: "问答"
      },
    ],
    page_index: 2,  //导航栏
    zbanner: null,  //藏 轮播图
    grid: null,     //九宫格
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  getData () {
    zang().then((res) => {
      this.setData({
        // 轮播
        zbanner: res.banner,
        // 九宫格
        grid: res.Zcate,
        // 热门课程
        zhot: res.hots,
        // 广告
        zad: res.photo,
        // 最新课程
        znew: res.news
      })
    })
    commonweal().then((res) => {
      console.log(res)
      this.setData({
        welCover: res.cover,
        welNew: res.news,
        welNeed: res.needs
      })
    })
  },
  swichNav (e) {
    var cur = e.target.dataset.current;
    console.log(cur)
    this.setData({
      page_index: cur
    })
  },
  addMore () {},
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