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
 * @apiPermission user
 *
 * @apiSuccess {Array} array
 * @apiSuccess {Integer} array.id
 * @apiSuccess {Integer} array.userId
 * @apiSuccess {String} array.name
 * @apiSuccess {Integer} array.forecast
 * @apiSuccess {Float} array.balance
 * @apiSuccess {DateTime} array.balance_date
 * @apiSuccess {Float} array.limit
 * @apiSuccess {DateTime} array.createdAt
 * @apiSuccess {DateTime} array.updatedAt
 * @apiSuccessExample Account List
 * [
 *   {
 *     "id": 1,
 *     "userId": 2,
 *     "name": "checking",
 *     "forecast": 365,
 *     "balance": 0,
 *     "balance_date" "2016-08-20T18:20:36.373Z",
 *     "limit": 0,
 *     "createdAt": "2016-08-20T18:20:36.373Z",
 *     "updatedAt": "2016-08-20T18:20:36.373Z"
 *   }
 * ]
 */
router.get('/', fc.isAuth, function (req, res) {

  fc.query('accounts', {
    'where': {'userId': req.auth.userId},
    'attributes': ['id', 'userId', 'name', 'forecast', 'balance', 'balance_date', 'limit', 'createdAt', 'updatedAt']
  }).then(function (results) {
    res.send(results);
  });

});

/**
 * @api {post} /accounts Create Account
 * @apiGroup Accounts
 * @apiPermission user
 *
 * @apiParam (Request Data) {String} name
 * @apiParam (Request Data) {Integer} forecast=365
 * @apiParam (Request Data) {Float} balance=0
 * @apiParam (Request Data) {DateTime} balance_date
 * @apiParam (Request Data) {Float} limit=0
 * @apiParamExample {json} Request Data Example
 * {
 *   "name" "Checking",
 *   "forecast" "60",
 *   "balance" "100.28",
 *   "balance_date" "2016-08-20T18:20:36.373Z",
 *   "limit" "0",
 * }
 *
 * @apiSuccess {Integer} id
 * @apiSuccess {String} message
 * @apiSuccessExample Success Example
 * {
 *     "id"
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
router.post('/', fc.isAuth, function (req, res) {

  req.body.owner = req.auth.userId;
  req.body.userId = req.auth.userId;

  fc.create('accounts', req.body, res).then(function (records) {
    msg = messages('RECORD_CREATED');

    res.status(msg.http_code).send({'id': records.id, 'message': msg.message});
  }, function (err) {
    var msg = messages('FIELD_VALIDATION_ERROR');
    res.status(msg.http_code).send({'error': msg.message, 'code': msg.code, 'fields': err.errors});
  });

});

/**
 * @api {get} /accounts/:id Get Account
 * @apiGroup Accounts
 * @apiPermission user
 *
 * @apiSuccess {Integer} id
 * @apiSuccess {Integer} userId
 * @apiSuccess {String} name
 * @apiSuccess {Integer} forecast
 * @apiSuccess {Float} balance
 * @apiSuccess {DateTime} balance_date
 * @apiSuccess {Float} limit
 * @apiSuccess {DateTime} createdAt
 * @apiSuccess {DateTime} updatedAt
 * @apiSuccessExample Success-Response:
 *   {
 *     "id": 1,
 *     "userId": 2,
 *     "name": "checking",
 *     "forecast": 365,
 *     "balance": 0,
 *     "balance_date" "2016-08-20T18:20:36.373Z",
 *     "limit": 0,
 *     "createdAt": "2016-08-20T18:20:36.373Z",
 *     "updatedAt": "2016-08-20T18:20:36.373Z"
 *   }
 *
 * @apiError {String} error Error Message
 * @apiError {String} code Error Code
 * @apiErrorExample
 *  HTTP/1.1 404 Not Found
 *  {
 *     "error": "Record Not Found",
 *     "code": "FC00007"
 *  }s
 */
