// components/col-list/col-list.js
let app = getApp();
var util = require('../../utils/util')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Object,
      value: []
    },
    title: {
      type: String,
      value: false
    },
    replace: {
      type: Boolean,
      value: false
    },
    book: {
      type: Boolean,
      value: false
    },
    titlejump: {
      type: Boolean,
      vale: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    url: app.globalData.pageUrl
  },
  ready () {
    util.fontFamily()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    details:function(e){
      // console.log(e)
      let that = this, id = e.currentTarget.id, type = e.currentTarget.dataset.type, mediatype = e.currentTarget.dataset.mediatype, history = wx.getStorageSync('history'), time = util.formatTime(new Date()), time2 = time.slice(0,10), obj = {}
      // console.log(id, that.data.list)
      // 获取数据
      that.data.list.forEach((item, i, arr) => {
        // console.log(i, item, arr)
        if(item.id == id){
          obj = item
          // console.log(obj)
        }
      })
      // console.log(obj)
      if(history[0] && history[0].title == time2){
        history[0].item.forEach((item, i, arr) => {
          if(item.id == id){
            arr.splice(i, 1)
          }
        })
      } else {
        history.unshift({title: time2, item: []})
      }
      history[0].item.unshift(obj)
      history.forEach((item, i, arr) => {
        if(item.title === time2){
          item.item.forEach((k, ite, ar) => {
            if(id == ite.id){
              ar.splice(k, 1)
            }
          })
        }
      })
      wx.setStorageSync('history', history)
      // console.log(e.currentTarget)
      wx.navigateTo({
        url: '/pages/albumDetails/albumDetails?lan=zang&id='+id+`&type=${type}&mediatype=${mediatype}`,
      })
    },
    jumpBookOrder (e) {
      let id = e.currentTarget.id
      wx.navigateTo({
        url: '/pages/bookdetail/bookdetail?id='+id,
      })
    }
  }
})
