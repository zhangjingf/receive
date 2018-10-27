const { ajax } = require('../utils/request').default
const { sendLink } = require('../host').default
class Common {
  login(data, callback) {
    ajax({
      url: sendLink() + '/api/riderAuth/login_by_weixin',
      type: 'POST',
      data: data,
      success: function (ret) {
        typeof callback == 'function' && callback.call(this, ret)
      },
      error: function (ret) {
        typeof callback == 'function' && callback.call(this, ret)
      }
    })
  }
}

export default new Common