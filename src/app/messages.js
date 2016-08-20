var format = require('string-template');
var messages = {};

messages.get = function (key, vars) {
	if (! messages[key] ) {
		return {
			'code': 'FC00000',
			'message': format('A message of type {key} was requested but no message was defined', {'key': key}),
			'http_code': 500,
		};
	}

	return {
		'code': messages[key].code,
		'message': format(messages[key].message, vars),
		'http_code': messages[key].http_code,
		'trace': stack = new Error().stack,
	};
};

messages.CONFIG_NOT_FOUND = {
	'code': 'FC00001',
	'message': 'Config could not be found and/or read ({config_path})',
	'http_code': 500,
};
messages.CONFIG_NOT_PARSED = {
	'code': 'FC00002',
	'message': 'Config could not be parsed: {reason}',
	'http_code': 500,
};
messages.SCHEMA_SYNC = {
	'code': 'FC00003',
	'message': 'Syncing database schema {schema} (force: {force})',
	'http_code': 200,
};
messages.DEFAULT_USER_CREATED = {
	'code': 'FC00004',
	'message': 'Default user has been created',
	'http_code': 200,
};
messages.API_WELCOME = {
	'code': 'FC00005',
	'message': 'Welcome to the FinanceCaster API',
	'http_code': 200,
};
messages.ACCESS_DENIED = {
	'code': 'FC00006',
	'message': 'Acess Denied',
	'http_code': 403,
};
messages.RECORD_NOT_FOUND = {
	'code': 'FC00007',
	'message': 'Record Not Found',
	'http_code': 404,
};
messages.LOGIN_FAILED = {
  'code': 'FC00008',
  'message': 'Login Failed',
  'http_code': 400,
};
messages.TOKEN_DELETED = {
  'code': 'FC00009',
  'message': 'Token Deleted',
  'http_code': 200,
};
messages.FIELD_VALIDATION_ERROR = {
  'code': 'FC00010',
  'message': 'Field Validation Error',
  'http_code': 400,
};
messages.RECORD_CREATED = {
  'code': 'FC00011',
  'message': 'Record Created Successfully',
  'http_code': 201,
};
messages.RECORD_DELETED = {
  'code': 'FC00012',
  'message': 'Record Deleted Successfully',
  'http_code': 200,
};
messages.RECORD_UPDATED = {
  'code': 'FC00013',
  'message': 'Record Updated Successfully',
  'http_code': 200,
};


module.exports = messages;
