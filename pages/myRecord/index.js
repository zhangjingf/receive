import rider from '../../services/rider'
Page({
  data: {
    waitList: null,
    finishList: null,
    wait: 0,
    finish: 0
  },
  onLoad: function () {
    const self = this;
    rider.queryAccountOfList({}, function(res) {
      if (res.code == 0) {
        if (res.data.records.length > 0) {
          let list1 = [];
          let list2 = [];
          let sum1 = 0;
          let sum2 = 0;
          for (let index in res.data.records) {
            if (res.data.records[index].status == 0) {
              list1.push(res.data.records[index])
              sum1 += Number(res.data.records[index].totalIncomeAmount)
            } else {
              list2.push(res.data.records[index])
              sum2 += Number(res.data.records[index].totalIncomeAmount)
            }
          }
          self.setData({
            waitList: list1,
            finishList: list2,
            wait: sum1.toFixed(2),
            finish: sum2.toFixed(2)
          })
        }
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  godetail: function (e) {
    let id = e.target.dataset.id || '';
    if (!id) return;
    wx.navigateTo({
      url: '../recordDetail/index?id='+ id,
    })
  }
})