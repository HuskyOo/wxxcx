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
    detailData: null,
    showDetail: false,  //是否显示课程列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.getData(options.id)
  },

  getData(id){  //获取导航栏及第一个下面的数据
    let that = this
    allClassify(id).then((res) => {
      console.log(res)
      that.setData({
        cate: res.cate
      })
      if(res.cate.length > 0 && res.cate[0].chlid[0]){
        id = res.cate[0].chlid[0].id
      } else if (res.cate[0]) {
        id = res.cate[0].id
      }
      this.getDetail(id)
    })
  },
  getDetail(id){  //获取课程列表
    religionCate(id).then(res => {
      console.log(res)
      this.setData({detailData: res.cate})
      if(!this.data.showDetail){
        this.setData({showDetail: true})
      }
    })
  },
  topNavChange(e){
    // console.log(e)
    let chlid = e.currentTarget.dataset.chlid, index = e.currentTarget.dataset.index, id = e.currentTarget.dataset.id
    if(index === this.data.oneClassIndex){
      return
    }
    this.setData({
      oneClassIndex: index,
      twoClassIndex: 0
    })
    if(!chlid){
      this.getDetail(id)
    } else {
      this.getDetail(this.data.cate[index].chlid[this.data.twoClassIndex].id)
    }
  },
  bottomNavChange (e) {
    let index = e.currentTarget.dataset.index, id = e.currentTarget.dataset.id
    if(index === this.data.twoClassIndex){
      return
    }
    this.setData({twoClassIndex: index})
    this.getDetail(id)
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