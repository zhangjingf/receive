import order from '../../services/order';
Page({
  data: {
    current: 'tab2',
    index1: 0,
    index11: 5,
    index2: 0,
    index22: 5,
    list: null
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
    this.listOne()
  },
  handleChange: function({detail}) {
    this.setData({
      current: detail.key
    });
  },
  listOne: function () {
    const self = this;
    order.listOne({startIndex: this.data.index1, endIndex: this.data.index11}, function (res) {
      if (res.code == 0) {
        self.setData({
          list: res.data
        })
      }
    })
  },
  listTwo: function () {
    const self = this;
    order.listTwo({startIndex: this.data.index2, endIndex: this.data.index22}, function (res) {
      if (res.code == 0) {
        self.setData({
          list: res.data
        })
      }
    })
  }
})