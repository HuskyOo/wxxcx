var app = getApp()
var util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.pageUrl,
    title_list:[
      {id:1,title:'图书'},
      {id:2,title:'课程'},
      {id:3,title:'其他'}
    ],
    page_index:1,
    purchaseBookList: [
      {
        "id": "1",
        "title": "正版五本最新藏族语言学习图书",
        "image": "../../images/tuijianone.png",
        "price": "5900.00",
        "number": "1",
        "description": "藏语5本",
        "time": "一个月前"
      },
      {
        "id": "2",
        "title": "正版五本最新藏族语言学习图书",
        "image": "../../images/tuijianone.png",
        "price": "5900.00",
        "number": "1",
        "description": "藏语5本",
        "time": "一个月前"        
      },
      {
        "id": "3",
        "title": "正版五本最新藏族语言学习图书",
        "image": "../../images/tuijianone.png",
        "price": "5900.00",
        "number": "1",
        "description": "藏语5本",
        "time": "一个月前"        
      },
    ]
  },
  //当前页面内页面切换
  pageChange (e) {
    // console.log(e.currentTarget.id)
    var n = e.currentTarget.id
    this.setData({page_index:n})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.fontFamily()
  },
  getData(){
    var that = this
    wx.request({
      url: that.data.url + '/index/buy/my',
      data: {
        token: wx.getStorageSync('token')
      },
      success: res => {
        console.log(res)
        that.setData({
          data: res.data
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData()
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