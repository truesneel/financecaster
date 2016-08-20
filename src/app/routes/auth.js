var q = require('q');
var hat = require('hat');
var fc = require('../../app');
var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var messages = require('../messages').get;

/**
 * @api {get} /auth Get Auth Status
 * @apiGroup Authentication
 *
 * @apiSuccess {Integer} token_id Internal ID of the Token
 * @apiSuccess {DateTime} expires Date and Time that the token will expire
 * @apiSuccess {Integer} userId ID of the associated user
 * @apiSuccess {String} client_token Token value for the Client
 * @apiSuccess {String} name Name of the associated user
 * @apiSuccess {Boolean} admin Flag for whether or not the user is an admin
 * @apiSuccessExample
 *   HTTP/1.1 200 OK
 *   {
 *     "token_id": 3,
 *     "expires": "2016-08-21T01:53:05.525Z",
 *     "userId": 1,
 *     "client_token": "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
 *     "name": "admin@localhost",
 *     "admin": true
 *    }
 *
 * @apiError (Access Denied) {String} error Error Message
 * @apiError (Access Denied) {String} code Error Code
 * @apiErrorExample
 *  HTTP/1.1 403 Forbidden
 *  {
 *     "error": "Access Denied",
 *     "code": "FC00006"
 *  }
 */
router.get('/', fc.isAuth, function (req, res) {

  res.send(req.auth);

});

/**
 * @api {post} /auth Log In
 * @apiGroup Authentication
 *
 * @apiParam (Post Data) {String} username Username to attempt a log in with
 * @apiParam (Post Data) {String} password Password to attempt a log in with
 * @apiParamExample Post Data
 * {
 *   "username": "admin",
 *   "password": "password"
 * }
 *
 * @apiSuccess {String} message Message stating if the log in attempt was successful
 * @apiSuccess {String} client_token Client token to be used to access the API
 * @apiSuccess {String} auth_token Auth token to be used to access the API
 * @apiSuccess {DateTime} expires Date and time the token will expire
 * @apiSuccessExample
 *   HTTP/1.1 200 OK
 *   {
 *     "message": "success",
 *     "client_token": "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
 *     "auth_token": "936b05f45b6e9d34d1c249297dba0793",
 *     "expires": "2016-08-21T02:10:33.132Z"
 *   }
 *
 * @apiError (Login Failed) {String} error Error Message
 * @apiError (Login Failed) {String} code Error Code
 * @apiErrorExample Login Failed
 *  HTTP/1.1 400 Bad Request
 *  {
 *     "error": "Login Failed",
 *     "code": "FC00008"
 *  }
 *
 */
router.post('/', function (req, res) {

  fc.schemas.users.find({'where': {
    'username': req.body.username,
    'password': crypto.createHmac('sha512', fc.config.salt).update(req.body.password).digest('base64')
  }}).then(function (record) {
    if (record) {

      var token_expiration = new Date();
      token_expiration.setDate(token_expiration.getDate() + 1);

      fc.schemas.tokens.create({
        'client_token': crypto.createHash('sha256').update(req.body.username).digest('base64'),
        'auth_token': hat(),
        'ip': req.connection.remoteAddress,
        'agent': req.headers['user-agent'],
        'expires': token_expiration,
        'userId': record.id
      }).then(function (token) {
        res.status(200).send({'message': 'success', 'client_token': token.client_token, 'auth_token': token.auth_token, 'expires': token_expiration});
      }, function (err) {
        res.status(400).send({'message': 'Authentication succeeded but an authentication token could not be obtained'});
      });

    } else {
      var msg = messages('LOGIN_FAILED');
      res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
    }
  });

});

/**
 * @api {delete} /auth Log Out
 * @apiGroup Authentication
 *
 * @apiSuccessExample
 *   HTTP/1.1 200 OK
 *   {
 *     "message": "success",
 *   }
 * @apiSuccess (Response Data) {String} message Message stating if the log out attempt was successful
 */
router.delete('/', fc.isAuth, function (req, res) {

  fc.remove('tokens', {'where': {'id': req.auth.token_id}}).then(function (response) {
    res.send({'message': 'success'});
  });

});

