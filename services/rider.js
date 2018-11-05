const { ajax } = require('../utils/request').default
const { sendLink } = require('../host').default
class Rider {
    accountInfo(data, callback) { //账户信息
        ajax({
            url: sendLink() + '/api/rider/fundsAccountInfo',
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

    transferOut(data, callback) { //提现
        ajax({
            url: sendLink() + '/api/rider/transferOut',
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
    fundsAccountRecord(data, callback) { //余额流水
        ajax({
            url: sendLink() + '/api/rider/fundsAccountRecord',
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
    
    queryAccountOfOrders(data, callback) { //账单详情
      ajax({
        url: sendLink() + '/api/rider/queryAccountOfOrders',
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
    queryAccountOfList(data, callback) { //账单列表
      ajax({
        url: sendLink() + '/api/rider/queryAccountOfList',
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

    queryAccountOfOrder(data, callback) { //入账订单详情
        ajax({
            url: sendLink() + '/api/rider/queryAccountOfOrder',
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
export default new Rider