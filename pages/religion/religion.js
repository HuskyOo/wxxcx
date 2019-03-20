// pages/religion/religion.js
var util = require('../../utils/util')

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 1,
    currentTabNav: 42,
    cate: [],
    sub: [],
    url: app.globalData.pageUrl,
    pageData: null,
    tabNavL: [],
    tabNavM:[],
    //显示的内容 
    defalut: [],
    type:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.fontFamily()
    let that = this;
    wx.request({
      url:app.globalData.pageUrl + '/index/index/religion',
      success: res => {
        // console.log(res.data.cate)
        this.setData({
          pageData: res.data.cate,
          tabNavL: res.data.cate[0].sub,
          currentTab: res.data.cate[0].id
        })  
      }
    })
  },
  details:function(e){
    console.log(e)
    var id = e.currentTarget.id
    var type = e.currentTarget.dataset.type
    var mediatype = e.currentTarget.dataset.mediatype
    console.log(id)
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
  changeTabbar(e) {
    // console.log(this)
    let dataId = e.currentTarget.dataset.id;
    let that = this;
    console.log(dataId);
      wx.request({
        url: app.globalData.pageUrl+'/index/index/religionCate',
        data:{id:dataId},
        header: {
          'content-type': 'application/json',
        },
        success(res) {
          console.log(res.data)
          if(res.data.type == 0){
            that.setData({
              url: app.globalData.pageUrl,
              tabNavL: res.data.cate,
              currentTabNav: res.data.cate[0].id,
              type:res.data.type
            })
          }else{
            var arr = [{id: 100, title: '', defalut:res.data.cate}]
            console.log(arr)
            that.setData({
              tabNavL: arr,
              currentTabNav: arr[0].id,
              type: res.data.type
            })
          }
          
        }
      })
    that.setData({
      currentTab: e.currentTarget.dataset.id
    });
  },
  swichNav(e) {
    var that = this;
    console.log(e.currentTarget.dataset.id)
    var dataId = e.currentTarget.dataset.id;
    this.setData({currentTabNav:dataId})
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