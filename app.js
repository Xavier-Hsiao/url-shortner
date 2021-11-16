const express = require('express')
const app = express()
const exphbs = require('express-handlebars') 
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Url = require('./models/url')
const digitGenerator = require('./utilities/digitGenerator')
const routes = require('./routes')
//process.env.PORT for heroku env; 3000 for local env
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

mongoose.connect('mongodb://localhost/url-shortner')

const db = mongoose.connection

db.on('error', () => {
  console.log('OH NO! MONGODB ERROR!!!')
})

db.once('open', () => {
  console.log('DB OPEN!!')
})

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost${PORT}!`)
})
