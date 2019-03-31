// components/myscroll/myscroll.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // addGlobalClass: true
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  ready () {
    let that = this
    const query = wx.createSelectorQuery().in(this)
    

    wx.getSystemInfo({
      success: (res) => {
        // console.log(res)
        let allHeight = res.windowHeight
        // console.log(allHeight)
        query.select('#myscroll').boundingClientRect(function (res) {
          // console.log(res.top) // 这个组件内 #the-id 节点的上边界坐标
          let top = res.top
          that.setData({
            height: allHeight-top+'px'
          })
        }).exec()
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    viewScroll (e) {
      this.triggerEvent('scroll', e)
    }
  }
})
