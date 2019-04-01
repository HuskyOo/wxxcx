var app = getApp()
var util = require('../../utils/util')
import { my } from '../../font/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.pageUrl,
    order: [],
    features: [
      {
        "id": "1",
        "title": "历史记录",
        "image": "../../images/lishijilu.png"
      },
      {
        "id": "2",
        "title": "我的公益",
        "image": "../../images/fashijiu.png"
      },
      {
        "id": "3",
        "title": "关于我们",
        "image": "../../images/guanyuwmen.png"
      }
    ]
  },  
  // 会员跳转
  jumpMember () {
    wx.navigateTo({
      url: '../member/member'
    })
  },
  // 订单跳转
  allOrders: function (e) {
    wx.navigateTo({
      url: '../pendingpayment/pendingpayment?id=0'
    })
  },
  features: function (e) {
    console.log(e.currentTarget.id);
    var id = e.currentTarget.id
      wx.navigateTo({
        url: '../pendingpayment/pendingpayment?id='+id
      })
  },
  // 历史记录
  jumpHis () {
    wx.navigateTo({
      url: '../historyrecord/historyrecord',
    })
  },
  // 关于我们
  jumpAbout () {
    wx.navigateTo({
      url: '../aboutus/aboutus',
    })
  },
  // 我的公益
  getPhoneNumber (e) {
    var that = this
    console.log(e)
    var encryptedData = e.detail.encryptedData
    var iv = e.detail.iv
    wx.checkSession({
      success: res => {
        console.log(res)
        wx.request({
          url:that.data.url + '/index/welfare/my',
          data: {
            token:wx.getStorageSync('token'),
            iv,
            encryptedData
          },
          success: res => {
            console.log(res)
            if(res.data.code === 1){
              wx.setStorage({
                key: 'mywelfare',
                data: res.data.data
              })
              wx.navigateTo({
                url: '../mywelfare/mywelfare'
              })
            }else{
              wx.showToast({
                title: 'གནས་སྐབས་སུ་ནང་དོན་མེད།',
                icon: 'none'
              })
            }
          }
        })
      },
      fail: res => {
        wx.login({
          success: res => {
            if(e.detail.errMsg == "getPhoneNumber:ok"){
              wx.request({
                url:that.data.url + '/index/wefare/my',
                data: {
                  encryptedData,
                  iv,
                  token:wx.getStorageSync('token'),
                  code: res.code
                },
                success: res => {
                  console.log(res)
                  if(res.data.code === 1){
                    wx.navigateTo({
                      url: '../mywelfare/mywelfare'
                    })
                  }else{
                    wx.showToast({
                      title: 'གནས་སྐབས་སུ་ནང་དོན་མེད།',
                      icon: 'none'
                    })
                  }
                }
              })
            }
          }
        })
      }
    })
    // wx.login({
    //   success: res => {
    //     console.log(res)
    //     if(e.detail.errMsg == "getPhoneNumber:ok"){
    //       wx.request({
    //         url: that.data.url + '/index/welfare/my',
    //         data: {
    //           encryptedData,
    //           iv,
    //           // token: wx.getStorageSync('token'),
    //           code: res.code
    //         },
    //         success: res => {
    //           console.log(res)
    //         }
    //       })
    //     }
    //   }
    // })
    // if(e.detail.errMsg == "getPhoneNumber:ok"){
    //   wx.request({
    //     url: that.data.url + '/index/welfare/my',
    //     data: {
    //       encryptedData,
    //       iv,
    //       token: wx.getStorageSync('token')
    //     },
    //     success: res => {
    //       console.log(res)
    //     }
    //   })
    // }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.fontFamily()
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
    var that = this
    let pageFont = my()
    that.setData({
      pageFont,
      order: [
        {
          "id": "1",
          "title": pageFont.daifukuan,
          "image": "../../images/daifukuan.png"
        },
        {
          "id": "2",
          "title": pageFont.daifahuo,
          "image": "../../images/daifahuo.png"
        },
        {
          "id": "3",
          "title": pageFont.yifahuo,
          "image": "../../images/yifahuo.png"
        },
        {
          "id": "4",
          "title": pageFont.yiwancheng,
          "image": "../../images/yiwancheng.png"
        }
      ],
    })
    wx.request({
      url: that.data.url + '/index/index/usertype',
      data: {
        token: wx.getStorageSync('token')
      },
      success: res => {
        console.log(res)
        that.setData({vip:res.data.type})
      }
    })
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