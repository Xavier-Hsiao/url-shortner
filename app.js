const express = require('express')
const app = express()
const exphbs = require('express-handlebars') 
const bodyParser = require('body-parser')
const routes = require('./routes')
require('./config/mongoose')
//process.env.PORT for heroku env; 3000 for local env
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost${PORT}!`)
})