/**
 * @api {get} /auth/tokens List Current Tokens
 * @apiGroup Authentication
 * @apiSuccess {Array[]} array
 * @apiSuccess {Integer} array.id
 * @apiSuccess {Integer} array.userId
 * @apiSuccess {String} array.client_token
 * @apiSuccess {String} array.ip
 * @apiSuccess {String} array.agent
 * @apiSuccess {DateTime} array.expires
 * @apiSuccess {DateTime} array.createdAt
 * @apiSuccess {DateTime} array.updatedAt
 * @apiSuccessExample
 * HTTP/1.1 200 OK
 * [
 *    {
 *        "id": 1,
 *        "client_token": "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
 *        "auth_token": "96f58ac1c6f326ac0dc98e792f0b8301",
 *        "ip": "127.0.0.1",
 *        "agent": "Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0",
 *        "expires": "2016-08-20T02:36:29.052Z",
 *        "createdAt": "2016-08-19T02:36:29.059Z",
 *        "updatedAt": "2016-08-19T02:36:29.059Z",
 *        "userId": 1
 *    },
 *    {
 *        "id": 2,
 *        "client_token": "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
 *        "auth_token": "9b28729f8175068488e9a16143dcdac3",
 *        "ip": "127.0.0.1",
 *        "agent": "Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0",
 *        "expires": "2016-08-20T02:46:41.311Z",
 *        "createdAt": "2016-08-19T02:46:41.313Z",
 *        "updatedAt": "2016-08-19T02:46:41.313Z",
 *        "userId": 1
 *    }
 *  ]
 */
router.get('/tokens', fc.isAuth, function (req, res) {

  fc.query('tokens', req, {'where': {'userId': req.auth.userId}, 'attributes': ['id', 'userId', 'client_token', 'ip', 'agent', 'expires', 'createdAt', 'updatedAt']}).then(function (results) {
    if (results) {
      res.send(results);
    } else {
      var msg = messages('RECORD_NOT_FOUND');
      res.status(msg.http_code).send({'message': msg.message});
    }
  });

});

/**
 * @api {get} /auth/tokens/:id Get Token
 * @apiGroup Authentication
 * @apiSuccess {Integer} id
 * @apiSuccess {Integer} userId
 * @apiSuccess {String} client_token
 * @apiSuccess {String} ip
 * @apiSuccess {String} agent
 * @apiSuccess {DateTime} expires
 * @apiSuccess {DateTime} createdAt
 * @apiSuccess {DateTime} updatedAt
 * @apiSuccessExample
 * HTTP/1.1 200 OK
 * {
 *   "id": 1,
 *   "client_token": "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
 *   "auth_token": "96f58ac1c6f326ac0dc98e792f0b8301",
 *   "ip": "127.0.0.1",
 *   "agent": "Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0",
 *   "expires": "2016-08-20T02:36:29.052Z",
 *   "createdAt": "2016-08-19T02:36:29.059Z",
 *   "updatedAt": "2016-08-19T02:36:29.059Z",
 *   "userId": 1
 * }
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
router.get('/tokens/:id', fc.isAuth, function (req, res) {

  fc.get('tokens', req, {'where': {'userId': req.auth.userId, 'id': req.params.id}, 'attributes': ['id', 'userId', 'client_token', 'ip', 'agent', 'expires', 'createdAt', 'updatedAt']}).then(function (results) {
    if (results) {
      res.send(results);
    } else {
      var msg = messages('RECORD_NOT_FOUND');
      res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
    }
  });

});

/**
 * @api {delete} /auth/tokens/:id Delete Token
 * @apiGroup Authentication
 * @apiSuccess {String} message
 * @apiSuccessExample
 * HTTP/1.1 200 OK
 * {
 *   "message": "Token Deleted",
 * }
 */
router.delete('/tokens/:id', fc.isAuth, function (req, res) {

  fc.remove('tokens', req, {'where': {'userId': req.auth.userId, 'id': req.params.id}}).then(function (results) {
    var msg;

    if (results) {
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
