const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/url-shortner')

const db = mongoose.connection

db.on('error', () => {
  console.log('OH NO! MONGODB ERROR!!!')
})

db.once('open', () => {
  console.log('DB OPEN!!')
})

module.exports = db
