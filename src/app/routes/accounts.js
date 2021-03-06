var q = require('q');
var hat = require('hat');
var fc = require('../../app');
var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

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
    'where': {
      [Op.or]: [
        {'userId': req.auth.userId},
        {'$permissions.userId$': req.auth.userId}
      ],
    },
    'attributes': ['id', 'name', 'forecast', 'balance', 'balance_date', 'limit', 'createdAt', 'updatedAt'],
    'include': [
      {
        'model': fc.schemas.permissions,
        'attributes': ['id', 'balance', 'transactions', 'shares', 'updatedAt', 'createdAt'],
        'where': {'userId': req.auth.userId},
        'required': false
      }
    ]
  }).then(function (results) {
    res.send(results);
  }, function (err) {
    fc.log.error(err);
    res.status(500).send({'message': 'Unknown error occured'});
  });

});

/**
 * @api {post} /accounts Create Account
 * @apiGroup Accounts
 * @apiPermission user
 *
 * @apiParam  {String} name
 * @apiParam {Integer} forecast=365
 * @apiParam {Float} balance=0
 * @apiParam {DateTime} balance_date
 * @apiParam {Float} limit=0
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
 * @apiError  {String} error Error Message
 * @apiError {String} code Error Code
 * @apiError {Array} fields
 * @apiError {String} fields.message
 * @apiError {String} fields.type
 * @apiError {String} fields.path
 * @apiError {String} fields.value
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
      'where': {
        'id': req.params.id,
        [Op.or]: [
          {'userId': req.auth.userId},
          {'$permissions.userId$': req.auth.userId}
        ],
      },
      'attributes': ['id', 'name', 'forecast', 'balance', 'balance_date', 'limit', 'createdAt', 'updatedAt'],
      'include': [
        {
          'model': fc.schemas.permissions,
          'attributes': ['id', 'balance', 'transactions', 'shares', 'updatedAt', 'createdAt'],
          'where': {'userId': req.auth.userId},
          'required': false
        }
      ]
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
 * @apiParam {String} name
 * @apiParam {Integer} forecast=365
 * @apiParam {Float} balance=0
 * @apiParam {DateTime} balance_date
 * @apiParam {Float} limit=0
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

  fc.get('accounts', {
      'where': {
        'id': req.params.id,
        [Op.or]: [
          {'userId': req.auth.userId},
          {
            [Op.and]: [
              {'$permissions.userId$': req.auth.userId},
              {'$permissions.balance$': true},
            ]
          }
        ],
      },
      'attributes': ['id', 'userId', 'name', 'forecast', 'balance', 'balance_date', 'limit', 'createdAt', 'updatedAt'],
      'include': [
        {
          'model': fc.schemas.permissions,
          'required': false
        }
      ]
    }).then(function (record) {
      if (record) {
        record.update(req.body).then(function () {
          msg = messages('RECORD_UPDATED');
          res.status(msg.http_code).send({'message': msg.message});
        }, function () {
          var msg = messages('FIELD_VALIDATION_ERROR');
          res.status(msg.http_code).send({'error': msg.message, 'code': msg.code, 'fields': err.errors});
        });
      } else {
        var msg = messages('RECORD_NOT_FOUND');
        res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
      }
  });

});

/**
 * @api {delete} /accounts/:id Delete Account
 * @apiGroup Accounts
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
    'where': {
      'accountId': req.params.id,
      [Op.or]: [
        {'$account.userId$': req.auth.userId},
        {'$account.permissions.userId$': req.auth.userId}
      ]
    },
    'include': [{
      'model': fc.schemas.accounts,
      'include': [
        {
          'model': fc.schemas.permissions,
          'required': false,
        }
      ]
    }]
  }).then(function (results) {

    res.send(results);
  });

});

/**
 * @api {post} /accounts/:id/transactions Create Account Transaction
 * @apiGroup Accounts
 */
