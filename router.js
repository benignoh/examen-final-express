var basicAuth = require('basic-auth'); //Autenticacion
var cookieParser = require('cookie-parser');//Creador y lector de cookies
var bodyParser = require('body-parser');//Pedir y recibir en JSONS
var express = require('express');//Servidor Web
const jsrsasign = require('jsrsasign');//JWT Token


var app = express();
const taskContoller = require('./controller/tasks-controller.js'); //Utilizar el archivo contorller
var modelo = require('./models/modelo').modelos; //Utilizar un modelo en concreto en modelos

app.use(bodyParser.urlencoded({extended: true}));//Express podra recibir URLenconded
app.use(bodyParser.json());// Express podra recibir JSONs

app.post('/api/tasks', taskContoller.agregar); //Peticiones post a /api/task usaran la funcion agregar en el controller
app.get('/api/tasks', taskContoller.mostrar); //Peticiones get usaran la funcion mostrar de controller
app.delete('/api/tasks/:id', taskContoller.eliminar); //Petciones delete usaran la funcion eliminar del controler pero es necesario pasar un ID
app.post('/api/auth/token', taskContoller.getToken); //Peticiones post a /api/auth/token usaran la funcion getToken del controller

exports.app = app; //Todo archivo que pida a router.js podra hacer uso de el