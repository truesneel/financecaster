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
 * @apiSuccess {Array} array Array of Users
 * @apiSuccess {Integer} array.id
 * @apiSuccess {String} array.name Name of the User
 * @apiSuccess {String} array.username Username of the User
 * @apiSuccess {String} array.email
 * @apiSuccess {Boolean} array.admin
 * @apiSuccess {Boolean} array.changepw
 * @apiSuccess {Boolean} array.disabled
 * @apiSuccess {String} array.verification
 * @apiSuccess {DateTime} array.createdAt
 * @apiSuccess {DateTime} array.updatedAt
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  [
 *    {
 *      "id": 1,
 *      "name": "Admin",
 *      "username": "admin",
 *      "email": "admin@localhost",
 *      "admin": true,
 *      "changepw": false,
 *      "disabled": false,
 *      "verification": "",
 *      "createdAt": "2016-08-19T02:35:06.298Z",
 *      "updatedAt": "2016-08-19T02:35:06.298Z"
 *    }
 *  ]
 *
 */
router.get('/', fc.isAdmin, function (req, res) {

  fc.query('users', {
      'attributes': ['id', 'name', 'username', 'email', 'admin', 'changepw', 'disabled', 'verification', 'createdAt', 'updatedAt'],
    }).then(function (results) {
    if (results) {
      res.send(results);
    } else {
      res.status(404).send({'message': 'Record not found'});
    }
  });

});

/**
 * @api {post} /users Create User
 * @apiVersion 0.0.1
 * @apiGroup Users
 * @apiPermission admin
 *
 * @apiParam (Request Data) {String} name Name of the User
 * @apiParam (Request Data) {String} username Username of the User
 * @apiParam (Request Data) {String} email
 * @apiParam (Request Data) {String} password
 * @apiParam (Request Data) {Boolean} admin=false
 * @apiParam (Request Data) {Boolean} changepw=false
 * @apiParam (Request Data) {Boolean} disabled=false
 * @apiParam (Request Data) {String} verification="[none]"
 * @apiParamExample {json} Request Data Example
 * {
 *   "name" "User",
 *   "username" "user",
 *   "email" "user@localhost",
 *   "password" "super_password",
 * }
 * @apiSuccess {Integer} id
 * @apiSuccess {String} message
 * @apiSuccessExample Success Example
 * {
 *     "message": "Record Created Successfully"
 * }
 *
 * @apiError (Field Validation Error) {String} error Error Message
 * @apiError (Field Validation Error) {String} code Error Code
 * @apiError (Field Validation Error) {Array} fields
 * @apiError (Field Validation Error) {String} fields.message
 * @apiError (Field Validation Error) {String} fields.type
 * @apiError (Field Validation Error) {String} fields.path
 * @apiError (Field Validation Error) {String} fields.value
 * @apiErrorExample Field Validation Error Example
 *  {
 *    "error": "Field Validation Error",
 *    "code": "FC00010",
 *    "fields":
 *    [
 *      {
 *        "message": "email must be unique",
 *        "type": "unique violation",
 *        "path": "email",
 *        "value": "email@localhost"
 *      }
 *    ]
 *  }
 */
router.post('/', fc.isAdmin, function (req, res) {

  var msg;

  fc.create('users', req.body, res).then(function (records) {
    msg = messages('RECORD_CREATED');

    res.status(msg.http_code).send({'id': records.id, 'message': msg.message});
  }, function (err) {
    var msg = messages('FIELD_VALIDATION_ERROR');
    res.status(msg.http_code).send({'error': msg.message, 'code': msg.code, 'fields': err.errors});
  });

});

/**
 * @api {get} /users/:id Get User
 * @apiVersion 0.0.1
 * @apiGroup Users
 * @apiPermissions admin
 *
 * @apiSuccess {Integer} id
 * @apiSuccess {String} name Name of the User
 * @apiSuccess {String} username Username of the User
 * @apiSuccess {String} email
 * @apiSuccess {Boolean} admin
 * @apiSuccess {Boolean} changepw
 * @apiSuccess {Boolean} disabled
 * @apiSuccess {String} verification
 * @apiSuccess {DateTime} createdAt
 * @apiSuccess {DateTime} updatedAt
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "name": "Admin",
 *      "username": "admin",
 *      "email": "admin@localhost",
 *      "admin": true,
 *      "changepw": false,
 *      "disabled": false,
 *      "verification": "",
 *      "createdAt": "2016-08-19T02:35:06.298Z",
 *      "updatedAt": "2016-08-19T02:35:06.298Z"
 *    }
 *
 * @apiError {String} error Error Message
 * @apiError {String} code Error Code
 * @apiErrorExample
 *  HTTP/1.1 404 Not Found
 *  {
 *     "error": "Record Not Found",
 *     "code": "FC00007"
 *  }
 *
 */
router.get('/:id', fc.isAdmin, function (req, res) {


  fc.get('users', {
      'where': {'id': req.params.id},
      'attributes': ['id', 'name', 'username', 'email', 'admin', 'changepw', 'disabled', 'verification', 'createdAt', 'updatedAt'],
    }).then(function (results) {
    if (results) {
      res.send(results);
    } else {
      var msg = messages('RECORD_NOT_FOUND');
      res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
    }
  });

});

/**
 * @api {put} /users/:id Update User
 * @apiVersion 0.0.1
 * @apiGroup Users
 *
 * @apiError {String} error Error Message
 * @apiError {String} code Error Code
 * @apiError {Array} fields
 * @apiError {String} fields.message
 * @apiError {String} fields.type
 * @apiError {String} fields.path
 * @apiError {String} fields.value
 * @apiErrorExample Field Validation Error
 *  {
 *    "error": "Field Validation Error",
 *    "code": "FC00010",
 *    "fields":
 *    [
 *      {
 *        "message": "email must be unique",
 *        "type": "unique violation",
 *        "path": "email",
 *        "value": "email@localhost"
 *      }
 *    ]
 *  }
 *
 * @apiErrorExample Record Not Found
 *  {
 *     "error": "Record Not Found",
 *     "code": "FC00007"
 *  }
 */
