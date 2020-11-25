const Url = require('./models/url')
require('./config/mongoose')

function isRepeated(shortenedUrl) {
  return Url.find()
    .then(urls => urls.find(url => url.shortenedUrl === shortenedUrl))
    .then(url => {
      if (!url) { // 沒有一樣的
        return true
      } else {
        return false // 有一樣的
      }
    })
}

module.exports = isRepeated