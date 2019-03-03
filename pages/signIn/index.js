// pages/signIn/index.js
import common from '../../services/common';
Page({
  data: {
    checked: true,
    color: '#008CF0',
    codeStr: '发送验证码',
    visible: false,
    showCancel: false,
    school: {
      id: '',
      name: ''
    }
  },
  onShow: function () {
    const self = this;
    common.school({}, function(res) {
      if (res.code == 0) {
        self.setData({
          schoolList: res.data
        })
      }
    })
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  detail: function (e) {
    this.setData({
      detail: e.detail.value
    })
  },
  code: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  getCode: function () {
    const self = this;
    let count = 0;
    let isLock = false
    if(!this.data.phone) return;
    if (isLock) {
      return
    }
    common.code({phone: this.data.phone}, function (res) {
      if (res.code == 0) {
        count = 1
        isLock = true
        let timer = setInterval(function() {
          self.setData({
            codeStr: count < 60 ? count + 's' : '发送验证码'
          })
          count++
          if (count > 60) {
            isLock = false
            count = 1
            clearInterval(timer)
          }
        }, 1000)
        wx.showToast({
          title: '验证码发送成功',
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  submit: function() {
    let param = {
      phone: this.data.phone,
      name: this.data.name,
      code: this.data.code,
      address: this.data.detail,
      schoolId: this.data.school.id
    }
    console.log(param)
    let flagArr = []
    Object.keys(param).forEach(function(index) {
      flagArr.push(!!param[index])
    })
    if (flagArr.includes(false)) {
      wx.showToast({
        title: '请填写全部表单',
        icon: 'none'
      });
      return;
    }
    common.register(param, function (res) {
      if (res.code == 0) {
        wx.navigateTo({
          url: '../transition/index',
        });
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  maskFlag: function() {
    this.setData({
      visible: false
    })
  },
  chooseSchool: function() {
    this.setData({
      visible: true
    })
  },
  schoolChange: function(e) {
    let id = e.target.dataset.id || '';
    let name = e.target.dataset.name || '';
    this.setData({
      school: {id: id, name: name},
      visible: false
    })
  }
})