router.put('/:id', fc.isAdmin, function (req, res) {

  fc.update('users', req.body, {'where': {'id': req.params.id}}).then(function (results) {
    var msg;

    if (results > 0) {
      msg = messages('RECORD_UPDATED');
      res.status(msg.http_code).send({'message': msg.message});
      res.send(results);
    } else {
      msg = messages('RECORD_NOT_FOUND');
      res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
    }
  }, function (err) {
    var msg = messages('FIELD_VALIDATION_ERROR');
    res.status(msg.http_code).send({'error': msg.message, 'code': msg.code, 'fields': err.errors});
  });

});

/**
 * @api {delete} /users/:id Delete User
 * @apiVersion 0.0.1
 * @apiGroup Users
 * @apiPermissions admin
 *
 * @apiSuccess {String} message
 * @apiSuccessExample
 * HTTP/1.1 200 OK
 *   {
 *     "message": "Record Deleted Successfully"
 *   }
 *
 * @apiError {String} error Error Message
 * @apiError {String} code Error Code
 * @apiErrorExample
 *  HTTP/1.1 404 Not Found
 *  {
 *     "error": "Record Not Found",
 *     "code": "FC00007"
 *  }
 */
router.delete('/:id', fc.isAdmin, function (req, res) {

  fc.remove('users', {'where': {'id': req.params.id}}).then(function (results) {
    var msg;

    if (results > 0) {
      msg = messages('RECORD_DELETED');
      res.status(msg.http_code).send({'message': msg.message});
      res.send(results);
    } else {
      msg = messages('RECORD_NOT_FOUND');
      res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
    }
  });

});

/**
 * @api {get} /users/:id/tokens List User Tokens
 * @apiVersion 0.0.1
 * @apiGroup Users
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
 * @apiSuccessExample
 * HTTP/1.1 200 OK
 * [
 *   {
 *     "id": 4,
 *     "client_token": "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
 *     "ip": "127.0.0.1",
 *     "agent": "Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0",
 *     "expires": "2016-08-21T02:10:33.132Z",
 *     "createdAt": "2016-08-20T02:10:33.134Z",
 *     "updatedAt": "2016-08-20T02:10:33.134Z",
 *     "userId": 1
 *   }
 * ]
 *
 * @apiError {String} error Error Message
 * @apiError {String} code Error Code
 * @apiErrorExample
 *  HTTP/1.1 404 Not Found
 *  {
 *     "error": "Record Not Found",
 *     "code": "FC00007"
 *  }
 */
router.get('/:id/tokens', fc.isAdmin, function (req, res) {


  fc.query('tokens', {
    'where': {'userId': req.params.id},
    'attributes': ['id', 'userId', 'client_token', 'ip', 'agent', 'expires','createdAt', 'updatedAt'],
  }).then(function (results) {
    if (results) {
      res.send(results);
    } else {
      var msg = messages('RECORD_NOT_FOUND');
      res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
    }
  });

});

/**
 * @api {get} /users/:id/tokens/:tokenid Get User Token
 * @apiVersion 0.0.1
 * @apiGroup Users
 *
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
 *   {
 *     "id": 4,
 *     "client_token": "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
 *     "ip": "127.0.0.1",
 *     "agent": "Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0",
 *     "expires": "2016-08-21T02:10:33.132Z",
 *     "createdAt": "2016-08-20T02:10:33.134Z",
 *     "updatedAt": "2016-08-20T02:10:33.134Z",
 *     "userId": 1
 *   }
 *
 * @apiError {String} error Error Message
 * @apiError {String} code Error Code
 * @apiErrorExample
 *  HTTP/1.1 404 Not Found
 *  {
 *     "error": "Record Not Found",
 *     "code": "FC00007"
 *  }
 */
router.get('/:id/tokens/:tokenid', fc.isAdmin, function (req, res) {

  fc.get('tokens', {
      'where': {'userId': req.params.id, 'id': req.params.tokenid},
      'attributes': ['id', 'userId', 'client_token', 'ip', 'agent', 'expires','createdAt', 'updatedAt'],
    }).then(function (results) {
    if (results) {
      res.send(results);
    } else {
      var msg = messages('RECORD_NOT_FOUND');
      res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
    }
  });

});

/**
 * @api {delete} /users/:id/tokens/:tokenid Delete User Token
 * @apiVersion 0.0.1
 * @apiGroup Users
 * @apiPermission admin
 *
 * @apiSuccess {String} message
 * @apiSuccessExample
 * HTTP/1.1 200 OK
 *   {
 *     "message": "Record Deleted Successfully",
 *   }
 *
 * @apiError {String} error Error Message
 * @apiError {String} code Error Code
 * @apiErrorExample
 *  HTTP/1.1 404 Not Found
 *  {
 *     "error": "Record Not Found",
 *     "code": "FC00007"
 *  }
 */
router.delete('/:id/tokens/:tokenid', fc.isAdmin, function (req, res) {

  fc.remove('tokens', {
      'where': {'userId': req.params.id, 'id': req.params.tokenid},
    }).then(function (results) {
    if (results > 0) {
      msg = messages('RECORD_DELETED');
      res.status(msg.http_code).send({'message': msg.message});
      res.send(results);
    } else {
      msg = messages('RECORD_NOT_FOUND');
      res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
    }
  });

});

module.exports = router;
