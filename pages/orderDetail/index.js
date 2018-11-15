import rider from '../../services/rider';
Page({
  data: {
    list: null
  },
  onLoad: function (options) {
    const self = this;
    if (options.id) {
      rider.queryAccountOfOrder({
        accountOfOrderId: options.id
      }, function(res) {
        if (res.code == 0) {
          if (res.data) {
            res.data.yongjin = (res.data.payPrice - res.data.incomeAmount).toFixed(2)
          }
          self.setData({
            list: res.data
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      })
    }
  }
})