router.get('/:id', fc.isAuth, function (req, res) {


  fc.get('accounts', {
      'where': {'id': req.params.id, 'userId': req.auth.userId},
      'attributes': ['id', 'userId', 'name', 'forecast', 'balance', 'balance_date', 'limit', 'createdAt', 'updatedAt'],
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
 * @api {put} /accounts/:id Update Account
 * @apiGroup Accounts
 * @apiPermission user
 *
 * @apiParam (Request Data) {String} name
 * @apiParam (Request Data) {Integer} forecast=365
 * @apiParam (Request Data) {Float} balance=0
 * @apiParam (Request Data) {DateTime} balance_date
 * @apiParam (Request Data) {Float} limit=0
 * @apiParamExample {json} Request Data Example
 * {
 *   "name" "Checking",
 *   "forecast" "60",
 *   "balance" "100.28",
 *   "balance_date" "2016-08-20T18:20:36.373Z",
 *   "limit" "0",
 * }
 *
 * @apiSuccess {Integer} id
 * @apiSuccess {String} message
 * @apiSuccessExample Success Example
 * {
 *     "id"
 *     "message": "Record Updated Successfully"
 * }
 *
 * @apiError {String} error Error Message
 * @apiError {String} code Error Code
 * @apiError {Array} fields
 * @apiError String} fields.message
 * @apiError {String} fields.type
 * @apiError {String} fields.path
 * @apiError {String} fields.value
 * @apiErrorExample Field Validation Error Example
 * HTTP/1.1 400 Bad Request
 *  {
 *    "error": "Field Validation Error",
 *    "code": "FC00010",
 *    "fields":
 *    [
 *      {
 *        "message": "name must be unique",
 *        "type": "unique violation",
 *        "path": "name",
 *        "value": "Checking"
 *      }
 *    ]
 *  }
 *
 * @apiError {String} error Error Message
 * @apiError {String} code Error Code
 * @apiErrorExample Record Not Found Example
 * HTTP/1.1 404 Not Found
 *  {
 *     "error": "Record Not Found",
 *     "code": "FC00007"
 *  }
 */
router.put('/:id', fc.isAuth, function (req, res) {

  delete req.body.createdAt;
  delete req.body.updatedAt;

  fc.update('accounts', req.body, {'where': {'id': req.params.id, 'userId': req.auth.userId}}).then(function (results) {
    var msg;

    console.log(results);
    if (results > 0) {
      msg = messages('RECORD_UPDATED');
      res.status(msg.http_code).send({'message': msg.message});
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
 * @api {delete} /accounts/:id Delete Account
 * @apiGroup Accounts
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

  fc.remove('accounts', {'where': {'id': req.params.id, 'userId': req.auth.userId}}).then(function (results) {
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
 * @api {get} /accounts/:id/transactions List Account Transactions
 * @apiGroup Accounts
 * @apiPermission user
 *
 * @apiSuccess {Array} array
 * @apiSuccess {Integer} array.id
 * @apiSuccess {Integer} array.accountId
 * @apiSuccess {String} array.name
 * @apiSuccess {Float} array.amount
 * @apiSuccess {Integer} array.every_num
 * @apiSuccess {String} array.every_type
 * @apiSuccess {Integer} array.num_tansactions
 * @apiSuccess {DateTime} array.start
 * @apiSuccess {DateTime} array.createdAt
 * @apiSuccess {DateTime} array.updatedAt
 * @apiSuccessExample Account List
 * [
 *   {
 *     "id": 1,
 *     "accountId": 2,
 *     "name": "Pay Check",
 *     "amount": 2838.28,
 *     "every_num": 2,
 *     "every_type": "weeks",
 *     "num_tansactions": 0,
 *     "start": "2016-08-20T18:20:36.373Z",
 *     "createdAt": "2016-08-20T18:20:36.373Z",
 *     "updatedAt": "2016-08-20T18:20:36.373Z"
 *   }
 * ]
 */
router.get('/:id/transactions', fc.isAuth, function (req, res) {

  fc.query('transactions', {
    'include': [{
      'model': fc.schemas.accounts,
      'attributes': [],
      'where': {
        'userId': req.auth.userId,
      }
    }],
    'where': {'accountId': req.params.id},
  }).then(function (results) {

    res.send(results);
  });

});

/**
 * @api {post} /accounts/:id/transactions Create Account Transaction
 * @apiGroup Accounts
 */
router.post('/:id/transactions', fc.isAuth, fc.AuthObject('accounts'), function (req, res) {

  req.body.accountId = req.params.id;

  fc.create('transactions', req.body, res).then(function (records) {
    msg = messages('RECORD_CREATED');

    res.status(msg.http_code).send({'id': records.id, 'message': msg.message});
  }, function (err) {
    var msg = messages('FIELD_VALIDATION_ERROR');
    res.status(msg.http_code).send({'error': msg.message, 'code': msg.code, 'fields': err.errors});
  });

});

/**
 * @api {get} /accounts/:id/transactions/:transactionid Get Account Transaction
 * @apiGroup Accounts
 */
router.get('/:id/transactions/:transactionid', fc.isAuth, function (req, res) {

  fc.get('transactions', {
    'include': [{
      'model': fc.schemas.accounts,
      'attributes': [],
      'where': {
        'userId': req.auth.userId,
      }
    }],
    'where': {'id': req.params.transactionid},
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
 * @api {put} /accounts/:id/transactions/:transactionid Update Account Transaction
 * @apiGroup Accounts
 */
router.put('/:id/transactions/:transactionid', fc.isAuth, fc.AuthObject('accounts'), function (req, res) {

  delete req.body.createdAt;
  delete req.body.updatedAt;

  fc.update('transactions', req.body, {'where': {'id': req.params.transactionid}}).then(function (results) {
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
 * @api {delete} /accounts/:id/transactions/:transactionid Delete Account Transaction
 * @apiGroup Accounts
 */
router.delete('/:id/transactions/:transactionid', fc.AuthObject('accounts'), fc.isAuth, function (req, res) {

  fc.remove('transactions', {'where': {'id': req.params.transactionid}}).then(function (results) {
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
 * @api {get} /accounts/:id/forecast View Forecast
 * @apiGroup Accounts
 *
 * @apiParam {Integer} id Account ID
 * @apiParamExample
 * GET /accounts/2837/forecast HTTP/1.1
 *
 * @apiSuccess {DateTime} date
 * @apiSuccess {Float} transactions_total
 * @apiSuccess {Float} balance
 * @apiSuccess {Array} transactions
 * @apiSuccess {id} transactions.id
 * @apiSuccess {id} transactions.name
 * @apiSuccess {id} transactions.num_transactions_total
 * @apiSuccess {id} transactions.num_transactions_current
 * @apiSuccess {id} transactions.amount
 */

router.get('/:id/forecast', fc.AuthObject('accounts'), fc.isAuth, function (req, res) {
  res.send([
    {
      'date': new Date(),
      'trasnactions_total': 283.28,
      'balance': 2823.92,
      'transactions': [
        {
          'id': 1,
          'name': 'Paycheck',
          'num_transactions_total': 60,
          'num_transactions_current': 23,
          'amount': 3282.82
        },
        {
          'id': 2,
          'name': 'CreditCard',
          'num_transactions_total': 0,
          'num_transactions_current': 0,
          'amount': -293.28
        }
      ]
    }
  ]);
});

module.exports = router;
