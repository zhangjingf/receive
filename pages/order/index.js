import order from '../../services/order';
Page({
  data: {
    current: 'tab2',
    index1: 0,
    index11: 5,
    index2: 0,
    index22: 5,
    list: null,
    showCancel: false,
    visible: false,
    visible1: true
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
      current: detail.key,
      list: null
    })
    if(detail.key == 'tab2') {
      this.listOne();
    } else {
      this.listTwo();
    }
  },
  listOne: function () {
    const self = this;
    order.listOne({startIndex: this.data.index1, endIndex: this.data.index11}, function (res){
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
  },
  maskFlag: function () {
    this.setData({
      visible: false,
      visible1: false
    })
  },
  takeExpress: function (e) {
    this.setData({
      gotId: e.target.dataset.id,
      visible: true
    })
  },
  expresskey: function (e) {
    this.setData({
      expresskey: e.detail.value
    })
  },
  confirm: function () {
    const self = this;
    if (!this.data.expresskey) {
      wx.showToast({
        title: '请输入取件码',
        icon: 'none'
      })
      return
    }
    order.handle({orderId: this.data.gotId, expressKey: this.data.expresskey}, function(res) {
      if(res.code === 0) {
        wx.showToast({
          title: '取件成功',
          icon: 'success'
        })
        this.listOne()
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'error'
        })
      }
    })
  },
  finish: function (e) {
    const self = this;
    order.finish({orderId: e.target.dataset.id}, function(res) {
      if (res.code == 0) {
        wx.showToast({
          title: '送达成功',
          icon: 'success'
        })
        self.listTwo();
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'error'
        })
      }
    })
  }  
})