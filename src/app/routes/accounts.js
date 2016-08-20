var q = require('q');
var hat = require('hat');
var fc = require('../../app');
var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var messages = require('../messages').get;

/**
 * @api {get} /accounts List Accounts
 * @apiGroup Accounts
 */
router.get('/accounts', fc.isAdmin, function (req, res) {

  var where = {
    'userId': req.auth.userId
  };

  if (req.auth.admin) {

  }
  query('accounts', req, {'where': where}).then(function (results) {
    res.send(results);
  });

});

/**
 * @api {post} /accounts Create Account
 * @apiGroup Accounts
 */

/**
 * @api {get} /accounts/:id Get Account
 * @apiGroup Accounts
 */

/**
 * @api {put} /accounts/:id Update Account
 * @apiGroup Accounts
 */

/**
 * @api {put} /accounts/:id Delete Account
 * @apiGroup Accounts
 */

/**
 * @api {get} /accounts/:id/transactions List Account Transactions
 * @apiGroup Accounts
 */

/**
 * @api {post} /accounts/:id/transactions Create Account Transaction
 * @apiGroup Accounts
 */

/**
 * @api {get} /accounts/:id/transactions/:transactionid Get Account Transaction
 * @apiGroup Accounts
 */

/**
 * @api {put} /accounts/:id/transactions/:transactionid Update Account Transaction
 * @apiGroup Accounts
 */

/**
 * @api {delete} /accounts/:id/transactions/:transactionid Delete Account Transaction
 * @apiGroup Accounts
 */

module.exports = router;
