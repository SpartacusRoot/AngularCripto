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


router.get('/autocomplete', (req,res) => {
  // test autocomplete with new database refer autocompleteTest
 // const autocomplete = 'SELECT id,nome_cliente, username, tipo_accesso FROM users LIMIT 5 OFFSET 140 ';
  const autocompleteTest ='SELECT clienti.nome_cliente, usernames.username,tipo_accesso.tipo_accesso FROM clienti JOIN usernames ON clienti.id = usernames.id JOIN tipo_accesso ON usernames.id_username = tipo_accesso.id_username JOIN password ON tipo_accesso.id_tipo_accesso = password.id_tipo_accesso';
  var client = new pg.Client(connectionString);
  client.connect(function(err) {
    client.query(autocompleteTest, function(req , result) {
    json = result.rows;
      client.end();
       console.log('JSON-result:', json);
       res.json(json);
      });
    });
});
/*
router.get('/autocompleteAccesso', (req,res) => {
  // test autocomplete with new database refer autocompleteTest
  const autocomplete = 'SELECT id,nome_cliente, username, tipo_accesso FROM users LIMIT 5 OFFSET 140 ';
  const autocompleteTest =' SELECT * FROM clienti JOIN tipo_accesso ON clienti.id_cliente = tipo_accesso.id_cliente WHERE nome_cliente=($1)';
  var value = [req.query.tipo_accesso]
  var client = new pg.Client(connectionString);
  client.connect(function(err) {
    client.query(autocompleteTest, function(req , result) {
    json = result.rows;
      client.end();
       console.log('JSON-result:', json);
       res.json(json);
      });
    });
});


/*




/* GET api listing. */
router.get('/check', (req, resp) => {
  const checkName = 'SELECT clienti.nome_cliente, usernames.username,tipo_accesso.tipo_accesso FROM clienti JOIN  usernames ON clienti.id = usernames.id JOIN tipo_accesso ON usernames.id_username = tipo_accesso.id_username JOIN password ON tipo_accesso.id_tipo_accesso = password.id_tipo_accesso WHERE nome_cliente=($1) AND username= ($2) AND tipo_accesso=($3)';
 // const checkName = 'SELECT nome_cliente, username, tipo_accesso FROM users WHERE nome_cliente=($1) AND username= ($2) AND tipo_accesso=($3)'
  const checkValue = [req.query.nome_cliente, req.query.username, req.query.tipo_accesso];
  var client = new pg.Client(connectionString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query(checkName, checkValue,  function(err, res) {
 // console.log(res.rows);
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

router.post('/form', async (req,res) => {
  var client = new pg.Client(connectionString);
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
      hmac.update(iv.toString('hex'));
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

  (async () => {
    try {
      var client = new Client(connectionString)
      await client.connect();
  } catch (error) {
      console.log('A client pool error occurred:', error);
      return error;
  }
    try {
      await client.query('BEGIN')
      userModel.name  = await client.query('INSERT INTO clienti(nome_cliente) VALUES($1) RETURNING id', [req.body.name])
      userModel.username = await client.query('INSERT INTO usernames(username,id) VALUES ($1,$2) RETURNING id_username;',[req.body.username,userModel.name.rows[0].id])
      userModel.access = await client.query('INSERT INTO tipo_accesso(tipo_accesso,id_username) VALUES ($1,$2) RETURNING id_tipo_accesso;',[req.body.access,userModel.username.rows[0].id_username])
      userModel.pass = await client.query('INSERT INTO password(password, note,id_tipo_accesso) VALUES ($1, $2, $3) RETURNING password;',[userModel.password,  userModel.note, userModel.access.rows[0].id_tipo_accesso])
      await client.query('COMMIT')
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {

     await client.end()

    }
})().catch(e => console.error(e.stack))
res.send({passwordCrypted:userModel.password});


});

router.post('/form1',   (req, response) => {

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
      hmac.update(iv.toString('hex'));
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
       // relation database post from criptogramma form, refer to text1
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

 router.put('/update1',   (req, res) => {


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


  router.put('/update',   (req, res) => {

    var client = new pg.Client(connectionString);
    var userModel = {};
     userModel.nome_cliente = req.body.nome_cliente;
     userModel.password = req.body.password;
     userModel.tipo_accesso = req.query.tipo_accesso;
     userModel.note = req.body.note;
     userModel.username  = req.body.username;
     userModel.id = req.body.id;
     userModel.id_username= req.body.id_username;
     userModel.id_password = req.body.id_password;
     userModel.id_tipo_accesso = req.body.id_tipo_accesso;

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
      console.log('nome '+userModel.name, 'note '+ userModel.note, 'id'+ userModel.id, 'accesso '+ userModel.tipo_accesso);
       console.log('pass ' + encryptedString);

        userModel.password = encryptedString;

/*
       const  text  = 'WITH up1 AS ( UPDATE clienti SET nome_cliente=($1) WHERE id=($2) ), up2 AS( UPDATE usernames SET username=($3) WHERE id=($4) ),up3 AS( UPDATE tipo_accesso SET tipo_accesso=($5) WHERE id_tipo_accesso=($6)) UPDATE password SET password=($7),note=($8) WHERE id_tipo_accesso=($9);'
       const  value  = [req.body.nome_cliente,req.body.id,
          req.body.username,
          req.body.id,
       req.body.tipo_accesso,
       req.body.id_tipo_accesso,
        req.body.password,
         req.body.note,
         req.id_tipo_accesso
          ];
*/
       (async () => {
        try {
          var client = new Client(connectionString);
          await client.connect();
      } catch (error) {
          console.log('A client pool error occurred:', error);
          return error;
      }
      try {
        await client.query('BEGIN')
        userModel.nome_cliente = await client.query('UPDATE clienti SET nome_cliente=($1) WHERE id=($2)', [userModel.nome_cliente,req.body.id])
        userModel.username = await client.query('UPDATE usernames SET username=($1) WHERE id_username=($2)', [req.query.username,userModel.id_username])
        userModel.tipo_accesso = await client.query('UPDATE tipo_accesso SET tipo_accesso=($1) WHERE id_tipo_accesso=($2)', [userModel.tipo_accesso,userModel.id_tipo_accesso])
        userModel.password = await client.query('UPDATE password SET password=($1),note=($2) WHERE id_password=($3)', [userModel.password,userModel.note,userModel.id_password])
        console.log('id '+userModel.id, 'id_tipo_accesso '+ userModel.id_tipo_accesso, 'username '+ req.query.username , 'tipo_accesso '+
        userModel.tipo_accesso, 'note ' + userModel.note, 'pass '+ userModel.password, 'id_password ' + userModel.id_password)
        await client.query('COMMIT')
      } catch (e) {
        await client.query('ROLLBACK')
        throw e
      } finally {

         await client.end()
console.log(userModel, 'risultato update')
        }
    })().catch(e => console.error(e.stack))
//res.send({dati:userModel});
/*
       if(req.body.password.length <= 16){
        text = 'UPDATE users SET nome_cliente =($1), username=($2), tipo_accesso=($3), password=($4), note=($5)   WHERE id=($6) '
        values = [req.body.nome_cliente, req.body.username, req.body.tipo_accesso,  userModel.password,  userModel.note, userModel.id ];
       } else {
         text = 'UPDATE users SET nome_cliente =($1), username=($2), tipo_accesso=($3),  note=($4)   WHERE id=($5) '
        values = [req.body.nome_cliente, req.body.username, req.body.tipo_accesso, userModel.note, userModel.id ];
       }


      var client = new pg.Client(connectionString);
      text = 'WITH up1 AS ( UPDATE clienti SET nome_cliente=($1) WHERE id=($2) ), up2 AS( UPDATE usernames SET username=($3) WHERE id=($4) ),up3 AS( UPDATE tipo_accesso SET tipo_accesso=($5) WHERE id_tipo_accesso=($6)) UPDATE password SET password=($7),note=($8) WHERE id_tipo_accesso=($9);'
      value = [req.body.nome_cliente,req.body.id,
               req.body.username,
               req.body.id,
            req.body.tipo_accesso,
            req.body.id_tipo_accesso,
             req.body.password,
              req.body.note,
              req.id_tipo_accesso
               ];
      client.connect(function(err) {
        if(err) {
          return console.error('could not connect to postgres', err);
        }
        client.query(text, value, function(err, res) {

          if(err) {
            return console.error('error running query', err);
          } else {
            console.log('ddd'+ res.rows[0])
          }

          client.end();
        });


      });



  res.send({dati:req.body.id});
*/
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
    let searchResult = 'SELECT * FROM clienti JOIN usernames ON clienti.id = usernames.id JOIN tipo_accesso ON usernames.id_username = tipo_accesso.id_username JOIN password ON tipo_accesso.id_tipo_accesso = password.id_tipo_accesso WHERE TRUE=TRUE';
    let searchResult1 = 'SELECT id,nome_cliente, username, password, note, tipo_accesso  FROM users where TRUE=TRUE';
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

