const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Url = require('./models/url')
const urlShortener = require('./urlShortener')
const PORT = process.env.PORT || 3000
require('./config/mongoose')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  return res.render('index')
})

app.get('/shortenedurls/:shortenedUrl', (req, res) => {
  const shortenedUrl = req.params.shortenedUrl
  return Url.findOne({ shortenedUrl })
    .lean()
    .then(url => res.redirect(url.originalUrl))
    .catch(error => console.log(error))
})

app.post('/shorten', (req, res) => {
  const originalUrl = req.body.url
  let shortenedUrl = urlShortener()
  return Url.find()
    .lean()
    .then(urls => {
      while (urls.some(url => url.shortenedUrl === shortenedUrl) === true) {
        shortenedUrl = urlShortener()
      }
    })
    .then(() => {
      Url.create({
        originalUrl,
        shortenedUrl
      })
        .then(() => res.render('new', { shortenedUrl }))
        .catch(error => console.log(error))
    })
})

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`)
})