const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const digitGenerator = require('../../utilities/digitGenerator')

//home page route
router.get('/', (req, res) => {
  res.render('index')
})


router.post('/', (req, res) => {
  const host = req.headers.host
  const inputUrl = req.body.inputUrl
  let newUrl = ''
  let newDigits = ''

  Url.find()
    .lean()
    .then(urls => {
      //search for the matched targetUrl in urls Array
      newUrl = urls.find(url => url.originalURL === inputUrl)
      //check if inputUrl exists in Database 
        if(newUrl) {
        // newUrl = host + '/'newUrl.shortenedDigits
        return res.render('shortenedUrl', {newUrl})
      }
      //generate random five digits
      newDigits = digitGenerator()
      newUrl = host + '/' + newDigits
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

//original website redirection route
router.get('/:shortenedDigits', (req, res) => {
  const shortenedDigits = req.params.shortenedDigits
  Url.findOne({shortenedDigits})
    .lean()
    .then(href => {
        // console.log(href.originalURL)
        res.redirect(href.originalURL)
    })
    .catch(err => {
      console.log(err)
      res.render('error', {
        statusCode: '404',
        errorMessage: 'Failed to find any results.'
      })
    })
})

module.exports = router