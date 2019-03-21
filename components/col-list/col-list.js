// components/col-list/col-list.js
let app = getApp();
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    url: app.globalData.pageUrl
  },

  /**
   * 组件的方法列表
   */
  methods: {
    details:function(e){
      console.log(e)
      var id = e.currentTarget.id
      var type = e.currentTarget.dataset.type
      var mediatype = e.currentTarget.dataset.mediatype
      console.log(e.currentTarget)
      if(type === '1'){
        wx.navigateTo({
          url: '/pages/albumDetails/albumDetails?lan=zang&id='+id,
        })
      } else {
        if(mediatype === '0'){
          wx.navigateTo({
            url: '/pages/singleDetails/singleDetails?lan=zang&type=0&id='+id,
          })
        } else {
          wx.navigateTo({
            url: '/pages/video/video?lan=zang&type=0&id='+id,
          })
        }
      }
    },
  }
})
