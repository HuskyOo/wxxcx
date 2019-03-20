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

  }
})
