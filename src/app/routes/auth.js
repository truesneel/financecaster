var q = require('q');
var hat = require('hat');
var fc = require('../../app');
var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var geoip = require('geoip-lite');
var mailer = require('nodemailer');
var useragent = require('useragent');
var messages = require('../messages').get;

/**
 * @apiDefine user User Access Required
 * Access is restricted to an standard authorized user
 */

/**
 * @apiDefine admin Admin Access Required
 * Access is restricted to an authorized user with admin rights
 */

/**
 * @api {get} /auth Get Auth Status
 * @apiGroup Authentication
 * @apiPermission user
 *
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
 * @apiError {String} error Error Message
 * @apiError {String} code Error Code
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
 * @apiPermission any
 *
 *
 * @apiParam {String} username Username to attempt a log in with
 * @apiParam {String} password Password to attempt a log in with
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
  var msg;

  fc.schemas.users.findOne({'where': {
    'username': req.body.username,
    'password': crypto.createHmac('sha512', fc.config.salt).update(req.body.password).digest('base64'),
    'disabled': false,
    'verification': '',
  }}).then(function (record) {
    if (record) {

      if (req.body.account_token) {
        fc.get('permissions', {'where': {'token': req.body.account_token}, 'include': [{'model': fc.schemas.accounts}]}).then(function (share) {

          if (share) {
            if (share.account.userId !== record.id) {
              share.email = '';
              share.token = '';
              share.userId = record.id;
              share.save();
            }
          }

        });
      }

      if (record.changepw) {
        msg = messages('PASSWORD_CHANGE');
        res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
        return;
      }

      var token_expiration = new Date();
      token_expiration.setDate(token_expiration.getDate() + fc.config.users.token_expiration);

      var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      var geo = geoip.lookup(ip);
      geo = geo || {};

      var agent = useragent.parse(req.headers['user-agent']);


      fc.schemas.tokens.create({
        'client_token': 'GENERATE',
        'auth_token': 'GENERATE',
        'ip': ip,
        'geo_country': geo.country,
        'geo_region': geo.region,
        'geo_city': geo.city,
        'agent': req.headers['user-agent'],
        'agent_os': agent.os.family,
        'agent_browser': agent.family,
        'expires': token_expiration,
        'userId': record.id
      }).then(function (token) {
        res.status(200).send({'message': 'success', 'client_token': token.client_token, 'auth_token': token.auth_token, 'expires': token_expiration, 'admin': record.admin, 'id': record.id});
      }, function (err) {
        res.status(500).send({'message': 'Authentication succeeded but an authentication token could not be obtained'});
      });

    } else {
      msg = messages('LOGIN_FAILED');
      res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
    }
  });

});

/**
 * @api {delete} /auth Log Out
 * @apiGroup Authentication
 * @apiPermission user
 *
 *
 * @apiSuccessExample
 *   HTTP/1.1 200 OK
 *   {
 *     "message": "success",
 *   }
 * @apiSuccess (Response Data) {String} message Message stating if the log out attempt was successful
 */
router.delete('/', fc.isAuth, function (req, res) {

  fc.remove('tokens', {'where': {'client_token': req.headers.client_token, 'auth_token': req.headers.auth_token}}).then(function (response) {
    res.send({'message': 'success'});
  });

});

/**
 * @api {get} /auth/tokens List Current Tokens
 * @apiGroup Authentication
 * @apiPermission user
 *
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

  fc.query('tokens', {
    'where': {'userId': req.auth.userId},
    'attributes': ['id', 'userId', 'client_token', 'ip', 'geo_country', 'geo_region', 'geo_city', 'agent', 'agent_browser', 'agent_os', 'expires', 'updatedAt', 'createdAt']
  }).then(function (results) {
    if (results) {
      res.send(results);
    } else {
      var msg = messages('RECORD_NOT_FOUND');
      res.status(msg.http_code).send({'message': msg.message});
    }
  }, function (err) {
    fc.log.error(err);
    res.status(500).send({'message': 'Unknown error occured'});
  });

});

/**
 * @api {get} /auth/tokens/:id Get Token
 * @apiGroup Authentication
 * @apiPermission user
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

  fc.get('tokens', {
    'where': {'userId': req.auth.userId, 'id': req.params.id},
    'attributes': ['id', 'client_token', 'ip', 'geo_country', 'geo_region', 'geo_city', 'agent', 'agent_browser', 'agent_os', 'expires', 'userId']
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
 * @api {delete} /auth/tokens/:id Delete Token
 * @apiGroup Authentication
 * @apiPermission user
 *
 * @apiSuccess {String} message
 * @apiSuccessExample
 * HTTP/1.1 200 OK
 * {
 *   "message": "Token Deleted",
 * }
 */
