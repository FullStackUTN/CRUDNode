var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST home page. */
router.post('/', function(req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));
    //almacenamos en una variable auxiliar el contenido de los campos de post del formulario
    var user = req.body.usuario;
    var pass = req.body.clave;

    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM usuario WHERE usuario = ? AND clave = ?',[user,pass],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            if (rows.length == 0){
              res.render('index', { title: 'Express' });
            }else {
              //creamos las variables de session con los datos del formulario
              req.session.user=req.body.usuario;
              req.session.pass=req.body.clave;
              res.redirect('/inicio');
            } 
            
         });
    });
});

module.exports = router;
