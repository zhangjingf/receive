export default {
  ajax(options) {
    var _options = {
      url: options.url || '',
      method: options.type || 'GET',
      dataType: options.dataType || 'json',
      data: options.data || {}
    }
    if (typeof options.error === 'function') {
      _options.fail = options.error
    }
    if (typeof options.success === 'function') {
      _options.success = options.success
    }
    let _wx_option = {
      url: _options.url,
      method: _options.method,
      data: _options.data,
      // 数据格式的转换也在这进行处理
      success: function (res) {
        if (res.data.errno == 0) {
          typeof _options.success == 'function' && _options.success.call(this, res.data)
        } else if (res.data.errno == 401) {
          wx.redirectTo({
            url: '../start/index',
          })
        } else if (res.data.errno == 2000) {
          wx.redirectTo({
            url: '../signIn/index',
          })
        } else {
          typeof _options.success == 'function' && _options.success.call(this, res.data)
        }
      },
      fail: function (err) {
        typeof _options.error == 'function' && _options.error.call(this, err)
      }
    }
    var _header = {
      'Content-Type': 'application/json',
      'X-rider-Token': wx.getStorageSync('rider_token'),
      'X-Token-Type': 1
    }
    //post方式只有配置application/x-www-form-urlencoded，上传参数的类型才是form Data
    if (_wx_option.method === "POST") {
      // _header['Content-Type'] = 'application/x-www-form-urlencoded' // 默认值,
    }
    _wx_option.header = _header
    wx.request(_wx_option)
  }
}