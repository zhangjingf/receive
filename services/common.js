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
  code(data, callback) {
    ajax({
      url: sendLink() + '/api/riderRegister/getSmsCode',
      type: 'GET',
      data: data,
      success: function (ret) {
        typeof callback == 'function' && callback.call(this, ret)
      },
      error: function (ret) {
        typeof callback == 'function' && callback.call(this, ret)
      }
    })
  }
  register(data, callback) {
    ajax({
      url: sendLink() + '/api/riderRegister/register',
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
  school(data, callback) {
    ajax({
      url: sendLink() + '/api/riderRegister/getSchoolList',
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