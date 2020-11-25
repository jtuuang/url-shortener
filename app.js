const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Url = require('./models/url')
require('./config/mongoose')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(3000, () => {
  console.log('The server is running on http://localhost:3000')
})