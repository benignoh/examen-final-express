var basicAuth = require('basic-auth');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
const jsrsasign = require('jsrsasign');

var modelo = require('../models/modelo').modelo;
var app = express();

app.use(bodyParser.json());

//PETICIONES POST A /api/tasks/
exports.agregar = function(req,res){ //Funcion agregar
    res.setHeader('Content-Type', 'application/json'); //Lo que regrese sera un JSON
    console.log(req.body.text);
    if(req.body.text && req.body.done && req.body.date){ //Lo que se envie debe de tener text,done y date
        if(modelo.length > 0){
            var num = (modelo[modelo.length-1].id)+1; //obtiene tamaño de modelo y le resta 1 para que se cree la nueva entrada
        }else{
            num = 0; //Si modelo esta vacio entonces ....
        }

        req.body.id = num; //Ponemos el campo id de modelo en num
        req.body.createdAt = new Date(); //Campo createdAt fecha de hoy
        req.body.updatedAt = new Date(); //Campo updatedAt fecha actual
        modelo.push(req.body); //Se insertan los valores en el nuevo model

        res.send('{"id": "'+req.body.id+'"}'); //De respuesta al server se manda solo el id

        
    }else{
        res.status(404); //Si se mando el request sin text,done,data sale error
        res.send('Not Found dud'); //Mensaje de error
    }
};

//PETICIONES GET A /api/tasks/
exports.mostrar = function(req,res){
    res.setHeader('Content-Type','application/json');
    res.send(modelo);
};


//PETICIONES DELETE A /api/tasks/id
exports.eliminar = function(req,res){
    res.setHeader('Content-Type', 'application/json');
    var error = false;
    for (var i = 0; i < modelo.length; i++){
      if (modelo[i].id == req.params.id){
        modelos.splice(i,1);
        res.send("Eliminado");
      }
    }
      res.send("Not Found");
};

exports.getToken = function(req,res){
    
    res.setHeader('Content-Type', 'application/json');
    var usernameR = req.body.username;
    var passwordR = req.body.password;
  
    let header = { //Declaramos tipo de JWT que se va a usar
      alg: "HS256",
      typ: "JWT"
    };
  
    let payload = { 
    };
      payload.iat = jsrsasign.jws.IntDate.get('now'); //Cuando se creo
  payload.user = usernameR;
  payload.pass = passwordR;

  //Los secretitos
  payload.secretCode = 'beno4life';
  payload.currentState = 'qwerty';

  // Signature = (header + payload + secret_phrase) * algoritmo
  let secret_phrase = passwordR;
  let jwt = jsrsasign.jws.JWS.sign("HS256", JSON.stringify(header), JSON.stringify(payload), secret_phrase);

  jwtResultado = {"token": jwt}
  // Envia un JWT generado
  res.send(jwtResultado);
  
};