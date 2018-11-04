import rider from '../../services/rider'
Page({
  data: {
    money: 0,
    availableBalance: 0
  },
  onLoad: function (options) {
    const self = this;
    rider.accountInfo({}, function (res) {
      if (res.code == '0') {
        self.setData({
          availableBalance: res.data.availableBalance
        })
      }
    })
  },
  money: function (e) {
    this.setData({
      money: e.detail.value,
      status: e.detail.value.length > 0 ? 'active' : ''
    })
  },
  submit: function () {
    rider.transferOut({
      transferAmmount: this.data.money
    }, function (res) {
      if (res.code == 0) {

      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  }
})