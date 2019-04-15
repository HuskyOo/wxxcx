// pages/albumDetails/albumDetails.js
var util = require('../../utils/util')
var WxParse = require('../../wxParse/wxParse')
var app = getApp();

import { mediaurl, comdetails } from "../../request/index"
import { albumDetail } from "../../font/index"
// 背景音乐
let bgMusic = wx.getBackgroundAudioManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 排序
    sort:0,
    url:app.globalData.pageUrl,
    // 语言设置
    lan_index:0,
    // 当前显示的页码 默认显示第一页
    pageIndex: 0,
    // 介绍和歌单的切换
    showIndex: '1',
    // 页面文字
    page_font:null,
    playType: 0,
    playNum: 0,
    shareshow: false, //分享的开关
    isOpen: false,  //背景音乐开关
    currentTime: 0,    //正在播放的时间
    duration: 0,       //音乐总时长
    showCurrentTime: '0:00',  //显示的正在播放的时间
    showDuration: '0:00',   //x显示的总时长
    bgMusicSrc: wx.getStorageSync('audioSrc') || null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.fontFamily()
    // console.log(options.lan,options.id)
    // console.log(options)
    let that = this,
        type = options.type,
        mediatype = options.mediatype,
        id = options.id
    // type: 1专辑 0单曲    mediatype: 1视频 0音频
    that.setData({id, type, mediatype})
  },
  // 介绍和歌单的切换
  changeShow (e) {
    var n = e.currentTarget.dataset.show
    this.setData({
      showIndex: n
    })
  },
  getMedia(type, id, play = false){
    var that = this
    mediaurl({type, id, token: wx.getStorageSync('token')}).then(res => {
      console.log(res)
      this.setData({
        author_describe: res.media.author_describe,
        good_describe: res.media.good_describe
      })
      this.wxParse()
      if(this.data.type === "0"){
        that.setData({
          data:res.media
        })
      }
      if(res.media.is_buy === 0 && res.media.is_free === '0'){
        wx.showToast({
          title: this.data.pageFont.noBuyToast, //提示的内容,
          icon: 'none', //图标,
          duration: 2000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: res => {}
        });
        return
      }
      wx.setStorageSync('playId', id)
      if(this.data.mediatype === "0"){
        this.setData({
          bgMusicSrc: res.media.audio,
          showDuration: res.media.duration,
          bgMusicTitle: res.media.title,
          bgMusicCoverImgUrl: this.data.url + res.media.cover,
        })
        wx.setStorageSync('audioSrc', res.media.audio)
        // 播放
        if (play) {
          this.listenerButtonPlay()
        }
      } else {
        this.setData({
          videoSrc: res.media.audio
        })
      }
     
      
    })
  },
  // 请求数据
  getData (id = this.data.id) {
    let that = this, histroyId = wx.getStorageSync('history')[0].item[0].id, playId = wx.getStorageSync('playId')
    comdetails({id, media_type: -1, token: wx.getStorageSync('token')}).then(res => {
      // console.log(res)
        that.setData({
          showdata: res.media.media,
          data: res.media,
          listscope:[0,1]
        })
        wx.setStorageSync('playList', res.media.media)
        

        // 获取播放地址
        if(histroyId === that.data.id){
          that.getMedia(1, playId)
        } else {
          that.getMedia(1, res.media.media[0].id)
          wx.setStorageSync('playId', res.media.media[0].id)
        }

        // 初始化页面数据
        that.setData({
          // 页数   一页10条数据
          pageCount: Math.ceil(res.media.media.length / 10),
        })
        // 设置选集选项卡
        that.setSelectArr()

        that.sharecar()
      // }
    })
  },
  // 富文本转译
  wxParse () {
    var that = this
    var author = this.data.author_describe
    var album = this.data.good_describe
    WxParse.wxParse('author', 'html', author, this, 0)
    WxParse.wxParse('album', 'html', album, this, 0)
  },
  // 设置选集选项卡
  setSelectArr () {
    var that = this
    var num = that.data.pageCount
    var arr = []
    for(var i=1;i<=num;i++){
      var str = `${(i-1)*10 + 1} ~ ${i*10}`
      arr.push(str)
    }
    that.setData({
      pageArr: arr
    })
    console.log(arr)
  },
  // 排序
  handlesort () {
    var that = this
    // console.log()
    if(that.data.sort === 0){
      var arr = that.data.showdata.reverse()
      that.setData({
        showdata:arr,
        sort:1
      })
    }else{
      var arr = that.data.showdata.reverse()
      that.setData({
        showdata:arr,
        sort:0
      })
    }
    that.setData({
      // pageIndex: 0
      listscope: [0,1]
    })
  },
  // 选集
  handleSelect (e) {
    var that = this
    var sort = that.data.sort
   
    console.log(sort)
    if(sort === 1){ 
      var arr = that.data.showdata.reverse()
      that.setData({
        showdata: arr,
        sort:0
      })
    }
    
    var value = parseInt(e.detail.value)
    console.log(e.detail.value)
    that.setData({
      listscope: [value,value+1]
    })
  },
  // 点击播放
  jumpDetail (e) {
    let type = this.data.type, mediatype = this.data.mediatype, id = e.currentTarget.id, free = e.currentTarget.dataset.free, buy = e.currentTarget.dataset.buy
    console.log(e)
    if (buy === 0 && free === '0') {
      wx.showModal({
        title: this.data.pageFont.hint, //提示的标题,
        content: this.data.pageFont.hintContent, //提示的内容,
        showCancel: true, //是否显示取消按钮,
        cancelText: this.data.pageFont.cancel, //取消按钮的文字，默认为取消，最多 4 个字符,
        cancelColor: '#000000', //取消按钮的文字颜色,
        confirmText: this.data.pageFont.sure, //确定按钮的文字，默认为取消，最多 4 个字符,
        confirmColor: '#3CC51F', //确定按钮的文字颜色,
        success: res => {
          if (res.confirm) {
            // console.log('用户点击确定')
            // wx.navigateTo({ url: '/pages/albumOrders/albumOrders' });
            this.tobuy()
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      });
      return
    }
    // console.log(id)
    this.getMedia(type, id)
  },
  // 设置缓存
  setSto (index) {
    var that = this
    wx.setStorage({
      key: 'playType',
      data: that.data.playType
    })
    wx.setStorage({
      key: 'playNum',
      data: index
    })
    wx.setStorage({
      key: 'playList',
      data: that.data.data.media
    })
  },
  // 购买跳转 
  tobuy:function() {
    var that = this
    // 判断用户是否购买该专辑 0-->未购买
    if(that.data.data.is_buy !== 0){
        wx.showToast({
          title: this.data.pageFont.bought,
          icon: 'none'
        })
    }else{
      wx.setStorage({
        key:'album',
        data:that.data.data
      })
      wx.navigateTo({
        url: '../albumOrders/albumOrders?lan='+(that.data.lan_index == 1 ? 'zang' : '')
      })
    }
  },
  // 会员开通
  jumpMember () {
    wx.navigateTo({
      url: '../member/member'
    })
  },
  // 播放全部
  playAll: function(){
    var id = this.data.data.media[0].id
    this.getMedia(this.data.type, id)
  },
  // 试听
  testListen () {
    console.log(this.data.data.media[0].id)
    var that = this
    var id = this.data.data.media[0].id
    var media_type = this.data.data.media[0].media_type
    console.log(id)
    if(media_type === '1'){
      wx.navigateTo({
        url: '../video/video?lan='+that.data.lan+'&type=1&id='+id
      })
    }else{
      wx.navigateTo({
        url: '../singleDetails/singleDetails?lan='+that.data.lan+'&type=1&id='+id
      })
    }
  
  },
  // 上一页
  prev () {
    var x = this.data.listscope[0] - 1
    var y = this.data.listscope[1]
    this.setData({
      listscope: [x,y]
    })
  },
  // 下一页
  next () {
    var x = this.data.listscope[0]
    var y = this.data.listscope[1] + 1
    this.setData({
      listscope: [x,y]
    })
  },
  // setBgmusicInfo () {},
  // 背景音乐播放
  listenerButtonPlay () {
    let that = this, bgMusicSrc = that.data.bgMusicSrc
    // bgMusic.title = "哈哈哈"
    bgMusic.title = this.data.bgMusicTitle
    bgMusic.coverImgUrl = this.data.bgMusicCoverImgUrl
    console.log(bgMusicSrc)
    if(bgMusic.src !== bgMusicSrc){
      bgMusic.src = bgMusicSrc
    } else {
      console.log(1)
      bgMusic.seek(wx.getStorageSync('currentTime'))
    }
      
    
    bgMusic.play()
    // 总时长
    that.setData({
      isOpen: true
    })
    
    bgMusic.onTimeUpdate(() => {
      // 当前时间
      let currentTime = bgMusic.currentTime
      
      if(currentTime !== 0){
        that.setData({
          currentTime, 
          showCurrentTime: app.switchTime(Math.round(currentTime))
        })
        wx.setStorageSync('currentTime',currentTime)
      }
      let duration = bgMusic.duration
      if(that.data.duration !== duration){
        that.setData({duration})
        console.log(duration)
      }
      bgMusic.onEnded(() => {
        that.listenerButtonNext()
      })
    })
    
  },
  // 背景音乐暂停
  listenerButtonPause () {
    bgMusic.pause()
    this.setData({
      isOpen: false
    })
  },
  // 背景音乐上一首
  listenerButtonPrev () {
    this.listenerButtonPause()
    if (this.data.type === '0') {
      wx.showToast({
        title: this.data.pageFont.firstAlbum,
        icon: 'none',
      })
    } else {
      let playId = wx.getStorageSync('playId'), playList = wx.getStorageSync('playList'), id = null
      playList.forEach((item, index, arr) => {
        if(item.id === playId && index > 0){
          id = arr[index-1].id
        }
      })
      if (id) {
        this.getMedia(this.data.type, id, true)
      } else {
        wx.showToast({
          title: this.data.pageFont.firstAlbum,
          icon: 'none'
        });
      }
    }
  },
  // 背景音乐下一首
  listenerButtonNext () {
    this.listenerButtonPause()
    if (this.data.type === '0') {
      wx.showToast({
        title: this.data.pageFont.lastAlbum,
        icon: 'none',
      })
    } else {
      let playId = wx.getStorageSync('playId'), playList = wx.getStorageSync('playList'), id = null
      playList.forEach((item, index, arr) => {
        if(item.id === playId && index < arr.length - 1){
          id = arr[index+1].id
        }
      })
      if (id) {
        this.getMedia(this.data.type, id, true)
      } else {
        wx.showToast({
          title: this.data.pageFont.lastAlbum,
          icon: 'none'
        });
      }
    }
  },
  // 背景音乐进度条
  sliderChange (e) {
    console.log(e.detail.value)
    bgMusic.seek(e.detail.value)
  },
// 分享
sharecar () {
  var that = this
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length-1] //获取当前页面的对象
  var url = currentPage.route //当前页面url
  var options = currentPage.options //如果要获取url中所带的参数可以查看options
  var arr = []
  for(var key in options){
    var str = key+'='+options[key]
    console.log(str)
    arr.push(str)
  }
  var pageUrl = url+'?'+arr.join('&')
  that.setData({pageUrl})
},
// 显示分享
shareshow () {
  this.setData({
    shareshow:true
  })
},
// 不显示分享
back(){
  this.setData({
    shareshow:false
  })
},
// 保存
save () {
  var that = this
  wx.saveImageToPhotosAlbum({
    filePath: that.data.shareImg,
    success: res => {
      console.log(res)
      wx.showToast({
        title: this.data.pageFont.imgSave,
        icon: 'none'
      })
      that.back()
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
    // var that = this
    // if(that.data.type == 1){
    //   that.getData(that.data.id)
    // } else {
    //   that.getMedia(that.data.type, that.data.id)
    // }
    this.setData({
      pageFont: albumDetail()
    })
    if(this.data.type === '0'){
      this.getMedia(this.data.type, this.data.id)
      this.setData({
        showIndex: '0'
      })
    } else {
      this.getData()
    }
    let state = bgMusic.paused
    if (state === false) {
      this.listenerButtonPlay()
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