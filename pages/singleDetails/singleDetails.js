// pages/singleDetails/singleDetails.js
var app = getApp()
var util = require('../../utils/util')
var Wxparse = require('../../wxParse/wxParse')
// var isFirst = true;
// var isSiFirst = true;
const bgMusic = wx.getBackgroundAudioManager()
// bgMusic.src = 'http://qiuniu.vmobplus.com/lqE6_qxrr9SM8SFlmi57vLQPcz9G'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.pageUrl,
    introduce: '0',
    singleName:'《藏语讲解》',
    singleWalk:'嗨呀',
    // start:'0.00',
    // end:'5.00',
    // percent: "60",
    // sw: 6,
    // pc: 'rgb(255,98,63)',
    // pbc: 'rgb(217,217,217)',
    // isActive: true,
    // isSi: true,
    isOpen: false,//播放开关
    starttime: '00:00', //正在播放时长
    duration: '06:41',   //总时长
    boxShow: false,
    font_index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 下载字体
    util.fontFamily()
    var that = this
    var id = options.id
    var type = options.type
    var lan = options.lan
    // 设置页面文字
    that.setData({
      page_font:{
        intro: ['简介','ངོ་སྤྲོད།'],
        album: ['专辑介绍','ནང་དོན་ངོ་སྤྲོད།'],
        nobuy: ['您还没购买该单曲', 'སྒྲ་འདི་ད་དུང་ཉོས་མེད།'],
        nowbuy:['立即购买', 'ད་ལྟ་ཉོ།'],
        vip_font:['开通会员后即可免费收听/观看', 'ཚོགས་མིར་ཐོ་འགོད་བྱས་རྗེས་རིན་མེད་ཉན་ཆོག'],
        vip_btn:['立即开通', 'ཚོགས་མིར་ཐོ་འགོད་བྱེད།'],
        playOver:['已经播放完毕','མཇུག་རྫོགས་ཡོད།'],
        playFirst: ['当前已是第一首','ད་ལྟ་གཏོང་གཞིན་པ་སྒྲ་དང་པོ་རེད།'],
      }
    })
    // 设置语言
    if(lan === 'zang'){
      that.setData({
        font_index:1
      })
    }
    if(type){
      wx.setStorageSync('playTable',parseInt(type))
    }
    that.setData({
      type: parseInt(type)
    })
    // var all = options.all
    // if(all){

    // }
    // console.log(options.type)
    // console.log(options.id)
    // if(options.all){
      // console.log(1)
      // return
    // }
    console.log(bgMusic.src)
    if(options.n){
      console.log(options.n)
      var arr = wx.getStorageSync('history')[options.n]
      console.log(arr)
      that.setData({
        data:arr,
        duration:arr.duration
      })
      that.listenerButtonPlay()
      that.sethistory()
      that.setParse()
    } else {
      that.getData(id,options.type)
      // wx.request({
      //   url: this.data.url + '/index/details/mediaurl',
      //   data: {
      //     id: id,
      //     type: options.type,
      //   },
      //   success: res => {
      //     that.setData({
      //       data:res.data.media
      //     })
      //     console.log(res.data.media)
      //     // bgMusic.src = res.data.media.audio
      //     that.setData({
      //       duration:res.data.media.duration
      //     })
      //     // console.log(bgMusic)
      //     that.listenerButtonPlay()
      //     that.sethistory()
      //   }
      // })
    }
    // if()
    // that.getPlayList(options.type)
    // if(type === 0){

    // }
  },
  jumpMember () {
    wx.navigateTo({
      url: '../member/member'
    })
  },
  // 介绍
  changeShow (e) {
    var n = e.currentTarget.dataset.show
    this.setData({
      introduce: n
    })
  },
  // 富文本转译
  setParse () {
    var that = this
    var author = that.data.data.author_describe
    var good = that.data.data.good_describe
    Wxparse.wxParse('author', 'html', author, this, 0)
    Wxparse.wxParse('good', 'html', good, this, 0)
  },
  getData(id,type){
    var that = this
    var type = that.data.type
    var playList = wx.getStorageSync('playList')
    var playNum = wx.getStorageSync('playNum')
    // var isreload = (id == playList[playNum].id)
    // console.log(isreload)
    wx.request({
      url: this.data.url + '/index/details/mediaurl',
      data: {
        id: id,
        type: type,
        token: wx.getStorageSync('token')
      },
      success: res => {
        that.setData({
          data:res.data.media
        })
        that.setParse()
        if(type === 0 && res.data.media.is_buy === 0){
          // wx.showToast({
          //   title: '您还没购买',
          //   icon: 'none',
          //   duration: 2000
          // })
          that.setData({
            boxShow:true
          })
        }else{
          console.log(res.data.media)
          // bgMusic.src = res.data.media.audio
          that.setData({
            duration:res.data.media.duration
          })
          var isreload = (res.data.media.audio == bgMusic.src)
          // console.log(bgMusic)
          that.listenerButtonPlay(isreload)
          that.sethistory()
          
        }
        
      }
    })
  },
  buyMic () {
    var that = this
    wx.request({
      url: that.data.url + '/index/pay/index',
      data: {
        goods_id: that.data.data.id,
        money: that.data.data.money,
        goods_type: 1,
        token: wx.getStorageSync('token'),
      },
      success: res => {
        console.log(res)
        wx.requestPayment({
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonceStr,
          package: res.data.data.package,
          signType: res.data.data.signType,
          paySign: res.data.data.paySign,
          success(res) {
            console.log(res)
            // wx.navigateBack({
            //   delta: 1
            // })
            that.getData(that.data.data.id,0)
            that.setData({
              boxShow:false
            })

          },
          fail(res) {
            console.log(res)
            // wx.navigateBack({
            //   delta: 1
            // })
          }
        })
      }
    })
  },
  // 获取播放列表
  // getPlayList (type) {
  //   var that = this
  //   var playTable = wx.getStorageSync('palyTable')
  //   var playNum = wx.getStorageSync('playNum')
  //   var playType = wx.getStorageSync('playType')
  //   if(playTable === 1){
  //     var playList = wx.getStorageSync('history')
  //     // that.getHisData(playNum,playType)
  //     var data = playList[playNum]
  //     that.setData({
  //       data,
  //       duration:data.duration
  //     })
  //     that.listenerButtonPlay()
  //     that.sethistory()
  //   }else{
  //     var playList = wx.getStorageSync('playList')
  //     var id = playList[playNum].id
  //     wx.request({
  //       url: this.data.url + '/index/details/mediaurl',
  //       data: {
  //         id: id,
  //         type: type,
  //       },
  //       success: res => {
  //         that.setData({
  //           data:res.data.media
  //         })
  //         console.log(res.data.media)
  //         // bgMusic.src = res.data.media.audio
  //         that.setData({
  //           duration:res.data.media.duration
  //         })
  //         // console.log(bgMusic)
  //         that.listenerButtonPlay()
  //         that.sethistory()
  //       }
  //     })
  //     // that.getListData(playNum,playType)
  //   }
  // },
  // 从历史记录里获取播放数据
  // getHisData(n,type){
  //   var that = this
  //   var history = wx.getStorageSync('history')
    
  // },
  // 从播放列表中获取播放数据
  // getListData(n,type){},
  // getData (type) {
  //   if(type === 0){}
  // },
  sethistory () {
    var that = this
    var data = that.data.data
    var time = util.formatTime(new Date())
    var arr = []
    console.log(time)
    data.hisTime = time
    var history = wx.getStorageSync('history')
    for(var i=0;i<history.length;i++){
      if(history[i].id === data.id){
        console.log(1)
        history.splice(i,1)
        break
      }
    }
    history.unshift(data)
    wx.setStorage({
      key: 'history',
      data: history
    })
  },
  // //进度条输入事件
  // progressInput: function (e) {
  //   this.setData({
  //     percent: e.detail.value
  //   })
  // },
  // //设置宽度事件
  // swInput: function (e) {
  //   this.setData({
  //     sw: e.detail.value
  //   })
  // },
  // //设置进度条颜色事件
  // pcInput: function (e) {
  //   this.setData({
  //     pc: e.detail.value
  //   })
  // },
  // //未选择的进度条的颜色事件
  // pbcInput: function (e) {
  //   this.setData({
  //     pbc: e.detail.value
  //   })
  // },
  // //设置进度条从左往右的动画
  // bindButton: function (e) {
  //   console.log(isFirst);
  //   if (isFirst == true) {
  //     isFirst = false;
  //     this.setData({
  //       isActive: false,
  //     })
  //   } else {
  //     isFirst = true;
  //     this.setData({
  //       isActive: true,
  //     })
  //   }
  // },
  getNext () {
    var that = this
    that.listenerButtonPause()
    that.setData({
      isOpen:true
    })
    // palyTable 为0-->非专辑  为1时-->专辑
    var playTable = wx.getStorageSync('playTable')
    var playNum = wx.getStorageSync('playNum')
    var playType = wx.getStorageSync('playType')
    console.log(playTable,playNum,playType)
    if(playTable === 1){
      console.log(1)
      var playList = wx.getStorageSync('playList')
      for(var i=playNum+1;i<playList.length;i++){
        if(playList[i].is_free === '1' || that.data.data.is_buy === 1){
          var id = playList[i].id
          wx.setStorageSync('playNum',i)
          that.getData(id,1)
          console.log(i)
          return
        }
      }
      wx.showToast({
        title: that.data.page_font.playOver[that.data.font_index],
        icon: 'none'
      })
      console.log(1)
      that.listenerButtonPause()
    } else {
      wx.showToast({
        title: that.data.page_font.playOver[that.data.font_index],
        icon: 'none'
      })
      that.listenerButtonPause()
      console.log(2)
      // var playList = wx.getStorageSync('history')
      // for(var i=playNum;i<playList;i++){
      //   if(playList[i].media_type === '0'){
      //     that.setData({
      //       data:playList[i],
      //       duration:playList[i].duration
      //     })
      //     that.listenerButtonPlay()
      //     that.sethistory()
      //   }
      // }
    }
  },
  getPrev () {
    var that = this
    that.listenerButtonPause()
    that.setData({
      isOpen:true
    })
    // palyTable 为0-->非专辑  为1时-->专辑
    var playTable = wx.getStorageSync('playTable')
    var playNum = wx.getStorageSync('playNum')
    var playType = wx.getStorageSync('playType')
    console.log(playTable,playNum,playType)
    if(playTable === 1){
      console.log(1)
      var playList = wx.getStorageSync('playList')
      for(var i=playNum-1;i>=0;i--){
        if(playList[i].is_free === '1' || that.data.data.is_buy === 1){
          var id = playList[i].id
          wx.setStorageSync('playNum',i)
          that.getData(id,1)
          console.log(i)
          return
        }
      }
      wx.showToast({
        title: that.data.page_font.playFirst[that.data.font_index],
        icon: 'none'
      })
      that.listenerButtonPause()
    } else {
      wx.showToast({
        title: that.data.page_font.playFirst[that.data.font_index],
        icon: 'none'
      })
      that.listenerButtonPause()
      // var playList = wx.getStorageSync('history')
      // for(var i=playNum;i<playList;i++){
      //   if(playList[i].media_type === '0'){
      //     that.setData({
      //       data:playList[i],
      //       duration:playList[i].duration
      //     })
      //     that.listenerButtonPlay()
      //     that.sethistory()
      //   }
      // }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
 // 播放
 listenerButtonPlay: function (reload) {
  var that = this
  console.log(that.data.data.audio)
  if(that.data.data.is_buy === 0 && that.data.data.is_free === '0'){
    return
  }
  if(bgMusic.src !== that.data.data.audio){
    bgMusic.src = that.data.data.audio
  }
  bgMusic.title = that.data.data.title
  bgMusic.epname = that.data.data.author
  //bug ios 播放时必须加title 不然会报错导致音乐不播放
  bgMusic.onTimeUpdate(() => {
    //bgMusic.duration总时长  bgMusic.currentTime当前进度
    console.log(bgMusic.currentTime)
    var duration = bgMusic.duration; 
    var offset = bgMusic.currentTime;  
    var currentTime = parseInt(bgMusic.currentTime);
    var min = "0" + parseInt(currentTime / 60);
    var max = parseInt(bgMusic.duration);
    var sec = currentTime % 60;
    if (sec < 10) {
      sec = "0" + sec;
    };
    var starttime = min + ':' + sec;   /*  00:00  */
    that.setData({
      offset: currentTime,
      starttime: starttime,
      max: max,
      changePlay: true
    })
  })
  //播放结束
  bgMusic.onEnded(() => {
    that.setData({
      starttime: '00:00',
      isOpen: false,
      offset: 0
    })
    console.log("音乐播放结束");
    that.getNext()
  })
  bgMusic.play();
  that.setData({
    isOpen: true,
  })
},
//暂停播放
listenerButtonPause(){
   var that = this
  bgMusic.pause()
  that.setData({
    isOpen: false,
  })
},
// listenerButtonStop(){
//   var that = this
//   bgMusic.stop()
// },
// 进度条拖拽
sliderChange(e) {
  var that = this
  var offset = parseInt(e.detail.value);
  bgMusic.seek(offset);
  bgMusic.play();
  that.setData({
    isOpen: true,
  })
},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    var that = this
    // that.listenerButtonStop()//停止播放
    console.log("离开")

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})