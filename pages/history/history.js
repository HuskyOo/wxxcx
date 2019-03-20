// pages/history/history.js
var app = getApp();
Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    url:'',
    hotCourse: null,
  },
  // 详情跳转
  details:function(e){
    var that = this
    console.log(e)
    var id = e.currentTarget.id
    var type = e.currentTarget.dataset.type
    var lan = that.data.lan
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
    //     url: '../albumDetails/albumDetails?lan=zang&id='+id,
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.lan)
    let that = this;
    // console.log(that.data)
    if(options.lan){
      that.setData({
        lan: options.lan
      })
    }
    wx.request({
      url: app.globalData.pageUrl + '/index/index/religionCate',
      data: {
        id:options.id
      },
      header: {
        'content-type': 'application/json',
      },
      success(res) {
        console.log(res.data)
        // 设置页面标题
        wx.setNavigationBarTitle({title:res.data.catename})
        that.setData({
          url: app.globalData.pageUrl,
          hotCourse: res.data.cate,
        });
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