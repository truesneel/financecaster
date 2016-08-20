var q = require('q');
var fc = require('../app');
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
		'allowNull': false
	},
	'email': {
		'type': Sequelize.STRING,
		'unique': true,
		'allowNull': false
	},
	'admin': {
		'type': Sequelize.BOOLEAN,
		'default': 0
	}
});
schemas.accounts = fc.db.define('accounts', {
	'name': {
		'type': Sequelize.STRING,
	},
	'forecast': {
		'type': Sequelize.INTEGER,
	},
	'balance': {
		'type': Sequelize.FLOAT,
	},
	'limit': {
		'type': Sequelize.FLOAT,
	}
});
schemas.transactions = fc.db.define('transactions', {
	'name': {
		'type': Sequelize.STRING,
	},
	'start': {
		'type': Sequelize.DATE,
	},
	'every_num': {
		'type': Sequelize.INTEGER,
	},
	'every_type': {
		'type': Sequelize.INTEGER,
		'values': ['day', 'week', 'month', 'year']
	},
	'num_tansactions': {
		'type': Sequelize.INTEGER,
	},
	'amount': {
		'type': Sequelize.FLOAT,
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
		'allowNull': false
	},
	'auth_token': {
		'type': Sequelize.STRING,
		'allowNull': false
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

schemas.accounts.hasOne(schemas.transactions);
schemas.accounts.hasOne(schemas.permissions);
schemas.users.hasOne(schemas.permissions);
schemas.users.hasOne(schemas.accounts, { foreignKey: 'owner_id' });
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
