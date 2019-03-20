// pages/proveRefer/proveRefer.js
var util = require('../../utils/util')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.pageUrl,
    relation: [],
    name: '',
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.fontFamily()
    // console.log(options.id)
    var that = this
    var id = options.id
    wx.request({
      url: that.data.url + '/index/welfare/relation',
      success: res => {
        // console.log(res.data.relation)
        var relation = res.data.relation
        that.setData({relation})
      }
    })
    that.setData({
      id
    })
  },
  relationChange (e) {
    console.log(e.detail.value)
    var index = parseInt(e.detail.value)
    this.setData({index})
  },
  transform (str) {
    if(str){
      var msg = str.replace(/<\/?[^>]*>/g, '')
      msg = msg.replace(/[|]*\n/, '')
      msg = msg.replace(/&npsp;/ig, '')
      return msg
    }
    return
  },
  handleName (e) {
    // console.log()
    var name = e.detail.value
    this.setData({name})
  },
  handleContent (e) {
    var content = e.detail.value
    this.setData({content})
  },
  handleIdCard (e) {
    var idCard = e.detail.value
    this.setData({idCard})
  },
  //证明提交
  jump:function(){
    var that = this
    var relation_id = that.data.relation[that.data.index].id
    var token = wx.getStorageSync('token')
    var name = that.data.name
    var content = that.data.content
    var idCard = that.data.idCard
    name = that.transform(name)
    content =  that.transform(content)
    if(!name){
      wx.showToast({
        title: 'ཁྱེད་ཀྱི་མིང་འགོད་རོགས།',
        icon: 'none'
      })
      return
    }
    if(!content){
      wx.showToast({
        title: 'བདེན་དཔང་ནང་དོན་འབྲི་རོགས།',
        icon: 'none'
      })
      return
    }
    if(!idCard){
      wx.showToast({
        title: 'ཁྱེད་ཀྱི་ཐོབ་ཐང་ལག་འཁྱེར་གྱི་ཨང་གྲངས་འབྲི་རོགས།',
        icon: 'none'
      })
      return
    }
    
    // 身份证验证
    var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[0-9Xx]$/
    
    console.log(reg.test(idCard))
    if(reg.test(idCard)){
      wx.request({
        url:that.data.url + '/index/welfare/createrelation',
        data: {
          welfare_id: that.data.id,
          relation_id,
          name,
          describe:content,
          idcard:idCard,
          token
        },
        success: res => {
          console.log(res)
          if(res.data.code === 1){
            wx.showToast({
              title: 'ཡར་སྤྲད་འཚག་ཡོད།',
              icon: 'success'
            })
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: 'ཐོབ་ཐང་ཨང་གྲངས་ཡང་དག་འབྲི་དགོས།',
        icon: 'none'
      })
    }
    // wx.showToast({
    //   title: '提交成功',
    //   icon: 'success'
    // })
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