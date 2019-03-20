// components/recommend/recommend.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // addGlobalClass: true,
    recommend: {
      type: Object,
      value: null
    }
  },
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的初始数据
   */
  data: {
    url:app.globalData.pageUrl,
    grid:[
      {title: 'བོད་སྐད།', icon: '/images/zang.png', id: '1'},
      {title: '汉语', icon: '/images/han.png', id: '2'},
      {title: 'ཚོང་ཁང་།', icon: '/images/shang.png', id: '3'},
      {title: 'རོགས་སྐྱོར།', icon: '/images/gong.png', id: '5'},
      {title: 'གློག་བརྙན།', icon: '/images/dian.png', id: '6'},
      {title: 'གླེང་སྟེགས།', icon: '/images/fang.png', id: '7'},
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpAlbum (e) {
      var id = parseInt(e.currentTarget.dataset.id)
      console.log(id)
      this.triggerEvent('pagejump',{id})
    },
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
    // 汉语推荐换一批
    cupdata (e) {
      var that = this
      // console.log(1)
      var cateType = e.currentTarget.dataset.catetype
      wx.request({
        url:this.data.url + '/index/details/mediarand',
        data:{
          cateType: cateType,
          cateId: 2
        },
        success: res => {
          // console.log(res)
          // if(cateType === '1'){
          //   that.setData({
          //     latestCourse:res.data.media
          //   })
          // }else if(cateType === '2'){
            that.setData({
              ['recommend.chots']:res.data.media
            })
          // }
        }
      })
    },
    // 汉语推荐  详情跳转(根据专辑单曲类型)
    cdetails:function(e){
      console.log(e)
      var id = e.currentTarget.id
      var type = e.currentTarget.dataset.type
      var mediatype = e.currentTarget.dataset.mediatype
      console.log(e.currentTarget)
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
    // 汉语推荐跳转
    cnewCourse:function(e){
      var that = this
      var title = e.currentTarget.dataset.title
      wx.navigateTo({
        url: '../newCourse/newCourse?title='+title+'&cateType=1&cateId='+'2',
      })
    },

    // 商品推荐列表
    bookNew (e) {
      var that = this
      var title = e.currentTarget.dataset.title
      wx.navigateTo({
        url: '../legalrecord/legalrecord?title='+title+'&catetype='+'2',
      })
    },
    // 商品详情页跳转
    handlejump (e) {
      console.log(e.currentTarget.id)
      var id = e.currentTarget.id
      wx.navigateTo({
        url: '../bookdetail/bookdetail?id='+id,
      })
    },

    // 藏文热门课程跳转
    zhotCourse:function(e){
      var that = this
      var title = e.currentTarget.dataset.title
      // console.log(that.data.page_index)
      wx.navigateTo({
        url: '../hotCourse/hotCourse?lan=zang&title='+title+'&cateId='+'1',
      })
    },
    // 访谈热门课程跳转
    ihotCourse:function(e){
      var that = this
      var title = e.currentTarget.dataset.title
      // console.log(that.data.page_index)
      wx.navigateTo({
        url: '../hotCourse/hotCourse?lan=zang&title='+title+'&cateId='+'6',
      })
    },

    // 藏文换一批\
    updata (e) {
      var that = this
      console.log(1)
      var cateType = e.currentTarget.dataset.catetype
      wx.request({
        url:this.data.url + '/index/details/mediarand',
        data:{
          cateType: cateType,
          cateId: 1
        },
        success: res => {
          console.log(res)
          if(cateType === '1'){
            that.setData({
              latestCourse:res.data.media
            })
          }else if(cateType === '2'){
            that.setData({
              ['recommend.zhots']:res.data.media
            })
          }
        }
      })
    },
    // 详情跳转(根据专辑单曲类型)   藏文
    details:function(e){
      console.log(e)
      var id = e.currentTarget.id
      var type = e.currentTarget.dataset.type
      var mediatype = e.currentTarget.dataset.mediatype
      console.log(e.currentTarget)
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
  }
})
