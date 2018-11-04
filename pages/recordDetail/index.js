import rider from '../../services/rider'
Page({
  data: {
    list: []
  },
  onLoad: function (options) {
    const self = this;
    if(options.id) {
      rider.queryAccountOfOrders({
        accountOfId: options.id
      }, function (res) {
        if (res.code == 0 && res.data) {
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
  },
  goOrderDetail: function (e) {
    if (e.target.dataset.id) {
      wx.navigateTo({
        url: '../orderDetail/index?id=' + e.target.dataset.id,
      })
    }
  }
})