// pages/order/index.js
Page({
  data: {

  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单',
    })
    this.setData({
      checkedStatus: 'order'
    })
  },
  onShow: function () {

  },
  handleChange: function({detail}) {
    this.setData({
      current: detail.key
    });
  }
})