router.delete('/tokens/:id', fc.isAuth, function (req, res) {

  fc.remove('tokens', {'where': {'userId': req.auth.userId, 'id': req.params.id}}).then(function (results) {
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

/**
 * @api {get} /auth/user Get User Information
 * @apiGroup Authentication
 * @apiPermission user
 *
 * @apiParam {String} name
 * @apiParam {String} email
 *
 * @apiSuccess {String} message
 * @apiSuccessExample
 * HTTP/1.1 200 OK
 * {
 *   "message": "User Updated Successfully",
 * }
 */
router.get('/user', fc.isAuth, function (req, res) {
  fc.get('users', {
      'where': {'id': req.auth.userId},
      'attributes': ['id', 'name', 'username', 'email', 'createdAt', 'updatedAt'],
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
 * @api {put} /auth/user Update User Information
 * @apiGroup Authentication
 * @apiPermission user
 *
 * @apiParam {String} name
 * @apiParam {String} email
 *
 * @apiSuccess {String} message
 * @apiSuccessExample
 * HTTP/1.1 200 OK
 * {
 *   "message": "User Updated Successfully",
 * }
 */
router.put('/user', fc.isAuth, function (req, res) {

  delete req.body.password;
  delete req.body.admin;
  delete req.body.disabled;
  delete req.body.changepw;
  delete req.body.updatedAt;
  delete req.body.createdAt;

  fc.get('users', {
      'where': {'id': req.auth.userId},
      'attributes': ['id', 'name', 'username', 'email', 'createdAt', 'updatedAt'],
    }).then(function (user) {
    if (user) {

      user.update(req.body).then(function (result) {
        msg = messages('RECORD_UPDATED');
        res.status(msg.http_code).send({'message': msg.message});
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
 * @api {post} /auth/changepw Change Password
 * @apiGroup Authentication
 * @apiPermission user
 *
 * @apiParam {String} current
 * @apiParam {String} newpassword
 *
 * @apiSuccess {String} message
 * @apiSuccessExample
 * HTTP/1.1 200 OK
 * {
 *   "message": "Password Changed",
 * }
 */

router.post('/changepw', fc.isAuth, function (req, res) {

  var search = {
    'password': crypto.createHmac('sha512', fc.config.salt).update(req.body.current).digest('base64')
  };

  if (req.auth) {
    search.id = req.auth.userId;
  } else {
    search.username = req.body.username;
  }

  fc.get('users', {
      'where': search,
    }).then(function (user) {
    if (user) {

      user.password = req.body.newpassword;
      user.changepw = false;

      user.save().then(function (result) {
        msg = messages('RECORD_UPDATED');
        res.status(msg.http_code).send({'message': msg.message});
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
 * @api {post} /auth/newuser Create Account
 * @apiGroup Authentication
 * @apiPermission any
 */

router.post('/newuser', function (req, res) {

  if (!fc.config.users.allow_new) {
    msg = messages('NEW_USERS_DISABLED');
    res.status(msg.http_code).send({'message': msg.message, 'verification': true});
    return;
  }

  fc.get('users', {
    'where': {
      [Op.or]: [
        {'username': req.body.username},
        {'email': req.body.email}
      ]
    }
  }).then(function (user) {
    var msg;

    if (user) {

      if (user.username === req.body.username) {
        msg = messages('USERNAME_ALREADY_EXISTS');
        res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
      } else if (user.email === req.body.email) {
        msg = messages('EMAIL_ALREADY_EXISTS');
        res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
      } else {
        msg = messages('FIELD_VALIDATION_ERROR');
        res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
      }

    } else {
      req.body.admin = false;
      req.body.changepw = false;
      req.body.disabled = false;
      req.body.verification = (fc.config.users.verification) ? hat(bits=256, base=16) : '';

      fc.create('users', req.body, res).then(function (record) {

        if (req.body.account_token) {
          fc.get('permissions', {'where': {'token': req.body.account_token}, 'include': [{'model': fc.schemas.accounts}]}).then(function (share) {

            if (share) {
              if (share.account.userId !== record.id) {
                share.email = '';
                share.token = '';
                share.userId = record.id;
                share.save();
              }
            }

          });
        }

        if (fc.config.users.verification) {
          var url = fc.config.web.url + '/#/Verify/' + record.verification;
          fc.email({
            'email': record.email,
            'name': record.name,
            'template': 'VERIFICATION',
            'vars': {
              'name': record.name,
              'url': url
            }
          }).then(function () {
            msg = messages('ACCOUNT_CREATED');
            res.status(msg.http_code).send({'message': msg.message, 'verification': true});
          }, function (err) {
            msg = messages('VERIFY_EMAIL_FAILURE');
            res.status(msg.http_code).send({'message': msg.message, 'code': msg.code});

            record.delete();
          });

        } else {
          msg = messages('ACCOUNT_CREATED');
          res.status(msg.http_code).send({'message': msg.message, 'verification': false});
        }

      }, function (err) {
        msg = messages('FIELD_VALIDATION_ERROR');
        res.status(msg.http_code).send({'error': msg.message, 'code': msg.code, 'fields': err.errors});
      });
    }

  });
});

/**
 * @api {post} /auth/verify/:verification Verify User Account
 * @apiGroup Authentication
 * @apiPermission any
 */
router.post('/newuser/:verification', function (req, res) {
  var msg;

  fc.get('users', {
    'where': {'verification': req.params.verification}
  }).then(function (user) {

    if (user) {

      user.verification = '';
      user.save().then(function (result) {
        msg = messages('ACCOUNT_VERIFIED');
        res.status(msg.http_code).send({'message': msg.message});
      }, function (err) {
        var msg = messages('FIELD_VALIDATION_ERROR');
        res.status(msg.http_code).send({'error': msg.message, 'code': msg.code, 'fields': err.errors});
      });

    } else {
      msg = messages('RECORD_NOT_FOUND');
      res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
    }

  }, function (err) {
    msg = messages('RECORD_NOT_FOUND');
    res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
  });

});

/**
 * @api {post} /auth/forgot Request a password reset
 * @apiGroup Authentication
 * @apiPermission any
 */

router.post('/forgot', function (req, res) {

  fc.get('users', {
    'where': {'email': req.body.email, 'verification': ''}
  }).then(function (user) {

    if (user) {
      var new_password = hat(bits=128, base=16);
      user.password = new_password;
      user.changepw = true;

      fc.email({
        'email': user.email,
        'name': user.name,
        'template': 'PASSWORD_RESET',
        'vars': {
          'name': user.name,
          'password': new_password,
          'url': fc.config.web.url
        }
      }).then(function () {

        user.save().then(function (result) {
          msg = messages('PASSWORD_RESET');
          res.status(msg.http_code).send({'message': msg.message});
        }, function (err) {
          var msg = messages('FIELD_VALIDATION_ERROR');
          res.status(msg.http_code).send({'error': msg.message, 'code': msg.code, 'fields': err.errors});
        });

      }, function (err) {
        msg = messages('PASSWORD_EMAIL_FAILURE');
        res.status(msg.http_code).send({'message': msg.message, 'code': msg.code});

        record.delete();
      });

    } else {
      msg = messages('RECORD_NOT_FOUND');
      res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
    }

  }, function (err) {
    msg = messages('RECORD_NOT_FOUND');
    res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
  });

});


module.exports = router;
