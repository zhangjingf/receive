// components/nav/nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    checkedStatus: {
      type: String,
      value: '',
      observer: function(newVal, oldVal) {
        //console.log(newVal)
      }
    }
  },
  methods: {
    goOrder: function () {
      wx.reLaunch({
        url: '../order/index',
      })
    },
    goMymenu: function () {
      wx.reLaunch({
        url: '../myMenu/index',
      })
    }
  }
})
