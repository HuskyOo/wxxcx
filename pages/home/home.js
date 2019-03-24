// pages/home/home.js
let app = getApp(), util = require('../../utils/util')
import {zang, book, commonweal, allClassify} from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.pageUrl,
    is_auth:false,  //授权
    //导航栏内容
    nav: [
      // {
      //   id:1,
      //   title: "众筹"
      // },
      // {
      //   id:2,
      //   title: "课程"
      // },
      // {
      //   id:3,
      //   title: "问答"
      // },
    ],
    page_index: 0,  //导航栏
    zbanner: null,  //藏 轮播图
    grid: null,     //九宫格
    addMore: false, //九宫格是否展开,
    animation: {},  //展开动画
    classify: [],   //分类
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.fontFamily()
    this.auth()
    this.getData()
  },
  auth () {
    let that = this, token = wx.getStorageSync('token')
    // console.log(token)
    wx.getSetting({
      success: res => {
        // console.log(res)
        if(!res.authSetting['scope.userInfo']){
          that.setData({is_auth:true})
          wx.hideTabBar()
        }
        else{
           if(!token){
            // console.log(1)
            that.setData({is_auth:true})
            wx.hideTabBar()
          }else{
            // console.log(2)
            wx.showTabBar()
            // that.getdata()
          }
        }
      }
    })
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
        znew: res.news,
        nav: res.cates
      })
    })
    book().then((res) => {
      // console.log(res)
      this.setData({
        book: res.news
      })
    })
    commonweal().then((res) => {
      // console.log(res)
      this.setData({
        welCover: res.cover,
        welNew: res.news,
        welNeed: res.needs
      })
    })
    allClassify().then((res) => {
      // console.log(res)
      // let arr2 = []
      // arr2.length
      let arr = res.cate
      arr.forEach((item, i, arr) => {
        // console.log(item,i)
        // console.log(item.child.length)
        item.chlid.length = Math.ceil(item.chlid.length/3) * 3
      })
      this.setData({
        classify: arr
      })
    })
  },
  swichNav (e) {
    var index = e.target.dataset.index;
    // console.log(index)
    this.setData({
      page_index: index
    })
  },
  addMore () {
    // this.setData({
    //   addMore: !this.data.addMore
    // })
    let addMore = this.data.addMore
    if(!addMore){
      // console.log(addMore)
      this.animation.height('300rpx').step()
    } else {
      // console.log(addMore)
      this.animation.height(0).step()
    }
    
    this.setData({
      animation: this.animation.export(),
      addMore: !addMore
    })
  },
  jumpLive () {},
  jumpClassifyDetail (e) {
    console.log()
    let id = e.currentTarget.id
    if(id){
      wx.navigateTo({ url: '/pages/classifyDetail/classifyDetail?id=' + id });
    }
  },
  onGotUserInfo:function(){
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code;
        if (code) {
          wx.getUserInfo({
            withCredentials: true,
            lang: 'zh_CN',
            success: function (res) {
              wx.request({
                url: app.globalData.pageUrl+'/wechat/index/user',
                data: { code: code, encryptedData: res.encryptedData, iv: res.iv },
                success: function (res) {
                  console.log(res.data.token)
                  wx.showTabBar({})
                  wx.setStorageSync('token', res.data.token)
                  that.setData({
                    is_auth: false,
                  })
                  that.getData()
                }
              })
            }
          })
        }
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
    this.animation = wx.createAnimation()
    this.animation.height(0).step()
    this.setData({animation: this.animation.export()})
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