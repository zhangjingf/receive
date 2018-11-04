// pages/myMenu/index.js
Page({
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '我的',
    })
  },
  goWallet: function () {
    wx.navigateTo({
      url: '../myWallet/index',
    })
  }
})