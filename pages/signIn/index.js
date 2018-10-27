// pages/signIn/index.js
Page({
  data: {
    checked: true,
    color: '#008CF0'
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  school: function (e) {
    this.setData({
      school: e.detail.value
    })
  },
  detail: function (e) {
    this.setData({
      detail: e.detail.value
    })
  },
  code: function (e) {
    this.setData({
      code: e.detail.value
    })
  }
})