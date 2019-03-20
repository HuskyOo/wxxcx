// components/sing/sing.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageIndex:{
      type:Number,
      value:null
    },
    sing:{
      type:Object,
      value:null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    url: app.globalData.pageUrl,
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
    // 最新课程跳转
    newCourse:function(e){
      var that = this
      var cateType = e.currentTarget.dataset.catetype
      var title = e.currentTarget.dataset.title
      if(!cateType){
        cateType = 1
      }
      wx.navigateTo({
        url: '../newCourse/newCourse?lan=zang&title='+title+'&cateType='+cateType+'&cateId='+that.data.pageIndex,
      })
    },
    updata (e) {
      var that = this
      console.log(1)
      var cateType = e.currentTarget.dataset.catetype
      wx.request({
        url:this.data.url + '/index/details/mediarand',
        data:{
          cateType: cateType,
          cateId:that.data.pageIndex
        },
        success: res => {
          console.log(res)
          var data = that.data.sing
          // console.log(data)
          if(cateType === '5'){
            data.book = res.data.media
            that.setData({
              sing:data
            })
          }else if(cateType === '3'){
            data.more = res.data.media
            that.setData({
              sing:data
            })
          }
        }
      })
    },
  }
})
