// pages/albumDetails/albumDetails.js
var util = require('../../utils/util')
var WxParse = require('../../wxParse/wxParse')
var app = getApp();

import { mediaurl } from "../../request/index"
// 背景音乐
const bgMusic = wx.getBackgroundAudioManager()

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
    showIndex: '1',
    // 页面文字
    page_font:null,
    playType: 0,
    playNum: 0,
    shareshow: false,
    isOpen: false,  //背景音乐开关
    currentTime: 200,    //正在播放的时间
    duration: 300,       //音乐总时长
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.fontFamily()
    // console.log(options.lan,options.id)
    console.log(options)
    let that = this,
        type = options.type,
        mediatype = options.mediatype,
        id = options.id
    // 初始化语言
    if(options.lan == 'zang'){
      this.setData({
        lan_index:1,
        lan: 'zang'
      })
      wx.setNavigationBarTitle({
        title:'ཆེད་བསྒྲིགས་རྒྱས་བཤད།'
      })
    }
    // 获取数据
    // that.getData(options.id)
    // type: 1专辑 0单曲    mediatype: 1视频 0音频
    that.setData({id, type, mediatype})
    if(type === '0'){
      this.getMedia(type, id)
    }
    
  },
  // 介绍和歌单的切换
  changeShow (e) {
    var n = e.currentTarget.dataset.show
    this.setData({
      showIndex: n
    })
  },
  getMedia(type, id){
    var that = this
    // if(type === '1'){
    mediaurl({type, id, token: wx.getStorageSync('token')}).then(res => {
      console.log(res)
      that.setData({
        data:res.media,
        // mediatype: res.media.media_type
      })
      if(this.data.mediatype === "0"){
        this.setData({
          bgMusicSrc: res.media.audio
        })
        console.log(this.data.bgMusicSrc)
        this.listenerButtonPlay()
      } else {
        this.setData({
          videoSrc: res.media.audio
        })
      }
    })
  },
  // 请求数据
  getData (id = this.data.id) {
    let that = this, media_type = this.data.mediatype
    wx.request({
      url: this.data.url+'/index/details/comdetails',
      header: {
        'content-type': 'application/json',
      },
      data: {
        id: id,
        // media_type: -1,
        media_type: -1,
        token: wx.getStorageSync('token')
      },
      success(res) {
        console.log(res)
        that.setData({
          showdata: res.data.media.media,
          data: res.data.media,
          media_type: res.data.media.media[0].media_type,
          listscope:[0,1]
        })
        // 获取视频
        that.getMedia(res.data.media.media[0].media_type, res.data.media.media[0].id)
        // 初始化页面文字
        that.setData({
          page_font:{
            listen:[that.data.data.sales+'人已收听','ཉན་མཁན་མི'+that.data.data.sales+'ཡོད།'],
            expect:['共 '+that.data.data.media.length+' 节课程','སློབ་ཚན'+that.data.data.media.length+'ཡོད།'],
            detail:['详情','རྒྱས་བཤད།'],
            program:['节目', 'ལེ་ཚན།'],
            audition:['试听', 'ཚོད་ཉན་བྱེད།'],
            buy:['立即购买','མྱུར་དུ་ཉོ།'],
            play:['播放全部', 'མཉམ་གཏོང་།'],
            selected:['选集','བདམས་སྒྲིག'],
            order:['正序','རིམ་སྒྲིག'],
            share:['分享','བརྒྱུད་སྐུར།'],
            author:['作者介绍', 'ཁྲིད་མཁན་ངོ་སྤྲོད།'],
            album:['专辑介绍','ནང་དོན་ངོ་སྤྲོད།'],
            once:['立即播放','ད་ལྟ་ཉན།'],
            vip_font:['开通会员后即可免费收听/观看', 'ཚོགས་མིར་ཐོ་འགོད་བྱས་རྗེས་རིན་མེད་ཉན་ཆོག'],
            vip_btn:['立即开通', 'ཚོགས་མིར་ཐོ་འགོད་བྱེད།']
          }
        })
        // 富文本转译
        that.wxParse()
        // 初始化页面数据
        that.setData({
          // 页数   一页10条数据
          pageCount: Math.ceil(res.data.media.media.length / 10),
        })
        // 设置选集选项卡
        that.setSelectArr()

        that.sharecar()
      }
    })
  },
  // 富文本转译
  wxParse () {
    var that = this
    var author = this.data.data.author_describe
    var album = this.data.data.good_describe
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
  // 跳转到播放页面
  jumpDetail (e) {
    var that = this
    var free = e.currentTarget.dataset.free
    var type = e.currentTarget.dataset.type
    var id = e.currentTarget.id
    var index = e.currentTarget.dataset.index
    // console.log(index)
    this.setData({
      playNum: parseInt(index)
    })
    if(that.data.sort === 0){
      wx.setStorageSync('playNum',index)
    } else {
      wx.setStorageSync('playNum',that.data.showdata.length - index-1)
    }
    
    console.log(e)
    // 判断用户是否购买专辑
    if(this.data.data.is_buy === 0){
      // 判断单曲是否购买
      if(free === '0'){
        console.log(1)
        if(that.data.lan_index === 1){
          wx.showToast({
            title: 'ད་དུང་ཉོས་མེད།',
            icon: 'none',
            mask: true,
            duration: 1500
          })
        } else {
          wx.showToast({
            title: '还没购买',
            icon: 'none',
            mask: true,
            duration: 1500
          })
        }
      } else {
        // 判断点击的是音频还是视频
        if(type === '0'){
          wx.navigateTo({
            url: '../singleDetails/singleDetails?lan='+that.data.lan+'&type=1&id='+id
          })
        } else {
          wx.navigateTo({
            url: '../video/video?lan='+that.data.lan+'&type=1&id='+id
          })
        }
      }
    } else {
      // 判断点击的是音频还是视频
      if(type === '0'){
        wx.navigateTo({
          url: '../singleDetails/singleDetails?lan='+that.data.lan+'&type=1&id='+id
        })
      } else {
        wx.navigateTo({
          url: '../video/video?lan='+that.data.lan+'&type=1&id='+id
        })
      }
    }
    // this.setSto(index)
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
      if(that.data.lan_index === 1){
        wx.showToast({
          title: 'ཆེད་བསྒྲིགས་འདི་ཁྱེད་ཀྱིས་ཉོས་ཡོད།',
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '您已购买该专辑',
          icon: 'none'
        })

      }
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
    var that = this
    //判断该专辑是否全部购买
    if(that.data.data.is_buy !== 0){
      //设置缓存
      that.setSto(0)
      // 判断第一个单曲的类别 跳转视频播放或音频播放
      if (that.data.data.media[0].media_type === '1') {
        wx.navigateTo({
          url: '../video/video?lan='+that.data.lan+'&type=1&id='+that.data.data.media[0].id
        })
      }else{
        wx.navigateTo({
          url: '../singleDetails/singleDetails?lan='+that.data.lan+'&type=1&id='+that.data.data.media[0].id
        })
      }
    } else {
      if(that.data.lan_index === 1){
        wx.showToast({
          title: 'ཆེད་བསྒྲིགས་འདི་ད་དུང་ཉོས་མེད།',
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '您还没购买该专辑',
          icon: 'none'
        })
      }
    }
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
    bgMusic.title = "哈哈哈"
    console.log(bgMusicSrc)
    if(bgMusic.src !== bgMusicSrc){
      bgMusic.src = bgMusicSrc
    }
    bgMusic.play()
    // 总时长
    that.setData({
      isOpen: true
    })
    
    bgMusic.onTimeUpdate(() => {
      // 当前时间
      let currentTime = bgMusic.currentTime
      that.setData({currentTime})
      let duration = bgMusic.duration
      if(that.data.duration !== duration){
        that.setData({duration})
        console.log(duration)
      }
      
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
  listenerButtonPrev () {},
  // 背景音乐下一首
  listenerButtonNext () {},
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
      if(that.data.lan_index === 1){
        wx.showToast({
          title: 'པར་རིས་ཉར་ཚགས་བྱས་ཡོད།',
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '图片已保存',
          icon: 'none'
        })
      }
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