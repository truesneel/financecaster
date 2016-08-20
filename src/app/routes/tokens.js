var q = require('q');
var hat = require('hat');
var fc = require('../../app');
var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var messages = require('../messages').get;

/**
 * @api {get} /tokens List all Tokens
 * @apiVersion 0.0.1
 * @apiGroup Tokens
 * @apiPermissions admin
 * @apiDescription List all Tokens
 */
router.get('/', fc.isAdmin, function (req, res) {

  query('tokens', req, res, {'include': [fc.schemas.users]}).then(function (results) {
    res.send(results);
  });

});

/**
 * @api {post} /tokens Create Tokens
 * @apiGroup Tokens
 */

/**
 * @api {get} /tokens/:id Get Tokens
 * @apiGroup Tokens
 */

/**
 * @api {put} /tokens/:id Delete Tokens
 * @apiGroup Tokens
 */

module.exports = router;
