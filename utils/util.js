const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-');
}

const request = params => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: params.url,
      data: params.data,
      header: Object.assign({}, {'content-type': 'application/json'}, params.header || {}),
      method: params.method || 'GET',
      dataType: 'json',
      // responseType: 'text',
      success: function (res) {
        console.log('request success === ')
        console.log(params)
        console.log(res)
        resolve(res);
      },
      fail: function (res) {
        console.log('request fail === ')
        console.log(params)
        console.log(res)
        reject(res);
      },
      complete: function (res) { },
    })
  })
}

module.exports = {
  formatTime,
  formatDate,
  request,
}
