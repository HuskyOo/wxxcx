// pages/welfareDetails/welfareDetails.js
var util = require('../../utils/util')

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    p:1,
    url:app.globalData.pageUrl,
    // show: false,
    unfold:true,
    shareshow: false,
    username: "嗨呀",
    title:"爱心接力！生病五年，请大家伸出援手",
    total:300000,
    completed:200000,
    count:500,
    userlife:"我的名字叫嗨呀，女，90岁。求助人的故事，求助人的故事，求助人的故事，求助人的故事，求助人的故事...",
    sickness:'生病',
    idcardprove:"ཐོབ་ཐང་ལག་ཁྱེར་དག་མ་རེད།",
    prove1:["ནད་གཞི་བརྟག་དཔྱད་ཀྱི་དཔང་ཡིག་བདེན་པ་རེད།","xxxསྨན་ཁང་ནང་དུ་སྨན་བཅོས་བྱེད་བཞིན་འདུག"],
    payee:"嗨呀（ནད་པ་རང་ཉིད།）",
    prove2:["ཐོབ་ཐང་ལག་ཁྱེར་དག་མ་རེད།","ཁོང་གཉིས་ཀྱི་འབྲེལ་བ་བདེན་པ་རེད།","རོགས་དངུལ་སྤྲོད་སའི་དངུལ་བྱང་དག་མ་རེད།"],
    prove3:"གོང་དུ་བཀོད་པའི་ཡི་གེ་དང་འདྲ་པར། ཡིག་ཆ་བཅས་ཚང་མ་ངོ་མ་ཡིན། དོན་དངོས་རྫུན་བཟོ་དང་སྦས་གསང་བྱས་པའི་གནས་ཚུལ་གཅིག་ཀྱང་མེད། གལ་ཏེ་དོན་དངོས་དང་མི་མཐུན་པ་ཡོད་ཚེ། རོགས་ཞུ་མཁན་གྱིས་ཁྲིམས་ལུགས་ཀྱི་འགན་འཁྲི་ཡོངས་རྫོགས་འཁུར་ཆོག",
    prove4:"ང་ཚོས་རང་ནུས་ཅི་ལྕོགས་ཀྱིས་རོགས་ཞུ་མཁན་གྱི་གནས་ཚུལ་ལ་ཞིབ་བཤེར་ནན་མོ་བྱས་ཡོད། ཡིན་ནའང་ད་དུང་ར་སྤྲོད་བྱུང་མེད་པ་ཡོད་ངེས་པས། སྐུ་ཉིད་ཀྱིས་གནས་ཚུལ་རྒྱུས་ལོན་ཞིབ་མོ་བྱས་རྗེས་རོགས་སྐྱོར་གནང་རོགས། རོགས་ཞུའི་ཡི་གེ་འདི་ནི་དགེ་སྒྲུབ་ལས་རིགས་ཀྱི་ཡོངས་བསྒྲགས་བྱས་ཏེ་ཞལ་འདེབས་བསྡུ་བའི་རིགས་སུ་མི་གཏོགས། ཡང་དག་ཡིན་མིན་རོགས་ཞུ་མཁན་གྱིས་འགན་འཁུར་དགོས།",
    // provenum:16,
    // hotCourse: [
    //   {
    //     "id": "1",
    //     "name": "刘小珍",
    //     "cover": "../../images/touxiang.png",
    //     "content": "是我老公的邻居，是一个实实在在的人，请大家多多帮助下他"
    //   },
    //   {
    //     "id": "2",
    //     "name": "刘小珍",
    //     "content": "是我老公的邻居，是一个实实在在的人，请大家多多帮助下他"
    //   }
    // ],
    // prve: '邻居',
    realName: 'མིང་བདེན་པ་རེད།',
    // imgs:["../../images/touxiang.png","../../images/touxiang.png",
    // "../../images/touxiang.png","../../images/touxiang.png","../../images/touxiang.png"],
    // count1:200,
    // count2:500,
    // help:[{
    //   "id": "1",
    //   "name": "刘小珍",
    //   "cover": "../../images/touxiang.png",
    //   "content": "加油，坚持！加油",
    //   "money":"100"
    // },
    // {
    //   "id": "2",
    //   "name": "刘小珍",
    //   "cover": "../../images/touxiang.png",
    //   "content": "加油，坚持！加油",
    //   "money":"100"
    // }]
    welCanData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.fontFamily()
    var that = this
    var id = options.id
    that.setData({
      detailID:id,
      welcover: wx.getStorageSync('welcover')
    })
    // 获取当前页面路径
    that.getUrl()
    
  },
  // 显示分享
  shareshow () {
    this.setData({
      shareshow: true
    })
  },
  // 不显示分享
  back () {
    this.setData({
      shareshow: false
    })
  },
  // 获取当前页面的路径
  getUrl () {
    var that = this
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length-1] //获取当前页面的对象
    var url = currentPage.route //当前页面url
    var options = currentPage.options //如果要获取url中所带的参数可以查看options
    var arr = []
    for(var key in options){
      var str = key+'='+options[key]
      console.log(str)
      arr.push(str)
    }
    var pageUrl = url+'?'+arr.join('&')
    that.setData({pageUrl})
  },
  // 图片查看
  preview (e) {
    var src = e.currentTarget.dataset.src
    wx.previewImage({
      urls:[src]
    })
  },
  jumpDonation () {
    var that = this
    wx.navigateTo({
      url: '../donation/donation?id='+that.data.detailID
    })
  },
  // 分享
  share () {
    wx.showShareMenu({
      // withShareTicket:true,
      success: res => {
        console.log(res)
      },
      fail: res => {
        console.log(res)
      }
    })
  },
  getDonation (p) {
    var that = this
    var id = that.data.id
    var arr = that.data.donation
    wx.request({
      url: that.data.url + '/index/welfare/newdonation',
      data:{
        p,
        id
      },
      success: res => {
        // console.log(res.data.donation)
        if(res.data.code == 1){
          var donation = arr.concat(res.data.donation)
          that.setData({p,donation})
        }
      }
    })
  },
  // 展开
  unfold () {
    var that = this
    if(that.data.unfold){
      that.setData({
        unfold:false
      })
    } else {
      that.setData({
        unfold:true
      })
    }
  },

  //我也来证明跳转
  toProveRefer:function(){
    var that = this
    wx.navigateTo({
      url: '../proveRefer/proveRefer?id=' + that.data.id
    })
  },
  //证明跳转
  toProve:function(){
    var that = this
    wx.navigateTo({
      url: '../prove/prove?id=' + that.data.id
    })
  },
  // 筹款动态跳转
  jumpdynamic () {
    var that = this
    wx.navigateTo({
      url: '../dynamic/dynamic?id='+that.data.id
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
    var that = this
    var id = that.data.detailID
    wx.request({
      url:that.data.url+'/index/welfare/details',
      data:{id},
      success:res => {
        console.log(res)
        that.setData({
          welfare: res.data.welfare,
          donation: res.data.donation,
          relationlist: res.data.relationlist,
          dynamics: res.data.dynamics,
          id
        })
        wx.setStorage({
          key: 'welfareDetails',
          data: res.data
        })
        // 加水印
        var imgs = res.data.welfare.photos
        for (let i=0;i<imgs.length;i++){
          util.canImg(that.data.url + imgs[i],`welcan${i}`,that,(res) => {
            var str = `welCanData[${i}]`
            if(!that.data.welCanData[i]){
              that.setData({
                [str]: res
              })
            }
          }, (res) => {
            var str = `welCanData[${i}].img`
            if(!that.data.welCanData[i].img){
              that.setData({
                [str]: res
              })
            }
          })
        }
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
    var that = this
    var p = that.data.p + 1
    that.getDonation(p)
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },
  onShareAppMessage: function (ops) {
    var that = this
    var id = that.data.id
    console.log(ops)
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '他们需要你的帮助',
      path: 'pages/welfareDetails/welfareDetails?id='+id,
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
        wx.request({
          url: that.data.url + '/index/welfare/share',
          data: {id},
          success: res => {
            console.log(res)
          }
        })
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
})