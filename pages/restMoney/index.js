import rider from '../../services/rider'
Page({
  data: {
    recordList: null
  },
  onLoad: function () {
    const self = this;
    rider.fundsAccountRecord({}, function (res) {
      if (res.code == 0 && res.data) {
          self.setData({
            totalAmount: res.data.currentBalance,
            recordList: res.data.records
          })
      }
    })
  },
  onShow: function () {

  },
  onReachBottom: function (){
    console.log(1111)
  }
})