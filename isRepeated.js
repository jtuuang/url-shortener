const Url = require('./models/url')
require('./config/mongoose')

function isRepeated(shortenedUrl) {
  Url.findOne({ shortenedUrl })
    .lean()
    .then(url => {
      if (url) {
        console.log('yes')
        return true // 已存在
      } else {
        console.log('no')
        return false // 不存在
      }
    })
}

module.exports = isRepeated