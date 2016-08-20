var q = require('q');
var hat = require('hat');
var fc = require('../../app');
var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var messages = require('../messages').get;

/**
* @api {get} /users List Users
* @apiVersion 0.0.1
* @apiGroup Users
* @apiPermission admin
*
* @apiDescription List all users
*
* @apiSuccess {String} name Name of the User.
* @apiSuccess {String} username Username of the User
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*     "name": "Admin",
*     "username": "admin"
*   }
*/

router.get('/', fc.isAdmin, function (req, res) {

  query('users', req, res, {'include': [fc.schemas.tokens]}).then(function (results) {
    if (results) {
      res.send(results);
    } else {
      res.status(404).send({'message': 'Record not found'});
    }
  });

});

/**
 * @api {get} /users/:id Get User
 * @apiVersion 0.0.1
 * @apiGroup Users
 * @apiPermissions admin
 *
 * @apiDescription Get details for a specific user by id
 * @apiSuccess {Integer} id Internal ID of the User
 * @apiSuccess {String} username Username of the user
 * @apiSuccess {String} username
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "id": 1,
 *     "username": "admin
 *   }
 */

router.get('/:id', fc.isAdmin, function (req, res) {


  get('users', req, {'where': {'id': req.params.id}}).then(function (results) {
    if (results) {
      res.send(results);
    } else {
      res.status(404).send({'message': 'Record not found'});
    }
  });

});

/**
 * @api {get} /users/:id/tokens Get User Tokens
 * @apiVersion 0.0.1
 * @apiGroup Users
 * @apiPermissions admin
 * @apiDescription Get all active tokens for a specific user.
 *
 * @apiSuccess {Integer} id Internal ID of the User
 */
router.get('/:id/tokens', fc.isAdmin, function (req, res) {


  query('tokens', req, res, {'where': {'userId': req.params.id}}).then(function (results) {
    if (results) {
      res.send(results);
    } else {
      res.status(404).send({'message': 'Record not found'});
    }
  });

});

/**
 * @api {get} /users/:id/tokens List Tokens for a User
 * @apiVersion 0.0.1
 * @apiGroup Users
 * @apiPermissions admin
 * @apiDescription List all tokens for a specific user
 */
router.get('/:id/tokens/:tokenid', fc.isAdmin, function (req, res) {


  get('tokens', req, {'where': {'userId': req.params.id, 'id': req.params.tokenid}}).then(function (results) {
    if (results) {
      res.send(results);
    } else {
      res.status(404).send({'message': 'Record not found'});
    }
  }, function () {
  });

});
/**
 * @api {get} /users/:id/tokens/:tokenid Get Token details
 * @apiVersion 0.0.1
 * @apiGroup Users
 */

/**
 * @api {delete} /users/:id/tokens/:tokenid Delete Token
 * @apiVersion 0.0.1
 * @apiGroup Users
 */

/**
 * @api {post} /users Create User
 * @apiVersion 0.0.1
 * @apiGroup Users
 * @apiPermissions admin
 * @apiDescription Create new User
 */
router.post('/', fc.isAdmin, function (req, res) {

  if (req.body.password) {
    req.body.password = crypto.createHmac('sha512', fc.config.salt).update(req.body.password).digest('base64');
  }

  create('users', req.body, res).then(function (records) {
    res.status(200).send(records);
  }, function (err) {
    res.status(400).send(err);
  });

});

/**
 * @api {delete} /users/:id Delete User
 * @apiVersion 0.0.1
 * @apiGroup Users
 */

/**
 * @api {put} /users/:id Update User
 * @apiVersion 0.0.1
 * @apiGroup Users
 */


module.exports = router;
