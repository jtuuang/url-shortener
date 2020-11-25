const Url = require('./models/url')
require('./config/mongoose')

function isRepeated(shortenedUrl) {
  return Url.find()
    .then(urls => urls.find(url => url.shortenedUrl === shortenedUrl))
    .then(url => {
      if (!url) {
        return true
      }
    })
}

module.exports = isRepeated