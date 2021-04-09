var express = require('express');
var router = express.Router();
const multer = require('multer');
const csv = require('../controllers/csvController');
const upload = require('../middlewares/uploadCSVFile')
var Mailer = require('../middlewares/mailer');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('form');
});

/* POST user data. */
router.post('/',upload.single("csvfile"), csv.upload);

/* GET index page. */
router.get('/error', function(req, res, next) {
  res.render('error',{status:500,stack:"Could not upload File"});
});

/* GET error page. */
router.get('/success', function(req, res, next) {
  res.render('index',{title:'Sikarwar softwares'});
});

module.exports = router;
