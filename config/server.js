// node é uma plataforma que executa códigos js,
// e o express é um framework, que faz uma interface entre o node e os códigos
var express = require('express')
var consign = require('consign')
var bodyParser = require('body-parser')
var expressValidator = require('express-validator')

var app = express(); 
app.set('view engine', 'ejs')
app.set('views', './app/views')

app.use(express.static('./app/public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressValidator())

consign()
    .include('config/dbConnection.js')
    .then('./app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app)

module.exports = app
