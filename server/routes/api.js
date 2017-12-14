const express = require('express');
const router = express.Router();
var Buffer = require('buffer').Buffer;
var pg = require('pg');
const { Pool, Client } = require('pg');
const connectionString = 'postgresql://postgres:FAntasydj87@localhost:5432/users';
var  algorithm, key, HMAC_ALGORITHM, HMAC_KEY;
const crypto = require('crypto');
algorithm = 'aes-256-cbc';
HMAC_ALGORITHM = 'SHA256';
key= '3zTvzr3p67VC61jmV54rIYu1545x4TlY';
const IV_LENGTH = 16;
HMAC_KEY = crypto.randomBytes(32);






/* GET api listing. */
router.get('/check', (req, resp) => {

  const checkName = 'SELECT nome_cliente, username, tipo_accesso FROM users WHERE nome_cliente=($1) AND username= ($2) AND tipo_accesso=($3)'
  const checkValue = [req.query.nome_cliente, req.query.username, req.query.tipo_accesso];
  var client = new pg.Client(connectionString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query(checkName, checkValue,  function(err, res) {
 console.log(res.rows);
    if(err) {
      return console.error('error running query', err);
      }
     if(res.rows.length > 0 ) {
        res.rows.some(res =>{
       if (res.nome_cliente === req.query.nome_cliente && res.username === req.query.username && res.tipo_accesso === req.query.tipo_accesso) {
          return resp.send({ error: 'la combinazione nome cliente , username e tipo accesso è già esistente', status: true });

        }
        else {
          return resp.send({status: false});

        }
      });

    } else {
      return resp.send({status: false});

    }
   client.end();
});
});


});

router.post('/form',   (req, response) => {

  function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    var cipher_text;
    var hmac;
    var encryptor;

    encryptor = crypto.createCipheriv(algorithm, key, new Buffer(iv));
    encryptor.setEncoding('hex');
    encryptor.write(text);
    encryptor.end();
    cipher_text = encryptor.read();

     hmac = crypto.createHmac(HMAC_ALGORITHM, HMAC_KEY);
       hmac.update(cipher_text);
      hmac.update(iv.toString('hex')); // ensure that both the IV and the cipher-text is protected by the HMAC
     //   console.log(encrypt, cipher_text, iv.toString('hex'));
        // The IV isn't a secret so it can be stored along side everything else
        return cipher_text +'$' + iv.toString('hex')+ '$' + hmac.digest('hex');

   }

var userModel = {};
 userModel.name = req.body.name;
 userModel.password = req.body.password;
 userModel.access = req.body.access;
 userModel.note = req.body.note;
 userModel.username  = req.body.username;






  encryptedString = encrypt(userModel.password);
   console.log(encryptedString);
   userModel.password = encryptedString;
let text= [];





  const values = [req.body.name, req.body.username, userModel.access,  userModel.password,  userModel.note];
       text = 'INSERT INTO users(nome_cliente, username, tipo_accesso, password, note) VALUES($1, $2, $3, $4, $5) RETURNING *'
          var client = new pg.Client(connectionString);
          client.connect(function(err) {
            if(err) {
              return console.error('could not connect to postgres', err);
            }
            client.query(text, values, function(err, res) {
              if(err) {
                return console.error('error running query', err);
              }
              console.log(res.rows[0]);
              client.end();
          return  response.send({passwordCrypted:userModel.password});
    });
  });

  });

 router.put('/update',   (req, res) => {


  var userModel = {};
   userModel.name = req.body.nome_cliente;
   userModel.password = req.body.password;
   userModel.tipo_accesso = req.body.tipo_accesso;
   userModel.note = req.body.note;
   userModel.username  = req.body.username;
   userModel.id = req.body.id;

function encrypt(text) {
      let iv = crypto.randomBytes(IV_LENGTH);
      var cipher_text;
      var hmac;
      var encryptor;

      encryptor = crypto.createCipheriv(algorithm, key, new Buffer(iv));
      encryptor.setEncoding('hex');
      encryptor.write(text);
      encryptor.end();
      cipher_text = encryptor.read();

          return cipher_text + "$" +iv.toString('hex');
          console.log(encrypt);
     }
     var  encryptedString = encrypt(userModel.password);
    console.log('nome '+userModel.name, 'note '+ userModel.note, 'id'+ userModel.id, 'accesso '+ req.body.tipo_accesso);
     console.log('pass ' + encryptedString);

      userModel.password = encryptedString;
     let text= [];
     let values= [];
     if(req.body.password.length <= 16){
      text = 'UPDATE users SET nome_cliente =($1), username=($2), tipo_accesso=($3), password=($4), note=($5)   WHERE id=($6) '
      values = [req.body.nome_cliente, req.body.username, req.body.tipo_accesso,  userModel.password,  userModel.note, userModel.id ];
     } else {
       text = 'UPDATE users SET nome_cliente =($1), username=($2), tipo_accesso=($3),  note=($4)   WHERE id=($5) '
      values = [req.body.nome_cliente, req.body.username, req.body.tipo_accesso, userModel.note, userModel.id ];
     }
    var client = new pg.Client(connectionString);
    client.connect(function(err) {
      if(err) {
        return console.error('could not connect to postgres', err);
      }
      client.query(text, values, function(err, res) {
        if(err) {
          return console.error('error running query', err);
        }

        client.end();
      });
    });



res.send({tipo_accesso:req.body.access});

  });







  router.get('/users', (req, res) => {

var json = {};

const dbReturn = 'SELECT password FROM users';
var client = new pg.Client(connectionString);
client.connect(function(err) {
client.query(dbReturn, function(req , result) {
json = result;
  client.end();
   console.log('JSON-result:', json);
   res.send(json);
  });
});



  });



  router.get('/search/',  (req, res, next) => {
    var searchRes = {};
    let searchResult = 'SELECT id,nome_cliente, username, password, note, tipo_accesso  FROM users where TRUE=TRUE';
    let queryParams = [];

 /*   if(req.query.nome_cliente && req.query.nome_cliente != ''){
      searchResult += " AND nome_cliente = $1"
      queryParams.push(req.query.nome_cliente);
    }

    if (req.query.tipo_accesso && req.query.tipo_accesso != '') {
      searchResult += " AND tipo_accesso = $" + (queryParams.length + 1);
      queryParams.push(req.query.tipo_accesso);
    }
    */

    req.query.nome_cliente && req.query.nome_cliente   != ''  ? (searchResult += " AND nome_cliente = $1" , queryParams.push(req.query.nome_cliente)) : null;
    req.query.tipo_accesso && req.query.tipo_accesso   != '' ? (searchResult += " AND tipo_accesso = $" + (queryParams.length + 1) , queryParams.push(req.query.tipo_accesso)) : null;
    req.query.password && req.query.password != '' ? (searchResult += " AND password = $" + (queryParams.length + 1) , queryParams.push(req.query.password)) : null;

    var client = new pg.Client(connectionString);
    client.connect(function(err){
    client.query(searchResult, queryParams, function(req, result){
      searchRes = result;
      client.end();
      res.send(searchRes.rows);
    });
  });
});

