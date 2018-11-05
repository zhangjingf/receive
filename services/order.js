const { ajax } = require('../utils/request').default
const { sendLink } = require('../host').default
class Order {
  listOne(data, callback) { //代取件
    ajax({
        url: sendLink() + '/api/riderOrder/searchNeedToPickOrder',
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
  listTwo(data, callback) { //待完成
      ajax({
          url: sendLink() + '/api/riderOrder/searchNeedToFinshedOrder',
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
  handle(data, callback) {
      ajax({
          url: sendLink() + '/api/riderOrder/reportToPickOrder',
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
  finish(data, callback) {
    ajax({
        url: sendLink() + '/api/riderOrder / reportToFinshedOrder',
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
}

export default new Order