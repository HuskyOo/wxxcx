// components/welfare/welfare.js
var app = getApp()
var util = require('../../utils/util')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    welfare:{
      type:Object,
      value:null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    url: app.globalData.pageUrl,
    // titleImage: "../../images/rescuetitle.png",
    canData: []
  },
  ready () {
    var that = this
    console.log(this.data.welfare)
    wx.setStorage({
      key: 'welcover',
      data: that.data.url + that.data.welfare.cover
    })
    var welNews = that.data.welfare.news
    
    for (let i=0;i<welNews.length;i++) {
      util.canImg(that.data.url + welNews[i].photos[0],`newcan${i}`,that,(res) => {
        console.log(i)
        console.log(res)
        var str = `newCanData[${i}]`
        that.setData({
          [str]: res
        })
      },(res) => {
        console.log(i)
        console.log(res)
        var str = `newCanData[${i}].img`
        that.setData({
          [str]: res
        })
      })
    }
    var welNeeds = that.data.welfare.needs
    for (let i=0;i<welNeeds.length;i++) {
      util.canImg(that.data.url + welNeeds[i].photos[0],`needcan${i}`,that,(res) => {
        console.log(i)
        console.log(res)
        var str = `needCanData[${i}]`
        that.setData({
          [str]: res
        })
      },(res) => {
        console.log(i)
        console.log(res)
        var str = `needCanData[${i}].img`
        // setTimeout(() => {
            that.setData({
              [str]: res
            })
        // },20)
       
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    jumpdetail (e) {
      var id = e.currentTarget.id
      console.log(e.currentTarget.id)
      wx.navigateTo({
        url: '../welfareDetails/welfareDetails?id='+id
      })
    }

  
    //证明跳转
    // jumpProve:function(e){
    //   console.log(e.currentTarget.dataset.current)
    //   var cur=e.currentTarget.dataset.current;
    //   if(cur){
    //     wx.navigateTo({
    //       url: '../prove/prove'
    //     })
    //   }
    // },
    // 捐款跳转
    // jumpdonation (e) {
    //   console.log(e.currentTarget.dataset.current)
    //   var cur=e.currentTarget.dataset.current;
    //   if(cur){
    //     wx.navigateTo({
    //       url: '../donation/donation'
    //     })
    //   }
    // },
  }
})
