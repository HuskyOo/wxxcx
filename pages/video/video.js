// pages/video/video.js
var app = getApp()
var util = require('../../utils/util')
var WxParse = require('../../wxParse/wxParse')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:app.globalData.pageUrl,
    video_src: 'http://qiuniu.vmobplus.com/fufei201812051709461939.mp4',
    isShow: '1',
    boxShow: false,
    page_index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.fontFamily()
    var that = this
    // console.log(options.id)
    var id = options.id
    var n = options.n
    var lan = options.lan
    that.setData({
      page_font:{
        catalog:['目录','ལེ་ཚན།'],
        intro: ['简介','ངོ་སྤྲོད།'],
        author: ['作者介绍','མི་སྣ་ངོ་སྤྲོད།'],
        album: ['专辑介绍','ནང་དོན་ངོ་སྤྲོད།'],
        nobuy:['您还没购买该视频','བརྙན་འདི་ད་དུང་ཉོས་མེད།'],
        nowbuy:['立即购买', 'ད་ལྟ་ཉོ།'],
        vip_font:['开通会员后即可免费收听/观看', 'ཚོགས་མིར་ཐོ་འགོད་བྱས་རྗེས་རིན་མེད་ཉན་ཆོག'],
        vip_btn:['立即开通', 'ཚོགས་མིར་ཐོ་འགོད་བྱེད།']
      }
    })
    if(lan === 'zang'){
      that.setData({
        page_index:1
      })
    }
    console.log(n)
    // 如果有n参数就从历史记录取数据
    if(n){
      that.getHis(n)
      return
    }
    // console.log(options.type)
    var type = parseInt(options.type)
    that.setData({type})
    // if(type === 0){
    //   that.setData({
    //     isShow: '2'
    //   })
    // }
    that.getData(id,type)
  },
  // 会员开通
  jumpMember () {
    wx.navigateTo({
      url: '../member/member'
    })
  },
  // 从历史记录里获取数据
  getHis (n) {
    var that = this
    var history = wx.getStorageSync('history')
    that.setData({
      data:history[n]
    })
    if(history[n].is_buy === 0){
      that.setData({
        boxShow: true
      })
    }
    that.showTab()
    that.sethistory()
    that.setParse()
  },
  // 是否显示目录
  // showTab () {
  //   var that = this
  //   var data = that.data.data
  //   if(!data.list){
  //     that.setData({
  //       isShow: '2'
  //     })
  //   }
  // },
  // 用id获取数据
  getData (id, type) {
    var that = this
    wx.request({
      url:that.data.url + '/index/details/mediaurl',
      data: {
        id: id,
        type: type,
        token: wx.getStorageSync('token')
      },
      success: res => {
        
        console.log(res)
        if(res.data.media.is_buy === 0){
          that.setData({
            boxShow: true
          })
        }
        that.setData({
          data:res.data.media
        })
        // that.showTab()
        that.sethistory()
        that.setParse()
      }
    })
  },
  // 富文本转换
  setParse () {
    var that = this
    var author = that.data.data.author_describe
    var album = that.data.data.good_describe
    WxParse.wxParse('author', 'html', author, this, 0)
    WxParse.wxParse('album', 'html', album, this, 0)
  },
  // 节目的更换
  changePro (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    var free = e.currentTarget.dataset.free
    if(free === '0' && that.data.data.is_buy === 0){
      if(that.data.page_index === 1){
        wx.showToast({
          title: 'ཉོས་རྗེས་ལྟ་ཐུབ།',
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '购买后即可观看',
          icon: 'none'
        })
      }
      
      return
    }
    this.getData(id,1)
  },
  // 立即购买按钮
  buyMV () {
    var that = this
    wx.request({
      url: that.data.url + '/index/pay/index',
      data: {
        goods_id: that.data.data.id,
        money: that.data.data.money,
        goods_type: 1,
        token: wx.getStorageSync('token'),
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
            // wx.navigateBack({
            //   delta: 1
            // })
            that.getData(that.data.data.id,0)
            that.setData({
              boxShow:false
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
  },
  // 简介和目录的切换
  show (e) {
    var str = e.currentTarget.dataset.show
    this.setData({
      isShow: str
    })
  },
  // 设置播放历史
  sethistory () {
    var that = this
    var data = that.data.data
    var time = util.formatTime(new Date())
    var arr = []
    console.log(time)
    data.hisTime = time
    var history = wx.getStorageSync('history')
    for(var i=0;i<history.length;i++){
      if(history[i].id === data.id){
        console.log(1)
        history.splice(i,1)
        break
      }
    }
    history.unshift(data)
    wx.setStorage({
      key: 'history',
      data: history
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