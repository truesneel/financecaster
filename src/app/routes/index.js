var q = require('q');
var hat = require('hat');
var fc = require('../../app');
var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var messages = require('../messages').get;

router.get('/', function (req, res) {
  var msg = messages('API_WELCOME');
  res.status(msg.http_code).send({'message': msg.message});
});

router.use('/users', require('./users'));
router.use('/accounts', require('./accounts'));
router.use('/transactions', require('./transactions'));
router.use('/permissions', require('./permissions'));
router.use('/tokens', require('./tokens'));
router.use('/auth', require('./auth'));

module.exports = router;
