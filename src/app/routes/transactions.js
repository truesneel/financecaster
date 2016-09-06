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
    'where': {
      '$or': {
        '$account.userId$': req.auth.userId,
        '$account.permissions.userId$': req.auth.userId
      }
    },
    'include': [{
      'model': fc.schemas.accounts,
      'attributes': ['id', 'name'],
      'include': [{
        'model': fc.schemas.permissions,
        'attributes': [],
        'required': false,
      }]
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
      '$or': {
        'userId': req.auth.userId,
        '$and': {
          '$permissions.userId$': req.auth.userId,
          '$permissions.transactions$': true
        }
      }
    },
    'include': [{
      'model': fc.schemas.permissions,
      'attributes': [],
      'required': false
    }]
  }).then(function (results) {
    if (results) {

      fc.create('transactions', req.body, res).then(function (records) {
        msg = messages('RECORD_CREATED');

        res.status(msg.http_code).send({'id': records.id, 'message': msg.message});
      }, function (err) {
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
      'where': {
        'id': req.params.id,
        '$or': {
          '$account.userId$': req.auth.userId,
          '$account.permissions.userId$': req.auth.userId
        }
      },
      'include': [{
          'model': fc.schemas.accounts,
          'attributes': ['id', 'name'],
          'include': [{
            'model': fc.schemas.permissions,
            'attributes': [],
            'required': false
          }]
        }],
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
      'where': {
        'id': req.params.id,
        '$or': {
          '$account.userId$': req.auth.userId,
          '$and': {
            '$account.permissions.userId$': req.auth.userId,
            '$account.permissions.transactions$': true
          }
        }
      },
      'include': [{
          'model': fc.schemas.accounts,
          'attributes': [],
          'include': [{
            'model': fc.schemas.permissions,
            'attributes': [],
            'required': false,
          }]
        }],
    }).then(function (result) {

      if (result) {
        result.update(req.body).then(function (result) {
          msg = messages('RECORD_UPDATED');
          res.status(msg.http_code).send({'message': msg.message});
        }, function (err) {
          var msg = messages('FIELD_VALIDATION_ERROR');
          res.status(msg.http_code).send({'error': msg.message, 'code': msg.code, 'fields': err.errors});
        });
      } else {
        msg = messages('RECORD_NOT_FOUND');
        res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
      }

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
        'id': req.params.id,
        '$or': {
          '$account.userId$': req.auth.userId,
          '$and': {
            '$account.permissions.userId$': req.auth.userId,
            '$account.permissions.transactions$': true
          }
        }
      },
      'include': [{
          'model': fc.schemas.accounts,
          'attributes': [],
          'include': [{
            'model': fc.schemas.permissions,
            'attributes': [],
            'required': false,
          }]
        }],
  }).then(function (record) {
    if (record) {
        record.destroy().then(function (record) {
          if (record) {
            msg = messages('RECORD_DELETED');
            res.status(msg.http_code).send({'message': msg.message});
            res.send(results);
          } else {
            msg = messages('RECORD_NOT_FOUND');
            res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
          }
        });
    } else {
      var msg = messages('RECORD_NOT_FOUND');
      res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
    }
  });

});

module.exports = router;
