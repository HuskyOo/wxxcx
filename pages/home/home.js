// pages/home/home.js
let app = getApp(), util = require('../../utils/util')
import {zang, book, commonweal, allClassify, mediaurl, mediarand} from "../../request/index"
import {index} from "../../font/index"
let bgMusic = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.pageUrl,
    is_auth:false,  //授权
    //导航栏内容
    nav: [],
    page_index: 1,  //导航栏
    zbanner: null,  //藏 轮播图
    grid: null,     //九宫格
    addMore: false, //九宫格是否展开,
    animation: null,  //展开动画
    unfoldAnimation: {},  //展开箭头动画
    classify: [],   //分类
    lan: wx.getStorageSync('lan'),  //语言
    scrollTop: 0, //
    scroolAnimation: {},  //控制台动画
    scroolTimer: null,
    controlShow: false,   //是否显示控制台  音频显示
    controlInfo: null,    //控制台基本信息
    pageFont: {}, //页面文字
    bgOpen: false,  //音乐是否为播放状态
    showCurrentTime: '0:00',  //正在播放的时长
    continuousPlay: false,  //是否继续播放
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    this.setData({
      pageFont: index()
    })
    this.auth()
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
      let book = res.news
      book.length = 3
      this.setData({
        book: book
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
      let arr = res.cate
      arr.forEach((item, i, arr) => {
        item.chlid.length = Math.ceil(item.chlid.length/3) * 3
      })
      this.setData({
        classify: arr
      })
    })
  },
  swichNav (e) {
    var index = e.target.dataset.index;
    this.setData({
      page_index: index
    })
  },
  addMore () {
    let addMore = this.data.addMore
    if(!addMore){
      this.animation.height('310rpx').step()
      this.unfoldAnimation.rotate(180).step()
    } else {
      this.animation.height(0).step()
      this.unfoldAnimation.rotate(0).step()
    }
    this.setData({
      animation: this.animation.export(),
      unfoldAnimation: this.unfoldAnimation.export(),
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
  changeLan () {
    let lan = this.data.lan
    if(lan === 0) {
      this.setData({
        lan: 1
      })
      wx.setStorage({
        key: 'lan',
        data: 1
      });
    } else {
      this.setData({
        lan: 0
      })
      wx.setStorage({
        key: 'lan',
        data: 0
      });
    }
  },
  handleControl (e) {
    let that = this
    clearTimeout(that.data.scroolTimer)
    that.scroolAnimation.opacity(0).step()
    that.setData({
      scroolAnimation: that.scroolAnimation.export(),
      scroolTimer: setTimeout(() => {
        that.controlShow()
      }, 300)
    })
  },
  controlShow () {
    this.scroolAnimation.opacity(1).step()
    this.setData({
      scroolAnimation: this.scroolAnimation.export()
    })
  },
  setBgMusic () {   //音乐播放设置
    let history = wx.getStorageSync('history'), info = history[0].item[0], that = this, currentTime = wx.getStorageSync('currentTime')
    console.log(info)
    that.setData({
      showCurrentTime: app.switchTime(Math.round(currentTime)) ? app.switchTime(Math.round(currentTime)) : '0:00'
    })
    if(info.media_type === "0"){
      that.setData({
        controlShow: true,
        controlInfo: info
      })
      bgMusic.title = info.title,
      bgMusic.coverImgUrl = that.data.url + info.cover
      let state = bgMusic.paused
      console.log(state)   //undefined  false(正在播放)  true暂停 停止
      if(state === false) {
        that.setData({
          bgOpen: true
        })
        that.bgTimeUpdate()
      } else {
        that.setData({
          bgOpen: false
        })
      }
    } else {
      that.setData({controlShow: false})
    }
  },
  bgPause () {  //暂停音乐
    bgMusic.pause()
    this.setData({bgOpen:false})
  },
  bgPlay () {
    let state = bgMusic.pause, that = this, currentTime = wx.getStorageSync('currentTime'), audioSrc = bgMusic.src, info = wx.getStorageSync("history")[0].item[0]
    bgMusic.title = info.title,
    bgMusic.coverImgUrl = that.data.url + info.cover
    // if(state === 
    console.log(audioSrc, wx.getStorageSync('audioSrc'))
    that.setData({
      bgOpen: true
    })
    if(!bgMusic.src){
      bgMusic.src = wx.getStorageSync('audioSrc')
      bgMusic.startTime = currentTime
    }
    bgMusic.play()
    bgMusic.seek(currentTime)
    that.bgTimeUpdate()
  },
  bgNext () {
    let type = wx.getStorageSync('history')[0].item[0].type, playId = wx.getStorageSync('playId'), playList = wx.getStorageSync('playList'), playIndex = null
    if(type === "0"){
      wx.showToast({
        title: "歌曲已全部播放完毕"
      })
    } else {
      for(var i=0; i<playList.length; i++){
        if(playList[i].id === playId){
          playIndex = i
        }
      }
      if(playIndex !== null){
        this.getMedia(playList[playIndex + 1].id)
        wx.setStorageSync('playId', playList[playIndex + 1].id)
      } else {
        console.log(1, playIndex)
        wx.showToast({
          title: "歌曲已全部播放完毕"
        })
      }
    }
  },
  bgTimeUpdate () {
    let that = this
    bgMusic.onTimeUpdate(() => {
      let currentTime = bgMusic.currentTime, state = bgMusic.pause
      if(currentTime !== 0){
        that.setData({
          showCurrentTime: app.switchTime(Math.round(currentTime))
        })
        wx.setStorageSync('currentTime',currentTime)
      }
    })
  },
  getMedia(id){
    this.setData({
      bgMusic: false
    })
    mediaurl({type: 1,id,token: wx.getStorageSync('token')}).then(res => {
      console.log(res)
      wx.setStorageSync("audioSrc", res.media.audio)
      bgMusic.title = res.media.title
      bgMusic.coverImgUrl = this.data.url + res.media.cover
      bgMusic.src = res.media.audio
      this.setData({
        bgOpen: true
      })
    })
  },
  jumpAlbum () {
    let history = wx.getStorageSync('history')[0].item[0]
    wx.navigateTo({
      url: `/pages/albumDetails/albumDetails?type=${history.type}&mediatype=${history.media_type}&id=${history.id}`
    })
  },
  update (e) {
    // cateType 1最新 2热门
    let cateId = e.detail.cateId, cateType = e.detail.cateType
    mediarand({cateId, cateType}).then(res => {
      console.log(res)
      if(cateType === 1){
        this.setData({znew: res.media})
      } else {
        this.setData({zhot: res.media})
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
    // 动画
    this.animation = wx.createAnimation()
    this.unfoldAnimation = wx.createAnimation({});
    this.scroolAnimation = wx.createAnimation({
      duration: 150
    });
    if(!this.data.animation){
      this.animation.height(0).step()
      this.setData({animation: this.animation.export()})
    }
    // 文字
    this.setData({
      pageFont: index()
    })
    // console.log(this.data.pageFont)
    // 设置背景音乐
    if(wx.getStorageSync('history').length > 0){
      this.setBgMusic()
    }
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