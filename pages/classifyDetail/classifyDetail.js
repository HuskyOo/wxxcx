// pages/classifyDetail/classifyDetail.js
var app = getApp();
import { allClassify, religionCate } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.pageUrl,
    cate: [], // 分类数据
    oneClassIndex: 0,
    twoClassIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.getData(options.id)
  },

  getData(id){
    let that = this
    allClassify(id).then((res) => {
      console.log(res)
      that.setData({
        cate: res.cate
      })
      if(res.cate[0].chlid[0]){
        id = res.cate[0].chlid[0].id
      } else if (res.cate[0]) {
        id = res.cate[0].id
      }
      religionCate(id).then(res => {
        console.log(res)
      })
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