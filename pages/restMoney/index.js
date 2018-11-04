import rider from '../../services/rider'
Page({
  data: {
    recordList: null
  },
  onLoad: function () {
    const self = this;
    rider.fundsAccountRecord({type: 0}, function (res) {
      if (res.code == 0 && res.data) {
          self.setData({
            recordList: res.data
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