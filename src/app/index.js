var q = require('q');
var fs = require('fs');
var ini = require('ini');
var crypto = require('crypto');
var log4js = require('log4js');
var express = require('express');
var Sequelize = require('sequelize');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var messages = require('./messages').get;
var emails = require('./emails').get;

var fc = {};

fc.init  = function () {
  var defer = q.defer();

  log4js.configure({
   appenders: [
     { type: 'console' },
    ]
  });

  fc.log = log4js.getLogger('financecaster');
  fc.log.setLevel('INFO');
  fc.config_path = process.env.FC_CONFIG || 'config.ini';

  var init_account = function () {
    fc.schemas.users.find({'where': {'username': 'admin'}})
    .then(function (user) {

      if (!user) {
        var pwd = process.env.FC_ADMIN_PASS || 'admin';
        //var hash = crypto.createHmac('sha512', fc.config.salt).update(pwd).digest('base64');

        fc.schemas.users.create({
          'username': 'admin',
          'email': 'admin@localhost',
          'password': pwd,
          'name': 'Admin',
          'admin': true
        })
        .then(function (user) {
          fc.log.info(messages('DEFAULT_USER_CREATED').message);
          defer.resolve();
        });
      } else {
        defer.resolve();
      }

    });
  };

  var init_db = function () {

    fc.config.database.dialect = process.env.FC_DB_DIALECT || fc.config.database.dialect || 'sqlite';
    fc.config.database.storage = process.env.FC_DB_SQLITE_PATH || fc.config.database.storage || 'financecaster.sqlite';
    if (process.env.FC_DB_LOGGING !== undefined) {
      fc.config.database.logging = (process.env.FC_DB_LOGGING == 1);
    } else if (fc.config.database.logging !== undefined) {
      fc.config.database.logging = fc.config.database.logging;
    } else {
      fc.config.database.logging = false;
    }
    fc.config.database.logging = (fc.config.database.logging !== false) ? console.log : undefined;
    fc.db = new Sequelize(fc.config.database.database, fc.config.database.username, fc.config.database.password, fc.config.database);

    require('./schemas')(process.env.FC_DB_FORCE_SYNC).then(function (schemas) {
      fc.schemas = schemas;

      init_account();
    }, function (err) {
      defer.reject(err);
    });

  };

  var init_config = function () {
    fs.access(fc.config_path, fs.F_R, function (err) {
      if (err) {
        defer.reject(messages('CONFIG_NOT_FOUND', {'config_path': fc.config_path}));
        return;
      }

      try {
        fc.config = ini.parse(fs.readFileSync(fc.config_path, 'utf-8'));
      } catch (e) {
        defer.reject(messages('CONFIG_NOT_PARSED', {'reason': e}));
        return;
      }

      fc.config.users = fc.config.users || {};
      fc.config.users.unverified_stale_age = process.env.FC_UNVERIFIED_USER_AGE || fc.config.users.unverified_stale_age || 2;
      if (process.env.FC_USER_VERIFICATION !== undefined) {
        fc.config.users.verification = process.env.FC_USER_VERIFICATION;
      } else if (fc.config.users.verification !== undefined) {
        fc.config.users.verification = fc.config.users.verification;
      } else {
        fc.config.users.verification = true;
      }
      if (process.env.FC_USER_ALLOW_NEW !== undefined) {
        fc.config.users.allow_new = (process.env.FC_USER_ALLOW_NEW);
      } else if (fc.config.allow_new !== undefined) {
        fc.config.users.allow_new = fc.config.users.allow_new;
      } else {
        fc.config.users.allow_new = true;
      }

      fc.config.web = fc.config.web || {};
      fc.config.web.port = process.env.FC_PORT || fc.config.web.port || 9001;
      fc.config.web.address = process.env.FC_ADDRESS || fc.config.web.address || '0.0.0.0';
      fc.config.web.url = process.env.FC_URL || fc.config.web.url || 'http://localhost:' + fc.config.web.port;

      fc.config.database = fc.config.database || {};
      fc.config.salt = process.env.FC_SALT || fc.config.salt || '0123456789abcdefghij';

      fc.config.mail = fc.config.mail || {};
      fc.config.mail.host = process.env.FC_MAIL_HOST || fc.config.mail.host;
      fc.config.mail.port = process.env.FC_MAIL_PORT || fc.config.mail.port || 465;
      fc.config.mail.from = process.env.FC_MAIL_FROM || fc.config.mail.from;
      fc.config.mail.user = process.env.FC_MAIL_USER || fc.config.mail.user;
      fc.config.mail.password = process.env.FC_MAIL_PASSWORD || fc.config.mail.password;
      if (process.env.FC_MAIL_SECURE !== undefined) {
        fc.config.mail.secure = (process.env.FC_MAIL_SECURE);
      } else if (fc.config.mail.secure !== undefined) {
        fc.config.mail.secure = (fc.config.mail.secure);
      } else {
        fc.config.mail.secure = true;
      }

      fc.config.mail.smtpConfig = fc.config.mail.smtpConfig || {
        host: fc.config.mail.host,
        port: fc.config.mail.port,
        secure: fc.config.mail.secure,
        auth: {
          user: fc.config.mail.user,
          pass: fc.config.mail.password
        }
      };

      if (fc.config.mail.host && fc.config.mail.from) {
        fc.mailer = nodemailer.createTransport(fc.config.mail.smtpConfig);
      } else {
        fc.log.warn('Mail not configured');
      }

      init_db();
    });
  };

  init_config();

  return defer.promise;
};

