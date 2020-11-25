const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Url = require('./models/url')
const urlShortener = require('./urlShortener')
const isRepeated = require('./isRepeated')
const PORT = process.env.PORT || 3000
require('./config/mongoose')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/:shortenedUrl', (req, res) => {
  const shortenedUrl = req.params.shortenedUrl
  return Url.find()
    .lean()
    .then(urls => urls.find(url => url.shortenedUrl === shortenedUrl))
    .then(url => res.redirect(url.originalUrl))
    .catch(error => console.log(error))
})

app.post('/shorten', (req, res) => {
  const originalUrl = req.body.url
  let shortenedUrl = urlShortener()
  while (isRepeated(shortenedUrl) === false) {
    shortenedUrl = urlShortener()
  }
  return Url.create({
    originalUrl,
    shortenedUrl
  })
    .then(() => {
      return Url.find()
        .lean()
        .then(urls => urls.find(url => url.shortenedUrl === shortenedUrl))
        .then(url => res.render('new', { url }))
        .catch(error => console.log(error))
    })
})

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`)
})