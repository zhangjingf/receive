import rider from '../../services/rider'
Page({
  data: {
    availableBalance: ''
  },
  onLoad: function () {
    const self = this;
    rider.accountInfo({}, function (res) {
      if (res.code == '0') {
        self.setData({
          availableBalance: res.data.availableBalance
        })
      }
    })
  },
  onShow: function () {

  },
  goRecord: function () {
    wx.navigateTo({
      url: '../myRecord/index',
    })
  },
  goDeposit: function () {
    wx.navigateTo({
      url: '../deposit/index',
    })
  },
  goRestMoney: function () {
    wx.navigateTo({
      url: '../restMoney/index',
    })
  }
})