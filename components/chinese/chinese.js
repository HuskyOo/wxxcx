// components/chinese/chinese.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    chinese:{
      type: Object,
      value: null
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
    // 轮播图数据
    carouselImg: [
      "../../images/carouselOne.png",
    ],
    // 广告位数据
    advertising: {
      "image": "../../images/guanggao.png",
      "title": "藏文图书最新出版语言课程",
      "introduction": "让我们一起去了解藏族文化"
    },
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
          url: '../albumDetails/albumDetails?id='+id,
        })
      } else {
        if(mediatype === '0'){
          wx.navigateTo({
            url: '../singleDetails/singleDetails?type=0&id='+id,
          })
        } else {
          wx.navigateTo({
            url: '../video/video?type=0&id='+id,
          })
        }
      }
    },
    navjump (e) {
      var url = e.currentTarget.dataset.nav
      // console.log(url)
      if(url && url !== '#'){
        wx.navigateTo({
          url
        })
      }
    },
    //二级跳转
    jumpAlbum:function(e){
      var cur = e.currentTarget.dataset.id;
      console.log(cur)
     
        wx.navigateTo({
          url: '../history/history?id=' + cur
        })
    },
    // 热门课程跳转
    hotCourse:function(e){
      var that = this
      var title = e.currentTarget.dataset.title
      console.log(that.data.pageIndex)
      wx.navigateTo({
        url: '../hotCourse/hotCourse?title='+title+'&cateId='+that.data.pageIndex,
      })
    },
    // 最新课程跳转
    newCourse:function(e){
      var that = this
      var title = e.currentTarget.dataset.title
      wx.navigateTo({
        url: '../newCourse/newCourse?title='+title+'&cateType=1&cateId='+that.data.pageIndex,
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
          var data = that.data.chinese
          // console.log(data)
          if(cateType === '1'){
            data.news = res.data.media
            that.setData({
              chinese:data
            })
          }else if(cateType === '2'){
            data.hots = res.data.media
            that.setData({
              chinese:data
            })
          }
        }
      })
    },
  
  }
})
