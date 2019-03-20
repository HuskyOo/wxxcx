// components/interview/interview.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    interview:{
      type:Object,
      value:null
    },
    pageIndex:{
      type:Number,
      value:null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    url: app.globalData.pageUrl,
    // 最新访谈数据
    latestInterview: [],

    // 热门访谈数据
    hotInterview: [],

    // 更多访谈数据
    moreInterviews: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 广告位跳转
    navjump (e) {
      var url = e.currentTarget.dataset.nav
      // console.log(e)
      if(url && url !== '#'){
        wx.navigateTo({
          url
        })
      }
    },

    
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
    // 热门课程跳转
    hotCourse:function(e){
      var that = this
      var title = e.currentTarget.dataset.title
      console.log(that.data.pageIndex)
      wx.navigateTo({
        url: '../hotCourse/hotCourse?lan=zang&title='+title+'&cateId='+that.data.pageIndex,
      })
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
          var data = that.data.interview
          // console.log(data)
          if(cateType === '1'){
            data.news = res.data.media
            that.setData({
              interview:data
            })
          }else if(cateType === '3'){
            data.more = res.data.media
            that.setData({
              interview:data
            })
          }
        }
      })
    },
  }
})