router.post('/decrypt',  (req, res, next) => {

  console.log('password criptata '+ req.body.password);
  var encryptedString = req.body.password;

function decrypt(text) {
  let textParts = text.split('$');

  console.log('textparts ' + textParts);
  var ct = textParts[0];

  console.log('1 ' + ct);
  let iv = new Buffer(textParts[1], 'hex');

  var hmac =textParts[2];
  var decryptor;
  console.log('hmac ' + hmac);

  console.log('iv '+ iv);
  chmac = crypto.createHmac(HMAC_ALGORITHM, HMAC_KEY);
  chmac.update(ct);
  chmac.update(iv.toString('hex'));
   decryptor = crypto.createDecipheriv(algorithm, key, iv);
  var decryptedText = decryptor.update(ct,'hex', 'utf-8');
  return decryptedText += decryptor.final('utf-8');

 };

 var constant_time_compare = function (val1, val2) {
  var sentinel;

  if (val1.length !== val2.length) {
      return false;
  }


  for (var i = 0; i <= (val1.length - 1); i++) {
      sentinel |= val1.charCodeAt(i) ^ val2.charCodeAt(i);
  }

  return sentinel === 0;
 };
  var decryptedString = decrypt(req.body.password);
  console.log(decryptedString);



  console.log("password in chiaro  " + decryptedString);
  console.log('password is: ' + req.body.password );
  res.json({password: decryptedString});

  });


  router.get('/decrypta', (req,res,next) => {
let password = req.query.password;
var json = {};

const dbReturn = 'SELECT id,nome_cliente, username, password, note, tipo_accesso  FROM users  where password= $1';
var client = new pg.Client(connectionString);
client.connect(function(err) {
client.query(dbReturn,[password], function(req , result) {
   // console.log(result.rows[0]);
json = result.rows[0];
   // json = JSON.stringify(res);
    client.end();
            // var json = result.rows;
            // wrap result-set as json
            console.log('JSON-result:', json);
   let decryptedString = decrypt(password);
   json.decryptedString = decryptedString;
   console.log('ecco',json.decryptedString)




   res.json(json);
  });


});

function decrypt(text) {
  let textParts = text.split('$');

  console.log('textparts ' + textParts);
  var ct = textParts[0];

  console.log('1 ' + ct);
  let iv = new Buffer(textParts[1], 'hex');

  var hmac =textParts[2];
  var decryptor;
  console.log('hmac ' + hmac);

  console.log('iv '+ iv);
  chmac = crypto.createHmac(HMAC_ALGORITHM, HMAC_KEY);
  chmac.update(ct);
  chmac.update(iv.toString('hex'));
  decryptor = crypto.createDecipheriv(algorithm, key, iv);
  var decryptedText = decryptor.update(ct,'hex', 'utf-8');
  return decryptedText += decryptor.final('utf-8');

 };

 var constant_time_compare = function (val1, val2) {
  var sentinel;

  if (val1.length !== val2.length) {
      return false;
  }


  for (var i = 0; i <= (val1.length - 1); i++) {
      sentinel |= val1.charCodeAt(i) ^ val2.charCodeAt(i);
  }

  return sentinel === 0;
 };


  });

module.exports = router;

