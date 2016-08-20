var q = require('q');
var hat = require('hat');
var fc = require('../../app');
var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var messages = require('../messages').get;

/**
 * @api {get} /tokens List All Tokens
 * @apiVersion 0.0.1
 * @apiGroup Tokens
 * @apiPermission admin
 *
 * @apiSuccess {Array} array Array of Tokens
 * @apiSuccess {Integer} array.id
 * @apiSuccess {Integer} array.userId
 * @apiSuccess {String} array.client_token
 * @apiSuccess {String} array.ip
 * @apiSuccess {String} array.agent
 * @apiSuccess {DateTime} array.expires
 * @apiSuccess {DateTime} array.createdAt
 * @apiSuccess {DateTime} array.updatedAt
 * @apiSuccess {Object} array.user
 * @apiSuccess {Integer} array.user.id
 * @apiSuccess {String} array.user.name
 * @apiSuccess {String} array.user.username
 * @apiSuccess {String} array.user.email
 * @apiSuccess {Boolean} array.user.admin
 * @apiSuccess {DateTime} array.user.createdAt
 * @apiSuccess {DateTime} array.user.updatedAt
 * @apiSuccessExample
 * HTTP/1.1 200 OK
 * [
 *   {
 *     "id": 4,
 *     "client_token": "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
 *     "auth_token": "936b05f45b6e9d34d1c249297dba0793",
 *     "ip": "127.0.0.1",
 *     "agent": "Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0",
 *     "expires": "2016-08-21T02:10:33.132Z",
 *     "createdAt": "2016-08-20T02:10:33.134Z",
 *     "updatedAt": "2016-08-20T02:10:33.134Z",
 *     "userId": 1,
 *     "user":
 *     {
 *       "id": 1,
 *       "name": "Admin",
 *       "username": "admin",
 *       "password": "RqrvnsJN9qy7RZg9roxra5gsJ/AmE0wlJqvkZOkHF5WslGYv7m1o6+Omv9+78OfVI7z70jw4lb5f29kXtA2MpA==",
 *       "email": "admin@localhost",
 *       "admin": true,
 *       "createdAt": "2016-08-19T02:35:06.298Z",
 *       "updatedAt": "2016-08-19T02:35:06.298Z"
 *     }
 *   }
 * ]
 */
router.get('/', fc.isAdmin, function (req, res) {

  fc.query('tokens', {
    'include': [{
      'model': fc.schemas.users,
      'attributes': ['id', 'name', 'username', 'email', 'admin', 'changepw', 'disabled', 'verification', 'createdAt', 'updatedAt'],
    }],
    'attributes': ['id', 'userId', 'client_token', 'ip', 'agent', 'expires','createdAt', 'updatedAt']
  }, req, res).then(function (results) {
    res.send(results);
  });

});

/**
 * @api {post} /tokens Create Tokens
 * @apiGroup Tokens
 * @apiPermission admin
 *
 */

/**
 * @api {get} /tokens/:id Get Token
 * @apiGroup Tokens
 * @apiPermission admin
 *
 * @apiSuccess {Integer} id
 * @apiSuccess {Integer} userId
 * @apiSuccess {String} client_token
 * @apiSuccess {String} ip
 * @apiSuccess {String} agent
 * @apiSuccess {DateTime} expires
 * @apiSuccess {DateTime} createdAt
 * @apiSuccess {DateTime} updatedAt
 * @apiSuccess {Object} user
 * @apiSuccess {Integer} user.id
 * @apiSuccess {String} user.name
 * @apiSuccess {String} user.username
 * @apiSuccess {String} user.email
 * @apiSuccess {Boolean} user.admin
 * @apiSuccess {DateTime} user.createdAt
 * @apiSuccess {DateTime} user.updatedAt
 * @apiSuccessExample
 * HTTP/1.1 200 OK
 *   {
 *     "id": 4,
 *     "client_token": "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
 *     "auth_token": "936b05f45b6e9d34d1c249297dba0793",
 *     "ip": "127.0.0.1",
 *     "agent": "Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0",
 *     "expires": "2016-08-21T02:10:33.132Z",
 *     "createdAt": "2016-08-20T02:10:33.134Z",
 *     "updatedAt": "2016-08-20T02:10:33.134Z",
 *     "userId": 1,
 *     "user":
 *     {
 *       "id": 1,
 *       "name": "Admin",
 *       "username": "admin",
 *       "password": "RqrvnsJN9qy7RZg9roxra5gsJ/AmE0wlJqvkZOkHF5WslGYv7m1o6+Omv9+78OfVI7z70jw4lb5f29kXtA2MpA==",
 *       "email": "admin@localhost",
 *       "admin": true,
 *       "createdAt": "2016-08-19T02:35:06.298Z",
 *       "updatedAt": "2016-08-19T02:35:06.298Z"
 *     }
 *   }
 *
 * @apiError (Token Not Found) {String} error Error Message
 * @apiError (Token Not Found) {String} code Error Code
 * @apiErrorExample
 *  HTTP/1.1 404 Not Found
 *  {
 *     "error": "Record Not Found",
 *     "code": "FC00007"
 *  }
 */
router.get('/:id', fc.isAdmin, function (req, res) {

  fc.get('tokens', {
    'include': [{
      'model': fc.schemas.users,
      'attributes': ['id', 'name', 'username', 'email', 'admin', 'changepw', 'disabled', 'verification', 'createdAt', 'updatedAt'],
    }],
    'attributes': ['id', 'userId', 'client_token', 'ip', 'agent', 'expires','createdAt', 'updatedAt'],
    'where': {'id': req.params.id}
  }, req, res).then(function (results) {
    if (results) {
      res.send(results);
    } else {
      var msg = messages('RECORD_NOT_FOUND');
      res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
    }
  });

});

/**
 * @api {put} /tokens/:id Update Token
 * @apiGroup Tokens
 * @apiPermission admin
 *
 */

/**
 * @api {delete} /tokens/:id Delete Token
 * @apiGroup Tokens
 * @apiPermission admin
 *
 * @apiSuccess {String} message
 * @apiSuccessExample
 * HTTP/1.1 200 OK
 * {
 *   "message": "Token Deleted",
 * }
 */

router.delete('/:id', fc.isAdmin, function (req, res) {

  fc.remove('tokens', {'where': {'id': req.params.id}}).then(function (results) {
    var msg;

    if (results > 0) {
      msg = messages('TOKEN_DELETED');
      res.status(msg.http_code).send({'message': msg.message});
      res.send(results);
    } else {
      msg = messages('RECORD_NOT_FOUND');
      res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
    }
  });
});

module.exports = router;
