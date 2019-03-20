// components/bookcity/bookcity.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book:{
      type:Object,
      value:null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    url: app.globalData.pageUrl,
    // 热门书籍数据
    popularBooks: [],
    // 最新书籍数据
    latestBooks: [],
    // 精品书籍数据
    boutiqueBooks: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlejump (e) {
      console.log(e.currentTarget.id)
      var id = e.currentTarget.id
      wx.navigateTo({
        url: '../bookdetail/bookdetail?id='+id,
      })
    },
    jumphistory (e) {
      var title = e.currentTarget.dataset.title
      var cateType = e.currentTarget.dataset.catetype
      wx.navigateTo({
        url: '../legalrecord/legalrecord?title='+title+'&catetype='+cateType,
      })
    },
  
  }
})
