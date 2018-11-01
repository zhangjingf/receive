// pages/myMenu/index.js
Page({
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '我的',
    })
    this.setData({
      checkedStatus: 'mine'
    })
  },
  goWallet: function () {
    wx.navigateTo({
      url: '../myWallet/index',
    })
  }
})