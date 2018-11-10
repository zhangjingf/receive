import order from '../../services/order';
import common from '../../services/common.js';
Page({
  data: {
    current: 'tab2',
    index1: 0,
    index11: 5,
    index2: 0,
    index22: 5,
    list: [],
    showCancel: false,
    visible: false,
    visible1: false,
    numWait: 0,
    numFinish: 0,
    transferData: null
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单',
    })
  },
  onShow: function () {
    this.listOne()
  },
  handleChange: function({detail}) {
    this.setData({
      current: detail.key,
      list: [],
      index1: 0,
      index11: 5,
      index2: 0,
      index22: 5,
      visible1: true
    })
    if(detail.key == 'tab2') {
      this.listOne();
    } else {
      this.listTwo();
    }
  },
  listOne: function () {
    const self = this;
    wx.showLoading({
      title: '加载中'
    })
    order.listOne({startIndex: this.data.index1, endIndex: this.data.index11}, function (res){
      wx.hideLoading();
      if (res.code == 0 && res.data) {
        let dataList = self.data.list.concat(res.data);
        self.setData({
          list: dataList,
          numWait: dataList.length,
          loadMoreOne: res.data.length < 5 ? true : false
        })
      }
    })
  },
  listTwo: function () {
    const self = this;
    wx.showLoading({
      title: '加载中'
    })
    order.listTwo({startIndex: this.data.index2, endIndex: this.data.index22}, function (res) {
      wx.hideLoading();
      if (res.code == 0 && res.data) {
        let dataList = self.data.list.concat(res.data);
        self.setData({
          list: dataList,
          numFinish: dataList.length,
          loadMoreTwo: res.data.length < 5 ? true : false
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
  },
  transfer: function (e) {
    let orderId = e.target.dataset.id;
    for (let index in this.data.list) {
      if (this.data.list[index].orderId == orderId) {
        this.setData({
          transferData: this.data.list[index]
        })
      }
    }
    this.setData({
      visible1: true
    })
  },
  onReachBottom: function () {
    if (this.data.current == 'tab2') {
      if (this.data.loadMoreOne) return;
      this.setData({
        index1: this.data.index11,
        index11: this.data.index11 + 5
      })
      this.listOne()
    }
    if (this.data.current == 'tab3') {
      if (this.data.loadMoreTwo) return;
      this.setData({
        index1: this.data.index22,
        index11: this.data.index22 + 5
      })
      this.listTwo()
    }
  },
  takeExpressOne: function (e) {
    order.handle({ orderId: e.target.dataset.id }, function (res) {
      if (res.code === 0) {
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
  submit: function () {
    let param = {
      orderId: this.data.transferData.orderId,
      expressNumber: this.data.expressNumber,
      expressName: this.data.expressName,
      expressPrice: this.data.transferData.expressPrice,
      packageKg: this.data.transferData.packageKg
    }
    rider.turnOrder(param, function (res) {
      if (res.code == 0) {
        this.listTwo();
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  scan: function () {
    wx.scanCode({
      success: (res) => {
        if (res.result) {
          this.getExpress(res.result)
        }
      }
    })
  },
  getExpress: function (val) {
    const self = this;
    common.getExpress({
      number: val
    }, function (res) {
      if (res.errno == 0 && res.data) {
        this.setData({
          expressName: res.data.expName,
          expressNumber: res.data.number
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  }
})