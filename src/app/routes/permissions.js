var q = require('q');
var hat = require('hat');
var fc = require('../../app');
var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var messages = require('../messages').get;

/**
 * @api {get} /permissions Get Permissions
 * @apiGroup Permissions
 */
router.get('/', fc.isAdmin, function (req, res) {

  query('permissions', req).then(function (results) {
    res.send(results);
  });

});

/**
 * @api {post} /permissions Create Permissions
 * @apiGroup Permissions
 */

/**
 * @api {get} /permissions/:id Get Permissions
 * @apiGroup Permissions
 */

/**
 * @api {put} /permissions/:id Delete Permissions
 * @apiGroup Permissions
 */

module.exports = router;