fc.start = function () {
  fc.app = express();

  fc.app.use(log4js.connectLogger(fc.log, { level: log4js.levels.INFO }));
  fc.app.use(express.static('public'));
  fc.app.use(bodyParser.json());
  fc.app.use(fc.check_token);
  fc.app.use('/api', require('./routes'));

  fc.expire_tokens();
  fc.user_cleaner();

  fc.token_cleaner = setInterval(fc.expire_tokens, 1000 * 60);
  fc.user_cleaner = setInterval(fc.user_cleaner, 1000 * 60);

  fc.app.listen(fc.config.web.port, fc.config.web.address, function () {
    fc.log.info('Listening on %s:%s', fc.config.web.address, fc.config.web.port);
  });
};

fc.check_token = function (req, res, next) {
  if (req.headers.client_token && req.headers.auth_token) {

    fc.get('tokens', {
      'include': [
        {
          'model': fc.schemas.users,
          'attributes': ['id', 'name', 'email', 'username', 'admin']
        }
      ],
      'attributes': ['id', 'client_token', 'ip', 'geo_country', 'geo_region', 'geo_city', 'agent', 'agent_browser', 'agent_os', 'expires', 'userId'],
      'where': {
        'client_token': req.headers.client_token,
        'auth_token': req.headers.auth_token,
      }
    }).then(function (record) {
      if (record) {
        var token_expiration = new Date();
        token_expiration.setDate(token_expiration.getDate() + 1);

        req.auth = record;
        record.expires = token_expiration;
        record.save();
      }
      next();
    });
  } else {
    next();
  }
};

fc.isAdmin = function (req, res, next) {
  var now = new Date();

  if (req.auth && req.auth.user.admin && now < req.auth.expires) {
    next();
  } else {
    var msg = messages('ACCESS_DENIED');
    res.status(msg.http_code).send({'error': msg.message});
  }
};

fc.isAuth = function (req, res, next) {
  var now = new Date();

  if (req.auth && now < req.auth.expires) {
    next();
  } else {
    var msg = messages('ACCESS_DENIED');
    res.status(msg.http_code).send({'error': msg.message});
  }
};

fc.query = function (schema, options, req) {

  return fc.schemas[schema].findAll(options);

};

fc.get = function (schema, options, req) {

  return fc.schemas[schema].find(options);

};

fc.create = function (schema, data) {
  var defer = q.defer();

  fc.schemas[schema].create(data).then(function (record) {
    defer.resolve(record);
  }, function (err) {
    delete err.name;

    defer.reject(err);
  });

  return defer.promise;
};

fc.update = function (schema, data, options, req, res) {

  return fc.schemas[schema].update(data, options);
};

fc.remove = function (schema, options, req) {
  var defer = q.defer();

  fc.schemas[schema].destroy(options).then(function (response) {
    defer.resolve(response);
  });

  return defer.promise;
};

fc.AuthObject = function (schema) {

  return function (req, res, next) {
    fc.get(schema, {'where': {'id': req.params.id, 'userId': req.auth.userId}}).then(function (results) {

      if (results) {
        next();
      } else {
        var msg = messages('RECORD_NOT_FOUND');
        res.status(msg.http_code).send({'error': msg.message, 'code': msg.code});
      }

    });
  };
};

fc.expire_tokens = function () {
  fc.remove('tokens',  {
    'where': {
      'expires': {
        $lt: new Date()
      }
    }
  }).then(function (response) {
    if (response > 0) {
      fc.log.info('Cleaned %s expired tokens', response);
    }
  });
};

fc.user_cleaner = function () {
  var user_age = new Date();
  user_age.setHours(user_age.getHours() - fc.config.users.unverified_stale_age);

  fc.remove('users',  {
    'where': {
      'updatedAt': {
        $lt: user_age
      },
      'verification': { '$ne': '' }
    }
  }).then(function (response) {
    if (response > 0) {
      fc.log.info('Cleaned %s stale unverified users', response);
    }
  });
};

fc.email = function(config) {
  var mail_to,
    defer = q.defer(),
    email = emails(config.template, config.vars);

  config = config || {};

  if (!config.email) {
    defer.reject(new Error('No email specified'));
    return defer.promise;
  }

  if (!fc.mailer) {
    defer.reject(new Error('Mail not configured'));
    return defer.promise;
  }

  if (!email) {
    defer.reject(new Error('Email template not found: ' + config.template));
    return defer.promise;
  }

  mail_to = (config.email && config.name) ? '"' + config.name + '" <' + config.email + '>' : config.email;

  fc.mailer.sendMail({
    from: fc.config.mail.from,
    to: mail_to,
    subject: email.subject,
    text: email.text,
    html: email.html
  }, function (err, info) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(info);
    }
  });

  return defer.promise;
};

module.exports = fc;
