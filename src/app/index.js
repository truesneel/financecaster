var q = require('q');
var fs = require('fs');
var ini = require('ini');
var crypto = require('crypto');
var log4js = require('log4js');
var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var messages = require('./messages').get;

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
				var hash = crypto.createHmac('sha512', fc.config.salt).update(pwd).digest('base64');

				fc.schemas.users.create({
					'username': 'admin',
					'email': 'admin@localhost',
					'password': hash,
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
		fc.config.database.logging = process.env.FC_DB_LOGGING || fc.config.database.logging || false;
		fc.config.database.logging = (fc.config.database.logging !== false) ? console.log : console.log;
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

			fc.config.web = fc.config.web || {};
			fc.config.database = fc.config.database || {};
			fc.config.salt = process.env.FC_SALT || fc.config.salt || '0123456789abcdefghij';

			init_db();
		});
	};

	init_config();

	return defer.promise;
};

fc.start = function () {
	fc.app = express();
	fc.config.web.port = process.env.FC_PORT || fc.config.web.port || 9001;
	fc.config.web.address = process.env.FC_ADDRESS || fc.config.web.address || '0.0.0.0';

	fc.app.use(log4js.connectLogger(fc.log, { level: log4js.levels.INFO }));
	fc.app.use(express.static('public'));
	fc.app.use(bodyParser.json());
	fc.app.use(function (req, res, next) {
		if (req.headers.client_token && req.headers.auth_token) {
			fc.schemas.tokens.find({
				'include': [fc.schemas.users],
				'where': {
					'client_token': req.headers.client_token,
					'auth_token': req.headers.auth_token,
				}
			}).then(function (record) {
				if (record) {
					req.auth = {
						'token_id': record.dataValues.id,
						'expires': record.dataValues.expires,
						'userId': record.dataValues.userId,
						'client_token': record.dataValues.client_token,
						'name': record.dataValues.user.dataValues.email,
						'admin': record.dataValues.user.dataValues.admin,
					};

				}
				console.log(req.auth);
				next();
			});
		} else {
			next();
		}
	});
	fc.app.use('/api', require('./routes'));

	fc.app.listen(fc.config.web.port, fc.config.web.address, function () {
		fc.log.info('Listening on %s:%s', fc.config.web.address, fc.config.web.port);
	});
};

fc.isAdmin = function (req, res, next) {
  var now = new Date();

  if (req.auth && req.auth.admin && now < req.auth.expires) {
    next();
  } else {
    var msg = messages('ACCESS_DENIED');
    res.status(msg.http_code).send({'error': msg.message});
  }
};

fc.isAuth = function (req, res, next) {
  var now = new Date();

  if (req.auth && req.auth.admin && now < req.auth.expires) {
    next();
  } else {
    var msg = messages('ACCESS_DENIED');
    res.status(msg.http_code).send({'error': msg.message});
  }
};

fc.query = function (schema, req, options) {

  return fc.schemas[schema].findAll(options);

};

fc.get = function (schema, req, options) {

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

fc.remove = function (schema, req, options) {
  var defer = q.defer();

  fc.schemas[schema].destroy(options).then(function (response) {
    defer.resolve(response);
  });

  return defer.promise;
};

module.exports = fc;
