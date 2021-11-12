const mongoose = require('mongoose')
const Url = require('../url')
const dummyData = require('../../url.json').results

mongoose.connect('mongodb://localhost/url-shortner')

const db = mongoose.connection

db.on('error', () => {
  console.log('OH NO! MONGODB ERROR!!!')
})

db.once('open', () => {
  Url.create(dummyData)
    .then(() => {
      console.log('inserted dummy data!!')
      //close mongoose connection once the seeder has done
      return db.close()
    })
})