var app = getApp();
var util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_auth:false,
    // 详情跳转类型
    detailType:1,
    token: wx.getStorageSync('token'),
    url:app.globalData.pageUrl,
    recommend:{},
    //显示的页面
    page_index: 53,
    //窗口高度
    winHeight: "",
    //预设当前项的值
    currentTab: "1",
    //tab标题的滚动条位置
    scrollLeft: 0,
    // 汉语数据
    chinese: null,
    // 书城数据
    book: null,
    // 公益数据
    welfare: null,
    // 访谈数据
    interview: null,
    sing: null,
    // 藏语页面
    // 轮播图数据
    carouselImg: {},
    // 广告位数据
    advertising: {
      "image": "../../images/guanggao.png",
      "title": "藏文图书最新出版语言课程",
      "introduction": "让我们一起去了解藏族文化"
    },

    // 最新课程数据
    latestCourse: []
  },
  pagejump (e) {
    console.log(e)
    var id = e.detail.id
    this.setData({
      page_index: id
    })
    if(id>=4){
      this.setData({
        scrollLeft: 300
      })
    }
  },
  swichNav (e) {
    var cur = e.target.dataset.current;
    console.log(cur)
    this.setData({
      page_index: cur
    })
  },

  // 热门课程跳转
hotCourse:function(e){
  var that = this
  var title = e.currentTarget.dataset.title
  console.log(that.data.page_index)
  wx.navigateTo({
    url: '../hotCourse/hotCourse?lan=zang&title='+title+'&cateId='+that.data.page_index,
  })
},
// 最新课程跳转
newCourse:function(e){
  var that = this
  var title = e.currentTarget.dataset.title
  wx.navigateTo({
    url: '../newCourse/newCourse?lan=zang&title='+title+'&cateType=1&cateId='+that.data.page_index,
  })
},
// 汉语推荐跳转
cnewCourse:function(e){
  var that = this
  var title = e.currentTarget.dataset.title
  wx.navigateTo({
    url: '../newCourse/newCourse?title='+title+'&cateType=1&cateId='+'2',
  })
},
// 商品推荐列表
bookNew (e) {
  var that = this
  var title = e.currentTarget.dataset.title
  wx.navigateTo({
    url: '../legalrecord/legalrecord?title='+title+'&catetype='+'2',
  })
},
// 商品详情页跳转
handlejump (e) {
  console.log(e.currentTarget.id)
  var id = e.currentTarget.id
  wx.navigateTo({
    url: '../bookdetail/bookdetail?id='+id,
  })
},
// 详情跳转(根据专辑单曲类型)
details:function(e){
  console.log(e)
  var id = e.currentTarget.id
  var type = e.currentTarget.dataset.type
  var mediatype = e.currentTarget.dataset.mediatype
  console.log(e.currentTarget)
  if(type === '1'){
    wx.navigateTo({
      url: '../albumDetails/albumDetails?lan=zang&id='+id,
    })
  } else {
    if(mediatype === '0'){
      wx.navigateTo({
        url: '../singleDetails/singleDetails?lan=zang&type=0&id='+id,
      })
    } else {
      wx.navigateTo({
        url: '../video/video?lan=zang&type=0&id='+id,
      })
    }
  }
},
// 汉语推荐  详情跳转(根据专辑单曲类型)
cdetails:function(e){
  console.log(e)
  var id = e.currentTarget.id
  var type = e.currentTarget.dataset.type
  var mediatype = e.currentTarget.dataset.mediatype
  console.log(e.currentTarget)
  if(type === '1'){
    wx.navigateTo({
      url: '../albumDetails/albumDetails?id='+id,
    })
  } else {
    if(mediatype === '0'){
      wx.navigateTo({
        url: '../singleDetails/singleDetails?type=0&id='+id,
      })
    } else {
      wx.navigateTo({
        url: '../video/video?type=0&id='+id,
      })
    }
  }
},
  // 二级页面跳转
  secondary: function (e) {
    var secondCur=e.currentTarget.id;
    console.log(secondCur);
    console.log(e)
    var str = wx.getStorageSync('token')
    console.log(str)
    if(secondCur == 23){
      wx.navigateTo({
        url: '../religion/religion?lan=zang'
      })
    } else{
      wx.navigateTo({
        url: '../history/history?lan=zang&id='+secondCur
      })
    }
   
  },
  // 广告位跳转
  navjump (e) {
    var url = e.currentTarget.dataset.nav
    // console.log(e)
    if(url && url !== '#'){
      wx.navigateTo({
        url
      })
    }
  },
  // 换一批
  updata (e) {
    var that = this
    console.log(1)
    var cateType = e.currentTarget.dataset.catetype
    wx.request({
      url:this.data.url + '/index/details/mediarand',
      data:{
        cateType: cateType,
        cateId:that.data.page_index
      },
      success: res => {
        console.log(res)
        if(cateType === '1'){
          that.setData({
            latestCourse:res.data.media
          })
        }else if(cateType === '2'){
          that.setData({
            hotCourse:res.data.media
          })
        }
      }
    })
  },
  // 汉语推荐换一批
  cupdata (e) {
    var that = this
    // console.log(1)
    var cateType = e.currentTarget.dataset.catetype
    wx.request({
      url:this.data.url + '/index/details/mediarand',
      data:{
        cateType: cateType,
        cateId: 2
      },
      success: res => {
        // console.log(res)
        // if(cateType === '1'){
        //   that.setData({
        //     latestCourse:res.data.media
        //   })
        // }else if(cateType === '2'){
          that.setData({
            chineseCommend:res.data.media
          })
        // }
      }
    })
  },
  // 获取数据
  getdata () {
    var that = this
    var progress = 0
    wx.showNavigationBarLoading()
    // 首页请求
    wx.request({
      url: app.globalData.pageUrl,
      data: {

      },
      header: {
        'content-type': 'application/json',
      },
      success(res) {
        // console.log(res.data);
        that.setData({
          tab: res.data.cates,
          nav: res.data.Zcate,
          url:app.globalData.pageUrl,
          carouselImg:res.data.banner,
          hotCourse:res.data.hots,
          advertising:res.data.photo,
          latestCourse:res.data.news,
          // 设置recommend数据
          ['recommend.zbanner']:res.data.banner,
          ['recommend.zphoto']:res.data.photo,
          ['recommend.zhots']:res.data.hots,
          ['recommend.tbanner']:res.data.tbanner,
          ['recommend.tphoto']:res.data.tphoto,
        })
        console.log(res.data.hots)
        progress+=10
        if(progress === 100){
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh()
        }
      }
    })
    // 汉语请求
    wx.request({
      url: app.globalData.pageUrl + '/index/index/chinese',
      success: res => {
        console.log(res.data)
        that.setData({
          chinese:res.data,
          chineseCommend: res.data.news,
          ['recommend.chots']:res.data.hots,
        })
        progress+=10
        if(progress === 100){
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh()
        }
      }
    })
    //书城请求
    wx.request({
      url: app.globalData.pageUrl + '/index/index/book',
      success: res => {
        // console.log(res.data)
        that.setData({
          book:res.data,
          ['recommend.bookhots']:res.data.hots,
        })
        progress+=10
        if(progress === 100){
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh()
        }
      }
    })
    //公益请求
    wx.request({
      url: app.globalData.pageUrl + '/index/index/commonweal',
      success: res => {
        // console.log(res.data)
        that.setData({
          welfare:res.data
        })
        progress+=10
        if(progress === 100){
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh()
        }
      }
    })
    //访谈请求
    wx.request({
      url: app.globalData.pageUrl + '/index/index/interview',
      success: res => {
        console.log(res.data)
        that.setData({
          interview:res.data,
          ['recommend.ihots']:res.data.more,
        })
        progress+=10
        if(progress === 100){
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh()
        }
      }
    })
    //唱咏请求
    wx.request({
      url: app.globalData.pageUrl + '/index/index/sing',
      success: res => {
        console.log(res.data)
        that.setData({
          sing:res.data
        })
        progress+=50
        if(progress === 100){
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh()
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // wx.hideTabBar({})
    var that = this;
    
    
    var str = wx.getStorageSync('token')
    // console.log(str)
    // console.log(str)
    wx.getSetting({
      success: res => {
        console.log(res)
        if(!res.authSetting['scope.userInfo']){
          that.setData({is_auth:true})
          wx.hideTabBar()
        }
        else{
           if(!that.data.token){
            console.log(1)
            that.setData({is_auth:true})
            wx.hideTabBar()
          }else{
            console.log(2)
            wx.showTabBar()
            that.getdata()
          }
        }
      }
    })
   
    // wx.checkSession({
    //   success: function () {
    //     wx.showTabBar({})
    //   },
    //   fail: function () {
    //     that.setData({
    //       is_auth: 'block'
    //     })
    //   }
    // })
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
                  that.getdata()
                }
              })
            }
          })
        }
      }
    })
  },
  // 历史播放
  play:function(){
    var playTable = wx.getStorageSync('playTable')
    var playList = wx.getStorageSync('playList')
    var playNum = wx.getStorageSync('playNum')
    var history = wx.getStorageSync('history')
    // 判断上一次是否播放的专辑
    if(playTable === 1){
      // 判断是存有专辑播放列表
      if(playList){
        var id = playList[playNum].id
        var media_type = playList[playNum].media_type
        if(media_type === '0'){
          wx.navigateTo({
            url: '../singleDetails/singleDetails?lan=zang&type=1&id='+id
          })
        } else {
          wx.showToast({
            title: '您没有正在播放的专辑',
            icon: 'none'
          })
        }
      } else {
        for(var i=0;i<history.length;i++){
          if(history[i].media_type === '0'){
            console.log(i)
            wx.navigateTo({
              url: '../singleDetails/singleDetails?lan=zang&n='+i
            })
            return
          }
        }
        wx.showToast({
          title: '您没有正在播放的专辑',
          icon: 'none'
        })
      }
    } else {
      for(var i=0;i<history.length;i++){
        if(history[i].media_type === '0'){
          console.log(i)
          wx.navigateTo({
            url: '../singleDetails/singleDetails?lan=zang&n='+i
          })
          return
        }
      }
      
      wx.showToast({
        title: '您没有正在播放的专辑',
        icon: 'none'
      })
    }
    // for (var i=0;i<historyArr.length;i++) {
    //   if(historyArr[i].media_type === '0'){
    //     wx.navigateTo({
    //       url: '../singleDetails/singleDetails?n='+i
    //     })
    //     return
    //   }
    // }
    // var bgMusic = wx.getBackgroundAudioManager()
    
    // wx.navigateTo({
    //   url: '../singleDetails/singleDetails'
    // })
    // wx.showToast({
    //   title: '您还没播放过音乐',
    //   icon: 'none'
    // })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var str = wx.getStorageSync('token')
    // console.log(str)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    util.fontFamily()
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
    this.getdata()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log(1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})