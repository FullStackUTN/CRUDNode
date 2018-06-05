var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
   if (req.session.user) {
    res.render('link3');
  } 
  else {
    res.render('index', { page_title: 'Login de usuarios',msj: 'Para acceder a este contenido tiene que estar logueado' });
    }
});

module.exports = router;
