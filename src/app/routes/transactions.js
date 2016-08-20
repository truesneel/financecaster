var q = require('q');
var hat = require('hat');
var fc = require('../../app');
var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var messages = require('../messages').get;

/**
 * @api {get} /transactions Get Accounts
 * @apiGroup Transactions
 */
router.get('/', fc.isAdmin, function (req, res) {

  query('tansactions', req).then(function (results) {
    res.send(results);
  });

});

/**
 * @api {post} /tansactions Create Transactions
 * @apiGroup Transactions
 */

/**
 * @api {get} /tansactions/:id Get Transactions
 * @apiGroup Transactions
 */

/**
 * @api {put} /tansactions/:id Delete Transactions
 * @apiGroup Transactions
 */

module.exports = router;
