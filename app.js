const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Url = require('./models/url')
const urlShortener = require('./urlShortener')
const url = require('./models/url')
require('./config/mongoose')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/shorten', (req, res) => {
  const originalUrl = req.body.url
  const shortenedUrl = urlShortener()
  return Url.create({
    originalUrl,
    shortenedUrl
  })
    .then(() => res.render('index'))
    .catch(error => console.log(error))
})

app.get('/:shortenedUrl', (req, res) => {
  const shortenedUrl = req.params.shortenedUrl
  return Url.find()
    .lean()
    .then(urls => urls.find(url => url.shortenedUrl === shortenedUrl))
    .then(url => res.redirect(`${url.originalUrl}`))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('The server is running on http://localhost:3000')
})