var q = require('q');
var hat = require('hat');
var fc = require('../app');
var crypto = require('crypto');
var Sequelize = require('sequelize');
var messages = require('./messages').get;

var schemas = {};

schemas.users = fc.db.define('user', {
	'name': {
		'type': Sequelize.STRING,
		'allowNull': false
	},
	'username': {
		'type': Sequelize.STRING,
		'unique': true,
		'allowNull': false
	},
	'password': {
		'type': Sequelize.STRING,
		'allowNull': false,
    'set': function (value) {
      this.setDataValue('password', crypto.createHmac('sha512', fc.config.salt).update(value).digest('base64'));
    }
	},
	'email': {
		'type': Sequelize.STRING,
		'unique': true,
		'allowNull': false
	},
	'admin': {
		'type': Sequelize.BOOLEAN,
		'defaultValue': false
	},
  'changepw': {
    'type': Sequelize.BOOLEAN,
    'defaultValue': false
  },
  'disabled': {
    'type': Sequelize.BOOLEAN,
    'defaultValue': false
  },
  'verification': {
    'type': Sequelize.STRING,
    'defaultValue': ''
  }
});
schemas.accounts = fc.db.define('accounts', {
	'name': {
		'type': Sequelize.STRING,
    'allowNull': false,
    'unique': 'useraccount'
	},
  'owner': {
    'type': Sequelize.INTEGER,
    'allowNull': false,
    'unique': 'useraccount'
  },
	'forecast': {
		'type': Sequelize.INTEGER,
    'defaultValue': 365
	},
	'balance': {
		'type': Sequelize.FLOAT,
    'defaultValue': 0
	},
	'limit': {
		'type': Sequelize.FLOAT,
    'defaultValue': 0
	},
});
schemas.transactions = fc.db.define('transactions', {
	'name': {
		'type': Sequelize.STRING,
    'allowNull': false,
    'unique': 'accounttransaction'
	},
	'start': {
		'type': Sequelize.DATE,
    'allowNull': false,
	},
	'every_num': {
		'type': Sequelize.INTEGER,
    'allowNull': false,
	},
	'every_type': {
		'type': Sequelize.STRING,
    'validate': {
      everType: function (value) {
        var types = ['day', 'week', 'month', 'year'];
        if (types.indexOf(value) === -1) {
          throw new Error('Must be one of: day, week, month, year');
        }
      }
    },
    'allowNull': false,
	},
	'num_tansactions': {
		'type': Sequelize.INTEGER,
    'allowNull': false,
	},
	'amount': {
		'type': Sequelize.FLOAT,
    'allowNull': false,
	},
  'accountId': {
    'type': Sequelize.INTEGER,
    'allowNull': false,
    'unique': 'accounttransaction'
  }
});

schemas.permissions = fc.db.define('permissions', {
	'balance': {
		'type': Sequelize.BOOLEAN,
		'allowNull': false
	},
	'tansactions': {
		'type': Sequelize.BOOLEAN,
		'allowNull': false
	},
	'shares': {
		'type': Sequelize.BOOLEAN,
		'allowNull': false
	}
});

schemas.tokens = fc.db.define('tokens', {
	'client_token': {
		'type': Sequelize.STRING,
		'allowNull': false,
    'set': function (value) {
      this.setDataValue('client_token', hat(bits=256, base=16));
    }
	},
	'auth_token': {
		'type': Sequelize.STRING,
		'allowNull': false,
    'set': function () {
      this.setDataValue('auth_token', hat(bits=512, base=32));
    }
	},
	'ip': {
		'type': Sequelize.STRING,
		'allowNull': false
	},
	'agent': {
		'type': Sequelize.STRING,
	},
	'expires': {
		'type': Sequelize.DATE,
		'allowNull': false
	},
});


schemas.accounts.belongsTo(schemas.users);
schemas.accounts.hasMany(schemas.transactions);
schemas.accounts.hasMany(schemas.permissions);

schemas.transactions.belongsTo(schemas.accounts);

schemas.users.hasOne(schemas.permissions);
schemas.tokens.belongsTo(schemas.users);
schemas.users.hasMany(schemas.tokens);


module.exports = function (force) {
	var defer = q.defer();
	var sync_defers = [];

	Object.keys(schemas).forEach(function (schema) {
		var defer = q.defer();
		sync_defers.push(defer.promise);

		fc.log.debug(messages('SCHEMA_SYNC', {'schema': schema, 'force': (force !== undefined)}).message);
		schemas[schema].sync({force: (force !== undefined)}).then(defer.resolve, function (err) {
			console.log(err);
		});

	});

	q.allSettled(sync_defers).then(function () {
		defer.resolve(schemas);
	});
	return defer.promise;
};