router.post('/:id/transactions', fc.isAuth, function (req, res) {

  req.body.accountId = req.params.id;

  fc.get('accounts', {
      'where': {
        'id': req.params.id,
        [Op.or]: [
          {'userId': req.auth.userId},
          {
            [Op.and]: [
              {'$permissions.userId$': req.auth.userId},
              {'$permissions.transactions$': true},
            ]
          }
        ],
      },
      'include': [
        {
          'model': fc.schemas.permissions,
          'required': false
        }
      ]
    }).then(function (record) {
      if (record) {

        fc.create('transactions', req.body, res).then(function (records) {
          msg = messages('RECORD_CREATED');

          res.status(msg.http_code).send({'id': records.id, 'message': msg.message});
        }, function (err) {
          var msg = messages('FIELD_VALIDATION_ERROR');
          res.status(msg.http_code).send({'error': msg.message, 'code': msg.code, 'fields': err.errors});
        });

      } else {
        var msg = messages('RECORD_NOT_FOUND');
        res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
      }
  });

});

/**
 * @api {get} /accounts/:id/transactions/:transactionid Get Account Transaction
 * @apiGroup Accounts
 */
router.get('/:id/transactions/:transactionid', fc.isAuth, function (req, res) {

  fc.get('transactions', {
    'where': {
      'id': req.params.transactionid,
      'accountId': req.params.id,
      [Op.or]: [
        {'$account.userId$': req.auth.userId},
        {'$account.permissions.userId$': req.auth.userId},
      ]
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
router.put('/:id/transactions/:transactionid', fc.isAuth, function (req, res) {

  delete req.body.createdAt;
  delete req.body.updatedAt;

  fc.get('transactions', {
    'where': {
      'id': req.params.transactionid,
      'accountId': req.params.id,
      [Op.or]: [
        {'$account.userId$': req.auth.userId},
        {
          [Op.and]: [
            {'$account.permissions.userId$': req.auth.userId},
            {'$account.permissions.transactions$': true}
          ]
        }
      ]
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

      if (!result) {
        msg = messages('RECORD_NOT_FOUND');
        res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
      } else {

        result.update(req.body).then(function (result) {
          msg = messages('RECORD_UPDATED');
          res.status(msg.http_code).send({'message': msg.message});
        }, function (err) {
          var msg = messages('FIELD_VALIDATION_ERROR');
          res.status(msg.http_code).send({'error': msg.message, 'code': msg.code, 'fields': err.errors});
        });

      }

  }, function () {
    msg = messages('RECORD_NOT_FOUND');
    res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
  });

});

/**
 * @api {delete} /accounts/:id/transactions/:transactionid Delete Account Transaction
 * @apiGroup Accounts
 */
router.delete('/:id/transactions/:transactionid', fc.isAuth, function (req, res) {


  fc.get('transactions', {
    'where': {
      'id': req.params.transactionid,
      'accountId': req.params.id,
      [Op.or]: [
        {'$account.userId$': req.auth.userId},
        {
          [Op.and]: [
            {'$account.permissions.userId$': req.auth.userId},
            {'$account.permissions.transactions$': true},
          ]
        }
      ]
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
  }, function () {
    msg = messages('RECORD_NOT_FOUND');
    res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
  });

});

/**
 * @api {get} /:accountId/permissions List Account Permissions
 * @apiGroup Accounts
 */
router.get('/:accountId/permissions', fc.isAuth, function (req, res) {

  fc.query('permissions', {
    'where': {
      'accountId': req.params.accountId,
      [Op.or]: [
        {'userId': req.auth.userId},
        {'$account.userId$': req.auth.userId}
      ]
    },
    'attributes': ['id', 'accountId', 'email', 'token', 'balance', 'transactions', 'shares', 'updatedAt', 'createdAt'],
    'include': [
      {
        'model': fc.schemas.users,
        'attributes': ['name']
      },
      {
        'model': fc.schemas.accounts,
        'attributes': []
      },
    ]
  }).then(function (results) {
    res.send(results);
  });

});

/**
 * @api {post} /:accountId/permissions Create Account Permission
 * @apiGroup Accounts
 */
router.post('/:accountId/permissions', fc.isAuth, function (req, res) {

  delete req.body.userId;
  req.body.email = req.body.email || null;
  req.body.accountId = req.params.accountId;
  req.body.token = hat(bits=128, base=16);

  fc.get('accounts', {
      'where': {
        'id': req.params.accountId,
        [Op.or]: [
          {'userId': req.auth.userId},
          {
            [Op.and]: [
              {'$permissions.userId$': req.auth.userId},
              {'$permissions.shares$': true}
            ]
          }
        ],
      },
      'attributes': ['id', 'userId', 'name', 'forecast', 'balance', 'balance_date', 'limit', 'createdAt', 'updatedAt'],
      'include': [
        {
          'model': fc.schemas.permissions,
          'required': false
        }
      ]
    }).then(function (results) {

    if (results) {
      fc.create('permissions', req.body, res).then(function (record) {
        var url = fc.config.web.url + '/#/Welcome/' + record.token;
        fc.email({
          'email': record.email,
          'template': 'ACCOUNT_SHARE',
          'vars': {
            'name': req.auth.user.name,
            'url': url
          }
        }).then(function () {
          msg = messages('RECORD_CREATED');
          res.status(msg.http_code).send({'id': record.id, 'message': msg.message});
        }, function (err) {
          record.destroy();
          msg = messages('PERMISSION_EMAIL_FAILURE');
          res.status(msg.http_code).send({'id': record.id, 'message': msg.message});
        });
      }, function (err) {
        var msg = messages('FIELD_VALIDATION_ERROR');
        res.status(msg.http_code).send({'error': msg.message, 'code': msg.code, 'fields': err.errors});
      });
    } else {
      var msg = messages('RECORD_NOT_FOUND');
      res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
    }

  });

});

/**
 * @api {get} /:accountId/permissions/:id Get Account Permissions
 * @apiGroup Accounts
 */
router.get('/:accountId/permissions/:id', fc.isAuth, function (req, res) {

  fc.get('permissions', {
    'where': {
      'id': req.params.id,
      'accountId': req.params.accountId,
      [Op.or]: [
        {'userId': req.auth.userId},
        {'$account.userId$': req.auth.userId}
      ]
    },
    'attributes': ['id', 'accountId', 'email', 'token', 'balance', 'transactions', 'shares', 'updatedAt', 'createdAt'],
    'include': [
      {
        'model': fc.schemas.users,
        'attributes': ['name']
      },
      {
        'model': fc.schemas.accounts,
        'attributes': []
      },
    ]
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
 * @api {put} /:accountId/permissions/:id Update Account Permissions
 * @apiGroup Accounts
 */
router.put('/:accountId/permissions/:id', fc.isAuth, function (req, res) {

  fc.get('accounts', {
      'where': {
        'id': req.params.accountId,
        [Op.or]: [
          {'userId': req.auth.userId},
          {
            [Op.and]: [
              {'$permissions.userId$': req.auth.userId},
              {'$permissions.shares$': true},
            ]
          }
        ],
      },
      'attributes': ['id', 'userId', 'name', 'forecast', 'balance', 'balance_date', 'limit', 'createdAt', 'updatedAt'],
      'include': [
        {
          'model': fc.schemas.permissions,
          'required': false
        }
      ]
    }).then(function (record) {

    if (record) {
      fc.update('permissions', req.body, {'where': {'id': req.params.id}}).then(function () {
        msg = messages('RECORD_UPDATED');
        res.status(msg.http_code).send({'message': msg.message});
      }, function () {
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
 * @api {delete} /:accountId/permissions/:id Delete Account Permissions
 * @apiGroup Accounts
 */
router.delete('/:accountId/permissions/:id', fc.isAuth, function (req, res) {

  fc.get('permissions', {
    'where': {
      'id': req.params.id,
      'accountId': req.params.accountId,
      [Op.or]: [
        {
          [Op.and]: [
            {'userId': req.auth.userId},
            {'shares': true},
          ]
        },
        {'$account.userId$': req.auth.userId}
      ]
    },
    'attributes': ['id', 'accountId', 'email', 'token', 'balance', 'transactions', 'shares', 'updatedAt', 'createdAt'],
    'include': [
      {
        'model': fc.schemas.users,
        'attributes': ['name']
      },
      {
        'model': fc.schemas.accounts,
        'attributes': []
      }
    ]
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

router.get('/:id/forecast', fc.isAuth, function (req, res) {

  var zero_time = function (date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
  };

  var build_forecast = function (account) {

    //Set our current date and zeroout the time
    var now = new Date();
    zero_time(now);

    //Zero out the balance date
    zero_time(account.balance_date);

    //Build our hash structure
    var forecast = {
      'previous': [],
      'future': [],
      'high': account.balance,
      'high_date': account.balance_date,
      'low': account.balance,
      'low_date': account.balance_date,
      'today': account.balance
    };

    //Once we're done we'll send the results
    var finish = function () {

      forecast.high = Number(forecast.high.toFixed(2));
      forecast.low = Number(forecast.low.toFixed(2));
      res.send(forecast);
    };

    var increment_transactions = function (date) {
      account.transactions.forEach(function (transaction) {

        zero_time(transaction.start);

        //Set a counter for the transaction
        transaction.amount_paid = (transaction.amount_paid !== undefined) ? transaction.amount_paid : transaction.amount;

        //Skip one time transactions
        if (transaction.one_time) {
          return;
        }

        //If we have a transaction limit, set our counter to 1
        if (transaction.num_transactions) {
          transaction.transaction_num = transaction.transaction_num || 1;
        }


        //If the transaction date is before now, lets increment it
        while (transaction.start < date) {

          //Add to our transaction running total
          transaction.amount_paid += transaction.amount;

          //If we have a transaction limit, increment our counter
          if (transaction.num_transactions > 0) {
            transaction.transaction_num += 1;
            transaction.amount_remaining = (transaction.num_transactions - transaction.transaction_num) * transaction.amount;
          }

          //Get our transaction date
          transaction.start = new Date(transaction.start.valueOf());

          //Increment our date based on every_type
          switch (transaction.every_type) {
            case 'day':
              transaction.start.setDate(transaction.start.getDate() + transaction.every_num);
              break;
            case 'week':
              transaction.start.setDate(transaction.start.getDate() + (7 * transaction.every_num));
              break;
            case 'month':
              transaction.start.setMonth(transaction.start.getMonth() + transaction.every_num);
              break;
            case 'year':
              transaction.start.setYear(transaction.start.getYear() +  transaction.every_num);
              break;
          }
        }
      });
    };

    //Function to get the transactions for the passed in date
    var get_day = function (current) {

      //Build our base day hash
      var day = {
        'date': current,
        'transactions_total': 0,
        'balance': account.balance,
        'transactions': []
      };


      //Increment Transactions
      increment_transactions(current);

      //Filter transactions for the current day
      todays = account.transactions.filter(function (transaction) {
        if (transaction.num_transactions && transaction.transaction_num > transaction.num_transactions) {
          return false;
        }
        return (transaction.start.valueOf() == current.valueOf());
      });

      //Lets process each transaction for the current day
      todays.forEach(function (transaction) {
        //Increment our balances
        day.balance = account.balance + transaction.amount;
        day.transactions_total += transaction.amount;
        account.balance += transaction.amount;

        //Push the transaction to the days transactions array
        day.transactions.push({
          'id': transaction.id,
          'name': transaction.name,
          'num_transactions_total': Number.isInteger(transaction.num_transactions) ? transaction.num_transactions : undefined,
          'num_transactions_current': Number.isInteger(transaction.transaction_num) ? transaction.transaction_num : undefined,
          'amount_paid': Number(transaction.amount_paid.toFixed(2)),
          'amount_remaining': (transaction.amount_remaining !== undefined) ? Number(transaction.amount_remaining.toFixed(2)): undefined,
          'amount': transaction.amount,
          'every_num': transaction.every_num,
          'every_type': transaction.every_type,
          'one_time': transaction.one_time,
        });

      });

      day.balance = Number(day.balance.toFixed(2));
      day.transactions_total = Number(day.transactions_total.toFixed(2));

      //Check our high balance stat
      if (account.balance > forecast.high) {
        forecast.high = account.balance;
        forecast.high_date = current;
      }

      //Check our low balance stat
      if (account.balance < forecast.low) {
        forecast.low = account.balance;
        forecast.low_date = current;
      }

      //If currently processed date is before now, add to previous key
      if (day.transactions.length > 0 && current < now) {
        forecast.previous.push(day);
        forecast.today = day.balance;
      //Otherwise add it for our future key
      } else if (day.transactions.length > 0 || (day.date.valueOf() == now.valueOf()) ) {
        forecast.future.push(day);
      }

      //Increment the day
      next = new Date(current.valueOf());
      next.setDate(next.getDate() + 1);

      //If we've reached our forecast length, finish
      if ((next - now) >= (1000*60*60*24 * account.forecast)) {
        finish();

      //Otherwise get the next day
      } else {
        get_day(next);
      }
    };

    //Sort our transactions
    account.transactions.sort(function(a, b){
        var keyA = new Date(a.updated_at),
            keyB = new Date(b.updated_at);
        // Compare the 2 dates
        if(a.amount < b.amount) return -1;
        if(a.amount > b.amount) return 1;
        return 0;
    });

    //Initial Increment of Transactions
    increment_transactions(account.balance_date);


    //Get the details for the first day
    get_day(account.balance_date);
  };

  fc.get('accounts', {
      'where': {
        'id': req.params.id,
        [Op.or]: [
          {'userId': req.auth.userId},
          {'$permissions.userId$': req.auth.userId},
        ],
      },
      'attributes': ['id', 'userId', 'name', 'forecast', 'balance', 'balance_date', 'limit', 'createdAt', 'updatedAt'],
      'include': [
        {
          'model': fc.schemas.transactions
        },
        {
          'model': fc.schemas.permissions,
          'required': false
        }
      ]
    }).then(function (result) {
    var msg;

    if (result) {
      build_forecast(result);
    } else {
      msg = messages('RECORD_NOT_FOUND');
      res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
    }
  });
});

/**
 * @api {get} /shared/:token Get Shared Account Details
 * @apiGroup Accounts
 */
router.get('/accept/:token', function (req, res) {
  var msg;

  fc.get('permissions', {
    'where': {'token': req.params.token},
    'attributes': ['token', 'email'],
    'include': [{
      'model': fc.schemas.accounts,
      'attributes': ['name'],
      'include': [{
        'model': fc.schemas.users,
        'attributes': ['name']
      }]
    }]
  }).then(function (record) {

    if (record) {

      res.send(record);

    } else {
      msg = messages('RECORD_NOT_FOUND');
      res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
    }

  });
});

/**
 * @api {post} /shared/:token Accept Shared Account
 * @apiGroup Accounts
 */
router.post('/accept/:token', fc.isAuth, function (req, res) {
  var msg;

  fc.get('permissions', {
    'where': {'token': req.params.token},
    'include': [{
      'model': fc.schemas.accounts,
    }]
  }).then(function (record) {

    if (record) {

      if (record.account.userId === req.auth.userId) {
        res.status(400).send({'error': 'Cannot accept own sharing request'});
      } else {
        record.email = '';
        record.token = '';
        record.userId = req.auth.userId;

        record.save().then(function () {
          msg = messages('RECORD_UPDATED');
          res.status(msg.http_code).send({'message': msg.message});
        }, function (err) {
          msg = messages('FIELD_VALIDATION_ERROR');
          res.status(msg.http_code).send({'error': msg.message, 'code': msg.code, 'fields': err.errors});
        });

      }
    } else {
      msg = messages('RECORD_NOT_FOUND');
      res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
    }

  });
});

module.exports = router;
