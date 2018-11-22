import order from '../../services/order';
import common from '../../services/common.js';
Page({
  data: {
    current: 'tab2',
    index1: 0,
    index11: 5,
    index2: 0,
    index22: 5,
    index3: 0,
    index33: 5,
    list: [],
    showCancel: false,
    visible: false,
    visible1: false,
    numWait: 0,
    numFinish: 0,
    numSend: 0,
    transferData: null,
    sumPrice: 0,
    riderStatus: 0
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单',
    })
  },
  onShow: function () {
    const self = this;
    this.setData({
      index1: 0,
      index11: 5,
      list: [],
      current: 'tab2'
    })
    this.count()
    this.listOne()
    common.riderStatus({}, function(res) {
      if (res.code == 0) {
        self.setData({
          riderStatus: res.data.workStatus
        })
      }
    })
  },
  handleChange: function({detail}) {
    this.setData({
      current: detail.key,
      list: [],
      index1: 0,
      index11: 5,
      index2: 0,
      index22: 5,
      index3: 0,
      index33: 5
    })
    if(detail.key == 'tab2') {
      this.listOne();
    } else if (detail.key == 'tab3'){
      this.listTwo();
    } else {
      this.listThree();
    }
    this.count()
  },
  listOne: function () {
    const self = this;
    wx.showLoading({
      title: '加载中'
    })
    order.listOne({startIndex: this.data.index1, endIndex: this.data.index11}, function (res){
      wx.hideLoading();
      self.setData({
        visible: false
      })
      if (res.code == 0 && res.data.orderList) {
        let dataList = self.data.list.concat(res.data.orderList);
        self.setData({
          list: dataList,
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
      if (res.code == 0 && res.data.orderList) {
        let dataList = self.data.list.concat(res.data.orderList);
        self.setData({
          list: dataList,
          loadMoreTwo: res.data.length < 5 ? true : false
        })
      }
    })
  },
  listThree: function(){
    const self = this;
    wx.showLoading({
      title: '加载中'
    })
    order.listThree({ startIndex: this.data.index3, endIndex: this.data.index33 }, function (res) {
      wx.hideLoading();
      if (res.code == 0 && res.data.orderList) {
        let dataList = self.data.list.concat(res.data.orderList);
        self.setData({
          list: dataList,
          loadMoreThree: res.data.length < 5 ? true : false
        })
      }
    })
  },
  count: function() {
    let self = this;
    order.count({}, function(res) {
      if (res.code == 0 && res.data) {
        self.setData({
          numWait: res.data['10010'],
          numFinish: res.data['10040'],
          numSend: res.data['10020']
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
      visible: true,
      expressNumber: ''
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
        self.setData({
          list: [],
          index1: 0,
          index11: 5
        })
        self.count();
        self.listOne();
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
        self.setData({
          list: [],
          index3: 0,
          index33: 5
        })
        self.count();
        self.listThree();
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
      visible1: true,
      expressNumber: '',
      expressName: '',
      expressPrice: '',
      packageKg: ''
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
        index2: this.data.index22,
        index22: this.data.index22 + 5
      })
      this.listTwo()
    }
    if (this.data.current == 'tab4') {
      if (this.data.loadMoreThree) return;
      this.setData({
        index3: this.data.index33,
        index33: this.data.index33 + 5
      })
      this.listThree()
    }
  },
  takeExpressOne: function (e) {
    let self = this;
    order.handle({ orderId: e.target.dataset.id }, function (res) {
      if (res.code === 0) {
        wx.showToast({
          title: '取件成功',
          icon: 'success'
        })
        self.setData({
          list: [],
          index1: 0,
          index11: 5
        })
        self.count()
        self.listOne()
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
      expressPrice: this.data.expressPrice,
      packageKg: this.data.weight
    }
    let self = this;
    order.turnOrder(param, function (res) {
      if (res.code == 0) {
        self.setData({
          list: [],
          visible1: false,
          index3: 0,
          index33: 5
        })
        self.count();
        self.listThree();
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  express: function (e) {
    //this.getExpress(e.detail.value)
    this.setData({
      expressNumber: e.detail.value
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
    if(!val) return;
    common.getExpress({
      'number': val
    }, function (res) {
      if (res.errno == 0 && res.data) {
        self.setData({
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
  },
  call: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.phone
    })
  },
  weight: function (e) {
    this.setData({
      weight: e.detail.value
    })
  },
  yunfee: function (e) {
    let sum = Number(e.detail.value)
    if (this.data.transferData) {
      sum = sum + Number(this.data.transferData.servicePrice) + Number(this.data.transferData.tipPrice);
    }
    this.setData({
      expressPrice: e.detail.value,
      sumPrice: sum
    })
  },
  company: function (e) {
    this.setData({
      expressName: e.detail.value
    })
  },
  goMine: function () {
    wx.navigateTo({
      url: '../mine/index',
    })
  },
  setStatus: function () {
    const self = this;
    let workStatus = this.data.riderStatus == 1 ? 0 : 1;
    common.setStatus({workStatus: workStatus}, function (res) {
      if (res.code == 0) {
        self.setData({
          riderStatus: workStatus
        })
      }
    })
  }
})