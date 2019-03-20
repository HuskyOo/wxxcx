// pages/hotCourse/hotCourse.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:1,
    hotCourse: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var cateId = options.cateId
    var title = options.title
    var lan = options.lan
    if(lan){
      that.setData({lan})
    } else {
      that.setData({
        lan:0
      })
    }
    console.log(lan)
    wx.setNavigationBarTitle({
      title
    })
    that.setData({
      cateId:cateId
    })
    console.log(options)
    that.getData()
  },
  getData (p) {
    var that = this
    if(!p){
      p=1
    }
    wx.request({
      url: app.globalData.pageUrl+'/index/details/medialist',
      data: {
        cateType:2,
        cateId:that.data.cateId,
        p:p
      },
      header: {
        'content-type': 'application/json',
      },
      success(res) {
        console.log(res)
        var hotCourse = that.data.hotCourse
        if(res.data.media){
          console.log(1)
          var arr = hotCourse.concat(res.data.media)
          that.setData({
            url: app.globalData.pageUrl,
            hotCourse: arr,
            code: res.data.code,
            p:p
          })
        }else{
          if(that.data.lan){
            wx.showToast({
              title:'ཆེས་མཇུག་མ།',
              icon:'none',
              duration: 1500
            })
          } else {
            wx.showToast({
              title:'已经到底了',
              icon:'none',
              duration: 1500
            })
          }
          
        }
        
      }
    })
  },
  details:function(e){
    console.log(e)
    var id = e.currentTarget.id
    var type = e.currentTarget.dataset.type
    var lan = this.data.lan
    // console.log(id)
    // if(type === '0'){
    //   wx.navigateTo({
    //     url: '../singleDetails/singleDetails?type=0&id='+id,
    //   })
    // }else if(type == 1){
    //   wx.navigateTo({
    //     url: '../video/video?type=0&id='+id,
    //   })
    // }else{
    //   type = -1
    //   wx.navigateTo({
    //     url: '../albumDetails/albumDetails?lan='+lan+'&id='+id,
    //   })
    // }
    var mediatype = e.currentTarget.dataset.mediatype
    console.log(e.currentTarget)
    if(type === '1'){
      wx.navigateTo({
        url: '../albumDetails/albumDetails?lan='+lan+'&id='+id,
      })
    } else {
      if(mediatype === '0'){
        wx.navigateTo({
          url: '../singleDetails/singleDetails?lan='+lan+'&type=0&id='+id,
        })
      } else {
        wx.navigateTo({
          url: '../video/video?lan='+lan+'&type=0&id='+id,
        })
      }
    }
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
    var that = this
    console.log(that.data.hotCourse)

    var p = that.data.p + 1
    that.getData(p)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})