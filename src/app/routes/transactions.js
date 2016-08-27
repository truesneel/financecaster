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
router.get('/', fc.isAuth, function (req, res) {

  fc.query('transactions', {
    'include': [{
      'model': fc.schemas.accounts,
      'attributes': ['id', 'name'],
      'where': {'userId': req.auth.userId}
    }]
  }).then(function (results) {
    res.send(results);
  });

});

/**
 * @api {post} /tansactions Create Transactions
 * @apiGroup Transactions
 */
router.post('/', fc.isAuth, function (req, res) {


  fc.get('accounts', {
    'where': {
      'id': req.body.accountId,
      'userId': req.auth.userId,
    }
  }).then(function (results) {
    if (results) {

      console.log(req.body);
      fc.create('transactions', req.body, res).then(function (records) {
        msg = messages('RECORD_CREATED');

        res.status(msg.http_code).send({'id': records.id, 'message': msg.message});
      }, function (err) {
        console.log(err);
        var msg = messages('FIELD_VALIDATION_ERROR');
        res.status(msg.http_code).send({'error': msg.message, 'code': msg.code, 'fields': err.errors});
      });

    } else {
      msg = messages('RECORD_NOT_FOUND');
      res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
    }
  });

});

/**
 * @api {get} /tansactions/:id Get Transactions
 * @apiGroup Transactions
 */
router.get('/:id', fc.isAuth, function (req, res) {

  fc.get('transactions', {
      'include': [{
          'model': fc.schemas.accounts,
          'attributes': [],
          'where': {
            'userId': req.auth.userId,
          },
        }],
      'where': {
        'id': req.params.id,
      },
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
 * @api {put} /tansactions/:id Delete Transactions
 * @apiGroup Transactions
 */
router.put('/:id', fc.isAuth, function (req, res) {
  var msg;

  delete req.body.accountId;
  delete req.body.createdAt;
  delete req.body.updatedAt;

  fc.get('transactions', {
      'include': [{
          'model': fc.schemas.accounts,
          'attributes': [],
          'where': {
            'userId': req.auth.userId,
          },
        }],
      'where': {
        'id': req.params.id,
      },
    }).then(function (result) {

    result.update(req.body).then(function (result) {
      msg = messages('RECORD_UPDATED');
      res.status(msg.http_code).send({'message': msg.message});
    }, function (err) {
      var msg = messages('FIELD_VALIDATION_ERROR');
      res.status(msg.http_code).send({'error': msg.message, 'code': msg.code, 'fields': err.errors});
    });

  }, function () {
    msg = messages('RECORD_NOT_FOUND');
    res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
  });

});

/**
 * @api {delete} /transactions/:id Delete Transaction
 * @apiVersion 0.0.1
 * @apiGroup Transactions
 * @apiPermissions user
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
router.delete('/:id', fc.isAuth, function (req, res) {


  fc.get('transactions', {
    'where': {
      'id': req.params.id
    },
    'include': [{
      'model': fc.schemas.accounts,
      'where': {
        'userId': req.auth.userId,
      }
    }]
  }).then(function (results) {
    if (results) {

      fc.remove('transactions', {'where': {'id': req.params.id}}).then(function (results) {
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

    } else {
      msg = messages('RECORD_NOT_FOUND');
      res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
    }
  });

});

module.exports = router;
