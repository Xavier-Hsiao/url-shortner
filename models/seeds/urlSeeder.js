const Url = require('../url')
const dummyData = require('../../url.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  Url.create(dummyData)
    .then(() => {
      console.log('inserted dummy data!!')
      //close mongoose connection once the seeder has done
      return db.close()
    })
})