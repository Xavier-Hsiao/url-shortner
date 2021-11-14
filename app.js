const express = require('express')
const app = express()
const exphbs = require('express-handlebars') 
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Url = require('./models/url')
const digitGenerator = require('./utilities/digitGenerator')
const port = 3000

app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: false }))
//error handler
// app.use((err, req, res, next) => {
//   console.log('error')
//   console.log(err)
//   next(err)
// })

mongoose.connect('mongodb://localhost/url-shortner')

const db = mongoose.connection

db.on('error', () => {
  console.log('OH NO! MONGODB ERROR!!!')
})

db.once('open', () => {
  console.log('DB OPEN!!')
})




//home page route
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/error', (req, res) => {
  cat.cute()
})

//original website redirection route
app.get('/:shortenedDigits', (req, res) => {
  const shortenedDigits = req.params.shortenedDigits
  Url.findOne({shortenedDigits})
    .lean()
    .then(href => {
        // console.log(href.originalURL)
        res.redirect(href.originalURL)
    })
      // res.status(404).render('error', {
      //   statusCode: '404',
      //   errorMessage: 'Failed to find any results.'
      // })
    .catch(err => {
      console.log(err)
      res.render('error', {
        statusCode: '404',
        errorMessage: 'Failed to find any results.'
      })
    })
})

const host = 'localhost:3000/'
let newUrl = ''
let newDigits = ''

app.post('/', (req, res) => {
  const inputUrl = req.body.inputUrl
  Url.find()
    .lean()
    .then(urls => {
      //search for the matched targetUrl in urls Array
      newUrl = urls.find(url => url.originalURL === inputUrl)
      //check if inputUrl exists in Database 
        if(newUrl) {
        newUrl = host + newUrl.shortenedDigits
        return res.render('shortenedUrl', {newUrl})
      }
      //generate random five digits
      newDigits = digitGenerator()
      newUrl = host + newDigits
      //check if newUrl exists in Database 
      while(urls.some(url => url.originalURL === newUrl)) {
        newDigits = digitGenerator()
      }
      //create a new document to Database
      return Url.create({originalURL: inputUrl, shortenedDigits: newDigits})
    })
    .then(() => res.render('shortenedUrl', {newUrl, newDigits}))
    .catch(err => console.log(err))
})


app.listen(port, () => {
  console.log(`The server is running on http://localhost${port}!`)
})
