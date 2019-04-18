// components/share/share.js
var app = getApp()
import { components } from '../../font/index'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shareShow: {
      type: Boolean,
      value: false
    },
    pageurl: {
      type: String,
      value: ''
    },
    subtitle: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '',
    },
    cover: {
      type: String,
      value: '',
    },
    lan: {
      type:String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    url: app.globalData.pageUrl,
    showShare:false,
    // page_font:{
    //   close: ['关闭', 'སྒོ་རྒྱག'],
    //   share: ['分享给朋友', 'གྲོགས་པོར་བསྐུར།'],
    //   save: ['保存为图片', 'ཁྱབ་བསྒྲགས་སྤེལ།'],
    //   saveLoc: ['保存到本地', 'པར་རིས་ཉར་ཚགས་བྱེད།'],
    //   imgSave: ['图片已保存','པར་རིས་ཉར་ཚགས་བྱས་ཡོད།'],
    // },
    lan: wx.getStorageSync('lan')
  },

  ready () {
    if(this.data.lan){
      this.setData({
        font_index: 1
      })
    }
    this.setData({comFont: components(), lan: wx.getStorageSync('lan')})
    console.log(this.data.comFont, this.data.lan)
    console.log(1)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // canvas画图
    createImg () {
      var that = this
      // 显示保存图片
      that.setData({
        showShare:true
      })
      // 请求二维码
      wx.request({
        url: that.data.url + '/wechat/index/getcode',
        data: {
          pageurl: that.data.pageurl
        },
        success: res => {
          console.log(res)
          // 二维码地址
          var codeUrl = that.data.url + res.data.codeimg
          var bgurl = that.data.url + res.data.bgimg
          // 图片地址
          var path = that.data.url+that.data.cover
          wx.getImageInfo({
            src: bgurl,
            success: res => {
              var bgurl = res.path
              wx.getImageInfo({
                src:codeUrl,
                success: res => {
                  // 二维码本地地址
                  var codeUrl = res.path
                  wx.getImageInfo({
                    src: path,
                    success: res => {
                      // 图片本地地址
                      var path = res.path
                      var context = wx.createCanvasContext('sharecan',this)
                      // 画背景
                      // context.setFillStyle('#fff')
                      context.drawImage(bgurl, 0, 0, 375, 500)
                      // 画图片
                      context.drawImage(path,0,0,375,227)
                      // context.draw()
                      console.log(path)
                      // 文本居中
                      context.setTextAlign('center')
                      // 写标题
                      context.setFillStyle('#fff')
                      context.setFontSize(24)
                      var len = context.measureText(that.data.title)
                      console.log(len)
                      // context.fillText(that.data.title, 30, 235)
                      context.fillText(that.data.title, 187, 235)
                      // context.strokeText(that.data.title, 10, 340, 200)
                      console.log(that.data.title.length)
                      // 写副标题
                      // context.setFillStyle('#f66')
                      context.setFontSize(18)   
                      // context.fillText(that.data.subtitle, 30, 265)
                      context.fillText(that.data.subtitle, 187, 265)
                      // 画二维码
                      context.drawImage(codeUrl,250,400,80,80)
                      // context.draw()
                      console.log(context)
                      console.log(1)
                      context.draw(true,function(){
                        console.log(res)
                        console.log(1)
                        wx.canvasToTempFilePath({
                          canvasId: 'sharecan',
                          fileType: 'jpg',
                          quality: 1,
                          success: res => {
                            console.log(res.tempFilePath)
                            that.setData({
                              shareImg: res.tempFilePath
                            })
                            console.log(that.data.shareImg)
                            wx.getImageInfo({
                              src: res.tempFilePath,
                              success: res => {
                                console.log(res)
                              }
                            })
                          }
                        },that)
                      })
                    }
                  })
                }
              })
            }
          })
          
          
          // context.draw(true,() => {
          //   console.log(1)
          // })
        }
      })
    },
    // 退出
    back () {
      this.setData({
        showShare:false
      })
    },
    // 保存图片
    save () {
      var that = this
      console.log(that.data.shareImg)
      // wx.getSetting({
      //   success: res => {
      //     console.log(res)
      //     if(!res.authSetting['scope.writePhotosAlbum']){
      //       console.log(1)
      //       wx.op
      //       wx.authorize({
      //         scope: 'scope.writePhotosAlbum',
      //         success: res => {
      //           console.log(res)
      //         },
      //         fail: res => {
      //           console.log(res)
      //         }
      //       })
      //     }
      //   }
      // })
      wx.saveImageToPhotosAlbum({
        filePath: that.data.shareImg,
        success: res => {
          console.log(res)
          wx.showToast({
            title: that.data.comFont.imgSave[that.data.lan],
            icon: 'none'
          })
          that.onShareAppMessage()
          that.back()
        }
      })
    },
    // 关闭组件
    close () {
      console.log(this.triggerEvent)
      this.triggerEvent('shareHide',{})
    },
    // 分享
    onShareAppMessage () {
      this.triggerEvent('shareSucc',{})
    }
  }
})
